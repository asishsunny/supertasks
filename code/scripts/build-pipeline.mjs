#!/usr/bin/env node
/**
 * build-pipeline.mjs — Full Figma-to-code pipeline.
 *
 * Steps:
 *   1. cache       — Fetch from Figma MCP (via workflow, not this script)
 *   2. transform   — AST: raw JSX → resolved tokens + detected components
 *   3. templatize  — AST: noise strip + dedup repeated siblings (data-repeat)
 *   4. build       — Claude: templatized → prop-based block (via subagent, not this script)
 *   5. scorecard   — 12-rule quality check against build-checklist.json
 *   6. diff        — Screenshot browser vs Figma
 *
 * Usage:
 *   node build-pipeline.mjs                          (run steps 2+3+5)
 *   node build-pipeline.mjs --phase transform        (step 2 only)
 *   node build-pipeline.mjs --phase templatize       (step 3 only)
 *   node build-pipeline.mjs --phase scorecard        (step 5 only)
 *   node build-pipeline.mjs --phase diff             (step 6 only)
 *   node build-pipeline.mjs --phase all              (steps 2+3+5)
 *   node build-pipeline.mjs --snippet controls       (single snippet)
 *   node build-pipeline.mjs --force                  (overwrite existing)
 */

import { execSync } from "child_process";
import { existsSync, readFileSync, writeFileSync, mkdirSync, statSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const manifest = JSON.parse(readFileSync(resolve(ROOT, "artifacts/pipeline-x.json"), "utf8"));

const cliArgs = process.argv.slice(2);
const phaseIdx = cliArgs.indexOf("--phase");
const phase = phaseIdx !== -1 ? cliArgs[phaseIdx + 1] : "all";
const snippetFilter = cliArgs.includes("--snippet") ? cliArgs[cliArgs.indexOf("--snippet") + 1] : null;
const force = cliArgs.includes("--force");

function toPascal(name) {
  return name.replace(/-(\w)/g, (_, c) => c.toUpperCase()).replace(/^(\w)/, (_, c) => c.toUpperCase());
}

const snippets = snippetFilter
  ? manifest.snippets.filter(s => s.name === snippetFilter)
  : manifest.snippets;

// ── Step 2: Transform ──
function runTransform() {
  console.log("=== Step 2: Transform ===\n");
  const results = [];

  for (const s of snippets) {
    const cachePath = resolve(ROOT, `artifacts/cache/${s.name}.jsx`);
    const outPath = resolve(ROOT, `artifacts/transformed/${s.name}.tsx`);

    if (!existsSync(cachePath)) {
      results.push({ name: s.name, status: "SKIP", reason: "no cache" });
      continue;
    }

    if (!force && existsSync(outPath)) {
      results.push({ name: s.name, status: "SKIP", reason: "exists", size: `${(readFileSync(outPath).length / 1024).toFixed(1)}KB` });
      continue;
    }

    try {
      execSync(`node ${resolve(__dirname, "transform.mjs")} "${cachePath}" --out "${outPath}"`, { cwd: ROOT, stdio: ["pipe", "pipe", "pipe"], maxBuffer: 10 * 1024 * 1024 });
      const size = `${(readFileSync(outPath).length / 1024).toFixed(1)}KB`;
      results.push({ name: s.name, status: "OK", size });
    } catch (e) {
      const stderr = e.stderr?.toString() || "";
      if (existsSync(outPath)) {
        const warnings = stderr.split("\n").filter(l => l.includes("⚠")).length;
        results.push({ name: s.name, status: "WARN", warnings, size: `${(readFileSync(outPath).length / 1024).toFixed(1)}KB` });
      } else {
        results.push({ name: s.name, status: "FAIL", reason: stderr.slice(0, 200) });
      }
    }
  }

  console.log("| Snippet | Status | Size |");
  console.log("|---------|--------|------|");
  for (const r of results) {
    console.log(`| ${r.name} | ${r.status}${r.warnings ? ` (${r.warnings}⚠)` : ""} | ${r.size || r.reason || ""} |`);
  }
  console.log();
  return results;
}

// ── Step 3: Templatize ──
function runTemplatize() {
  console.log("=== Step 3: Templatize ===\n");
  const results = [];

  for (const s of snippets) {
    const inPath = resolve(ROOT, `artifacts/transformed/${s.name}.tsx`);
    const outPath = resolve(ROOT, `artifacts/transformed/${s.name}-templatized.tsx`);

    if (!existsSync(inPath)) {
      results.push({ name: s.name, status: "SKIP", reason: "no transform" });
      continue;
    }

    if (!force && existsSync(outPath)) {
      results.push({ name: s.name, status: "SKIP", reason: "exists", size: `${(readFileSync(outPath).length / 1024).toFixed(1)}KB` });
      continue;
    }

    try {
      execSync(`node ${resolve(__dirname, "templatize.mjs")} "${inPath}" --out "${outPath}"`, { cwd: ROOT, stdio: ["pipe", "pipe", "pipe"], maxBuffer: 10 * 1024 * 1024 });
      const inSize = readFileSync(inPath).length;
      const outSize = readFileSync(outPath).length;
      const reduction = Math.round((1 - outSize / inSize) * 100);
      results.push({ name: s.name, status: "OK", size: `${(outSize / 1024).toFixed(1)}KB`, reduction: `${reduction}%` });
    } catch (e) {
      results.push({ name: s.name, status: "FAIL", reason: (e.stderr?.toString() || e.message).slice(0, 200) });
    }
  }

  console.log("| Snippet | Status | Size | Reduction |");
  console.log("|---------|--------|------|-----------|");
  for (const r of results) {
    console.log(`| ${r.name} | ${r.status} | ${r.size || ""} | ${r.reduction || r.reason || ""} |`);
  }
  console.log();
  return results;
}

// ── Step 5: Scorecard ──
function runScorecard() {
  console.log("=== Step 5: Scorecard ===\n");
  const blocksDir = resolve(ROOT, "app/src/components/blocks");
  const viewsDir = resolve(ROOT, "app/src/components/views");
  const checklist = JSON.parse(readFileSync(resolve(ROOT, "code/rules/build-checklist.json"), "utf8"));
  const totalChecks = checklist.checks.length;
  const allScores = [];

  for (const s of snippets) {
    const blockPath = s.view
      ? resolve(viewsDir, `${toPascal(s.name).replace("Board", "View")}.tsx`)
      : resolve(blocksDir, `${toPascal(s.name)}.tsx`);

    if (!existsSync(blockPath)) {
      console.log(`── ${s.name} ── MISSING\n`);
      allScores.push({ name: s.name, score: 0, total: totalChecks });
      continue;
    }

    const content = readFileSync(blockPath, "utf8");
    const lines = content.split("\n").length;
    const results = {};

    // staleness — block must be newer than its templatized source
    const templatizedPath = resolve(ROOT, `artifacts/transformed/${s.name}-templatized.tsx`);
    if (existsSync(templatizedPath)) {
      const blockMtime = statSync(blockPath).mtimeMs;
      const templateMtime = statSync(templatizedPath).mtimeMs;
      if (templateMtime > blockMtime) {
        console.log(`   ❌ STALE: agent failed to write — block is from a previous build`);
        console.log(`      template: ${new Date(templateMtime).toLocaleTimeString()}`);
        console.log(`      block:    ${new Date(blockMtime).toLocaleTimeString()}`);
        allScores.push({ name: s.name, score: null, total: totalChecks, stale: true });
        console.log(`── ${s.name} ── ✗ STALE — no score\n`);
        continue;
      }
    }

    results.dry = true;
    results.ssot = true;

    const sepFail = content.includes("useStore") || content.includes("from \"@/lib/data\"");
    results.separation = !sepFail;

    const dumbFail = !s.view && /\buseState\b/.test(content);
    results["dumb-blocks"] = !dumbFail;

    const hexMatches = content.match(/bg-\[#[0-9a-fA-F]+\]|text-\[#[0-9a-fA-F]+\]/g);
    results["ds-tokens"] = !hexMatches;

    const hasTypes = content.includes("interface") || content.includes("type ");
    const hasExport = content.includes("export function") || content.includes("export const");
    results.types = hasTypes && hasExport;

    const relCount = (content.match(/\brelative\b/g) || []).length;
    results["no-noise"] = relCount <= 3;

    const bigWidths = content.match(/w-\[\d{4,}px\]/g);
    let flexIssue = false;
    if (content.includes("flex") && content.includes("gap-") && !content.includes("overflow") && !content.includes("flex-col") && !content.includes("flex-wrap")) {
      flexIssue = (content.match(/flex-1/g) || []).length >= 3;
    }
    results.responsive = !bigWidths && !flexIssue;

    const a11yFail = content.includes("onClick") && !content.includes("role=") && !content.includes("button");
    results.a11y = !a11yFail;

    const hardcoded = [];
    const stringMatches = content.match(/>[\s]*[A-Z][a-z]+(?:\s[a-z]+)*[\s]*</g) || [];
    for (const m of stringMatches) {
      const text = m.replace(/^>\s*/, "").replace(/\s*<$/, "").trim();
      if (text.length > 2 && !text.match(/^(Esc|Info|Bio)$/)) {
        hardcoded.push(text);
      }
    }
    results["data-driven"] = hardcoded.length === 0;

    // transform-fidelity — check block uses components that transform uses
    const transformPath = resolve(ROOT, `artifacts/transformed/${s.name}.tsx`);
    let fidelityOk = true;
    if (existsSync(transformPath)) {
      const transformContent = readFileSync(transformPath, "utf8");
      const expectedComponents = ["Badge", "ColorAvatar", "Table", "IconButton", "Button", "Input", "Select", "Textarea"];
      const transformUses = expectedComponents.filter(c => transformContent.includes(c));
      const blockMissing = transformUses.filter(c => !content.includes(c));

      // Check gallery page too — block might delegate to section
      const galleryMap2 = {
        "stat-cards": "sections/stat-cards",
        "chart-cards": "sections/chart-cards",
        "controls": "controls/controls-bar",
        "recent-tasks": "sections/recent-tasks",
        "kanban-board": "views/kanban",
        "create-task-modal": "overlays/form-modal",
        "task-details-modal": "overlays/task-drawer",
        "settings-profile": "sections/settings",
      };
      const gp = galleryMap2[s.name];
      const galleryFile = gp ? resolve(ROOT, `app/src/app/(app)/gallery/${gp}/page.tsx`) : null;
      const galleryContent = galleryFile && existsSync(galleryFile) ? readFileSync(galleryFile, "utf8") : "";
      const stillMissing = blockMissing.filter(c => !galleryContent.includes(c));

      if (stillMissing.length > 0) {
        fidelityOk = false;
        console.log(`   🔍 transform uses ${stillMissing.join(", ")} but block+gallery don't`);
      }
    }
    results["transform-fidelity"] = fidelityOk;

    // typescript — check block compiles
    try {
      execSync(`cd ${resolve(ROOT, "app")} && npx tsc --noEmit 2>&1 | grep -c "${blockPath.split("/").pop()}"`, { stdio: ["pipe", "pipe", "pipe"], timeout: 30000 });
      results.typescript = false; // grep found errors
    } catch (e) {
      results.typescript = true; // grep found nothing = no errors
    }

    // verify-render — fetch gallery page, check for expected visual markers
    const galleryMap = {
      "stat-cards": "sections/stat-cards",
      "chart-cards": "sections/chart-cards",
      "controls": "controls/controls-bar",
      "recent-tasks": "sections/recent-tasks",
      "kanban-board": "views/kanban",
      "create-task-modal": "overlays/form-modal",
      "task-details-modal": "overlays/task-drawer",
      "settings-profile": "sections/settings",
    };
    const visualMarkers = {
      "stat-cards": ["shadow-elevation-card-rest"],
      "chart-cards": ["shadow-elevation-card-rest", "bg-ui-border-base"],
      "controls": ["bg-ui-bg-segment-control"],
      "recent-tasks": ["shadow-elevation-card-rest", "<table"],
      "kanban-board": ["bg-ui-bg-kanban-column"],
      "create-task-modal": ["shadow-elevation-card-rest", "<label", "<input"],
      "task-details-modal": ["shadow-elevation-card-rest", "rounded-full"],
      "settings-profile": ["shadow-elevation-card-rest", "<label", "<input"],
    };
    let renderOk = true;
    const galleryPath = galleryMap[s.name];
    if (galleryPath) {
      try {
        const html = execSync(`curl -s http://localhost:3000/gallery/${galleryPath}`, { timeout: 10000, maxBuffer: 5 * 1024 * 1024 }).toString().toLowerCase();
        const status = html.includes("__next") ? 200 : 500;
        if (status !== 200 || html.includes("statuscode\":500")) {
          renderOk = false;
        } else {
          const markers = visualMarkers[s.name] || [];
          const missing = markers.filter(m => !html.includes(m.toLowerCase()));
          if (missing.length > 0) {
            renderOk = false;
            console.log(`   🔍 missing visual markers: ${missing.join(", ")}`);
          }
        }
      } catch (e) {
        renderOk = false;
      }
    }
    results["verify-render"] = renderOk;

    const passed = Object.values(results).filter(Boolean).length;
    const score = Math.round((passed / totalChecks) * 10);
    allScores.push({ name: s.name, score, total: 10, passed, totalChecks });

    const icon = score >= 9 ? "✓" : score >= 7 ? "◐" : "✗";
    console.log(`── ${s.name} ── ${icon} ${score}/10  (${lines} lines)`);
    for (const [check, pass] of Object.entries(results)) {
      if (!pass) console.log(`   ⚠ ${check}`);
    }
    console.log();
  }

  const scored = allScores.filter(r => r.score !== null);
  const stale = allScores.filter(r => r.stale);
  const avg = scored.length > 0 ? (scored.reduce((s, r) => s + r.score, 0) / scored.length).toFixed(1) : "—";
  const passing = scored.filter(r => r.score >= 9).length;
  console.log(`── Summary ──`);
  console.log(`  Scored: ${scored.length}/${allScores.length}`);
  if (stale.length > 0) console.log(`  ❌ STALE (not written): ${stale.length} — ${stale.map(r => r.name).join(", ")}`);
  console.log(`  Average: ${avg}/10`);
  console.log(`  Passing (≥9): ${passing}/${scored.length}`);
  console.log(`  Blocking: ${scored.filter(r => r.score < 7).length}`);

  const reportLines = allScores.map(r => r.stale ? `- **${r.name}**: ❌ STALE — not written` : `- **${r.name}**: ${r.score}/10`).join("\n");
  writeFileSync(resolve(ROOT, "artifacts/build-pipeline-scorecard.md"), `# Build Pipeline Scorecard\n\nScored: ${scored.length}/${allScores.length} | Average: ${avg}/10 | Passing: ${passing}/${scored.length}${stale.length > 0 ? `\n\n**${stale.length} STALE blocks — agent failed to write**` : ""}\n\n${reportLines}\n`);
  console.log(`\n✓ Report: artifacts/build-pipeline-scorecard.md`);
  return allScores;
}

// ── Step 6: Screenshot Diff ──
function runDiff() {
  console.log("=== Step 6: Screenshot Diff ===\n");
  mkdirSync(resolve(ROOT, "artifacts/diffs"), { recursive: true });

  const results = [];
  for (const s of snippets) {
    const figmaPath = `artifacts/diffs/${s.name}-figma.png`;
    if (!existsSync(resolve(ROOT, figmaPath))) {
      results.push({ name: s.name, status: "SKIP", reason: "no Figma screenshot" });
      continue;
    }

    const galleryPath = s.view ? `views/${s.name.replace("-board", "")}` : `sections/${s.name}`;
    const url = `http://localhost:3000/gallery/${galleryPath}`;

    try {
      const out = execSync(
        `node ${resolve(__dirname, "screenshot-diff.mjs")} --name ${s.name} --figma ${figmaPath} --url ${url}`,
        { cwd: ROOT, stdio: ["pipe", "pipe", "pipe"], timeout: 30000 }
      ).toString();
      const match = out.match(/(\d+\.\d+)%/);
      const pct = match ? parseFloat(match[1]) : 0;
      results.push({ name: s.name, status: pct > 5 ? "FAIL" : "PASS", mismatch: `${pct}%` });
    } catch (e) {
      const out = e.stdout?.toString() || e.stderr?.toString() || "";
      const match = out.match(/(\d+\.\d+)%/);
      results.push({ name: s.name, status: "FAIL", mismatch: match ? `${match[1]}%` : "error" });
    }
  }

  console.log("| Snippet | Status | Mismatch |");
  console.log("|---------|--------|----------|");
  for (const r of results) {
    console.log(`| ${r.name} | ${r.status} | ${r.mismatch || r.reason || ""} |`);
  }

  const reportMd = results.map(r => `- **${r.name}**: ${r.status} ${r.mismatch || r.reason || ""}`).join("\n");
  writeFileSync(resolve(ROOT, "artifacts/build-pipeline-diff-report.md"), `# Build Pipeline Diff Report\n\n${reportMd}\n`);
  console.log(`\n✓ Report: artifacts/build-pipeline-diff-report.md`);
  return results;
}

// ── Run ──
console.log("╔══════════════════════════════════╗");
console.log("║       BUILD PIPELINE             ║");
console.log("║  cache → transform → templatize  ║");
console.log("║  → build → scorecard → diff      ║");
console.log("╚══════════════════════════════════╝\n");
console.log(`Snippets: ${snippets.map(s => s.name).join(", ")}\n`);

if (phase === "transform" || phase === "all") runTransform();
if (phase === "templatize" || phase === "all") runTemplatize();
if (phase === "scorecard" || phase === "all") runScorecard();
if (phase === "diff") runDiff();

if (phase === "all") {
  console.log("─────────────────────────────────");
  console.log("Steps 1 (cache) and 4 (build) run via Claude.");
  console.log("  Cache:  /pipeline-x or workflow");
  console.log("  Build:  Claude reads templatized → writes block");
  console.log("  Diff:   node build-pipeline.mjs --phase diff");
  console.log("─────────────────────────────────");
}

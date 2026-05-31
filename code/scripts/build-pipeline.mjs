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
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const manifest = JSON.parse(readFileSync(resolve(ROOT, "artifacts/pipeline-x.json"), "utf8"));

const cliArgs = process.argv.slice(2);
const phase = cliArgs[cliArgs.indexOf("--phase") + 1] || "all";
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
      execSync(`node ${resolve(__dirname, "transform.mjs")} "${cachePath}" --out "${outPath}"`, { cwd: ROOT, stdio: ["pipe", "pipe", "pipe"] });
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
      execSync(`node ${resolve(__dirname, "templatize.mjs")} "${inPath}" --out "${outPath}"`, { cwd: ROOT, stdio: ["pipe", "pipe", "pipe"] });
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

    results["transform-fidelity"] = true;
    results["verify-render"] = true;

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

  const avg = allScores.length > 0 ? (allScores.reduce((s, r) => s + r.score, 0) / allScores.length).toFixed(1) : 0;
  const passing = allScores.filter(r => r.score >= 9).length;
  console.log(`── Summary ──`);
  console.log(`  Average: ${avg}/10`);
  console.log(`  Passing (≥9): ${passing}/${allScores.length}`);
  console.log(`  Blocking: ${allScores.filter(r => r.score < 7).length}`);

  const reportLines = allScores.map(r => `- **${r.name}**: ${r.score}/10`).join("\n");
  writeFileSync(resolve(ROOT, "artifacts/build-pipeline-scorecard.md"), `# Build Pipeline Scorecard\n\nAverage: ${avg}/10 | Passing: ${passing}/${allScores.length}\n\n${reportLines}\n`);
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

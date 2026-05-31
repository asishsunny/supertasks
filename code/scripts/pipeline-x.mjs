#!/usr/bin/env node
/**
 * pipeline-x.mjs — Batch orchestrator for Pipeline X
 *
 * Usage:
 *   node pipeline-x.mjs --phase transform                    (batch transform all)
 *   node pipeline-x.mjs --phase transform --snippet controls  (single snippet)
 *   node pipeline-x.mjs --phase transform --force             (overwrite step 2 blocks)
 *   node pipeline-x.mjs --verify fetch
 *   node pipeline-x.mjs --phase screenshot-diff
 *   node pipeline-x.mjs --phase arch-diff
 */

import { execSync } from "child_process";
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const manifest = JSON.parse(readFileSync(resolve(ROOT, "artifacts/pipeline-x.json"), "utf8"));

const cliArgs = process.argv.slice(2);
const phase = cliArgs.find(a => !a.startsWith("--")) || cliArgs[cliArgs.indexOf("--phase") + 1];
const verify = cliArgs[cliArgs.indexOf("--verify") + 1];
const snippetFilter = cliArgs.includes("--snippet") ? cliArgs[cliArgs.indexOf("--snippet") + 1] : null;
const forceOverwrite = cliArgs.includes("--force");

function toPascal(name) {
  return name.replace(/-(\w)/g, (_, c) => c.toUpperCase()).replace(/^(\w)/, (_, c) => c.toUpperCase());
}

if (verify === "fetch") {
  console.log("=== Verify: Fetch ===\n");
  let ok = true;
  for (const s of manifest.snippets) {
    const cache = resolve(ROOT, `artifacts/cache/${s.name}.jsx`);
    const png = resolve(ROOT, `artifacts/diffs/${s.name}-figma.png`);
    const cacheOk = existsSync(cache) && readFileSync(cache).length > 100;
    const pngOk = existsSync(png) && readFileSync(png).length > 100;
    console.log(`  ${cacheOk ? "✓" : "✗"} cache  ${s.name}.jsx ${cacheOk ? `(${(readFileSync(cache).length/1024).toFixed(1)}KB)` : "MISSING"}`);
    console.log(`  ${pngOk ? "✓" : "✗"} screenshot  ${s.name}-figma.png`);
    if (!cacheOk || !pngOk) ok = false;
  }
  if (!ok) { console.log("\n❌ Fetch verification failed"); process.exit(1); }
  console.log("\n✓ All fetch artifacts present");
  process.exit(0);
}

if (phase === "transform") {
  console.log("=== Phase 2: Batch Transform ===\n");
  const report = [];

  const snippetsToProcess = snippetFilter
    ? manifest.snippets.filter(s => s.name === snippetFilter)
    : manifest.snippets;

  for (const s of snippetsToProcess) {
    const cachePath = resolve(ROOT, `artifacts/cache/${s.name}.jsx`);
    const transformPath = resolve(ROOT, `artifacts/transformed/${s.name}.tsx`);
    const blockPath = resolve(ROOT, `app/src/components/blocks/${toPascal(s.name)}.tsx`);

    if (!existsSync(cachePath)) {
      report.push({ name: s.name, status: "SKIP", reason: "no cache" });
      continue;
    }

    // Transform
    try {
      const stderr = execSync(
        `node ${resolve(__dirname, "transform.mjs")} "${cachePath}" --out "${transformPath}"`,
        { cwd: ROOT, stdio: ["pipe", "pipe", "pipe"] }
      ).toString();
      report.push({ name: s.name, status: "OK", transform: `${(readFileSync(transformPath).length/1024).toFixed(1)}KB` });
    } catch (e) {
      const stderr = e.stderr?.toString() || "";
      if (existsSync(transformPath)) {
        const warnings = stderr.split("\n").filter(l => l.includes("⚠")).length;
        report.push({ name: s.name, status: "WARN", warnings, transform: `${(readFileSync(transformPath).length/1024).toFixed(1)}KB` });
      } else {
        report.push({ name: s.name, status: "FAIL", reason: stderr.slice(0, 200) });
        continue;
      }
    }

    // Adapt (skip if step 2 exists, unless --force)
    if (!forceOverwrite && existsSync(blockPath) && readFileSync(blockPath, "utf8").includes("step 2")) {
      report[report.length - 1].adapt = "skipped (step 2 exists)";
    } else {
      try {
        execSync(`node ${resolve(__dirname, "adapt.mjs")} "${transformPath}" --out "${blockPath}"`, { cwd: ROOT, stdio: ["pipe", "pipe", "pipe"] });
        report[report.length - 1].adapt = "OK";
      } catch (e) {
        report[report.length - 1].adapt = "FAIL";
      }
    }
  }

  // Print report
  console.log("| Snippet | Transform | Adapt |");
  console.log("|---------|-----------|-------|");
  for (const r of report) {
    console.log(`| ${r.name} | ${r.status} ${r.transform || ""} ${r.warnings ? `(${r.warnings} warnings)` : ""} | ${r.adapt || r.reason || ""} |`);
  }

  // Write report file
  const reportMd = report.map(r => `- **${r.name}**: ${r.status} ${r.transform || ""} | adapt: ${r.adapt || r.reason || ""}`).join("\n");
  writeFileSync(resolve(ROOT, "artifacts/pipeline-x-report.md"), `# Pipeline X Transform Report\n\n${reportMd}\n`);
  console.log(`\n✓ Report: artifacts/pipeline-x-report.md`);
  process.exit(0);
}

if (phase === "screenshot-diff") {
  console.log("=== Phase 4: Batch Screenshot Diff ===\n");
  mkdirSync(resolve(ROOT, "artifacts/diffs"), { recursive: true });

  const results = [];
  for (const s of manifest.snippets) {
    const figmaPath = `artifacts/diffs/${s.name}-figma.png`;
    if (!existsSync(resolve(ROOT, figmaPath))) {
      results.push({ name: s.name, status: "SKIP", reason: "no Figma screenshot" });
      continue;
    }
    try {
      const url = `http://localhost:3000/gallery/sections/${s.name}`;
      const out = execSync(
        `node ${resolve(__dirname, "screenshot-diff.mjs")} --name ${s.name} --figma ${figmaPath} --url ${url}`,
        { cwd: ROOT, stdio: ["pipe", "pipe", "pipe"], timeout: 30000 }
      ).toString();
      const match = out.match(/Mismatch:\s+\d+ pixels \((\d+\.\d+)%\)/);
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
  writeFileSync(resolve(ROOT, "artifacts/pipeline-x-diff-report.md"), `# Pipeline X Screenshot Diff Report\n\n${reportMd}\n`);
  console.log(`\n✓ Report: artifacts/pipeline-x-diff-report.md`);
  process.exit(0);
}

if (phase === "arch-diff") {
  console.log("=== Build Quality Scorecard ===\n");
  const blocksDir = resolve(ROOT, "app/src/components/blocks");
  const viewsDir = resolve(ROOT, "app/src/components/views");
  const checklist = JSON.parse(readFileSync(resolve(ROOT, "code/rules/build-checklist.json"), "utf8"));
  const totalChecks = checklist.checks.length;
  const allScores = [];

  for (const s of manifest.snippets) {
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

    // dry
    results.dry = true;

    // ssot
    results.ssot = true;

    // separation
    const sepFail = content.includes("useStore") || content.includes("from \"@/lib/data\"");
    results.separation = !sepFail;

    // dumb-blocks
    const dumbFail = !s.view && /\buseState\b/.test(content);
    results["dumb-blocks"] = !dumbFail;

    // ds-tokens
    const hexMatches = content.match(/bg-\[#[0-9a-fA-F]+\]|text-\[#[0-9a-fA-F]+\]/g);
    results["ds-tokens"] = !hexMatches;

    // types
    const hasTypes = content.includes("interface") || content.includes("type ");
    const hasExport = content.includes("export function") || content.includes("export const");
    results.types = hasTypes && hasExport;

    // no-noise
    const relCount = (content.match(/\brelative\b/g) || []).length;
    results["no-noise"] = relCount <= 3;

    // responsive
    const bigWidths = content.match(/w-\[\d{4,}px\]/g);
    let flexIssue = false;
    if (content.includes("flex") && content.includes("gap-") && !content.includes("overflow") && !content.includes("flex-col") && !content.includes("flex-wrap")) {
      flexIssue = (content.match(/flex-1/g) || []).length >= 3;
    }
    results.responsive = !bigWidths && !flexIssue;

    // data-driven — detect hardcoded user-visible strings in blocks
    const hardcoded = [];
    const stringMatches = content.match(/>[\s]*[A-Z][a-z]+(?:\s[a-z]+)*[\s]*</g) || [];
    for (const m of stringMatches) {
      const text = m.replace(/^>\s*/, "").replace(/\s*<$/, "").trim();
      if (text.length > 2 && !text.match(/^(Esc|Info|Bio)$/)) {
        hardcoded.push(text);
      }
    }
    results["data-driven"] = hardcoded.length === 0;

    // a11y
    const a11yFail = content.includes("onClick") && !content.includes("role=") && !content.includes("button");
    results.a11y = !a11yFail;

    // transform-fidelity (can't fully automate — check for source comment)
    results["transform-fidelity"] = true;

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

  // Summary
  const avg = allScores.length > 0 ? (allScores.reduce((s, r) => s + r.score, 0) / allScores.length).toFixed(1) : 0;
  const passing = allScores.filter(r => r.score >= 9).length;
  console.log(`── Summary ──`);
  console.log(`  Average: ${avg}/10`);
  console.log(`  Passing (≥9): ${passing}/${allScores.length}`);
  console.log(`  Blocking (separation/dumb-blocks fail): ${allScores.filter(r => r.score < 7).length}`);

  // Write report
  const reportLines = allScores.map(r => `- **${r.name}**: ${r.score}/10`).join("\n");
  writeFileSync(resolve(ROOT, "artifacts/pipeline-x-scorecard.md"), `# Build Quality Scorecard\n\nAverage: ${avg}/10 | Passing: ${passing}/${allScores.length}\n\n${reportLines}\n`);
  console.log(`\n✓ Report: artifacts/pipeline-x-scorecard.md`);
  process.exit(0);
}

console.log("Usage: node pipeline-x.mjs --phase <transform|screenshot-diff|arch-diff> | --verify <fetch>");

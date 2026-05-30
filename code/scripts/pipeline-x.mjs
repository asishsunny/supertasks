#!/usr/bin/env node
/**
 * pipeline-x.mjs — Batch orchestrator for Pipeline X
 *
 * Usage:
 *   node pipeline-x.mjs --phase transform    (batch transform all snippets)
 *   node pipeline-x.mjs --verify fetch       (check all cache + screenshots exist)
 *   node pipeline-x.mjs --phase screenshot-diff  (batch Playwright diff)
 *   node pipeline-x.mjs --phase arch-diff    (check blocks against architecture)
 */

import { execSync } from "child_process";
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const manifest = JSON.parse(readFileSync(resolve(ROOT, "artifacts/pipeline-x.json"), "utf8"));

const args = process.argv.slice(2);
const phase = args.find(a => !a.startsWith("--")) || args[args.indexOf("--phase") + 1];
const verify = args[args.indexOf("--verify") + 1];

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

  for (const s of manifest.snippets) {
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

    // Adapt (skip if step 2 exists)
    if (existsSync(blockPath) && readFileSync(blockPath, "utf8").includes("step 2")) {
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
  console.log("=== Phase 4b: Architecture Diff ===\n");
  const blocksDir = resolve(ROOT, "app/src/components/blocks");
  const issues = [];

  for (const s of manifest.snippets) {
    const blockPath = resolve(blocksDir, `${toPascal(s.name)}.tsx`);
    if (!existsSync(blockPath)) {
      issues.push(`❌ ${s.name}: block file missing`);
      continue;
    }
    const content = readFileSync(blockPath, "utf8");
    if (content.includes("useStore")) issues.push(`❌ ${s.name}: imports store (blocks should be dumb)`);
    if (content.includes("useState") && !content.includes("// view-level state ok")) issues.push(`⚠ ${s.name}: uses useState (check if view-level is ok)`);
    if (!content.includes("export function")) issues.push(`⚠ ${s.name}: no named export`);
  }

  if (issues.length === 0) console.log("✓ All blocks pass architecture check");
  else issues.forEach(i => console.log(`  ${i}`));
  process.exit(0);
}

console.log("Usage: node pipeline-x.mjs --phase <transform|screenshot-diff|arch-diff> | --verify <fetch>");

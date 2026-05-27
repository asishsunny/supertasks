#!/usr/bin/env node
/**
 * pipeline.mjs — Full Figma→TSX pipeline orchestrator.
 *
 * Chains: transform --raw → templatize → inject-logic
 * Input: raw MCP JSX + snippet JS
 * Output: production-ready TSX with .map() iterations, data bindings, keys
 *
 * Usage:
 *   node pipeline.mjs kanban
 *   node pipeline.mjs table statcards chartcards
 *   node pipeline.mjs --all
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { execFileSync } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const OUTPUT_DIR = resolve(ROOT, "code/visual-diff/output");
const SNIPPETS_DIR = resolve(ROOT, "figma/snippets");

function findSnippet(name) {
  const patterns = [
    `${name}-snippet.js`,
    `${name}s-snippet.js`,
    `${name.replace(/-/g, "")}-snippet.js`,
  ];
  for (const p of patterns) {
    const path = resolve(SNIPPETS_DIR, p);
    if (existsSync(path)) return path;
  }
  const all = readdirSync(SNIPPETS_DIR).filter(f => f.endsWith("-snippet.js"));
  const match = all.find(f => f.includes(name));
  if (match) return resolve(SNIPPETS_DIR, match);
  return null;
}

function run(cmd, args) {
  return execFileSync("node", [cmd, ...args], {
    cwd: ROOT,
    encoding: "utf8",
    stdio: ["pipe", "pipe", "pipe"],
  });
}

function runStep(label, cmd, args) {
  try {
    const out = run(cmd, args);
    return { ok: true, output: out };
  } catch (e) {
    console.error(`  ✗ ${label}: ${e.stderr || e.message}`);
    return { ok: false };
  }
}

function processSections(names) {
  const results = [];

  for (const name of names) {
    console.log(`\n── ${name} ──`);

    const rawPath = resolve(OUTPUT_DIR, `${name}-figma-raw.jsx`);
    if (!existsSync(rawPath)) {
      console.error(`  ✗ Missing raw MCP JSX: ${name}-figma-raw.jsx`);
      console.error(`    Fetch from Figma MCP first, save to code/visual-diff/output/${name}-figma-raw.jsx`);
      results.push({ name, ok: false, reason: "missing raw JSX" });
      continue;
    }

    const snippetPath = findSnippet(name);
    if (!snippetPath) {
      console.error(`  ✗ No snippet found for "${name}" in figma/snippets/`);
      results.push({ name, ok: false, reason: "missing snippet" });
      continue;
    }

    const transformedPath = resolve(OUTPUT_DIR, `${name}-transformed.tsx`);
    const templatizedPath = resolve(OUTPUT_DIR, `${name}-templatized.tsx`);
    const finalPath = resolve(OUTPUT_DIR, `${name}-final.tsx`);

    // Step 1: transform --raw
    process.stdout.write("  transform...");
    const s1 = runStep("transform", resolve(__dirname, "transform.mjs"), [
      rawPath, "--raw", "--out", transformedPath,
    ]);
    if (!s1.ok) { results.push({ name, ok: false, reason: "transform failed" }); continue; }
    const transformedLines = readFileSync(transformedPath, "utf8").split("\n").length;
    process.stdout.write(` ${transformedLines} lines`);

    // Step 2: templatize
    process.stdout.write(" → templatize...");
    const s2 = runStep("templatize", resolve(__dirname, "templatize.mjs"), [
      transformedPath, "--out", templatizedPath,
    ]);
    if (!s2.ok) { results.push({ name, ok: false, reason: "templatize failed" }); continue; }
    const templatizedLines = readFileSync(templatizedPath, "utf8").split("\n").length;
    process.stdout.write(` ${templatizedLines} lines`);

    // Step 3: inject-logic
    process.stdout.write(" → inject-logic...");
    const s3 = runStep("inject-logic", resolve(__dirname, "inject-logic.mjs"), [
      templatizedPath, "--snippet", snippetPath, "--out", finalPath,
    ]);
    if (!s3.ok) { results.push({ name, ok: false, reason: "inject-logic failed" }); continue; }
    const finalLines = readFileSync(finalPath, "utf8").split("\n").length;
    console.log(` → ${finalLines} lines ✓`);

    // Log inject-logic output (collections/bindings)
    if (s3.output) {
      for (const line of s3.output.trim().split("\n")) {
        if (line.trim()) console.log(`  ${line.trim()}`);
      }
    }

    results.push({ name, ok: true, rawLines: readFileSync(rawPath, "utf8").split("\n").length, finalLines });
  }

  return results;
}

// ── CLI ──
const args = process.argv.slice(2).filter(a => !a.startsWith("--"));
const runAll = process.argv.includes("--all");

let names;
if (runAll) {
  names = readdirSync(OUTPUT_DIR)
    .filter(f => f.endsWith("-figma-raw.jsx"))
    .map(f => f.replace("-figma-raw.jsx", ""));
} else if (args.length > 0) {
  names = args;
} else {
  console.log("Usage: node pipeline.mjs <section> [section...] | --all");
  console.log("\nAvailable raw JSX files:");
  const available = readdirSync(OUTPUT_DIR)
    .filter(f => f.endsWith("-figma-raw.jsx"))
    .map(f => f.replace("-figma-raw.jsx", ""));
  for (const n of available) {
    const snippet = findSnippet(n);
    console.log(`  ${n} ${snippet ? "✓" : "✗ (no snippet)"}`);
  }
  process.exit(1);
}

console.log("Pipeline: transform --raw → templatize → inject-logic");
const results = processSections(names);

console.log("\n── Summary ──");
for (const r of results) {
  if (r.ok) {
    console.log(`  ✓ ${r.name}: ${r.rawLines} → ${r.finalLines} lines`);
  } else {
    console.log(`  ✗ ${r.name}: ${r.reason}`);
  }
}

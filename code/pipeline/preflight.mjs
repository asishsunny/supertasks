#!/usr/bin/env node
/**
 * preflight.mjs — Verify manifest blocks exist in Figma gallery cache.
 *
 * Usage: node code/pipeline/preflight.mjs
 */

import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const manifest = JSON.parse(readFileSync(resolve(__dirname, "manifest.json"), "utf8"));

const cacheDir = resolve(ROOT, "artifacts/cache");

console.log("╔══════════════════════════════╗");
console.log("║     PREFLIGHT CHECK          ║");
console.log("╚══════════════════════════════╝\n");

const toPascal = n => n.replace(/(^|-)(\\w)/g, (_, __, c) => c.toUpperCase());
let ok = 0, missing = 0;

for (const [key, block] of Object.entries(manifest.blocks)) {
  const cache = resolve(cacheDir, `${key}.jsx`);
  const transform = resolve(ROOT, `artifacts/transformed/${key}.tsx`);
  const templatized = resolve(ROOT, `artifacts/transformed/${key}-templatized.tsx`);

  const hasCache = existsSync(cache) && readFileSync(cache).length > 100;
  const hasTransform = existsSync(transform);
  const hasTemplatized = existsSync(templatized);

  const status = hasCache ? "✓" : "✗";
  const details = [
    hasCache ? "cache" : "NO CACHE",
    hasTransform ? "transform" : "no transform",
    hasTemplatized ? "templatized" : "no templatized",
  ].join(" | ");

  console.log(`  ${status} ${key} (${block.type}) — ${details}`);
  if (hasCache) ok++; else missing++;
}

console.log(`\n── Summary ──`);
console.log(`  ✓ Ready: ${ok}/${Object.keys(manifest.blocks).length}`);
if (missing) {
  console.log(`  ✗ Missing cache: ${missing}`);
  console.log(`\n  Run gallery render + fetch first.`);
  process.exit(1);
}
console.log(`\n✓ Preflight passed.`);

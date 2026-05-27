#!/usr/bin/env node
/**
 * Cache manager for Figma MCP JSX output.
 *
 * No args:                              list missing cache entries
 * echo '<jsx>' | node cache.mjs <file>  strip types/helpers, write .jsx
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE_DIR = resolve(__dirname, "../artifacts/cache");
const filename = process.argv[2];

if (!filename) {
  // ── manifest: list missing cache entries ──
  const registry = JSON.parse(readFileSync(resolve(__dirname, "../maps/screen-registry.json"), "utf8"));
  const manifest = [];

  for (const [screenName, screen] of Object.entries(registry.screens)) {
    const sections = [
      ...screen.sections.map(s => ({ name: s.name, nodeId: s.nodeId, file: `${screenName}-${s.name}.jsx` })),
      ...Object.entries(screen.tabVariants || {}).map(([tab, v]) => ({ name: tab, nodeId: v.nodeId, file: v.cache || `${screenName}-${tab}.jsx` })),
    ];

    for (const s of sections) {
      if (existsSync(resolve(CACHE_DIR, s.file))) continue;
      manifest.push({ screen: screenName, section: s.name, nodeId: s.nodeId, file: s.file, figmaFile: screen.figmaFile });
    }
  }

  console.log(JSON.stringify({ fetch: manifest, cacheDir: "code/artifacts/cache" }, null, 2));
  process.exit(0);
}

// ── write: strip types/helpers, save .jsx ──

let input = "";
for await (const chunk of process.stdin) input += chunk;

let lines = input.split("\n");
let cleaned = [];
let skip = false;
let braceDepth = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (/^const img\w+\s*=/.test(line)) continue;

  if (/^type \w+Props\s*=\s*\{/.test(line)) { skip = true; braceDepth = 1; continue; }
  if (skip) {
    braceDepth += (line.match(/\{/g) || []).length;
    braceDepth -= (line.match(/\}/g) || []).length;
    if (braceDepth <= 0) { skip = false; }
    continue;
  }

  // strip export default function wrapper — keep JSX body only
  if (/^export default function\b/.test(line)) continue;
  if (/^\s*return\s*\(\s*$/.test(line)) continue;
  if (/^\s*\);\s*$/.test(line) || /^\s*\}\s*$/.test(line)) continue;

  if (/^function [A-Z]\w+\s*\(/.test(line)) {
    // helper function — skip entirely
    braceDepth = 0;
    for (let j = i; j < lines.length; j++) {
      braceDepth += (lines[j].match(/\{/g) || []).length;
      braceDepth -= (lines[j].match(/\}/g) || []).length;
      if (braceDepth <= 0) { i = j; break; }
    }
    continue;
  }

  cleaned.push(line);
}

// dedent: find min indent of non-empty lines, strip it
const nonEmpty = cleaned.filter(l => l.trim().length > 0);
if (nonEmpty.length) {
  const minIndent = Math.min(...nonEmpty.map(l => l.match(/^(\s*)/)[1].length));
  if (minIndent > 0) cleaned = cleaned.map(l => l.slice(minIndent));
}

while (cleaned.length && cleaned[0].trim() === "") cleaned.shift();

mkdirSync(CACHE_DIR, { recursive: true });
const outPath = resolve(CACHE_DIR, filename);
writeFileSync(outPath, cleaned.join("\n").trim() + "\n");
console.log(`✓ ${outPath}`);

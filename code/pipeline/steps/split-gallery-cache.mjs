#!/usr/bin/env node
/**
 * split-gallery-cache.mjs — Split the Snippet Gallery MCP fetch into individual cache files.
 *
 * Input:  MCP result JSON file (array with [{type:"text", text:"...jsx..."}])
 * Output: artifacts/cache/{name}.jsx per snippet
 *
 * Usage: node code/pipeline/split-gallery-cache.mjs <mcp-result.txt>
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../../..");
const CACHE = resolve(ROOT, "artifacts/cache");

const inputFile = process.argv[2];
if (!inputFile) { console.error("Usage: split-gallery-cache.mjs <mcp-result.json>"); process.exit(1); }

const raw = JSON.parse(readFileSync(resolve(inputFile), "utf8"));
const code = raw.find(item => item.type === "text")?.text || "";

if (!code) { console.error("No code found in MCP result"); process.exit(1); }

// Derive NAME_MAP from manifest.json — single source of truth
const manifest = JSON.parse(readFileSync(resolve(__dirname, "../manifest.json"), "utf8"));
const NAME_MAP = {};
for (const [key, block] of Object.entries(manifest.blocks)) {
  const figmaName = block.figma;
  if (!NAME_MAP[figmaName]) NAME_MAP[figmaName] = [];
  NAME_MAP[figmaName].push(key);
}
// Add variation-only cache names (gallery renders but not pipeline blocks)
const EXTRA_NAMES = {
  "Tasks": ["tasks-table"],
  "Team": ["team-table"],
  "Reports": ["reports-table"],
};
for (const [k, v] of Object.entries(EXTRA_NAMES)) {
  if (!NAME_MAP[k]) NAME_MAP[k] = v;
}

// Find all top-level snippet positions by data-name
const SNIPPET_NAMES = new Set(Object.keys(NAME_MAP));
const positions = [];
const re = /data-node-id="(\d+:\d+)"\s+data-name="([^"]+)"/g;
let m;
while ((m = re.exec(code)) !== null) {
  if (SNIPPET_NAMES.has(m[2])) {
    // Walk back to find the opening <div
    let start = m.index;
    while (start > 0 && code.slice(start - 4, start) !== "<div") start--;
    if (start > 0) start -= 4;
    positions.push({ start, nodeId: m[1], name: m[2] });
  }
}

// Extract each snippet: from its start to the next snippet's start
const counters = {};
let ok = 0;
for (let i = 0; i < positions.length; i++) {
  const { start, nodeId, name } = positions[i];
  const end = i + 1 < positions.length ? positions[i + 1].start : code.lastIndexOf("</div>");

  const snippet = code.slice(start, end).trim();

  // Determine filename from NAME_MAP using counter for duplicates
  counters[name] = (counters[name] || 0);
  const names = NAME_MAP[name];
  const fileName = names?.[counters[name]] || `${name.toLowerCase().replace(/\s+/g, "-")}-${counters[name]}`;
  counters[name]++;

  const wrapped = `export default function ${fileName.replace(/-(\w)/g, (_, c) => c.toUpperCase()).replace(/^(\w)/, (_, c) => c.toUpperCase())}() {\n  return (\n    ${snippet}\n  );\n}`;

  const outPath = resolve(CACHE, `${fileName}.jsx`);
  writeFileSync(outPath, wrapped);
  console.log(`  ${fileName}.jsx (${(wrapped.length / 1024).toFixed(1)}KB) — ${nodeId}`);
  ok++;
}

console.log(`\n✓ ${ok} cache files written to artifacts/cache/`);

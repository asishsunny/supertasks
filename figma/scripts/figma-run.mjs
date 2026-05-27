#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const BRIDGE = process.env.FIGMA_BRIDGE_URL || 'http://localhost:3333';

// ── Parse args ──

let filePath = null;
let outPath = null;
const args = process.argv.slice(2);

for (let i = 0; i < args.length; i++) {
  if (args[i] === '-o' && args[i + 1]) { outPath = args[++i]; continue; }
  if (!filePath) filePath = args[i];
}

if (!filePath) {
  console.error('Usage: figma-run.mjs <snippet.js | -> [-o result.json]');
  process.exit(1);
}

// ── Read code ──

let code;
if (filePath === '-') {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  code = Buffer.concat(chunks).toString();
} else {
  code = await readFile(resolve(filePath), 'utf8');
}

// ── Send to bridge ──

const t0 = Date.now();
let res;
try {
  const resp = await fetch(`${BRIDGE}/execute`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, timeout: 120000 }),
  });
  res = await resp.json();
} catch (err) {
  console.error(`Error: cannot reach bridge at ${BRIDGE} — ${err.message}`);
  console.error('Start bridge first: node figma/scripts/figma-bridge.mjs');
  process.exit(1);
}
const totalMs = Date.now() - t0;

// ── Parse response ──
// MCP shape: { result: { content: [{ type: "text", text: "..." }] }, ms }

let output;
const text = res?.result?.content?.[0]?.text;
if (text) {
  try {
    const parsed = JSON.parse(text);
    output = parsed.success !== undefined ? parsed : parsed;
  } catch {
    output = text;
  }
} else if (res?.error) {
  console.error(JSON.stringify(res.error, null, 2));
  process.exit(1);
} else {
  output = res;
}

// ── Output ──

const formatted = typeof output === 'string' ? output : JSON.stringify(output, null, 2);

if (outPath) {
  const { writeFile } = await import('node:fs/promises');
  await writeFile(resolve(outPath), formatted + '\n');
  console.error(`Written to ${outPath}`);
}

console.log(formatted);
console.error(`${res.ms || '?'}ms figma · ${totalMs}ms total`);

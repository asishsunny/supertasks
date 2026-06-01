#!/usr/bin/env node
/**
 * Adapt — takes a transformed JSX file and wraps it as a React component.
 * Copies the JSX verbatim. No rewriting, no class changes, no restructuring.
 * Only adds: "use client", import React, export function wrapper.
 *
 * Usage: node adapt.mjs <input.tsx> [--out output.tsx]
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, basename } from "path";

const args = process.argv.slice(2);
const inputFile = args.find(a => !a.startsWith("--"));
const outIdx = args.indexOf("--out");
const outputFile = outIdx !== -1 ? args[outIdx + 1] : null;

if (!inputFile) {
  console.log("Usage: node adapt.mjs <input.tsx> [--out output.tsx]");
  process.exit(1);
}

const raw = readFileSync(resolve(process.cwd(), inputFile), "utf8");

// Extract the function name from "export default function Foo()"
const fnMatch = raw.match(/export\s+default\s+function\s+(\w+)/);
const fnName = fnMatch ? fnMatch[1] : basename(inputFile, ".tsx").replace(/-(\w)/g, (_, c) => c.toUpperCase());

// Strip "export default" — we'll re-export
let body = raw
  .replace(/export\s+default\s+function\s+\w+\s*\(\s*\)\s*\{/, `export function ${fnName}() {`)
  .trim();

// Add source comment + "use client"
const output = `"use client";\n\n// source: ${inputFile}\n// step 1: verbatim from transform, no modifications\n\n${body}\n`;

if (outputFile) {
  writeFileSync(resolve(process.cwd(), outputFile), output);
  console.log(`Written: ${outputFile} (${fnName})`);
} else {
  console.log(output);
}

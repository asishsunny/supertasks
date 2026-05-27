#!/usr/bin/env node
/**
 * Extract JSX code from Figma MCP tool result files.
 * Usage: node extract-mcp-result.mjs <result-file> <output-file>
 */
import { readFileSync, writeFileSync } from 'fs';

const [,, resultFile, outputFile] = process.argv;
if (!resultFile || !outputFile) {
  console.error('Usage: node extract-mcp-result.mjs <result-file> <output-file>');
  process.exit(1);
}

const raw = JSON.parse(readFileSync(resultFile, 'utf8'));
const textEntry = raw.find(r => r.type === 'text');
if (!textEntry) {
  console.error('No text entry found in result');
  process.exit(1);
}

let code = textEntry.text;
const marker = code.indexOf('SUPER CRITICAL');
if (marker > 0) code = code.substring(0, marker).trimEnd();

writeFileSync(outputFile, code + '\n');
console.log(`wrote ${outputFile}: ${code.length} chars`);

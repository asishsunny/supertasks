#!/usr/bin/env node
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const snippetsDir = resolve(__dirname, '..', 'snippets');

const BLOCK_NAMES = ['COMP', 'STYLES', 'T', 'EFFECTS', 'BAR_COLORS'];

function extractBlock(src, name) {
  const re = new RegExp(`^const\\s+${name}\\s*=\\s*\\{`, 'm');
  const match = re.exec(src);
  if (!match) return null;

  let depth = 0;
  let start = match.index + match[0].length - 1;
  let end = start;
  for (let i = start; i < src.length; i++) {
    if (src[i] === '{') depth++;
    if (src[i] === '}') {
      depth--;
      if (depth === 0) { end = i + 1; break; }
    }
  }

  let block = src.slice(start, end);
  block = block.replace(/\/\/[^\n]*/g, '');
  block = block.replace(/,\s*}/g, '}');
  block = block.replace(/,\s*}/g, '}');

  try {
    return JSON.parse(block.replace(/'/g, '"').replace(/(\w+)\s*:/g, '"$1":'));
  } catch {
    try {
      return new Function('return ' + block)();
    } catch {
      return null;
    }
  }
}

function frozenIdx(src) {
  const idx = src.indexOf('// ── Frozen logic');
  return idx === -1 ? src.length : idx;
}

export function parseDeps(snippetName) {
  const path = resolve(snippetsDir, `${snippetName}-snippet.js`);
  const src = readFileSync(path, 'utf8');
  const above = src.slice(0, frozenIdx(src));
  const result = {};
  for (const name of BLOCK_NAMES) {
    const block = extractBlock(above, name);
    if (block) result[name] = block;
  }
  return result;
}

export function parseAllDeps(nameArray) {
  const merged = {};
  for (const name of BLOCK_NAMES) merged[name] = {};
  for (const sn of nameArray) {
    const deps = parseDeps(sn);
    for (const name of BLOCK_NAMES) {
      if (deps[name]) Object.assign(merged[name], deps[name]);
    }
  }
  return merged;
}

if (process.argv[1] && process.argv[1].endsWith('parse-deps.mjs') && process.argv[2]) {
  const names = process.argv.slice(2);
  console.log(JSON.stringify(parseAllDeps(names), null, 2));
}

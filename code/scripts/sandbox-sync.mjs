#!/usr/bin/env node
/**
 * sandbox-sync.mjs — Copy pipeline -final.tsx files into the Next.js app
 * as renderable components.
 *
 * Mechanically prepends:
 *   1. "use client" directive
 *   2. Component imports (scanned from JSX references)
 *   3. Snippet DATA (extracted via same method as inject-logic.mjs)
 *
 * Usage: node sandbox-sync.mjs [--all] [name...]
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const OUTPUT_DIR = resolve(ROOT, "code/visual-diff/output");
const SNIPPETS_DIR = resolve(ROOT, "figma/snippets");
const SANDBOX_DIR = resolve(ROOT, "app/src/app/(app)/sandbox/templates");

const COMPONENT_IMPORTS = {
  Badge: `import { Badge } from "@medusajs/ui";`,
  IconButton: `import { IconButton } from "@medusajs/ui";`,
  Table: `import { Table } from "@medusajs/ui";`,
  EllipsisHorizontal: `import { EllipsisHorizontal } from "@medusajs/icons";`,
  ColorAvatar: `import { ColorAvatar } from "@/components/ColorAvatar";`,
};

const CONSTANT_IMPORTS = {
  PRIORITY_COLOR: "@/lib/constants",
  BAR_COLORS: "@/lib/constants",
  BAR_COLORS_ALL: "@/lib/constants",
  STATUS_LABEL: "@/lib/constants",
  STATUS_KEY: "@/lib/constants",
  BADGE_STATE_COLOR: "@/lib/constants",
  PRIORITY_BAR_COLORS: "@/lib/constants",
};

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

function extractSnippetData(snippetPath) {
  const src = readFileSync(snippetPath, "utf8");
  const dataMatch = src.match(/const DATA\s*=\s*\{/);
  if (!dataMatch) return null;

  const start = dataMatch.index;
  let depth = 0, end = start;
  for (let i = start; i < src.length; i++) {
    if (src[i] === "{") depth++;
    if (src[i] === "}") { depth--; if (depth === 0) { end = i + 1; break; } }
  }

  const dataBlock = src.slice(start, end);
  const preamble = src.slice(0, start).replace(/\/\/[^\n]*/g, "");

  try {
    const evalCode = preamble + "\n" + dataBlock + "\nreturn DATA;";
    return new Function(evalCode)();
  } catch (e) {
    console.error(`  Failed to eval DATA from ${snippetPath}: ${e.message}`);
    return null;
  }
}

function scanReferences(jsx) {
  const refs = new Set();

  for (const comp of Object.keys(COMPONENT_IMPORTS)) {
    if (jsx.includes(`<${comp}`) || jsx.includes(`</${comp}`)) {
      refs.add(comp);
    }
  }
  for (const name of Object.keys(CONSTANT_IMPORTS)) {
    if (jsx.includes(name)) {
      refs.add(name);
    }
  }
  return refs;
}

function buildImports(refs) {
  const lines = [];
  const uiImports = [];
  const iconImports = [];
  const constImports = new Set();

  for (const ref of refs) {
    if (COMPONENT_IMPORTS[ref]) {
      if (COMPONENT_IMPORTS[ref].includes("@medusajs/ui")) uiImports.push(ref);
      else if (COMPONENT_IMPORTS[ref].includes("@medusajs/icons")) iconImports.push(ref);
      else lines.push(COMPONENT_IMPORTS[ref]);
    }
    if (CONSTANT_IMPORTS[ref]) {
      constImports.add(ref);
    }
  }

  if (uiImports.length) lines.unshift(`import { ${uiImports.join(", ")} } from "@medusajs/ui";`);
  if (iconImports.length) lines.push(`import { ${iconImports.join(", ")} } from "@medusajs/icons";`);
  if (constImports.size) lines.push(`import { ${[...constImports].join(", ")} } from "@/lib/constants";`);

  return lines;
}

function adaptMemberData(data) {
  if (data.members && typeof data.members === "object" && !Array.isArray(data.members)) {
    for (const [id, m] of Object.entries(data.members)) {
      if (m.initial && !m.initials) {
        m.initials = m.initial;
        m.avatarBg = `tag-${m.color}-bg`;
        m.avatarText = `tag-${m.color}-text`;
      }
    }
  }
  if (data.rows && Array.isArray(data.rows)) {
    for (const row of data.rows) {
      if (row.user && row.user.initial && !row.user.initials) {
        row.user.initials = row.user.initial;
        row.user.avatarBg = `tag-${row.user.color}-bg`;
        row.user.avatarText = `tag-${row.user.color}-text`;
      }
    }
  }
  return data;
}

function dataToTS(data, varName = "DATA") {
  const adapted = adaptMemberData(data);
  const json = JSON.stringify(adapted, null, 2);
  return `const ${varName} = ${json};`;
}

function extractCollectionVars(jsx, data) {
  const lines = [];

  if (data.cards && jsx.includes("cards.map")) {
    lines.push(`const cards = DATA.cards;`);
  }
  if (data.rows && jsx.includes("rows.map")) {
    lines.push(`const rows = DATA.rows;`);
  }
  if (data.statuses && jsx.includes("statuses.map")) {
    lines.push(`const statuses = DATA.statuses;`);
  }
  if (data.tasks && jsx.includes("tasks.filter") || jsx.includes("tasks.map")) {
    lines.push(`const tasks = DATA.tasks;`);
  }
  if (data.columns && jsx.includes("columns.map")) {
    lines.push(`const columns = DATA.columns;`);
  }

  return lines;
}


function syncTemplate(name) {
  const finalPath = resolve(OUTPUT_DIR, `${name}-final.tsx`);
  if (!existsSync(finalPath)) {
    console.error(`  ✗ ${name}: missing ${name}-final.tsx`);
    return false;
  }

  const snippetPath = findSnippet(name);
  if (!snippetPath) {
    console.error(`  ✗ ${name}: no snippet found`);
    return false;
  }

  const jsx = readFileSync(finalPath, "utf8");
  const data = extractSnippetData(snippetPath);
  if (!data) {
    console.error(`  ✗ ${name}: could not extract DATA from snippet`);
    return false;
  }

  const refs = scanReferences(jsx);
  const collectionVars = extractCollectionVars(jsx, data);

  const fnMatch = jsx.match(/export default function (\w+)/);
  const fnName = fnMatch ? fnMatch[1] : "Template";

  let body = jsx
    .replace(/^export default function \w+\(\)\s*\{/, "")
    .replace(/\}\s*$/, "")
    .trim();

  const imports = buildImports(refs);

  const output = [
    `// @ts-nocheck`,
    `"use client";`,
    ``,
    ...imports,
    ``,
    dataToTS(data),
    ``,
    ...collectionVars,
    ``,
    `export default function ${fnName}() {`,
    `  ${body}`,
    `}`,
  ].join("\n");

  const outPath = resolve(SANDBOX_DIR, `${name}.tsx`);
  writeFileSync(outPath, output);
  console.log(`  ✓ ${name} → sandbox/templates/${name}.tsx (${refs.size} imports, ${collectionVars.length} collections)`);
  return true;
}

// ── CLI ──
const args = process.argv.slice(2).filter(a => !a.startsWith("--"));
const runAll = process.argv.includes("--all");

let names;
if (runAll) {
  names = readdirSync(OUTPUT_DIR)
    .filter(f => f.endsWith("-final.tsx"))
    .map(f => f.replace("-final.tsx", ""));
} else if (args.length > 0) {
  names = args;
} else {
  console.log("Usage: node sandbox-sync.mjs <name> [name...] | --all");
  process.exit(1);
}

console.log("Syncing pipeline output → sandbox templates");
let ok = 0, fail = 0;
for (const name of names) {
  if (syncTemplate(name)) ok++;
  else fail++;
}
console.log(`\nDone: ${ok} synced, ${fail} failed`);

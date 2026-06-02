#!/usr/bin/env node
/**
 * generate-skeleton.mjs — Generate block skeleton files mechanically.
 *
 * Reads interface JSON (props, helperTypes, sampleData, imports).
 * Writes a complete .tsx file with:
 *   - All imports (derived from interface JSON imports field)
 *   - Helper type interfaces
 *   - Props interface (all optional)
 *   - Default constants from sampleData
 *   - Export function with destructured props + defaults
 *   - TODO placeholder body for agent to fill
 *
 * Agent's only job: replace the TODO body with JSX from transformed file.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { parse } from "@babel/parser";
import _traverse from "@babel/traverse";
import * as t from "@babel/types";
import _generate from "@babel/generator";

const traverse = _traverse.default || _traverse;
const generate = _generate.default || _generate;
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../../..");
const BLOCKS_DIR = resolve(ROOT, "app/src/components/blocks");
const IFACE_DIR = resolve(ROOT, "artifacts/interfaces");
const MANIFEST = JSON.parse(readFileSync(resolve(ROOT, "code/pipeline/manifest.json"), "utf8"));

const cliArgs = process.argv.slice(2);
const snippetFilter = cliArgs.includes("--snippet") ? cliArgs[cliArgs.indexOf("--snippet") + 1] : null;

function toPascal(name) {
  return name.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase());
}

// ── Scan all type strings for external references ──
function findExternalTypes(iface) {
  const allTypeStrings = [
    ...iface.props.map(p => p.type),
    ...iface.helperTypes.flatMap(h => h.fields.map(f => f.type)),
  ].join(" ");

  const externals = new Set();
  const known = {
    ModalField: "@/types",
    SettingsToggle: "@/types",
    Member: "@/types",
    Status: "@/types",
    Priority: "@/types",
    BadgeColor: "@/lib/constants",
  };

  for (const [name, from] of Object.entries(known)) {
    if (allTypeStrings.includes(name)) {
      if (!externals.has(from)) externals.set = externals.set || new Map();
      externals.add(name);
    }
  }

  // Group by source
  const grouped = {};
  for (const name of externals) {
    const src = known[name];
    if (!grouped[src]) grouped[src] = [];
    grouped[src].push(name);
  }
  return grouped;
}

// ── Generate typed default value as code string ──
function defaultToCode(sample, typeName) {
  if (sample === null || sample === undefined) return null;
  if (typeof sample === "string") return JSON.stringify(sample);
  if (typeof sample === "number" || typeof sample === "boolean") return String(sample);

  // Arrays and objects — JSON with unquoted keys
  const json = JSON.stringify(sample, null, 2);
  // Unquote keys: "label": → label:
  return json.replace(/"([a-zA-Z_]\w*)":/g, "$1:");
}

// ── Build the skeleton file ──
function buildSkeleton(name, block, iface) {
  const cn = iface.componentName;
  const samples = iface.sampleData || {};
  const parts = [];

  // 1. Imports — from interface JSON
  const uiImports = iface.imports?.ui || [];
  const iconImports = iface.imports?.icons || [];
  if (uiImports.length) parts.push(`import { ${uiImports.join(", ")} } from "@medusajs/ui";`);
  if (iconImports.length) parts.push(`import { ${iconImports.join(", ")} } from "@medusajs/icons";`);

  // External type imports — scan ALL type strings
  const allTypeText = [
    ...iface.props.map(p => p.type),
    ...iface.helperTypes.flatMap(h => h.fields.map(f => f.type)),
  ].join(" ");

  const typeImports = [];
  if (allTypeText.includes("ReactNode")) typeImports.push('import type { ReactNode } from "react";');
  const typesFromTypes = [];
  for (const name of ["ModalField", "SettingsToggle", "Member", "Status", "Priority"]) {
    if (allTypeText.includes(name)) typesFromTypes.push(name);
  }
  if (typesFromTypes.length) typeImports.push(`import type { ${typesFromTypes.join(", ")} } from "@/types";`);
  if (allTypeText.includes("BadgeColor")) typeImports.push(`import type { BadgeColor } from "@/lib/constants";`);

  parts.push(...typeImports);
  if (parts.length) parts.push("");

  // 2. Helper types
  for (const ht of iface.helperTypes) {
    const fields = ht.fields.map(f =>
      `  ${f.name}${f.optional ? "?" : ""}: ${f.type};`
    ).join("\n");
    parts.push(`interface ${ht.name} {\n${fields}\n}`);
    parts.push("");
  }

  // 3. Props interface — all optional (defaults cover them)
  const propsFields = iface.props.map(p =>
    `  ${p.name}?: ${p.type};`
  ).join("\n");
  parts.push(`export interface ${cn}Props {\n${propsFields}\n}`);
  parts.push("");

  // 4. Default constants from sampleData
  const defaultVars = {};
  for (const prop of iface.props) {
    if (prop.type.includes("=>")) continue;
    const sample = samples[prop.name];
    if (sample === undefined || sample === "" || sample === null) continue;

    const varName = `DEFAULT_${prop.name.replace(/([A-Z])/g, "_$1").toUpperCase()}`;
    const code = defaultToCode(sample, prop.type);
    if (code) {
      // Use explicit type annotation for arrays/objects to avoid readonly issues
      if (Array.isArray(sample) || typeof sample === "object") {
        parts.push(`const ${varName}: ${prop.type} = ${code};`);
      } else {
        parts.push(`const ${varName} = ${code};`);
      }
      defaultVars[prop.name] = varName;
    }
  }
  if (Object.keys(defaultVars).length) parts.push("");

  // 5. Export function with destructured props
  const propEntries = iface.props.map(p => {
    if (p.type.includes("=>")) return p.name;
    if (defaultVars[p.name]) return `${p.name} = ${defaultVars[p.name]}`;
    return p.name;
  });

  const exportKw = block.export === "default" ? "export default" : "export";
  parts.push(`${exportKw} function ${cn}({`);
  parts.push(`  ${propEntries.join(",\n  ")},`);
  parts.push(`}: ${cn}Props) {`);
  parts.push(`  return (`);
  parts.push(`    // TODO: Agent fills from artifacts/transformed/${name}.tsx`);
  parts.push(`    <div>TODO</div>`);
  parts.push(`  );`);
  parts.push(`}`);

  return parts.join("\n") + "\n";
}

// ── Main ──
mkdirSync(BLOCKS_DIR, { recursive: true });

const blocks = Object.entries(MANIFEST.blocks);
const filtered = snippetFilter ? blocks.filter(([n]) => n === snippetFilter) : blocks;

console.log("=== Generate Skeletons ===\n");

for (const [name, block] of filtered) {
  const ifacePath = resolve(IFACE_DIR, `${name}.json`);
  if (!existsSync(ifacePath)) {
    console.log(`  SKIP ${name} — no interface`);
    continue;
  }
  const iface = JSON.parse(readFileSync(ifacePath, "utf8"));
  const content = buildSkeleton(name, block, iface);
  const outPath = resolve(BLOCKS_DIR, `${toPascal(name)}.tsx`);
  writeFileSync(outPath, content);
  console.log(`  ✓ ${name} → ${toPascal(name)}.tsx`);
}

console.log(`\n✓ ${filtered.length} skeletons written`);

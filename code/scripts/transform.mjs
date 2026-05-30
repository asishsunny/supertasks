#!/usr/bin/env node
/**
 * Transform orchestrator — pipes Figma MCP JSX through focused modules.
 *
 * Modules:
 *   transform/resolve-tokens.mjs    — CSS var tokens → Tailwind classes
 *   transform/detect-components.mjs — Figma elements → Medusa UI components
 *   transform/helpers.mjs           — shared AST utilities
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { parse } from "@babel/parser";
import _traverse from "@babel/traverse";
import _generate from "@babel/generator";
import * as t from "@babel/types";
import { createRequire } from "module";

import { getAttr, makeJSXElement } from "./transform/helpers.mjs";
import { createTokenResolver } from "./transform/resolve-tokens.mjs";
import { createDetector } from "./transform/detect-components.mjs";
const traverse = _traverse.default || _traverse;
const generate = _generate.default || _generate;

const __dirname = dirname(fileURLToPath(import.meta.url));
const MAPS = JSON.parse(readFileSync(resolve(__dirname, "../maps/token-maps.json"), "utf8"));

const require = createRequire(resolve(__dirname, "../../app/package.json"));
const yaml = require("js-yaml");

// ── Initialize modules ──
const DATA_YAML_PATH = resolve(__dirname, "../../data/data.yaml");
const data = yaml.load(readFileSync(DATA_YAML_PATH, "utf8"));

const { transformClassList } = createTokenResolver(MAPS);
const { detectAndSwap, patternDetectAndSwap, getWarnings } = createDetector(MAPS.components, data);

// ── AST transform pipeline ──
function transformAST(code) {
  const wrapped = code.trim().startsWith("<") ? `<>${code}</>` : code;
  const ast = parse(wrapped, { sourceType: "module", plugins: ["jsx", "typescript"] });

  // ── Pass 1: Strip Figma scaffolding (component defs, asset URLs, decorative elements) ──
  const exportedFnNames = new Set();
  traverse(ast, { ExportDefaultDeclaration(path) { if (t.isFunctionDeclaration(path.node.declaration)) exportedFnNames.add(path.node.declaration.id?.name); } });
  traverse(ast, {
    FunctionDeclaration(path) { if (!exportedFnNames.has(path.node.id?.name)) path.remove(); },
    TSTypeAliasDeclaration(path) { if (path.node.id?.name?.endsWith("Props") && !exportedFnNames.has(path.node.id.name.replace("Props", ""))) path.remove(); },
    VariableDeclaration(path) { for (const decl of path.node.declarations) { if (t.isStringLiteral(decl.init) && decl.init.value.includes("figma.com/api/mcp/asset")) { path.remove(); return; } } },
  });

  // ── Pass 2: Component detection (structural patterns first, then config rules) ──
  traverse(ast, {
    JSXElement(path) {
      try { if (patternDetectAndSwap(path)) path.skip(); } catch {}
    }
  });
  traverse(ast, { JSXElement(path) { try { detectAndSwap(path); } catch {} } });

  // ── Pass 3: Token resolution + attribute cleanup ──
  traverse(ast, {
    JSXAttribute(path) {
      const name = path.node.name?.name;
      if (name === "data-node-id" || name === "data-name") { path.remove(); return; }
      if (name === "id" && t.isStringLiteral(path.node.value) && path.node.value.value.startsWith("node-")) { path.remove(); return; }
      if (name === "className") {
        if (t.isStringLiteral(path.node.value)) {
          const resolved = transformClassList(path.node.value.value);
          if (!resolved) path.remove();
          else path.node.value = t.stringLiteral(resolved);
        } else if (t.isJSXExpressionContainer(path.node.value)) {
          path.traverse({
            StringLiteral(innerPath) { innerPath.node.value = transformClassList(innerPath.node.value); },
            TemplateLiteral(innerPath) { for (const quasi of innerPath.node.quasis) { const r = transformClassList(quasi.value.raw); quasi.value.raw = r; quasi.value.cooked = r; } },
          });
        }
      }
    },
    JSXElement(path) {
      const opening = path.node.openingElement;
      const attrs = opening.attributes;
      const isAriaHidden = attrs.some(a => t.isJSXAttribute(a) && a.name?.name === "aria-hidden");
      const classAttr = attrs.find(a => t.isJSXAttribute(a) && a.name?.name === "className" && t.isStringLiteral(a.value));
      if (isAriaHidden && classAttr && classAttr.value.value.includes("absolute") && classAttr.value.value.includes("inset-0") && classAttr.value.value.includes("pointer-events-none")) { path.remove(); return; }
      if (classAttr && path.node.openingElement.selfClosing) {
        const cls = classAttr.value.value;
        if (cls.includes("absolute") && cls.includes("inset-0") && cls.includes("pointer-events-none") && cls.includes("rounded-[inherit]")) { path.remove(); return; }
      }
      if (t.isJSXIdentifier(opening.name) && opening.name.name === "img") {
        const srcAttr = attrs.find(a => t.isJSXAttribute(a) && a.name?.name === "src" && t.isJSXExpressionContainer(a.value));
        const altAttr = attrs.find(a => t.isJSXAttribute(a) && a.name?.name === "alt" && t.isStringLiteral(a.value) && a.value.value === "");
        if (srcAttr && altAttr) { path.remove(); return; }
      }
    },
  });

  // ── Pass 4: Class cleanup (Figma defaults that don't affect output) ──
  // flex-col + items-start → strip items-start (Figma default, not needed)
  traverse(ast, {
    JSXAttribute(path) {
      if (path.node.name?.name !== "className" || !t.isStringLiteral(path.node.value)) return;
      const cls = path.node.value.value;
      if (cls.includes("flex-col") && cls.includes("items-start")) {
        const classes = cls.split(" ").filter(c => c !== "items-start");
        path.node.value = t.stringLiteral(classes.join(" "));
      }
    },
    noScope: true,
  });

  // Extract fragment body
  let output = "";
  traverse(ast, {
    JSXFragment(path) {
      output = path.node.children.map(c => generate(c, { jsescapeOption: { minimal: true }, compact: false }).code).join("");
      path.stop();
    },
    noScope: true,
  });
  if (!output) {
    output = generate(ast, { jsescapeOption: { minimal: true }, retainLines: false, compact: false }).code;
  }
  output = output.trim();
  return output;
}

// ── CLI ──
const args = process.argv.slice(2);
if (args.length === 0) { console.log("Usage: node transform.mjs <input.jsx> [--out output.tsx] [--raw]"); process.exit(1); }

const raw = args.includes("--raw");
const inputFile = args.find(a => !a.startsWith("--"));
const outIdx = args.indexOf("--out");
const outputFile = outIdx !== -1 ? args[outIdx + 1] : null;

const input = readFileSync(resolve(process.cwd(), inputFile), "utf8");
const output = transformAST(input, { table: !raw });

const warnings = getWarnings();
if (warnings.length) warnings.forEach(w => process.stderr.write(w + "\n"));

if (outputFile) {
  writeFileSync(resolve(process.cwd(), outputFile), output);
  console.log(`Written: ${outputFile}`);
} else {
  console.log(output);
}

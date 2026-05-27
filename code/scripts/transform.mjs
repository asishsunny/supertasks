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
function transformAST(code, { table = true } = {}) {
  const wrapped = code.trim().startsWith("<") ? `<>${code}</>` : code;
  const ast = parse(wrapped, { sourceType: "module", plugins: ["jsx", "typescript"] });

  // Pass 0: Strip Figma-generated component defs + asset URLs
  const exportedFnNames = new Set();
  traverse(ast, { ExportDefaultDeclaration(path) { if (t.isFunctionDeclaration(path.node.declaration)) exportedFnNames.add(path.node.declaration.id?.name); } });
  traverse(ast, {
    FunctionDeclaration(path) { if (!exportedFnNames.has(path.node.id?.name)) path.remove(); },
    TSTypeAliasDeclaration(path) { if (path.node.id?.name?.endsWith("Props") && !exportedFnNames.has(path.node.id.name.replace("Props", ""))) path.remove(); },
    VariableDeclaration(path) { for (const decl of path.node.declarations) { if (t.isStringLiteral(decl.init) && decl.init.value.includes("figma.com/api/mcp/asset")) { path.remove(); return; } } },
  });

  // Pass 0.5: Structural pattern detection (on raw Figma classes)
  traverse(ast, {
    JSXElement(path) {
      try { if (patternDetectAndSwap(path)) path.skip(); } catch {}
    }
  });

  // Pass 1: Config-driven component detection
  traverse(ast, { JSXElement(path) { try { detectAndSwap(path); } catch {} } });

  // Pass 2: Token resolution + noise strip
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

  // Pass 2.2: Strip page-level title rows (shell owns headers)
  traverse(ast, {
    JSXElement(path) {
      const attrs = path.node.openingElement.attributes;
      const cls = getAttr(attrs, "className");
      if (!cls || !cls.includes("flex") || !cls.includes("items-center")) return;
      const children = path.node.children.filter(c => t.isJSXElement(c) || (t.isJSXText(c) && c.value.trim()));
      const has24pxTitle = children.some(c => t.isJSXElement(c) && (() => {
        const cc = getAttr(c.openingElement.attributes, "className");
        return cc && cc.includes("text-[24px]");
      })());
      if (has24pxTitle && children.length <= 3) { path.remove(); return; }
    },
    noScope: true,
  });

  // Pass 2.3: flex-col + items-start → strip items-start
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

  // Pass 2.5: Asymmetric Padding → Spacer Cell
  traverse(ast, {
    JSXElement(path) {
      const opening = path.node.openingElement;
      const classAttr = opening.attributes.find(a => t.isJSXAttribute(a) && a.name?.name === "className" && t.isStringLiteral(a.value));
      if (!classAttr) return;
      const classes = classAttr.value.value.split(" ");
      if (!classes.includes("flex") && !classes.some(c => c.startsWith("flex"))) return;
      if (!classes.includes("items-center")) return;
      const plCls = classes.find(c => c.startsWith("pl-") && !c.includes("["));
      const prCls = classes.find(c => c.startsWith("pr-") && !c.includes("["));
      if (!plCls || !prCls) return;
      const pl = parseInt(plCls.slice(3));
      const pr = parseInt(prCls.slice(3));
      if (isNaN(pl) || isNaN(pr) || pr <= pl) return;
      const diffPx = (pr - pl) * 4;
      const gapCls = classes.find(c => c.startsWith("gap-") && !c.includes("["));
      const gapPx = gapCls ? parseInt(gapCls.slice(4)) * 4 : 0;
      const spacerPx = diffPx - gapPx;
      if (spacerPx <= 0) return;
      const newClasses = classes.filter(c => c !== plCls && c !== prCls).concat(`px-${pl}`);
      classAttr.value = t.stringLiteral(newClasses.join(" "));
      const spacer = makeJSXElement("div", { className: `shrink-0 w-[${spacerPx}px]` }, [], true);
      path.node.children.push(spacer);
      if (path.node.closingElement === null) {
        path.node.openingElement.selfClosing = false;
        path.node.closingElement = t.jsxClosingElement(t.jsxIdentifier(opening.name.name));
      }
    },
    noScope: true
  });

  // Pass 2.7: Div-table → Medusa Table conversion
  if (table) traverse(ast, {
    JSXElement(path) {
      const el = path.node;
      const children = el.children.filter(c => t.isJSXElement(c));
      const getClsVal = (node) => {
        const a = node.openingElement.attributes.find(a => t.isJSXAttribute(a) && a.name?.name === "className" && t.isStringLiteral(a.value));
        return a ? a.value.value : "";
      };
      const isRowLike = (cls) => cls.includes("h-12") && cls.includes("items-center") && cls.includes("px-6");
      const headerChild = children.find(c => { const cls = getClsVal(c); return cls.includes("bg-ui-bg-subtle") && isRowLike(cls); });
      const dataChildren = children.filter(c => { const cls = getClsVal(c); return !cls.includes("bg-ui-bg-subtle") && isRowLike(cls); });
      if (!headerChild || dataChildren.length === 0) return;

      const extractWidth = (cls) => {
        const m = cls.match(/(?<!\bmin-)w-\[(\d+)px\]/);
        return m ? `w-[${m[1]}px]` : null;
      };

      const headerCells = headerChild.children.filter(c => t.isJSXElement(c)).map(cell => {
        const cls = getClsVal(cell);
        const width = extractWidth(cls);
        const texts = [];
        const walk = (n) => { if (t.isJSXText(n) && n.value.trim()) texts.push(n.value.trim()); if (t.isJSXElement(n)) for (const c of n.children || []) walk(c); };
        walk(cell);
        if (texts.length > 0) {
          const props = {};
          if (width) props.className = width;
          return makeJSXElement("Table.HeaderCell", props, [t.jsxText(texts[0])], false);
        }
        return makeJSXElement("Table.HeaderCell", { className: "w-7" }, [], true);
      });

      const templateRow = dataChildren[0];
      const dataCells = templateRow.children.filter(c => t.isJSXElement(c)).map(cell => {
        const cls = getClsVal(cell);
        const width = extractWidth(cls);
        const innerChildren = cell.children.filter(c => !t.isJSXText(c) || c.value.trim());
        const props = {};
        if (width) props.className = width;
        else if (cls.includes("shrink-0") && !cls.includes("flex-1")) props.className = "w-7";
        return makeJSXElement("Table.Cell", props, innerChildren, innerChildren.length === 0);
      });

      const headerRow = makeJSXElement("Table.Row", {}, headerCells, false);
      const header = makeJSXElement("Table.Header", { className: "border-t-0" }, [headerRow], false);
      const dataRow = makeJSXElement("Table.Row", {}, dataCells, false);
      const body = makeJSXElement("Table.Body", {}, [dataRow], false);
      const table = makeJSXElement("Table", {}, [header, body], false);

      el.children = [table];
      if (el.openingElement.selfClosing) {
        el.openingElement.selfClosing = false;
        const tagName = t.isJSXIdentifier(el.openingElement.name) ? el.openingElement.name.name : "div";
        el.closingElement = t.jsxClosingElement(t.jsxIdentifier(tagName));
      }
      path.skip();
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

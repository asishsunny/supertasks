#!/usr/bin/env node
/**
 * templatize.mjs — Post-transform pipeline step.
 *
 * Takes transform.mjs output (static JSX with resolved tokens),
 * strips Figma noise, resolves remaining raw CSS to DS tokens,
 * deduplicates repeated siblings into .map() templates.
 *
 * Generic — works for any screen output, not kanban-specific.
 *
 * Usage: node templatize.mjs <transformed.tsx> [--out output.tsx]
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { parse } from "@babel/parser";
import _traverse from "@babel/traverse";
import _generate from "@babel/generator";
import * as t from "@babel/types";

const traverse = _traverse.default || _traverse;
const generate = _generate.default || _generate;

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");

const textStylesRef = JSON.parse(readFileSync(resolve(ROOT, "reference/text-styles.json"), "utf8"));
const tokenMaps = JSON.parse(readFileSync(resolve(ROOT, "code/maps/token-maps.json"), "utf8"));

// ── Noise classes: sourced from token-maps.json.noise.strip ──
const noiseConfig = tokenMaps.noise || {};
const NOISE = new Set(noiseConfig.strip || []);
const NOISE_PATTERNS = (noiseConfig.strip_patterns || []).map(p => new RegExp(`^${p}$`));
const REPLACE_WIDTHS = noiseConfig.replace_fixed_widths || {};

// ── Raw CSS → DS text token map ──
// Built mechanically from token-maps.json.textStyles.
// MCP emits raw font props (font-normal text-sm leading-[20px]) instead of
// DS classes (txt-compact-medium). This map resolves them.

const SIZE_TO_PX = tokenMaps.fontSizeToPx || {};
const WEIGHT_TO_TW = tokenMaps.fontWeightToTw || {};
const PX_TO_TW_SIZE = tokenMaps.pxToTwSize || {};

const RAW_TEXT_GROUPS = [];
for (const style of tokenMaps.textStyles) {
  const px = SIZE_TO_PX[style.size] || style.size;
  const weightClass = WEIGHT_TO_TW[style.weight] || `font-[${style.weight}]`;
  const sizeVariants = PX_TO_TW_SIZE[px] || [`text-[${px}px]`];
  const leading = style.leading;

  for (const sizeClass of sizeVariants) {
    const match = [weightClass, sizeClass];
    if (leading && leading !== "normal") match.push(`leading-[${leading}]`);
    RAW_TEXT_GROUPS.push({ match, token: style.out });

    // Also match with leading-[normal] for 12px
    if (px === "12") {
      RAW_TEXT_GROUPS.push({ match: [weightClass, sizeClass, "leading-[normal]"], token: style.out });
    }
  }
}

function stripAndResolve(classStr) {
  let classes = classStr.split(/\s+/).filter(Boolean);

  // Resolve text styles FIRST (before noise strip removes leading-[20px] etc.)
  for (const { match, token } of RAW_TEXT_GROUPS) {
    if (match.every(m => classes.includes(m))) {
      classes = classes.filter(c => !match.includes(c));
      classes.push(token);
    }
  }

  // Then strip noise
  classes = classes.filter(c => {
    if (NOISE.has(c)) return false;
    if (NOISE_PATTERNS.some(p => p.test(c))) return false;
    return true;
  });

  // Replace fixed widths (e.g. w-[1136px] → w-full)
  classes = classes.map(c => c in REPLACE_WIDTHS ? REPLACE_WIDTHS[c] : c).filter(Boolean);

  return classes.join(" ");
}

// ── Structural signature for dedup ──
function structuralSig(node) {
  if (!t.isJSXElement(node)) return null;
  const clone = t.cloneNode(node, true);

  // Strip whitespace-only JSXText nodes before signature
  clone.children = (clone.children || []).filter(
    c => !(t.isJSXText(c) && !c.value.trim())
  );
  const miniAst = t.file(t.program([t.expressionStatement(clone)]));
  traverse(miniAst, {
    // Strip whitespace-only text from nested elements too
    JSXElement(p) {
      p.node.children = p.node.children.filter(
        c => !(t.isJSXText(c) && !c.value.trim())
      );
    },
    // KEEP text content — elements with different text are NOT duplicates
    // Only normalize classNames (structural, not content)
    StringLiteral(p) {
      // Normalize className values but keep other strings (e.g. text in attributes)
      const parent = p.parent;
      if (t.isJSXAttribute(parent) && parent.name?.name === "className") {
        p.node.value = "_cls";
      }
    },
    NumericLiteral(p) { p.node.value = 0; },
    // Normalize JSX element names (SquareGreySolid → _Component)
    JSXIdentifier(p) {
      const name = p.node.name;
      if (name[0] === name[0].toUpperCase() && name !== "Badge" && name !== "Table") {
        p.node.name = "_C";
      }
    },
    // Normalize JSX expressions
    JSXExpressionContainer(p) {
      if (!t.isJSXEmptyExpression(p.node.expression)) {
        p.node.expression = t.identifier("_expr");
      }
    },
    noScope: true,
  });

  const code = generate(clone, { compact: true, comments: false }).code;
  return code.replace(/\s+/g, " ").trim();
}

// ── Main ──
function templatize(code) {
  const stripped = code.trim().replace(/^(\/\/[^\n]*\n)+/, "").trimStart();
  const wrapped = stripped.startsWith("export") || stripped.startsWith("function") || stripped.startsWith("import")
    ? code
    : `<>${code}</>`;

  const ast = parse(wrapped, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });

  // Pass 1: Strip noise + resolve text styles
  traverse(ast, {
    JSXAttribute(path) {
      if (path.node.name?.name !== "className") return;
      if (t.isStringLiteral(path.node.value)) {
        const resolved = stripAndResolve(path.node.value.value);
        if (!resolved) path.remove();
        else path.node.value = t.stringLiteral(resolved);
      } else if (t.isJSXExpressionContainer(path.node.value)) {
        path.traverse({
          StringLiteral(inner) {
            inner.node.value = stripAndResolve(inner.node.value);
          },
        });
      }
    },
  });

  // Pass 2: Strip Figma component defs (SquareGreySolid etc) that are inline
  // Keep references but remove function declarations
  const keepFns = new Set();
  traverse(ast, {
    ExportDefaultDeclaration(path) {
      if (t.isFunctionDeclaration(path.node.declaration)) {
        keepFns.add(path.node.declaration.id?.name);
      }
    },
  });
  traverse(ast, {
    FunctionDeclaration(path) {
      if (!keepFns.has(path.node.id?.name)) path.remove();
    },
  });

  // Pass 3: Dedup structurally identical siblings
  // Groups siblings by structural signature, keeps first, marks with data-repeat="N"
  // Only dedup elements with enough depth (>= MIN_DEPTH lines) to avoid
  // collapsing distinct fields that happen to share structure (e.g. name + date).
  const MIN_DEPTH = 3; // minimum child element count or nesting depth to consider

  function dedupChildren(parentPath) {
    const children = parentPath.node ? parentPath.node.children : parentPath.children;
    if (!children) return;

    const elements = [];
    for (let i = 0; i < children.length; i++) {
      if (t.isJSXElement(children[i])) {
        // Count nested JSXElements as depth proxy
        let nested = 0;
        const miniAst = t.file(t.program([t.expressionStatement(t.cloneNode(children[i], false))]));
        traverse(miniAst, { JSXElement() { nested++; }, noScope: true });
        elements.push({ idx: i, node: children[i], sig: structuralSig(children[i]), depth: nested });
      }
    }
    if (elements.length < 2) return;

    // Only consider elements with enough nesting to be "data rows", not leaf fields
    const candidates = elements.filter(el => el.depth >= MIN_DEPTH);
    if (candidates.length < 2) return;

    const groups = {};
    const order = [];
    for (const el of candidates) {
      if (!el.sig) continue;
      if (!groups[el.sig]) { groups[el.sig] = []; order.push(el.sig); }
      groups[el.sig].push(el);
    }

    const toRemove = new Set();
    for (const sig of order) {
      const group = groups[sig];
      if (group.length < 2) continue;

      group[0].node.openingElement.attributes.push(
        t.jsxAttribute(
          t.jsxIdentifier("data-repeat"),
          t.stringLiteral(String(group.length))
        )
      );

      for (let k = 1; k < group.length; k++) {
        toRemove.add(group[k].node);
      }
    }

    if (toRemove.size > 0) {
      const filtered = children.filter(c => !toRemove.has(c));
      children.length = 0;
      filtered.forEach(c => children.push(c));
    }
  }

  // Run dedup bottom-up: deepest elements first, then parents.
  // Multiple passes until no more dedup happens.
  let changed = true;
  while (changed) {
    changed = false;
    traverse(ast, {
      JSXElement: {
        exit(path) {
          const before = path.node.children.filter(c => t.isJSXElement(c)).length;
          dedupChildren(path);
          const after = path.node.children.filter(c => t.isJSXElement(c)).length;
          if (after < before) changed = true;
        },
      },
      noScope: true,
    });
  }

  const output = generate(ast, {
    retainLines: false,
    compact: false,
    jsescapeOption: { minimal: true },
  }).code;

  return output;
}

// ── CLI ──
const args = process.argv.slice(2);
const inputFile = args.find(a => !a.startsWith("--"));
const outIdx = args.indexOf("--out");
const outputFile = outIdx !== -1 ? args[outIdx + 1] : null;

if (!inputFile) {
  console.log("Usage: node templatize.mjs <transformed.tsx> [--out output.tsx]");
  process.exit(1);
}

const input = readFileSync(resolve(process.cwd(), inputFile), "utf8");
const output = templatize(input);

if (outputFile) {
  const outPath = resolve(process.cwd(), outputFile);
  if (existsSync(outPath) && readFileSync(outPath, "utf8") === output) {
    console.log(`Unchanged: ${outputFile}`);
  } else {
    writeFileSync(outPath, output);
    console.log(`Written: ${outputFile}`);
  }
} else {
  console.log(output);
}

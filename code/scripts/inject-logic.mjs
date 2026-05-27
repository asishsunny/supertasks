#!/usr/bin/env node
/**
 * inject-logic.mjs — Wrap data-repeat elements in .map() iterations.
 *
 * Takes templatize.mjs output (deduped JSX with data-repeat markers) +
 * snippet JS (contains DATA with collections) →
 * emits JSX with .map() / .filter().map() wrapping. Placeholder content stays as-is.
 *
 * Generic — extracts DATA from any snippet, detects collections,
 * detects foreign keys for nested .filter(), adds key props.
 *
 * Usage: node inject-logic.mjs <templatized.tsx> --snippet <snippet.js> [--out output.tsx]
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { parse } from "@babel/parser";
import _traverse from "@babel/traverse";
import _generate from "@babel/generator";
import * as t from "@babel/types";
import { bindData } from "./bind-data.mjs";
import { iterVarName, buildMemberExpr } from "./ast-utils.mjs";

const traverse = _traverse.default || _traverse;
const generate = _generate.default || _generate;

function extractSnippetData(snippetPath) {
  const src = readFileSync(snippetPath, "utf8");

  const dataMatch = src.match(/const DATA\s*=\s*\{/);
  if (!dataMatch) return null;

  const start = dataMatch.index;
  let depth = 0;
  let end = start;
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
    console.error("Failed to eval snippet DATA:", e.message);
    return null;
  }
}

function detectCollections(data) {
  const collections = [];
  for (const [key, val] of Object.entries(data)) {
    if (Array.isArray(val) && val.length > 0 && typeof val[0] === "object") {
      const col = {
        key,
        items: val,
        fields: Object.keys(val[0]),
        count: val.length,
      };
      collections.push(col);

      // Detect nested collections inside first item (e.g. cards[0].rows)
      for (const [subKey, subVal] of Object.entries(val[0])) {
        if (Array.isArray(subVal) && subVal.length > 0 && typeof subVal[0] === "object") {
          collections.push({
            key: subKey,
            items: subVal,
            fields: Object.keys(subVal[0]),
            count: subVal.length,
            parentKey: key,
          });
        }
      }
    }
  }
  return collections;
}

function getTextsInElement(path) {
  const texts = [];
  path.traverse({
    JSXText(tp) { const v = tp.node.value.trim(); if (v) texts.push(v); },
    noScope: true,
  });
  return texts;
}

function matchCollectionToElement(collections, repeatCount, texts, DATA) {
  for (const col of collections) {
    if (col.count === repeatCount) return col;
  }

  for (const col of collections) {
    for (const item of col.items) {
      for (const val of Object.values(item)) {
        const strVal = typeof val === "object" ? (val?.label || "") : String(val);
        if (strVal && texts.includes(strVal)) return col;
      }
    }
  }

  return null;
}

function detectForeignKey(childCol, parentCol) {
  const parentKeyField = parentCol.items[0].key !== undefined ? "key"
    : parentCol.items[0].id !== undefined ? "id"
    : null;
  if (!parentKeyField) return null;

  const parentKeys = new Set(parentCol.items.map(i => String(i[parentKeyField])));

  for (const field of childCol.fields) {
    const childValues = childCol.items.map(i => String(i[field]));
    if (childValues.every(v => parentKeys.has(v))) {
      return { childField: field, parentField: parentKeyField };
    }
  }
  return null;
}

function isAncestor(parent, child) {
  if (!parent.children) return false;
  for (const c of parent.children) {
    if (c === child) return true;
    if (t.isJSXElement(c) && isAncestor(c, child)) return true;
  }
  return false;
}

function injectLogic(templateCode, snippetPath) {
  const DATA = extractSnippetData(snippetPath);
  if (!DATA) {
    console.error("Could not extract DATA from snippet");
    return templateCode;
  }

  const collections = detectCollections(DATA);

  console.log(`  Collections: ${collections.map(c => `${c.key}(${c.count})`).join(", ")}`);

  const ast = parse(templateCode, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });

  // Pass 1: Collect data-repeat elements, match to collections
  const repeatElements = [];
  traverse(ast, {
    JSXElement(path) {
      const repeatAttr = path.node.openingElement.attributes.find(
        a => t.isJSXAttribute(a) && a.name?.name === "data-repeat"
      );
      if (!repeatAttr) return;
      const repeatCount = parseInt(repeatAttr.value.value);
      const texts = getTextsInElement(path);
      const matched = matchCollectionToElement(collections, repeatCount, texts, DATA);
      if (matched) {
        repeatElements.push({ node: path.node, repeatCount, matched });
      } else {
        console.warn(`  No collection match for data-repeat="${repeatCount}"`);
      }
    },
  });

  // Detect nesting
  for (const el of repeatElements) {
    el.parent = repeatElements.find(other =>
      other !== el && isAncestor(other.node, el.node)
    ) || null;
  }

  // Pass 2: Remove data-repeat attrs, add key props
  for (const el of repeatElements) {
    const iterVar = iterVarName(el.matched.key);

    el.node.openingElement.attributes = el.node.openingElement.attributes.filter(
      a => !(t.isJSXAttribute(a) && a.name?.name === "data-repeat")
    );

    const firstItem = el.matched.items[0];
    const keyField = firstItem.id !== undefined ? "id"
      : firstItem.key !== undefined ? "key"
      : null;
    if (keyField) {
      el.node.openingElement.attributes.push(
        t.jsxAttribute(
          t.jsxIdentifier("key"),
          t.jsxExpressionContainer(buildMemberExpr(`${iterVar}.${keyField}`))
        )
      );
    }
  }

  // Pass 3: Wrap in .map() bottom-up (children first)
  const bottomUp = [...repeatElements].sort((a, b) => (a.parent ? -1 : 0) - (b.parent ? -1 : 0));

  for (const el of bottomUp) {
    const iterVar = iterVarName(el.matched.key);

    let collectionNode;
    if (el.parent) {
      const parentIterVar = iterVarName(el.parent.matched.key);
      const fk = detectForeignKey(el.matched, el.parent.matched);
      if (fk) {
        collectionNode = t.callExpression(
          t.memberExpression(t.identifier(el.matched.key), t.identifier("filter")),
          [t.arrowFunctionExpression(
            [t.identifier(iterVar)],
            t.binaryExpression(
              "===",
              t.memberExpression(t.identifier(iterVar), t.identifier(fk.childField)),
              t.memberExpression(t.identifier(parentIterVar), t.identifier(fk.parentField))
            )
          )]
        );
        console.log(`  data-repeat="${el.repeatCount}" → ${el.matched.key}.filter(${iterVar} => ${iterVar}.${fk.childField} === ${parentIterVar}.${fk.parentField}).map(...)`);
      } else if (el.matched.parentKey) {
        // Nested collection: card.rows not just rows
        collectionNode = t.memberExpression(t.identifier(parentIterVar), t.identifier(el.matched.key));
        console.log(`  data-repeat="${el.repeatCount}" → ${parentIterVar}.${el.matched.key}.map(${iterVar} => ...)`);
      } else {
        collectionNode = t.identifier(el.matched.key);
        console.log(`  data-repeat="${el.repeatCount}" → ${el.matched.key}.map(${iterVar} => ...)`);
      }
    } else {
      collectionNode = t.identifier(el.matched.key);
      console.log(`  data-repeat="${el.repeatCount}" → ${el.matched.key}.map(${iterVar} => ...)`);
    }

    traverse(ast, {
      JSXElement(path) {
        if (path.node !== el.node) return;
        const mapBody = t.cloneNode(path.node, true);
        const mapExpr = t.jsxExpressionContainer(
          t.callExpression(
            t.memberExpression(collectionNode, t.identifier("map")),
            [t.arrowFunctionExpression([t.identifier(iterVar)], mapBody)]
          )
        );
        path.replaceWith(mapExpr);
        path.stop();
      },
    });
  }

  // Pass 4: Bind placeholder text to data fields
  // For each .map() callback, match static text against first item's values
  for (const el of repeatElements) {
    const iterVar = iterVarName(el.matched.key);
    const firstItem = el.matched.items[0];

    const valueMap = new Map();
    for (const [field, val] of Object.entries(firstItem)) {
      if (Array.isArray(val)) continue;
      if (val !== null && typeof val === "object") {
        for (const [subKey, subVal] of Object.entries(val)) {
          if (typeof subVal === "string" || typeof subVal === "number") {
            valueMap.set(String(subVal).toLowerCase(), `${iterVar}.${field}.${subKey}`);
          }
        }
      } else if (typeof val === "string" || typeof val === "number") {
        valueMap.set(String(val).toLowerCase(), `${iterVar}.${field}`);
      }
    }

    traverse(ast, {
      JSXText(path) {
        const text = path.node.value.trim();
        if (!text) return;
        const expr = valueMap.get(text.toLowerCase());
        if (expr) {
          path.replaceWith(t.jsxExpressionContainer(buildMemberExpr(expr)));
        }
      },
      noScope: true,
    });
  }

  // Pass 5: Resolve undefined components (SquareGreySolid etc.) → status dot div
  const KNOWN_COMPONENTS = new Set(["Badge", "IconButton", "ColorAvatar", "Table", "Button", "Input", "Switch", "EllipsisHorizontal"]);
  traverse(ast, {
    JSXElement(path) {
      const name = path.node.openingElement.name;
      if (!t.isJSXIdentifier(name)) return;
      const n = name.name;
      if (n[0] !== n[0].toUpperCase()) return;
      if (KNOWN_COMPONENTS.has(n)) return;

      const classAttr = path.node.openingElement.attributes.find(
        a => t.isJSXAttribute(a) && a.name?.name === "className"
      );
      const newAttrs = classAttr ? [classAttr] : [];
      path.replaceWith(t.jsxElement(
        t.jsxOpeningElement(t.jsxIdentifier("div"), newAttrs, true),
        null, [], true
      ));
    },
    noScope: true,
  });

  // Pass 6: Resolve orphan expressions inside .map() callbacks
  // Handles: member={member} → member={row.user}, task.priority → row.priority
  for (const el of repeatElements) {
    const iterVar = iterVarName(el.matched.key);
    const firstItem = el.matched.items[0];
    const itemFields = new Set(Object.keys(firstItem));

    // Check if DATA has a members lookup table
    const hasMembers = DATA.members && typeof DATA.members === "object";

    traverse(ast, {
      CallExpression(path) {
        if (!t.isMemberExpression(path.node.callee)) return;
        if (!t.isIdentifier(path.node.callee.property, { name: "map" })) return;
        const arrow = path.node.arguments[0];
        if (!t.isArrowFunctionExpression(arrow)) return;
        if (!arrow.params[0] || arrow.params[0].name !== iterVar) return;

        // Scan for orphan MemberExpressions: X.field where X is not iterVar
        path.traverse({
          MemberExpression(mp) {
            if (!t.isIdentifier(mp.node.object)) return;
            const base = mp.node.object.name;
            if (base === iterVar || base === "index" || base === "DATA") return;
            if (base === "PRIORITY_COLOR" || base === "BAR_COLORS" || base === "STATUS_LABEL") return;
            if (base === "Math" || base === "console" || base === "window") return;

            const field = t.isIdentifier(mp.node.property) ? mp.node.property.name : null;
            if (!field) return;

            // If the iterator's collection items have this field, rewrite base → iterVar
            if (itemFields.has(field)) {
              mp.node.object = t.identifier(iterVar);
            }
          },
          noScope: true,
        });

        // Collect all orphan base identifiers that couldn't match any field
        const collectionNames = new Set(collections.map(c => c.key));
        const allIterVars = new Set(repeatElements.map(re => iterVarName(re.matched.key)));
        const orphanBases = new Set();
        path.traverse({
          MemberExpression(mp) {
            if (!t.isIdentifier(mp.node.object)) return;
            const base = mp.node.object.name;
            if (base === iterVar || base === "index" || base === "DATA") return;
            if (base === "PRIORITY_COLOR" || base === "BAR_COLORS" || base === "STATUS_LABEL") return;
            if (base === "Math" || base === "console" || base === "window") return;
            if (collectionNames.has(base)) return;
            if (allIterVars.has(base)) return;
            const field = t.isIdentifier(mp.node.property) ? mp.node.property.name : null;
            if (field && !itemFields.has(field)) {
              orphanBases.add(base);
            }
          },
          noScope: true,
        });

        // For remaining orphans, alias them to iterVar so they don't crash
        if (orphanBases.size > 0 && t.isJSXElement(arrow.body)) {
          const body = arrow.body;
          const stmts = [];
          for (const name of orphanBases) {
            stmts.push(t.variableDeclaration("const", [
              t.variableDeclarator(t.identifier(name), t.identifier(iterVar))
            ]));
          }
          stmts.push(t.returnStatement(body));
          arrow.body = t.blockStatement(stmts);
        }

        // Scan for orphan `member` identifier used as JSX prop value
        path.traverse({
          JSXExpressionContainer(jp) {
            if (!t.isIdentifier(jp.node.expression, { name: "member" })) return;

            if (hasMembers && itemFields.has("assignee")) {
              // member = DATA.members[iterVar.assignee]
              jp.node.expression = t.memberExpression(
                t.memberExpression(t.identifier("DATA"), t.identifier("members")),
                t.memberExpression(t.identifier(iterVar), t.identifier("assignee")),
                true // computed: DATA.members[task.assignee]
              );
            } else if (itemFields.has("user")) {
              // member = iterVar.user
              jp.node.expression = t.memberExpression(
                t.identifier(iterVar), t.identifier("user")
              );
            }
          },
          noScope: true,
        });
      },
      noScope: true,
    });
  }

  // Pass 7: Data binding (Badge colors, dates, counts, overdue, etc.)
  bindData(ast, repeatElements, DATA);

  // Pass 9: Cleanup — orphan dividers + fallback keys
  // Remove orphan siblings left after dedup (whitespace-only JSXText, lone dividers)
  traverse(ast, {
    JSXElement(path) {
      const children = path.node.children;
      const hasMap = children.some(c =>
        t.isJSXExpressionContainer(c) &&
        t.isCallExpression(c.expression) &&
        t.isMemberExpression(c.expression.callee) &&
        t.isIdentifier(c.expression.callee.property, { name: "map" })
      );
      if (!hasMap) return;

      // Find divider pattern (h-px elements)
      const isDivider = (node) => {
        if (!t.isJSXElement(node)) return false;
        const cls = node.openingElement.attributes.find(
          a => t.isJSXAttribute(a) && a.name?.name === "className" && t.isStringLiteral(a.value)
        );
        return cls && cls.value.value.includes("h-px");
      };

      const orphanDividers = children.filter(c => isDivider(c));
      if (orphanDividers.length > 0) {
        // Remove all orphan dividers from parent
        path.node.children = children.filter(c => !isDivider(c));
      }
    },
    noScope: true,
  });

  // Fallback key={index} for .map() callbacks missing keys
  traverse(ast, {
    CallExpression(path) {
      if (!t.isMemberExpression(path.node.callee)) return;
      if (!t.isIdentifier(path.node.callee.property, { name: "map" })) return;
      const arrow = path.node.arguments[0];
      if (!t.isArrowFunctionExpression(arrow)) return;
      const body = arrow.body;
      if (!t.isJSXElement(body)) return;

      const hasKey = body.openingElement.attributes.some(
        a => t.isJSXAttribute(a) && a.name?.name === "key"
      );
      if (hasKey) return;

      // Add index param and key={index}
      const indexParam = t.identifier("index");
      if (arrow.params.length < 2) arrow.params.push(indexParam);
      body.openingElement.attributes.push(
        t.jsxAttribute(
          t.jsxIdentifier("key"),
          t.jsxExpressionContainer(t.identifier("index"))
        )
      );
    },
    noScope: true,
  });

  return generate(ast, {
    retainLines: false,
    compact: false,
    jsescapeOption: { minimal: true },
  }).code;
}

// ── CLI ──
const args = process.argv.slice(2);
const inputFile = args.find(a => !a.startsWith("--"));
const outIdx = args.indexOf("--out");
const outputFile = outIdx !== -1 ? args[outIdx + 1] : null;
const snippetIdx = args.indexOf("--snippet");
const snippetFile = snippetIdx !== -1 ? args[snippetIdx + 1] : null;

if (!inputFile || !snippetFile) {
  console.log("Usage: node inject-logic.mjs <templatized.tsx> --snippet <snippet.js> [--out output.tsx]");
  process.exit(1);
}

const input = readFileSync(resolve(process.cwd(), inputFile), "utf8");
const output = injectLogic(input, resolve(process.cwd(), snippetFile));

if (outputFile) {
  writeFileSync(resolve(process.cwd(), outputFile), output);
  console.log(`Written: ${outputFile}`);
} else {
  console.log(output);
}

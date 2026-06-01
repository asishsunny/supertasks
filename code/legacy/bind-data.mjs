/**
 * bind-data.mjs — AST data binding passes.
 *
 * Derives bindings from DATA shape — field names, lookup tables,
 * foreign keys, and boolean conditionals are all detected, not hardcoded.
 */

import _traverse from "@babel/traverse";
import _generate from "@babel/generator";
import * as t from "@babel/types";
import { iterVarName, buildMemberExpr } from "./ast-utils.mjs";

const traverse = _traverse.default || _traverse;
const generate = _generate.default || _generate;

const DATE_RE = /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d/;

// ── Shape analysis ──────────────────────────────────────────────────

function detectLookups(DATA) {
  const lookups = {};
  for (const [key, val] of Object.entries(DATA)) {
    if (!val || typeof val !== "object" || Array.isArray(val)) continue;
    const entries = Object.values(val);
    if (!entries.length || typeof entries[0] !== "object") continue;
    const sample = entries[0];
    lookups[key] = {
      keys: new Set(Object.keys(val)),
      hasLabel: typeof sample?.label === "string",
      hasState: typeof sample?.state === "string",
      hasName: typeof sample?.name === "string",
    };
  }
  return lookups;
}

function findLookupRef(firstItem, lookups, predicate) {
  const skip = new Set(["id", "key"]);
  for (const [field, val] of Object.entries(firstItem)) {
    if (val == null || typeof val === "object") continue;
    if (skip.has(field)) continue;
    const strVal = String(val);
    for (const [name, lookup] of Object.entries(lookups)) {
      if (lookup.keys.has(strVal) && (!predicate || predicate(lookup))) {
        return { field, lookupName: name };
      }
    }
  }
  return null;
}

function detectStatusLabels(DATA) {
  const labels = new Set();
  for (const val of Object.values(DATA)) {
    if (Array.isArray(val) && val.length > 0 && val[0]?.key && val[0]?.label) {
      val.forEach(s => labels.add(s.label));
    }
  }
  return labels;
}

// ── Passes ──────────────────────────────────────────────────────────

function bindBadgeColor(ast, repeatElements) {
  for (const el of repeatElements) {
    const iterVar = iterVarName(el.matched.key);
    const firstItem = el.matched.items[0];

    const badgeField = Object.keys(firstItem).find(k => {
      const v = firstItem[k];
      return v && typeof v === "object" && !Array.isArray(v) && v.state;
    });
    if (!badgeField) continue;

    traverse(ast, {
      JSXElement(path) {
        const name = path.node.openingElement.name;
        if (!t.isJSXIdentifier(name) || name.name !== "Badge") return;
        const colorIdx = path.node.openingElement.attributes.findIndex(
          a => t.isJSXAttribute(a) && a.name?.name === "color"
        );
        if (colorIdx === -1) return;

        path.node.openingElement.attributes[colorIdx] = t.jsxAttribute(
          t.jsxIdentifier("color"),
          t.jsxExpressionContainer(
            t.memberExpression(
              t.identifier("BADGE_STATE_COLOR"),
              t.memberExpression(
                t.memberExpression(t.identifier(iterVar), t.identifier(badgeField)),
                t.identifier("state")
              ),
              true
            )
          )
        );
      },
      noScope: true,
    });
  }
}

function bindBadgeLabel(ast, repeatElements, lookups, DATA) {
  let ref = null;
  let refIterVar = null;
  for (const el of repeatElements) {
    const r = findLookupRef(el.matched.items[0], lookups, l => l.hasLabel);
    if (r) { ref = r; refIterVar = iterVarName(el.matched.key); break; }
  }
  if (!ref) return;

  const allLabels = new Set(
    Object.values(DATA[ref.lookupName]).map(v => v.label)
  );

  traverse(ast, {
    JSXElement(path) {
      const name = path.node.openingElement.name;
      if (!t.isJSXIdentifier(name) || name.name !== "Badge") return;

      const labelExpr = t.memberExpression(
        t.memberExpression(
          t.memberExpression(t.identifier("DATA"), t.identifier(ref.lookupName)),
          t.memberExpression(t.identifier(refIterVar), t.identifier(ref.field)),
          true
        ),
        t.identifier("label")
      );

      for (let i = 0; i < path.node.children.length; i++) {
        const c = path.node.children[i];
        if (t.isJSXText(c) && allLabels.has(c.value.trim())) {
          path.node.children[i] = t.jsxExpressionContainer(labelExpr);
          break;
        }
        if (t.isJSXExpressionContainer(c) && t.isMemberExpression(c.expression) &&
            t.isIdentifier(c.expression.property, { name: ref.field })) {
          path.node.children[i] = t.jsxExpressionContainer(labelExpr);
          break;
        }
      }
    },
    noScope: true,
  });
}

function ensureComponentDefaults(ast) {
  traverse(ast, {
    JSXElement(path) {
      const name = path.node.openingElement.name;
      if (!t.isJSXIdentifier(name) || name.name !== "IconButton") return;
      const hasVariant = path.node.openingElement.attributes.some(
        a => t.isJSXAttribute(a) && a.name?.name === "variant"
      );
      if (!hasVariant) {
        path.node.openingElement.attributes.push(
          t.jsxAttribute(t.jsxIdentifier("variant"), t.stringLiteral("transparent"))
        );
      }
    },
    noScope: true,
  });
}

function bindConditionalStyles(ast, repeatElements) {
  for (const el of repeatElements) {
    const iterVar = iterVarName(el.matched.key);
    const firstItem = el.matched.items[0];
    const boolFields = Object.entries(firstItem).filter(([, v]) => typeof v === "boolean");
    if (boolFields.length === 0) continue;

    traverse(ast, {
      JSXAttribute(path) {
        if (path.node.name?.name !== "className") return;
        if (!t.isStringLiteral(path.node.value)) return;
        const cls = path.node.value.value;
        if (!cls.includes("text-ui-fg-error")) return;

        for (const [field] of boolFields) {
          const parts = cls.split("text-ui-fg-error");
          if (parts.length !== 2) continue;

          path.node.value = t.jsxExpressionContainer(
            t.templateLiteral(
              [
                t.templateElement({ raw: parts[0], cooked: parts[0] }, false),
                t.templateElement({ raw: parts[1], cooked: parts[1] }, true),
              ],
              [t.conditionalExpression(
                t.memberExpression(t.identifier(iterVar), t.identifier(field)),
                t.stringLiteral("text-ui-fg-error"),
                t.stringLiteral("text-ui-fg-subtle"),
              )]
            )
          );
          break;
        }
      },
      noScope: true,
    });
  }
}

function bindDates(ast, repeatElements) {
  for (const el of repeatElements) {
    const iterVar = iterVarName(el.matched.key);
    const firstItem = el.matched.items[0];

    const dateFields = Object.entries(firstItem).filter(
      ([, v]) => typeof v === "string" && DATE_RE.test(v)
    );
    const nestedDateFields = Object.entries(firstItem).filter(
      ([, v]) => v && typeof v === "object" && !Array.isArray(v) &&
                 typeof v.label === "string" && DATE_RE.test(v.label)
    );
    if (dateFields.length === 0 && nestedDateFields.length === 0) continue;

    traverse(ast, {
      JSXText(path) {
        const text = path.node.value.trim();
        if (!DATE_RE.test(text)) return;
        if (dateFields.length > 0) {
          path.replaceWith(
            t.jsxExpressionContainer(buildMemberExpr(`${iterVar}.${dateFields[0][0]}`))
          );
        } else {
          const field = nestedDateFields[0][0];
          path.replaceWith(
            t.jsxExpressionContainer(
              t.optionalMemberExpression(
                t.memberExpression(t.identifier(iterVar), t.identifier(field)),
                t.identifier("label"),
                false, true
              )
            )
          );
        }
      },
      noScope: true,
    });
  }
}

function bindStatusConstants(ast, repeatElements, DATA) {
  const statusLabels = detectStatusLabels(DATA);

  let hasStatusRefs = false;
  traverse(ast, {
    Identifier(path) {
      if (path.node.name === "STATUS_LABEL" || path.node.name === "STATUS_KEY") {
        hasStatusRefs = true;
        path.stop();
      }
    },
    noScope: true,
  });
  if (statusLabels.size === 0 && !hasStatusRefs) return;

  for (const el of repeatElements) {
    const iterVar = iterVarName(el.matched.key);
    const firstItem = el.matched.items[0];

    let statusField = Object.keys(firstItem).find(k =>
      typeof firstItem[k] === "string" && statusLabels.has(firstItem[k])
    );
    if (!statusField && hasStatusRefs) {
      statusField = Object.keys(firstItem).find(k => {
        if (typeof firstItem[k] !== "string") return false;
        const unique = new Set(el.matched.items.map(i => i[k]));
        return unique.size >= 2 && unique.size < el.matched.items.length;
      });
    }
    if (!statusField) continue;

    traverse(ast, {
      MemberExpression(path) {
        if (!t.isIdentifier(path.node.object, { name: "BAR_COLORS" })) return;
        path.node.property = t.memberExpression(
          t.identifier("STATUS_KEY"),
          t.memberExpression(t.identifier(iterVar), t.identifier(statusField)),
          true
        );
        path.node.computed = true;
      },
      noScope: true,
    });

    traverse(ast, {
      MemberExpression(path) {
        if (!t.isIdentifier(path.node.object, { name: "STATUS_LABEL" })) return;
        path.replaceWith(t.memberExpression(t.identifier(iterVar), t.identifier(statusField)));
      },
      noScope: true,
    });
  }
}

function bindBarCharts(ast, repeatElements, DATA) {
  for (const el of repeatElements) {
    const iterVar = iterVarName(el.matched.key);
    const firstItem = el.matched.items[0];
    if (!firstItem.color || firstItem.count === undefined) continue;

    traverse(ast, {
      JSXElement(path) {
        const cls = path.node.openingElement.attributes.find(
          a => t.isJSXAttribute(a) && a.name?.name === "className" && t.isStringLiteral(a.value)
        );
        if (!cls) return;
        const clsVal = cls.value.value;
        if (!/bg-\[#[a-f0-9]+\]/.test(clsVal) || !/w-\[\d+px\]/.test(clsVal)) return;
        if (!path.node.openingElement.selfClosing && path.node.children.length > 0) return;

        cls.value = t.stringLiteral(
          clsVal.replace(/bg-\[#[a-f0-9]+\]/g, "").replace(/w-\[\d+px\]/g, "").replace(/\s+/g, " ").trim()
        );

        path.node.openingElement.attributes.push(
          t.jsxAttribute(
            t.jsxIdentifier("style"),
            t.jsxExpressionContainer(t.objectExpression([
              t.objectProperty(
                t.identifier("backgroundColor"),
                t.memberExpression(
                  t.identifier("BAR_COLORS_ALL"),
                  t.memberExpression(t.identifier(iterVar), t.identifier("color")),
                  true
                )
              ),
              t.objectProperty(
                t.identifier("width"),
                t.templateLiteral(
                  [t.templateElement({ raw: "", cooked: "" }, false),
                   t.templateElement({ raw: "%", cooked: "%" }, true)],
                  [t.callExpression(
                    t.memberExpression(t.identifier("Math"), t.identifier("round")),
                    [t.binaryExpression("*",
                      t.binaryExpression("/",
                        t.memberExpression(t.identifier(iterVar), t.identifier("count")),
                        t.memberExpression(t.identifier("DATA"), t.identifier("total"))
                      ),
                      t.numericLiteral(100)
                    )]
                  )]
                )
              ),
            ]))
          )
        );
      },
      noScope: true,
    });
  }
}

function bindStatusDots(ast, repeatElements) {
  for (const el of repeatElements) {
    const iterVar = iterVarName(el.matched.key);
    const firstItem = el.matched.items[0];
    if (!firstItem.key || !firstItem.label) continue;

    traverse(ast, {
      JSXElement(path) {
        if (!path.node.openingElement.selfClosing) return;
        const cls = path.node.openingElement.attributes.find(
          a => t.isJSXAttribute(a) && a.name?.name === "className" && t.isStringLiteral(a.value)
        );
        if (!cls) return;
        const sizeMatch = cls.value.value.match(/w-\[(\d+)px\].*h-\[(\d+)px\]/);
        if (!sizeMatch || sizeMatch[1] !== sizeMatch[2]) return;
        if (path.node.openingElement.attributes.some(a => t.isJSXAttribute(a) && a.name?.name === "style")) return;

        cls.value = t.stringLiteral("inline-block size-2 rounded-[2px] shrink-0 border border-black/[.12] dark:border-white/[.12]");
        path.node.openingElement.attributes.push(
          t.jsxAttribute(
            t.jsxIdentifier("style"),
            t.jsxExpressionContainer(t.objectExpression([
              t.objectProperty(
                t.identifier("backgroundColor"),
                t.memberExpression(
                  t.identifier("BAR_COLORS"),
                  t.memberExpression(t.identifier(iterVar), t.identifier("key")),
                  true
                )
              ),
            ]))
          )
        );
      },
      noScope: true,
    });
  }
}

function bindLookupNames(ast, repeatElements, lookups, DATA) {
  for (const el of repeatElements) {
    if (!el.parent) continue;
    const iterVar = iterVarName(el.matched.key);
    const firstItem = el.matched.items[0];

    const ref = findLookupRef(firstItem, lookups, l => l.hasName);
    if (!ref) continue;

    const lookupObj = DATA[ref.lookupName];
    const sampleEntry = lookupObj[firstItem[ref.field]];
    if (!sampleEntry) continue;
    const firstName = sampleEntry.name?.split(" ")[0];

    traverse(ast, {
      JSXText(path) {
        if (path.node.value.trim() !== firstName) return;
        const nameExpr = t.optionalMemberExpression(
          t.memberExpression(
            t.memberExpression(t.identifier("DATA"), t.identifier(ref.lookupName)),
            t.memberExpression(t.identifier(iterVar), t.identifier(ref.field)),
            true
          ),
          t.identifier("name"), false, true
        );
        const splitExpr = t.optionalCallExpression(
          t.optionalMemberExpression(nameExpr, t.identifier("split"), false, true),
          [t.stringLiteral(" ")], true
        );
        path.replaceWith(t.jsxExpressionContainer(
          t.optionalMemberExpression(splitExpr, t.numericLiteral(0), true, true)
        ));
      },
      noScope: true,
    });
  }
}

function bindNestedCounts(ast, repeatElements) {
  for (const el of repeatElements) {
    if (!el.parent) continue;
    const parentIterVar = iterVarName(el.parent.matched.key);
    const parentFirstItem = el.parent.matched.items[0];
    if (!parentFirstItem.key) continue;

    const childKey = el.matched.key;
    const childItems = el.matched.items;
    const parentKeys = new Set(el.parent.matched.items.map(i => String(i.key)));

    const fkField = el.matched.fields.find(f =>
      childItems.every(item => parentKeys.has(String(item[f])))
    );
    if (!fkField) continue;

    const expectedCount = childItems.filter(item =>
      String(item[fkField]) === String(parentFirstItem.key)
    ).length;
    if (expectedCount === 0) continue;

    traverse(ast, {
      JSXText(path) {
        const text = path.node.value.trim();
        if (text !== String(childItems.length) && text !== String(expectedCount)) return;
        if (!path.findParent(p =>
          t.isCallExpression(p.node) &&
          t.isMemberExpression(p.node.callee) &&
          t.isIdentifier(p.node.callee.property, { name: "map" })
        )) return;

        path.replaceWith(
          t.jsxExpressionContainer(
            t.memberExpression(
              t.callExpression(
                t.memberExpression(t.identifier(childKey), t.identifier("filter")),
                [t.arrowFunctionExpression(
                  [t.identifier("_t")],
                  t.binaryExpression("===",
                    t.memberExpression(t.identifier("_t"), t.identifier(fkField)),
                    t.memberExpression(t.identifier(parentIterVar), t.identifier("key"))
                  )
                )]
              ),
              t.identifier("length")
            )
          )
        );
      },
      noScope: true,
    });
  }
}

function bindOverdueStyles(ast, repeatElements) {
  for (const el of repeatElements) {
    if (!el.parent) continue;
    const iterVar = iterVarName(el.matched.key);
    const firstItem = el.matched.items[0];

    const nestedBool = Object.entries(firstItem).find(([, v]) =>
      v && typeof v === "object" && !Array.isArray(v) &&
      Object.values(v).some(sv => typeof sv === "boolean")
    );
    if (!nestedBool) continue;

    const [parentField, parentVal] = nestedBool;
    const boolKey = Object.keys(parentVal).find(k => typeof parentVal[k] === "boolean");

    traverse(ast, {
      JSXExpressionContainer(path) {
        const code = generate(path.node.expression).code;
        if (!code.includes(parentField) || !code.includes("label")) return;

        const pEl = path.findParent(p => t.isJSXElement(p.node));
        if (!pEl) return;
        const clsAttr = pEl.node.openingElement.attributes.find(
          a => t.isJSXAttribute(a) && a.name?.name === "className" && t.isStringLiteral(a.value)
        );
        if (!clsAttr) return;
        const cls = clsAttr.value.value;
        if (!cls.includes("text-ui-fg-subtle")) return;

        const pre = cls.replace("text-ui-fg-subtle", "").replace(/\s+/g, " ").trim();
        clsAttr.value = t.jsxExpressionContainer(
          t.templateLiteral(
            [
              t.templateElement({ raw: pre + " ", cooked: pre + " " }, false),
              t.templateElement({ raw: "", cooked: "" }, true),
            ],
            [t.conditionalExpression(
              t.optionalMemberExpression(
                t.memberExpression(t.identifier(iterVar), t.identifier(parentField)),
                t.identifier(boolKey),
                false, true
              ),
              t.stringLiteral("text-ui-fg-error"),
              t.stringLiteral("text-ui-fg-subtle"),
            )]
          )
        );
      },
      noScope: true,
    });
  }
}

function cleanupArtifacts(ast) {
  traverse(ast, {
    JSXAttribute(path) {
      if (path.node.name?.name !== "className") return;
      if (!t.isStringLiteral(path.node.value)) return;
      let cls = path.node.value.value;
      let changed = false;

      if (cls.includes("text-ellipsis") && !cls.includes("whitespace-nowrap")) {
        cls += " whitespace-nowrap";
        changed = true;
      }

      if (cls.includes("shadow-elevation-card-rest")) {
        if (cls.includes("overflow-clip")) { cls = cls.replace("overflow-clip", "overflow-hidden"); changed = true; }
        if (cls.includes("h-full") && !cls.includes("bg-ui-bg-kanban")) {
          cls = cls.replace(/\bh-full\b/, "").replace(/\s+/g, " ").trim();
          changed = true;
        }
      }

      if (changed) path.node.value = t.stringLiteral(cls);
    },
    noScope: true,
  });
}

// ── Entry point ─────────────────────────────────────────────────────

export function bindData(ast, repeatElements, DATA) {
  const lookups = detectLookups(DATA);

  bindBadgeColor(ast, repeatElements);
  bindBadgeLabel(ast, repeatElements, lookups, DATA);
  ensureComponentDefaults(ast);
  bindConditionalStyles(ast, repeatElements);
  bindDates(ast, repeatElements);
  bindStatusConstants(ast, repeatElements, DATA);
  bindBarCharts(ast, repeatElements, DATA);
  bindStatusDots(ast, repeatElements);
  bindLookupNames(ast, repeatElements, lookups, DATA);
  bindNestedCounts(ast, repeatElements);
  bindOverdueStyles(ast, repeatElements);
  cleanupArtifacts(ast);
}

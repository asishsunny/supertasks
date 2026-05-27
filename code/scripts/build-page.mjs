#!/usr/bin/env node
/**
 * Pipeline orchestrator — cache check → transform → compose → page.tsx
 *
 * Usage: node code/scripts/build-page.mjs <screen> [--fresh]
 *
 * Phase 1: Check cache/ — if missing, print FETCH manifest and exit 1
 * Phase 2: Validate registry schema + source tracing
 * Phase 3: Transform each cached section through transform.mjs
 * Phase 4: Compose fragments into final page with Medusa components
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, unlinkSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import { parse } from "@babel/parser";
import _traverse from "@babel/traverse";
import _generate from "@babel/generator";
import * as t from "@babel/types";

const traverse = _traverse.default || _traverse;
const generate = _generate.default || _generate;

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const CACHE_DIR = resolve(__dirname, "../artifacts/cache");
const TRANSFORM = resolve(__dirname, "transform.mjs");
const registry = JSON.parse(readFileSync(resolve(__dirname, "../maps/screen-registry.json"), "utf8"));
const composeRules = JSON.parse(readFileSync(resolve(__dirname, "../rules/compose-rules.json"), "utf8"));

// Merge compose rules back into registry at runtime
for (const [name, scr] of Object.entries(registry.screens)) {
  const rules = composeRules.screens[name];
  if (!rules) {
    scr.imports = scr.imports || { named: {}, default: {} };
    scr.composition = scr.composition || {};
    continue;
  }
  scr.imports = rules.imports;
  scr.composition = rules.composition;
  scr.variants = rules.variants || null;
  for (const section of scr.sections) {
    const rule = rules.sections.find(r => r.name === section.name);
    if (rule) section.compose = rule.compose;
  }
}

const TRANSFORMED_DIR = resolve(__dirname, "../artifacts/sections");

const args = process.argv.slice(2);
const fresh = args.includes("--fresh");
const all = args.includes("--all");
const screenName = args.find(a => !a.startsWith("--"));

if (!screenName && !all) {
  console.log("Usage: node build-page.mjs <screen> [--fresh] [--all]");
  console.log("Screens:", Object.keys(registry.screens).join(", "));
  process.exit(1);
}

if (all) {
  const { execSync: run } = await import("child_process");
  for (const name of Object.keys(registry.screens)) {
    console.log(`\n══ ${name} ══`);
    try {
      const out = run(`node "${resolve(__dirname, "build-page.mjs")}" ${name}${fresh ? " --fresh" : ""}`, { encoding: "utf8", stdio: "inherit" });
    } catch { process.exitCode = 1; }
  }
  process.exit();
}

const screen = registry.screens[screenName];
if (!screen) {
  console.error(`Unknown screen: ${screenName}`);
  console.error("Available:", Object.keys(registry.screens).join(", "));
  process.exit(1);
}

// ── Phase 1: Cache check ───────────────────────────────────────────

mkdirSync(CACHE_DIR, { recursive: true });

const allSections = [
  ...screen.sections.map(s => ({ name: s.name, nodeId: s.nodeId, file: `${screenName}-${s.name}.jsx` })),
  ...Object.entries(screen.tabVariants || {}).map(([tab, v]) => ({ name: tab, nodeId: v.nodeId, file: v.cache || `${screenName}-${tab}.jsx` })),
];
const missing = allSections.filter(s => fresh || !existsSync(resolve(CACHE_DIR, s.file)));

if (missing.length) {
  console.error(`✗ Missing cache files (run prep step first):`);
  missing.forEach(s => console.error(`  ${s.file} (nodeId: ${s.nodeId})`));
  process.exit(1);
}

console.log(`✓ All ${allSections.length} sections cached`);

const SHELL_SECTIONS = new Set(["sidebar", "topbar"]);

// Snippet quality gate — warn if img assets exist without icon data-names
for (const s of screen.sections) {
  const src = readFileSync(resolve(CACHE_DIR, `${screenName}-${s.name}.jsx`), "utf8");
  if (/src=\{img\w+\}/.test(src) && !/data-name="[a-z][\w-]*"/.test(src))
    console.warn(`⚠ ${s.name}: img assets but no icon data-names — re-fetch with deeper depth`);
}

// ── Schema validation ──

const REQUIRED = {
  "stat-cards": ["dataVar", "iterator", "keyExpr"],
  "chart-cards": ["charts"],
  "table-loop": ["dataVar", "iterator", "keyExpr"],
  "page-header": ["title"],
  "controls-bar": ["segments", "activeSegment"],
  "passthrough": [],
};
const errors = screen.sections.flatMap(s => {
  const cfg = s.compose;
  if (!cfg) return [];
  if (!REQUIRED[cfg.type]) return [`[${s.name}] Unknown compose type: "${cfg.type}"`];
  return (REQUIRED[cfg.type] || []).filter(f => cfg[f] == null).map(f => `[${s.name}] Missing "${f}" for "${cfg.type}"`);
});
if (errors.length) { errors.forEach(e => console.error(e)); process.exit(1); }
console.log(`✓ Registry schema valid`);

// ── Constraint 2: Source tracing ──

function traceToSource(sectionName) {
  const txPath = resolve(TRANSFORMED_DIR, `${screenName}-${sectionName}.tsx`);
  try { return readFileSync(txPath, "utf8"); } catch { return null; }
}

const warnings = [];
for (const section of screen.sections) {
  if (SHELL_SECTIONS.has(section.name)) continue;
  const cfg = section.compose;
  if (!cfg || cfg.type !== "table-loop" || !cfg.columns) continue;
  const source = traceToSource(section.name);
  if (!source) {
    warnings.push(`[${section.name}] No transformed source found — cannot verify columns`);
    continue;
  }
  for (const col of cfg.columns) {
    if (col.width && !source.includes(col.width)) {
      warnings.push(`[${section.name}] Column width "${col.width}" not found in transformed JSX`);
    }
    if (col.label && !source.includes(col.label)) {
      warnings.push(`[${section.name}] Column label "${col.label}" not found in transformed JSX`);
    }
  }
}
if (warnings.length) {
  console.error("⚠ Source tracing warnings:");
  warnings.forEach(w => console.error(`  ${w}`));
}
console.log(`✓ Source tracing complete`);

// ── Transform cached sections ──

const fragments = [];
for (const section of screen.sections) {
  if (SHELL_SECTIONS.has(section.name)) continue;
  const cachePath = resolve(CACHE_DIR, `${screenName}-${section.name}.jsx`);
  const output = execSync(`node "${TRANSFORM}" "${cachePath}"`, { encoding: "utf8", maxBuffer: 1024 * 1024 });
  const clean = output.split("\n")
    .filter(l => !l.startsWith("// ── Data bindings") && !l.startsWith("// Expressions") && !l.startsWith("// Review and wire"))
    .join("\n").trim();
  fragments.push({ name: section.name, jsx: clean, compose: section.compose });
}

// ── Transform variants ──

const variantJsx = {};
if (screen.variants) {
  for (const opt of screen.variants.options) {
    if (opt.section) continue; // uses existing section, no separate cache
    const cachePath = resolve(CACHE_DIR, opt.cache);
    if (!existsSync(cachePath)) { console.warn(`⚠ Variant cache missing: ${opt.cache}`); continue; }
    const output = execSync(`node "${TRANSFORM}" "${cachePath}" --no-bind`, { encoding: "utf8", maxBuffer: 1024 * 1024 });
    variantJsx[opt.key] = output.split("\n")
      .filter(l => !l.startsWith("// ── Data bindings") && !l.startsWith("// Expressions") && !l.startsWith("// Review and wire"))
      .join("\n").trim();
  }
}

// ── Clean compose functions ──

function nodeCls(node) {
  const a = node.openingElement.attributes.find(a => t.isJSXAttribute(a) && a.name?.name === "className" && t.isStringLiteral(a.value));
  return a ? a.value.value : "";
}

function composeStatCards(jsx, cfg) {
  const ast = parse(`<>${jsx}</>`, { sourceType: "module", plugins: ["jsx"] });
  let wrapperNode = null;
  traverse(ast, {
    JSXElement(path) {
      if (path.parentPath?.isJSXFragment()) { wrapperNode = path.node; path.stop(); }
    },
    noScope: true,
  });
  if (!wrapperNode) return jsx;

  const cards = wrapperNode.children.filter(c => t.isJSXElement(c));
  if (cards.length === 0) return jsx;
  const card = cards[0];

  const pNodes = card.children.filter(c =>
    t.isJSXElement(c) && t.isJSXIdentifier(c.openingElement.name) && c.openingElement.name.name === "p"
  );
  if (pNodes.length < 2) return jsx;
  const [labelP, valueP] = pNodes;

  labelP.children = [t.jsxExpressionContainer(t.identifier(`${cfg.iterator}.label`))];
  valueP.children = [t.jsxExpressionContainer(t.identifier(`${cfg.iterator}.value`))];

  const valClsAttr = valueP.openingElement.attributes.find(a => t.isJSXAttribute(a) && a.name?.name === "className");
  if (valClsAttr && t.isStringLiteral(valClsAttr.value)) {
    const base = valClsAttr.value.value.split(" ").filter(c => !c.startsWith("text-ui-fg-")).join(" ");
    valClsAttr.value = t.jsxExpressionContainer(
      t.templateLiteral(
        [t.templateElement({ raw: base + " ", cooked: base + " " }, false), t.templateElement({ raw: "", cooked: "" }, true)],
        [t.conditionalExpression(
          t.memberExpression(t.identifier(cfg.iterator), t.identifier("error")),
          t.stringLiteral("text-ui-fg-error"),
          t.stringLiteral("text-ui-fg-base"),
        )]
      )
    );
  }

  card.openingElement.attributes.push(
    t.jsxAttribute(t.jsxIdentifier("key"), t.jsxExpressionContainer(t.identifier(cfg.keyExpr)))
  );

  const { code: cardJsx } = generate(card, { compact: false });
  const wrapCls = nodeCls(wrapperNode);

  return `<div className="${wrapCls}">
        {${cfg.dataVar}.map((${cfg.iterator}) => (
          ${cardJsx}
        ))}
      </div>`;
}

function composeChartCards(jsx, cfg) {
  const ast = parse(`<>${jsx}</>`, { sourceType: "module", plugins: ["jsx"] });
  const cls = { wrapper: "", card: "", title: "", barContainer: "", barRow: "", label: "", track: "", count: "" };

  traverse(ast, {
    JSXElement(path) {
      if (!path.parentPath?.isJSXFragment()) return;
      cls.wrapper = nodeCls(path.node);
      const cards = path.node.children.filter(c => t.isJSXElement(c));
      if (cards.length === 0) { path.stop(); return; }
      cls.card = nodeCls(cards[0]);
      const cardKids = cards[0].children.filter(c => t.isJSXElement(c));
      if (cardKids.length >= 1) cls.title = nodeCls(cardKids[0]);
      if (cardKids.length >= 2) cls.barContainer = nodeCls(cardKids[1]);

      traverse(cards[0], {
        JSXElement(inner) {
          const c = nodeCls(inner.node);
          if (!c.includes("gap-2") || !c.includes("items-center")) return;
          cls.barRow = c;
          for (const kid of inner.node.children.filter(k => t.isJSXElement(k))) {
            const kc = nodeCls(kid);
            const tag = t.isJSXIdentifier(kid.openingElement.name) ? kid.openingElement.name.name : "";
            if (tag === "p" && kc.includes("text-ui-fg-subtle")) cls.label = kc;
            if (kc.includes("bg-ui-border-base") && kc.includes("h-2")) cls.track = kc;
            if (tag === "p" && kc.includes("txt-compact-small-plus")) cls.count = kc;
          }
          inner.stop();
        },
        noScope: true,
      });
      path.stop();
    },
    noScope: true,
  });

  const charts = cfg.charts.map(c => `        <div key="${c.title}" className="${cls.card}">
          <p className="${cls.title}">${c.title}</p>
          <div className="${cls.barContainer}">
            {${c.dataVar}.map((${c.iterator}) => {
              const count = ${c.countExpr};
              return (
                <div key={${c.iterator}.key} className="${cls.barRow}">
                  <p className="${cls.label}">{${c.labelExpr}}</p>
                  <div className="${cls.track}">
                    <div
                      className="h-full rounded"
                      style={{
                        width: \`\${Math.round((count / total) * 100)}%\`,
                        backgroundColor: ${c.colorExpr},
                      }}
                    />
                  </div>
                  <p className="${cls.count}">{count}</p>
                </div>
              );
            })}
          </div>
        </div>`);

  return `<div className="${cls.wrapper}">
${charts.join("\n\n")}
      </div>`;
}

function composeTableLoop(jsx, cfg) {
  // Transform already converts div-table → Table components.
  // Compose only: wraps Table.Row in .map() loop, adds pagination, extracts title.
  const ast = parse(`<>${jsx}</>`, { sourceType: "module", plugins: ["jsx"] });

  // Find Table.Body and its Table.Row template
  let tableBodyPath = null;
  let tableRowNode = null;
  traverse(ast, {
    JSXElement(path) {
      const tag = path.node.openingElement.name;
      if (t.isJSXMemberExpression(tag) && tag.object.name === "Table" && tag.property.name === "Body") {
        tableBodyPath = path;
        const rows = path.node.children.filter(c => t.isJSXElement(c));
        if (rows.length > 0) tableRowNode = rows[0];
        path.stop();
      }
    },
    noScope: true,
  });

  if (!tableBodyPath || !tableRowNode) return jsx;

  // Inject key prop into Table.Row via AST
  tableRowNode.openingElement.attributes.push(
    t.jsxAttribute(t.jsxIdentifier("key"), t.jsxExpressionContainer(t.identifier(cfg.keyExpr)))
  );
  const { code: rowJsx } = generate(tableRowNode, { compact: false });

  // Extract wrapper class from outermost card div
  let wrapperCls = "bg-ui-bg-base overflow-clip rounded-xl shadow-elevation-card-rest w-full";
  traverse(ast, {
    JSXElement(path) {
      if (path.parentPath?.isJSXFragment()) {
        const cls = path.node.openingElement.attributes.find(a => t.isJSXAttribute(a) && a.name?.name === "className" && t.isStringLiteral(a.value));
        if (cls && cls.value.value.includes("shadow-elevation-card-rest")) wrapperCls = cls.value.value;
        path.stop();
      }
    },
    noScope: true,
  });

  // Generate header from AST
  let headerJsx = "";
  traverse(ast, {
    JSXElement(path) {
      const tag = path.node.openingElement.name;
      if (t.isJSXMemberExpression(tag) && tag.object.name === "Table" && tag.property.name === "Header") {
        headerJsx = generate(path.node, { compact: false }).code;
        path.stop();
      }
    },
    noScope: true,
  });

  const titleSection = cfg.title
    ? `\n        <div className="pb-4 pt-6 px-6">\n          <p className="text-ui-fg-base txt-compact-medium-plus">${cfg.title}</p>\n        </div>`
    : "";

  const iterVar = cfg.pageSize ? `page${cfg.dataVar.charAt(0).toUpperCase() + cfg.dataVar.slice(1)}` : cfg.dataVar;

  const pagination = cfg.pageSize ? `
        <Table.Pagination
          count={${cfg.dataVar}.length}
          pageSize={PAGE_SIZE}
          pageIndex={pageIndex}
          pageCount={pageCount}
          canPreviousPage={pageIndex > 0}
          canNextPage={pageIndex < pageCount - 1}
          previousPage={() => setPageIndex((p) => p - 1)}
          nextPage={() => setPageIndex((p) => p + 1)}
        />` : "";

  return `<div className="${wrapperCls}">${titleSection}
        <Table>
          ${headerJsx}
          <Table.Body>
            {${iterVar}.map((${cfg.iterator}) => {
              ${cfg.rowSetup}
              return (
                ${rowJsx}
              );
            })}
          </Table.Body>
        </Table>${pagination}
      </div>`;
}

function composePageHeader(jsx, cfg) {
  // Extract button from transformed cache via AST
  let buttonJsx = "";
  try {
    const ast = parse(`<>${jsx}</>`, { sourceType: "module", plugins: ["jsx"] });
    traverse(ast, {
      JSXElement(path) {
        if (t.isJSXIdentifier(path.node.openingElement.name) && path.node.openingElement.name.name === "Button") {
          buttonJsx = generate(path.node, { compact: false }).code;
          path.stop();
        }
      },
      noScope: true,
    });
  } catch {}
  // Extract title class from cache
  let titleCls = "text-ui-fg-base font-normal text-[24px] leading-[32px]";
  try {
    const ast = parse(`<>${jsx}</>`, { sourceType: "module", plugins: ["jsx"] });
    traverse(ast, {
      JSXElement(path) {
        if (t.isJSXIdentifier(path.node.openingElement.name) && path.node.openingElement.name.name === "p") {
          const cls = path.node.openingElement.attributes.find(a => t.isJSXAttribute(a) && a.name?.name === "className" && t.isStringLiteral(a.value));
          if (cls && cls.value.value.includes("text-[24px]")) { titleCls = cls.value.value; path.stop(); }
        }
      },
      noScope: true,
    });
  } catch {}
  return `<div className="flex items-center justify-between w-full">
        <p className="${titleCls}">${cfg.title}</p>
        ${buttonJsx}
      </div>`;
}

function composeControlsBar(jsx, cfg) {
  let activeSegCls = "", inactiveSegCls = "", segWrapperCls = "";
  let activeTextCls = "", inactiveTextCls = "";
  try {
    const ast = parse(`<>${jsx}</>`, { sourceType: "module", plugins: ["jsx"] });
    traverse(ast, {
      JSXElement(path) {
        const c = nodeCls(path.node);
        if (c.includes("p-0.5") && c.includes("gap-0.5")) {
          segWrapperCls = c;
          for (const child of path.node.children.filter(k => t.isJSXElement(k))) {
            const cc = nodeCls(child);
            const pChild = child.children.find(k => t.isJSXElement(k) && t.isJSXIdentifier(k.openingElement.name) && k.openingElement.name.name === "p");
            if (cc.includes("shadow-elevation-card-rest")) {
              activeSegCls = cc;
              if (pChild) activeTextCls = nodeCls(pChild);
            } else if (!activeSegCls || !cc.includes("shadow")) {
              if (!inactiveSegCls) inactiveSegCls = cc;
              if (pChild && !inactiveTextCls) inactiveTextCls = nodeCls(pChild);
            }
          }
          path.stop();
        }
      },
      noScope: true,
    });
  } catch {}

  // If this controls-bar is bound to a variant, generate dynamic segments
  const vCfg = screen.variants;
  const isBound = vCfg && vCfg.control === "segment";

  const segments = cfg.segments.map(s => {
    if (isBound) {
      const opt = vCfg.options.find(o => o.label === s);
      const key = opt ? opt.key : s.toLowerCase();
      return `<div
              onClick={() => ${vCfg.stateVar === "view" ? "setView" : `set${vCfg.stateVar[0].toUpperCase()}${vCfg.stateVar.slice(1)}`}("${key}")}
              className={\`${inactiveSegCls} \${${vCfg.stateVar} === "${key}" ? "cursor-default ${activeSegCls.split(" ").filter(c => !inactiveSegCls.includes(c)).join(" ")}" : "cursor-pointer"}\`}
            ><p className={\`${inactiveTextCls} \${${vCfg.stateVar} === "${key}" ? "${activeTextCls.split(" ").filter(c => !inactiveTextCls.includes(c)).join(" ")}" : ""}\`}>${s}</p></div>`;
    }
    const isActive = s === cfg.activeSegment;
    return isActive
      ? `<div className="${activeSegCls}"><p className="${activeTextCls}">${s}</p></div>`
      : `<div className="${inactiveSegCls}"><p className="${inactiveTextCls}">${s}</p></div>`;
  });

  const filterButtons = (cfg.filters || []).map(f => {
    if (typeof f === "object" && f.dropdownItems) {
      const items = f.dropdownItems.map(item => `<DropdownMenu.Item>${item}</DropdownMenu.Item>`).join("\n              ");
      return `<DropdownMenu>
            <DropdownMenu.Trigger asChild>
              <Button variant="secondary" size="small"><${f.icon} className="w-[15px] h-[15px]" />${f.label}</Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              ${items}
            </DropdownMenu.Content>
          </DropdownMenu>`;
    }
    if (typeof f === "object") {
      return `<Button variant="secondary" size="small"><${f.icon} className="w-[15px] h-[15px]" />${f.label}</Button>`;
    }
    return `<Button variant="secondary" size="small">${f}</Button>`;
  });
  const sort = cfg.hasSort ? `<IconButton size="small"><DescendingSorting /></IconButton>` : "";
  const search = cfg.hasSearch ? `<div className="relative w-[160px]"><Input type="search" size="small" placeholder="Search" className="pr-8" /><div className="absolute right-2 top-1/2 -translate-y-1/2"><Kbd>⌘K</Kbd></div></div>` : "";

  return `<div className="flex items-center w-full">
        <div className="${segWrapperCls}">
          ${segments.join("\n          ")}
        </div>
        <div className="flex-1" />
        <div className="flex gap-2 items-center">
          ${[...filterButtons, sort, search].filter(Boolean).join("\n          ")}
        </div>
      </div>`;
}

// ── Variant data binding ──

function bindVariantContent(jsx, bindings) {
  if (!bindings || !Object.keys(bindings).length) return jsx;
  const ast = parse(`<>${jsx}</>`, { sourceType: "module", plugins: ["jsx"] });
  traverse(ast, {
    JSXAttribute(path) {
      if (path.node.name?.name !== "defaultValue") return;
      if (!t.isStringLiteral(path.node.value)) return;
      const expr = bindings[path.node.value.value];
      if (expr) path.node.value = t.jsxExpressionContainer(t.identifier(expr));
    },
    noScope: true,
  });
  traverse(ast, {
    JSXElement(path) {
      const tag = t.isJSXIdentifier(path.node.openingElement.name) ? path.node.openingElement.name.name : null;
      if (tag === "Avatar") {
        const img = t.jsxElement(
          t.jsxOpeningElement(t.jsxIdentifier("img"), [
            t.jsxAttribute(t.jsxIdentifier("src"), t.jsxExpressionContainer(t.identifier("CURRENT_USER.avatar"))),
            t.jsxAttribute(t.jsxIdentifier("alt"), t.jsxExpressionContainer(t.identifier("CURRENT_USER.name"))),
            t.jsxAttribute(t.jsxIdentifier("className"), t.stringLiteral("rounded-full size-[44px] object-cover")),
          ], true), null, [], true
        );
        path.replaceWith(img);
      }
    },
    noScope: true,
  });
  traverse(ast, {
    JSXText(path) {
      const text = path.node.value.trim();
      const expr = bindings[text];
      if (expr) path.replaceWith(t.jsxExpressionContainer(t.identifier(expr)));
    },
    noScope: true,
  });
  let fragmentNode = null;
  traverse(ast, { JSXFragment(path) { fragmentNode = path.node; path.stop(); }, noScope: true });
  if (fragmentNode) return fragmentNode.children.map(c => generate(c, { compact: false }).code).join("").trim();
  return generate(ast, { retainLines: false, compact: false }).code.trim();
}

// ── Compose variant views ──

function composeVariantBody(composedSections, sectionNames) {
  const vCfg = screen.variants;
  if (!vCfg) return composedSections.map(s => `      ${s}`).join("\n\n");

  const swapIdx = sectionNames.indexOf(vCfg.swapSection);
  const setter = `set${vCfg.stateVar[0].toUpperCase()}${vCfg.stateVar.slice(1)}`;
  const bindings = vCfg.bindings || {};

  // Resolve JSX for each variant option
  const optionJsx = {};
  for (const opt of vCfg.options) {
    if (opt.section) {
      const idx = sectionNames.indexOf(opt.section);
      const raw = idx >= 0 ? composedSections[idx] : "";
      optionJsx[opt.key] = Object.keys(bindings).length ? bindVariantContent(raw, bindings) : raw;
    } else if (variantJsx[opt.key]) {
      optionJsx[opt.key] = bindVariantContent(variantJsx[opt.key], bindings);
    }
  }

  // Build tab control for "tabs" style
  let tabControl = "";
  if (vCfg.control === "tabs") {
    const buttons = vCfg.options.map(opt =>
      `<button
                key="${opt.key}"
                onClick={() => ${setter}("${opt.key}")}
                className={\`px-3 py-1.5 txt-compact-small-plus rounded-md transition-colors \${${vCfg.stateVar} === "${opt.key}" ? "bg-ui-bg-base text-ui-fg-base shadow-elevation-card-rest" : "text-ui-fg-subtle hover:text-ui-fg-base"}\`}
              >${opt.label}</button>`
    );
    tabControl = `<div className="flex gap-1 p-1 bg-ui-bg-subtle-hover rounded-lg w-fit">
            ${buttons.join("\n            ")}
          </div>`;
  }

  // Build conditional panels
  const panels = vCfg.options.map(opt =>
    `{${vCfg.stateVar} === "${opt.key}" && (
            <>${optionJsx[opt.key] || ""}</>
          )}`
  );

  // Assemble: non-swapped sections + tab control + panels
  const parts = [];
  for (let i = 0; i < composedSections.length; i++) {
    if (i === swapIdx) {
      if (tabControl) parts.push(`      ${tabControl}`);
      parts.push(`      ${panels.join("\n          ")}`);
    } else {
      parts.push(`      ${composedSections[i]}`);
    }
  }
  return parts.join("\n\n");
}

function composeSection(frag) {
  const cfg = frag.compose;
  if (!cfg) return frag.jsx;
  switch (cfg.type) {
    case "stat-cards": return composeStatCards(frag.jsx, cfg);
    case "chart-cards": return composeChartCards(frag.jsx, cfg);
    case "table-loop": return composeTableLoop(frag.jsx, cfg);
    case "page-header": return composePageHeader(frag.jsx, cfg);
    case "controls-bar": return composeControlsBar(frag.jsx, cfg);
    case "passthrough": return frag.jsx;
    default: return frag.jsx;
  }
}

// ── Build page ──

const composedSections = fragments.map(f => composeSection(f));
const sectionNames = fragments.map(f => f.name);

// Check if any section needs pagination
const hasPagination = fragments.some(f => f.compose?.pageSize);
const paginationSection = fragments.find(f => f.compose?.pageSize);
const hasVariants = !!screen.variants;
const needsState = hasPagination || hasVariants;

// Collect imports
const imp = screen.imports;
const namedImports = [];
if (needsState) namedImports.push(`import { useState } from "react";`);
const uiImports = [...(imp.named["@medusajs/ui"] || [])];
if (!uiImports.includes("Table")) uiImports.push("Table");
// Collect filter icons from controls-bar sections
const iconImports = [...(imp.named["@medusajs/icons"] || [])];
for (const section of fragments) {
  if (section.compose?.type === "controls-bar" && section.compose.filters) {
    for (const f of section.compose.filters) {
      if (typeof f === "object" && f.icon && !iconImports.includes(f.icon)) {
        iconImports.push(f.icon);
      }
    }
  }
}
// Auto-import variant dependencies
if (hasVariants) {
  const vCfg = screen.variants;
  const variantImports = vCfg.imports || {};
  for (const [mod, names] of Object.entries(variantImports)) {
    const existing = imp.named[mod] || [];
    for (const n of names) { if (!existing.includes(n)) existing.push(n); }
    imp.named[mod] = existing;
  }
}
for (const [mod, names] of Object.entries(imp.named)) {
  const isTypeOnly = imp.typeOnly?.includes(mod);
  let importNames = names;
  if (mod === "@medusajs/ui") importNames = uiImports;
  if (mod === "@medusajs/icons") importNames = iconImports;
  namedImports.push(`import ${isTypeOnly ? "type " : ""}{ ${importNames.join(", ")} } from "${mod}";`);
}

const comp = screen.composition || {};
const componentName = comp.componentName || screenName.split("_").map(w => w[0].toUpperCase() + w.slice(1)).join("") + "Page";
const wrapperClass = comp.wrapper || "flex flex-col gap-6 items-start w-full";
const paginationData = hasPagination ? `
  const PAGE_SIZE = ${paginationSection.compose.pageSize};
  const [pageIndex, setPageIndex] = useState(0);
  const pageCount = Math.ceil(${paginationSection.compose.dataVar}.length / PAGE_SIZE);
  const page${paginationSection.compose.dataVar.charAt(0).toUpperCase() + paginationSection.compose.dataVar.slice(1)} = ${paginationSection.compose.dataVar}.slice(pageIndex * PAGE_SIZE, (pageIndex + 1) * PAGE_SIZE);` : "";

const variantState = hasVariants
  ? `\n  const [${screen.variants.stateVar}, set${screen.variants.stateVar[0].toUpperCase()}${screen.variants.stateVar.slice(1)}] = useState<${screen.variants.options.map(o => `"${o.key}"`).join(" | ")}>("${screen.variants.default}");`
  : "";

const variantData = hasVariants ? (screen.variants.data || "") : "";

const bodyJsx = composeVariantBody(composedSections, sectionNames);

let page = `"use client";

${namedImports.join("\n")}

${fragments.map(f => f.compose?.constants || "").filter(Boolean).join("\n\n")}

export default function ${componentName}() {
  ${comp.data || ""}${paginationData}${variantState}
  ${variantData}

${fragments.map((f, i) => {
  return `  ${f.compose?.data || ""}`;
}).filter(Boolean).join("\n\n")}

  return (
    <div className="${wrapperClass}">
${bodyJsx}
    </div>
  );
}
`;

const outDir = resolve(ROOT, "code/artifacts/pages");
mkdirSync(outDir, { recursive: true });
const outPath = resolve(outDir, `${screenName}.tsx`);
try {
  const formatted = execSync(`npx prettier --parser typescript`, { input: page, encoding: "utf8", cwd: resolve(ROOT, "app") });
  writeFileSync(outPath, formatted);
} catch {
  writeFileSync(outPath, page);
}
console.log(`✓ Clean compose → ${outPath}`);

// ── Constraint 3: Typecheck gate ──

const hasComposeRules = !!composeRules.screens[screenName];
if (!hasComposeRules) {
  console.log(`⊘ TypeScript check skipped (no compose-rules)`);
  console.log(`\n✅ Compose passed. Output: ${outPath}`);
} else {
  const appDir = resolve(ROOT, "app");
  const targetPage = resolve(appDir, screen.output);
  const backupPath = targetPage + ".bak";
  let typecheckPassed = false;
  try {
    try { writeFileSync(backupPath, readFileSync(targetPage)); } catch {}
    writeFileSync(targetPage, page);
    execSync("npx tsc --noEmit", { cwd: appDir, encoding: "utf8", stdio: "pipe" });
    typecheckPassed = true;
    console.log(`✓ TypeScript compiles clean`);
  } catch (e) {
    const stderr = e.stderr || e.stdout || e.message;
    const relevant = stderr.split("\n").filter(l => l.includes(screen.output)).join("\n");
    console.error(`✗ TypeScript errors:\n${relevant || stderr}`);
  } finally {
    try { writeFileSync(targetPage, readFileSync(backupPath)); unlinkSync(backupPath); } catch {}
  }

  if (!typecheckPassed) {
    console.error("✗ OUTPUT FAILED TYPECHECK — review registry entries");
    process.exit(1);
  }
  console.log(`\n✅ All constraints passed. Output: ${outPath}`);
}

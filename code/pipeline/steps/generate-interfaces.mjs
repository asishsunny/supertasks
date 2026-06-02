#!/usr/bin/env node
/**
 * generate-interfaces.mjs — AST pass: derive Props interfaces from transformed JSX.
 *
 * Two-phase approach:
 *   Phase 1: Walk AST, collect patterns (what tags, components, structures exist)
 *   Phase 2: Derive props with full context (modal → skip cards, kanban → skip avatar)
 *
 * Output: artifacts/interfaces/{name}.json
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { parse } from "@babel/parser";
import _traverse from "@babel/traverse";
import * as t from "@babel/types";
import { getAttr, getTextChildren } from "./transform/helpers.mjs";

const traverse = _traverse.default || _traverse;
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../../..");
const TRANSFORMED = resolve(ROOT, "artifacts/transformed");
const OUT_DIR = resolve(ROOT, "artifacts/interfaces");
const MANIFEST = JSON.parse(readFileSync(resolve(ROOT, "code/pipeline/manifest.json"), "utf8"));

const cliArgs = process.argv.slice(2);
const snippetFilter = cliArgs.includes("--snippet") ? cliArgs[cliArgs.indexOf("--snippet") + 1] : null;

function toPascal(name) {
  return name.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase());
}

function getTagName(opening) {
  if (t.isJSXIdentifier(opening.name)) return opening.name.name;
  if (t.isJSXMemberExpression(opening.name))
    return `${opening.name.object.name}.${opening.name.property.name}`;
  return null;
}

const MEDUSA_UI = new Set(["Button", "IconButton", "Badge", "Input", "Textarea", "Select", "Switch", "Label", "Kbd", "Avatar", "Table"]);
const MEDUSA_ICONS = new Set(["XMark", "EllipsisHorizontal", "DescendingSorting", "PlusMini", "Funnel", "CalendarMini", "Adjustments", "AdjustmentsDone", "ArrowDownTray"]);

// ── Phase 1: Collect patterns ──

function extractSampleTree(node) {
  if (t.isJSXText(node)) {
    const val = node.value.trim();
    return val ? { type: "text", value: val } : null;
  }
  if (!t.isJSXElement(node)) return null;
  const tag = getTagName(node.openingElement);
  const cls = getAttr(node.openingElement?.attributes || [], "className") || "";
  const repeat = getAttr(node.openingElement?.attributes || [], "data-repeat");
  const children = (node.children || []).map(extractSampleTree).filter(Boolean);
  if (!children.length && !tag) return null;
  const entry = { tag: tag || "div" };
  if (repeat) entry.repeat = parseInt(repeat);
  if (children.length === 1 && children[0].type === "text") {
    entry.text = children[0].value;
  } else if (children.length > 0) {
    entry.children = children;
  }
  // Track component type for context
  if (["Switch", "Input", "Textarea", "Select", "Button", "IconButton", "Badge", "Kbd", "Avatar", "Table"].includes(tag)) {
    entry.component = tag;
    const variant = getAttr(node.openingElement?.attributes || [], "variant");
    if (variant) entry.variant = variant;
    const placeholder = getAttr(node.openingElement?.attributes || [], "placeholder");
    if (placeholder) entry.placeholder = placeholder;
    const checked = node.openingElement?.attributes?.some(a => t.isJSXAttribute(a) && a.name?.name === "checked" && a.value === null);
    if (checked) entry.checked = true;
  }
  return entry;
}

function flattenTexts(tree, depth = 0) {
  const results = [];
  if (tree.text) results.push({ text: tree.text, depth, tag: tree.tag, component: tree.component });
  for (const child of tree.children || []) {
    results.push(...flattenTexts(child, depth + 1));
  }
  return results;
}

function collectPatterns(ast) {
  const patterns = new Set();
  const imports = { ui: new Set(), icons: new Set() };
  const topTexts = [];
  const repeatBlocks = [];
  let secondaryButtonCount = 0;
  let sampleTree = null;

  traverse(ast, {
    JSXElement(path) {
      const opening = path.node.openingElement;
      const tagName = getTagName(opening);
      const className = getAttr(opening.attributes, "className") || "";

      // Imports
      if (MEDUSA_UI.has(tagName)) imports.ui.add(tagName);
      if (MEDUSA_ICONS.has(tagName)) imports.icons.add(tagName);

      // Patterns
      if (className.includes("bg-ui-bg-segment-control")) patterns.add("segment-control");
      if (className.includes("bg-ui-bg-kanban-column")) patterns.add("kanban");
      if (className.includes("border-l-2") && className.includes("bg-ui-bg-subtle")) patterns.add("nav-sidebar");
      if (tagName === "Switch") patterns.add("toggles");
      if (tagName === "Table") patterns.add("table");

      // Avatar — track if inside data-repeat
      if (tagName === "Avatar" || tagName === "ColorAvatar") {
        let insideRepeat = false;
        let p = path.parentPath;
        while (p) {
          if (p.isJSXElement() && getAttr(p.node.openingElement?.attributes || [], "data-repeat"))
            { insideRepeat = true; break; }
          p = p.parentPath;
        }
        if (!insideRepeat) patterns.add("avatar");
      }

      // Modal
      if (tagName === "Kbd") {
        const texts = getTextChildren(path.node);
        if (texts.some(tx => tx.includes("Esc"))) patterns.add("modal");
        else patterns.add("kbd-shortcut");
      }

      // Form fields
      if (tagName === "Label") {
        const parentEl = path.parentPath;
        if (parentEl?.isJSXElement()) {
          const hasSibling = parentEl.node.children.some(c =>
            t.isJSXElement(c) && ["Input", "Textarea", "Select"].includes(getTagName(c.openingElement)));
          if (hasSibling) patterns.add("form-fields");
        }
      }

      // Secondary buttons
      if (tagName === "Button" && getAttr(opening.attributes, "variant") === "secondary")
        secondaryButtonCount++;

      // Billing
      if (t.isJSXText(path.node.children?.[0]) && path.node.children[0].value?.includes("$"))
        patterns.add("billing");

      // data-repeat
      const repeatVal = getAttr(opening.attributes, "data-repeat");
      if (repeatVal) {
        patterns.add("data-repeat");
        let depth = 0;
        let p = path.parentPath;
        while (p && !p.isReturnStatement()) {
          if (p.isJSXElement()) depth++;
          p = p.parentPath;
        }
        let hasNestedRepeat = false;
        let hasBar = false;
        path.traverse({
          JSXElement(inner) {
            if (getAttr(inner.node.openingElement?.attributes || [], "data-repeat")) hasNestedRepeat = true;
            const cls = getAttr(inner.node.openingElement?.attributes || [], "className") || "";
            if (cls.includes("bg-ui-border-base") && cls.includes("h-2")) hasBar = true;
          }
        });
        const texts = [];
        collectTextsFromNode(path.node, texts);

        // Extract sample data from this element + its structural siblings
        const samples = [];
        const parentChildren = path.parent?.children || [];
        for (const sibling of parentChildren) {
          if (!t.isJSXElement(sibling)) continue;
          const sibTexts = [];
          collectTextsFromNode(sibling, sibTexts);
          if (sibTexts.length > 0) samples.push(sibTexts);
        }

        repeatBlocks.push({ depth, hasNestedRepeat, hasBar, childTextCount: texts.length, samples });
      }
    },
    JSXText(path) {
      const val = path.node.value.trim();
      if (val && val.length > 1 && val.length < 50) topTexts.push(val);
    },
  });

  // Billing detection from text
  if (topTexts.some(t => t.includes("$") || t.includes("Pro plan") || t.includes("Change plan")))
    patterns.add("billing");

  if (secondaryButtonCount >= 2 && !patterns.has("modal") && !patterns.has("billing"))
    patterns.add("action-buttons");

  // Extract full sample tree from root JSX
  traverse(ast, {
    ReturnStatement(path) {
      if (path.node.argument && t.isJSXElement(path.node.argument)) {
        sampleTree = extractSampleTree(path.node.argument);
        path.stop();
      } else if (path.node.argument && t.isJSXFragment(path.node.argument)) {
        const children = path.node.argument.children.filter(c => t.isJSXElement(c)).map(extractSampleTree).filter(Boolean);
        sampleTree = { tag: "fragment", children };
        path.stop();
      }
    }
  });

  return { patterns, imports, topTexts, repeatBlocks, sampleTree };
}

function collectTextsFromNode(node, texts) {
  if (t.isJSXText(node) && node.value.trim()) texts.push(node.value.trim());
  for (const child of node.children || []) collectTextsFromNode(child, texts);
}

// ── Phase 2: Derive props from patterns ──

function deriveProps(patterns, topTexts, repeatBlocks, componentName) {
  const props = new Map();
  const helperTypes = new Map();

  // ── Block type: determine primary pattern ──
  const isModal = patterns.has("modal");
  const isKanban = patterns.has("kanban");
  const isTable = patterns.has("table") && !patterns.has("nav-sidebar");
  const isSettings = patterns.has("nav-sidebar");
  const isBilling = patterns.has("billing");
  const isToggle = patterns.has("toggles") && !isModal;
  const isControls = patterns.has("segment-control");

  // ── Segment tabs ──
  if (isControls) {
    addHelper(helperTypes, "ViewTab", [
      { name: "key", type: "string" },
      { name: "label", type: "string" }]);
    addProp(props, "tabs", "ViewTab[]");
    addProp(props, "activeTab", "string");
    addProp(props, "onTabChange", "(key: string) => void", true);
  }

  // ── Action buttons — only for controls, not modals ──
  if (patterns.has("action-buttons") && !isModal) {
    addHelper(helperTypes, "ActionButton", [
      { name: "icon", type: "ReactNode", optional: true },
      { name: "label", type: "string" }]);
    addProp(props, "actions", "ActionButton[]");
  }

  // ── Search — only for controls bar ──
  if (isControls) {
    if (patterns.has("kbd-shortcut")) addProp(props, "searchShortcut", "string", true);
    addProp(props, "searchPlaceholder", "string", true);
    addProp(props, "onSearch", "(query: string) => void", true);
    addProp(props, "onSort", "() => void", true);
  }

  // ── Nav sidebar ──
  if (isSettings) {
    addHelper(helperTypes, "NavItem", [
      { name: "label", type: "string" },
      { name: "active", type: "boolean", optional: true }]);
    addProp(props, "navItems", "NavItem[]");
    addProp(props, "onNavClick", "(label: string) => void", true);
  }

  // ── Title — most blocks with structure have one ──
  if (isModal || isSettings || isToggle || isTable || isBilling)
    addProp(props, "title", "string");

  // ── Kanban ──
  if (isKanban) {
    addHelper(helperTypes, "KanbanColumn", [
      { name: "status", type: "string" },
      { name: "label", type: "string" },
      { name: "count", type: "number" },
      { name: "statusIcon", type: "ReactNode" },
      { name: "cards", type: "ReactNode[]" }]);
    addProp(props, "columns", "KanbanColumn[]");
  }

  // ── Table (non-settings) ──
  if (isTable && !isBilling) {
    addHelper(helperTypes, "Column", [
      { name: "key", type: "string" },
      { name: "header", type: "string" },
      { name: "width", type: "string", optional: true },
      { name: "render", type: "(row: any) => ReactNode" }]);
    addHelper(helperTypes, "Row", [
      { name: "id", type: "string | number" }]);
    addProp(props, "columns", "Column[]");
    addProp(props, "rows", "Row[]");
  }

  // ── Modal ──
  if (isModal) {
    const hasInfo = topTexts.includes("Info") || topTexts.includes("Details");
    const hasActivity = topTexts.some(t => t.includes("Activity"));
    const hasFormFields = patterns.has("form-fields");

    if (hasInfo) {
      addProp(props, "headerLabel", "string");
      addProp(props, "description", "string");
      addProp(props, "infoLabel", "string");
      addHelper(helperTypes, "InfoRow", [
        { name: "label", type: "string" },
        { name: "value", type: "string" },
        { name: "type", type: '"status" | "assignee" | "date"' },
        { name: "overdue", type: "boolean", optional: true },
        { name: "statusColor", type: "{ bg: string; border: string; text: string }", optional: true },
        { name: "member", type: 'Pick<Member, "initials" | "avatarBg" | "avatarText">', optional: true }]);
      addProp(props, "infoRows", "InfoRow[]");
    }

    if (hasActivity) {
      addProp(props, "activityLabel", "string");
      addHelper(helperTypes, "ActivityEntry", [
        { name: "member", type: 'Pick<Member, "initials" | "avatarBg" | "avatarText">' },
        { name: "name", type: "string" },
        { name: "time", type: "string" },
        { name: "text", type: "string" }]);
      addProp(props, "activity", "ActivityEntry[]");
    }

    if (hasFormFields && !hasInfo)
      addProp(props, "fields", "ModalField[]");

    addProp(props, "primaryAction", "string");
    addProp(props, "secondaryAction", "string");
    addProp(props, "escLabel", "string");
    addProp(props, "onClose", "() => void", true);

    if (hasInfo) {
      addProp(props, "onEdit", "() => void", true);
      addProp(props, "onComplete", "() => void", true);
      addProp(props, "onMore", "() => void", true);
    } else {
      addProp(props, "onSubmit", "() => void", true);
    }
  }

  // ── Toggles ──
  if (isToggle) {
    addProp(props, "toggles", "SettingsToggle[]");
    addProp(props, "saveLabel", "string");
    addProp(props, "onSave", "() => void", true);
    addProp(props, "onToggle", "(index: number, value: boolean) => void", true);
    if (isSettings) addProp(props, "heading", "string");
  }

  // ── Avatar (only settings profile — not kanban, not table, not modal) ──
  if (patterns.has("avatar") && isSettings && !isToggle && !isBilling) {
    addProp(props, "avatarSrc", "string", true);
    addProp(props, "avatarFallback", "string");
    addProp(props, "userName", "string");
    addProp(props, "avatarHint", "string");
  }

  // ── Form field rows (settings profile) ──
  if (patterns.has("form-fields") && !isModal && isSettings) {
    addHelper(helperTypes, "ProfileField", [
      { name: "label", type: "string" },
      { name: "value", type: "string" }]);
    addHelper(helperTypes, "ProfileFieldRow", [
      { name: "fields", type: "ProfileField[]" }]);
    addProp(props, "fieldRows", "ProfileFieldRow[]");
    addProp(props, "bioLabel", "string");
    addProp(props, "bioPlaceholder", "string");
    addProp(props, "saveLabel", "string");
    addProp(props, "onSave", "() => void", true);
  }

  // ── Billing ──
  if (isBilling) {
    addHelper(helperTypes, "BillingPlan", [
      { name: "name", type: "string" },
      { name: "price", type: "string" },
      { name: "renewalNote", type: "string" },
      { name: "changeLabel", type: "string" }]);
    addHelper(helperTypes, "PaymentMethod", [
      { name: "label", type: "string" },
      { name: "desc", type: "string" },
      { name: "updateLabel", type: "string" }]);
    addProp(props, "plan", "BillingPlan");
    addProp(props, "payment", "PaymentMethod");
    addProp(props, "onChangePlan", "() => void", true);
    addProp(props, "onUpdatePayment", "() => void", true);

    if (patterns.has("table")) {
      addProp(props, "historyTitle", "string");
      addHelper(helperTypes, "BillingHistoryColumn", [
        { name: "key", type: "string" },
        { name: "header", type: "string" },
        { name: "className", type: "string", optional: true }]);
      addHelper(helperTypes, "BillingHistoryRow", [
        { name: "id", type: "string | number" }]);
      addProp(props, "historyColumns", "BillingHistoryColumn[]");
      addProp(props, "historyRows", "BillingHistoryRow[]");
    }
  }

  // ── Simple cards (stat-cards pattern) — only if no other primary pattern ──
  if (!isModal && !isKanban && !isTable && !isSettings && !isControls && !isBilling) {
    for (const rb of repeatBlocks) {
      if (rb.depth <= 2 && !rb.hasNestedRepeat && rb.childTextCount <= 6) {
        addHelper(helperTypes, "CardItem", [
          { name: "label", type: "string" },
          { name: "value", type: "string" }]);
        addProp(props, "cards", "CardItem[]");
        break;
      }
      if (rb.depth <= 2 && rb.hasNestedRepeat && rb.hasBar) {
        addHelper(helperTypes, "BarRow", [
          { name: "label", type: "string" },
          { name: "count", type: "number" },
          { name: "color", type: "string" }]);
        addHelper(helperTypes, "ChartCard", [
          { name: "title", type: "string" },
          { name: "rows", type: "BarRow[]" },
          { name: "total", type: "number" }]);
        addProp(props, "charts", "ChartCard[]");
        break;
      }
    }
  }

  return { props, helperTypes };
}

// ── Sample data extraction from AST tree ──

function extractSampleData(sampleTree, props, topTexts, repeatBlocks) {
  if (!sampleTree) return {};
  const data = {};
  const allTexts = flattenTexts(sampleTree);

  // Cards — siblings with repeat marker, each has [label, value]
  if (props.has("cards")) {
    const rb = repeatBlocks.find(r => r.depth <= 2 && !r.hasNestedRepeat);
    if (rb?.samples) {
      data.cards = rb.samples.map(texts => ({
        label: texts[0] || "Label",
        value: texts[1] || "0"
      }));
    }
  }

  // Charts — nested repeat with bar
  if (props.has("charts")) {
    const rb = repeatBlocks.find(r => r.depth <= 2 && r.hasNestedRepeat && r.hasBar);
    if (rb?.samples) {
      data.charts = rb.samples.map(texts => ({
        title: texts[0] || "Chart",
        rows: [],
        total: 0
      }));
    }
  }

  // NavItems — find nav sidebar texts, deduplicated (first 4 unique matches)
  if (props.has("navItems")) {
    const navLabels = ["Profile", "Notifications", "Security", "Billing"];
    const seen = new Set();
    const found = [];
    for (const t of topTexts) {
      if (navLabels.includes(t) && !seen.has(t)) {
        seen.add(t);
        found.push(t);
      }
    }
    if (found.length >= 2) {
      data.navItems = found.map((label, i) => ({ label, active: i === 0 }));
    }
  }

  // Toggles — find label+desc pairs by walking tree for Switch siblings
  if (props.has("toggles")) {
    const toggles = [];
    function findToggles(node) {
      const children = node.children || [];
      for (const child of children) {
        // Look for containers that have text children + a Switch sibling
        if (child.children) {
          const hasSwitch = child.children.some(c => c.tag === "Switch" || c.component === "Switch");
          if (hasSwitch) {
            // Find the text container sibling
            const textContainer = child.children.find(c => c.children && c.children.some(gc => gc.text));
            if (textContainer) {
              const texts = (textContainer.children || []).filter(c => c.text).map(c => c.text);
              if (texts.length >= 2) {
                toggles.push({ label: texts[0], desc: texts[1], on: toggles.length % 2 === 0 });
              } else if (texts.length === 1) {
                toggles.push({ label: texts[0], desc: "", on: toggles.length % 2 === 0 });
              }
            }
          }
        }
        findToggles(child);
      }
    }
    findToggles(sampleTree);
    if (toggles.length > 0) data.toggles = toggles;
  }

  // String props — match by name to text content
  const stringPropMap = {
    title: () => {
      // Title is usually the first text in a card header
      const headerTexts = allTexts.filter(t => t.depth <= 3 && t.text.length < 30);
      return headerTexts[0]?.text;
    },
    heading: () => {
      const h = allTexts.find(t => t.depth <= 3 && !["Profile", "Notifications", "Security", "Billing"].includes(t.text));
      return h?.text;
    },
    headerLabel: () => allTexts.find(t => t.text === "Task details")?.text,
    description: () => allTexts.find(t => t.text.length > 30)?.text,
    infoLabel: () => allTexts.find(t => t.text === "Info")?.text,
    activityLabel: () => allTexts.find(t => t.text.includes("Activity"))?.text,
    primaryAction: () => {
      const actions = allTexts.filter(t => t.component === "Button");
      const primary = allTexts.find(t => ["Mark complete", "Create task", "Save changes", "Confirm", "Send invite", "Generate report"].some(a => t.text.includes(a)));
      return primary?.text || actions[actions.length - 1]?.text;
    },
    secondaryAction: () => {
      const secondary = allTexts.find(t => ["Cancel", "Edit"].includes(t.text));
      return secondary?.text;
    },
    escLabel: () => allTexts.find(t => t.text === "Esc")?.text,
    saveLabel: () => allTexts.find(t => t.text.includes("Save"))?.text,
    searchPlaceholder: () => {
      const input = allTexts.find(t => t.component === "Input");
      return input?.text;
    },
    avatarHint: () => allTexts.find(t => t.text.includes("photo") || t.text.includes("JPG"))?.text,
    userName: () => allTexts.find(t => t.text.includes(" ") && t.text.length < 20 && !t.text.includes("Save") && !t.text.includes("Task"))?.text,
    bioLabel: () => allTexts.find(t => t.text === "Bio")?.text,
    historyTitle: () => allTexts.find(t => t.text.includes("history") || t.text.includes("History"))?.text,
  };

  for (const [propName, info] of props) {
    if (info.type !== "string" || data[propName]) continue;
    const extractor = stringPropMap[propName];
    if (extractor) {
      const val = extractor();
      if (val) data[propName] = val;
    }
  }

  // Tabs — extract from segment control text
  if (props.has("tabs")) {
    const segTexts = allTexts.filter(t => t.tag === "button");
    if (segTexts.length >= 2) {
      data.tabs = segTexts.map((t, i) => ({ key: t.text.toLowerCase().replace(/\s/g, "-"), label: t.text }));
      data.activeTab = data.tabs[0]?.key;
    }
  }

  // Actions — extract text from Button nodes in tree
  if (props.has("actions")) {
    const buttons = [];
    function findButtons(node) {
      if (node.tag === "Button") {
        const texts = [];
        for (const c of node.children || []) {
          if (c.type === "text") texts.push(c.value);
          if (c.text) texts.push(c.text);
        }
        if (texts.length > 0) buttons.push({ icon: null, label: texts[0] });
      }
      for (const c of node.children || []) findButtons(c);
    }
    findButtons(sampleTree);
    // Filter out primary/secondary footer buttons (Cancel, Confirm, etc) — those are modal actions
    const filtered = buttons.filter(b => !["Cancel", "Confirm", "Save", "Save changes"].includes(b.label));
    if (filtered.length > 0) data.actions = filtered;
  }

  return data;
}

// ── Helpers ──

function addProp(map, name, type, optional = false) {
  if (!map.has(name)) map.set(name, { type, optional });
}

function addHelper(map, name, fields) {
  if (!map.has(name)) map.set(name, fields);
}

// ── Main ──

function analyzeTemplate(name, source, manifestBlock) {
  const componentName = toPascal(name);
  const isDefault = manifestBlock?.export === "default";
  const ast = parse(source, { sourceType: "module", plugins: ["jsx", "typescript"] });

  // Phase 1: collect patterns + sample tree
  const { patterns, imports, topTexts, repeatBlocks, sampleTree } = collectPatterns(ast);

  // Phase 2: derive props
  const { props, helperTypes } = deriveProps(patterns, topTexts, repeatBlocks, componentName);

  // Phase 3: extract sample data from tree
  const sampleData = extractSampleData(sampleTree, props, topTexts, repeatBlocks);

  const propsArray = [...props.entries()].map(([name, info]) => ({
    name, type: info.type, ...(info.optional ? { optional: true } : {})
  }));

  return {
    componentName,
    exportType: isDefault ? "default" : "named",
    sampleData,
    props: propsArray,
    helperTypes: [...helperTypes.entries()].map(([name, fields]) => ({ name, fields })),
    imports: { ui: [...imports.ui], icons: [...imports.icons] },
    patterns: [...patterns]
  };
}

// ── CLI ──
mkdirSync(OUT_DIR, { recursive: true });

const snippets = MANIFEST.snippets || Object.entries(MANIFEST.blocks || {}).map(([k, v]) => ({ name: k, ...v }));
const filtered = snippetFilter ? snippets.filter(s => s.name === snippetFilter) : snippets;

console.log("=== Generate Interfaces (AST) ===\n");

for (const s of filtered) {
  const templatePath = resolve(TRANSFORMED, `${s.name}.tsx`);
  if (!existsSync(templatePath)) {
    console.log(`  SKIP ${s.name} — no transformed file`);
    continue;
  }

  try {
    const source = readFileSync(templatePath, "utf8");
    const result = analyzeTemplate(s.name, source, s);
    writeFileSync(resolve(OUT_DIR, `${s.name}.json`), JSON.stringify(result, null, 2));
    const propNames = result.props.map(p => p.name).join(", ");
    console.log(`  ✓ ${s.name} → ${result.props.length} props [${result.patterns.join(", ")}]`);
    console.log(`    props: ${propNames}`);
  } catch (e) {
    console.log(`  ✗ ${s.name} — ${e.message}`);
  }
}

console.log(`\n✓ Interfaces written to artifacts/interfaces/`);

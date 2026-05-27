/**
 * Component detection — Figma elements → Medusa UI components.
 * Config-driven rules + structural pattern matching.
 */

import * as t from "@babel/types";
import { parse } from "@babel/parser";
import _traverse from "@babel/traverse";
import { getAttr, makeJSXElement, getTextChildren } from "./helpers.mjs";

const traverse = _traverse.default || _traverse;

export function createDetector(componentMap, data) {
  const COMPONENT_RULES = componentMap.rules;
  const TAG_COLOR_MAP = componentMap.tagColorMap;
  const ICON_NAME_MAP = componentMap.iconNameMap;
  const STATUS_DOT_PATTERN = componentMap.statusDotPattern;
  const KNOWN_ICONS = new Set(Object.values(ICON_NAME_MAP));
  const _handledDataNames = new Set();
  const _unseenDataNames = new Map();
  const KNOWN_STRUCTURAL = new Set(["_", "Spacer", "Header", "Meta", "Actions", "Filters", "Rows", "Content Card", "Card Body", "Card Header", "Vector", "Row 1", "Row 2", "Row 3", "Settings Content", "Settings Nav", "Title Wrapper"]);

  // Nav icon gate: data.yaml label → expected codeName
  const NAV_ICON_MAP = new Map();
  if (data?.nav) {
    for (const group of [data.nav.menu, data.nav.extensions].filter(Boolean)) {
      for (const item of group) {
        if (item.title && item.codeName) NAV_ICON_MAP.set(item.title, item.codeName);
      }
    }
  }

  function findNestedIcon(node) {
    let iconName = null;
    const walk = (n) => {
      if (t.isJSXElement(n)) {
        const tagName = t.isJSXIdentifier(n.openingElement.name) ? n.openingElement.name.name : null;
        if (tagName && KNOWN_ICONS.has(tagName)) { iconName = tagName; return; }
        const dn = getAttr(n.openingElement.attributes, "data-name");
        if (dn) { const mapped = ICON_NAME_MAP[dn]; if (mapped) iconName = mapped; }
        for (const child of n.children || []) walk(child);
      }
    };
    walk(node);
    return iconName;
  }

  // ── Config-driven rules (from transform-rules.json) ──

  function matchesRule(path, rule) {
    const el = path.node;
    const opening = el.openingElement;
    const detect = rule.detect;
    const fallback = rule.fallbackDetect;
    const attrs = opening.attributes;
    const dataName = getAttr(attrs, "data-name");
    const cls = getAttr(attrs, "className") || "";
    const elName = t.isJSXIdentifier(opening.name) ? opening.name.name : null;
    if (detect.element && elName !== detect.element) return false;
    if (detect.element && detect.propMatch) {
      for (const [k, v] of Object.entries(detect.propMatch)) {
        if (getAttr(attrs, k) !== v) return false;
      }
      return true;
    }
    if (detect.element) return true;
    if (detect.dataName && dataName === detect.dataName) return true;
    if (detect.dataNamePrefix && dataName?.startsWith(detect.dataNamePrefix)) return true;
    if (fallback?.classAll) return fallback.classAll.every(pattern => cls.includes(pattern));
    return false;
  }

  function emitComponent(path, rule) {
    const el = path.node;
    const emit = rule.emit;
    if (emit.pattern === "statusDot") {
      const code = STATUS_DOT_PATTERN;
      const parsed = parse(`<>${code}</>`, { sourceType: "module", plugins: ["jsx", "typescript"] });
      let replacement = null;
      traverse(parsed, { JSXFragment(p) { replacement = p.node.children[0]; p.stop(); }, noScope: true });
      if (replacement) {
        const siblings = path.parent.children || [];
        const idx = siblings.indexOf(path.node);
        if (idx >= 0) {
          for (let i = idx + 1; i < siblings.length; i++) {
            if (t.isJSXElement(siblings[i]) && t.isJSXIdentifier(siblings[i].openingElement.name) && siblings[i].openingElement.name.name === "p") {
              siblings.splice(i, 1); break;
            }
          }
        }
        path.replaceWith(replacement);
      }
      return;
    }
    const cls = getAttr(el.openingElement.attributes, "className") || "";
    const props = {};
    for (const [k, v] of Object.entries(emit.props || {})) {
      if (typeof v === "string") {
        if (k === "variant" && v === "transparent" && !cls.includes("button-transparent")) continue;
        props[k] = v;
      }
      else if (v.bind) props[k] = t.identifier(v.bind);
      else if (v.deriveFromClass === "tag-color") props[k] = t.identifier(v.bindTo);
    }
    let children = [];
    if (emit.children === "text") {
      const texts = getTextChildren(el);
      if (texts.length > 0) children = [t.jsxText(texts[0])];
    }
    if (emit.iconChild) {
      let iconName;
      if (typeof emit.iconChild === "string") iconName = emit.iconChild;
      else if (emit.iconChild.fromNestedDataName) iconName = findNestedIcon(el) || emit.iconChild.fallback || "EllipsisHorizontal";
      if (iconName) children = [makeJSXElement(iconName, {}, [], true)];
    }
    const selfClosing = emit.selfClosing || (children.length === 0 && !emit.children);
    let result = makeJSXElement(emit.tag, props, children, selfClosing);
    if (emit.wrapper) {
      const wrapperProps = {};
      for (const [k, v] of Object.entries(emit.wrapper.props || {})) wrapperProps[k] = v;
      result = makeJSXElement(emit.wrapper.tag, wrapperProps, [result], false);
    }
    path.replaceWith(result);
  }

  function detectAndSwap(path) {
    for (const rule of COMPONENT_RULES) {
      if (matchesRule(path, rule)) { emitComponent(path, rule); return true; }
    }
    return false;
  }

  // ── Structural pattern detection (class-based, runs before config rules) ──

  function patternDetectAndSwap(path) {
    const el = path.node;
    const opening = el.openingElement;
    const cls = getAttr(opening.attributes, "className") || "";
    const dataName = getAttr(opening.attributes, "data-name");

    // 1. IconButton: square size-[28px] + buttons bg
    if (cls.includes("size-[28px]") && (cls.includes("buttons/") || cls.includes("buttons\\/") || dataName === "IconButton")) {
      const icon = findNestedIcon(el) || "EllipsisHorizontal";
      const props = { size: "small", variant: "transparent" };
      const result = makeJSXElement("IconButton", props,
        [makeJSXElement(icon, {}, [], true)], false);
      path.replaceWith(result);
      return true;
    }

    // 2. Secondary Button: dataName "Button" OR button-neutral + h-[28px] + text, not square
    if ((dataName === "Button" && !cls.includes("size-[28px]")) || ((cls.includes("button-neutral") || cls.includes("buttons\\/button-neutral")) && cls.includes("h-[28px]") && !cls.includes("size-[28px]"))) {
      const texts = getTextChildren(el);
      if (texts.length > 0) {
        const icon = findNestedIcon(el);
        const children = [];
        if (icon) children.push(makeJSXElement(icon, { className: "w-[15px] h-[15px]" }, [], true));
        children.push(t.jsxText(texts[0]));
        const result = makeJSXElement("Button", { variant: "secondary", size: "small" }, children, false);
        path.replaceWith(result);
        return true;
      }
    }

    // 3. Primary Button: dataName "Button" with inverted/contrast style, OR pattern
    if ((dataName === "Button" && (cls.includes("contrast") || cls.includes("inverted") || cls.includes("button-inverted"))) || ((cls.includes("contrast") || cls.includes("shadow-[0px_1px_2px_0px_rgba(0,0,0,0.4)") || cls.includes("button-inverted") || cls.includes("buttons\\/button-inverted")) && cls.includes("h-[28px]"))) {
      const texts = getTextChildren(el);
      if (texts.length > 0) {
        const icon = findNestedIcon(el);
        const children = [];
        if (icon) children.push(makeJSXElement(icon, { className: "w-[15px] h-[15px]" }, [], true));
        children.push(t.jsxText(texts[0]));
        const result = makeJSXElement("Button", { variant: "primary", size: "small" }, children, false);
        path.replaceWith(result);
        return true;
      }
    }

    // 4. Icon wrapper: size-[15px] with nested img/vector OR known icon dataName, skip status dots
    if (cls.includes("size-[15px]") && !cls.includes("size-full") && !(dataName && dataName.startsWith("square-"))) {
      let icon = findNestedIcon(el) || null;
      if (!icon && dataName) {
        icon = ICON_NAME_MAP[dataName] || null;
      }
      // Guard: only proceed if we resolved an icon name or element has nested img/vector content
      const hasNestedContent = el.children && el.children.some(c =>
        t.isJSXElement(c) && (
          (t.isJSXIdentifier(c.openingElement.name) && c.openingElement.name.name === "img") ||
          c.children?.length > 0
        )
      );
      if (!icon && !hasNestedContent) return false;
      // Nav icon gate: cross-check against data.yaml nav items
      if (icon && NAV_ICON_MAP.size > 0) {
        const parentEl = path.parentPath?.node;
        if (parentEl && t.isJSXElement(parentEl)) {
          const directTexts = parentEl.children
            .filter(c => t.isJSXElement(c))
            .flatMap(c => c.children || [])
            .filter(c => t.isJSXText(c))
            .map(c => c.value.trim())
            .filter(Boolean);
          const siblingLabel = directTexts.find(tx => NAV_ICON_MAP.has(tx));
          if (!siblingLabel) {
            const parentTexts = getTextChildren(parentEl).filter(tx => NAV_ICON_MAP.has(tx));
            const label = parentTexts.length === 1 ? parentTexts[0] : null;
            if (label) {
              const expected = NAV_ICON_MAP.get(label);
              if (icon !== expected) {
                console.warn(`[icon-gate] "${label}": data-name resolved "${icon}", data.yaml expects "${expected}" → fixed`);
                icon = expected;
              }
            }
          } else {
            const expected = NAV_ICON_MAP.get(siblingLabel);
            if (icon !== expected) {
              console.warn(`[icon-gate] "${siblingLabel}": data-name resolved "${icon}", data.yaml expects "${expected}" → fixed`);
              icon = expected;
            }
          }
        }
      }
      if (icon) {
        path.replaceWith(makeJSXElement(icon, { className: "w-[15px] h-[15px]" }, [], true));
        return true;
      }
    }

    // 5. Search input: dataName "Search Input" OR bg-field + "Search" text → Medusa Input + Kbd
    if (dataName === "Search Input" || ((cls.includes("bg-field") || cls.includes("backgrounds\\/bg-field")) && cls.includes("h-[28px]"))) {
      const texts = getTextChildren(el);
      if (dataName === "Search Input" || texts.some(tx => tx === "Search" || tx === "⌘K")) {
        const shortcut = texts.find(tx => tx.includes("⌘")) || "⌘K";
        const placeholder = texts.find(tx => tx !== shortcut && tx !== "⌘K" && tx.length > 0) || "Search";
        const input = makeJSXElement("Input", { type: "search", size: "small", placeholder }, [], true);
        const kbd = makeJSXElement("Kbd", {}, [t.jsxText(shortcut)], false);
        const wrapper = makeJSXElement("div", { className: "relative" }, [input, kbd], false);
        path.replaceWith(wrapper);
        return true;
      }
    }

    // 5b. Kbd standalone
    if (dataName === "Kbd") {
      const texts = getTextChildren(el);
      const label = texts[0] || "⌘K";
      path.replaceWith(makeJSXElement("Kbd", {}, [t.jsxText(label)], false));
      return true;
    }

    // 5c. Segment Control
    if (dataName === "Segment Control") {
      const items = el.children.filter(c => t.isJSXElement(c));
      const tabs = items.map(item => {
        const texts = getTextChildren(item);
        return texts[0] || "";
      }).filter(Boolean);
      const tabElements = tabs.map(label => {
        return makeJSXElement("button", { className: "segment-tab" }, [t.jsxText(label)], false);
      });
      const result = makeJSXElement("div", { className: "bg-ui-bg-segment-control flex gap-0.5 items-center p-0.5 rounded-lg shrink-0" }, tabElements, false);
      path.replaceWith(result);
      return true;
    }

    // 6. Text Input
    if (dataName === "Text Input") {
      const texts = getTextChildren(el);
      const value = texts.find(tx => tx && tx !== "Text Input") || "";
      const props = { size: "small", className: "w-full" };
      if (value) props.defaultValue = value;
      path.replaceWith(makeJSXElement("Input", props, [], true));
      return true;
    }

    // 7. Text Area → Medusa Textarea
    if (dataName === "Text Area") {
      const texts = getTextChildren(el);
      const value = texts.find(tx => tx && tx !== "Placeholder" && !tx.includes("resize")) || "";
      const props = { placeholder: "Placeholder" };
      if (value) props.defaultValue = value;
      path.replaceWith(makeJSXElement("Textarea", props, [], true));
      return true;
    }

    // 8. Select
    if (dataName === "Select") {
      const texts = getTextChildren(el);
      const placeholder = texts.find(tx => tx && tx !== "triangles-mini") || "Select";
      path.replaceWith(makeJSXElement("Select", { size: "small", placeholder }, [], true));
      return true;
    }

    // 8b. Switch: data-name "Switch" or small rounded pill with bg-interactive/bg-switch-off
    if (dataName === "Switch" || dataName === "Switch Label") {
      path.replaceWith(makeJSXElement("Switch", {}, [], true));
      return true;
    }
    if (!dataName && (cls.includes("rounded-full") || cls.includes("rounded-[999px]")) && (cls.includes("bg-interactive") || cls.includes("bg-switch") || cls.includes("switch"))) {
      path.replaceWith(makeJSXElement("Switch", {}, [], true));
      return true;
    }

    // 9. Field wrapper: data-name ends with " Field"
    if (dataName && dataName.endsWith(" Field")) {
      const labelText = dataName.replace(/ Field$/, "");
      const label = makeJSXElement("Label", { size: "small" }, [t.jsxText(labelText)], false);
      let inputNode = null;
      let inputType = null;
      const walkForInput = (node) => {
        if (inputNode) return;
        if (t.isJSXElement(node)) {
          const dn = getAttr(node.openingElement.attributes, "data-name");
          if (dn === "Text Input") { inputNode = node; inputType = "input"; return; }
          if (dn === "Text Area") { inputNode = node; inputType = "textarea"; return; }
          if (dn === "Select") { inputNode = node; inputType = "select"; return; }
          if (dn === "Switch" || dn === "Switch Label") { inputNode = node; inputType = "switch"; return; }
          const nodeCls = getAttr(node.openingElement.attributes, "className") || "";
          if (!dn && nodeCls.includes("bg-field") && nodeCls.includes("h-[32px]") && nodeCls.includes("shadow-")) {
            inputNode = node; inputType = "input"; return;
          }
          if (!dn && nodeCls.includes("bg-field") && nodeCls.includes("flex-col") && nodeCls.includes("shadow-") && !nodeCls.includes("h-[32px]")) {
            inputNode = node; inputType = "textarea"; return;
          }
          for (const child of node.children || []) walkForInput(child);
        }
      };
      for (const child of el.children || []) walkForInput(child);

      const children = [label];
      if (inputNode) {
        const texts = getTextChildren(inputNode);
        if (inputType === "input") {
          const value = texts.find(tx => tx && tx !== "Text Input") || "";
          const props = { size: "small", className: "w-full" };
          if (value) props.defaultValue = value;
          children.push(makeJSXElement("Input", props, [], true));
        } else if (inputType === "textarea") {
          const value = texts.find(tx => tx && tx !== "Placeholder" && !tx.includes("resize")) || "";
          const props = { placeholder: "Placeholder" };
          if (value) props.defaultValue = value;
          children.push(makeJSXElement("Textarea", props, [], true));
        } else if (inputType === "select") {
          const placeholder = texts.find(tx => tx && tx !== "triangles-mini") || "Select";
          children.push(makeJSXElement("Select", { size: "small", placeholder }, [], true));
        } else if (inputType === "switch") {
          children.push(makeJSXElement("Switch", {}, [], true));
        }
      }
      path.replaceWith(makeJSXElement("div", { className: "flex flex-1 flex-col gap-1.5 min-w-px" }, children, false));
      return true;
    }

    // 10. Table: data-name="Table" → <Table> with Header/Body/Row/Cell
    if (dataName === "Table") {
      const children = el.children.filter(c => t.isJSXElement(c));
      const headerEl = children.find(c =>
        getAttr(c.openingElement.attributes, "data-name") === "Table Header"
      );

      const headerCells = [];
      const bodyRows = [];

      if (headerEl) {
        const hCells = headerEl.children.filter(c => t.isJSXElement(c));
        for (const cell of hCells) {
          const cellDN = getAttr(cell.openingElement.attributes, "data-name");
          const cellCls = getAttr(cell.openingElement.attributes, "className") || "";
          const widthMatch = cellCls.match(/w-\[(\d+px)\]/);
          const props = {};
          if (widthMatch) props.className = `w-[${widthMatch[1]}]`;

          const texts = getTextChildren(cell);
          const content = texts.length > 0 ? [t.jsxText(texts[0])] : [];
          headerCells.push(makeJSXElement("Table.HeaderCell", props, content, content.length === 0));
        }
      }

      for (const child of children) {
        if (child === headerEl) continue;
        const allEls = child.children.filter(c => t.isJSXElement(c));
        const cells = allEls.filter(c =>
          getAttr(c.openingElement.attributes, "data-name") === "Table Cell"
        );
        if (cells.length === 0) continue;
        const rowCells = [];
        for (const cell of cells) {
          const cellCls = getAttr(cell.openingElement.attributes, "className") || "";
          const widthMatch = cellCls.match(/w-\[(\d+px)\]/);
          const props = {};
          if (widthMatch) props.className = `w-[${widthMatch[1]}]`;
          const cellChildren = cell.children.filter(c => !t.isJSXText(c) || c.value.trim());
          const elChildren = cellChildren.filter(c => t.isJSXElement(c));
          if (elChildren.length > 1) {
            const wrapper = makeJSXElement("span", { className: "inline-flex items-center gap-2" }, cellChildren, false);
            rowCells.push(makeJSXElement("Table.Cell", props, [wrapper], false));
          } else {
            rowCells.push(makeJSXElement("Table.Cell", props, cellChildren, false));
          }
        }
        // Non-Table-Cell elements at end (e.g. IconButton) → wrap in Table.Cell
        const extras = allEls.filter(c =>
          getAttr(c.openingElement.attributes, "data-name") !== "Table Cell" &&
          getAttr(c.openingElement.attributes, "data-name") !== "HorizontalDivider"
        );
        for (const extra of extras) {
          rowCells.push(makeJSXElement("Table.Cell", { className: "w-7" }, [extra], false));
        }
        bodyRows.push(makeJSXElement("Table.Row", {}, rowCells, false));
      }

      // Add empty header cell for actions if body rows have more cells than header
      if (bodyRows.length > 0 && headerCells.length > 0) {
        const bodyCellCount = bodyRows[0].children.filter(c => t.isJSXElement(c)).length;
        while (headerCells.length < bodyCellCount) {
          headerCells.push(makeJSXElement("Table.HeaderCell", { className: "w-7" }, [], true));
        }
      }

      const headerRow = makeJSXElement("Table.Row", {}, headerCells, false);
      const header = makeJSXElement("Table.Header", { className: "border-t-0" }, [headerRow], false);
      const body = makeJSXElement("Table.Body", {}, bodyRows, false);
      const table = makeJSXElement("Table", {}, [header, body], false);
      path.replaceWith(table);
      return true;
    }

    // Track unmatched data-names for warnings
    if (dataName && !KNOWN_STRUCTURAL.has(dataName) && !dataName.endsWith(" Field") && !KNOWN_ICONS.has(dataName) && !ICON_NAME_MAP[dataName]) {
      _unseenDataNames.set(dataName, (_unseenDataNames.get(dataName) || 0) + 1);
    }

    return false;
  }

  function getWarnings() {
    const warnings = [];
    for (const [name, count] of _unseenDataNames) {
      warnings.push(`⚠ Unhandled component: "${name}" (${count}x)`);
    }
    return warnings;
  }

  return { detectAndSwap, patternDetectAndSwap, findNestedIcon, getWarnings };
}

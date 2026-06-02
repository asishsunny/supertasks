#!/usr/bin/env node
/**
 * generate-gallery.mjs — Mechanically generate gallery pages from block interfaces.
 *
 * Reads:
 *   - code/pipeline/manifest.json (block names, types, dest, variations)
 *   - artifacts/interfaces/*.json (prop types from generate-interfaces.mjs)
 *
 * Generates:
 *   - app/src/app/(app)/gallery/{type}/{name}/page.tsx per block
 *   - Settings blocks grouped into one page at gallery/views/settings/page.tsx
 *
 * Every prop gets dummy data that satisfies the type.
 * Gallery is for visual verification — shape matters, values don't.
 *
 * Usage:
 *   node generate-gallery.mjs
 *   node generate-gallery.mjs --snippet controls
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

import { parse } from "@babel/parser";
import _traverse from "@babel/traverse";
import * as t from "@babel/types";
const traverse = _traverse.default || _traverse;

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../../..");
const APP = resolve(ROOT, "app/src");
const BLOCKS_DIR = resolve(APP, "components/blocks");
const GALLERY = resolve(APP, "app/(app)/gallery");
const MANIFEST = JSON.parse(readFileSync(resolve(ROOT, "code/pipeline/manifest.json"), "utf8"));
const IFACE_DIR = resolve(ROOT, "artifacts/interfaces");

// Read actual Props interface from built block file
function readBlockInterface(blockPath) {
  if (!existsSync(blockPath)) return null;
  const source = readFileSync(blockPath, "utf8");
  const ast = parse(source, { sourceType: "module", plugins: ["jsx", "typescript"] });

  let propsInterface = null;
  let exportType = "named";
  const helperTypes = [];

  traverse(ast, {
    ExportDefaultDeclaration() { exportType = "default"; },
    TSInterfaceDeclaration(path) {
      const name = path.node.id.name;
      const fields = path.node.body.body.map(member => {
        if (!t.isTSPropertySignature(member)) return null;
        const fieldName = member.key.name || member.key.value;
        const optional = member.optional || false;
        const typeStr = extractTypeString(member.typeAnnotation?.typeAnnotation);
        return { name: fieldName, type: typeStr, optional };
      }).filter(Boolean);

      if (name.endsWith("Props")) {
        propsInterface = { name, fields };
      } else {
        helperTypes.push({ name, fields });
      }
    },
  });

  return propsInterface ? { props: propsInterface, helperTypes, exportType } : null;
}

function extractTypeString(typeNode) {
  if (!typeNode) return "any";
  if (t.isTSStringKeyword(typeNode)) return "string";
  if (t.isTSNumberKeyword(typeNode)) return "number";
  if (t.isTSBooleanKeyword(typeNode)) return "boolean";
  if (t.isTSArrayType(typeNode)) return extractTypeString(typeNode.elementType) + "[]";
  if (t.isTSTypeReference(typeNode)) {
    const name = typeNode.typeName.name || typeNode.typeName.right?.name || "any";
    return name;
  }
  if (t.isTSFunctionType(typeNode)) return "() => void";
  if (t.isTSUnionType(typeNode)) return typeNode.types.map(extractTypeString).join(" | ");
  if (t.isTSTypeLiteral(typeNode)) return "object";
  return "any";
}

const cliArgs = process.argv.slice(2);
const snippetFilter = cliArgs.includes("--snippet") ? cliArgs[cliArgs.indexOf("--snippet") + 1] : null;

function toPascal(name) {
  return name.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase());
}

const TYPE_TO_FOLDER = { card: "cards", control: "controls", view: "views", overlay: "overlays" };

// ── Dummy value generators ──

function dummyString(fieldName) {
  const map = {
    label: "Label", title: "Title", value: "123", desc: "Description text",
    description: "Description text", name: "Item", key: "key-1",
    header: "Header", headerLabel: "Header", heading: "Heading",
    primaryAction: "Confirm", secondaryAction: "Cancel", escLabel: "Esc",
    saveLabel: "Save", avatarFallback: "AB", userName: "Jane Doe",
    avatarHint: "Click to change", avatarSrc: "", bioLabel: "Bio",
    bioPlaceholder: "Write something...", searchPlaceholder: "Search...",
    searchShortcut: "⌘K", infoLabel: "Info", activityLabel: "Activity",
    historyTitle: "History", time: "2h ago", text: "Activity text",
    price: "$12/month", renewalNote: "Renews monthly", changeLabel: "Change",
    updateLabel: "Update", color: "var(--tag-blue-icon)",
    status: "active", firstName: "Jane", dueDate: "Jan 1",
    priorityLabel: "High", activeTab: "tab-1",
    width: "w-[120px]", className: "",
  };
  return JSON.stringify(map[fieldName] || fieldName);
}

function dummyForType(type, fieldName, helperTypes, index) {
  type = type.trim();
  if (type.startsWith("(") || type.includes("=> void")) return null;

  if (type === "string") {
    const base = dummyString(fieldName);
    return index != null ? base.slice(0, -1) + ` ${index + 1}"` : base;
  }
  if (type === "number") return index != null ? String(index + 1) : "0";
  if (type === "boolean") return "false";
  if (type === "ReactNode") return "null";

  // Arrays
  const arrayMatch = type.match(/^(.+)\[\]$/);
  if (arrayMatch) {
    const itemType = arrayMatch[1];
    return dummyArray(itemType, fieldName, helperTypes);
  }

  // Helper type
  const helper = helperTypes?.find(h => h.name === type);
  if (helper) return dummyObj(helper.fields, helperTypes, index);

  // Pick<Member, ...>
  if (type.includes("Pick<Member")) return '{ initials: "A", avatarBg: "tag-blue-bg", avatarText: "tag-blue-text" }';

  // ModalField / SettingsToggle from @/types
  if (type === "ModalField") return '{ label: "Field", type: "input" as const, placeholder: "Enter..." }';
  if (type === "SettingsToggle") return '{ label: "Toggle", desc: "Description", on: true }';

  return "{} as any";
}

function dummyArray(itemType, fieldName, helperTypes) {
  if (itemType === "ModalField") {
    return `[\n    { label: "Task name", type: "input" as const, placeholder: "Enter..." },\n    { label: "Description", type: "textarea" as const, placeholder: "Describe..." },\n  ]`;
  }
  if (itemType === "SettingsToggle") {
    return `[\n    { label: "Toggle one", desc: "First toggle description", on: true },\n    { label: "Toggle two", desc: "Second toggle description", on: false },\n    { label: "Toggle three", desc: "Third toggle description", on: true },\n  ]`;
  }
  if (itemType === "ReactNode") return '[<div key="1">Card 1</div>, <div key="2">Card 2</div>]';
  if (itemType === "string") return '["Item 1", "Item 2", "Item 3"]';

  const helper = helperTypes?.find(h => h.name === itemType);
  if (helper) {
    const count = fieldName === "cards" || fieldName === "charts" ? 4 : 3;
    const items = [];
    for (let i = 0; i < count; i++) {
      items.push("    " + dummyObj(helper.fields, helperTypes, i));
    }
    return `[\n${items.join(",\n")},\n  ]`;
  }

  return "[{} as any]";
}

function dummyObj(fields, helperTypes, index) {
  const entries = fields
    .map(f => {
      // Render functions → simple identity
      if (f.type.includes("=>") && f.name === "render") return `render: (row: any) => row.id`;
      if (f.type.includes("=>")) return null;
      let val = dummyForType(f.type, f.name, helperTypes, index);
      if (val === null) return null;
      if (f.name === "active" && index != null) val = index === 0 ? "true" : "false";
      if (f.name === "id" && index != null) val = String(index + 1);
      return `${f.name}: ${val}`;
    })
    .filter(Boolean);
  return `{ ${entries.join(", ")} }`;
}

// ── Page generation ──

function generatePage(name, block, iface) {
  const componentName = iface.componentName;
  const importPath = `@/components/blocks/${componentName}`;
  const importLine = iface.exportType === "default"
    ? `import ${componentName} from "${importPath}";`
    : `import { ${componentName} } from "${importPath}";`;

  const variations = block.variations || [null];
  const needsClient = iface.props.some(p => p.type.includes("=>") || p.name.startsWith("on") || p.name === "activeTab");

  // Build prop data — use sampleData from interface when available, dummy otherwise
  const dataLines = [];
  const propAssignments = [];
  const samples = iface.sampleData || {};

  for (const prop of iface.props) {
    if (prop.type.includes("=>")) continue;

    // Check for extracted sample data first
    let val;
    if (samples[prop.name]) {
      val = JSON.stringify(samples[prop.name], null, 2).replace(/"([^"]+)":/g, '$1:');
    } else if (prop.type === "string" && samples[prop.name] !== undefined) {
      val = JSON.stringify(samples[prop.name]);
    } else {
      val = dummyForType(prop.type, prop.name, iface.helperTypes);
    }
    if (val === null) continue;

    if (prop.type.includes("[]") || prop.type.startsWith("{") || prop.type.includes("Pick<")) {
      dataLines.push(`const ${prop.name}Data = ${val};`);
      propAssignments.push({ prop: prop.name, ref: `${prop.name}Data` });
    } else {
      propAssignments.push({ prop: prop.name, val });
    }
  }

  const propsStr = propAssignments
    .map(p => p.ref ? `          ${p.prop}={${p.ref}}` : `          ${p.prop}={${p.val}}`)
    .join("\n");

  // Type imports
  const typeImports = [];
  if (iface.props.some(p => p.type.includes("ModalField"))) typeImports.push("ModalField");
  if (iface.props.some(p => p.type.includes("SettingsToggle"))) typeImports.push("SettingsToggle");
  const typeImportLine = typeImports.length ? `import type { ${typeImports.join(", ")} } from "@/types";\n` : "";

  const varSections = variations.map((v, i) => {
    const label = v ? v.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" ") : "Default";
    return `      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">${label}</h2>
        <${componentName}
${propsStr}
        />
      </section>`;
  }).join("\n");

  return `${needsClient ? '"use client";\n\n' : ""}${importLine}\n${typeImportLine}
${dataLines.join("\n")}

export default function Page() {
  return (
    <div className="flex flex-col gap-8 p-6">
${varSections}
    </div>
  );
}
`;
}

// ── Settings grouped page ──

function generateSettingsPage(settingsBlocks) {
  const imports = [];
  const allDataLines = [];
  const sections = [];

  for (const [name, block, iface] of settingsBlocks) {
    const cn = iface.componentName;
    const importPath = `@/components/blocks/${cn}`;
    imports.push(iface.exportType === "default"
      ? `import ${cn} from "${importPath}";`
      : `import { ${cn} } from "${importPath}";`);

    const prefix = name.replace(/-/g, "_");
    const propLines = [];

    for (const prop of iface.props) {
      if (prop.type.includes("=>")) continue;
      const val = dummyForType(prop.type, prop.name, iface.helperTypes);
      if (val === null) continue;

      if (prop.type.includes("[]") || prop.type.startsWith("{") || prop.type.includes("Pick<")) {
        const varName = `${prefix}_${prop.name}`;
        allDataLines.push(`const ${varName} = ${val};`);
        propLines.push(`          ${prop.name}={${varName}}`);
      } else {
        propLines.push(`          ${prop.name}={${val}}`);
      }
    }

    sections.push({ cn, propsStr: propLines.join("\n"), label: toPascal(name).replace("Settings", "Settings — ") });
  }

  // Check type imports
  const needsModalField = settingsBlocks.some(([_, __, i]) => i.props.some(p => p.type.includes("ModalField")));
  const needsToggle = settingsBlocks.some(([_, __, i]) => i.props.some(p => p.type.includes("SettingsToggle")));
  const typeImports = [];
  if (needsModalField) typeImports.push("ModalField");
  if (needsToggle) typeImports.push("SettingsToggle");
  const typeImportLine = typeImports.length ? `import type { ${typeImports.join(", ")} } from "@/types";\n` : "";

  const body = sections.map(s => `      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">${s.label}</h2>
        <${s.cn}
${s.propsStr}
        />
      </section>`).join("\n");

  return `${imports.join("\n")}\n${typeImportLine}
${allDataLines.join("\n")}

export default function Page() {
  return (
    <div className="flex flex-col gap-12 p-6">
${body}
    </div>
  );
}
`;
}

// ── Main ──

const blocks = Object.entries(MANIFEST.blocks);
const filtered = snippetFilter ? blocks.filter(([n]) => n === snippetFilter) : blocks;

const settingsBlocks = [];
let written = 0;

console.log("=== Generate Gallery ===\n");

for (const [name, block] of filtered) {
  const ifacePath = resolve(IFACE_DIR, `${name}.json`);
  if (!existsSync(ifacePath)) {
    console.log(`  SKIP ${name} — no interface`);
    continue;
  }
  const ifaceJson = JSON.parse(readFileSync(ifacePath, "utf8"));

  // Read actual block interface — source of truth for types
  const blockPath = resolve(BLOCKS_DIR, `${toPascal(name)}.tsx`);
  const blockIface = readBlockInterface(blockPath);

  // Merge: block types + JSON sample data + JSON export type
  const iface = {
    componentName: ifaceJson.componentName,
    exportType: blockIface?.exportType || ifaceJson.exportType,
    props: blockIface?.props?.fields?.map(f => ({
      name: f.name, type: f.type, optional: f.optional
    })) || ifaceJson.props,
    helperTypes: blockIface?.helperTypes || ifaceJson.helperTypes,
    sampleData: ifaceJson.sampleData || {},
  };

  if (name.startsWith("settings-")) {
    settingsBlocks.push([name, block, iface]);
    continue;
  }

  const folder = TYPE_TO_FOLDER[block.type] || "other";
  const pageDir = resolve(GALLERY, folder, name);
  mkdirSync(pageDir, { recursive: true });

  const content = generatePage(name, block, iface);
  const pagePath = resolve(pageDir, "page.tsx");

  writeFileSync(pagePath, content);
  console.log(`  ✓ ${name} → gallery/${folder}/${name}/page.tsx`);
  written++;
}

if (settingsBlocks.length > 0) {
  const pageDir = resolve(GALLERY, "views/settings");
  mkdirSync(pageDir, { recursive: true });
  const content = generateSettingsPage(settingsBlocks);
  const pagePath = resolve(pageDir, "page.tsx");

  writeFileSync(pagePath, content);
  console.log(`  ✓ settings (${settingsBlocks.length} tabs) → gallery/views/settings/page.tsx`);
  written++;
}

console.log(`\n✓ ${written} gallery pages`);

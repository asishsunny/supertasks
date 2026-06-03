#!/usr/bin/env node
/**
 * generate-gallery.mjs — Mechanical gallery page generator.
 *
 * Reads manifest (block names, types, exports) + gallery.ts structure.
 * Writes one page per block: import block + spread GALLERY props.
 * Settings blocks grouped into one page.
 *
 * Simple blocks: <Block {...GALLERY.blockName} />
 * Complex blocks (kanban, recent-tasks): need data.ts resolution, use "complex" template
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../../..");
const GALLERY = resolve(ROOT, "app/src/app/(app)/gallery");
const MANIFEST = JSON.parse(readFileSync(resolve(ROOT, "code/pipeline/manifest.json"), "utf8"));

function toPascal(name) {
  return name.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase());
}
function toCamel(name) {
  return name.replace(/-(\w)/g, (_, c) => c.toUpperCase());
}

const TYPE_TO_FOLDER = { card: "cards", control: "controls", view: "views", overlay: "overlays" };

// Simple blocks: just spread GALLERY props
function simplePage(name, block) {
  const cn = toPascal(name);
  const camel = toCamel(name);
  const importPath = `@/components/blocks/${cn}`;
  const importLine = block.export === "default"
    ? `import ${cn} from "${importPath}";`
    : `import { ${cn} } from "${importPath}";`;

  return `"use client";

${importLine}
import { GALLERY } from "@/lib/gallery";

export default function Page() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <h2 className="txt-compact-medium-plus text-ui-fg-subtle">${cn}</h2>
      <${cn} {...GALLERY.${camel}} />
    </div>
  );
}
`;
}

// Blocks with no gallery data — render with defaults
function defaultPage(name, block) {
  const cn = toPascal(name);
  const importPath = `@/components/blocks/${cn}`;
  const importLine = block.export === "default"
    ? `import ${cn} from "${importPath}";`
    : `import { ${cn} } from "${importPath}";`;

  return `"use client";

${importLine}

export default function Page() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <h2 className="txt-compact-medium-plus text-ui-fg-subtle">${cn}</h2>
      <${cn} />
    </div>
  );
}
`;
}

// Settings grouped page
function settingsPage(settingsBlocks) {
  const imports = settingsBlocks.map(([name, block]) => {
    const cn = toPascal(name);
    return block.export === "default"
      ? `import ${cn} from "@/components/blocks/${cn}";`
      : `import { ${cn} } from "@/components/blocks/${cn}";`;
  });

  const sections = settingsBlocks.map(([name]) => {
    const cn = toPascal(name);
    const label = cn.replace("Settings", "");
    return `      <section>
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle mb-3">${label}</h2>
        <${cn} />
      </section>`;
  });

  return `"use client";

${imports.join("\n")}

export default function Page() {
  return (
    <div className="flex flex-col gap-12 p-6">
${sections.join("\n")}
    </div>
  );
}
`;
}

// Blocks with GALLERY data (simple spread)
const HAS_GALLERY = new Set(["stat-cards", "controls"]);

// ── Main ──
const blocks = Object.entries(MANIFEST.blocks);
const settingsBlocks = [];
let written = 0;

console.log("=== Generate Gallery ===\n");

for (const [name, block] of blocks) {
  if (name.startsWith("settings-")) {
    settingsBlocks.push([name, block]);
    continue;
  }

  const folder = TYPE_TO_FOLDER[block.type] || "other";
  const pageDir = resolve(GALLERY, folder, name);
  mkdirSync(pageDir, { recursive: true });

  const content = HAS_GALLERY.has(name)
    ? simplePage(name, block)
    : defaultPage(name, block);

  writeFileSync(resolve(pageDir, "page.tsx"), content);
  console.log(`  ✓ ${name} → gallery/${folder}/${name}/page.tsx`);
  written++;
}

if (settingsBlocks.length > 0) {
  const pageDir = resolve(GALLERY, "views/settings");
  mkdirSync(pageDir, { recursive: true });
  writeFileSync(resolve(pageDir, "page.tsx"), settingsPage(settingsBlocks));
  console.log(`  ✓ settings (${settingsBlocks.length} tabs) → gallery/views/settings/page.tsx`);
  written++;
}

console.log(`\n✓ ${written} gallery pages`);

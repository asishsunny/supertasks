#!/usr/bin/env node
/**
 * generate-gallery.mjs — Mechanical gallery page generator.
 *
 * Reads gallery-wiring.json → generates page.tsx files.
 * Zero invention. All prop expressions come from the config.
 *
 * Usage: node code/pipeline/steps/generate-gallery.mjs
 */

import { writeFileSync, mkdirSync, readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../../..");
const wiring = JSON.parse(readFileSync(resolve(__dirname, "../maps/gallery-wiring.json"), "utf8"));
const GALLERY_ROOT = resolve(ROOT, "app/src/app/(app)/gallery");
const BLOCKS_DIR = resolve(ROOT, "app/src/components/blocks");

function isDefaultExport(blockName) {
  try {
    const src = readFileSync(resolve(BLOCKS_DIR, `${blockName}.tsx`), "utf8");
    return /export\s+default\s/.test(src);
  } catch { return false; }
}

function toPascal(name) {
  return name.replace(/(^|[-_])(\w)/g, (_, __, c) => c.toUpperCase());
}

function buildImports(page) {
  const lines = ['"use client";', ""];

  if (page.state) {
    lines.push('import { useState } from "react";');
  }

  for (const block of page.blocks) {
    if (isDefaultExport(block)) {
      lines.push(`import ${block} from "@/components/blocks/${block}";`);
    } else {
      lines.push(`import { ${block} } from "@/components/blocks/${block}";`);
    }
  }

  if (page.extraImports) {
    for (const imp of page.extraImports) {
      lines.push(imp);
    }
  }

  // Data imports — only include what setup/render actually references
  const code = (page.setup || "") + (page.render || "");
  const usedData = wiring.imports.data.filter(d => code.includes(d));
  const usedConstants = wiring.imports.constants.filter(c => code.includes(c));
  const usedUtils = wiring.imports.utils.filter(u => code.includes(u));
  const usedTypes = wiring.imports.types.filter(t => code.includes(t));

  if (usedData.length) lines.push(`import { ${usedData.join(", ")} } from "@/lib/data";`);
  if (usedConstants.length) lines.push(`import { ${usedConstants.join(", ")} } from "@/lib/constants";`);
  if (usedUtils.length) lines.push(`import { ${usedUtils.join(", ")} } from "@/lib/utils";`);
  if (usedTypes.length) lines.push(`import type { ${usedTypes.join(", ")} } from "@/types";`);

  return lines.join("\n");
}

function buildPage(pagePath, page) {
  const imports = buildImports(page);
  const wrapper = page.wrapper ? ` className="${page.wrapper}"` : "";
  const render = page.wrapper
    ? `<div${wrapper}>\n        ${page.render}\n      </div>`
    : page.render;

  if (page.state) {
    return `${imports}

export default function Page() {
  ${page.setup || ""}
  return (
    <div className="p-6">
      ${render}
    </div>
  );
}
`;
  }

  const setup = page.setup ? `\n${page.setup}\n` : "";
  return `${imports}
${setup}
export default function Page() {
  return (
    <div className="p-6">
      ${render}
    </div>
  );
}
`;
}

// Generate
let ok = 0;
for (const [pagePath, page] of Object.entries(wiring.pages)) {
  const dir = resolve(GALLERY_ROOT, pagePath);
  mkdirSync(dir, { recursive: true });
  const code = buildPage(pagePath, page);
  writeFileSync(resolve(dir, "page.tsx"), code);
  console.log(`  ✓ gallery/${pagePath}/page.tsx`);
  ok++;
}

// Index page
const indexCode = `import { redirect } from "next/navigation";

export default function GalleryIndex() {
  redirect("/gallery/cards/stat-cards");
}
`;
writeFileSync(resolve(GALLERY_ROOT, "page.tsx"), indexCode);
console.log("  ✓ gallery/page.tsx (redirect)");

console.log(`\n✓ ${ok} gallery pages generated from gallery-wiring.json`);

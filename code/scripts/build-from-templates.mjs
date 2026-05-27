#!/usr/bin/env node
/**
 * Template pipeline — reads screen-config + views.yaml,
 * calls generic builder, assembles final page.tsx.
 *
 * Usage: node code/scripts/build-from-templates.mjs <screen> [--all]
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { parse as parseYaml } from "yaml";
import { statCards, chartCards, tableBlock, settingsBlock, controlsBar, kanbanBoard, reportStats } from "../templates/builder.mjs";
import { SCREENS } from "../templates/screen-config.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const PAGES_DIR = resolve(__dirname, "../artifacts/pages");
const APP_DIR = resolve(ROOT, "app/src/app/(app)");

const views = parseYaml(readFileSync(resolve(ROOT, "data/views.yaml"), "utf8"));

const OUTPUT_MAP = {
  dashboard: "dashboard",
  tasks_list: "tasks",
  tasks_kanban: "tasks/kanban",
  team: "team",
  reports: "reports",
  settings: "settings",
};

function mergeImports(allImports) {
  const named = {};
  const types = new Set();
  for (const imp of allImports) {
    if (!imp) continue;
    if (imp.named) {
      for (const [mod, syms] of Object.entries(imp.named)) {
        if (!named[mod]) named[mod] = new Set();
        for (const sym of syms) named[mod].add(sym);
      }
    }
    if (imp.types) {
      for (const t of imp.types) types.add(t);
    }
  }
  const lines = [];
  for (const [mod, syms] of Object.entries(named)) {
    const sorted = [...syms].sort();
    lines.push(`import { ${sorted.join(", ")} } from "${mod}";`);
  }
  if (types.size) {
    lines.push(`import type { ${[...types].sort().join(", ")} } from "@/types";`);
  }
  return lines.join("\n");
}

function buildScreen(screenKey) {
  const config = SCREENS[screenKey];
  if (!config) {
    console.error(`Unknown screen: ${screenKey}`);
    console.error("Available:", Object.keys(SCREENS).join(", "));
    process.exit(1);
  }

  const view = views[screenKey] || {};
  const allImports = [config.imports];
  const allSetup = [config.setup];
  const allJsx = [];

  for (const sectionType of config.sections) {
    if (sectionType === "controls" && config.controls) {
      const result = controlsBar(config.controls);
      if (result.setup) allSetup.push(result.setup);
      allJsx.push(result.jsx);
      allImports.push(result.imports);
    }

    if (sectionType === "stat-cards") {
      const result = statCards();
      allSetup.push(result.setup);
      allJsx.push(result.jsx);
      allImports.push(result.imports);
    }

    if (sectionType === "report-stats" && config.stats) {
      const result = reportStats({ stats: config.stats });
      if (result.setup) allSetup.push(result.setup);
      allJsx.push(result.jsx);
      allImports.push(result.imports);
    }

    if (sectionType === "chart-cards" && config.charts) {
      const result = chartCards({ charts: config.charts });
      allSetup.push(result.setup);
      allJsx.push(result.jsx);
      allImports.push(result.imports);
    }

    if (sectionType === "kanban") {
      const result = kanbanBoard();
      if (result.setup) allSetup.push(result.setup);
      allJsx.push(result.jsx);
      allImports.push(result.imports);
    }

    if (sectionType === "table") {
      const tc = config.table;
      const columns = view.columns || [];
      if (tc.dataSetup) allSetup.push(tc.dataSetup);
      const result = tableBlock({
        columns,
        title: tc.title,
        dataVar: tc.dataVar,
        iterator: tc.iterator,
        keyExpr: tc.keyExpr,
        rowSetup: tc.rowSetup,
        pageSize: tc.pageSize,
        fieldMap: tc.fieldMap,
      });
      if (result.setup) allSetup.push(result.setup);
      allJsx.push(result.jsx);
      allImports.push(result.imports);
    }

    if (sectionType === "settings") {
      const result = settingsBlock(view, config);
      if (result.setup) allSetup.push(result.setup);
      allJsx.push(result.jsx);
      allImports.push(result.imports);
    }
  }

  const importBlock = mergeImports(allImports);
  const setupBlock = allSetup.filter(Boolean).join("\n\n  ");
  const jsxBlock = allJsx.map((s) => `      ${s}`).join("\n\n");

  const page = `"use client";

${importBlock}

export default function ${config.componentName}() {
  ${setupBlock}

  return (
    <div className="flex flex-col gap-4">
${jsxBlock}
    </div>
  );
}
`;

  const outName = OUTPUT_MAP[screenKey];
  const artifactPath = resolve(PAGES_DIR, `${outName}.tsx`);
  mkdirSync(dirname(artifactPath), { recursive: true });
  writeFileSync(artifactPath, page);

  const appDir = resolve(APP_DIR, outName);
  mkdirSync(appDir, { recursive: true });
  const appPath = resolve(appDir, "page.tsx");
  writeFileSync(appPath, page);

  console.log(`  ✓ ${screenKey} → ${outName}/page.tsx (${config.sections.length} sections)`);
}

// ── Sandbox templates ──
// Each sandbox template = one builder section as a standalone component.

const SANDBOX_DIR = resolve(APP_DIR, "sandbox/templates");

const SANDBOX_TEMPLATES = {
  statcards: { screen: "dashboard", section: "stat-cards", componentName: "StatCards" },
  chartcards: { screen: "dashboard", section: "chart-cards", componentName: "ChartCards" },
  table: { screen: "dashboard", section: "table", componentName: "RecentTasks" },
  kanban: { screen: "tasks_kanban", section: "kanban", componentName: "KanbanBoard" },
};

function buildSandboxTemplate(name) {
  const tpl = SANDBOX_TEMPLATES[name];
  const config = SCREENS[tpl.screen];
  const view = views[tpl.screen] || {};

  const allImports = [config.imports];
  const allSetup = [config.setup];
  let jsx = "";

  const sectionType = tpl.section;

  if (sectionType === "stat-cards") {
    const result = statCards();
    allSetup.push(result.setup);
    jsx = result.jsx;
    allImports.push(result.imports);
  }

  if (sectionType === "chart-cards" && config.charts) {
    const result = chartCards({ charts: config.charts });
    allSetup.push(result.setup);
    jsx = result.jsx;
    allImports.push(result.imports);
  }

  if (sectionType === "kanban") {
    const result = kanbanBoard();
    if (result.setup) allSetup.push(result.setup);
    jsx = result.jsx;
    allImports.push(result.imports);
  }

  if (sectionType === "table") {
    const tc = config.table;
    const columns = view.columns || [];
    if (tc.dataSetup) allSetup.push(tc.dataSetup);
    const result = tableBlock({
      columns,
      title: tc.title,
      dataVar: tc.dataVar,
      iterator: tc.iterator,
      keyExpr: tc.keyExpr,
      rowSetup: tc.rowSetup,
      pageSize: tc.pageSize,
      fieldMap: tc.fieldMap,
    });
    if (result.setup) allSetup.push(result.setup);
    jsx = result.jsx;
    allImports.push(result.imports);
  }

  const importBlock = mergeImports(allImports);
  const setupBlock = allSetup.filter(Boolean).join("\n\n  ");

  const page = `"use client";

${importBlock}

export default function ${tpl.componentName}() {
  ${setupBlock}

  return (
    ${jsx}
  );
}
`;

  mkdirSync(SANDBOX_DIR, { recursive: true });
  const outPath = resolve(SANDBOX_DIR, `${name}.tsx`);
  writeFileSync(outPath, page);
  console.log(`  ✓ sandbox/${name}.tsx (${tpl.section} from ${tpl.screen})`);
}

function buildSandbox() {
  for (const name of Object.keys(SANDBOX_TEMPLATES)) {
    buildSandboxTemplate(name);
  }
}

// ── CLI ──

const args = process.argv.slice(2);
const all = args.includes("--all");
const sandbox = args.includes("--sandbox");
const screenArg = args.find((a) => !a.startsWith("--"));

if (!screenArg && !all && !sandbox) {
  console.log("Usage: node build-from-templates.mjs <screen> [--all] [--sandbox]");
  console.log("Screens:", Object.keys(SCREENS).join(", "));
  process.exit(1);
}

if (all || sandbox) {
  if (all) {
    for (const key of Object.keys(SCREENS)) {
      buildScreen(key);
    }
  }
  if (sandbox || all) {
    buildSandbox();
  }
} else {
  buildScreen(screenArg);
}

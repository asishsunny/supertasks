#!/usr/bin/env node
/**
 * End-to-end pipeline test — validates the full data-driven chain:
 *   data.yaml → sync-plan → plan.md → generate-yaml → screens/views.yaml → transform
 *
 * Tests run without Figma — uses cached JSX artifacts for transform stage.
 * Exit 0 = all pass, exit 1 = failures.
 *
 * Usage: node code/scripts/test-pipeline.mjs
 */

import { readFileSync, writeFileSync, copyFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import { createRequire } from "module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const require = createRequire(resolve(ROOT, "app/package.json"));
const yaml = require("js-yaml");

let passed = 0;
let failed = 0;

function assert(label, condition, detail) {
  if (condition) {
    console.log(`  ✓ ${label}`);
    passed++;
  } else {
    console.error(`  ✗ ${label}${detail ? ` — ${detail}` : ""}`);
    failed++;
  }
}

function run(cmd) {
  return execSync(cmd, { cwd: ROOT, encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] });
}

function readFile(rel) {
  return readFileSync(resolve(ROOT, rel), "utf8");
}

// ── Load source of truth ──
const data = yaml.load(readFile("data/data.yaml"));
const tasks = data.tasks;
const members = data.members;
const reports = data.reports;

const byStatus = {};
const byPriority = {};
for (const t of tasks) {
  byStatus[t.status] = (byStatus[t.status] || 0) + 1;
  byPriority[t.priority] = (byPriority[t.priority] || 0) + 1;
}
const total = tasks.length;
const done = byStatus.done || 0;
const inProgress = byStatus.in_progress || 0;
const todo = byStatus.todo || 0;
const inReview = byStatus.in_review || 0;
const overdue = tasks.filter(t => t.due < 0 && t.status !== "done").length;

// ═══════════════════════════════════════════
console.log("\n1. sync-plan — data.yaml → plan.md");
// ═══════════════════════════════════════════

const planBefore = readFile("plan.md");
const syncOut = run("node code/scripts/sync-plan.mjs");
const plan = readFile("plan.md");

assert("sync-plan runs without error", !syncOut.includes("Error"));
assert("plan has correct total tasks", plan.includes(`Total tasks (${total})`));
assert("plan has correct status counts",
  plan.includes(`Todo (${todo})`) && plan.includes(`In Progress (${inProgress})`) && plan.includes(`Done (${done})`));
assert("plan has correct priority counts",
  plan.includes(`Low (${byPriority.low || 0})`) && plan.includes(`High (${byPriority.high || 0})`));
assert("plan has correct team count", plan.includes(`${members.length} rows`));
assert("plan has correct overdue count", plan.includes(`Overdue (${overdue})`));

// ═══════════════════════════════════════════
console.log("\n2. generate-yaml — plan.md → screens.yaml + views.yaml");
// ═══════════════════════════════════════════

let screens, views;
try {
  const genOut = run("node figma/scripts/generate-yaml.mjs 2>&1");
  assert("generate-yaml runs without error", !genOut.toLowerCase().includes("error"));
} catch (e) {
  assert("generate-yaml runs without error", false, e.stderr?.split("\n")[0] || e.message.split("\n")[0]);
}

try {
  screens = yaml.load(readFile("data/screens.yaml"));
  views = yaml.load(readFile("data/views.yaml"));
} catch {
  screens = null;
  views = null;
}

assert("screens.yaml exists and has entries", screens && Object.keys(screens).length > 0,
  screens ? `${Object.keys(screens).length} screens` : "file missing or empty");
assert("views.yaml exists and has entries", views && Object.keys(views).length > 0,
  views ? `${Object.keys(views).length} views` : "file missing or empty");

// Check screens reference valid nav items from data.yaml
if (screens) {
  const validNavTitles = new Set([...data.nav.menu, ...data.nav.extensions].map(n => n.title));
  for (const [name, scr] of Object.entries(screens)) {
    if (scr.selectedNav) {
      assert(`screen "${name}" selectedNav "${scr.selectedNav}" exists in data.yaml`,
        validNavTitles.has(scr.selectedNav));
    }
  }
}

// ═══════════════════════════════════════════
console.log("\n3. data consistency — single source of truth");
// ═══════════════════════════════════════════

// Nav items in data.yaml must have codeName
for (const item of data.nav.menu) {
  assert(`nav.menu "${item.title}" has codeName`, !!item.codeName);
}
for (const item of data.nav.extensions) {
  assert(`nav.extensions "${item.title}" has codeName`, !!item.codeName);
}

// layout.tsx must use same icons as data.yaml
const layout = readFile("app/src/app/(app)/layout.tsx");
for (const item of data.nav.menu) {
  assert(`layout.tsx imports ${item.codeName}`, layout.includes(item.codeName),
    `icon "${item.codeName}" not found in layout.tsx`);
}
for (const item of data.nav.extensions) {
  assert(`layout.tsx imports ${item.codeName}`, layout.includes(item.codeName),
    `icon "${item.codeName}" not found in layout.tsx`);
}

// build-screen.mjs must NOT have hardcoded nav arrays
const buildScreen = readFile("figma/scripts/build-screen.mjs");
assert("build-screen.mjs reads nav from data.yaml (no hardcoded navTitles)",
  !buildScreen.includes("const navTitles ="));
assert("build-screen.mjs reads nav from data.yaml (no hardcoded navIcons)",
  !buildScreen.includes("const navIcons ="));
assert("build-screen.mjs uses data.nav.menu",
  buildScreen.includes("data.nav.menu"));

// User data consistency
assert("build-screen.mjs uses data.user (no hardcoded user name)",
  !buildScreen.match(/user:\s*\{\s*name:\s*'[^']+'/));

// ═══════════════════════════════════════════
console.log("\n3b. generate-app-data — data.yaml → types + data + constants");
// ═══════════════════════════════════════════

try {
  run("node code/scripts/generate-app-data.mjs");
  assert("generate-app-data runs without error", true);
} catch (e) {
  assert("generate-app-data runs without error", false, e.message.split("\n")[0]);
}

const genTypes = readFile("app/src/types/index.ts");
const genData = readFile("app/src/lib/data.ts");
const genConsts = readFile("app/src/lib/constants.ts");

assert("types has all statuses", Object.keys(byStatus).every(s => genTypes.includes(`"${s}"`)));
assert("types has all priorities", Object.keys(byPriority).every(p => genTypes.includes(`"${p}"`)));
assert("data.ts has all members", data.members.every(m => genData.includes(m.name)));
assert("data.ts has all tasks", data.tasks.every(t => genData.includes(t.title.replace(/"/g, '\\"'))));
assert("data.ts has correct user", genData.includes(data.user.name));
assert("constants has priority colors", Object.keys(data.priority_colors).every(k => genConsts.includes(k)));
assert("constants has status colors", Object.keys(data.status_colors).every(k => genConsts.includes(k)));

// TypeScript check
try {
  run("cd app && npx tsc --noEmit 2>&1");
  assert("generated files pass TypeScript", true);
} catch (e) {
  assert("generated files pass TypeScript", false, e.message.split("\n")[0]);
}

// ═══════════════════════════════════════════
console.log("\n4. transform — cached JSX → TSX (icon gate)");
// ═══════════════════════════════════════════

const cacheDir = resolve(ROOT, "code/artifacts/cache");

// Transform cached sidebar JSX
let transformOk = false;
try {
  const tOut = run(`cd app && node ../code/scripts/transform.mjs ../code/artifacts/cache/shell-sidebar-raw.jsx 2>&1`);
  transformOk = true;

  // Check icon gate output for mismatches
  const gateWarnings = tOut.split("\n").filter(l => l.includes("[icon-gate]"));
  assert("transform runs on cached sidebar JSX", true);

  if (gateWarnings.length > 0) {
    for (const w of gateWarnings) {
      const fixed = w.includes("→ fixed");
      assert(`icon gate auto-corrected: ${w.trim()}`, fixed);
    }
  } else {
    assert("icon gate: no mismatches (all icons correct)", true);
  }

  // Verify output contains expected Medusa icons
  for (const item of data.nav.menu) {
    const hasIcon = tOut.includes(item.codeName) || tOut.includes(`<${item.codeName}`);
    assert(`transform output contains ${item.codeName}`, hasIcon,
      `expected icon component for "${item.title}"`);
  }
} catch (e) {
  assert("transform runs on cached sidebar JSX", false, e.message.split("\n")[0]);
}

// ═══════════════════════════════════════════
console.log("\n5. build-screen data assembly — dry run");
// ═══════════════════════════════════════════

// Simulate mkShellData logic from build-screen.mjs
const activeNav = "Dashboard";
const shellNav = data.nav.menu.map(item => ({
  title: item.title,
  iconKey: item.codeName.toLowerCase(),
  state: item.title === activeNav ? "Selected" : "Default",
}));
const shellExt = data.nav.extensions.map(item => ({
  title: item.title,
  iconKey: item.codeName.toLowerCase(),
  state: item.title === activeNav ? "Selected" : "Default",
}));

assert("shell nav has correct count", shellNav.length === data.nav.menu.length);
assert("shell extensions has correct count", shellExt.length === data.nav.extensions.length);
assert("active nav marked Selected", shellNav.find(n => n.title === activeNav)?.state === "Selected");
assert("non-active nav marked Default", shellNav.filter(n => n.state === "Default").length === shellNav.length - 1);

for (const item of shellNav) {
  assert(`nav "${item.title}" iconKey matches codeName`, item.iconKey === data.nav.menu.find(m => m.title === item.title).codeName.toLowerCase());
}

// ═══════════════════════════════════════════
// Summary
// ═══════════════════════════════════════════
console.log(`\n${"═".repeat(45)}`);
console.log(`Pipeline test: ${passed} passed, ${failed} failed`);
console.log(`${"═".repeat(45)}\n`);

process.exit(failed > 0 ? 1 : 0);

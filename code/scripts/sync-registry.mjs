#!/usr/bin/env node
/**
 * Walk "Final render" page in Figma, match section names to registry,
 * update screen-registry.json with fresh nodeIds.
 *
 * Requires console bridge running on localhost:3333.
 * Usage: node scripts/sync-registry.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const REGISTRY_PATH = resolve(__dirname, "../maps/screen-registry.json");
const BRIDGE = process.env.FIGMA_BRIDGE_URL || "http://localhost:3333";

const registry = JSON.parse(readFileSync(REGISTRY_PATH, "utf8"));

async function exec(code) {
  const resp = await fetch(`${BRIDGE}/execute`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, timeout: 15000 }),
  });
  const data = await resp.json();
  const text = data?.result?.content?.[0]?.text;
  if (!text) throw new Error("No response from bridge");
  const parsed = JSON.parse(text);
  if (!parsed.success) throw new Error(parsed.error || "exec failed");
  return parsed.result;
}

// ── Build section name → registry path map ──

const sectionMap = {};
for (const [screenName, screen] of Object.entries(registry.screens)) {
  for (const section of screen.sections) {
    sectionMap[section.dataName] = { screenName, sectionName: section.name, path: "sections" };
  }
  if (screen.tabVariants) {
    for (const [tabName, variant] of Object.entries(screen.tabVariants)) {
      // Tab variants are fetched by their cache name pattern
      sectionMap[tabName] = { screenName, sectionName: tabName, path: "tabVariants" };
    }
  }
}

// ── Walk rendered screens ──

console.log("Walking 'Final render' page...\n");

const screenFrames = await exec(`
  await figma.loadAllPagesAsync();
  const page = figma.root.children.find(p => p.name === 'Final render');
  if (!page) return { error: 'No Final render page' };
  await figma.setCurrentPageAsync(page);

  const results = [];
  for (const frame of page.children) {
    if (frame.type !== 'FRAME') continue;
    if (frame.name.includes('Dark') || frame.name.includes('— Dark')) continue;

    const sections = [];
    function walk(node, depth, parentId) {
      if (depth > 5) return;
      if (!node.children) return;
      for (const child of node.children) {
        sections.push({ id: child.id, name: child.name, type: child.type, depth, parentId });
        if ((child.type === 'FRAME' || child.type === 'INSTANCE') && depth < 4) walk(child, depth + 1, child.id);
      }
    }
    walk(frame, 0, frame.id);
    results.push({ id: frame.id, name: frame.name, sections });
  }
  return results;
`);

if (screenFrames.error) {
  console.error("Error:", screenFrames.error);
  process.exit(1);
}

// ── Match and update ──

let updated = 0;
const screensYaml = readFileSync(resolve(ROOT, "data/screens.yaml"), "utf8");

// Parse screens.yaml to get frame→screen mapping
const frameToScreen = {};
let currentScreen = null;
for (const line of screensYaml.split("\n")) {
  const screenMatch = line.match(/^(\w+):$/);
  if (screenMatch) { currentScreen = screenMatch[1]; continue; }
  const frameMatch = line.match(/^\s+frame:\s*(.+)/);
  if (frameMatch && currentScreen) {
    frameToScreen[frameMatch[1].trim()] = currentScreen;
  }
}

// Map registry screen names to screens.yaml screen names
// Registry "tasks" = screens.yaml "tasks_list" (rendered as "Tasks — List")
const registryToYaml = {
  tasks: "tasks_list",
};

// Reverse: screens.yaml name → registry name
const yamlToRegistry = {};
for (const [reg, yaml] of Object.entries(registryToYaml)) yamlToRegistry[yaml] = reg;
// Direct matches (same name in both)
for (const name of Object.keys(registry.screens)) {
  if (!registryToYaml[name]) yamlToRegistry[name] = name;
}

for (const frame of screenFrames) {
  const yamlScreenName = frameToScreen[frame.name];
  if (!yamlScreenName) continue;

  const registryName = yamlToRegistry[yamlScreenName] || yamlScreenName;
  const screen = registry.screens[registryName];
  if (!screen) continue;

  // Update page node
  screen.pageNode = frame.id;

  // Match sections by dataName
  for (const section of screen.sections) {
    const match = frame.sections.find((s) => s.name === section.dataName);
    if (match) {
      const old = section.nodeId;
      section.nodeId = match.id;
      if (old !== match.id) {
        console.log(`  ${registryName}/${section.name}: ${old} → ${match.id}`);
        updated++;
      }
    } else {
      console.log(`  ⚠ ${registryName}/${section.name}: "${section.dataName}" not found in ${frame.name}`);
    }
  }
}

// ── Sync tabVariants (separate rendered screens) ──

for (const [registryName, screen] of Object.entries(registry.screens)) {
  if (!screen.tabVariants) continue;
  for (const [tabName, variant] of Object.entries(screen.tabVariants)) {
    // Find the rendered screen for this tab variant
    // e.g. settings/notifications → "Settings — Notifications"
    const yamlName = `${registryName}_${tabName}`;
    const frameName = Object.entries(frameToScreen).find(([, v]) => v === yamlName)?.[0];
    if (!frameName) continue;

    const frame = screenFrames.find((f) => f.name === frameName);
    if (!frame) continue;

    // The content section is the second "Page Body" child's first child
    // Look for "Settings Content" or similar
    const contentNode = frame.sections.find((s) => s.name === "Settings Content");
    if (contentNode) {
      const old = variant.nodeId;
      variant.nodeId = contentNode.id;
      if (old !== contentNode.id) {
        console.log(`  ${registryName}/${tabName}: ${old} → ${contentNode.id}`);
        updated++;
      }
    }
  }
}

writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2) + "\n");
console.log(`\nUpdated ${updated} nodeIds in screen-registry.json`);

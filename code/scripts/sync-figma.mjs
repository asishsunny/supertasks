#!/usr/bin/env node
/**
 * sync-figma — full pipeline for one snippet
 *
 * Usage:
 *   node sync-figma.mjs --name <name>                       (cache must already exist)
 *   node sync-figma.mjs --name <name> --write-cache <<'EOF' (pipe inline JSX from stdin)
 *   node sync-figma.mjs --name <name> --from-file <path>    (extract from MCP harness .txt)
 *
 * Steps:
 *   1. Ingest JSX into artifacts/cache/{name}.jsx (--write-cache or --from-file)
 *   2. Transform: cache → transformed (via transform.mjs)
 *   3. Adapt: transformed → blocks (via adapt.mjs)
 *   4. Checklist for manual QA
 *
 * Step 1 accepts MCP output via two paths:
 *   --write-cache : reads raw JSX from stdin (for inline MCP results)
 *   --from-file   : extracts from harness-saved JSON .txt (for large MCP results)
 * If neither flag is given, cache file must already exist on disk.
 */

import { execSync } from "child_process";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");

const args = process.argv.slice(2);
function getArg(flag) {
  const idx = args.indexOf(flag);
  return idx !== -1 ? args[idx + 1] : null;
}

const name = getArg("--name");
if (!name) {
  console.log("Usage: node sync-figma.mjs --name <name> [--skip-fetch]");
  console.log("       node sync-figma.mjs --name <name> --write-cache    (reads JSX from stdin)");
  console.log("       node sync-figma.mjs --name <name> --from-file <path.txt>  (extracts from MCP result file)");
  console.log("Example: node sync-figma.mjs --name kanban-board");
  process.exit(1);
}

const skipFetch = args.includes("--skip-fetch");
const writeCache = args.includes("--write-cache");
const fromFile = getArg("--from-file");
const cachePath = resolve(ROOT, `artifacts/cache/${name}.jsx`);
const transformPath = resolve(ROOT, `artifacts/transformed/${name}.tsx`);
const blockPath = resolve(ROOT, `app/src/components/blocks/${name.replace(/-(\w)/g, (_, c) => c.toUpperCase()).replace(/^(\w)/, (_, c) => c.toUpperCase())}.tsx`);

console.log(`\n=== sync-figma: ${name} ===\n`);

// Step 1a: --from-file mode — extract from MCP harness result .txt
if (fromFile) {
  const extractScript = resolve(__dirname, "extract-mcp-result.mjs");
  execSync(`node "${extractScript}" "${resolve(fromFile)}" "${cachePath}"`, { cwd: ROOT, stdio: "inherit" });
  console.log(`✓ Step 1: Extracted from ${fromFile} → ${cachePath}`);
}

// Step 1b: --write-cache mode — read JSX from stdin, write to cache
if (writeCache) {
  const stdin = readFileSync(0, "utf8"); // fd 0 = stdin
  if (!stdin.trim()) {
    console.error(`❌ Step 1: --write-cache got empty stdin`);
    process.exit(1);
  }
  writeFileSync(cachePath, stdin);
  console.log(`✓ Step 1: Wrote stdin → ${cachePath} (${(stdin.length / 1024).toFixed(1)}KB)`);
}

// Step 1c: Check cache exists (always, regardless of mode)
if (!existsSync(cachePath)) {
  console.error(`❌ Step 1: Cache file missing: ${cachePath}`);
  console.error(`   Run Figma MCP fetch first, then either:`);
  console.error(`   a) node sync-figma.mjs --name ${name} --write-cache <<'EOF'`);
  console.error(`      <paste JSX here>`);
  console.error(`      EOF`);
  console.error(`   b) node sync-figma.mjs --name ${name} --from-file /path/to/result.txt`);
  process.exit(1);
}
console.log(`✓ Step 1: Cache exists (${(readFileSync(cachePath).length / 1024).toFixed(1)}KB)`);

// Step 2: Transform
console.log(`→ Step 2: Transforming...`);
try {
  execSync(`node ${resolve(__dirname, "transform.mjs")} "${cachePath}" --out "${transformPath}"`, { 
    cwd: ROOT, 
    stdio: ["pipe", "pipe", "pipe"] 
  });
  console.log(`✓ Step 2: Transformed → ${transformPath}`);
} catch (e) {
  const stderr = e.stderr?.toString() || "";
  // Warnings are OK
  if (existsSync(transformPath)) {
    console.log(`✓ Step 2: Transformed (with warnings)`);
    if (stderr) stderr.split("\n").filter(l => l.trim()).forEach(l => console.log(`  ⚠ ${l}`));
  } else {
    console.error(`❌ Step 2: Transform failed`);
    console.error(stderr);
    process.exit(1);
  }
}

// Step 3: Adapt (skip if block already has step 2)
if (existsSync(blockPath)) {
  const existing = readFileSync(blockPath, "utf8");
  if (existing.includes("step 2")) {
    console.log(`⏭ Step 3: Skipped — ${blockPath.replace(ROOT + "/", "")} already has step 2`);
  } else {
    execSync(`node ${resolve(__dirname, "adapt.mjs")} "${transformPath}" --out "${blockPath}"`, { cwd: ROOT, stdio: ["pipe", "pipe", "pipe"] });
    console.log(`✓ Step 3: Adapted → ${blockPath}`);
  }
} else {
  try {
    execSync(`node ${resolve(__dirname, "adapt.mjs")} "${transformPath}" --out "${blockPath}"`, { cwd: ROOT, stdio: ["pipe", "pipe", "pipe"] });
    console.log(`✓ Step 3: Adapted → ${blockPath}`);
  } catch (e) {
    console.error(`❌ Step 3: Adapt failed`);
    console.error(e.stderr?.toString() || e.message);
    process.exit(1);
  }
}

// Step 4: Generate checklist for step 2
const checklistPath = resolve(ROOT, `artifacts/transformed/${name}.checklist.md`);
const checklist = `# Step 2 checklist: ${name}

## Before adapting
- [ ] Fetch Figma screenshot: \`mcp__figma__get_screenshot\` → \`/tmp/figma-${name}.png\`
- [ ] Compare icon colors against Figma screenshot (MCP loses SVG fill tokens)
- [ ] Compare avatar rendering (MCP exports as raster \`<img>\`, may need Medusa \`<Avatar>\`)

## During adapt
- [ ] Add imports for all referenced components (Button, Badge, IconButton, etc.)
- [ ] Replace hardcoded text with props
- [ ] Extract repeated subtrees into \`.map()\`
- [ ] Strip noise classes (relative/shrink-0) only where safe — check for absolute children

## After adapt
- [ ] Open gallery page in browser
- [ ] Side-by-side compare with \`/tmp/figma-${name}.png\`
- [ ] Check: icon colors match? Avatar renders? Spacing correct?
`;
writeFileSync(checklistPath, checklist);
console.log(`✓ Step 4: Checklist → ${checklistPath.replace(ROOT + "/", "")}`);

// Step 5: Summary
const transformSize = readFileSync(transformPath).length;
const blockSize = readFileSync(blockPath).length;
console.log(`\n=== Summary ===`);
console.log(`  Cache:       artifacts/cache/${name}.jsx`);
console.log(`  Transformed: artifacts/transformed/${name}.tsx`);
console.log(`  Block:       ${blockPath.replace(ROOT + "/", "")}`);
console.log(`  Checklist:   artifacts/transformed/${name}.checklist.md`);
console.log(`  Transform:   ${(transformSize / 1024).toFixed(1)}KB`);
console.log(`  Block:       ${(blockSize / 1024).toFixed(1)}KB\n`);

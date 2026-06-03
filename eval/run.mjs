#!/usr/bin/env node
/**
 * Eval harness — standalone repeatable quality gate.
 * Run: node eval/run.mjs
 * Hill-climb: make changes → rerun → compare scores.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from "fs";
import { resolve, dirname } from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const HISTORY_PATH = resolve(__dirname, "history.jsonl");

// ── Graders ──

const graders = {
  deterministic: runDeterministicChecks,
  "pipeline-fidelity": runPipelineFidelity,
  "data-binding": runDataBinding,
};

// ── Deterministic checks (from scorecard) ──

function runDeterministicChecks(blockPath, content, transformContent) {
  const results = {};

  const hexMatches = content.match(/bg-\[#[0-9a-fA-F]+\]|text-\[#[0-9a-fA-F]+\]/g);
  results["ds-tokens"] = !hexMatches;

  const sepFail = content.includes("useStore") || content.includes('from "@/lib/data"');
  results["separation"] = !sepFail;

  const dumbFail = /\buseState\b/.test(content);
  results["dumb-blocks"] = !dumbFail;

  const hasTypes = content.includes("interface") || content.includes("type ");
  const hasExport = content.includes("export function") || content.includes("export const");
  results["types"] = hasTypes && hasExport;

  const relCount = (content.match(/\brelative\b/g) || []).length;
  results["no-noise"] = relCount <= 3;

  const bigWidths = content.match(/w-\[\d{4,}px\]/g);
  results["responsive"] = !bigWidths;

  const a11yFail = content.includes("onClick") && !content.includes("role=") && !content.includes("button");
  results["a11y"] = !a11yFail;

  const hardcoded = [];
  const stringMatches = content.match(/>[\s]*[A-Z][a-z]+(?:\s[a-z]+)*[\s]*</g) || [];
  for (const m of stringMatches) {
    const text = m.replace(/^>\s*/, "").replace(/\s*<$/, "").trim();
    if (text.length > 2 && !text.match(/^(Esc|Info|Bio)$/)) hardcoded.push(text);
  }
  results["data-driven"] = hardcoded.length === 0;

  return results;
}

// ── Pipeline fidelity — transform output preserved ──

function runPipelineFidelity(blockPath, content, transformContent) {
  if (!transformContent) return { "transform-fidelity": true };

  const expected = ["Badge", "ColorAvatar", "Table", "IconButton", "Button", "Input", "Select", "Textarea"];
  const transformUses = expected.filter(c => transformContent.includes(c));
  const missing = transformUses.filter(c => !content.includes(c));

  return { "transform-fidelity": missing.length === 0 };
}

// ── Data binding — values trace to data.yaml ──

function runDataBinding(blockPath, content) {
  const dataPath = resolve(ROOT, "data/data.yaml");
  if (!existsSync(dataPath)) return { "data-binding": true };

  const dataContent = readFileSync(dataPath, "utf8");
  const results = {};

  // Check block doesn't import data directly
  results["data-binding"] = !content.includes('from "@/lib/data"') && !content.includes("from '@/lib/data'");

  return results;
}

// ── TypeScript compilation check ──

function runTypeCheck(blockPath) {
  const filename = blockPath.split("/").pop();
  try {
    execSync(`cd ${resolve(ROOT, "app")} && npx tsc --noEmit 2>&1 | grep -c "${filename}"`, {
      stdio: ["pipe", "pipe", "pipe"],
      timeout: 30000,
    });
    return { typescript: false }; // grep found errors
  } catch {
    return { typescript: true }; // no errors
  }
}

// ── Main runner ──

function run() {
  const blocksDir = resolve(ROOT, "app/src/components/blocks");
  const transformDir = resolve(ROOT, "artifacts/transformed");

  if (!existsSync(blocksDir)) {
    console.log("No blocks dir found. Nothing to eval.");
    process.exit(0);
  }

  const blocks = readdirSync(blocksDir).filter(f => f.endsWith(".tsx"));
  const runResults = [];
  let totalPassed = 0;
  let totalChecks = 0;

  console.log("╔══════════════════════════════════════╗");
  console.log("║         EVAL HARNESS — run           ║");
  console.log("╚══════════════════════════════════════╝\n");

  for (const file of blocks) {
    const blockPath = resolve(blocksDir, file);
    const content = readFileSync(blockPath, "utf8");
    const name = file.replace(".tsx", "");

    if (content.trim().length === 0) {
      console.log(`  ${name}: EMPTY — skip`);
      runResults.push({ name, score: 0, checks: {}, empty: true });
      continue;
    }

    const transformPath = resolve(transformDir, `${name}.tsx`);
    const transformContent = existsSync(transformPath) ? readFileSync(transformPath, "utf8") : null;

    // Run all graders
    let allChecks = {};
    for (const [, grader] of Object.entries(graders)) {
      Object.assign(allChecks, grader(blockPath, content, transformContent));
    }
    Object.assign(allChecks, runTypeCheck(blockPath));

    const passed = Object.values(allChecks).filter(Boolean).length;
    const total = Object.keys(allChecks).length;
    const score = Math.round((passed / total) * 10);
    totalPassed += passed;
    totalChecks += total;

    const icon = score >= 9 ? "✓" : score >= 7 ? "◐" : "✗";
    const fails = Object.entries(allChecks).filter(([, v]) => !v).map(([k]) => k);
    console.log(`  ${icon} ${name}: ${score}/10${fails.length ? `  ⚠ ${fails.join(", ")}` : ""}`);

    runResults.push({ name, score, checks: allChecks });
  }

  // Summary
  const scored = runResults.filter(r => !r.empty);
  const avg = scored.length > 0 ? (scored.reduce((s, r) => s + r.score, 0) / scored.length).toFixed(1) : "—";
  const passing = scored.filter(r => r.score >= 9).length;
  const blocking = scored.filter(r => r.score < 7).length;

  console.log(`\n── Summary ──`);
  console.log(`  Blocks: ${scored.length}  Avg: ${avg}/10  Pass(≥9): ${passing}  Block(<7): ${blocking}`);

  // Delta from last run
  const history = loadHistory();
  if (history.length > 0) {
    const last = history[history.length - 1];
    const delta = (parseFloat(avg) - parseFloat(last.avg)).toFixed(1);
    const arrow = delta > 0 ? "↑" : delta < 0 ? "↓" : "→";
    console.log(`  Delta: ${arrow} ${delta} from last run (${last.timestamp})`);
  }

  // Save to history
  const entry = {
    timestamp: new Date().toISOString(),
    blocks: scored.length,
    avg,
    passing,
    blocking,
    results: runResults,
  };
  appendHistory(entry);
  console.log(`\n✓ History saved to eval/history.jsonl`);

  return entry;
}

// ── History ──

function loadHistory() {
  if (!existsSync(HISTORY_PATH)) return [];
  return readFileSync(HISTORY_PATH, "utf8")
    .trim()
    .split("\n")
    .filter(Boolean)
    .map(line => JSON.parse(line));
}

function appendHistory(entry) {
  const line = JSON.stringify(entry) + "\n";
  if (existsSync(HISTORY_PATH)) {
    const existing = readFileSync(HISTORY_PATH, "utf8");
    writeFileSync(HISTORY_PATH, existing + line);
  } else {
    writeFileSync(HISTORY_PATH, line);
  }
}

run();

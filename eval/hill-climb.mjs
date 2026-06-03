#!/usr/bin/env node
/**
 * Hill-climb reporter — show eval score trend over time.
 * Run: node eval/hill-climb.mjs
 */
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const HISTORY_PATH = resolve(__dirname, "history.jsonl");

if (!existsSync(HISTORY_PATH)) {
  console.log("No history yet. Run: node eval/run.mjs");
  process.exit(0);
}

const history = readFileSync(HISTORY_PATH, "utf8")
  .trim()
  .split("\n")
  .filter(Boolean)
  .map(line => JSON.parse(line));

console.log("╔══════════════════════════════════════╗");
console.log("║       HILL CLIMB — eval trend        ║");
console.log("╚══════════════════════════════════════╝\n");

console.log("  #   Date                 Avg    Pass   Block  Δ");
console.log("  ─── ──────────────────── ────── ────── ────── ──────");

for (let i = 0; i < history.length; i++) {
  const h = history[i];
  const date = h.timestamp.slice(0, 19).replace("T", " ");
  const delta = i > 0 ? (parseFloat(h.avg) - parseFloat(history[i - 1].avg)).toFixed(1) : "—";
  const arrow = delta === "—" ? " " : delta > 0 ? "↑" : delta < 0 ? "↓" : "→";
  console.log(`  ${String(i + 1).padStart(3)}  ${date}  ${h.avg.padStart(5)}  ${String(h.passing).padStart(5)}  ${String(h.blocking).padStart(5)}  ${arrow}${delta}`);
}

// Per-block trend for worst performers
const last = history[history.length - 1];
const worst = last.results
  .filter(r => !r.empty && r.score < 9)
  .sort((a, b) => a.score - b.score)
  .slice(0, 5);

if (worst.length > 0) {
  console.log("\n── Worst performers ──");
  for (const w of worst) {
    const fails = Object.entries(w.checks).filter(([, v]) => !v).map(([k]) => k);
    console.log(`  ${w.name}: ${w.score}/10  ⚠ ${fails.join(", ")}`);
  }
}

console.log();

#!/usr/bin/env node
/**
 * visual-diff.mjs — Automated visual QA: compare browser output against Figma reference screenshots.
 *
 * Flow:
 *   1. Launch Playwright, screenshot each section from the running app
 *   2. Load matching Figma reference screenshot
 *   3. Send both to Claude vision API
 *   4. Get structured diff report (JSON)
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-... node code/visual-diff/visual-diff.mjs [section-name]
 *   node code/visual-diff/visual-diff.mjs --all
 *   node code/visual-diff/visual-diff.mjs kanban-board
 *
 * Requires: dev server running on localhost:3000
 */

import { readFileSync } from "fs";
import { writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { chromium } from "playwright";
import Anthropic from "@anthropic-ai/sdk";

const __dirname = dirname(fileURLToPath(import.meta.url));
const config = JSON.parse(readFileSync(resolve(__dirname, "diff-config.json"), "utf8"));
const REF_DIR = resolve(__dirname, "reference");
const OUT_DIR = resolve(__dirname, "output");

mkdirSync(OUT_DIR, { recursive: true });

const PROMPT = `You are a visual QA tool comparing a Figma design (reference) against a browser screenshot (actual).

Rules:
- Only report STRUCTURAL and VISUAL differences, not content/data differences (dates, names, numbers will differ)
- Ignore font rendering differences (anti-aliasing, sub-pixel)
- Focus on: spacing, alignment, sizing, colors, borders, shadows, layout direction, element presence/absence
- Be specific: "column heights are unequal — Done column is shorter" not "layout looks different"

Output valid JSON only, no markdown:
{
  "match_score": <0-100>,
  "issues": [
    {
      "element": "<what element>",
      "expected": "<what Figma shows>",
      "actual": "<what browser shows>",
      "severity": "high|medium|low",
      "fix_hint": "<one-line suggestion>"
    }
  ]
}

If the designs match well (score > 85), return empty issues array.`;

async function captureSection(browser, section) {
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${config.baseUrl}${section.route}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);

  const el = await page.$(section.selector);
  if (!el) {
    console.error(`  ✗ selector not found: ${section.selector}`);
    await page.close();
    return null;
  }

  const outPath = resolve(OUT_DIR, `${section.name}.png`);
  await el.screenshot({ path: outPath });
  await page.close();
  return outPath;
}

async function compareImages(client, refPath, actualPath, sectionName) {
  const refBase64 = readFileSync(refPath).toString("base64");
  const actualBase64 = readFileSync(actualPath).toString("base64");

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: `Section: ${sectionName}\n\nFigma reference (left) vs Browser output (right):\n\n${PROMPT}` },
          { type: "image", source: { type: "base64", media_type: "image/png", data: refBase64 } },
          { type: "image", source: { type: "base64", media_type: "image/png", data: actualBase64 } },
        ],
      },
    ],
  });

  const text = response.content[0].text;
  try {
    return JSON.parse(text);
  } catch {
    return { match_score: 0, issues: [{ element: "parse_error", expected: "JSON", actual: text, severity: "high", fix_hint: "Claude response was not valid JSON" }] };
  }
}

async function run() {
  const args = process.argv.slice(2);
  const runAll = args.includes("--all");
  const targetName = args.find((a) => !a.startsWith("--"));

  const sections = runAll
    ? config.sections
    : targetName
      ? config.sections.filter((s) => s.name === targetName)
      : config.sections;

  if (!sections.length) {
    console.error("No matching sections. Available:", config.sections.map((s) => s.name).join(", "));
    process.exit(1);
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("Set ANTHROPIC_API_KEY env var");
    process.exit(1);
  }

  const client = new Anthropic({ apiKey });

  console.log("Visual Diff — capturing browser screenshots...\n");
  const browser = await chromium.launch({ headless: true });

  const results = [];

  for (const section of sections) {
    process.stdout.write(`  ${section.name}: capturing...`);
    const actualPath = await captureSection(browser, section);
    if (!actualPath) {
      results.push({ section: section.name, match_score: 0, issues: [{ element: "capture", expected: "screenshot", actual: "selector not found", severity: "high", fix_hint: `Fix selector: ${section.selector}` }] });
      continue;
    }

    const refPath = resolve(REF_DIR, section.reference);
    process.stdout.write(" comparing...");
    const diff = await compareImages(client, refPath, actualPath, section.name);
    results.push({ section: section.name, ...diff });

    const icon = diff.match_score >= 85 ? "✓" : diff.match_score >= 60 ? "△" : "✗";
    console.log(` ${icon} score: ${diff.match_score}/100 (${diff.issues.length} issues)`);
  }

  await browser.close();

  // Write report
  const reportPath = resolve(OUT_DIR, "report.json");
  writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\nReport: ${reportPath}`);

  // Summary
  console.log("\n── Summary ──");
  for (const r of results) {
    const icon = r.match_score >= 85 ? "✓" : r.match_score >= 60 ? "△" : "✗";
    console.log(`  ${icon} ${r.section}: ${r.match_score}/100`);
    for (const issue of r.issues) {
      if (issue.severity === "high" || issue.severity === "medium") {
        console.log(`    → [${issue.severity}] ${issue.element}: ${issue.actual} (fix: ${issue.fix_hint})`);
      }
    }
  }

  const avg = Math.round(results.reduce((sum, r) => sum + r.match_score, 0) / results.length);
  console.log(`\n  Overall: ${avg}/100\n`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

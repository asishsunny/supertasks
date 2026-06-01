#!/usr/bin/env node
/**
 * screenshot-diff — compare Figma screenshot vs browser render
 *
 * Usage: node screenshot-diff.mjs --name <name> --figma <path.png> --url <gallery-url> [--threshold 0.1]
 *
 * Steps:
 *   1. Read Figma screenshot (already saved by Claude via MCP)
 *   2. Capture browser screenshot via Playwright
 *   3. Pixel diff with pixelmatch
 *   4. Output diff image + mismatch percentage
 */

import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");

const args = process.argv.slice(2);
function getArg(flag) {
  const idx = args.indexOf(flag);
  return idx !== -1 ? args[idx + 1] : null;
}

const name = getArg("--name") || "block";
const figmaPath = getArg("--figma");
const url = getArg("--url") || `http://localhost:3000/gallery/sections/${name}`;
const threshold = parseFloat(getArg("--threshold") || "0.1");

if (!figmaPath) {
  console.log("Usage: node screenshot-diff.mjs --name <name> --figma <figma.png> [--url <url>] [--threshold 0.1]");
  process.exit(1);
}

const outputDir = resolve(ROOT, "artifacts/diffs");

async function run() {
  // 1. Read Figma screenshot
  const figmaImg = PNG.sync.read(readFileSync(resolve(ROOT, figmaPath)));
  console.log(`✓ Figma: ${figmaImg.width}×${figmaImg.height}`);

  // 2. Capture browser screenshot
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: figmaImg.width + 300, height: figmaImg.height + 200 });
  await page.goto(url, { waitUntil: "networkidle" });

  // Find the main content area (skip sidebar/topbar)
  const content = await page.locator("main").first();
  const browserPath = resolve(outputDir, `${name}-browser.png`);
  await content.screenshot({ path: browserPath });
  await browser.close();

  const browserImg = PNG.sync.read(readFileSync(browserPath));
  console.log(`✓ Browser: ${browserImg.width}×${browserImg.height}`);

  // 3. Resize to match (use smaller dimensions)
  const w = Math.min(figmaImg.width, browserImg.width);
  const h = Math.min(figmaImg.height, browserImg.height);

  // Crop both to same size
  function crop(img, tw, th) {
    const out = new PNG({ width: tw, height: th });
    for (let y = 0; y < th; y++) {
      for (let x = 0; x < tw; x++) {
        const srcIdx = (y * img.width + x) * 4;
        const dstIdx = (y * tw + x) * 4;
        out.data[dstIdx] = img.data[srcIdx];
        out.data[dstIdx + 1] = img.data[srcIdx + 1];
        out.data[dstIdx + 2] = img.data[srcIdx + 2];
        out.data[dstIdx + 3] = img.data[srcIdx + 3];
      }
    }
    return out;
  }

  const figmaCropped = crop(figmaImg, w, h);
  const browserCropped = crop(browserImg, w, h);

  // 4. Diff
  const diff = new PNG({ width: w, height: h });
  const mismatchedPixels = pixelmatch(
    figmaCropped.data, browserCropped.data, diff.data,
    w, h,
    { threshold }
  );

  const totalPixels = w * h;
  const mismatchPct = ((mismatchedPixels / totalPixels) * 100).toFixed(2);

  // Save outputs
  const { mkdirSync } = await import("fs");
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(resolve(outputDir, `${name}-figma.png`), PNG.sync.write(figmaCropped));
  writeFileSync(resolve(outputDir, `${name}-diff.png`), PNG.sync.write(diff));

  console.log(`\n=== Diff: ${name} ===`);
  console.log(`  Figma:     ${w}×${h}`);
  console.log(`  Browser:   ${browserImg.width}×${browserImg.height}`);
  console.log(`  Mismatch:  ${mismatchedPixels} pixels (${mismatchPct}%)`);
  console.log(`  Diff:      artifacts/diffs/${name}-diff.png`);

  if (parseFloat(mismatchPct) > 5) {
    console.log(`  ❌ FAIL — mismatch above 5%`);
    process.exit(1);
  } else {
    console.log(`  ✓ PASS`);
  }
}

run().catch(e => { console.error(e); process.exit(1); });

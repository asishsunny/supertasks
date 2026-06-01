#!/bin/bash
set -e
cd "$(dirname "$0")/../.."

echo "╔════════════════════════════════════════╗"
echo "║  PIPELINE — Mechanical Steps           ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Step 0: Render gallery
echo "=== Step 0: Render Gallery ==="
node figma/scripts/build-gallery.mjs --render-all
echo ""

# Step 2: Transform + Templatize (skip step 1 — MCP fetch done by workflow)
echo "=== Step 2: Transform + Templatize ==="
node code/pipeline/run.mjs --force
echo ""

# Preflight
echo "=== Preflight ==="
node code/pipeline/preflight.mjs
echo ""

echo "╔════════════════════════════════════════╗"
echo "║  Mechanical steps done.                ║"
echo "║                                        ║"
echo "║  Now run Claude steps:                 ║"
echo "║  Workflow({ name: 'build-pipeline',    ║"
echo "║    args: { skipRender: true,           ║"
echo "║            skipFetch: false } })        ║"
echo "║                                        ║"
echo "║  Workflow does: fetch+split → build →  ║"
echo "║  gallery → verify → scorecard → diff   ║"
echo "╚════════════════════════════════════════╝"

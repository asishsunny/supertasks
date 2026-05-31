#!/bin/bash
set -e
cd "$(dirname "$0")/../.."

echo "╔══════════════════════════════════════╗"
echo "║  PIPELINE STEP 0: Render Gallery     ║"
echo "╚══════════════════════════════════════╝"
echo ""
echo "Rendering 18 snippet variations in Figma..."
node figma/scripts/build-gallery.mjs --render-all
echo ""
echo "Done. Now run from Claude:"
echo ""
echo "  Workflow({ name: 'build-pipeline' })"
echo ""
echo "Or skip fetch if cache is fresh:"
echo ""
echo "  Workflow({ name: 'build-pipeline', args: { skipFetch: true } })"
echo ""

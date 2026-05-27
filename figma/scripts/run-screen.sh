#!/usr/bin/env bash
set -euo pipefail

VIEW="${1:?Usage: run-screen.sh <view> [--page NAME] [--x N] [--y N] [dark]}"
shift
DARK="--dark"
BUILD_ARGS=()
while [[ $# -gt 0 ]]; do
  case "$1" in
    --page) BUILD_ARGS+=(--page "$2"); shift 2 ;;
    --x)    BUILD_ARGS+=(--x "$2"); shift 2 ;;
    --y)    BUILD_ARGS+=(--y "$2"); shift 2 ;;
    --light-only) DARK=""; shift ;;
    *)      shift ;;
  esac
done

SCRIPTS="$(dirname "$0")"
OUT="/tmp/${VIEW}-composed.js"
node "$SCRIPTS/build-screen.mjs" "$VIEW" ${BUILD_ARGS[@]+"${BUILD_ARGS[@]}"} ${DARK:+--dark} > "$OUT"
LINES=$(wc -l < "$OUT" | tr -d ' ')
echo "Composed → $OUT ($LINES lines)"

# Smoke test — catch syntax errors before hitting Figma
WRAP=$(mktemp /tmp/smoke-${VIEW}-XXXXXX.cjs)
echo "(async () => {" > "$WRAP"
cat "$OUT" >> "$WRAP"
echo "})();" >> "$WRAP"
if ! node --check "$WRAP" 2>/dev/null; then
  echo "SYNTAX ERROR in composed output:"
  node --check "$WRAP"
  rm "$WRAP"
  exit 1
fi
rm "$WRAP"

BRIDGE_PORT="${FIGMA_BRIDGE_PORT:-3333}"
if curl -s "http://127.0.0.1:$BRIDGE_PORT/health" | grep -q '"ok":true'; then
  echo "Executing via bridge..."
  node "$SCRIPTS/figma-run.mjs" "$OUT"
else
  echo "No bridge running. Start it: node figma/scripts/figma-bridge.mjs"
  echo "Or paste manually: figma_execute(code from $OUT)"
fi

#!/usr/bin/env bash
set -euo pipefail

DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$DIR/../.." && pwd)"
APP="$ROOT/app"

echo "=== gen-data-ts ==="
node "$DIR/gen-data-ts.mjs"

echo "=== typecheck ==="
cd "$APP" && npx tsc --noEmit

echo "=== next build ==="
cd "$APP" && npx next build

echo "=== done ==="

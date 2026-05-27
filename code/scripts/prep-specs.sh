#!/bin/bash
set -e
cd "$(dirname "$0")/../.."

RUN="node figma/scripts/figma-run.mjs"
ERRORS=()

# ── Step 1: Render all screens in Figma ──
echo "=== Step 1: Render all screens ==="
bash figma/scripts/render-all.sh
echo ""

# ── Step 2: Sync registry nodeIds ──
echo "=== Step 2: Sync registry ==="
node code/scripts/sync-registry.mjs
echo ""

# ── Step 3: Generate maps ──
echo "=== Step 3: Generate maps ==="
node code/scripts/generate-maps.mjs
echo ""

# ── Step 4: Fetch cache manifest ──
echo "=== Step 4: Fetch cache ==="
node code/scripts/cache.mjs
echo ""
echo "→ For each entry: fetch nodeId via Figma MCP, then:"
echo "   echo '<raw jsx>' | node code/scripts/cache.mjs <filename>"
echo ""

# ── Step 5: Screenshots ──
echo "=== Step 5: Screenshots ==="
mkdir -p screenshots

frame_name() {
  node -e "
const fs = require('fs');
const lines = fs.readFileSync('data/screens.yaml','utf8').split('\n');
let inBlock = false;
for (const line of lines) {
  if (line.startsWith(process.argv[1] + ':')) { inBlock = true; continue; }
  if (inBlock && /^\S/.test(line)) break;
  if (inBlock && line.includes('frame:')) { console.log(line.replace(/.*frame:\s*/, '').trim()); break; }
}
" "$1"
}

screenshot() {
  local name="$1"
  local file="$2"
  if ! echo "
await figma.loadAllPagesAsync();
const p = figma.root.children.find(p => p.name === 'Final render');
await figma.setCurrentPageAsync(p);
const node = p.findOne(n => n.name === '$name');
if (!node) return { error: 'not found: $name' };
const bytes = await node.exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: 1 } });
return { b64: figma.base64Encode(bytes) };
" | $RUN - -o /tmp/_shot.json 2>&1; then
    echo "  ✗ $name (bridge error)"
    ERRORS+=("Screenshot failed: $name")
    return
  fi
  node -e "
const fs = require('fs');
const raw = JSON.parse(fs.readFileSync('/tmp/_shot.json','utf8'));
const d = raw.result || raw;
if (d.b64) { fs.writeFileSync('$file', Buffer.from(d.b64,'base64')); console.error('  → $file (' + Buffer.from(d.b64,'base64').length + ' bytes)'); }
else { console.error('  ✗ $name not found'); process.exitCode = 1; }
" || ERRORS+=("Screenshot missing: $name")
}

SCREENS=(dashboard tasks_list tasks_kanban team reports settings settings_notifications settings_security settings_billing)
COMPS=(tasks_drawer tasks_modal_create team_invite reports_generate)
ALL_SCREENS=("${SCREENS[@]}" "${COMPS[@]}")
for s in "${ALL_SCREENS[@]}"; do
  fname=$(frame_name "$s")
  if [ -n "$fname" ]; then
    screenshot "$fname" "screenshots/${s}_light.png"
    screenshot "${fname} — Dark" "screenshots/${s}_dark.png"
  fi
done
echo ""

# ── Summary ──
echo "=== Done ==="
echo "  screenshots/ — $(ls screenshots/*.png 2>/dev/null | wc -l | tr -d ' ') files"
echo "  registry     — synced"

if [ ${#ERRORS[@]} -gt 0 ]; then
  echo ""
  echo "  ${#ERRORS[@]} warning(s):"
  for e in "${ERRORS[@]}"; do echo "  - $e"; done
fi

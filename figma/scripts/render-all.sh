#!/bin/bash
set -e
cd "$(dirname "$0")/../.."

RUN="node figma/scripts/figma-run.mjs"
BUILD="node figma/scripts/build-screen.mjs"
PAGE="Final render"

echo "=== Step 0: Clear page ==="
echo "
await figma.loadAllPagesAsync();
let targetPage = figma.root.children.find(p => p.name === '$PAGE');
if (targetPage) {
  await figma.setCurrentPageAsync(targetPage);
  for (const c of [...targetPage.children]) c.remove();
} else {
  targetPage = figma.createPage();
  targetPage.name = '$PAGE';
  await figma.setCurrentPageAsync(targetPage);
}
return { cleared: true };
" | $RUN -
echo ""

echo "=== Step 1: Standard screens (light + dark) ==="
SCREENS=(dashboard tasks_list tasks_kanban team reports settings settings_notifications settings_security settings_billing)
for s in "${SCREENS[@]}"; do
  echo "--- $s ---"
  $BUILD "$s" --dark > /tmp/_render.js
  cat /tmp/_render.js | $RUN -
  echo ""
done

echo "=== Step 2: Standalone modals ==="
# Set page first
echo "
await figma.loadAllPagesAsync();
const p = figma.root.children.find(p => p.name === '$PAGE');
await figma.setCurrentPageAsync(p);
return { page: p.name };
" | $RUN -

# Details drawer (unique snippet, not data-driven)
echo "--- modal-details ---"
$RUN figma/snippets/modal-details-snippet.js
echo ""

# Form modals (data-driven via build-screen)
MODALS=(_modal_create_task _modal_invite_member _modal_generate_report)
for s in "${MODALS[@]}"; do
  echo "--- $s ---"
  $BUILD "$s" > /tmp/_render.js
  cat /tmp/_render.js | $RUN -
  echo ""
done

echo "=== Step 3: Comp screens (light + dark) ==="
COMPS=(tasks_drawer tasks_modal_create team_invite reports_generate)
for s in "${COMPS[@]}"; do
  echo "--- $s ---"
  $BUILD "$s" --dark > /tmp/_render.js
  cat /tmp/_render.js | $RUN -
  echo ""
done

echo "=== Step 4: Clean up standalone modals ==="
echo "
await figma.loadAllPagesAsync();
const p = figma.root.children.find(p => p.name === '$PAGE');
const modals = ['Task Details Modal', 'Create Task Modal', 'Invite Team Member', 'Generate Report'];
let removed = 0;
for (const name of modals) {
  const node = p.children.find(n => n.name === name);
  if (node) { node.remove(); removed++; }
}
return { removed };
" | $RUN -

echo ""
echo "=== Done ==="

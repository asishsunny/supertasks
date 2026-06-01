export const meta = {
  name: 'build-pipeline',
  description: 'Full Figma-to-code pipeline: fetch → split → transform → templatize → build → scorecard',
  whenToUse: 'When user says "run build pipeline" or wants to rebuild all blocks from Figma end-to-end',
  phases: [
    { title: 'Render', detail: 'Render 18 snippet variations in Figma via bridge' },
    { title: 'Fetch+Split', detail: 'Fetch gallery wrapper from Figma MCP, split into 18 cache files' },
    { title: 'Transform+Templatize', detail: 'AST transform + noise strip + dedup' },
    { title: 'Build', detail: 'Claude adapts each templatized output into prop-based block' },
    { title: 'Gallery', detail: 'Generate gallery pages from block interfaces + wire data' },
    { title: 'Scorecard', detail: '14-rule quality check on all blocks' },
    { title: 'Diff', detail: 'Screenshot diff — browser vs Figma' },
  ],
}

const ROOT = '/Users/superdesigner/Projects/supertasks'

const rawArgs = typeof args === 'string' ? JSON.parse(args) : args
const config = rawArgs || {}
const skipFetch = config.skipFetch || false
const skipBuild = config.skipBuild || false
const wrapperNodeId = config.wrapperNodeId || '4553:47822'

const manifest = {
  fileKey: "D4Hav0rqH4Zql11h0YgcRv",
  snippets: [
    { name: "stat-cards", dest: "components/blocks/StatCards.tsx" },
    { name: "chart-cards", dest: "components/blocks/ChartCards.tsx" },
    { name: "controls", dest: "components/blocks/Controls.tsx" },
    { name: "recent-tasks", dest: "components/blocks/RecentTasks.tsx" },
    { name: "kanban-board", dest: "components/views/KanbanView.tsx", view: true, extra: "components/blocks/KanbanCard.tsx" },
    { name: "create-task-modal", dest: "components/blocks/CreateTaskModal.tsx" },
    { name: "task-details-modal", dest: "components/blocks/TaskDetailsModal.tsx" },
    { name: "settings-profile", dest: "components/blocks/SettingsProfile.tsx" },
    { name: "settings-notifications", dest: "components/blocks/SettingsNotifications.tsx" },
    { name: "settings-security", dest: "components/blocks/SettingsSecurity.tsx" },
    { name: "settings-billing", dest: "components/blocks/SettingsBilling.tsx" },
  ]
}

// ── Phase 0: Render Gallery in Figma ──
if (!config.skipRender) {
  phase('Render')
  log('Rendering 18 snippet variations in Figma via bridge')
  await agent(
    `Run this command and report the output:
cd ${ROOT} && node figma/scripts/build-gallery.mjs --render-all 2>&1
Report: how many rendered, wrapper frame ID.`,
    { label: 'render-gallery', phase: 'Render' }
  )
  log('Render complete')
}

// ── Phase 1: Fetch + Split ──
if (!skipFetch) {
  phase('Fetch+Split')
  log('Fetching gallery wrapper from Figma + splitting into cache files')

  const fetchResult = await agent(
    `Fetch the Snippet Gallery wrapper frame from Figma and split into individual cache files.

1. Use ToolSearch to load mcp__figma__get_design_context schema
2. Call mcp__figma__get_design_context with:
   - fileKey: "${manifest.fileKey}"
   - nodeId: "${wrapperNodeId}"
   - excludeScreenshot: true
   - clientFrameworks: "react"
   - clientLanguages: "typescript"
   - forceCode: true
3. The response will be saved to a file (too large for inline). Find the saved file path.
4. Run: node ${ROOT}/code/pipeline/steps/split-gallery-cache.mjs <saved-file-path>
5. Verify: ls ${ROOT}/artifacts/cache/*.jsx | wc -l (should be 18+)

Report: number of cache files written, total size.`,
    { label: 'fetch+split', phase: 'Fetch+Split' }
  )
  log('Fetch+Split complete')
}

// ── Preflight ──
log('Running preflight check...')
const preflight = await agent(
  `Run: cd ${ROOT} && node code/pipeline/preflight.mjs 2>&1
If it says "Preflight passed" report success. If it fails, report which blocks are missing.`,
  { label: 'preflight', phase: 'Fetch+Split' }
)

// ── Phase 2: Transform + Templatize ──
phase('Transform+Templatize')
log('Running AST transform + templatize on all cached snippets')

const mechResult = await agent(
  `Run this command and report the full output:
cd ${ROOT} && node code/pipeline/run.mjs --force 2>&1
Report the complete output.`,
  { label: 'transform+templatize', phase: 'Transform+Templatize' }
)
log('Transform+Templatize complete')

// ── Phase 3: Build ──
if (!skipBuild) {
  phase('Build')
  log(`Building ${manifest.snippets.length} blocks from templatized transforms`)

  const snippetList = manifest.snippets.map(s =>
    `- ${s.name}: read ${ROOT}/artifacts/transformed/${s.name}-templatized.tsx → write ${ROOT}/app/src/${s.dest}${s.extra ? ` + ${ROOT}/app/src/${s.extra}` : ''}`
  ).join('\n')

  const buildResult = await agent(
    `Build ALL of these blocks from templatized Figma output. One by one, sequentially.

STRICT: Build ONLY from files. No training knowledge, no memory.

BLOCKS TO BUILD:
${snippetList}

FOR EACH BLOCK:
1. Read its templatized source (artifacts/transformed/{name}-templatized.tsx)
2. Read ${ROOT}/code/pipeline/rules/build-checklist.json + wiring-rules.json
3. Read ${ROOT}/app/src/types/index.ts
4. Build the block following all rules
5. Write to the destination path
6. Move to the next block

RULES:
- Every class from templatized file, never invent
- data-repeat="N" → .map() with typed props
- PRESERVE conditional classes: if transform has text-ui-fg-error on ONE sibling but not others, that becomes a boolean prop (e.g. error?: boolean) applied conditionally in .map()
- Zero hardcoded strings — all text from props
- Never override variant/size from transform
- Fix TODOs: Avatar size="xsmall", Badge size="2xsmall"
- Blocks: no hooks, no store, no data imports
- Views: no state, accept wrapper props
- Export COLUMN_CLASSES from KanbanView

After ALL blocks written, run:
cd ${ROOT} && node code/pipeline/run.mjs --phase scorecard 2>&1

Report: scorecard output.`,
    { label: 'build-all', phase: 'Build' }
  )
  // TypeScript check after build
  log('Running TypeScript check...')
  const tscResult = await agent(
    `Run: cd ${ROOT}/app && npx tsc --noEmit 2>&1 | head -30
If zero errors, report "tsc clean". If errors, report which files + error messages.`,
    { label: 'tsc-check', phase: 'Build' }
  )
  log('Build + tsc complete')
}

// ── Phase 4: Gallery ──
phase('Gallery')
log('Generating gallery pages from block interfaces')

// Derive gallery structure from manifest
const typeToFolder = { view: 'views', card: 'cards', control: 'controls', overlay: 'overlays' }
const galleryGroups = {}
for (const [key, block] of Object.entries(manifest.blocks)) {
  const folder = typeToFolder[block.type]
  // Group settings-* under one page, others get own page
  const pagePath = block.figma === 'Settings Content'
    ? `${folder}/settings`
    : `${folder}/${key}`
  if (!galleryGroups[pagePath]) galleryGroups[pagePath] = []
  galleryGroups[pagePath].push(key)
}

const galleryList = Object.entries(galleryGroups).map(([path, blocks]) =>
  `- ${ROOT}/app/src/app/(app)/gallery/${path}/page.tsx — blocks: ${blocks.join(', ')}`
).join('\n')

const toPascal = n => n.replace(/(^|-)(\\w)/g, (_, __, c) => c.toUpperCase())
const blockFiles = Object.keys(manifest.blocks).map(key =>
  `${ROOT}/app/src/components/blocks/${toPascal(key)}.tsx`
).join('\n')

await agent(
  `Generate gallery pages by reading each block's ACTUAL exported interface. No guessing.

STEP 1 — Read every block file to learn exact prop names:
${blockFiles}

STEP 2 — Read data sources:
- ${ROOT}/app/src/lib/data.ts
- ${ROOT}/app/src/lib/constants.ts
- ${ROOT}/app/src/lib/utils.ts
- ${ROOT}/app/src/types/index.ts
- ${ROOT}/code/pipeline/manifest.json (for variations per block)

STEP 3 — For each gallery page, wire data to match the block's interface EXACTLY:
${galleryList}

CRITICAL RULES:
1. Every prop you pass MUST exist in the block's exported interface. Read the .tsx file. Use exact prop names.
2. Every data value MUST come from lib/data.ts, lib/constants.ts, or lib/utils.ts. NEVER invent labels, rename fields, or add data that doesn't exist in those files.
3. If you can't find a value in the source files, DON'T make one up — leave that variation out.

ALSO CREATE gallery layout with sidebar nav:
- Write ${ROOT}/app/src/app/(app)/gallery/layout.tsx
- Sidebar lists all gallery pages grouped by type (views, cards, controls, overlays)
- Each item links to its gallery page path
- Derive groups + links from manifest.json block types
- Use same styling as main app sidebar (text-ui-fg-subtle, active state, icons optional)
- Layout wraps {children} with the sidebar

ADDITIONAL RULES:
- "use client" on pages with hooks
- Import from @/components/blocks/{PascalCase}
- Show ALL variations per page (use manifest.blocks[key].variations)
- blocks/index.ts — re-export all blocks
- Add "Gallery" link to main app layout (${ROOT}/app/src/app/(app)/layout.tsx) in NAV_EXTENSIONS array, href="/gallery"

After writing, test:
for p in $(ls -d ${ROOT}/app/src/app/\\(app\\)/gallery/*/*/ 2>/dev/null | sed 's|.*/gallery/||' | sed 's|/page.tsx||' | sed 's|/$||'); do
  curl -s -o /dev/null -w "%{http_code} $p\\n" http://localhost:3000/gallery/$p
done

Report: pages written, which 200, which fail.`,
  { label: 'gallery', phase: 'Gallery' }
)
// Verify gallery data against source
log('Verifying gallery data against source files...')
await agent(
  `Verify every string literal in gallery pages exists in source data.

1. Read ${ROOT}/app/src/lib/data.ts — extract ALL string values (labels, names, titles, etc)
2. For each gallery page in ${ROOT}/app/src/app/(app)/gallery/**/page.tsx:
   - Find every hardcoded string (in quotes, not imports/classNames)
   - Check it exists in data.ts OR is a known UI string (section headers like "Dashboard variation")
   - Flag any string NOT traceable to source data
3. If ANY invented string found, delete it and replace with correct value from data.ts

Report: which strings passed, which were invented.`,
  { label: 'verify-data', phase: 'Gallery' }
)

// Verify all gallery pages render
log('Verifying gallery pages...')
const verifyResult = await agent(
  `Test every gallery page. Run:
cd ${ROOT}
find app/src/app/\\(app\\)/gallery -name "page.tsx" | while read f; do
  path=$(echo "$f" | sed 's|.*gallery/||' | sed 's|/page.tsx||')
  code=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/gallery/$path)
  echo "$code $path"
done

If any page returns non-200, read the page file AND the block it imports, find the prop mismatch, fix it, re-test. Repeat until all 200.

Report: all pages and their status codes.`,
  { label: 'verify-gallery', phase: 'Gallery' }
)
log('Gallery complete')

// ── Phase 5: Scorecard ──
phase('Scorecard')
log('Running 14-rule quality scorecard')

const scoreResult = await agent(
  `Run this command and report the full output:
cd ${ROOT} && node code/pipeline/run.mjs --phase scorecard 2>&1
Report the complete scorecard output including per-block scores and summary.`,
  { label: 'scorecard', phase: 'Scorecard' }
)

// ── Phase 6: Screenshot Diff ──
phase('Diff')
log('Running screenshot diff — browser vs Figma')

const diffResult = await agent(
  `Run screenshot diff to compare browser renders against Figma screenshots.

cd ${ROOT} && node code/pipeline/run.mjs --phase diff 2>&1

If screenshot-diff requires Figma screenshots in artifacts/diffs/, check they exist first:
ls ${ROOT}/artifacts/diffs/*-figma.png 2>/dev/null | wc -l

Report: per-block mismatch percentages, any failures.`,
  { label: 'screenshot-diff', phase: 'Diff' }
)

log('Pipeline complete')

return { blocks: Object.keys(manifest.blocks).length, scorecard: scoreResult, diff: diffResult }

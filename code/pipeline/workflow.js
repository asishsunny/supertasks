export const meta = {
  name: 'build-pipeline',
  description: 'Full Figma-to-code pipeline: fetch → split → transform → templatize → build → scorecard',
  whenToUse: 'When user says "run build pipeline" or wants to rebuild all blocks from Figma end-to-end',
  phases: [
    { title: 'Prep', detail: 'Render + fetch + split + preflight + transform + templatize' },
    { title: 'Build', detail: 'Build all blocks + tsc + scorecard' },
    { title: 'Gallery', detail: 'Generate pages + layout + verify data + verify 200' },
    { title: 'QA', detail: 'Final scorecard + screenshot diff' },
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
    { name: "stat-cards", dest: "components/blocks/StatCards.tsx", type: "card", variations: ["dashboard", "reports"] },
    { name: "chart-cards", dest: "components/blocks/ChartCards.tsx", type: "card" },
    { name: "controls", dest: "components/blocks/Controls.tsx", type: "control", variations: ["tasks", "reports"] },
    { name: "recent-tasks", dest: "components/blocks/RecentTasks.tsx", type: "view" },
    { name: "kanban-board", dest: "components/blocks/KanbanBoard.tsx", type: "view" },
    { name: "create-task-modal", dest: "components/blocks/CreateTaskModal.tsx", type: "overlay", variations: ["create-task", "invite-member", "generate-report"] },
    { name: "task-details-modal", dest: "components/blocks/TaskDetailsModal.tsx", type: "overlay" },
    { name: "settings-profile", dest: "components/blocks/SettingsProfile.tsx", type: "view", group: "settings" },
    { name: "settings-notifications", dest: "components/blocks/SettingsNotifications.tsx", type: "view", group: "settings" },
    { name: "settings-security", dest: "components/blocks/SettingsSecurity.tsx", type: "view", group: "settings" },
    { name: "settings-billing", dest: "components/blocks/SettingsBilling.tsx", type: "view", group: "settings" },
  ]
}

// ── Phase 0+1+2: Render + Fetch + Transform (one agent, all mechanical) ──
phase('Prep')
log('Running mechanical steps: render + fetch + split + preflight + transform + templatize')

await agent(
  `Run ALL mechanical pipeline steps in sequence. No thinking — just execute commands.

${config.skipRender ? '# SKIP render' : `1. cd ${ROOT} && node figma/scripts/build-gallery.mjs --render-all 2>&1`}

${skipFetch ? '# SKIP fetch+split' : `2. Fetch gallery wrapper from Figma:
   - Use ToolSearch to load mcp__figma__get_design_context
   - Call: fileKey="${manifest.fileKey}", nodeId="${wrapperNodeId}", excludeScreenshot=true, clientFrameworks="react", clientLanguages="typescript", forceCode=true
   - Response saved to file. Run: node ${ROOT}/code/pipeline/steps/split-gallery-cache.mjs <file-path>`}

3. cd ${ROOT} && node code/pipeline/preflight.mjs 2>&1
4. cd ${ROOT} && node code/pipeline/run.mjs --force 2>&1

Report: render count, cache count, preflight status, transform results.`,
  { label: 'mechanical', phase: 'Prep' }
)
log('Mechanical steps complete')

// ── Phase 3: Build ──
if (!skipBuild) {
  phase('Build')
  log(`Building ${manifest.snippets.length} blocks from templatized transforms`)

  const buildPrompt = (snippet) => `Build ONE block from templatized Figma output. ONLY from files, no memory.

READ:
1. ${ROOT}/artifacts/transformed/${snippet.name}-templatized.tsx — PRIMARY
2. ${ROOT}/code/pipeline/rules/build-checklist.json
3. ${ROOT}/app/src/types/index.ts

RULES:
- Every class from templatized file, never invent
- data-repeat → .map() with typed props
- PRESERVE conditional classes (e.g. text-ui-fg-error → boolean prop)
- Zero hardcoded strings
- Never override variant/size
- Fix TODOs: Avatar xsmall, Badge 2xsmall
- No hooks/store/data

WRITE to: ${ROOT}/app/src/${snippet.dest}
${snippet.extra ? `ALSO: ${ROOT}/app/src/${snippet.extra}` : ''}

Report: file written, line count.`

  const results = await parallel(
    manifest.snippets.map(snippet => () => agent(
      buildPrompt(snippet),
      { label: `build:${snippet.name}`, phase: 'Build' }
    ))
  )

  const built = results.filter(Boolean).length
  log(`Built ${built}/${manifest.snippets.length}`)

  // tsc + scorecard as one agent after all blocks written
  await agent(
    `Run both:
1. cd ${ROOT}/app && npx tsc --noEmit 2>&1 | head -30
2. cd ${ROOT} && node code/pipeline/run.mjs --phase scorecard 2>&1
Report results.`,
    { label: 'tsc+scorecard', phase: 'Build' }
  )
  log('Build + tsc + scorecard complete')
}

// ── Phase 4: Gallery ──
phase('Gallery')
log('Generating gallery pages from block interfaces')

// Derive gallery structure from manifest.snippets (has type + group)
const typeToFolder = { view: 'views', card: 'cards', control: 'controls', overlay: 'overlays' }
const galleryGroups = {}
for (const s of manifest.snippets) {
  const folder = typeToFolder[s.type]
  const pagePath = s.group ? `${folder}/${s.group}` : `${folder}/${s.name}`
  if (!galleryGroups[pagePath]) galleryGroups[pagePath] = []
  galleryGroups[pagePath].push(s.name)
}

const galleryList = Object.entries(galleryGroups).map(([path, blocks]) =>
  `- ${ROOT}/app/src/app/(app)/gallery/${path}/page.tsx — blocks: ${blocks.join(', ')}`
).join('\n')

const toPascal = n => n.replace(/(^|-)(\\w)/g, (_, __, c) => c.toUpperCase())
const blockFiles = manifest.snippets.map(s =>
  `${ROOT}/app/src/${s.dest}`
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

// ── Phase 5: Scorecard + Diff ──
phase('QA')
log('Running scorecard + screenshot diff')

const scoreResult = await agent(
  `Run both commands and report output:
1. cd ${ROOT} && node code/pipeline/run.mjs --phase scorecard 2>&1
2. cd ${ROOT} && node code/pipeline/run.mjs --phase diff 2>&1
Report: scorecard summary + diff results.`,
  { label: 'scorecard+diff', phase: 'QA' }
)

log('Pipeline complete')

return { blocks: Object.keys(manifest.blocks).length, scorecard: scoreResult }

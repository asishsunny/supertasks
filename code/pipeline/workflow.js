export const meta = {
  name: 'build',
  description: 'Figma → code: prep → build → gallery → QA',
  whenToUse: 'run build pipeline, rebuild blocks',
  phases: [
    { title: 'Prep', detail: 'Render + fetch + split + preflight + transform + templatize' },
    { title: 'Build', detail: '11 parallel agents build blocks + tsc' },
    { title: 'Gallery', detail: 'Layout + parallel page generation' },
    { title: 'QA', detail: 'Scorecard + screenshot diff' },
  ],
}

const ROOT = '/Users/superdesigner/Projects/supertasks'
const config = typeof args === 'string' ? JSON.parse(args) : (args || {})

const manifest = {
  fileKey: "D4Hav0rqH4Zql11h0YgcRv",
  wrapperNodeId: config.wrapperNodeId || '4571:136753',
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

const typeToFolder = { view: 'views', card: 'cards', control: 'controls', overlay: 'overlays' }
const galleryGroups = {}
for (const s of manifest.snippets) {
  const folder = typeToFolder[s.type]
  const pagePath = s.group ? `${folder}/${s.group}` : `${folder}/${s.name}`
  if (!galleryGroups[pagePath]) galleryGroups[pagePath] = []
  galleryGroups[pagePath].push(s)
}
const galleryEntries = Object.entries(galleryGroups)

// ── PREP ──
phase('Prep')
await agent(
  `Execute ALL in sequence, report results:
${config.skipRender ? '# skip render' : `1. cd ${ROOT} && node figma/scripts/build-gallery.mjs --render-all 2>&1 | tail -3`}
${config.skipFetch ? '# skip fetch' : `2. Fetch wrapper from Figma: ToolSearch mcp__figma__get_design_context, call with fileKey="${manifest.fileKey}" nodeId="${manifest.wrapperNodeId}" excludeScreenshot=true forceCode=true. Then: node ${ROOT}/code/pipeline/steps/split-gallery-cache.mjs <result-file>`}
3. cd ${ROOT} && node code/pipeline/preflight.mjs 2>&1
4. cd ${ROOT} && node code/pipeline/run.mjs --force 2>&1 | tail -20`,
  { label: 'prep', phase: 'Prep' }
)

// ── BUILD (parallel) ──
phase('Build')
log(`Building ${manifest.snippets.length} blocks`)

const buildResults = await parallel(
  manifest.snippets.map(s => () => agent(
    `Build ONE block. ONLY from files.
READ: ${ROOT}/artifacts/transformed/${s.name}-templatized.tsx + ${ROOT}/code/pipeline/rules/build-checklist.json + ${ROOT}/app/src/types/index.ts
RULES: classes from transform, data-repeat->.map(), PRESERVE conditional classes (error->boolean prop), zero hardcoded strings, never override variant/size, Avatar xsmall, Badge 2xsmall, no hooks/store/data.
WRITE: ${ROOT}/app/src/${s.dest}
Report: line count.`,
    { label: `build:${s.name}`, phase: 'Build' }
  ))
)
log(`Built ${buildResults.filter(Boolean).length}/${manifest.snippets.length}`)

await agent(`Run: cd ${ROOT}/app && npx tsc --noEmit 2>&1 | head -20. Report clean or errors.`,
  { label: 'tsc', phase: 'Build' })

// ── GALLERY (layout + parallel pages) ──
phase('Gallery')

await agent(
  `Create 3 files:
1. ${ROOT}/app/src/app/(app)/gallery/layout.tsx — sidebar linking to: ${galleryEntries.map(([p]) => `/gallery/${p}`).join(', ')}. Group by folder. "use client", usePathname. Same style as main sidebar.
2. ${ROOT}/app/src/components/blocks/index.ts — re-export all: ${manifest.snippets.map(s => s.name.replace(/(^|-)(\\w)/g, (_, __, c) => c.toUpperCase())).join(', ')}
3. Add "Gallery" href="/gallery" to NAV_EXTENSIONS in ${ROOT}/app/src/app/(app)/layout.tsx
Report: done.`,
  { label: 'layout', phase: 'Gallery' }
)

log(`${galleryEntries.length} pages in parallel`)
const pageResults = await parallel(
  galleryEntries.map(([path, snippets]) => () => agent(
    `ONE gallery page. Read block files, EXACT prop names only.
BLOCKS: ${snippets.map(s => `${ROOT}/app/src/${s.dest}`).join(', ')}
DATA: ${ROOT}/app/src/lib/data.ts, constants.ts, utils.ts
WRITE: ${ROOT}/app/src/app/(app)/gallery/${path}/page.tsx
NEVER invent data. Props from block interface only. Show variations labeled.
VERIFY: curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/gallery/${path}. Fix if non-200.
Report: status code.`,
    { label: `page:${path}`, phase: 'Gallery' }
  ))
)
log(`Pages: ${pageResults.filter(Boolean).length}/${galleryEntries.length}`)

// ── QA ──
phase('QA')
await agent(
  `Run: cd ${ROOT} && node code/pipeline/run.mjs --phase scorecard 2>&1. Report summary.`,
  { label: 'qa', phase: 'QA' }
)

log('Done')
return { blocks: manifest.snippets.length, pages: galleryEntries.length }

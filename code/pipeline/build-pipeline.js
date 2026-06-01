export const meta = {
  name: 'build',
  description: 'Figma → code: prep → build → QA',
  whenToUse: 'run build pipeline, rebuild blocks',
  phases: [
    { title: 'Prep', detail: 'Render + fetch + split + preflight + transform + templatize' },
    { title: 'Build', detail: '11 parallel agents build blocks + tsc' },
    { title: 'QA', detail: 'Scorecard' },
  ],
}

const ROOT = '/Users/superdesigner/Projects/supertasks'
const config = typeof args === 'string' ? JSON.parse(args) : (args || {})

const manifest = {
  fileKey: "D4Hav0rqH4Zql11h0YgcRv",
  wrapperNodeId: config.wrapperNodeId || '4571:136753',
  snippets: [
    { name: "stat-cards", dest: "components/blocks/StatCards.tsx" },
    { name: "chart-cards", dest: "components/blocks/ChartCards.tsx" },
    { name: "controls", dest: "components/blocks/Controls.tsx" },
    { name: "recent-tasks", dest: "components/blocks/RecentTasks.tsx" },
    { name: "kanban-board", dest: "components/blocks/KanbanBoard.tsx" },
    { name: "create-task-modal", dest: "components/blocks/CreateTaskModal.tsx" },
    { name: "task-details-modal", dest: "components/blocks/TaskDetailsModal.tsx" },
    { name: "settings-profile", dest: "components/blocks/SettingsProfile.tsx" },
    { name: "settings-notifications", dest: "components/blocks/SettingsNotifications.tsx" },
    { name: "settings-security", dest: "components/blocks/SettingsSecurity.tsx" },
    { name: "settings-billing", dest: "components/blocks/SettingsBilling.tsx" },
  ]
}

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
const blockPaths = manifest.snippets.map(s => `${ROOT}/app/src/${s.dest}`)
await agent(`Delete these files (rm -f): ${blockPaths.join(' ')}. Report count deleted.`, { label: 'wipe', phase: 'Build' })
log(`Building ${manifest.snippets.length} blocks`)

const buildResults = await parallel(
  manifest.snippets.map(s => {
    const outPath = `${ROOT}/app/src/${s.dest}`
    return () => agent(
      `Build ONE block from templatized Figma output. ONLY from files, never from memory.

INPUT: ${ROOT}/artifacts/transformed/${s.name}-templatized.tsx
REFS: ${ROOT}/code/pipeline/rules/build-checklist.json + ${ROOT}/app/src/types/index.ts

RULES:
- Every class from templatized file, never invent
- data-repeat → .map() with typed props
- PRESERVE conditional classes (e.g. text-ui-fg-error → boolean prop)
- Zero hardcoded strings — all user-visible text via props
- Never override variant/size from transform
- Fix TODOs: Avatar xsmall, Badge 2xsmall
- No hooks, no store, no data imports

OUTPUT FILE (exact path, do not change):
${outPath}

CRITICAL: ALWAYS write this file. Overwrite whatever exists — existing file is from a previous build and MUST be replaced. Do NOT skip because "it looks good enough." Your job is to write the file, period.

Do NOT read the existing block file. Do NOT compare to it. Read ONLY the templatized input, then write.

VERIFY after writing:
1. Run: wc -l ${outPath}
2. Run: head -3 ${outPath}
If file is empty or missing, you FAILED. Re-read the templatized input and try again.

Report: file path written + line count from wc.`,
      { label: `build:${s.name}`, phase: 'Build' }
    )
  })
)
log(`Built ${buildResults.filter(Boolean).length}/${manifest.snippets.length}`)

await agent(`Run: cd ${ROOT}/app && npx tsc --noEmit 2>&1 | head -20. Report clean or errors.`,
  { label: 'tsc', phase: 'Build' })

// ── QA ──
phase('QA')
await agent(
  `Run these in sequence, report results:
1. cd ${ROOT} && node code/pipeline/run.mjs --phase scorecard 2>&1
2. cd ${ROOT} && node code/pipeline/steps/generate-gallery.mjs 2>&1`,
  { label: 'qa', phase: 'QA' }
)

log('Done')
return { blocks: manifest.snippets.length }

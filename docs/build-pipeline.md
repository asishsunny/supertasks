# Build Pipeline

Figma → production React blocks in 6 steps.

## Steps

```
1. Cache        Figma MCP → artifacts/cache/{name}.jsx
2. Transform    AST: tokens + components → artifacts/transformed/{name}.tsx
3. Templatize   AST: noise strip + dedup → artifacts/transformed/{name}-templatized.tsx
4. Build        Claude: templatized → prop-based block → app/src/components/
5. Scorecard    12-rule quality check → artifacts/build-pipeline-scorecard.md
6. Diff         Browser vs Figma screenshot → artifacts/build-pipeline-diff-report.md
```

## What runs where

| Step | Runner | Script |
|------|--------|--------|
| Cache | Workflow (parallel agents) | `~/.claude/workflows/pipeline-x.js` |
| Transform | Node script | `code/scripts/transform.mjs` |
| Templatize | Node script | `code/scripts/templatize.mjs` |
| Build | Claude (subagent per block) | Agent prompt + checklist |
| Scorecard | Node script | `code/scripts/build-pipeline.mjs --phase scorecard` |
| Diff | Node script | `code/scripts/build-pipeline.mjs --phase diff` |

## Running

```bash
# Steps 2+3+5 (mechanical)
node code/scripts/build-pipeline.mjs

# Single snippet
node code/scripts/build-pipeline.mjs --snippet controls

# Force overwrite
node code/scripts/build-pipeline.mjs --force

# Individual steps
node code/scripts/build-pipeline.mjs --phase transform
node code/scripts/build-pipeline.mjs --phase templatize
node code/scripts/build-pipeline.mjs --phase scorecard
node code/scripts/build-pipeline.mjs --phase diff
```

## Build context (Step 4)

The build agent must read these files before writing any block:

| File | Purpose |
|------|---------|
| `artifacts/transformed/{name}-templatized.tsx` | Primary source — structure, classes, components |
| `docs/4-architecture.md` | Layer rules: block=dumb, view=layout, section=state |
| `app/src/types/index.ts` | Shared types: Task, Member, ModalField, etc |
| `app/src/lib/constants.ts` | PRIORITY_COLOR, STATUS_COLOR, BAR_COLORS, STATUS_LABEL |
| `app/src/lib/utils.ts` | formatDueDate, isOverdue, formatDate |
| `app/src/components/ColorAvatar.tsx` | Avatar component — Pick<Member> props, size variants |
| `code/rules/build-checklist.json` | 12 quality rules — must pass all |

The agent must NOT read `_backup/`, existing blocks, or gallery pages.

## Build rules (Step 4)

1. **Transform is source** — structure and classes come from templatized output, not memory
2. **Never override transform** — variant, size, props extracted from Figma are correct
3. **data-repeat → .map()** — repeated siblings become typed array props
4. **Hardcoded text → props** — zero user-visible strings in blocks
5. **Blocks are dumb** — no hooks, no store, no data imports
6. **Views are dumb** — no state, accept wrapper props for interactivity injection
7. **Sections own state** — dnd, filters, callbacks all live in sections
8. **Fix TODOs** — transform marks size corrections (xsmall, 2xsmall), apply them
9. **Verify visually** — 200 is not verification, check the browser

## Scorecard (Step 5)

12 checks, each scored pass/fail:

| Check | What |
|-------|------|
| DRY | No duplicated markup or types |
| SSOT | Types from @/types, constants from @/lib |
| Separation | Block=display, View=layout, Section=state |
| Dumb Blocks | No hooks, no store, no data imports |
| DS Tokens | txt-compact-*, shadow-elevation-*, bg-ui-* |
| Types | Exported interfaces, generics where reusable |
| No Noise | No pointless relative/shrink-0 from Figma |
| Responsive | overflow-x-auto, flex-wrap, min-w on narrow |
| A11y | role, aria-*, keyboard handlers on interactive |
| Data Driven | Zero hardcoded content strings in blocks |
| Transform Fidelity | Structure from transform, no invented markup |
| Verify Render | Visual check after every edit |

Pass: all green. Warn: a11y/responsive yellow. Block: separation/dumb-blocks fail.

## Manifest

`artifacts/pipeline-x.json` — lists all snippets with Figma node IDs:

```json
{
  "fileKey": "D4Hav0rqH4Zql11h0YgcRv",
  "snippets": [
    { "name": "stat-cards",         "nodeId": "4223:126282" },
    { "name": "chart-cards",        "nodeId": "4223:126295" },
    { "name": "controls",           "nodeId": "4229:9176" },
    { "name": "recent-tasks",       "nodeId": "4223:126439" },
    { "name": "kanban-board",       "nodeId": "4417:76386", "view": true },
    { "name": "create-task-modal",  "nodeId": "4223:127016" },
    { "name": "task-details-modal", "nodeId": "4225:131094" },
    { "name": "settings-profile",   "nodeId": "4223:127208" }
  ]
}
```

Snippets with `"view": true` output to `components/views/` instead of `components/blocks/`.

## Output locations

| Type | Path |
|------|------|
| Cache | `artifacts/cache/{name}.jsx` |
| Transform | `artifacts/transformed/{name}.tsx` |
| Templatized | `artifacts/transformed/{name}-templatized.tsx` |
| Blocks | `app/src/components/blocks/{PascalName}.tsx` |
| Views | `app/src/components/views/{PascalName}.tsx` |
| Gallery | `app/src/app/(app)/gallery/sections/{name}/page.tsx` |
| Scorecard | `artifacts/build-pipeline-scorecard.md` |
| Diff report | `artifacts/build-pipeline-diff-report.md` |

## Rules files

| File | Purpose |
|------|---------|
| `code/rules/transform-rules.json` | Component detection, noise config, token maps, imports |
| `code/rules/compose-rules.json` | Per-screen composition, iterators, data bindings |
| `code/rules/build-checklist.json` | 12-rule quality scorecard |

## Key lessons

- Transform reads Figma directly — trust it over visual guessing
- Templatize strips noise mechanically — don't strip noise by hand in build step
- Build step adapts structure, never rewrites it
- Figma DS "Primary" for IconButton = Medusa `variant="primary"` (standalone) or `"transparent"` (inline/modal)
- `segment-tab` is a Figma name, not a CSS class — build step must derive real styles from Figma cache
- Always diff against Figma before finalizing

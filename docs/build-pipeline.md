# Build Pipeline

How the app is built from Figma — blocks, sections, pages. Read this first in any new session.

## Project

SuperTasks — task management app. Product brief: `docs/brief.md`.
DS: Medusa UI (`@medusajs/ui` + `@medusajs/icons`).
Figma DS: `https://www.figma.com/design/6P0gLpgZPrpp7oHli10VmZ/SuperTasks-DS`
Figma UI: `https://www.figma.com/design/D4Hav0rqH4Zql11h0YgcRv/SuperTasks-UI`

## Setup

```bash
npm install          # root — pipeline scripts (babel, etc)
cd app && npm install # app — React + Next.js
```

All deps from architecture are installed:

| Concern | Package | Installed |
|---------|---------|-----------|
| DS | @medusajs/ui, @medusajs/icons | ✓ |
| State | zustand | ✓ |
| URL params | nuqs | ✓ |
| Tables | @tanstack/react-table | ✓ |
| Virtualization | @tanstack/react-virtual | ✓ |
| Drag-and-drop | @dnd-kit/core, @dnd-kit/sortable | ✓ |
| Forms | react-hook-form, zod | ✓ |
| Error boundaries | react-error-boundary | ✓ |
| Theme | next-themes | ✓ |

## Architecture (3 layers)

```
Page (shell — compose sections)
  └── Section (smart — state, store, callbacks, dnd)
        └── Blocks (dumb — props in, JSX out)
```

Blocks include everything dumb: views, controls, overlays, cards, cells, forms.
All in `components/blocks/`. Sections in `features/`.
Full doc: `docs/4-architecture.md`.

## What's built

### Blocks (pipeline output) — all in `app/src/components/blocks/`

| Block | Lines | Score | Type |
|-------|-------|-------|------|
| StatCards | 34 | 10/10 | card |
| ChartCards | 59 | 10/10 | card |
| ControlsBar | 86 | 10/10 | control |
| RecentTasks | 58 | 9/10 | view (table) |
| KanbanView | 71 | 9/10 | view (kanban) |
| KanbanCard | 66 | 9/10 | card |
| CreateTaskModal | 124 | 9/10 | overlay |
| TaskDetailsModal | 138 | 9/10 | overlay |
| SettingsProfile | 119 | 10/10 | form |

### Shared — `app/src/components/shared/`

| Component | Purpose |
|-----------|---------|
| ColorAvatar | Member avatar with DS tag colors |
| StatusDot | Colored status square |
| ViewBoundary | Error boundary for views |

### Cells — `app/src/components/blocks/` (or `cells/`)

AvatarCell, BadgeCell, StatusDotCell, DateCell, TextCell

### Gallery — `app/src/app/(app)/gallery/`

Dev gallery for isolated block testing. Each block has a gallery page that wires data + renders.

### Sections — `app/src/features/`

| Section | Status |
|---------|--------|
| TasksSection | exists (may need rebuild) |
| TeamSection | exists |
| ReportsSection | exists |
| DashboardSection | wired in page, not a standalone section |
| SettingsSection | needs rebuild |

### Pages — `app/src/app/(app)/`

Dashboard, Tasks, Team, Reports, Settings — all wired.

## Block Pipeline

```
0. Gallery      Render all snippet variations in Figma → Snippet Gallery page
1. Cache        Figma MCP → artifacts/cache/{name}.jsx
2. Transform    AST → artifacts/transformed/{name}.tsx
3. Templatize   AST noise strip + dedup → {name}-templatized.tsx
4. Build        Claude agent → app/src/components/blocks/
5. Scorecard    14-rule quality check
6. Diff         Browser vs Figma screenshot
```

Render gallery (step 0 — needs bridge running):
```bash
node figma/scripts/build-gallery.mjs --render-all
```

Run steps 2+3+5:
```bash
node code/pipeline/build-pipeline.mjs --force
```

Run full pipeline (workflow):
```
Workflow({ name: "build-pipeline", args: { skipCache: true } })
```

### Pipeline files — `code/pipeline/`

| File | Purpose |
|------|---------|
| build-pipeline.mjs | Main orchestrator (transform + templatize + scorecard) |
| `figma/scripts/build-gallery.mjs` | Snippet gallery renderer (all block variations via bridge) |
| transform.mjs | AST: tokens + component detection |
| templatize.mjs | AST: noise strip + dedup (data-repeat markers) |
| adapt.mjs | Verbatim wrapper (legacy step 1) |
| screenshot-diff.mjs | Browser vs Figma comparison |
| rules/build-checklist.json | 14-rule quality scorecard |
| rules/wiring-rules.json | Block→section prop contracts |
| rules/transform-rules.json | Component detection + token maps |
| rules/compose-rules.json | Per-screen composition rules |

### Key pipeline rules

- Transform is source — never override variant/size from transform
- Templatize strips noise — don't strip by hand
- Build step: agents build ONLY from files, never from memory
- Scorecard catches stale blocks (agent failed to write)
- `data-repeat="N"` → `.map()` with typed props
- Zero hardcoded user-visible strings in blocks

## Data

| File | Purpose |
|------|---------|
| data/data.yaml | All content — tasks, members, settings, modals |
| app/src/lib/data.ts | Auto-generated from data.yaml (`node code/scripts/gen-data-ts.mjs`) |
| app/src/types/index.ts | Task, Member, ModalField, etc |
| app/src/lib/constants.ts | PRIORITY_COLOR, STATUS_COLOR, BAR_COLORS, STATUS_LABEL |
| app/src/lib/utils.ts | formatDueDate, isOverdue, formatDate |
| app/src/app/(app)/store.tsx | useReducer + context (will migrate to Zustand) |

## Reference (Figma DS)

| File | Purpose |
|------|---------|
| reference/component-keys.json | DS component keys |
| reference/components/*.json | Component specs |
| reference/tokens.json | DS tokens |
| reference/text-styles.json | Text style mappings |

## Build order for a fresh screen

1. **Install deps** — `npm install` in root + app (all arch deps already in package.json)
2. **Create gallery pages** — one page per block in `app/(app)/gallery/`, wires data to block
3. **Run pipeline** — `Workflow({ name: "build-pipeline", args: { skipCache: true } })` builds all blocks
4. **Verify gallery** — check each block renders correctly in browser
5. **Build sections** — smart layer in `features/`, wires store + blocks
6. **Wire pages** — thin shells composing sections

## What's next (blocks)

1. **Screenshot-diff** — verify visual parity with Figma for all 9 blocks
2. **New blocks** — when new Figma sections are designed, add to manifest + run pipeline

## Next phase: Sections + Pages

Sections wire blocks to store. All context already exists on disk:

| File | What it gives |
|------|---------------|
| `plan.md` | Section composition per page — which snippets, controls, columns, overlays |
| `data/views.yaml` | Computed data per view — stats, chart breakdowns, table rows |
| `data/screens.yaml` | Snippet→page mapping — dashboard = shell + statcards + chartcards + table |
| `code/pipeline/rules/wiring-rules.json` | Block→section prop contracts, interactivity, dnd pattern |
| `docs/4-architecture.md` | 3-layer rules: page → section → blocks |

No new docs needed. Feed these to Claude → sections come out.

### Known gaps (from plan.md audit)

**Missing blocks — Snippet Gallery page exists, fetch and pipeline:**

Settings tab content blocks need fetching from Snippet Gallery:
- Profile: node `4553:47187` (already cached as settings-profile)
- Notifications: node `4553:47282`
- Security: node `4553:47352`  
- Billing: node `4553:47418`

Fetch each → cache → transform → templatize → build → display in `/gallery/views/settings`

**Previously documented:**

Create a "Snippet Gallery" page in Figma UI file that renders every block variation using existing snippets with different DATA configs. One page, all variations. Pipeline fetches individual nodes from here.

Variations needed:
- StatCards: dashboard stats + reports stats (2)
- ChartCards: priority + status (1 — already both in one)
- Controls: tasks config (Kanban/List + 3 filters) + reports config (90d/30d/7d + 1 filter) (2)
- Tables: dashboard (5 rows) + tasks (18 rows, paginated) + team (member columns) + reports (report columns) (4)
- Settings content: profile + notifications + security + billing (4 — run settings-snippet with different activeTab)
- Modals: create task + invite member + generate report (3)
- Task details: drawer view (1)
- Kanban: full board (1 — already exists)

Total: ~18 frames. Existing snippets handle all of them — just different DATA.

After gallery page exists:
1. Add node IDs to `artifacts/pipeline-x.json` manifest
2. Run pipeline → cache → transform → templatize → build
3. All block variations built automatically

**Missing interaction specs:**
- Which action button opens which modal (e.g. "New task" → CreateTaskModal)
- Drawer trigger (clicking a task row/card → TaskDetailsModal as drawer)
- Pagination spec (tasks table paginates after 10)

**Missing section wiring:**
- DashboardSection doesn't exist (blocks wired directly in page)
- SettingsSection doesn't exist
- Modal/drawer open/close state not wired in any section

## Dev server

```bash
cd app && npm run dev    # http://localhost:3000
```

Gallery: `http://localhost:3000/gallery/sections/stat-cards` (etc)

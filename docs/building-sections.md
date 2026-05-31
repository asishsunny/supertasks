# Building Sections & Pages

How sections and pages are built from blocks. Read after `build-pipeline.md`.

## Architecture

```
Page (shell — compose sections)
  └── Section (smart — state, store, callbacks, dnd)
        └── Blocks (dumb — props in, JSX out)
```

Pages are thin shells. Sections own all logic. Blocks just render.

## Pages → Sections → Blocks

From `plan.md` + `data/screens.yaml`:

| Page | Section | Blocks | Overlays |
|------|---------|--------|----------|
| Dashboard | DashboardSection | StatCards, ChartCards, RecentTasks | — |
| Tasks | TasksSection | ControlsBar, TableView OR KanbanView+KanbanCard | CreateTaskModal, TaskDetailsModal |
| Team | TeamSection | TableView | CreateTaskModal (invite variant) |
| Reports | ReportsSection | StatCards, ControlsBar, TableView | CreateTaskModal (generate variant) |
| Settings | SettingsSection | SettingsProfile, SettingsNotifications, SettingsSecurity, SettingsBilling | — |

## Section responsibilities

Each section:
1. Reads store (tasks, members, reports)
2. Reads URL params (filters, view mode, active tab)
3. Computes derived data (filtered, sorted, paged)
4. Composes blocks + wires props
5. Handles events → dispatches to store
6. Controls overlay open/close

## Interaction map

From `plan.md`:

| Page | Trigger | Action |
|------|---------|--------|
| Tasks | "New task" header button | Opens CreateTaskModal |
| Tasks | Click table row / kanban card | Opens TaskDetailsModal as drawer |
| Tasks | Segment tab (Kanban/List) | Switches view mode |
| Tasks | "Mark complete" in drawer | Moves task to done |
| Team | "Invite member" header button | Opens CreateTaskModal (invite config) |
| Reports | "Generate report" header button | Opens CreateTaskModal (generate config) |
| Settings | Sidebar tab click | Switches content block |

## Data flow per section

### DashboardSection
```
store.tasks → compute stats → StatCards(cards)
store.tasks → group by priority/status → ChartCards(charts)
store.tasks → sort by due, slice 5 → RecentTasks(columns, data)
```

### TasksSection
```
store.tasks + URL(view) → ControlsBar(views, activeView)
store.tasks + URL(filters) → filter + sort + paginate
  if list → TableView(columns, data)
  if kanban → KanbanView(columns, renderCard) + DndContext
store.tasks + URL(selectedTask) → TaskDetailsModal
store → dispatch(ADD_TASK) ← CreateTaskModal.onSubmit
store → dispatch(MOVE_TASK) ← KanbanView.onMove / drawer.markComplete
```

### TeamSection
```
store.members + store.tasks → compute active/overdue per member
  → TableView(columns, data)
store → dispatch(ADD_MEMBER) ← CreateTaskModal(invite).onSubmit
```

### ReportsSection
```
store.reports → compute stats → StatCards(cards)
store.reports + URL(range) → ControlsBar(views, activeView)
store.reports → TableView(columns, data)
store → dispatch(ADD_REPORT) ← CreateTaskModal(generate).onSubmit
```

### SettingsSection
```
URL(tab) or state(activeTab) → switch content block
  0 → SettingsProfile(user data)
  1 → SettingsNotifications(toggles)
  2 → SettingsSecurity(toggles)
  3 → SettingsBilling(plan, payment, history)
```

## Page shells

Pages are one-liners. From `docs/4-architecture.md`:

```tsx
// app/(app)/dashboard/page.tsx
export default function Page() { return <DashboardSection />; }
```

Each page imports ONE section. Shell layout (sidebar, topbar) handled by `app/(app)/layout.tsx`.

## Section file locations

From `docs/4-architecture.md`:

```
app/src/features/
  ├── dashboard/    DashboardSection
  ├── tasks/        TasksSection + columns + hooks
  ├── team/         TeamSection + columns
  ├── reports/      ReportsSection + columns
  └── settings/     SettingsSection
```

## Store

`app/src/app/(app)/store.tsx` — useReducer + context.

Actions:
- `ADD_TASK` — from CreateTaskModal
- `UPDATE_TASK` — from edit
- `DELETE_TASK` — from delete
- `MOVE_TASK` — from kanban drag or "Mark complete"
- `ADD_MEMBER` — from invite modal
- `ADD_REPORT` — from generate modal

## URL state

Via `nuqs`:
- `/tasks?view=kanban` — view mode
- `/tasks?status=in_progress` — filter
- `/tasks?task=5` — selected task (drawer)
- `/reports?range=30d` — date range
- `/settings?tab=billing` — active tab

## Context files

| File | What it gives |
|------|---------------|
| `plan.md` | Section composition — which blocks, controls, overlays per page |
| `data/views.yaml` | Computed data per view — stats, rows, columns |
| `data/screens.yaml` | Snippet→page mapping |
| `code/pipeline/rules/wiring-rules.json` | Block→section prop contracts |
| `docs/4-architecture.md` | Layer rules |
| `app/src/types/index.ts` | Task, Member, Report, ModalConfig types |
| `app/src/lib/data.ts` | INITIAL_TASKS, MEMBERS, MODAL_CONFIGS |
| `app/src/lib/constants.ts` | PRIORITY_COLOR, STATUS_COLOR, STATUS_LABEL |
| `app/src/lib/utils.ts` | formatDueDate, isOverdue |
| `app/src/app/(app)/store.tsx` | useStore, dispatch |

## Build order

1. **Store** — verify actions cover all interactions
2. **Sections** — one per page, gallery-test each
3. **Pages** — thin shells importing sections
4. **Interactivity** — modal open/close, dnd, filters, URL state

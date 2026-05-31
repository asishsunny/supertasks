# Architecture

Derived from benchmark findings in `3-benchmark.md`.

---

## Layers

```
Page (shell — compose sections)
  └── Section (smart)
        │  read + write state (store, URL, local)
        │  compose blocks, wire props
        │  dispatch actions back to store
        └── Blocks (dumb — render via props)
              ├── Controls    →  ControlsBar, Pagination
              ├── Views       →  TableView, KanbanView
              └── Overlays    →  FormModal, TaskDetailDrawer
```

**Store** is powered by Zustand — a single place where all app data lives (tasks, members, reports) along with UI state (which drawer is open, which modal, which view mode). It lives outside all sections so any section can reach it.

Sections read from the store, figure out what to show (filter, sort), and pass it down to blocks as props. Blocks just display. When a user clicks delete or drags a card, the section writes back to the store — and every section that reads from it updates automatically.

Store holds. Sections read + write. Blocks display. That's the loop.

Filters persisted to URL via nuqs — shareable links, survives refresh, back button works.

When Supabase arrives → domain data moves to React Query, Zustand keeps UI state only.

---

## Pages

One-line shells. Compose sections, nothing else.

| Page | Sections |
|------|----------|
| Dashboard | StatCards + ChartCards + RecentTasks |
| Tasks | TasksSection (list/kanban + drawer) |
| Team | TeamTable |
| Reports | ReportsStatCards + ReportsTable |
| Settings | SettingsSection (tabs) |

(Benchmark: Medusa Admin, Plane, Linear, Notion — all thin page shells.)

---

## Sections

The smart layer. Each section:
1. Reads from the store
2. Reads URL params (filters, view mode)
3. Computes what to show (filtered, sorted, paged)
4. Composes blocks + wires props down
5. Handles events → dispatches actions back to store

Tasks is ONE section with two render modes. Filters persist across both. Never separate list and kanban sections. (Benchmark: Plane → smart shell switches dumb views.)

---

## Blocks

Dumb. Props only. No store, no data imports, no state hooks.

**Controls** — segment tabs, filter buttons, search. Section owns active state and wires callbacks.

**Views** — render data layouts (table, kanban). Section passes data, view renders. dnd-kit lives in section, view accepts wrapper props for drag/drop injection.

**Cells** — shared render functions for table columns. Reusable across domains.

**Overlays** — modals, drawers. Section controls open/close and wires data.

**Error boundaries** — ViewBoundary wraps views, not sections. Controls/overlays survive if a view crashes.

---

## Tools

| Concern | Tool | Benchmark |
|---------|------|-----------|
| State (all) | Zustand | Consensus 2025. Shadcn, Cal.com pattern. |
| URL params | nuqs | Medusa Admin, Attio — shareable, bookmarkable. |
| Tables | TanStack Table + Medusa `Table.*` | Medusa Admin, Shadcn — headless + DS primitives. |
| Drag-and-drop | @dnd-kit | Plane, modern React standard. |
| Forms | react-hook-form + zod | Validation on modals. |
| Error boundaries | react-error-boundary | Medusa Admin — view-level isolation. |

---

## Project Structure

One domain → `features/`. Two+ domains → `components/`.

```
app/src/
├── store/               ← Zustand (global)
├── components/           ← shared blocks
│   ├── views/            TableView, KanbanView
│   ├── cells/            AvatarCell, BadgeCell, StatusDotCell, DateCell, TextCell
│   ├── controls/         ControlsBar, Pagination
│   ├── overlays/         FormModal, TaskDetailDrawer
│   └── shared/           ColorAvatar, StatusDot, ViewBoundary
├── features/             ← domain sections
│   ├── dashboard/        StatCards, ChartCards, RecentTasks
│   ├── tasks/            TasksSection, KanbanCard, columns, hooks
│   ├── team/             TeamTable, columns
│   ├── reports/          ReportsStatCards, ReportsTable, columns
│   └── settings/         SettingsSection + tab panels
├── app/(app)/            ← pages (shells) + gallery (dev)
├── lib/                  filters, hooks, constants, utils
└── types/
```

---

## Data Flow

```
data.yaml
  ├── Figma: snippets render static screens
  └── React: store → sections → blocks
```

---

## Build Pipeline

```
Figma MCP → artifacts/cache/*.jsx       (raw)
         → artifacts/transformed/*.tsx   (tokens resolved, components detected)
         → components/blocks/*.tsx       (adapted)
         → gallery                       (visual test)
         → pages                         (wire shells)
```

---

## Build Order

```
1. Cells     → AvatarCell, BadgeCell, StatusDotCell, DateCell, TextCell
2. Views     → TableView, KanbanView
3. Controls  → ControlsBar, Pagination
4. Overlays  → FormModal, TaskDetailDrawer
5. Sections  → per page, gallery first
6. Pages     → wire shells, delete gallery
```

---

## 🔵 Phase 2

| What | Trigger |
|------|---------|
| React Query | Supabase wired — domain data migrates from Zustand |
| Virtualization | TableView rows > hundreds |
| Optimistic rollback | Server can reject writes |

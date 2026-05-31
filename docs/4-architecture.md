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
```

Three layers. No more. Blocks include everything dumb: views, controls, overlays, cards, cells, forms.

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

Dumb. Props only. No store, no data imports, no state hooks. All live in `components/blocks/`.

Types of blocks:
- **Views** — layout renderers (KanbanView, TableView). Accept wrapper props for interactivity injection (dnd, selection).
- **Controls** — segment tabs, filter buttons, search. Section wires callbacks.
- **Overlays** — modals, drawers. Section controls open/close.
- **Cards** — display components (KanbanCard, StatCards, ChartCards).
- **Forms** — settings, profile editors.
- **Cells** — table column render functions (AvatarCell, BadgeCell, etc).

All follow the same rule: props in, JSX out. Section owns state, dnd, and event handling.

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
├── components/
│   ├── blocks/           ← all dumb blocks (views, controls, overlays, cards, cells, forms)
│   └── shared/           ColorAvatar, StatusDot, ViewBoundary
├── features/             ← domain sections
│   ├── dashboard/        DashboardSection
│   ├── tasks/            TasksSection, columns, hooks
│   ├── team/             TeamSection, columns
│   ├── reports/          ReportsSection, columns
│   └── settings/         SettingsSection
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
1. Blocks    → all dumb components (pipeline builds these)
2. Sections  → per page, gallery first
3. Pages     → wire shells
```

---

## 🔵 Phase 2

| What | Trigger |
|------|---------|
| React Query | Supabase wired — domain data migrates from Zustand |
| Virtualization | TableView rows > hundreds |
| Optimistic rollback | Server can reject writes |

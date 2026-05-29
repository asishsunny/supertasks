# Architecture

## The Story

In Figma, we built snippets — one table snippet renders every screen. Give it data, it paints. Tasks, team, reports. Same snippet, different data.

React works the same way. TableView, KanbanView, ControlsBar — give them data, they paint. They don't know what page they're on. Exactly like Figma snippets.

But Figma data is frozen. React data moves. Users filter, delete, drag. So we add one new layer: **sections**.

Each section owns three concerns and composes blocks:

- **Store** — what data to show, how to change it (Zustand)
- **State** — what's filtered, searched, or open
- **Logic** — what happens on click, what updates
- **Blocks** — dumb components it renders (controls, views, overlays)

```
Page (shell)
  └── Section (smart)
        ├── Store
        ├── State
        ├── Logic
        └── Blocks (dumb)
              ├── Controls    →  ControlsBar, Pagination
              ├── Views       →  TableView, KanbanView
              └── Overlays    →  FormModal, TaskDetailDrawer
```

Shared cells — wired into views as column properties:
AvatarCell, BadgeCell, StatusDotCell, DateCell, TextCell

Three layers: **Pages** (shells) → **Sections** (smart) → **Blocks** (dumb).
Blocks wrap Medusa UI primitives (Button, Badge, Avatar, Table) into app-level pieces.

One action, everything reacts:

```
Delete "Fix login bug"
  → Section calls deleteTask(8)
  → Zustand removes task
  → Every section re-renders:
      StatCards:    18 → 17
      ChartCards:   "Done" bar shrinks
      RecentTasks:  row disappears
```

One call. Zero wiring. Store updates, sections react, views repaint.

---

## Pages → Sections

**Benchmark:** Who owns the store — sections or pages?
**Insight:** Medusa Admin → sections own store. Detail pages compose from section components (`OrderGeneralSection`, `OrderPaymentSection`) — each self-contained.
**Decision:** Pages are one-line shells. Sections own all store access.

**Dashboard** — StatCards + ChartCards + RecentTasks
**Tasks** — TasksSection (controls + list/kanban toggle + drawer)
**Team** — TeamTable (member table + edit modal)
**Reports** — ReportsStatCards + ReportsTable
**Settings** — SettingsSection (tab nav + profile/notifications/security/billing)

---

## Sections

**Benchmark:** Do filters persist across list ↔ kanban?
**Insight:** Linear, Notion, Asana, Attio → all four persist. Layout mode is a display toggle, not a new context.
**Decision:** Tasks is ONE section with two render modes. Filters persist across both.

**Benchmark:** Where does filter state live?
**Insight:** Medusa Admin, Attio, Shadcn examples → URL search params. Shareable, bookmarkable, back button works.
**Decision:** Filter state in URL via nuqs (`useQueryState()`). Section still owns filters — just stored in URL instead of useState.

**Benchmark:** One big component or smart shell + dumb views?
**Insight:** Plane → smart shell (~50 lines) switches between dumb layout views. Cal.com → one file with conditionals, gets painful past 2 modes.
**Decision:** Smart shell + dumb views. Anti-pattern: conditional visibility in one file.

**Benchmark:** Where do error boundaries live?
**Insight:** Medusa Admin → error isolation at content level, chrome stays functional. View crashes, controls and overlays survive.
**Decision:** Error boundaries wrap views inside sections. Section owns boundary placement, blocks stay dumb. Controls and overlays remain functional if a view errors.

**Generic section pattern:**

```tsx
export default function RecentTasks() {
  const { tasks } = useStore();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => applyFilters(...), [deps]);
  const columns = useMemo(() => [...], [deps]);

  return (
    <>
      <ControlsBar ... />
      <TableView data={filtered} columns={columns} />
      <Pagination ... />
    </>
  );
}
```

**Multi-view section (Tasks):**

```tsx
export default function TasksSection() {
  const { tasks, moveTask } = useStore();
  const [view, setView] = useState('kanban');
  const [filters, setFilters] = useState({...});

  const filtered = useMemo(() => applyFilters(...), [deps]);

  return (
    <>
      <ControlsBar view={view} onView={setView} ... />
      <ErrorBoundary fallback={<ViewError />}>
        {view === 'kanban'
          ? <KanbanView data={filtered} ... />
          : <TableView data={filtered} columns={columns} ... />}
      </ErrorBoundary>
      <TaskDetailDrawer ... />
    </>
  );
}
```

Filters persist across list↔kanban. Column config changes per mode.

---

## Blocks

**Benchmark:** What does the table component own?
**Insight:** Checked TanStack Table, Shadcn DataTable, Medusa Admin, Plane:

| IN table | OUT (section composes) |
|----------|----------------------|
| `<table>` markup, headers, rows | Cell atoms (AvatarCell, BadgeCell) |
| Cell rendering via column defs | Pagination |
| Empty state | Row actions, card wrapper, sorting/filtering |

**Decision:** Thin table, max reuse. Cell renderers always consumer-defined via column config.

**Benchmark:** Are cells part of the table?
**Insight:** TanStack, Shadcn, Medusa, Plane → never. Cells live in shared folder. Table just calls `column.render()`.
**Decision:** Cells wired into views as column properties. Shared across domains.

Section imports cells, defines columns, passes to views:

```tsx
const columns = [
  { header: 'Assignee', render: (task) =>
    <AvatarCell name={member.name} color={member.color} /> },
  { header: 'Status', render: (task) =>
    <BadgeCell label={task.status} /> },
  { header: 'Due date', render: (task) =>
    <DateCell date={task.due} /> },
];
```

### Cells

| Cell | Props | Used in |
|------|-------|---------|
| `AvatarCell` | name, initial, color | Tasks, Team, Reports |
| `BadgeCell` | label, variant | Tasks (status, priority) |
| `StatusDotCell` | status, label | Tasks |
| `DateCell` | date | Tasks, Reports |
| `TextCell` | title, desc? | Tasks (title+desc) |

### Controls

| Control | What |
|---------|------|
| `ControlsBar` | Config-driven toolbar — tabs, search, filter, sort, date, columns |
| `Pagination` | Page controls — prev/next, "1-10 of 18" |
| `RowActionMenu` | Three-dot menu — passed as last column |

### Views

| View | What |
|------|------|
| `TableView` | TanStack Table — headers, rows, cells via column defs. Empty state. Virtualizes via @tanstack/react-virtual when rows exceed threshold. |
| `KanbanView` | dnd-kit — drag-drop status columns + card rendering. Virtualizes long columns. |

### Overlays

**Benchmark:** How do production apps handle modals?
**Insight:** Route-based (Medusa) — modals are child routes, best for deep linking. Store-based (Plane) — modal state in store, simpler.
**Decision:** Store-based. 3 modals + 1 drawer — route-based is overkill.

| Overlay | What |
|---------|------|
| `FormModal` | Data-driven create/edit modal |
| `TaskDetailDrawer` | Task detail + edit drawer |

### Accessibility

**Benchmark:** Is accessibility a polish concern or architectural?
**Insight:** Medusa Admin, Plane → ARIA and keyboard nav baked into components from start, not bolted on after. Medusa UI primitives (Table, Modal, Drawer, Button, DropdownMenu) ship with ARIA built in.
**Decision:** Architectural concern, not polish. Medusa UI handles most of it — we inherit by wrapping their primitives. Custom blocks need manual ARIA:

| Block | What to add |
|-------|-------------|
| KanbanView cards | `role="button"`, `tabIndex={0}`, `onKeyDown` (Enter/Space) |
| KanbanView drag | dnd-kit `KeyboardSensor` for keyboard drag-and-drop |
| ControlsBar tabs | Medusa `Tabs` — handled |
| RowActionMenu | Medusa `DropdownMenu` — handled |
| FormModal | Medusa `FocusModal` — focus trapping handled |
| TaskDetailDrawer | Medusa `Drawer` — focus trapping handled |

Small surface: ~20 lines of extra props across KanbanView only. Everything else inherits from Medusa UI.

---

## Tool Choices

**Benchmark:** What state management?
**Insight:**

| App | Server data | Client/UI state |
|-----|-------------|-----------------|
| Medusa Admin | React Query | URL params + React state |
| Plane | SWR + MobX | MobX observables |
| Linear | Custom sync engine + MobX | MobX observables |
| Shadcn examples | React Query | nuqs (URL) + Zustand |

Zustand is the most popular client state lib in React (47k+ stars, more weekly downloads than anything except Redux). Cal.com, Vercel dashboard, Clerk all use it. Plane and Linear use MobX for sync engine reasons — outliers, not the norm.

Consensus 2025: React Query for server data, Zustand for client state.
**Decision:** Zustand holds both for now. When Supabase arrives, entity data migrates to React Query. Zustand keeps UI state (filters, drawers, view mode).

**Benchmark:** What table library?
**Insight:** TanStack Table (headless) is universal. Medusa Admin wraps it in `useDataTable` hook. Shadcn composes with primitives. Column defs are data — maps 1:1 to our `views.yaml` column types. Medusa Admin uses tri-hook per entity: `useOrderTableColumns()`, `useOrderTableFilters()`, `useOrderTableQuery()`.
**Decision:** TanStack Table + Medusa `Table.*` primitives. Columns + hooks per domain in `features/`. No query hook (static data). Our v4.1.12 has no DataTable wrapper — build our own thin one.

**Benchmark:** What drag-and-drop?
**Insight:** @dnd-kit is standard. Hook-based, actively maintained, small bundle. react-beautiful-dnd abandoned, @hello-pangea/dnd is a fork with older API.
**Decision:** @dnd-kit for kanban drag-and-drop.

---

## Project Structure

**Benchmark:** Domain folders or flat?
**Insight:** Medusa Admin and Plane both domain-organize. Co-located columns, hooks, sections per entity. Shared components in top-level `components/`.
**Decision:** `features/` per domain. Rule: **one domain uses it → `features/domain/`. Two+ domains → `components/`.**

```
app/src/
├── store/
│   └── index.ts                  ← Zustand (tasks, members, reports)
│
├── components/                   ← shared across domains
│   ├── data-table/
│   │   └── DataTable.tsx         ← TanStack Table + Medusa Table wrapper
│   ├── cells/
│   │   ├── TitleCell.tsx
│   │   ├── UserCell.tsx
│   │   ├── BadgeCell.tsx
│   │   ├── SubtleCell.tsx
│   │   └── ActionsCell.tsx
│   ├── controls/
│   │   └── Controls.tsx
│   ├── modal/
│   │   └── FormModal.tsx
│   ├── drawer/
│   │   └── TaskDrawer.tsx        ← shared (dashboard + tasks)
│   └── shared/
│       ├── ColorAvatar.tsx
│       └── StatusDot.tsx
│
├── features/
│   ├── dashboard/
│   │   ├── StatCards.tsx
│   │   ├── ChartCards.tsx
│   │   ├── RecentTasks.tsx
│   │   ├── columns.tsx
│   │   └── hooks.ts
│   ├── tasks/
│   │   ├── TasksSection.tsx
│   │   ├── TasksKanban.tsx
│   │   ├── columns.tsx
│   │   └── hooks.ts
│   ├── team/
│   │   ├── TeamTable.tsx
│   │   ├── columns.tsx
│   │   └── hooks.ts
│   ├── reports/
│   │   ├── ReportsStatCards.tsx
│   │   ├── ReportsTable.tsx
│   │   ├── columns.tsx
│   │   └── hooks.ts
│   └── settings/
│       ├── SettingsSection.tsx
│       ├── ProfileTab.tsx
│       ├── NotificationsTab.tsx
│       ├── SecurityTab.tsx
│       └── BillingTab.tsx
│
├── app/(app)/                    ← Next.js pages (one-liner shells)
├── lib/
└── types/
```

Matches Medusa Admin: shared `components/table/`, `components/modals/` + domain `routes/orders/`, `routes/products/`.

---

## Data Flow

```
data.yaml (tasks, members, reports)
  ├── Figma: build-screen.mjs → snippets render static screens
  └── React: Zustand store → sections render dynamic app
```

Same data, two outputs. Change data.yaml → both update.

---

## Store (Zustand)

**Benchmark:** How do production apps handle mutations?
**Insight:** Linear, Plane → UI updates instantly before server confirms. On failure, roll back to previous state. Users never wait.
**Decision:** Optimistic updates baked into store. Zustand updates immediately, React Query `onMutate`/`onError` handles rollback when Supabase arrives. Sections call same methods either way.

```tsx
const useStore = create<Store>((set) => ({
  tasks: initialTasks,
  members: initialMembers,
  reports: initialReports,

  addTask:    (task) => set((s) => ({ tasks: [...s.tasks, task] })),
  updateTask: (task) => set((s) => ({ tasks: s.tasks.map(t => t.id === task.id ? task : t) })),
  deleteTask: (id)   => set((s) => ({ tasks: s.tasks.filter(t => t.id !== id) })),
  moveTask:   (id, status) => set((s) => ({
    tasks: s.tasks.map(t => t.id === id ? { ...t, status } : t)
  })),

  addMember:    (member) => set((s) => ({ members: [...s.members, member] })),
  updateMember: (member) => set((s) => ({ members: s.members.map(m => m.id === member.id ? member : m) })),
  deleteMember: (id)     => set((s) => ({ members: s.members.filter(m => m.id !== id) })),

  addReport:    (report) => set((s) => ({ reports: [...s.reports, report] })),
  deleteReport: (id)     => set((s) => ({ reports: s.reports.filter(r => r.id !== id) })),
}));
```

---

## Build Order

Dev gallery — temporary nav group below main pages. Build each piece, see it immediately, delete before ship.

```
Sidebar
  ├── Dashboard
  ├── Tasks
  ├── Team
  ├── Reports
  ├── ─────────
  ├── Views
  │     ├── Table
  │     └── Kanban
  ├── Controls
  │     ├── ControlsBar
  │     └── Pagination
  ├── Overlays
  │     ├── FormModal
  │     └── TaskDrawer
  └── Sections
        ├── StatCards
        ├── ChartCards
        ├── RecentTasks
        ├── TasksSection
        ├── TeamTable
        ├── ReportsStatCards
        ├── ReportsTable
        └── Settings
```

Build bottom-up — each component verifiable in isolation before composing:

```
1. Cells       — AvatarCell, BadgeCell, StatusDotCell, DateCell, TextCell
2. Views       — TableView (TanStack), KanbanView (dnd-kit)
3. Controls    — ControlsBar, Pagination, RowActionMenu
4. Overlays    — FormModal, TaskDetailDrawer
5. Sections    — StatCards, ChartCards, RecentTasks, TasksSection, TeamTable,
                 ReportsStatCards, ReportsTable, SettingsSection
6. Pages       — wire shells (one-liners), delete dev gallery
```

Each step: build → see in gallery → typecheck → commit.

---

## Dependencies

```bash
npm install @tanstack/react-table @tanstack/react-virtual zustand nuqs @dnd-kit/core @dnd-kit/sortable react-hook-form @hookform/resolvers zod
```

---

## Shared Lib

| File | Exports |
|------|---------|
| `filters.ts` | `applyTaskFilters`, `applyDateRange`, sort ranks |
| `select-options.ts` | `STATUS_OPTIONS`, `PRIORITY_OPTIONS`, `ROLE_OPTIONS` |
| `hooks.ts` | `useMemberLookup` (memoized Map) |

---

## Polish (after all sections work)

| # | What | Why |
|---|------|-----|
| 1 | Empty states | Blank table looks broken |
| 2 | Zero-division guards | NaN% in charts when no tasks |
| 3 | Loading states | Matters more after Supabase |

# Architecture

Benchmark findings that led to these decisions: `3-benchmark.md`

## The Story

In Figma, we built snippets — one table snippet renders every screen. Give it data, it paints. Tasks, team, reports. Same snippet, different data.

React works the same way. TableView, KanbanView, ControlsBar — give them data, they paint. They don't know what page they're on. Exactly like Figma snippets.

But Figma data is frozen. React data moves. Users filter, delete, drag. So we add one new layer: **sections**.

A section is the smart wrapper around dumb blocks. It knows what data to show, what's filtered, and what happens on click. The blocks just render.

```
Page (shell)
  └── Section (smart)
        ├── Store     — what data to show, how to change it
        ├── State     — what's filtered, searched, or open
        ├── Logic     — what happens on click, what updates
        └── Blocks (dumb)
              ├── Controls    →  ControlsBar, Pagination
              ├── Views       →  TableView, KanbanView
              └── Overlays    →  FormModal, TaskDetailDrawer
```

Three layers: **Pages** (shells) → **Sections** (smart) → **Blocks** (dumb).
Blocks wrap Medusa UI primitives (Button, Badge, Avatar, Table) into app-level pieces.

Shared cells — wired into views as column properties:
AvatarCell, BadgeCell, StatusDotCell, DateCell, TextCell

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

## Pages

Pages are empty shells. They import sections and render them — nothing else. No data fetching, no filtering, no logic.

Rule: pages are one-line shells. Sections own all store access.

Verify: open any page file. If it imports `useStore` or contains filtering logic, it's wrong.

**Dashboard** — StatCards + ChartCards + RecentTasks
**Tasks** — TasksSection (controls + list/kanban toggle + drawer)
**Team** — TeamTable (member table + edit modal)
**Reports** — ReportsStatCards + ReportsTable
**Settings** — SettingsSection (tab nav + profile/notifications/security/billing)

---

## Sections

### Filters persist across views

Rule: Tasks is ONE section with two render modes. Filters persist across both. Never create separate list and kanban sections.

Verify: apply a filter in list view, switch to kanban. If the filter disappears, it's broken.

### Filters live in the URL

Rule: filter state in URL via nuqs (`useQueryState()`). Section still owns filters — just stored in URL instead of useState.

Verify: apply a filter, check the URL. Copy it, open in new tab. Same filters should appear.

### Smart shell + dumb views

Rule: smart shell passes data down. Views are interchangeable. Anti-pattern: one file with `{showKanban && ...}` conditionals.

### Error boundaries wrap views

Rule: error boundaries wrap views inside sections via `ViewBoundary` (thin wrapper over `react-error-boundary`). Section owns boundary placement, blocks stay dumb. Controls and overlays remain functional if a view errors.

Verify: if a table throws, does the sidebar still work? Do the controls still render?

### Generic section pattern

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

### Multi-view section (Tasks)

```tsx
export default function TasksSection() {
  const { tasks, moveTask } = useStore();
  const [view, setView] = useState('kanban');
  const [filters, setFilters] = useState({...});

  const filtered = useMemo(() => applyFilters(...), [deps]);

  return (
    <>
      <ControlsBar view={view} onView={setView} ... />
      <ViewBoundary fallback={<ViewError />}>
        {view === 'kanban'
          ? <KanbanView data={filtered} ... />
          : <TableView data={filtered} columns={columns} ... />}
      </ViewBoundary>
      <TaskDetailDrawer ... />
    </>
  );
}
```

---

## Blocks

### Tables are thin

Rule: thin table, max reuse. Cell renderers are always consumer-defined via column config. Never put cell logic inside the table. Table handles markup, headers, rows, cell rendering via column defs, empty state. Everything else lives outside.

### Cells are shared, not owned

Rule: cells wired into views as column properties. Shared across domains.

Verify: check if any cell component imports from a specific feature folder. If it does, move it to shared.

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

Rule: both views render plain now. Scale handling splits by view — they're separate, so they don't share a strategy:

- **TableView** → virtualizes (`@tanstack/react-virtual`, threshold-gated). 🔵 **Phase 2**. Additive, slots into the render path with zero restructure. No drag, so no conflict.
- **KanbanView** → does **not** virtualize. Virtual + dnd-kit fight (drag targets off-screen, collision math breaks on mount/unmount). Instead, cap per column — "show N, load more" — if a column ever gets huge. Linear/Plane do this. 🔵 **Phase 2**, only if needed.

Don't build either for 18 rows.

Verify (Phase 2): add 500 dummy tasks. Does table scroll stay smooth? If it stutters, virtualization isn't wired.

| View | What |
|------|------|
| `TableView` | TanStack Table — headers, rows, cells via column defs. Empty state. _(Virtualizes — Phase 2.)_ |
| `KanbanView` | dnd-kit — drag-drop status columns + card rendering. _(No virtual — paginate per column if huge, Phase 2.)_ |

### Overlays

Rule: store-based overlays. Section controls open/close state.

| Overlay | What |
|---------|------|
| `FormModal` | Data-driven create/edit modal |
| `TaskDetailDrawer` | Task detail + edit drawer |

### Accessibility

Rule: wrap Medusa primitives, don't rebuild them. Only add manual ARIA where Medusa doesn't cover it. Medusa UI primitives (Table, Modal, Drawer, Button, DropdownMenu) ship with ARIA built in.

Verify: tab through the app with keyboard only. Can you reach every interactive element? Can you drag kanban cards without a mouse?

| Block | What to add |
|-------|-------------|
| KanbanView cards | `role="button"`, `tabIndex={0}`, `onKeyDown` (Enter/Space) |
| KanbanView drag | dnd-kit `KeyboardSensor` for keyboard drag-and-drop |
| ControlsBar tabs | Medusa `Tabs` — handled |
| RowActionMenu | Medusa `DropdownMenu` — handled |
| FormModal | Medusa `FocusModal` — focus trapping handled |
| TaskDetailDrawer | Medusa `Drawer` — focus trapping handled |

---

## Tools

| Concern | Tool | Rule |
|---------|------|------|
| Client state | Zustand | One store, one import. Never useState for shared state. |
| Server data | React Query | 🔵 **Phase 2.** Entity data migrates from Zustand. Zustand keeps UI state only. Build the UI-vs-entity boundary now so this drops in clean. |
| Tables | TanStack Table + Medusa `Table.*` | Columns defined per domain in `features/`. Never build custom table. |
| Drag-and-drop | @dnd-kit | Kanban only. No other DnD library. |
| Filter state | nuqs | URL params via `useQueryState()`. |
| Forms | react-hook-form + zod | Validation on modals. |
| Virtualization | @tanstack/react-virtual | 🔵 **Phase 2.** TableView only, when rows exceed threshold. KanbanView paginates per column instead (virtual + dnd conflict). Inert at demo scale. |

Verify (state): search for `useState` in sections. If it holds data that another section also needs, it should be in the store.

---

## Project Structure

Rule: **one domain uses it → `features/domain/`. Two+ domains → `components/`.**

Verify: check any component in `components/`. Is it actually used by multiple features? If not, move it to the feature that uses it.

```
app/src/
├── store/
│   └── index.ts                  ← Zustand (tasks, members, reports)
│
├── components/                   ← shared across domains
│   ├── views/
│   │   ├── TableView.tsx         ← TanStack Table + Medusa Table wrapper
│   │   └── KanbanView.tsx        ← dnd-kit drag-drop columns
│   ├── cells/
│   │   ├── AvatarCell.tsx
│   │   ├── BadgeCell.tsx
│   │   ├── StatusDotCell.tsx
│   │   ├── DateCell.tsx
│   │   └── TextCell.tsx
│   ├── controls/
│   │   ├── ControlsBar.tsx
│   │   ├── Pagination.tsx
│   │   └── RowActionMenu.tsx     ← three-dot menu, passed as last column
│   ├── overlays/
│   │   ├── FormModal.tsx
│   │   └── TaskDetailDrawer.tsx  ← shared (dashboard + tasks)
│   └── shared/
│       ├── ColorAvatar.tsx       ← primitive; AvatarCell wraps it
│       ├── StatusDot.tsx         ← primitive; StatusDotCell wraps it
│       └── ViewBoundary.tsx      ← react-error-boundary wrapper for views
│
├── features/
│   ├── dashboard/
│   │   ├── StatCards.tsx
│   │   ├── ChartCards.tsx
│   │   ├── RecentTasks.tsx
│   │   ├── columns.tsx
│   │   └── hooks.ts
│   ├── tasks/
│   │   ├── TasksSection.tsx       ← smart shell, switches TableView/KanbanView
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

Rule: Zustand updates immediately — synchronous, so the UI already feels instant with no rollback machinery needed. Optimistic-update rollback (`onMutate`/`onError`) is 🔵 **Phase 2**: nothing to roll back until a server can reject a write. Sections call the same methods either way, so the rollback wiring drops into the store later without touching them.

Verify: delete a task. Does the table update instantly? Do stat cards update too? If anything lags or waits for a spinner, the store isn't wired right.

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

Build bottom-up. Each piece is verifiable in isolation before composing. Dev gallery — temporary nav group below main pages. Delete before ship.

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
npm install @tanstack/react-table @tanstack/react-virtual zustand nuqs @dnd-kit/core @dnd-kit/sortable react-hook-form @hookform/resolvers zod react-error-boundary
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

---

## 🔵 Phase 2

Deferred on purpose. Each is **additive** — the structure built now (layering, thin views, UI-vs-entity store split) already leaves room, so these drop in later with zero rebuild. Building them at demo scale buys nothing.

| What | Trigger | Why deferred |
|------|---------|--------------|
| Virtualization (`@tanstack/react-virtual`) | TableView rows cross ~hundreds | TableView only — no drag, clean slot-in. KanbanView never virtualizes (virtual + dnd fight); paginate per column if a column gets huge. |
| React Query (server data) | Supabase wired up | No server to fetch from yet. Sections call same store methods; RQ replaces the data source underneath. |
| Optimistic rollback (`onMutate`/`onError`) | A server that can reject writes | Zustand is synchronous — UI already instant, nothing to roll back without a backend. |

Build now: keep the **boundaries** that make these droppable-in (thin views, store UI/entity split). Skip the **machinery**.

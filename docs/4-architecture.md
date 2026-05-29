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

Rule: error boundaries wrap views inside sections. Section owns boundary placement, blocks stay dumb. Controls and overlays remain functional if a view errors.

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

Rule: TableView and KanbanView virtualize via @tanstack/react-virtual when row count exceeds threshold. 18 rows renders normally, scales to thousands.

Verify: add 500 dummy tasks. Does scroll stay smooth? If it stutters, virtualization isn't wired.

| View | What |
|------|------|
| `TableView` | TanStack Table — headers, rows, cells via column defs. Empty state. Virtualizes when rows exceed threshold. |
| `KanbanView` | dnd-kit — drag-drop status columns + card rendering. Virtualizes long columns. |

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
| Server data (post-Supabase) | React Query | Entity data migrates from Zustand. Zustand keeps UI state only. |
| Tables | TanStack Table + Medusa `Table.*` | Columns defined per domain in `features/`. Never build custom table. |
| Drag-and-drop | @dnd-kit | Kanban only. No other DnD library. |
| Filter state | nuqs | URL params via `useQueryState()`. |
| Forms | react-hook-form + zod | Validation on modals. |
| Virtualization | @tanstack/react-virtual | TableView and KanbanView when rows exceed threshold. |

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

Rule: optimistic updates baked into store. Zustand updates immediately. When Supabase arrives, React Query `onMutate`/`onError` handles rollback. Sections call the same methods either way.

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

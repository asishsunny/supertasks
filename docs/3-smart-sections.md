# Video 3 — Smart Sections

## Pipeline: Figma → Raw JSX → Transform → Claude Stitching → Interactive Section

```
Figma (MCP)  →  Raw JSX  →  Transform  →  Cleaned TSX  →  Claude stitches  →  Smart Section
                                                              ↑                     ↑
                                                         data.yaml            store + hooks
                                                         constants            filters, drawer
                                                         DS components        TableCard wrapper
```

---

## Step 0: Benchmark Before Building

Before writing any section code, study how production apps solve the same problems. We benchmarked against Medusa Admin — that's where the smart sections pattern came from.

**What to benchmark:**
- How do they structure sections vs pages? (smart sections, thin pages)
- How do they handle tables? (shared wrapper vs inline)
- How do they wire filters/search/sort? (controls bar pattern)
- How do they handle forms? (react-hook-form + Zod)
- How do they manage state? (context + reducer)

**What we learned from Medusa Admin:**
- Sections own store access, not pages
- Pages are one-line composition shells
- Generic table component eliminates boilerplate
- Config-driven toolbar serves multiple pages
- Single source for options (status, priority, roles)
- Memoized lookup hooks replace repeated `.find()` calls

**When to benchmark:** After visual design is locked (Figma done, transform done), before writing section code. Architecture decisions should come from real apps, not guesswork.

**Which app to benchmark:** We looked at Medusa Admin, Cal.com, and Shadcn/Taxonomy. Medusa was the strongest match — same stack (React + Tailwind + DS), same pattern (admin panel with tables/filters/CRUD). Cal.com is a scheduling app with different UI patterns. Shadcn/Taxonomy is a thin demo, not production admin. Benchmark one real app deeply over skimming three.

Save findings to `reference/benchmark.md`.

---

## Step 1: Install Dependencies

```bash
cd app
npm install react-hook-form @hookform/resolvers zod @hello-pangea/dnd --legacy-peer-deps
```

| Package | Why |
|---------|-----|
| `react-hook-form` | Form state + validation (modals, settings, drawer) |
| `@hookform/resolvers` | Zod integration for react-hook-form |
| `zod` | Schema validation |
| `@hello-pangea/dnd` | Kanban drag-and-drop |

---

## Step 2: Update Store

Add actions for full CRUD across all entities:

```tsx
type Action =
  | { type: "ADD_TASK"; task: Task }
  | { type: "UPDATE_TASK"; task: Task }
  | { type: "DELETE_TASK"; id: number }
  | { type: "MOVE_TASK"; id: number; status: Task["status"] }
  | { type: "ADD_MEMBER"; member: Member }
  | { type: "UPDATE_MEMBER"; member: Member }
  | { type: "DELETE_MEMBER"; id: number }
  | { type: "ADD_REPORT"; report: Report }
  | { type: "DELETE_REPORT"; id: number };
```

---

## Step 3: Fetch Raw JSX from Figma

Use official Figma MCP (`get_design_context`) to extract each section region.

```
Section region (e.g. stat cards area)  →  cache as raw JSX
```

```bash
# Cached files go to:
code/artifacts/cache/<section>-raw.jsx
```

**What raw JSX looks like:** Figma div soup — inline styles, CSS variables, no React components, no data bindings. Pixel-accurate but not usable as code.

---

## Step 4: Transform

Run `transform.mjs` — 3-pass AST engine converts Figma output to clean TSX.

| Pass | What it does | Example |
|------|-------------|---------|
| Components | Div soup → DS components | `<div>` → `<Badge>`, `<IconButton>` |
| Tokens | CSS vars → Tailwind | `var(--bg-base)` → `bg-ui-bg-base` |
| Strip | Remove Figma noise | `data-node-id`, `aria-hidden`, fixed widths |

```bash
node code/scripts/transform.mjs code/artifacts/cache/statcards-raw.jsx
# Output: code/artifacts/transformed/statcards.tsx
```

**What comes out:** Clean TSX with Medusa components and Tailwind classes. Still static — no data bindings, no state, no interactions. That's what Claude adds next.

---

## Step 5: Claude Stitches into Smart Section

**Key concept:** Design and interactivity are separate layers. The transform output IS the design — Figma-accurate layout, spacing, colors, components. Claude doesn't redesign. Claude adds behavior ON TOP of the design. Data stays driven by data.yaml → store. Design stays driven by Figma → transform.

```
Design layer (from Figma/transform):    Layout, spacing, colors, components, column widths
Data layer (from data.yaml → store):    Tasks, members, reports, constants, labels
Behavior layer (Claude adds):           State, filters, CRUD, drag-drop, modals, toasts
```

Claude uses the transform output as a visual/structural reference and writes the section from scratch — preserving the design, wiring the data, adding the behavior.

**What Claude adds:**

| Concern | What | Source |
|---------|------|--------|
| Store | `useStore()` for data | `store.tsx` |
| State | search, sort, filters, drawer | React hooks |
| Dispatch | CRUD actions + toast | store actions |
| Data binding | Literals → store data | `state.tasks`, `state.members` |
| Shared hooks | `useMemberLookup` | `lib/hooks.ts` |
| Shared filters | `applyTaskFilters` | `lib/filters.ts` |
| Table wrapper | `TableCard` with columns | `components/TableCard.tsx` |
| Controls | `ControlsBar` with config | `components/sections/controls.tsx` |
| Modals | `TaskDetailDrawer`, `FormModal` | `components/modals/` |

**What Claude uses from transform output:**
- Layout structure (what goes where)
- Tailwind classes (spacing, colors, typography)
- Component choices (Badge, ColorAvatar, etc.)
- Column definitions (widths, cell rendering)

**What Claude ignores from transform output:**
- Static data imports (replaced by store)
- Missing interactivity (adds it)
- Hardcoded values (binds to data)

### How to prompt Claude for each section

```
Build a smart section for [section name].

Reference: code/artifacts/transformed/[section].tsx (design/layout)
Data: use useStore() — state.tasks, state.members, state.reports
Constants: import from @/lib/constants
Components: use TableCard for tables, ControlsBar for toolbars

Requirements:
- Own store access (useStore)
- Own UI state (search, sort, filters, drawer as needed)
- Dispatch + toast for mutations
- Use shared hooks (useMemberLookup) and filters (applyTaskFilters)
- Preserve all Tailwind classes and layout from transform output
- Export as default function
```

---

## Step 6: Wire to Page

Page becomes a one-liner:

```tsx
export default function TasksPage() {
  return <TasksTable />;
}
```

Section owns everything. Page is just a composition shell.

---

## Step 7: Verify

After each section:

```bash
# Typecheck
npx tsc --noEmit

# Browser check
npm run dev
# Open localhost:3000 — verify section renders, interactions work
```

Check: data renders, clicks work, no console errors, dark mode works.

---

## Section Anatomy

Every smart section follows this structure:

```tsx
export default function SectionName() {
  // 1. Store
  const { state, dispatch } = useStore();

  // 2. UI state
  const [search, setSearch] = useState("");
  const [drawerItem, setDrawerItem] = useState(null);

  // 3. Derived data
  const filtered = useMemo(() => applyFilters(...), [deps]);

  // 4. Column definitions
  const columns = useMemo(() => [...], [deps]);

  // 5. Render
  return (
    <>
      <ControlsBar ... />
      <TableCard data={filtered} columns={columns} ... />
      <DetailDrawer ... />
    </>
  );
}
```

---

## All Sections

| # | Section | Page | What it renders | Key features |
|---|---------|------|----------------|--------------|
| 1 | `statcards.tsx` | Dashboard + Reports | 4 stat cards | Dashboard/reports variants |
| 2 | `chartcards.tsx` | Dashboard | 2 bar charts (priority + status) | Zero-division guard |
| 3 | `recent-tasks-table.tsx` | Dashboard | Top 5 non-done tasks | TableCard, drawer, row actions |
| 4 | `tasks-table.tsx` | Tasks (List) | Full task table | Controls, filters, sort, date, columns, drawer |
| 5 | `kanban.tsx` | Tasks (Kanban) | Drag-drop columns | @hello-pangea/dnd, controls, drawer |
| 6 | `team-table.tsx` | Team | Member table | Edit modal, computed stats (active/overdue) |
| 7 | `reports-table.tsx` | Reports | Report table + stats | Tab filter (90d/30d/7d), sort, search |
| 8 | `settings.tsx` | Settings | Profile, toggles, billing | react-hook-form, Zod, Switch, tab nav |
| 9 | `controls.tsx` | Tasks + Reports | Shared toolbar | Config-driven, search, filter, sort, date, columns |

**Shared components:**
| Component | What | Used by |
|-----------|------|---------|
| `TableCard.tsx` | Generic table + pagination | All table sections |
| `RowActionMenu.tsx` | Three-dot menu (edit + delete) | All table sections |
| `FormModal.tsx` | Data-driven create/edit modal | Layout (header actions), team edit |
| `TaskDetailDrawer.tsx` | Task detail + edit drawer | tasks-table, kanban, recent-tasks |

---

## Shared Abstractions (create before sections)

Build these first — sections consume them. Architecture informed by benchmark.

### TableCard
Generic table wrapper. Sections define columns, TableCard handles rendering + pagination.

```tsx
interface Column<T> {
  header: string;
  className?: string;
  render: (item: T) => ReactNode;
}
```

### ControlsBar
Config-driven toolbar. One component powers Tasks + Reports toolbars.

```tsx
const CONFIGS = {
  tasks: { tabs: ["Kanban", "List"], showFilter: true, showDate: true },
  reports: { tabs: ["90d", "30d", "7d"], showFilter: false, showDate: true },
};
```

### Shared lib
| File | Exports |
|------|---------|
| `filters.ts` | `applyTaskFilters`, `applyDateRange`, sort ranks |
| `select-options.ts` | `STATUS_OPTIONS`, `PRIORITY_OPTIONS`, `ROLE_OPTIONS` |
| `hooks.ts` | `useMemberLookup` (memoized Map) |

---

## Build Order

```
 1. Shared abstractions (TableCard, ControlsBar, lib/)
 2. StatCards + ChartCards (simplest — no table, no controls)
 3. RecentTasksTable (table, no controls)
 4. TasksTable (table + full controls + drawer)
 5. KanbanBoard (drag-drop + controls + drawer)
 6. TeamTable (table + edit modal)
 7. ReportsTable (table + controls + stats)
 8. Settings (forms + toggles + billing)
 9. Wire modals in layout (FormModal for create actions)
```

Each step: build → typecheck → verify in browser → commit.

---

## Polish (8 → 10)

After all sections work, add these for production quality:

| # | What | Why | Where |
|---|------|-----|-------|
| 1 | Empty states | Blank table looks broken | TableCard — show message when `data.length === 0` |
| 2 | Zero-division guards | NaN% in charts when no tasks | ChartCards — guard `count / total` |
| 3 | Reusable cell components | Same avatar+name JSX in 4 tables | `AvatarCell`, `BadgeCell`, `StatusDotCell` |
| 4 | Loading states | Skeleton/spinner while data loads | Matters more after Supabase swap |
| 5 | Error boundaries | Graceful failure, not white screen | Wrap sections in error boundary |
| 6 | Accessibility | Keyboard nav, focus management | aria labels, focus trap in modals/drawer |
| 7 | Testing | At least smoke tests | Verify sections render without crash |

Items 1-3: do immediately after sections. Items 4-7: polish phase or after Supabase.

---

## Commit Rhythm

```bash
git add src/components/TableCard.tsx src/lib/filters.ts ...
git commit -m "add shared abstractions: TableCard, filters, hooks"

git add src/components/sections/statcards.tsx src/components/sections/chartcards.tsx
git commit -m "add stat cards and chart cards sections"

git add src/components/sections/tasks-table.tsx src/components/sections/kanban.tsx
git commit -m "add tasks table and kanban sections"

# ... after all sections done
git push
```

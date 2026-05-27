# Video 4 — Compose

## What This Step Does

Sections are built. Now wire them together — connect modals to layout header buttons, compose pages from sections, add missing routes.

---

## Step 1: Wire FormModal to Layout

Header action buttons (Add task, Invite member, Generate report) need to open FormModal.

**Update layout.tsx:**
- Import `FormModal`, `useStore`, `MODAL_CONFIGS`
- Add `activeModal` state to PageHeader
- Map each action button to a `modalKey`
- On submit: build entity from form data → dispatch → toast

```tsx
const PAGE_HEADERS = {
  "/tasks": {
    title: "Tasks",
    actions: [{ label: "Add task", icon: PlusMini, modalKey: "create_task" }],
  },
  // ...
};
```

**Select options for modals:**
- Priority: from select-options.ts
- Status: from select-options.ts
- Assignee: derived from MEMBERS
- Role: from select-options.ts
- Date range: static options

---

## Step 2: Compose Pages

Each page imports its section(s) and renders them. Zero logic in pages.

| Page | Sections |
|------|----------|
| `dashboard/page.tsx` | `<StatCards />` `<ChartCards />` `<RecentTasksTable />` |
| `tasks/page.tsx` | `<TasksTable />` |
| `tasks/kanban/page.tsx` | `<KanbanBoard />` |
| `team/page.tsx` | `<TeamTable />` |
| `reports/page.tsx` | `<ReportsTable />` |
| `settings/page.tsx` | `<SettingsPage />` |

```tsx
// Example — dashboard
export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <StatCards />
      <ChartCards />
      <RecentTasksTable />
    </div>
  );
}
```

---

## Step 3: Add Missing Routes

Create `tasks/kanban/page.tsx` if it doesn't exist — KanbanBoard needs its own route for tab switching.

ControlsBar tab change navigates between:
- `/tasks` → List view
- `/tasks/kanban` → Kanban view

---

## Step 4: Install Interactivity Dependencies

If not done in Step 1 of smart sections:

```bash
npm install react-hook-form @hookform/resolvers zod @hello-pangea/dnd --legacy-peer-deps
```

Also add `predev` script to regenerate data on start:

```json
"scripts": {
  "predev": "node ../code/scripts/gen-data-ts.mjs",
  "dev": "next dev"
}
```

---

## Step 5: Verify Full Flow

Test every interaction end-to-end:

| Test | Expected |
|------|----------|
| Add task modal → submit | New task appears in table + kanban |
| Click table row | Drawer opens with correct data |
| Edit in drawer → save | Table updates live |
| Delete via row menu | Removed everywhere + toast |
| Drag kanban card | Status changes in table too |
| Search | Table filters by title |
| Filter by status/priority | Table shows subset |
| Sort | Table reorders |
| Date filter (preset + custom) | Table filters by due date |
| Column toggle | Columns hide/show |
| Settings save | Toast confirms |
| Dark mode | All sections render correctly |

---

## Commit

```bash
git add src/app/\(app\)/layout.tsx src/app/\(app\)/*/page.tsx
git commit -m "compose: wire modals to layout, compose pages from sections"
```

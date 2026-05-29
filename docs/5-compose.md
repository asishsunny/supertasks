# Video 5 — Compose

## The Story

Sections are built. Now wire them together — connect modals to layout header buttons, compose pages from sections, verify the full interactive flow.

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

**Select options for modals** (from `lib/select-options.ts` per architecture):
- Priority: `PRIORITY_OPTIONS`
- Status: `STATUS_OPTIONS`
- Assignee: derived from store members
- Role: `ROLE_OPTIONS`

---

## Step 2: Compose Pages

Each page imports its section(s) and renders them. Zero logic in pages.

| Page | Sections |
|------|----------|
| `dashboard/page.tsx` | `<StatCards />` `<ChartCards />` `<RecentTasks />` |
| `tasks/page.tsx` | `<TasksSection />` (owns list/kanban toggle internally) |
| `team/page.tsx` | `<TeamTable />` |
| `reports/page.tsx` | `<ReportsStatCards />` `<ReportsTable />` |
| `settings/page.tsx` | `<SettingsSection />` |

```tsx
// Example — dashboard
export default function DashboardPage() {
  return (
    <>
      <StatCards />
      <ChartCards />
      <RecentTasks />
    </>
  );
}
```

Tasks is ONE section with two render modes. List ↔ kanban is a display toggle inside TasksSection, not separate routes. Filters persist across both views.

---

## Step 3: Install Interactivity Dependencies

If not done during section builds:

```bash
npm install react-hook-form @hookform/resolvers zod @dnd-kit/core @dnd-kit/sortable --legacy-peer-deps
```

Also add `predev` script to regenerate data on start:

```json
"scripts": {
  "predev": "node ../code/scripts/gen-data-ts.mjs",
  "dev": "next dev"
}
```

---

## Step 4: Verify Full Flow

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
| Date filter | Table filters by due date |
| Column toggle | Columns hide/show |
| List ↔ Kanban toggle | View switches, filters persist |
| Settings save | Toast confirms |
| Dark mode | All sections render correctly |

---

## Video Flow

1. **Show the pieces** — sections work in isolation
2. **Wire modals** — connect header buttons to FormModal
3. **Compose pages** — import sections, one-liner shells
4. **Demo the flow** — add task → see it everywhere → delete → gone everywhere
5. **End with** — "One store, zero wiring. Sections react, views repaint."

---

## Commit

```bash
git add src/app/\(app\)/layout.tsx src/app/\(app\)/*/page.tsx
git commit -m "compose: wire modals to layout, compose pages from sections"
```

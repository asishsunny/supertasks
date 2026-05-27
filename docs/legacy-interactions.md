# Video 3 — Interactions & CRUD

## Architecture: Views vs Pages

Pipeline generates **views** — presentational components that take props, render JSX, own zero state. Pages import views and add **behavior** — state, handlers, modals, data fetching.

```
src/
  views/                  ← PIPELINE generates (safe to re-run anytime)
    tasks-table.tsx
    team-table.tsx
    dashboard-stats.tsx

  app/(app)/              ← YOU author (never overwritten)
    tasks/page.tsx
    team/page.tsx
    dashboard/page.tsx
```

**Example — Tasks page:**

```tsx
// views/tasks-table.tsx — generated, no state, just props → JSX
export function TasksTable({ tasks, onRowClick }: {
  tasks: Task[];
  onRowClick?: (task: Task) => void;
}) {
  return (
    <Table>/* pure structure */</Table>
  );
}
```

```tsx
// app/(app)/tasks/page.tsx — authored, owns all behavior
import { TasksTable } from "@/views/tasks-table";

export default function TasksPage() {
  const [drawerTask, setDrawerTask] = useState<Task | null>(null);

  return (
    <>
      <TasksTable tasks={tasks} onRowClick={setDrawerTask} />
      {drawerTask && <TaskDetailDrawer task={drawerTask} />}
    </>
  );
}
```

Pipeline re-runs → view updates → page keeps its state and handlers. Supabase later → page swaps `INITIAL_TASKS` for a DB query, view doesn't change.

Same pattern as GraphQL codegen, Prisma, OpenAPI — never edit generated files.

**Rule:** pipeline writes to `views/`, never touches `app/` pages.

## Scope
Add runtime behavior to the static screens built in Video 2.

## Shell Interactions (already in scaffold)
- Sidebar collapse/expand
- Active nav highlighting
- Dark/light theme toggle
- Page header with route-driven actions

## Page-Level Interactions

### Tasks
- List/Kanban view toggle (tabs)
- Filter, Date, Columns toolbar
- Search with keyboard shortcut (Cmd+K)
- Pagination (10 rows per page)
- Sort by column (descending indicator)
- Row actions menu (ellipsis)
- Create task modal (from header "New task" button)
- Task detail drawer (from row click)

### Team
- Member table with computed stats (active tasks, overdue count)
- Row actions menu
- Invite member modal (from header "Invite member" button)

### Reports
- Tab filter (90d / 30d / 7d)
- Search reports
- Stats cards (completed, avg rate, overdue, on track)
- Generate report modal (from header "Generate report" button)

### Settings
- Tab navigation (Profile, Notifications, Security, Billing)
- Profile form with editable fields
- Notification toggles (on/off switches)
- Security toggles
- Billing: plan info, payment method, history table

### Dashboard
- Stat cards (total, in progress, completed, overdue)
- Charts: tasks by status (bar), tasks by priority (bar)
- Recent tasks table (5 rows)

## State Management
- Zustand store via StoreProvider
- CRUD operations on tasks (create, update status, delete)
- Optimistic updates
- Toast notifications for actions

## Modals & Drawers
- Composition pattern: overlay on current view
- Modal: centered, scrim backdrop, form fields
- Drawer: slide from right, 480px width
- All field configs from data.yaml modals section

## Data Flow
- INITIAL_TASKS / MEMBERS from `@/lib/data` (derived from data.yaml at build)
- Constants (colors, labels) from `@/lib/constants`
- Utility functions (formatDate, isOverdue) from `@/lib/utils`

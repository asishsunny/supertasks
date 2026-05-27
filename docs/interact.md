Add interactivity to SuperTasks. Pipeline generated static pages. This step makes them functional.

## What exists
- Scaffold: layout, sidebar, topbar, breadcrumbs — fully functional from setup
- Pages: `code/artifacts/pages/*.tsx` — static, data-bound, pixel-perfect from Figma
- Data: `src/lib/data.ts` — INITIAL_TASKS, MEMBERS, INITIAL_REPORTS

## What to add

### Store (`src/lib/store.tsx`)
React Context + useStore() hook. CRUD for tasks, members, reports. Typed actions.
- addTask, updateTask, deleteTask
- addMember, updateMember
- addReport
- Wrap app in StoreProvider

### Replace static data
Pipeline pages use INITIAL_TASKS directly. Replace with `useStore()` so CRUD works:
- `const { tasks, addTask, updateTask, deleteTask } = useStore()`
- Add "use client" where needed

### Modals
Pipeline extracts modal content (forms/fields) as static components. Wrap each in Medusa UI `FocusModal` for scrim + centering.
- **Create task** (plan.md: create_task): "New task" button → FocusModal → pipeline content → success toast
- **Edit task**: reuses create_task form, pre-filled with task data → success toast
- **Delete task**: Medusa `Prompt` component (confirm dialog, no form) → success toast
- **Invite member** (plan.md: invite_member): "Invite member" button → FocusModal → pipeline content → success toast
- **Generate report** (plan.md: generate_report): "Generate report" button → FocusModal → pipeline content → success toast
- Validate forms — required fields, error hints, disabled submit until valid
- Focus trap, first field focused, Escape closes

### Task detail drawer
Pipeline extracts drawer content as static component. Wrap in Medusa UI `Drawer` (slides from right, 480px). Shows task details, not for create/edit.

### Kanban
- @hello-pangea/dnd for drag-and-drop
- Cards: title + priority badge + assignee avatar + due date
- Drag between columns updates task status
- Tabs switch between Kanban ↔ List (preserve filter/search state)

### Scroll behavior
- Kanban: column background covers header + cards together. Header sticky, cards scroll under it.
- Sidebar + topbar: fixed, main content scrolls independently.
- Topbar CTA: when page header scrolls out of view, show action button (e.g. "New task") in topbar via intersection observer.
- Tables: header row sticky on vertical scroll.

### Toasts
Success toast after: create task, edit task, delete task, invite member, generate report. Use Medusa UI toast. Message format: "Task created", "Member invited", etc.

### Loading states
Skeleton placeholders on initial page load. Spinner on form submit buttons while processing.

### URL routing
- Tasks: `/tasks?view=list` / `/tasks?view=kanban` — preserve view in URL
- Settings: `/settings/profile`, `/settings/notifications`, etc. — each tab is a route

### Controls bar
**Tasks** (both list and kanban):
- Filter: dropdown by status/priority/assignee, multi-select, clear all
- Date: date range picker
- Columns: toggle column visibility
- Sort: icon button, cycles sort direction
- Search: text input, filters by task title in real-time
- Persist state across kanban ↔ list tab switches

**Reports**:
- Period tabs: 90d / 30d / 7d toggle, active=30d default
- Filter: dropdown by generated-by member, multi-select, clear all
- Search: text input, filters by report name in real-time

### Pagination
Tasks list paginates after 10 rows ("Showing 1-10 of 18"). Other tables: no pagination.

### Settings
Sub-nav routes: Profile, Notifications, Security, Billing — each tab is a URL route.
- Profile: form fields (name, email, job title, phone, location, timezone, bio), "Save changes" button
- Notifications/Security: toggle switches from data.yaml, "Save changes" button
- Billing: plan info, payment method with "Update" button, payment history table

### Sidebar
Collapsible to icon-only mode. Persist collapsed state.

## Responsive
- Sidebar on mobile: hamburger menu
- Tables on mobile: horizontal scroll
- Multi-column layouts: stack vertically
- Modals on mobile: full-screen
- Drawers on mobile: full-width
- Kanban on mobile: horizontal scroll

## Rules
- Don't touch layout or styling from pipeline output — only add behavior
- Icon color tokens: theme toggle (moon/sun) = `text-ui-fg-muted`
- Use Medusa UI components for modals, buttons, inputs, toasts
- Show empty states when lists are empty. No blank screens.
- Changes must reflect across all views (create task in modal → appears in table + kanban)

## Output test (report pass/fail)
1. Delete all tasks — empty state shows
2. Toggle dark mode — no broken colors
3. Shrink to 375px — sidebar collapses, tables scroll
4. Tab through app — every element reachable by keyboard
5. Open modal — focus trapped, Escape closes
6. Submit blank form — error hints shown
7. Drag kanban card — status updates, card stays
8. Create/edit/delete task — reflected across all views
9. Every page has browser tab title
10. All icon buttons have aria-label

Test the app using Playwright. Install it, write tests, run them, report results.

## Setup
Install Playwright: `npm install -D @playwright/test && npx playwright install chromium`
Start dev server before running tests.

## Test order
1. Empty states
2. Dark mode
3. Responsive
4. Keyboard & accessibility
5. CRUD flows
6. Navigation
7. Kanban
8. Forms
9. Pagination
10. Data integrity

## Write and run tests for each section below. Report pass/fail per test.

### Empty states
- Delete all tasks (via store or UI action) — EmptyState component renders, not blank screen
- Search/filter with no matching results — "no results" message visible

### Dark mode
- Toggle to dark mode — no elements with white/broken backgrounds
- Toggle back to light — all colors restored

### Responsive (viewport 375px)
- Sidebar collapses to hamburger menu
- Tables scroll horizontally, no overflow
- Kanban columns stack or scroll
- Modals render full-screen
- Stat cards and settings fields stack vertically

### Keyboard & accessibility
- Tab through page — all interactive elements receive focus
- Open modal — first input focused
- Tab stays trapped inside open modal
- Escape closes modal/drawer
- All icon-only buttons have aria-label attribute

### CRUD flows
- Create task via modal — new task appears in task list
- Edit task via modal — changes reflected in list
- Delete task — removed from list, toast shown
- Invite member — appears in team table
- Generate report — appears in reports table

### Navigation
- Click each sidebar item — correct page route loads
- Collapse sidebar — renders icon-only mode
- Click breadcrumbs — navigates correctly
- Tasks tabs (Kanban ↔ List) — view switches, state preserved
- Settings sub-nav — each tab renders correct content

### Kanban
- Drag card to different column — card moves, status updates
- Card displays title, priority badge, avatar, due date

### Forms
- Submit empty create-task form — error hints visible per field, no submission
- Submit invalid email in invite form — error shown
- Submit valid form — toast shown, modal closes

### Pagination
- Tasks list shows first 10 of 18
- "Showing 1-10 of 18" text visible
- Next page shows remaining items

### Data integrity
- All visible task titles match data.yaml
- All member names, emails, roles match data.yaml
- Avatar colors match member's avatar_bg/avatar_text
- Due dates calculated correctly from offset values

## Report format
Run all tests. For each:
- Test name: PASS or FAIL
- If FAIL: what happened vs what was expected
- Summary at end: X/Y passed

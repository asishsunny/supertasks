# Video 5 — QA

## What This Step Does

Everything is wired. Now verify every interaction, audit code quality, fix edge cases, polish to 10/10.

---

## Step 1: Functional Testing

Run through every interaction end-to-end.

| Test | Expected | Status |
|------|----------|--------|
| Add task modal → submit | New task in table + kanban | ☐ |
| Add task → empty fields → submit | Validation errors show | ☐ |
| Click table row | Drawer opens with correct data | ☐ |
| Edit in drawer → save | Table updates live | ☐ |
| Delete via row menu | Prompt confirms → removed everywhere → toast | ☐ |
| Drag kanban card | Status changes in table too | ☐ |
| Invite member modal → submit | New member in team table | ☐ |
| Generate report modal → submit | New report in reports table | ☐ |
| Search tasks | Table filters by title | ☐ |
| Filter by status | Table shows subset | ☐ |
| Filter by priority | Table shows subset | ☐ |
| Sort by title/date/priority | Table reorders | ☐ |
| Date filter (preset + custom) | Table filters by due date | ☐ |
| Column toggle | Columns hide/show | ☐ |
| Tab switch: List ↔ Kanban | URL changes, correct view renders | ☐ |
| Settings save | Toast confirms | ☐ |
| Dark mode toggle | All sections render correctly | ☐ |

---

## Step 2: Visual Audit

Check every page against the Figma UI file. Look for:

- **Spacing** — gaps between sections, padding inside cards
- **Typography** — correct text styles (txt-compact-small, txt-medium, etc.)
- **Colors** — tokens match DS (fg-muted, fg-subtle, bg-base, etc.)
- **Icons** — correct Medusa icons, correct size
- **Borders** — border-ui-border-base where needed
- **Shadows** — elevation-card-rest on cards
- **Badge variants** — status/priority colors match data.yaml
- **Empty states** — tables with no data show placeholder
- **Overflow** — long text truncates, tables scroll horizontally

---

## Step 3: Dark Mode Audit

Switch to dark mode and check every page:

- Background colors flip correctly
- Text remains readable (contrast ratio)
- Borders visible but not harsh
- Charts/graphs adapt colors
- Badges readable in both modes
- No hardcoded colors (all use CSS variables/tokens)
- Modal/drawer overlays dim correctly

---

## Step 4: Code Quality Audit

```bash
# Type check — zero errors
npx tsc --noEmit

# Check for unused imports
# Look for yellow squiggles in editor

# Check for console.log left behind
grep -r "console.log" src/

# Check for TODO/FIXME
grep -r "TODO\|FIXME" src/

# Check for hardcoded colors
grep -r "#[0-9a-fA-F]\{3,6\}" src/components/
grep -r "rgb\|rgba" src/components/

# Check for any/unknown types
grep -r ": any" src/
```

**Code patterns to verify:**

| Pattern | Correct | Wrong |
|---------|---------|-------|
| Store access | `useStore()` in sections | Direct import of INITIAL_TASKS |
| Form state | react-hook-form + Zod | useState for every field |
| Modal open/close | Controlled via parent state | Internal toggle |
| Dispatch | Via callbacks from parent | Direct dispatch in child |
| Toast | After successful action | Before or without action |
| Types | From `@/types` | Inline type definitions |

---

## Step 5: Edge Cases

Test these specifically:

- **Rapid clicks** — double-submit on modals (should be prevented)
- **Empty search** — clearing search restores full list
- **All filters active** — combining search + status + priority + date
- **Remove all filters** — full list restores
- **Kanban with many cards** — columns scroll, no overflow
- **Long task titles** — truncate in table, full in drawer
- **Special characters** — titles with quotes, ampersands, emoji
- **Modal escape** — Esc closes modal without saving
- **Drawer escape** — Esc closes drawer without saving

---

## Step 6: Performance Check

Not critical for demo but good habits:

- No unnecessary re-renders (React DevTools Profiler)
- Store updates don't re-render unrelated sections
- Large task lists (50+) don't lag
- Kanban drag remains smooth

---

## Step 7: Polish Checklist (8 → 10)

Final touches that separate good from great:

| Item | Details |
|------|---------|
| Loading states | Skeleton or spinner on initial load |
| Hover states | Table rows highlight, buttons show cursor |
| Focus states | Keyboard navigation works on forms |
| Transitions | Modals/drawers animate open/close |
| Toast position | Consistent placement (bottom-right) |
| Empty states | Meaningful message when no tasks/results |
| Favicon | Custom icon in browser tab |
| Page titles | `<title>` set per route |
| Responsive | Sidebar collapses on mobile |
| Consistent spacing | 16px/24px rhythm throughout |

---

## Step 8: Final Build

```bash
# Clean build — zero warnings
npm run build

# Start production server
npm start

# Test in production mode
# Same checklist as Step 1
```

---

## Commit

```bash
git add .
git commit -m "qa: fix edge cases, polish UI, verify all interactions"
```

---

## Ship Checklist

Before recording the demo or deploying:

- [ ] All Step 1 tests pass
- [ ] Dark mode looks correct
- [ ] `tsc --noEmit` — zero errors
- [ ] `npm run build` — zero warnings
- [ ] No console.log in production code
- [ ] No hardcoded colors
- [ ] All modals validate on submit
- [ ] All delete actions confirm first
- [ ] Toast shows on every mutation
- [ ] Git history is clean (meaningful commits)

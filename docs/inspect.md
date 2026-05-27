Inspect the codebase for quality issues. Run each check below and report pass/fail with details for any failure.

Do not fix anything — only report. I'll decide what to fix.

## Inspect order
1. Duplication
2. Type safety
3. Dead code
4. Hardcoded values
5. Architecture
6. DS compliance

## Duplication
- Grep for shared component names (ColorAvatar, TaskDetailDrawer, EmptyState, ErrorBoundary) — each should exist in exactly one file
- Grep for type definitions (Task, Member, Report) — should be defined once in types/
- Grep for constant maps (PRIORITY_BADGE, STATUS_LABEL, STATUS_DOT) — should live in one constants file
- Grep for utility functions (formatDate, isOverdue, offsetDate) — should be in one utils file

## Type safety
- Grep for `: any` in src/ — should be zero
- Grep for `as ` casts in src/ — should be zero (especially `as React.CSSProperties`)
- Check store for loose `Partial<>` usage — actions should have explicit typed payloads

## Dead code
- Check every export is imported somewhere
- No commented-out code blocks
- No unused imports
- Settings data connected to store, not isolated

## Hardcoded values
- Grep for hex colors (#) in component/page files — should be zero outside globals.css
- Grep for hardcoded pixel values that should come from tokens or Tailwind classes
- Check for hardcoded strings that should come from data.yaml (task names, member names, labels)

## Architecture
- Dark mode uses next-themes (useTheme/ThemeProvider), not classList.toggle
- Font is Geist, not Inter
- Tables use min-w-[Xpx], not fixed w-[Xpx]
- ErrorBoundary wraps route segments
- Every page exports Next.js metadata (title + description)
- No console.log in src/

## DS compliance
- Every Button, Badge, Input, Select, Table, Drawer uses Medusa UI — no hand-built equivalents
- Check for raw HTML elements that should be DS components (bare <button>, <input>, <table>)

## Report format
For each section, report:
- PASS or FAIL
- If FAIL: list every file and line number with the violation

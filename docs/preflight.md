# Pre-Flight Checklist

Run through before each demo video. Every item must pass.

## Environment

- [ ] Node.js installed (`node --version` → v18+)
- [ ] Figma desktop app open
- [ ] SuperTasks-DS file open in Figma
- [ ] SuperTasks-UI file open in Figma
- [ ] Figma MCP server running (both `figma` and `figma-console`)
- [ ] Terminal in `supertasks/` project root

## Video 1 — Setup & Shell

- [ ] `app/` folder exists with `package.json`
- [ ] Run `cd app && npm install` — no errors
- [ ] Tailwind is v3, not v4: `npm ls tailwindcss` → `3.4.x`
- [ ] Run `cd .. && npm install` (root) — no errors
- [ ] `data/data.yaml` exists and has tasks, members, nav sections
- [ ] Run `node code/scripts/generate-app-data.mjs` — writes 4 files, no errors
- [ ] Check generated files exist:
  - `app/src/types/index.ts`
  - `app/src/lib/data.ts`
  - `app/src/lib/constants.ts`
  - `app/src/lib/utils.ts`
- [ ] `app/public/logo.png` exists
- [ ] `app/public/avatar-ludvig.png` exists
- [ ] After creating layout.tsx + store.tsx: `cd app && npm run dev` starts without errors
- [ ] Browser at `localhost:3000` shows sidebar + topbar + page header
- [ ] Sidebar collapse/expand works (click logo)
- [ ] Dark/light toggle works (no hydration flash)
- [ ] Nav links highlight on active route
- [ ] Diff layout.tsx against `reference/layout-reference.tsx` if something looks off

## Video 2 — Pipeline

- [ ] `plan.md` exists at project root
- [ ] Run `node code/scripts/sync-plan.mjs` — updates plan.md numbers
- [ ] Run `node figma/scripts/generate-yaml.mjs` — creates `data/screens.yaml` + `data/views.yaml`
- [ ] Run `node code/scripts/test-pipeline.mjs` — all assertions pass (0 failed)
- [ ] Figma MCP responds: test with a simple `get_screenshot` call
- [ ] Cache dir exists: `code/artifacts/cache/`
- [ ] At least one cached file: `shell-sidebar-raw.jsx`

## Video 3 — Interactions

- [ ] `app/src/views/` directory exists (or will be created)
- [ ] Store works: add `console.log(useStore())` in a page, see state in browser console
- [ ] All pages render without console errors
- [ ] Modals open/close cleanly (no scroll lock issues)

## Common Gotchas

| Symptom | Cause | Fix |
|---------|-------|-----|
| All Medusa classes ignored (no styling) | Tailwind v4 installed | `npm install tailwindcss@3` |
| `PlusMini` not found | Wrong icon name | Import `PlusMini` not `Plus` from `@medusajs/icons` |
| Hydration mismatch on theme toggle | Missing mounted guard | Use `resolvedTheme` + `useState(false)` mount check |
| Double page headers | Page has its own header + shell header | Remove header from page component |
| `variant="inverted"` looks wrong | Wrong Medusa prop | Use `variant="primary"` for dark filled buttons |
| `js-yaml` not found in pipeline | App deps not installed | Run `npm install` in `app/` first |
| generate-yaml reads wrong plan.md | Root path bug | Verify `resolve(__dirname, '../..')` in generate-yaml.mjs |
| Shell spacing too loose/tight | Wrong padding values | Use `pt-8 px-8 pb-4` header, `px-8 pb-4 gap-4` body |

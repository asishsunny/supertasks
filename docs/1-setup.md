# Setup & Shell Scaffold

Prerequisite: read `docs/0-basics.md` for stack overview and Figma-to-code mapping.

## Stack

| Dependency | Version | Role |
|-----------|---------|------|
| Next.js | 16.2.6 | App framework |
| React | 19.2.4 | JavaScript library |
| Tailwind CSS | 3.4.19 | Inline styling |
| @medusajs/ui | 4.1.12 | Pre-built components |
| @medusajs/icons | 2.15.2 | Icons |
| @medusajs/ui-preset | 2.15.2 | Design tokens for Tailwind |
| next-themes | — | Dark/light toggle |

## Install

Two sets of dependencies — one for the app, one for the pipeline scripts.

**App (React + UI) — created from scratch during demo:**
```bash
npx create-next-app@latest app --typescript --tailwind --turbopack --src-dir
cd app
npm install @medusajs/ui @medusajs/icons @medusajs/ui-preset next-themes @hello-pangea/dnd
npm install tailwindcss@3 postcss autoprefixer
```

> **Important:** Medusa UI requires Tailwind v3. Next.js 16 ships v4 by default which silently breaks all Medusa utility classes. Install v3 explicitly.

**Configure after create-next-app:**
- `tailwind.config.ts` — add `@medusajs/ui-preset` as preset, content paths must include `./node_modules/@medusajs/ui/dist/**/*`, set `darkMode: "class"`
- `globals.css` — Tailwind v3 directives (`@tailwind base/components/utilities`), remove any v4 `@import` lines
- Root `layout.tsx` — import `@medusajs/ui/styles.css`, wrap children in `<ThemeProvider>` from next-themes (`attribute="class"`, `suppressHydrationWarning` on `<html>`)
- Copy assets: `cp ../assets/logo.svg ../assets/avatar-ludvig.png public/`

**Pipeline scripts (root):**
```bash
# From project root (not app/)
npm install yaml @modelcontextprotocol/sdk
npm install -D @babel/parser @babel/traverse @babel/generator @babel/types playwright
```

These power the transform pipeline (Babel for AST transforms, yaml for data parsing, playwright for screenshots).

**Pipeline also needs `js-yaml` from app/:**
The pipeline scripts use `createRequire()` to load `js-yaml` from app's `node_modules`. This is already included via Medusa UI's dependencies — no extra install needed. Just make sure `npm install` has run in `app/` first.

### Folder Structure
   ```
   supertasks/
   ├── CLAUDE.md        → project instructions
   ├── RULES.md         → build rules
   ├── plan.md          → build plan (auto-synced by sync-plan.mjs)
   ├── data/            → single source of truth (data.yaml, screens.yaml, views.yaml)
   ├── reference/       → DS contract (component-keys, tokens, text-styles)
   ├── figma/           → Figma automation (build-screen, generate-yaml, snippets)
   ├── code/            → transform pipeline + artifacts
   │   ├── scripts/     → transform.mjs, sync-plan.mjs, generate-app-data.mjs
   │   └── artifacts/   → cache (raw Figma JSX), skeletons (layout, store)
   ├── assets/          → logo.svg, avatar-ludvig.png (copy to app/public/)
   ├── docs/            → guides, prompts, brief
   └── app/             → ⚡ created during demo (npx create-next-app)
   ```

## Part B: Shell Build (Sidebar + Topbar + Page Header)

### Fetch & Cache
- Use official Figma MCP (`get_design_context`) to extract shell regions:
  - Sidebar → `code/artifacts/cache/shell-sidebar-raw.jsx`
  - Topbar → `code/artifacts/cache/shell-topbar-raw.jsx`
  - Page headers (per screen) → `code/artifacts/cache/*-header.jsx`
- Raw JSX cached for reproducibility — no re-fetching needed

### Transform
- Run `transform.mjs` on each cached file:
  - Pass 0: Strip Figma defs & asset URLs
  - Pass 0.5: Structural pattern detection (buttons, icons, tables)
  - Pass 1: Component detection → Medusa UI components
  - Pass 2: Token resolution → Tailwind classes
  - Pass 2.2: Strip page-level title rows (shell owns headers)
  - Pass 3: Data binding → wire to data.yaml values
  - Icon gate: cross-check nav icons against data.yaml codeNames, auto-fix mismatches
- Output: clean TSX in `code/artifacts/cache/*-transformed.tsx`

### Generate app data
Run `generate-app-data.mjs` to create all data files from data.yaml:
```bash
node code/scripts/generate-app-data.mjs
```
This generates:
- `app/src/types/index.ts` — TypeScript interfaces (Task, Member, Report, etc.)
- `app/src/lib/data.ts` — runtime data arrays (INITIAL_TASKS, MEMBERS, CURRENT_USER, etc.)
- `app/src/lib/constants.ts` — color maps, label maps (PRIORITY_COLOR, BAR_COLORS, etc.)
- `app/src/lib/utils.ts` — helpers (offsetDate, formatDate, isOverdue)

### Compose layout.tsx

Create `app/src/app/(app)/layout.tsx` — the app shell. This is the most important file in the project. Use `code/artifacts/layout-skeleton.tsx` as a structural guide and the transformed shell cache as the source for Figma-accurate styling.

**Four components, one file:**

| Component | What it does | Key details |
|-----------|-------------|-------------|
| `Sidebar` | Collapsible nav (240px → 52px) | Logo at top (click = toggle), NAV_ITEMS with active state, spacer, NAV_EXTENSIONS at bottom, 1px right border |
| `Topbar` | Top bar with controls | SidebarLeft toggle, breadcrumb from pathname, Sun/Moon theme toggle, user avatar badge |
| `PageHeader` | Route-driven title + actions | Reads pathname → matches PAGE_HEADERS config → renders title + action buttons |
| `AppLayout` | Root composition | StoreProvider → flex h-screen → Sidebar \| (Topbar + main) → Toaster |

**Data (all derived from data.yaml):**
- `NAV_ITEMS` → `data.nav.menu[]` — each has `title`, `codeName` (icon), `href`
- `NAV_EXTENSIONS` → `data.nav.extensions[]` — same shape
- `PAGE_HEADERS` → route → `{ title, actions[] }` — from views.yaml headerActions
- `CURRENT_USER` → `data.user` — name, initials, avatar path

**Critical decisions (don't deviate):**
- Button `variant="primary"` for action buttons (not `"inverted"`)
- Icon `PlusMini` for action buttons (not `Plus` — doesn't exist)
- Theme toggle uses `resolvedTheme` + `mounted` useState guard (prevents hydration mismatch)
- Spacing from Figma: header `pt-8 px-8 pb-4`, body `px-8 pb-4 gap-4`
- Icons from `@medusajs/icons`: `ChartBar`, `ListCheckbox`, `Users`, `ChartPie`, `CogSixTooth`, `SidebarLeft`, `Sun`, `Moon`, `PlusMini`, `EllipsisHorizontal`

### Compose store.tsx

Create `app/src/app/(app)/store.tsx` — state container for the app. Use `code/artifacts/store-skeleton.tsx` as the interface contract.

**Exports:**
- `StoreProvider` — wraps children, initializes from INITIAL_TASKS, MEMBERS, INITIAL_REPORTS
- `useStore()` → `{ state, dispatch }` — throws if called outside provider

**Actions:** ADD_TASK, UPDATE_TASK, DELETE_TASK, MOVE_TASK (status change), ADD_MEMBER, ADD_REPORT

### Create placeholder pages

After layout and store, create a minimal `page.tsx` for each route (dashboard, tasks, team, reports, settings) so the shell is visible in browser. Each just returns a placeholder div.

### Verify in browser

Run `npm run dev` from `app/`. Open `http://localhost:3000/dashboard`. Confirm:
- Sidebar renders with logo, nav items, settings at bottom
- Sidebar collapses/expands on logo click
- Nav items highlight on active route
- Dark/light toggle works (no flash, no hydration error)
- Page header shows correct title per route
- Action buttons appear on Tasks, Team, Reports pages
- User avatar shows in topbar

### Benchmark Check

After layout renders, benchmark it against production codebases. Fetch shell/layout source from Medusa Admin, Cal.com, and Shadcn/Taxonomy — compare structure, token usage, component API, and line count. Save findings to `reference/benchmark.md`.

## Key Files
| File | Role |
|------|------|
| `app/src/app/(app)/layout.tsx` | Composed shell |
| `code/scripts/transform.mjs` | Transform orchestrator |
| `code/scripts/transform/detect-components.mjs` | Component detection + icon gate |
| `code/scripts/transform/resolve-tokens.mjs` | Token → Tailwind |
| `code/scripts/transform/bind-data.mjs` | Data binding |
| `code/artifacts/cache/shell-*` | Cached Figma JSX |
| `data/data.yaml` | Single source of truth |

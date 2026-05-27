# Shell/Layout Benchmark

Comparison of SuperTasks app shell against production codebases.

## Line Count

| Codebase | Shell/Layout Files | Total Lines | Single-file? |
|----------|-------------------|-------------|--------------|
| **SuperTasks** | `(app)/layout.tsx` | 280 | Yes |
| **Medusa Admin** | `shell.tsx` + `main-layout.tsx` + nav-item/ + notifications/ + user-menu/ | ~530 (shell: 230, main-layout: 300) | No — 8 subdirs |
| **Taxonomy** | `dashboard/layout.tsx` + `main-nav.tsx` + `sidebar-nav.tsx` | ~170 (layout: 50, main-nav: 50, sidebar: 65) | No — 3 files |

## Structure

| Aspect | SuperTasks | Medusa Admin | Taxonomy |
|--------|-----------|--------------|----------|
| Router | Next.js App Router | React Router (SPA) | Next.js App Router |
| Sidebar width | 240px / 52px collapsed | 220px / mobile dialog | 200px / hidden on mobile |
| Collapse | Toggle w/ animated width | Desktop toggle + mobile RadixDialog overlay | Hidden below `md:` |
| Topbar | Breadcrumb + theme toggle + user badge | Breadcrumb + notifications | Sticky header + user nav |
| Shell wrapper | Single component | `<Shell>` wraps `<MainSidebar>` | Server component layout |
| State mgmt | `useState` for collapse | `useSidebar()` context provider | None (static) |

## Token / Theming

| Aspect | SuperTasks | Medusa Admin | Taxonomy |
|--------|-----------|--------------|----------|
| Design system | @medusajs/ui tokens | @medusajs/ui tokens (same) | shadcn/ui + CSS vars |
| Token format | `bg-ui-bg-subtle`, `text-ui-fg-muted` | Same: `bg-ui-bg-subtle`, `text-ui-fg-muted` | `bg-background`, `text-foreground/60` |
| Dark mode | `next-themes` class strategy | Built into Medusa tokens | `next-themes` class strategy |
| Icon color | `text-ui-fg-muted` on sidebar toggle | `text-ui-fg-muted` on sidebar toggle (identical) | N/A (no icon buttons) |
| Shadows | `shadow-elevation-card-rest` + some raw rgba | `shadow-elevation-modal` on mobile sidebar | None |

## Component API

| Aspect | SuperTasks | Medusa Admin | Taxonomy |
|--------|-----------|--------------|----------|
| IconButton | `<IconButton variant="transparent" size="small">` | Same API, same variants | N/A |
| Button | `<Button variant="primary" size="small">` | Same API | shadcn `<Button>` |
| Active state | `bg-ui-bg-subtle-pressed` | Custom via `clx()` conditionals | `bg-muted` |
| Nav data | `NAV_ITEMS` const array | `useCoreRoutes()` hook w/ i18n | Config object (`dashboardConfig.sidebarNav`) |
| Breadcrumb | Route segment → label | `useMatches()` + route handle | N/A |
| User display | Static `CURRENT_USER` badge | `<Avatar>` + `<DropdownMenu>` + logout | `<UserAccountNav>` with session |

## Key Findings

1. **Token usage matches Medusa Admin exactly** — same `bg-ui-bg-subtle`, `text-ui-fg-muted`, `shadow-elevation-*` patterns. SuperTasks is using the DS correctly.

2. **Single-file approach is valid** — 280 lines for sidebar + topbar + page header is compact. Medusa splits into 8 dirs because it handles i18n, permissions, extensions, mobile dialog, notifications. SuperTasks has none of those concerns yet.

3. **Collapse behavior is more advanced than both references** — Medusa uses show/hide (not width animation), Taxonomy just hides sidebar below `md:`. SuperTasks animates width 240→52px with icon-only mode.

4. **Remaining gap vs Medusa**: raw `rgba` shadows on user badge (lines 211-212) should use `shadow-elevation-card-rest`. Medusa uses `shadow-borders-focus` for focus states.

5. **Font override needed** — Medusa Admin uses Inter (their default). SuperTasks uses Geist, requiring the `!important` CSS override on `txt-*` utilities. This is a known trade-off when using Medusa UI with a non-Inter font.

6. **Config-driven nav is standard** — all three use a data array/config for nav items. SuperTasks' `NAV_ITEMS` const matches Taxonomy's `dashboardConfig` and Medusa's `useCoreRoutes()` pattern.

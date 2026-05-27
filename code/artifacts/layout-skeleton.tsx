/**
 * Layout Reference — skeleton showing structure, not implementation.
 * Use to verify your layout has the right bones. Fill in from docs/1-setup.md.
 *
 * Key decisions already made (don't reinvent):
 * - Button variant="primary" (not "inverted")
 * - Icon: PlusMini (not Plus)
 * - Theme: resolvedTheme + mounted guard (prevents hydration mismatch)
 * - Spacing: header pt-8 px-8 pb-4, body px-8 pb-4 gap-4
 */

// ── Imports ──
// React, Link, usePathname, useTheme
// @medusajs/ui: IconButton, Button, Toaster
// @medusajs/icons: ChartBar, ListCheckbox, Users, ChartPie, CogSixTooth,
//                  SidebarLeft, Sun, Moon, PlusMini, EllipsisHorizontal
// @/lib/data: CURRENT_USER
// ./store: StoreProvider

// ── Data ──
// NAV_ITEMS: array of { title, icon, href } — from data.yaml nav.menu
// NAV_EXTENSIONS: array of { title, icon, href } — from data.yaml nav.extensions
// PAGE_HEADERS: Record<path, { title, actions[] }> — from views.yaml headerActions

// ── Components ──

// Sidebar({ collapsed, onToggle })
//   - Width: 240px expanded, 52px collapsed
//   - Logo at top (click → onToggle)
//   - NAV_ITEMS mapped with active state (usePathname matching)
//   - Spacer (flex-1)
//   - NAV_EXTENSIONS at bottom
//   - Right border (1px)

// PageHeader()
//   - Reads pathname → finds PAGE_HEADERS match
//   - Title: text-2xl leading-8
//   - Actions: Button variant="primary" size="small" with PlusMini icon

// Topbar({ onToggleSidebar })
//   - SidebarLeft toggle button
//   - Breadcrumb from pathname
//   - Theme toggle: Sun/Moon with mounted guard
//   - User badge: avatar + name from CURRENT_USER

// AppLayout({ children })
//   - StoreProvider wraps everything
//   - flex h-screen
//   - Sidebar | (Topbar + main)
//   - main > header area (pt-8 px-8 pb-4) + content area (px-8 pb-4 gap-4)
//   - Toaster at bottom

export {};

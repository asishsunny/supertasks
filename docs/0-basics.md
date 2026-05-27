# Basics — How Code Maps to Design

## How a web app works

A web app is just files on a computer that a browser turns into what you see on screen. In our stack, you write **React components** — small files that combine structure, styling, and behavior in one place. Think of each component like a Figma component: a `<Button>` in code = a Button in Figma, same props, same look.

**Three things to know:**

1. **Files become pages.** `app/src/app/(app)/tasks/page.tsx` → the `/tasks` URL. Folder structure IS the routing.

2. **Styling is inline.** Instead of CSS files, you write `className="p-4 bg-white"` on elements. `p-4` = 16px padding. This is **Tailwind CSS** — same concept as Figma's spacing and fill tokens, just written as short codes.

3. **File types — the "T" means type-checking, the "X" means UI tags:**
   - `.tsx` = logic + UI tags. The one you write in. (HTML-like tags like `<Button>`, `<div>` live here)
   - `.ts` = logic only, no UI tags. Used for data, types, utils.
   - `.jsx` = UI tags but no type-checking. Only used for raw Figma pipeline output before cleanup.

   **What's type-checking?** In Figma, a component variant property gives you a dropdown — you can only pick valid options like "Primary" or "Secondary". TypeScript does the same for code: autocomplete shows valid options, red error if you pick something invalid. Same guardrail, different interface.

## The stack in plain English

We use React — a JavaScript library for building UI. Next.js is the framework that runs React and gives us routing and a dev server. For styling, we use Tailwind CSS — short class names instead of CSS files. Our components come from Medusa UI — a pre-built library with buttons, tables, badges. We chose Medusa specifically because it comes with a React component library, an icon set, and design token presets that are 1:1 with Figma. Same components, same tokens, same icons — what you see in Figma is exactly what renders in code. And next-themes handles dark and light mode switching.

## What's in the stack (and why)

| Tool | What it is | Why we use it |
|------|-----------|--------------|
| **React** | JavaScript library for building UIs from components. Think of it like building with LEGO — each piece (button, sidebar, table row) is a reusable component. | Industry standard. Everything plugs into it. |
| **Next.js** | Framework on top of React. Handles routing (URL → page), server rendering, and dev tooling. Like React's project manager. | File-based routing (`/tasks` → `tasks/page.tsx`), fast dev server (Turbopack). |
| **Tailwind CSS** | Styling directly in HTML via utility classes. `p-4` = padding 16px, `text-red-500` = red text. No separate CSS files. | Fast iteration, matches how Figma tokens work (spacing-16 → `p-4`). |
| **Medusa UI** | Pre-built React component library (buttons, tables, badges, inputs). Our design system in code. | Matches the Figma DS — same tokens, same components, pixel-perfect. |
| **@medusajs/icons** | Icon library that pairs with Medusa UI. Each icon is a React component (`<ChartBar />`). | Icons match Figma DS exactly. |
| **@medusajs/ui-preset** | Tailwind plugin that adds Medusa's design tokens as utility classes (`text-ui-fg-base`, `bg-ui-bg-subtle`). | Bridge between Figma tokens and Tailwind classes. |
| **next-themes** | Dark/light mode switching. Handles the tricky parts (no flash, system preference). | One line to toggle themes. |

### Stack versions
| Dependency | Version | Role |
|-----------|---------|------|
| Next.js | 16.2.6 | App framework (Turbopack) |
| React | 19.2.4 | UI library |
| Tailwind CSS | 3.4.19 | Utility classes |
| @medusajs/ui | 4.1.12 | Component library |
| @medusajs/icons | 2.15.2 | Icon set |
| @medusajs/ui-preset | 2.15.2 | Tailwind preset (tokens) |
| next-themes | — | Dark/light mode |

## Figma → React + Tailwind Mapping

Every Figma element translates to either a **Medusa component** (with props) or a **Tailwind class** (via ui-preset tokens). The transform pipeline automates this.

### Colors & Tokens
| What you see in Figma | What it becomes in code |
|----------------------|----------------------|
| Fill: `fg/base` (dark text) | `className="text-ui-fg-base"` |
| Fill: `fg/subtle` (gray text) | `className="text-ui-fg-subtle"` |
| Fill: `bg/base` (white surface) | `className="bg-ui-bg-base"` |
| Fill: `bg/subtle` (gray surface) | `className="bg-ui-bg-subtle"` |
| Stroke: `border/base` | `className="border-ui-border-base"` or `bg-ui-border-base h-px` divider |
| Shadow: `elevation-card-rest` | `className="shadow-elevation-card-rest"` |

### Spacing
| Figma variable | Tailwind class | Pixels |
|---------------|---------------|--------|
| `spacing/0` | `p-0` | 0px |
| `spacing/4` | `p-1` / `gap-1` | 4px |
| `spacing/8` | `p-2` / `gap-2` | 8px |
| `spacing/12` | `p-3` / `gap-3` | 12px |
| `spacing/16` | `p-4` / `gap-4` | 16px |
| `spacing/32` | `p-8` / `gap-8` | 32px |

### Components
| Figma component | React component | Key props |
|----------------|----------------|-----------|
| Button (dark filled) | `<Button variant="primary">` | `size="small"` |
| Button (outlined) | `<Button variant="secondary">` | `size="small"` |
| IconButton (square 28px) | `<IconButton variant="transparent">` | `size="small"` |
| Badge / Tag | `<Badge color="blue">` | `color`, `size` |
| Table row layout | `<Table>`, `<Table.Row>`, `<Table.Cell>` | — |
| Toggle switch | `<Switch>` | `checked` |
| Input field | `<Input>` | `placeholder` |
| Icon instance (e.g. chart-bar) | `<ChartBar />` | Import from `@medusajs/icons` |
| Color avatar (initials circle) | `<ColorAvatar>` | Custom component |

### Typography
| Figma text style | Tailwind class |
|-----------------|---------------|
| Compact Small Plus (13px/500) | `txt-compact-small-plus` |
| Compact XSmall Plus (12px/500) | `txt-compact-xsmall-plus` |
| Page title (24px/400) | `text-2xl leading-8 font-normal` |

### How the pipeline handles it
- `resolve-tokens.mjs` — CSS var tokens → Tailwind utility classes
- `detect-components.mjs` — Figma element patterns → Medusa React components
- `bind-data.mjs` — Literal text values → data.yaml expressions

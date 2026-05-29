# Benchmark

## The Prompt

```
We're building a task management admin app with React, 
Medusa UI design system, and Tailwind. We already built 
all screens in Figma using data-driven snippets — one 
table snippet renders every table, one controls snippet 
renders every toolbar.

Now we need the React architecture. We have tables on 
4 pages (dashboard, tasks, team, reports), a kanban board, 
stat cards, charts, and controls bars. Users filter, delete, 
drag. Multiple sections on one page show same data.

How do production React apps handle this?

Benchmark: Medusa Admin, Shadcn DataTable, TanStack Table, 
Plane, Linear, Notion, Asana, Attio.

Follow whatever thread emerges. Each finding should raise 
the next question naturally.

Once the pattern is clear, map out our full app architecture 
based on the findings. Every layer, every component, every 
section, every page.
```

## What Should Emerge

Each question leads to the next. Architecture falls out of the investigation:

1. What does a shared table component own vs what lives outside?
2. Who defines cell rendering — table or consumer?
3. Can cell atoms (avatar, badge, date) be shared across table AND kanban?
4. Who owns the data — pages or sections?
5. Do filters persist when switching list ↔ kanban?
6. When a user deletes a task, how do stat cards + charts + table all update?

---

## Findings

Benchmarked: Medusa Admin, Shadcn DataTable, TanStack Table, Plane, Linear, Notion, Asana, Attio.

14 patterns found. Architecture derived from findings → `4-architecture.md`.

### Architecture

**Benchmark:** Who owns the store — sections or pages?
**Insight:** Medusa Admin → sections own store. Detail pages compose from section components (`OrderGeneralSection`, `OrderPaymentSection`) — each self-contained.
**Decision:** Pages are one-line shells. Sections own all store access.

**Benchmark:** Do filters persist across list ↔ kanban?
**Insight:** Linear, Notion, Asana, Attio → all four persist. Layout mode is a display toggle, not a new context.
**Decision:** Tasks is ONE section with two render modes. Filters persist across both.

**Benchmark:** Where does filter state live?
**Insight:** Medusa Admin, Attio, Shadcn examples → URL search params. Shareable, bookmarkable, back button works.
**Decision:** Filter state in URL via nuqs (`useQueryState()`). Section still owns filters — just stored in URL instead of useState.

**Benchmark:** One big component or smart shell + dumb views?
**Insight:** Plane → smart shell (~50 lines) switches between dumb layout views. Cal.com → one file with conditionals, gets painful past 2 modes.
**Decision:** Smart shell + dumb views. Anti-pattern: conditional visibility in one file.

**Benchmark:** Where do error boundaries live?
**Insight:** Medusa Admin → error isolation at content level, chrome stays functional. View crashes, controls and overlays survive.
**Decision:** Error boundaries wrap views inside sections. Section owns boundary placement, blocks stay dumb.

---

## Blocks

**Benchmark:** What does the table component own?
**Insight:** Checked TanStack Table, Shadcn DataTable, Medusa Admin, Plane:

| IN table | OUT (section composes) |
|----------|----------------------|
| `<table>` markup, headers, rows | Cell atoms (AvatarCell, BadgeCell) |
| Cell rendering via column defs | Pagination |
| Empty state | Row actions, card wrapper, sorting/filtering |

**Decision:** Thin table, max reuse. Cell renderers always consumer-defined via column config.

**Benchmark:** Are cells part of the table?
**Insight:** TanStack, Shadcn, Medusa, Plane → never. Cells live in shared folder. Table just calls `column.render()`.
**Decision:** Cells wired into views as column properties. Shared across domains.

**Benchmark:** How do production apps handle large lists?
**Insight:** Linear, Plane, Attio, Notion → all virtualize. Only render visible rows. @tanstack/react-virtual is standard for React. Without it, 1000+ rows kills scroll performance.
**Decision:** TableView and KanbanView virtualize via @tanstack/react-virtual when row count exceeds threshold. 18 rows renders normally, scales to thousands.

**Benchmark:** How do production apps handle modals?
**Insight:** Route-based (Medusa) — modals are child routes, best for deep linking. Store-based (Plane) — modal state in store, simpler.
**Decision:** Store-based. 3 modals + 1 drawer — route-based is overkill.

**Benchmark:** Is accessibility a polish concern or architectural?
**Insight:** Medusa Admin, Plane → ARIA and keyboard nav baked into components from start, not bolted on after. Medusa UI primitives (Table, Modal, Drawer, Button, DropdownMenu) ship with ARIA built in.
**Decision:** Architectural concern, not polish. Custom blocks need manual ARIA — only KanbanView (~20 lines). Everything else inherits from Medusa UI.

---

## Tool Choices

**Benchmark:** What state management?
**Insight:**

| App | Server data | Client/UI state |
|-----|-------------|-----------------|
| Medusa Admin | React Query | URL params + React state |
| Plane | SWR + MobX | MobX observables |
| Linear | Custom sync engine + MobX | MobX observables |
| Shadcn examples | React Query | nuqs (URL) + Zustand |

Zustand is the most popular client state lib in React (47k+ stars, more weekly downloads than anything except Redux). Cal.com, Vercel dashboard, Clerk all use it. Plane and Linear use MobX for sync engine reasons — outliers, not the norm.

Consensus 2025: React Query for server data, Zustand for client state.
**Decision:** Zustand holds both for now. When Supabase arrives, entity data migrates to React Query. Zustand keeps UI state (filters, drawers, view mode).

**Benchmark:** What table library?
**Insight:** TanStack Table (headless) is universal. Medusa Admin wraps it in `useDataTable` hook. Shadcn composes with primitives. Column defs are data — maps 1:1 to our `views.yaml` column types. Medusa Admin uses tri-hook per entity: `useOrderTableColumns()`, `useOrderTableFilters()`, `useOrderTableQuery()`.
**Decision:** TanStack Table + Medusa `Table.*` primitives. Columns + hooks per domain in `features/`. No query hook (static data). Our v4.1.12 has no DataTable wrapper — build our own thin one.

**Benchmark:** What drag-and-drop?
**Insight:** @dnd-kit is standard. Hook-based, actively maintained, small bundle. react-beautiful-dnd abandoned, @hello-pangea/dnd is a fork with older API.
**Decision:** @dnd-kit for kanban drag-and-drop.

**Benchmark:** How do production apps handle mutations?
**Insight:** Linear, Plane → UI updates instantly before server confirms. On failure, roll back to previous state. Users never wait.
**Decision:** Optimistic updates baked into store. Zustand updates immediately, React Query `onMutate`/`onError` handles rollback when Supabase arrives.

---

## Project Structure

**Benchmark:** Domain folders or flat?
**Insight:** Medusa Admin and Plane both domain-organize. Co-located columns, hooks, sections per entity. Shared components in top-level `components/`.
**Decision:** `features/` per domain. Rule: one domain uses it → `features/domain/`. Two+ domains → `components/`.

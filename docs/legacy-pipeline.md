# Video 2 — End-to-End Pipeline

## What the pipeline does

You have a design in Figma and a file with all your content (data.yaml). The pipeline connects them — change the content, screens rebuild themselves. In Figma and in code. Automatically.

**You add a new task to data.yaml. Here's what happens:**

1. **sync-plan** updates the build plan — task counts, chart numbers, table rows all adjust
2. **generate-yaml** reads the updated plan and regenerates screen configs — dashboard now shows one more task, kanban column gets one more card
3. **build-screen** takes those configs, grabs your Figma DS components (buttons, badges, tables), and assembles complete screens in Figma — using real data, real tokens, real spacing
4. **transform** takes the Figma output (raw messy JSX), and in four passes converts it: Figma elements become React components, Figma tokens become Tailwind classes, literal text gets wired to data, nav icons get verified against the source
5. Out comes clean production code. Drop it in the app folder. Done.

One input. Everything updates. No copy-paste, no manual wiring, no "did we update that screen too?"

## Prerequisites

Before running the pipeline, install dependencies in both locations:

```bash
# Root — pipeline scripts
npm install

# App — React app
cd app && npm install
```

Both `package.json` files are already configured. Just run `npm install` in each.

## Pipeline Flow

```
data.yaml → sync-plan.mjs → plan.md → generate-yaml.mjs → screens.yaml + views.yaml
                                                                    ↓
                                              build-screen.mjs → Figma (via MCP)
                                                                    ↓
                                                    cache raw JSX → transform.mjs → TSX → app/
```

## Step 1: Sync Plan
- Script: `node code/scripts/sync-plan.mjs`
- Reads data.yaml, computes stats (totals, by-status, by-priority, overdue, completion rate)
- Updates plan.md numbers via regex replacements
- Covers: dashboard stats, charts, tables, kanban, team, reports, settings, modals

## Step 2: Generate Screen & View Configs
- Script: `node figma/scripts/generate-yaml.mjs`
- Parses plan.md sections → `data/screens.yaml` (layout, coords, snippets per screen)
- Generates `data/views.yaml` (per-screen data: shell config, table columns, stats, controls)
- All nav references validated against data.yaml

## Step 3: Build Screens in Figma
- Script: `node figma/scripts/build-screen.mjs <screen-name>`
- Reads screens.yaml + views.yaml + data.yaml
- Assembles DATA block for each snippet (shell, content)
- Shell data derived from data.yaml: nav items, extensions, user info (no hardcodes)
- Composes snippet JS → runs in Figma via console MCP (`figma_execute`)
- Output: rendered frames in Figma (light + dark pairs)

## Step 4: Cache & Transform
- Cache raw JSX from Figma via official MCP (`get_design_context`)
- Transform pipeline (4-pass AST engine):
  1. Component detection (Medusa UI mapping + icon gate)
  2. Token resolution (CSS vars → Tailwind)
  3. Page header stripping (shell owns headers)
  4. Data binding (literal text → data.yaml expressions)
- Output: production-ready TSX

## Self-Correcting Gates
- **Icon gate**: cross-checks Figma data-name resolved icons against data.yaml codeNames
- **Title row strip**: auto-removes page-level headers (24px title pattern or data-name="Title Row")
- **sync-plan**: keeps plan.md numbers aligned with data.yaml

## E2E Test
- Script: `node code/scripts/test-pipeline.mjs`
- 50 assertions across all pipeline stages
- Validates: sync-plan output, generate-yaml output, data consistency, transform correctness, build-screen data assembly
- Catches: hardcoded values, missing icons, broken paths, stale configs

## Key Files
| File | Role |
|------|------|
| `code/scripts/sync-plan.mjs` | data.yaml → plan.md sync |
| `figma/scripts/generate-yaml.mjs` | plan.md → screens.yaml + views.yaml |
| `figma/scripts/build-screen.mjs` | Screen composition + Figma execution |
| `code/scripts/transform.mjs` | 4-pass AST transform |
| `code/scripts/test-pipeline.mjs` | E2E pipeline test (50 assertions) |
| `figma/snippets/shell-snippet.js` | Shell Figma plugin code |
| `data/screens.yaml` | Screen layout config |
| `data/views.yaml` | Per-screen data config |

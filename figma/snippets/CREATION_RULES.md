# Snippet Creation Rules

## Structure

Every snippet has 5 named blocks in this order:

```
DATA     → content to render (injected by build-screen or hardcoded)
COMP     → component keys from reference/component-keys.json
STYLES   → text style keys from reference/text-styles.json
EFFECTS  → effect style keys from reference/effect-styles.json
T        → token variable IDs from reference/tokens.json
```

Block names must be exact — `parse-deps.mjs` extracts them automatically.

## Keys

- All keys come from reference/ files — never search Figma at runtime
- Component sets → `importComponentSetByKeyAsync(key)` then `.defaultVariant`
- Standalone components → `importComponentByKeyAsync(key)`
- Variables → `importVariableByKeyAsync(key)`
- Props from reference/components/*.json — never guess enums

## Tokens

- Bind all fills, strokes, radius, spacing to tokens
- Never use raw hex or hardcoded numbers
- Use `SOLID(id)` helper to resolve token → bound paint fill

## Helpers

Reuse across all snippets:

| Function | What it does |
|----------|-------------|
| `mkFrame(name, opts)` | Auto-layout frame. fills=[], clipsContent=false |
| `setProps(inst, overrides)` | Set instance props, handles #nodeId suffixes |
| `setText(parent, name, chars)` | Find text node, load font, set characters |
| `SOLID(id)` | Token variable ID → bound paint fill (cached) |
| `applyIconFills(parent, paint)` | Color all vectors inside an instance |
| `mkLabel(text)` | Label component instance with text set |

## Layout

- `clipsContent = false` on all layout frames unless clipping intended
- `layoutSizingHorizontal = 'FILL'` after appending to parent
- `fills = []` on wrapper frames — tokens handle backgrounds

## Data

- All content from data/data.yaml — never invent
- Use `/* __PLACEHOLDER__ */` for data injected by build-screen.mjs
- Modal form data lives in data.yaml → modals.* section

## Adding a new snippet

1. Create `snippets/mywidget-snippet.js` following the structure above
2. Add keys from reference/ files into COMP, STYLES, EFFECTS, T blocks
3. Add snippet name to screen's `Snippets:` line in plan.md
4. Add data transform function in build-screen.mjs
5. Add emit block in build-screen.mjs for the new snippet
6. Run `generate-yaml.mjs` + `render-all.sh` to test

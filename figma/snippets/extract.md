# Snippet Extraction Pipeline

> UI: `D4Hav0rqH4Zql11h0YgcRv` · DS: `6P0gLpgZPrpp7oHli10VmZ`

Quality bar: `snippets/_reference/statcard.js`.

**figma_execute: NO async IIFE. Top-level `await` + `return` only.**

---

## Pipeline

```
Step 1 — EXTRACT
  Input:  Frame ID from Figma URL
  Run:    node scripts/extract-layout.mjs <frameId>
  Output: JS code (stdout)
  Then:   figma_execute JS → save to snippets/_raw/<name>.json
  Result: Raw JSON — tree structure, overrides, component keys, variable IDs, style keys

Step 2 — RESOLVE
  Input:  _raw/<name>.json + reference/tokens.json + text-styles.json + effect-styles.json
  Run:    node scripts/resolve-snippet.mjs <name>
  Output: snippets/<name>-snippet.js
  Result: COMP block (component keys → names)
          STYLES block (text style keys → names)
          EFFECTS block (effect style keys → names)
          T block (variable IDs → token names)
          Frozen logic (font loading, V(), SOLID(), findChild(), imp/sty/eff loops, setProps())
          Empty DATA block
          // TODO: write render logic

Step 3 — RENDER
  Input:  Resolved snippet (lookup tables) + raw JSON (tree + overrides as blueprint)
  Who:    Claude, prompted with _reference/statcard.js as pattern
  Output: DATA block filled from data.yaml + render code below frozen logic
  Result: Complete runnable snippet

Step 4 — VERIFY
  Run:    figma_execute snippet
  Then:   Screenshot → compare to source frame
  Fix:    Iterate until pixel-match
```

## Step 3 — Write render logic

Resolve outputs lookup blocks + frozen logic + empty DATA. Write render code from scratch.
Use `_reference/statcard.js` as pattern.

Read tree from `snippets/_raw/<name>.json` as blueprint.

**Tree** = frame structure (stops at instance surface).
**Overrides** = flat list of every visible nested instance with non-default props + iconFills. Use this for:
- Setting `componentProperties` on nested instances (`setProps` helper)
- Setting text, icons, states, variants on sidebar items, breadcrumbs, etc.
- INSTANCE_SWAP props contain `{ id, key, name }` — use key to import: `await figma.importComponentByKeyAsync(key)`
- `iconFills` = array of variable IDs for VECTOR/BOOLEAN_OPERATION fills inside instances

Fill DATA block from `data/data.yaml` + `data/views.yaml`. Never invent content.
Cross-check overrides against data.yaml to confirm values.

Helpers: `imp.Name.createInstance()`, `V(T.token)`, `SOLID(T.token)`, `findChild(parent, 'Name')`, `sty.name`, `eff.name`, `setProps(inst, overrides)`.

## Step 4 — Verify

Run snippet via `figma_execute`. Screenshot. Compare against source. Fix, re-run.

---

## Render rules

1. All fills/strokes/spacing/radius token-bound via `V(T.token)` and `SOLID(T.token)`. No raw hex, no resolved color fallbacks.
2. Content from data.yaml only.
3. `FILL` sizing AFTER `appendChild`.
4. `clipsContent=true` on screen frame only.
5. After variant swap, re-set text/icon props.
6. Inter fonts always loaded (DS components use Inter internally).
7. `SOLID()` must resolve variable alias chains to get actual RGB for base paint. DS tokens are aliases (e.g. `fg-subtle` → primitive). Use `valuesByMode` + follow `VARIABLE_ALIAS` types until you get `{r,g,b}`. White base paint causes invisible icons on export.
8. Screenshot after each snippet.
9. Use `setProperties()` on nested instances (not `setText`) for component text props.
10. INSTANCE_SWAP icons: import by component key, not node ID. `const ic = await figma.importComponentByKeyAsync(key); setProps(inst, { Icon: ic.id });`
11. Icon fill overrides: use `SOLID(T.token)` and set on all VECTOR/BOOLEAN_OPERATION nodes inside instance. Token varies by state:
    - **Selected** nav items → `fgBase`
    - **Default** nav items → `fgSubtle`
    - **Topbar** action icons → `fgMuted`
    - Check `iconFills` in overrides data for exact token per instance.

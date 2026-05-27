# Dark Mode

Clone the light frame and switch to Dark mode. Both frames render in one pass.

## What to change

1. `figma/scripts/build-screen.mjs` — `--dark` flag appends dark mode block after shell + content composition.
2. `figma/scripts/run-screen.sh` — always passes `--dark` so every render gets both modes.
3. No changes to `/render` skill — it calls run-screen.sh which handles everything.

## How it works

1. **Pre-import** all dark-mode assets (sun icon, dark effect styles) in a single `Promise.all` — do this while light frame is still building or right after, before the clone.
2. **Clone** the light frame, reposition to the right.
3. **Switch mode** on the clone root. Figma cascades variable modes to children, so most nodes flip automatically.
4. **Fix overridden nodes** — some nodes inside DS components have explicit Light mode set. Find only those nodes and switch them. The root-level mode switch doesn't cascade past explicit overrides.
5. **Swap effect styles** — Light shadow styles don't auto-switch. Find nodes with effect styles, map Light keys → Dark keys from `effect-styles.json`, apply from pre-imported map.
6. **Swap theme icon** — e.g., moon → sun in topbar.

## Principles

**Pre-import before clone.** Every `importComponentByKeyAsync` / `importStyleByKeyAsync` inside the dark block adds latency. Batch them into a `Promise.all` before or during the light build.

```javascript
// One batch: icon swap comp + collection object + all dark effect styles
const [sunComp, colObj, ...darkStyles] = await Promise.all([
  figma.importComponentByKeyAsync(sunIconKey),
  figma.variables.getVariableCollectionByIdAsync(V(anyPreloadedVarId).variableCollectionId),
  ...darkStyleKeys.map(k => figma.importStyleByKeyAsync(k)),
]);
const darkStyleMap = Object.fromEntries(darkStyleKeys.map((k, i) => [k, darkStyles[i].id]));
// Now clone — all assets ready, no async work inside the dark block
```

**Set mode on root, fix only overrides.** `setExplicitVariableModeForCollection` on the clone root switches most nodes. Then find only nodes with `explicitVariableModes[collectionId] === lightModeId` — these are the handful of nodes DS components set explicitly. Never iterate all nodes.

```javascript
clone.setExplicitVariableModeForCollection(colObj, darkModeId);
// Only fix nodes that DS components explicitly set to Light
for (const n of clone.findAll(n => n.explicitVariableModes?.[colObj.id] === lightModeId))
  n.setExplicitVariableModeForCollection(colObj, darkModeId);
```

**Use runtime collection ID.** The collection ID in `tokens.json` is the source file's ID. Figma remaps it when consuming as a library — the runtime ID will be different. Discover it from a pre-loaded variable's `.variableCollectionId` at runtime. Use `colObj.id` for the `explicitVariableModes` check. Mode IDs (Light/Dark) are stable across library references; only the collection ID changes.

```javascript
const anyVar = _vm[Object.keys(_vm)[0]];
const rtColId = anyVar.variableCollectionId;
const colObj = await figma.variables.getVariableCollectionByIdAsync(rtColId);
const rtDarkId = colObj.modes.find(m => m.name === 'Dark').modeId;
const rtLightId = colObj.modes.find(m => m.name === 'Light').modeId;
```

**Filter tree traversals.** `findAll(() => true)` on a 1000-node frame takes 10+ seconds. Always use the narrowest predicate: `findAll(n => n.effectStyleId)`, `findAll(n => n.explicitVariableModes?.[colObj.id] === lightModeId)`.

## Pitfalls

- **Sidebar stays light**: hardcoded collection ID doesn't match runtime ID → `explicitVariableModes` check misses all nodes → overrides don't get flipped. Fix: use runtime collection ID from a pre-loaded variable.
- **Dark effect styles load slowly**: importing each dark style inside the loop is sequential. Fix: pre-import all dark style keys in one `Promise.all`, build a key→id map, then apply from the map.
- **Missing effect-styles.json**: if Light/Dark style pairs aren't extracted, shadows won't swap. Ensure `extract-ds` pipeline captures both Light/ and Dark/ effect styles.
- **Moon→sun icon swap invisible**: `Frame 2171` has two IconButtons — one hidden (index 0), one visible (moon). `findOne` returns the hidden one by default. Fix: filter with `n.visible` in the predicate.

```javascript
const moonBtn = clone.findOne(n =>
  n.name === 'IconButton' && n.parent?.name === 'Frame 2171' && n.visible
);
```

# Snippet Authoring Playbook

Universal guide for writing Figma plugin snippets that render pixel-perfect screens from data.
Works with any design system. DS-specific keys and structure live in `reference/ds-map.md`.

---

## 0. Before You Write Any Snippet

If `reference/ds-map.md` doesn't exist yet, create it first:

1. Copy `reference/ds-map-template.md` → `reference/ds-map.md`
2. Fill §1–6 from reference JSONs (`component-keys.json`, `tokens.json`, `text-styles.json`, `effect-styles.json`)
3. Fill §7 using slim extraction (see §11) for shell and nested content components
4. Save. Now snippets can reference real keys.

No ds-map = no snippet. Always fill the map first.

---

## 1. Snippet Anatomy

Every snippet has 4 sections in this exact order:

```
// ── DATA ──        ← User-editable. All content/config.
// ── Config ──      ← COMP, STYLES, T, PROPS blocks. Keys from ds-map.md.
// ── Frozen logic ── ← Boilerplate: page lookup, helpers, imports.
// ── Region ──      ← Frame creation code. Extracted by composer.
```

### DATA block
- First block in file. Contains ALL dynamic content.
- Always includes `pageName` and `frameName` for standalone execution.
- Arrays for repeating elements (rows, cards, bars).
- Objects for structured data (member: {initial, name, avatarBg, avatarText}).
- Variable IDs go in DATA when they vary per row (avatar colors, bar colors).

```js
const DATA = {
  pageName: 'Screens',
  frameName: 'Dashboard v2',
  cards: [
    { label: 'Total Tasks', value: '248', sub: 'All time', valueDanger: false },
    { label: 'Overdue',     value: '9',   sub: '−3 vs last week', valueDanger: true },
  ],
};
```

### Config blocks
All keys come from `reference/ds-map.md`. Never guess.

- `COMP` — Component **variant** keys (not set keys). Must be instantiable via `createInstance()`.
- `STYLES` — Text style and effect style keys.
- `T` — Token variable IDs (full `VariableID:key/nodeId` format for library vars).
- `PROPS` — Component property keys including `#nodeId` suffix where present.

```js
const COMP = { Badge: 'ec42...', Avatar: 'd465...' };
const STYLES = { txtMedPlus: 'edb0...', cardShadow: '018e...' };
const T = { bgBase: 'VariableID:a426.../13723:1393', sp16: 'VariableID:66fa.../6996:1894' };
const PROPS = { Badge: { text: 'Badge#13715:663', state: 'State' } };
```

### Frozen logic boilerplate
Every content snippet (not shell) uses this exact boilerplate:

```js
// ── Frozen logic — do not edit below this line ────────────────────────────────
await figma.loadAllPagesAsync();
let content;
if (DATA.sectionId) {
  content = await figma.getNodeByIdAsync(DATA.sectionId);
  if (!content) throw new Error('Section not found: ' + DATA.sectionId);
} else {
  const page = figma.root.children.find(p => p.name === DATA.pageName);
  if (!page) throw new Error(`Page "${DATA.pageName}" not found`);
  await figma.setCurrentPageAsync(page);
  const root = page.children.find(n => n.name === DATA.frameName);
  if (!root) throw new Error(`Frame "${DATA.frameName}" not found`);
  content = root.findOne(n => n.name === 'Content');
  if (!content) throw new Error('Content frame not found — run shell first');
}

// Load fonts needed by your text styles (check ds-map.md)
await figma.loadFontAsync({ family: 'YourFont', style: 'Regular' });

const V = async (id) => {
  const v = await figma.variables.getVariableByIdAsync(id);
  if (!v) {
    const m = id.match(/VariableID:([a-f0-9]+)\//);
    if (m) return await figma.variables.importVariableByKeyAsync(m[1]);
    throw new Error(`Variable not found: ${id}`);
  }
  return v;
};
const SOLID = async (id) => figma.variables.setBoundVariableForPaint(
  { type: 'SOLID', color: { r:1, g:1, b:1 }, opacity: 1 }, 'color', await V(id)
);

const imp = {};
for (const [k, key] of Object.entries(COMP))
  imp[k] = await figma.importComponentByKeyAsync(key);

const sty = {};
for (const [k, key] of Object.entries(STYLES)) {
  const s = await figma.importStyleByKeyAsync(key);
  sty[k] = s.id;
}
```

### Region code
- Starts with a `// ── Region name ──` comment.
- Creates frames, appends to `content`.
- Loops over DATA arrays for repeating elements.
- Returns a summary object.

---

## 2. Layout Patterns

### Frame creation + auto-layout
```js
const frame = figma.createFrame();
frame.name = 'Row';
frame.layoutMode = 'HORIZONTAL';           // or 'VERTICAL'
frame.primaryAxisSizingMode = 'FIXED';     // or 'AUTO' (hug)
frame.counterAxisSizingMode = 'AUTO';      // or 'FIXED'
frame.fills = [];                          // transparent
frame.clipsContent = false;                // ALWAYS false on wrappers
```

### FILL after appendChild (critical rule)
`layoutSizingHorizontal = 'FILL'` is IGNORED if set before the node has a parent.
```js
parent.appendChild(child);
child.layoutSizingHorizontal = 'FILL';     // MUST be after appendChild
child.layoutSizingVertical = 'HUG';
```

### Token-bound spacing and radius
Never hardcode pixel values. Bind to design tokens:
```js
frame.setBoundVariable('paddingLeft',   await V(T.sp16));
frame.setBoundVariable('paddingRight',  await V(T.sp16));
frame.setBoundVariable('paddingTop',    await V(T.sp16));
frame.setBoundVariable('paddingBottom', await V(T.sp16));
frame.setBoundVariable('itemSpacing',   await V(T.sp16));
frame.setBoundVariable('cornerRadius',  await V(T.r8));
```

### Equal-width children (layoutGrow)
```js
parent.appendChild(child);
child.layoutGrow = 1;  // flex: 1 — divides space equally
```

### Spacer (push items apart in SPACE_BETWEEN alternative)
```js
const spacer = figma.createFrame();
spacer.name = '_';
spacer.resize(10, 1);
spacer.fills = [];
parent.appendChild(spacer);
spacer.layoutSizingHorizontal = 'FILL';
spacer.layoutGrow = 1;
```

### Alignment
```js
frame.counterAxisAlignItems = 'CENTER';         // cross-axis: MIN | CENTER | MAX
frame.primaryAxisAlignItems = 'SPACE_BETWEEN';  // main-axis: MIN | CENTER | MAX | SPACE_BETWEEN
```

---

## 3. Token Binding

### Fills — always use SOLID() with token ID
```js
frame.fills = [await SOLID(T.bgBase)];
textNode.fills = [await SOLID(T.fgBase)];
```

### Conditional fills
```js
valueTxt.fills = [await SOLID(card.valueDanger ? T.danger : T.fgBase)];
```

### Per-row variable fills (e.g. avatar colors from data)
Variable IDs come from DATA, not T:
```js
bg.fills = [await SOLID(row.avatarBg)];
```

### Fill with opacity
```js
const fill = await SOLID(T.trackBg);
fill.opacity = 0.08;
frame.fills = [fill];
```

### Strokes with token binding
```js
const borderVar = await V(T.border);
inst.strokes = [figma.variables.setBoundVariableForPaint(
  { type: 'SOLID', color: {r:0,g:0,b:0}, opacity: 1 }, 'color', borderVar
)];
inst.strokeAlign = 'INSIDE';
inst.strokeBottomWeight = 1;
inst.strokeTopWeight = 0; inst.strokeRightWeight = 0; inst.strokeLeftWeight = 0;
```

### Effect styles (shadows)
```js
await frame.setEffectStyleIdAsync(sty.cardShadow);
```

---

## 4. Text

### Create text with style
```js
const txt = figma.createText();
txt.characters = 'Hello';
await txt.setTextStyleIdAsync(sty.txtMedPlus);
txt.fills = [await SOLID(T.fgBase)];
parent.appendChild(txt);
```

### Text truncation
```js
desc.textTruncation = 'ENDING';
desc.maxLines = 1;
```

### Fixed-width text
```js
lbl.textAutoResize = 'HEIGHT';
lbl.resize(88, lbl.height);
parent.appendChild(lbl);
lbl.layoutSizingHorizontal = 'FIXED';
```

### Font loading
Check `ds-map.md` for which fonts are used. Load before creating text:
```js
await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
```

---

## 5. Component Instances

### Create and configure
```js
const inst = imp.Badge.createInstance();
inst.setProperties({
  [PROPS.Badge.state]: 'Error',
  [PROPS.Badge.text]:  'Critical',
});
parent.appendChild(inst);
```

### Property key format
Component properties in Figma have format `PropName#nodeId:subId`.
- VARIANT props often have no suffix: `'State'`, `'Size'`
- TEXT/BOOLEAN/INSTANCE_SWAP props have suffix: `'Label#13715:0'`, `'Show Icon Left#4633:481'`
- Get exact keys from `ds-map.md` or `reference/components/*.json`

### Instance swap (icons)
```js
const iconComp = await figma.importComponentByKeyAsync(iconKey);
inst.setProperties({ [PROPS.btnIconLeft]: iconComp.id });
```

### Component swap (e.g. status dots)
```js
const dotComp = await figma.importComponentByKeyAsync(dotKey);
existingInstance.swapComponent(dotComp);
```

### Deep instance overrides (avatar pattern)
When you need to override fills inside a component instance:
```js
const avatar = imp.Avatar.createInstance();
avatar.setProperties({ [PROPS.Avatar.text]: 'S' });
// Reach inside the instance to override fills
const bg = avatar.findOne(n => n.name === 'Background');
if (bg) {
  bg.fills = [await SOLID(row.avatarBg)];
  const letter = bg.findOne(n => n.type === 'TEXT');
  if (letter) letter.fills = [await SOLID(row.avatarText)];
}
```

### Finding children inside instances
```js
// By name
const cell = inst.findOne(n => n.name === 'Label');
// By type
const textNode = inst.findOne(n => n.type === 'TEXT');
// All of type
const vectors = inst.findAll(n => n.type === 'VECTOR');
```

---

## 6. Variable Import Fallback

Library variables may not be "subscribed" in the file yet. Use this V() helper:
```js
const V = async (id) => {
  const v = await figma.variables.getVariableByIdAsync(id);
  if (!v) {
    // Extract key from VariableID:key/nodeId format and import
    const m = id.match(/VariableID:([a-f0-9]+)\//);
    if (m) return await figma.variables.importVariableByKeyAsync(m[1]);
    throw new Error(`Variable not found: ${id}`);
  }
  return v;
};
```

---

## 7. Shell Snippet Pattern

Shell is structurally different from content snippets. It creates the app chrome:

```
Root frame (1440 × height, HORIZONTAL)
├── Sidebar instance (FILL vertical)
└── Main frame (VERTICAL, remaining width)
    ├── Topbar instance (FILL horizontal)
    ├── Page Header frame (title + CTA button)
    └── Content frame (where content snippets inject)
```

### PAGE config (replaces DATA for shell)
```js
const PAGE = {
  pageName:    'Screens',
  frameName:   'Dashboard v2',
  height:      960,
  selectedNav: 'Dashboard',  // which nav item is active
  pageTitle:   'Dashboard',
  ctaLabel:    'Create task',
};
```

### Shell-specific concerns
- **Nav configuration**: Iterate sidebar menu children, match by text label, set State prop to 'Selected'/'Default'. Icon swap IDs from `ds-map.md`.
- **Component internal structure**: Sidebar/Topbar have named children you need to find and configure. Document these in `ds-map.md`.
- **Delete + rebuild**: Shell removes existing frame with same name before creating.
- **Returns content frame**: `return { rootId, contentId }` — content snippets target this frame.

---

## 8. Composition Rules

### How build-screen.mjs works
1. Extracts COMP/STYLES/T/PROPS blocks from each snippet via `parse-deps.mjs`
2. Extracts region code — everything after boilerplate, starting from first `// ──` comment
3. Strips comments and blank lines
4. Pre-batches all variable loading into single `Promise.all`
5. Provides synchronous V()/SOLID() after pre-load

### What the composer provides to region code
- `content` — Content frame from shell
- `V(id)` / `SOLID(id)` — variable/paint helpers (synchronous after pre-load)
- `imp` — all components merged from all snippets
- `sty` — all styles merged
- `TOKEN` / `T` — all tokens merged
- `DATA` — computed from data files by composer's data engine

### Region code rules
- Starts after boilerplate, first `// ──` comment
- Uses `content` as parent (not `page`)
- Loops DATA arrays (never hardcodes items)
- No page lookup, font loading, or V/SOLID/imp/sty definitions
- Return statement is stripped

---

## 9. Common Layout Recipes

### Card with shadow
```js
const card = figma.createFrame();
card.name = 'Card';
card.layoutMode = 'VERTICAL';
card.primaryAxisSizingMode = 'AUTO';   // hug height
card.counterAxisSizingMode = 'FIXED';
card.fills = [await SOLID(T.bgBase)];
card.clipsContent = true;
card.setBoundVariable('cornerRadius', await V(T.r8));
card.setBoundVariable('paddingLeft',  await V(T.sp16));
// ... other padding
await card.setEffectStyleIdAsync(sty.cardShadow);
parent.appendChild(card);
card.layoutSizingHorizontal = 'FILL';
```

### Horizontal row of equal cards
```js
const row = figma.createFrame();
row.name = 'Row';
row.layoutMode = 'HORIZONTAL';
row.primaryAxisSizingMode = 'FIXED';
row.counterAxisSizingMode = 'AUTO';
row.setBoundVariable('itemSpacing', await V(T.sp16));
row.fills = [];
row.clipsContent = false;
parent.appendChild(row);
row.layoutSizingHorizontal = 'FILL';

for (const item of DATA.items) {
  const card = figma.createFrame();
  // ... configure card
  row.appendChild(card);
  card.layoutGrow = 1;  // equal width
}
```

### Toolbar (title + action, space between)
```js
const toolbar = figma.createFrame();
toolbar.name = 'Toolbar';
toolbar.layoutMode = 'HORIZONTAL';
toolbar.counterAxisAlignItems = 'CENTER';
toolbar.primaryAxisAlignItems = 'SPACE_BETWEEN';
toolbar.fills = [];
// ... padding
parent.appendChild(toolbar);
toolbar.layoutSizingHorizontal = 'FILL';
```

### Bar chart row
```js
for (const bar of DATA.bars) {
  const row = figma.createFrame();
  row.layoutMode = 'HORIZONTAL';
  row.counterAxisAlignItems = 'CENTER';
  row.setBoundVariable('itemSpacing', await V(T.sp8));
  row.fills = [];
  parent.appendChild(row);
  row.layoutSizingHorizontal = 'FILL';

  // Fixed-width label
  const lbl = figma.createText();
  lbl.characters = bar.label;
  lbl.textAutoResize = 'HEIGHT';
  lbl.resize(88, lbl.height);
  row.appendChild(lbl);
  lbl.layoutSizingHorizontal = 'FIXED';

  // Track (fill remaining)
  const track = figma.createFrame();
  track.resize(100, 8);
  const trackFill = await SOLID(T.trackBg);
  trackFill.opacity = 0.08;
  track.fills = [trackFill];
  row.appendChild(track);
  track.layoutSizingHorizontal = 'FILL';

  // Bar inside track (proportional width)
  const barW = Math.max(4, Math.round((bar.count / maxCount) * refWidth));
  const barFrame = figma.createFrame();
  barFrame.resize(barW, 8);
  barFrame.fills = [await SOLID(bar.barColor)];
  track.appendChild(barFrame);

  // Count text
  const cnt = figma.createText();
  cnt.characters = String(bar.count);
  row.appendChild(cnt);
}
```

---

## 10. Checklist: Writing a New Snippet

1. **Check ds-map.md** — What components, tokens, styles, prop keys are available?
2. **Write DATA first** — What varies? Arrays for repeats, objects for structured data.
3. **List dependencies** — COMP, STYLES, T, PROPS from ds-map.md.
4. **Copy boilerplate** — Frozen logic section. Update font list.
5. **Write region code** — Start with `// ── Region name ──`. Create frames, loop DATA, bind tokens.
6. **Test standalone** — Run via sidecar bridge against existing shell frame.
7. **Test composed** — Add to screen registry, run via composer.

### Don'ts
- Don't invent data — all content from data files
- Don't use hex colors — always SOLID() with token ID
- Don't hardcode spacing — always setBoundVariable with token
- Don't set FILL before appendChild — it will be ignored
- Don't set clipsContent=true on wrapper frames
- Don't enumerate items — loop DATA arrays
- Don't use component SET keys — use variant keys (see ds-map.md)
- Don't guess prop keys — look up exact keys including #suffix

---

## 11. Creating ds-map.md for a New DS

To use this playbook with a different design system, generate `reference/ds-map.md` containing:

1. **Component variant keys** — For each component you'll use, the key of the specific variant (not the component set). Get by importing a known variant and reading `.key`.
2. **Component property keys** — Full keys with `#nodeId` suffixes. Get from `componentProperties` on an instance.
3. **Token variable IDs** — Full `VariableID:key/nodeId` format. Get by importing via `importVariableByKeyAsync(key)` and reading `.id`.
4. **Text style keys** — Get via `importStyleByKeyAsync(key)`.
5. **Effect style keys** — Same as text styles.
6. **Font families** — Which fonts text styles use. Must load before creating text.
7. **Component internal structure** — Named children inside complex components (sidebar menu, topbar actions). Get by creating an instance and walking `.children`.
8. **Icon/swap IDs** — Node IDs for instance swap properties. Get from a known-good frame on canvas.

### Extraction approach
Use `figma_execute` to query the live file:
```js
// Get variant keys — search DS file by component name
// (component-keys.json has SET keys which can't be imported directly)
await figma.loadAllPagesAsync();
const sets = figma.root.findAll(n => n.type === 'COMPONENT_SET');
return sets.map(s => ({
  name: s.name,
  variants: s.children.map(c => ({ name: c.name, key: c.key }))
}));
// If DS is a library (different file), use figma_get_library_components with includeVariants:true
// Or navigate to the DS file first, run this, then navigate back

// Get prop keys from an instance
const inst = comp.createInstance();
Object.entries(inst.componentProperties).map(([k,v]) => ({ key: k, type: v.type, value: v.value }));

// Get token ID
const v = await figma.variables.importVariableByKeyAsync(tokenKey);
// v.id gives the full VariableID:key/nodeId format
```

### Slim extraction for complex/nested components

Shell components (sidebar, topbar, nav) and content components (tables, cards) have deep
nesting that produces oversized JSON if you walk the full tree. Use this slim extractor
instead — it captures only what snippets need: frame structure, instance props, text nodes.

Run via `figma_execute` for each complex component:
```js
const comp = await figma.importComponentByKeyAsync('VARIANT_KEY_HERE');
const inst = comp.createInstance();

function walk(node, depth = 0) {
  const t = node.type;
  if (!['FRAME','INSTANCE','TEXT','SECTION','COMPONENT','GROUP'].includes(t) && depth > 1) return [];

  const info = { d: depth, name: node.name, type: t };

  if (t === 'INSTANCE') {
    info.props = {};
    for (const [k, v] of Object.entries(node.componentProperties)) {
      info.props[k] = { type: v.type, value: v.value };
    }
    info.childCount = ('children' in node) ? node.children.length : 0;
  }
  if (t === 'TEXT') {
    info.text = node.characters;
    info.parent = node.parent?.name;
  }
  if (t === 'FRAME' || t === 'GROUP' || t === 'SECTION') {
    info.childCount = ('children' in node) ? node.children.length : 0;
    const kids = ('children' in node) ? node.children : [];
    info.childNames = kids.slice(0, 10).map(c => c.name + ' (' + c.type + ')');
    if (kids.length > 10) info.childNames.push('... +' + (kids.length - 10) + ' more');
  }

  const results = [info];
  if ('children' in node) {
    for (const child of node.children) results.push(...walk(child, depth + 1));
  }
  return results;
}

const tree = walk(inst);
inst.remove();
return tree;
```

**What it captures:**
- Frame/group names + child counts + child name lists (for hide/show logic)
- Instance prop keys with types and defaults (for setProperties)
- Text node content + parent name (for character swaps)

**What it skips:**
- Vectors, rectangles, ellipses, lines, boolean ops (visual primitives — snippets never configure these)
- Geometry, fills, strokes, effects (playbook patterns handle these generically)

**Use the output to fill ds-map §7** (shell structure tables), then discard the raw JSON.
Run once per complex component — sidebar, topbar, table, card, etc.

### Icon key extraction

Nav icons and other INSTANCE_SWAP targets need **component keys** (not node IDs).
Search your DS file's Icons page:
```js
await figma.loadAllPagesAsync();
const iconsPage = figma.root.children.find(p => p.name === 'Icons');
if (iconsPage) {
  const icons = iconsPage.findAll(n => n.type === 'COMPONENT');
  const targets = icons.filter(n =>
    ['chart', 'check', 'users', 'clock', 'settings']
    .some(term => n.name.toLowerCase().includes(term))
  );
  return targets.map(n => ({ name: n.name, key: n.key }));
}
```
Adjust search terms to match your nav items. Save keys to ds-map §7a icon table.

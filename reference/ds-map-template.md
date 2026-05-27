# DS Map — [Your Project Name]

All DS-specific keys for your design system.
Snippets reference these values in COMP, STYLES, T, and PROPS blocks.

Generate this file by reading your reference JSONs + querying your DS via figma_execute.
See SNIPPET-PLAYBOOK.md §11 for extraction approach.

---

## 1. Component Variant Keys

These are **variant keys** (instantiable), not component set keys.
Use with `figma.importComponentByKeyAsync(key)`.

Group by feature area (shell, content, controls, icons, etc.)

| Alias | Component | Variant | Key |
|-------|-----------|---------|-----|
| <!-- For each component you use: short alias, component name, variant combo, key --> |
| <!-- Get variant keys: import set key from component-keys.json, read .parent.children --> |

---

## 2. Component Property Keys

Full keys including `#nodeId` suffixes. Get from `instance.componentProperties`.

### <!-- Component name -->
| Alias | Prop key | Type |
|-------|----------|------|
| <!-- alias | exact prop key with #suffix | TEXT / VARIANT / BOOLEAN / INSTANCE_SWAP --> |

---

## 3. Token Variable IDs

Full `VariableID:key/nodeId` format for `setBoundVariable()` / `SOLID()`.
Only include tokens your snippets actually use.

### Backgrounds
| Alias | Token name | ID |
|-------|------------|----|
| <!-- camelCase alias | token path from tokens.json | full VariableID --> |

### Foregrounds
| Alias | Token name | ID |
|-------|------------|----|

### Borders
| Alias | Token name | ID |
|-------|------------|----|

### Spacing
| Alias | Token name | ID |
|-------|------------|----|

### Radius
| Alias | Token name | ID |
|-------|------------|----|

### Semantic / status colors
| Alias | Token name | ID |
|-------|------------|----|

---

## 4. Text Style Keys

Use with `figma.importStyleByKeyAsync(key)` → `node.setTextStyleIdAsync(style.id)`.

| Alias | Style name | Key |
|-------|------------|-----|
| <!-- camelCase alias | full style name from text-styles.json | key --> |

---

## 5. Effect Style Keys

Use with `node.setEffectStyleIdAsync(style.id)`.

| Alias | Style name | Key |
|-------|------------|-----|
| <!-- camelCase alias | full style name from effect-styles.json | key --> |

---

## 6. Font Families

Load before creating any text node. Check your text styles to find which fonts are used.

```js
await figma.loadFontAsync({ family: '<!-- your font -->', style: 'Regular' });
```

---

## 7. Shell Components — Internal Structure

Shell components (sidebar, topbar, nav) have nested instances that need configuration.
Use slim extraction from SNIPPET-PLAYBOOK.md §11 to get structure, then fill tables below.

---

### 7a. Navigation / Sidebar

**Component:** <!-- name + variant key from §1 -->

**Child tree:**
```
<!-- Paste tree output. Annotate: -->
<!-- ✓ = keep, ✗ = hide, ★ = configure -->
```

**How many nav items exist by default?** <!-- e.g. "7 items: Dashboard, Tasks, Team, Reports, Users, Reports, Drafts" -->
**Which to keep?** <!-- e.g. "First 4. Hide index 4+" -->
**Where is Settings / secondary nav?** <!-- e.g. "Extensions section" or "Last items in Menu" or "Not present" -->

**Nav item prop keys (exact):**
| Prop key | Type | What it controls |
|----------|------|-----------------|
| <!-- e.g. Title#13715:997 | TEXT | Nav label --> |
| <!-- e.g. Icon#17774:16 | INSTANCE_SWAP | Nav icon --> |
| <!-- e.g. State | VARIANT | Selected / Default --> |

**Nav icon component keys:**
Icons swapped via INSTANCE_SWAP props. Need **component key** of each icon (not node ID).
See SNIPPET-PLAYBOOK.md §11 for icon key extraction.

| Nav item | Icon name | Icon component key |
|----------|-----------|-------------------|
| <!-- e.g. Dashboard | bar-chart-2 | abc123... --> |

**Setup pattern:**
```js
const KEEP = [/* nav items to show */];
const menuItems = menuFrame.children.filter(n => n.type === 'INSTANCE');
for (let i = 0; i < menuItems.length; i++) {
  if (i >= KEEP.length) { menuItems[i].visible = false; continue; }
  menuItems[i].setProperties({
    '<!-- title prop key -->': KEEP[i].title,
    'State': KEEP[i].title === selectedNav ? 'Selected' : 'Default',
  });
  // Icon swap (if needed)
  const iconComp = await figma.importComponentByKeyAsync(KEEP[i].iconKey);
  menuItems[i].setProperties({ '<!-- icon prop key -->': iconComp.id });
}
```

---

### 7b. Topbar / Header Bar

**Component:** <!-- name + variant key from §1 -->

**Top-level component props:**
| Prop key | Type | Default | Notes |
|----------|------|---------|-------|
| <!-- e.g. Show Breadcrumbs Group#5996:0 | BOOLEAN | true | Set false for single breadcrumb --> |
| <!-- e.g. Device | VARIANT | Desktop | --> |

**Child tree:**
```
<!-- Paste tree output. Annotate what to hide/configure. -->
```

**Breadcrumb setup:**
How breadcrumbs work in this component:
- <!-- e.g. "3 TEXT nodes named 'Breadcrumb' inside 'Breadcrumb Items' frame" -->
- <!-- e.g. "Set first text node to page title" -->
- <!-- e.g. "Hide extras via top-level boolean prop 'Show Breadcrumbs Group#5996:0': false" -->

```js
// Breadcrumb setup code
<!-- e.g. topbar.setProperties({ 'Show Breadcrumbs Group#5996:0': false }); -->
<!-- e.g. const txt = topbar.findOne(n => n.type === 'TEXT' && n.parent?.name === 'Breadcrumb Items'); -->
<!-- e.g. if (txt) txt.characters = pageTitle; -->
```

**What to hide:**
| Child name | Why |
|-----------|-----|
| <!-- e.g. Search Input | Not used in this app --> |
| <!-- e.g. IconButton[0] | Bell notification — not implemented --> |

**Icon swaps:**
| Element | What to swap | Icon component key |
|---------|-------------|-------------------|
| <!-- e.g. IconButton[1] | Moon (dark mode toggle) | 9dc210... --> |

**Setup pattern:**
```js
// Full topbar setup code
<!-- Working code that handles: breadcrumbs, search hide, icon swaps -->
```

---

### 7c. Content Components (Table, Cards, Charts)

Content components with nested instances (cells, rows, badges, avatars) need the same extraction.
Run the slim extraction from §7 on each content component key.

**Component:** <!-- name + variant key from §1 -->

**Top-level component props:**
| Prop key | Type | Default | Notes |
|----------|------|---------|-------|
| <!-- e.g. Columns | VARIANT | 5 | Number of visible columns --> |
| <!-- e.g. Rows | VARIANT | 5 | Number of visible rows --> |
| <!-- e.g. Show Header | BOOLEAN | true | --> |

**Child tree (from slim extraction):**
```
<!-- Paste tree output. Annotate: -->
<!-- ROW = repeating row instance -->
<!-- CELL = cell instance inside row -->
<!-- BADGE/AVATAR/TAG = nested components inside cells -->
```

**Row structure:**
- **How many rows exist by default?** <!-- e.g. "5 row instances" -->
- **Row instance prop keys:**

| Prop key | Type | What it controls |
|----------|------|-----------------|
| <!-- e.g. Cell 1 Text#13715:42 | TEXT | First column value --> |
| <!-- e.g. Status | VARIANT | Badge variant in status cell --> |

**Cell types found:**
| Cell position | Contains | How to configure |
|--------------|----------|-----------------|
| <!-- e.g. Col 1 | Text only | Set TEXT prop on row --> |
| <!-- e.g. Col 3 | Badge instance | Swap via INSTANCE_SWAP or set nested props --> |
| <!-- e.g. Col 5 | Avatar + Text | Avatar via INSTANCE_SWAP, text via TEXT prop --> |

**Nested component keys (badges, avatars, tags):**
| Component | Variant | Key |
|-----------|---------|-----|
| <!-- e.g. Badge | Status=Done | 2708147d... --> |
| <!-- e.g. Avatar | Size=Small | 841e9ed0... --> |

**Setup pattern:**
```js
const table = imp.Table.createInstance();
content.appendChild(table);
table.layoutSizingHorizontal = 'FILL';

// Configure rows
const rows = table.findAll(n => n.type === 'INSTANCE' && n.name === '<!-- row name -->');
for (let i = 0; i < rows.length; i++) {
  if (i >= DATA.items.length) { rows[i].visible = false; continue; }
  const d = DATA.items[i];
  rows[i].setProperties({
    '<!-- cell 1 prop key -->': d.col1,
    '<!-- cell 2 prop key -->': d.col2,
  });
  // Nested component config (badges, avatars, etc.)
  // <!-- e.g. const badge = rows[i].findOne(n => n.name === 'Badge'); -->
  // <!-- e.g. badge.setProperties({ 'Status': d.status }); -->
}
```

---

## 8. Component Set Keys (for discovery)

From `component-keys.json`. Use to discover variants, not to instantiate.

| Component | Set key |
|-----------|---------|
| <!-- Only include sets you use in snippets --> |

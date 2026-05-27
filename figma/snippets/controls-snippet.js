// controls-snippet.js — Controls bar: segment tabs + filter buttons + sort + search (1136×32)
// Generic — DATA block injected per screen (tasks, reports, etc.)

// ── DATA ──
const DATA = {
  tabs: [
    { label: 'Kanban', active: false },
    { label: 'List',   active: true },
  ],
  filters: [
    { label: 'Filter',  icon: 'funnel' },
    { label: 'Date',    icon: 'calendarMini' },
    { label: 'Columns', icon: 'adjustments' },
  ],
  showSort: true,
  showSearch: true,
  searchPlaceholder: 'Search',
};

// ── Component keys ──
const COMP = {
  segmentControl:    '2fc301fa1dbc38be81bda2ddad2df31460967d89',
  button:            'c877e7c87703ab5245c9fb582becdfca29f2c99e',
  iconButton:        'e44a1b0aad5e286f117c931a008d95df68f9c10d',
  searchInput:       'd039b9372469dc09792f9abdf0bfbe95952a1b9a',
  iconFunnel:        '5e14720e7c49812bbe5646ba43ac59cee2958cee',
  iconCalendarMini:  'c39775c171477df80871d2fbec6b0f7917526731',
  iconAdjustments:   '6bab705b2509a1a98c7487bb09ff3e8ab23b68c0',
  iconDescSort:      '2048882120729ed4545d57f487bf694e4f3fd230',
};

// ── Tokens ──
const T = {
  sp0:      'VariableID:a1c28706a42ef7439875a76d07c22441141b8742/6996:1903',
  sp8:      'VariableID:0732ac1e93c221a6e6f7eb84ed8b00b62a9d57ef/6996:1898',
  fgMuted:  'VariableID:f3577a26be5ee797eeb1a13b34c96237cdf238bb/17968:159',
  fgSubtle: 'VariableID:77e30ee7a903973aac43f720b387e89390946184/17968:158',
};

// ── Frozen logic ──
await figma.loadFontAsync({ family: 'Geist', style: 'Medium' });
await figma.loadFontAsync({ family: 'Geist', style: 'Regular' });
await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });

const V = async (key) => {
  const v = await figma.variables.importVariableByKeyAsync(key);
  if (!v) throw new Error(`Variable not found: ${key}`);
  return v;
};
const SOLID = async (key) => {
  const v = await V(key);
  return figma.variables.setBoundVariableForPaint(
    { type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 }, opacity: 1 }, 'color', v
  );
};
async function applyIconFills(parent, varId) {
  const vectors = parent.findAll(n => n.type === 'VECTOR' || n.type === 'BOOLEAN_OPERATION');
  if (!vectors.length) return;
  const fill = await SOLID(varId);
  for (const v of vectors) v.fills = [fill];
}

function setProps(inst, overrides) {
  const props = {};
  const cp = inst.componentProperties;
  for (const [k, v] of Object.entries(overrides)) {
    for (const cpk of Object.keys(cp)) {
      if (cpk === k || cpk.startsWith(k + '#')) { props[cpk] = v; break; }
    }
  }
  if (Object.keys(props).length) inst.setProperties(props);
}
async function setText(parent, name, chars) {
  const t = parent.findOne(n => n.type === 'TEXT' && n.name === name);
  if (t) { await figma.loadFontAsync(t.fontName); t.characters = chars; }
  return t;
}

const imp = {};
for (const [k, key] of Object.entries(COMP))
  imp[k] = await figma.importComponentByKeyAsync(key);

// ── Render ──
const bar = figma.createFrame();
bar.name = 'Controls';
bar.layoutMode = 'HORIZONTAL';
bar.counterAxisAlignItems = 'CENTER';
bar.setBoundVariable('itemSpacing', await V(T.sp0));
bar.clipsContent = false;
bar.fills = [];
bar.primaryAxisSizingMode = 'FIXED';
bar.counterAxisSizingMode = 'AUTO';
bar.resize(1136, 32);

// ── Left: Segment Control ──
if (DATA.tabs && DATA.tabs.length) {
  const seg = imp.segmentControl.createInstance();
  seg.name = 'Segment Control';
  bar.appendChild(seg);

  const segItems = seg.findAll(n => n.type === 'INSTANCE' && n.name === 'Segment Item');
  for (let i = 0; i < segItems.length; i++) {
    const item = segItems[i];
    if (i < DATA.tabs.length) {
      item.visible = true;
      setProps(item, { Label: DATA.tabs[i].label });
      if (DATA.tabs[i].active) {
        setProps(item, { State: 'Active' });
      } else {
        setProps(item, { State: 'Default' });
      }
    } else {
      item.visible = false;
    }
  }
}

// ── Spacer ──
const spacer = figma.createFrame();
spacer.name = 'Spacer';
spacer.layoutGrow = 1;
spacer.layoutAlign = 'STRETCH';
spacer.fills = [];
bar.appendChild(spacer);

// ── Right: Filters + Sort + Search ──
const right = figma.createFrame();
right.name = 'Actions';
right.layoutMode = 'HORIZONTAL';
right.primaryAxisSizingMode = 'AUTO';
right.counterAxisSizingMode = 'AUTO';
right.counterAxisAlignItems = 'CENTER';
right.setBoundVariable('itemSpacing', await V(T.sp8));
right.clipsContent = false;
right.fills = [];
bar.appendChild(right);

// Filter buttons
if (DATA.filters && DATA.filters.length) {
  const filterGroup = figma.createFrame();
  filterGroup.name = 'Filters';
  filterGroup.layoutMode = 'HORIZONTAL';
  filterGroup.primaryAxisSizingMode = 'AUTO';
  filterGroup.counterAxisSizingMode = 'AUTO';
  filterGroup.counterAxisAlignItems = 'CENTER';
  filterGroup.setBoundVariable('itemSpacing', await V(T.sp8));
  filterGroup.clipsContent = false;
  filterGroup.fills = [];
  right.appendChild(filterGroup);

  const ICON_KEY_MAP = { funnel: 'iconFunnel', calendarMini: 'iconCalendarMini', adjustments: 'iconAdjustments' };
  for (const f of DATA.filters) {
    const btn = imp.button.createInstance();
    btn.name = 'Button';
    filterGroup.appendChild(btn);
    const iconId = f.icon && ICON_KEY_MAP[f.icon] ? imp[ICON_KEY_MAP[f.icon]].id : undefined;
    const props = { Label: f.label, 'Show Icon Left': true, 'Show Icon Right': false };
    if (iconId) props['Icon Left'] = iconId;
    setProps(btn, props);
  }
}

// Sort button
if (DATA.showSort) {
  const sortBtn = imp.iconButton.createInstance();
  sortBtn.name = 'IconButton';
  right.appendChild(sortBtn);
  setProps(sortBtn, { Icon: imp.iconDescSort.id });
  await applyIconFills(sortBtn, T.fgSubtle);
}

// Search
if (DATA.showSearch) {
  const search = imp.searchInput.createInstance();
  search.name = 'Search Input';
  search.resize(160, 28);
  right.appendChild(search);
  setProps(search, { Placeholder: DATA.searchPlaceholder });
}

figma.currentPage.appendChild(bar);
figma.viewport.scrollAndZoomIntoView([bar]);
return { id: bar.id, name: bar.name };

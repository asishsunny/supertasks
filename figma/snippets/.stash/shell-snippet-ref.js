// SuperTasks shell snippet — creates app chrome (sidebar + topbar + content area).
// Edit PAGE block only. Content snippets inject into the returned content frame.

// ── PAGE config ──
const PAGE = {
  pageName:    'Screens',
  frameName:   'Dashboard',
  frameX:      0,
  frameY:      0,
  height:      900,
  selectedNav: 'Dashboard',
  pageTitle:   'Dashboard',
  ctaLabel:    'Create task',
};

// ── Component keys ──
const COMP = {
  Sidebar: '269e4e534eeb952a4d7308b3fc9f75e3e79e01ee',
  Topbar:  'c27955f90e872b2b79e6ee7f8c7b4aed7372a4e5',
  Button:  '576fe1cbf94e7d7101e6dd2aa718e6162cb8eaf4',
};
const STYLES = {
  H3: 'adf130ea9e157e6e8bc1ec13b475668221cc831d',
};
const T = {
  bgBase:   'VariableID:a426e4a84e9b344ec6a576ccd94d08a189532d69/13723:1393',
  bgSubtle: 'VariableID:0f057c5e79ecd569f3ddf9031ff14eb8d7641e08/13723:1392',
  fgBase:   'VariableID:155eba32b1cd754e3d29d82fddd40e387753959f/13723:1408',
  border:   'VariableID:ffbe5f08347e6455d869b13eaaab921056481e06/13723:1417',
  sp24:     'VariableID:f9f59aa761a5b46f53c37d0e8bd544eb529c7b79/6996:1902',
  sp16:     'VariableID:66fa38c9c8238168f844eee4b16541d4462b42c2/6996:1894',
  sp40:     'VariableID:1f07fb7e3872074cafbbfbdbf9992642d002f5e2/6996:1892',
  fgSubtle: 'VariableID:77e30ee7a903973aac43f720b387e89390946184/13723:1409',
};

// ── Helpers ──
const V = async (id) => {
  const v = await figma.variables.getVariableByIdAsync(id);
  if (!v) throw new Error(`Variable not found: ${id}`);
  return v;
};
const SOLID = async (id) => {
  const v = await V(id);
  let c = v.valuesByMode[Object.keys(v.valuesByMode)[0]];
  while (c?.type === 'VARIABLE_ALIAS') {
    const av = await figma.variables.getVariableByIdAsync(c.id);
    if (!av) break;
    c = av.valuesByMode[Object.keys(av.valuesByMode)[0]];
  }
  const rgb = (c && typeof c.r === 'number') ? { r: c.r, g: c.g, b: c.b } : { r: 1, g: 1, b: 1 };
  return figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: rgb, opacity: 1 }, 'color', v);
};

// ── Build ──
await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });

const imp = {};
for (const [k, key] of Object.entries(COMP))
  imp[k] = await figma.importComponentByKeyAsync(key);
const sty = {};
for (const [k, key] of Object.entries(STYLES)) {
  const s = await figma.importStyleByKeyAsync(key);
  sty[k] = s.id;
}

const page = figma.currentPage;

// Root frame
const root = figma.createFrame();
root.name = PAGE.frameName;
root.resize(1440, PAGE.height);
root.layoutMode = 'HORIZONTAL'; root.primaryAxisSizingMode = 'FIXED'; root.counterAxisSizingMode = 'FIXED';
root.itemSpacing = 0; root.clipsContent = true;
root.fills = [await SOLID(T.bgSubtle)];
page.appendChild(root);

// ── Sidebar ──
const sidebar = imp.Sidebar.createInstance();
root.appendChild(sidebar);
sidebar.layoutSizingVertical = 'FILL';

const sInner = sidebar.children.find(n => n.name === 'Sidebar');
const top = sInner?.children.find(n => n.name === 'Top');
const menu = top?.children.find(n => n.name === 'Menu');

const NAV_ICONS = {
  Dashboard: '4071:4623', Tasks: '4071:2407',
  Team: '4071:2411', Reports: '4071:2413', Settings: '4071:2415',
};
const KEEP_NAV = ['Dashboard', 'Tasks', 'Team', 'Reports'];

if (menu) {
  const seen = new Set();
  for (const item of menu.children) {
    const label = item.findOne(n => n.type === 'TEXT')?.characters;
    if (!KEEP_NAV.includes(label) || seen.has(label)) { item.visible = false; continue; }
    seen.add(label);
    item.visible = true;
    const iconKey = Object.keys(item.componentProperties || {}).find(k => /^Icon/i.test(k));
    if (iconKey && NAV_ICONS[label]) item.setProperties({ [iconKey]: NAV_ICONS[label] });
    const stateKey = Object.keys(item.componentProperties || {}).find(k => /^State/i.test(k));
    if (stateKey) item.setProperties({ [stateKey]: label === PAGE.selectedNav ? 'Selected' : 'Default' });
  }
}

// Extensions — Settings at bottom
for (const child of top?.children || []) {
  if (child.name !== 'Extensions') continue;
  const hasSettings = child.findAll(n => n.type === 'TEXT').some(t => t.characters === 'Settings');
  if (hasSettings) {
    child.visible = true;
    for (const item of child.children || []) {
      const label = item.findOne?.(n => n.type === 'TEXT')?.characters;
      if (!label || label !== 'Settings') { item.visible = false; continue; }
      const iconKey = Object.keys(item.componentProperties || {}).find(k => /^Icon/i.test(k));
      if (iconKey) item.setProperties({ [iconKey]: NAV_ICONS.Settings });
      if (PAGE.selectedNav === 'Settings') {
        const stateKey = Object.keys(item.componentProperties || {}).find(k => /^State/i.test(k));
        if (stateKey) item.setProperties({ [stateKey]: 'Selected' });
      }
      const fgSubtleVar = await V(T.fgSubtle);
      for (const vec of item.findAll(n => n.type === 'VECTOR')) {
        if (vec.fills?.length) vec.fills = [figma.variables.setBoundVariableForPaint(vec.fills[0], 'color', fgSubtleVar)];
      }
    }
  } else {
    child.visible = true;
    for (const item of child.children || []) item.visible = false;
  }
}

// ── Main column ──
const main = figma.createFrame();
main.name = 'Main'; main.fills = [];
main.layoutMode = 'VERTICAL'; main.primaryAxisSizingMode = 'FIXED'; main.counterAxisSizingMode = 'FIXED';
main.resize(1440 - sidebar.width, PAGE.height); main.itemSpacing = 0; main.clipsContent = false;
root.appendChild(main);

// ── Topbar ──
const topbar = imp.Topbar.createInstance();
main.appendChild(topbar);
topbar.layoutSizingHorizontal = 'FILL';

const searchNode = topbar.findOne(n => n.name === 'Search Input');
if (searchNode) searchNode.visible = false;
const actionFrame = topbar.findOne(n => n.name === 'Frame 2171');
const iconBtns = actionFrame?.children.filter(n => n.type === 'INSTANCE' && n.name === 'IconButton') || [];
if (iconBtns[0]) iconBtns[0].visible = false;
if (iconBtns[1]) {
  const moonComp = await figma.importComponentByKeyAsync('9dc21071e3acbab6091f8576ccba92ff42f6a47a');
  const swapKey = Object.keys(iconBtns[1].componentProperties || {}).find(k => /^Icon/i.test(k));
  if (swapKey) iconBtns[1].setProperties({ [swapKey]: moonComp.id });
}

const bcItems = topbar.findOne(n => n.name === 'Breadcrumb Items');
if (bcItems) {
  const bcKey = Object.keys(bcItems.componentProperties || {}).find(k => /Breadcrumb/i.test(k));
  if (bcKey) bcItems.setProperties({ [bcKey]: PAGE.pageTitle || PAGE.pageName });
}
const bcGroup = topbar.findOne(n => n.name === 'Breadcrumbs Group');
if (bcGroup) {
  const showL2 = Object.keys(bcGroup.componentProperties || {}).find(k => /Level 2/i.test(k));
  const showL3 = Object.keys(bcGroup.componentProperties || {}).find(k => /Level 3/i.test(k));
  if (showL2) bcGroup.setProperties({ [showL2]: false });
  if (showL3) bcGroup.setProperties({ [showL3]: false });
}

// ── Page header ──
const header = figma.createFrame();
header.name = 'Page Header'; header.fills = [];
header.layoutMode = 'HORIZONTAL'; header.counterAxisAlignItems = 'CENTER'; header.primaryAxisAlignItems = 'SPACE_BETWEEN';
header.primaryAxisSizingMode = 'FIXED'; header.counterAxisSizingMode = 'FIXED';
header.resize(1440 - sidebar.width, 80);
header.setBoundVariable('paddingLeft', await V(T.sp40));
header.setBoundVariable('paddingRight', await V(T.sp40));
main.appendChild(header);

const titleNode = figma.createText();
titleNode.characters = PAGE.pageTitle || PAGE.pageName;
await titleNode.setTextStyleIdAsync(sty.H3);
titleNode.fills = [await SOLID(T.fgBase)];
header.appendChild(titleNode);

const ctaBtn = imp.Button.createInstance();
const lblKey = Object.keys(ctaBtn.componentProperties).find(k => /label/i.test(k));
if (lblKey) ctaBtn.setProperties({ [lblKey]: PAGE.ctaLabel });
header.appendChild(ctaBtn);

// ── Content area ──
const content = figma.createFrame();
content.name = 'Content'; content.fills = [];
content.layoutMode = 'VERTICAL'; content.primaryAxisSizingMode = 'FIXED'; content.counterAxisSizingMode = 'FIXED';
content.resize(1440 - sidebar.width, PAGE.height - topbar.height - 80);
content.setBoundVariable('paddingLeft', await V(T.sp40));
content.setBoundVariable('paddingRight', await V(T.sp40));
content.paddingTop = 0;
content.setBoundVariable('paddingBottom', await V(T.sp24));
content.setBoundVariable('itemSpacing', await V(T.sp16));
content.clipsContent = false;
main.appendChild(content);

return { rootId: root.id, contentId: content.id };

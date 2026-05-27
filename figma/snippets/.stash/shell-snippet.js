// SuperTasks shell snippet — creates app chrome (sidebar + topbar + content area).
// Edit PAGE block only. Content snippets inject into the returned content frame.

// ── PAGE config ──────────────────────────────────────────────────────────────
const PAGE = {
  pageName:    'Screens',
  frameName:   'Shell Test',
  frameX:      0,
  frameY:      0,
  height:      960,
  selectedNav: 'Dashboard',      // Dashboard | Tasks | Team | Reports | Settings
  pageTitle:   'Dashboard',
  ctaLabel:    'Create task',
};

// ── Component variant keys (ds-contract.md §1) ─────────────────────────────
const COMP = {
  Sidebar: '269e4e534eeb952a4d7308b3fc9f75e3e79e01ee',  // Type=Main
  Topbar:  'c27955f90e872b2b79e6ee7f8c7b4aed7372a4e5',  // Device=Desktop
  Button:  '576fe1cbf94e7d7101e6dd2aa718e6162cb8eaf4',  // Style=Primary, Size=Small
};

// ── Text style keys (ds-contract.md §4) ─────────────────────────────────────
const STYLES = {
  H3: 'adf130ea9e157e6e8bc1ec13b475668221cc831d',
};

// ── Token variable IDs (ds-contract.md §3) ──────────────────────────────────
const T = {
  bgSubtle: 'VariableID:0f057c5e79ecd569f3ddf9031ff14eb8d7641e08/13723:1392',
  fgBase:   'VariableID:155eba32b1cd754e3d29d82fddd40e387753959f/13723:1408',
  fgSubtle: 'VariableID:77e30ee7a903973aac43f720b387e89390946184/13723:1409',
  sp16:     'VariableID:66fa38c9c8238168f844eee4b16541d4462b42c2/6996:1894',
  sp24:     'VariableID:f9f59aa761a5b46f53c37d0e8bd544eb529c7b79/6996:1902',
  sp40:     'VariableID:1f07fb7e3872074cafbbfbdbf9992642d002f5e2/6996:1892',
};

// ── Frozen logic — do not edit below this line ──────────────────────────────
await figma.loadAllPagesAsync();
const page = figma.root.children.find(p => p.name === PAGE.pageName);
if (!page) throw new Error(`Page "${PAGE.pageName}" not found`);
await figma.setCurrentPageAsync(page);

const old = page.children.find(n => n.name === PAGE.frameName);
if (old) old.remove();

await figma.loadFontAsync({ family: 'Geist', style: 'Regular' });

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

// ── Root frame ──────────────────────────────────────────────────────────────
const root = figma.createFrame();
root.name = PAGE.frameName;
root.resize(1440, PAGE.height);
root.x = PAGE.frameX; root.y = PAGE.frameY;
root.layoutMode = 'HORIZONTAL';
root.primaryAxisSizingMode = 'FIXED';
root.counterAxisSizingMode = 'FIXED';
root.itemSpacing = 0;
root.clipsContent = true;
root.fills = [await SOLID(T.bgSubtle)];
page.appendChild(root);

// ── Sidebar (ds-contract.md §7) ─────────────────────────────────────────────
const sidebar = imp.Sidebar.createInstance();
root.appendChild(sidebar);
sidebar.layoutSizingVertical = 'FILL';

const NAV_ICONS = {
  Dashboard: '4071:4623',
  Tasks:     '4071:2407',
  Team:      '4071:2411',
  Reports:   '4071:2413',
  Settings:  '4071:2415',
};
const KEEP_NAV = ['Dashboard', 'Tasks', 'Team', 'Reports'];

const sInner = sidebar.children.find(n => n.name === 'Sidebar');
const top = sInner?.children.find(n => n.name === 'Top');
const menu = top?.children.find(n => n.name === 'Menu');

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

// ── Main column ─────────────────────────────────────────────────────────────
const main = figma.createFrame();
main.name = 'Main';
main.fills = [];
main.layoutMode = 'VERTICAL';
main.primaryAxisSizingMode = 'FIXED';
main.counterAxisSizingMode = 'FIXED';
main.resize(1440 - sidebar.width, PAGE.height);
main.itemSpacing = 0;
main.clipsContent = false;
root.appendChild(main);

// ── Topbar (ds-contract.md §8) ──────────────────────────────────────────────
const topbar = imp.Topbar.createInstance();
main.appendChild(topbar);
topbar.layoutSizingHorizontal = 'FILL';

const searchNode = topbar.findOne(n => n.name === 'Search Input');
if (searchNode) searchNode.visible = false;

const actionFrame = topbar.findOne(n => n.name === 'Frame 2171');
const iconBtns = actionFrame?.children.filter(n => n.type === 'INSTANCE' && n.name === 'IconButton') || [];
if (iconBtns[0]) iconBtns[0].visible = false;
if (iconBtns[1]) {
  try {
    const moonComp = await figma.importComponentByKeyAsync('9dc21071e3acbab6091f8576ccba92ff42f6a47a');
    const swapKey = Object.keys(iconBtns[1].componentProperties || {}).find(k => /^Icon/i.test(k));
    if (swapKey) iconBtns[1].setProperties({ [swapKey]: moonComp.id });
  } catch(e) {}
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

// ── Page header (playbook §7 — toolbar pattern) ────────────────────────────
const header = figma.createFrame();
header.name = 'Page Header';
header.fills = [];
header.layoutMode = 'HORIZONTAL';
header.counterAxisAlignItems = 'CENTER';
header.primaryAxisAlignItems = 'SPACE_BETWEEN';
header.primaryAxisSizingMode = 'FIXED';
header.counterAxisSizingMode = 'FIXED';
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

// ── Content area ────────────────────────────────────────────────────────────
const content = figma.createFrame();
content.name = 'Content';
content.fills = [];
content.layoutMode = 'VERTICAL';
content.primaryAxisSizingMode = 'FIXED';
content.counterAxisSizingMode = 'FIXED';
content.resize(1440 - sidebar.width, PAGE.height - topbar.height - 80);
content.setBoundVariable('paddingLeft', await V(T.sp40));
content.setBoundVariable('paddingRight', await V(T.sp40));
content.paddingTop = 0;
content.setBoundVariable('paddingBottom', await V(T.sp24));
content.setBoundVariable('itemSpacing', await V(T.sp16));
content.clipsContent = false;
main.appendChild(content);

return { rootId: root.id, contentId: content.id, sidebarW: sidebar.width, topbarH: topbar.height };

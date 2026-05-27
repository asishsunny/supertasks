// Shell snippet — creates app chrome (sidebar + topbar + page header + content area).
// Content snippets inject into the returned Content frame.

// ── DATA ─────────────────────────────────────────────────────────────────────
const DATA = {
  pageName:    'Screens',
  frameName:   'Dashboard',
  frameX:      0,
  frameY:      0,
  height:      960,
  selectedNav: 'Dashboard',
  pageTitle:   'Dashboard',
  ctaLabel:    null,
  nav: [
    { title: 'Dashboard', icon: '4131:6105' },
    { title: 'Tasks',     icon: '4131:6152' },
    { title: 'Team',      icon: '4131:3920' },
    { title: 'Reports',   icon: '4131:6154' },
  ],
  settingsIcon: '4131:3926',
};

// ── Config (keys from ds-map.md) ─────────────────────────────────────────────
const COMP = {
  Sidebar: '269e4e534eeb952a4d7308b3fc9f75e3e79e01ee',
  Topbar:  'c27955f90e872b2b79e6ee7f8c7b4aed7372a4e5',
  Button:  '576fe1cbf94e7d7101e6dd2aa718e6162cb8eaf4',
};

const STYLES = {
  h3: 'f3b847e205638e0ce7edb0e6975bda82920864c8',
};

const T = {
  bgSubtle: 'VariableID:0f057c5e79ecd569f3ddf9031ff14eb8d7641e08/13723:1392',
  fgBase:   'VariableID:155eba32b1cd754e3d29d82fddd40e387753959f/13723:1408',
  fgSubtle: 'VariableID:77e30ee7a903973aac43f720b387e89390946184/13723:1409',
  sp16:     'VariableID:66fa38c9c8238168f844eee4b16541d4462b42c2/6996:1894',
  sp24:     'VariableID:f9f59aa761a5b46f53c37d0e8bd544eb529c7b79/6996:1902',
  sp40:     'VariableID:1f07fb7e3872074cafbbfbdbf9992642d002f5e2/6996:1892',
};

// ── Frozen logic — do not edit below this line ───────────────────────────────
await figma.loadAllPagesAsync();
const page = figma.root.children.find(p => p.name === DATA.pageName);
if (!page) throw new Error(`Page "${DATA.pageName}" not found`);
await figma.setCurrentPageAsync(page);

const old = page.children.find(n => n.name === DATA.frameName);
if (old) old.remove();

await figma.loadFontAsync({ family: 'Geist', style: 'Regular' });
await figma.loadFontAsync({ family: 'Geist', style: 'Medium' });
await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });

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

// ── Region: Shell ────────────────────────────────────────────────────────────

// Root frame
const root = figma.createFrame();
root.name = DATA.frameName;
root.resize(1440, DATA.height);
root.layoutMode = 'HORIZONTAL';
root.primaryAxisSizingMode = 'FIXED';
root.counterAxisSizingMode = 'FIXED';
root.fills = [await SOLID(T.bgSubtle)];
root.clipsContent = true;
root.x = DATA.frameX;
root.y = DATA.frameY;
page.appendChild(root);

// Sidebar — ds-map §7a
const sidebar = imp.Sidebar.createInstance();
root.appendChild(sidebar);
sidebar.layoutSizingVertical = 'FILL';

const sidebarInner = sidebar.findOne(n => n.name === 'Sidebar');
const menuFrame = sidebarInner?.findOne(n => n.name === 'Menu');

if (menuFrame) {
  const navItems = menuFrame.children.filter(n => n.type === 'INSTANCE');
  for (let i = 0; i < navItems.length; i++) {
    const item = navItems[i];
    const navData = DATA.nav[i];
    if (!navData) { item.visible = false; continue; }
    item.setProperties({
      'Title#13715:997': navData.title,
      'State': navData.title === DATA.selectedNav ? 'Selected' : 'Default',
    });
    if (navData.icon) {
      const iconNode = await figma.getNodeByIdAsync(navData.icon);
      if (iconNode) item.setProperties({ 'Icon#17774:16': iconNode.id });
    }
  }
}

// Extensions — second frame named 'Extensions' has items
const extFrames = sidebarInner?.findAll(n => n.name === 'Extensions' && n.type === 'FRAME');
const extFrame = extFrames?.find(f => f.children.length > 0);
if (extFrame) {
  const extItems = extFrame.children.filter(n => n.type === 'INSTANCE');
  for (let i = 0; i < extItems.length; i++) {
    const item = extItems[i];
    if (i === 2) {
      item.setProperties({
        'Title#13715:997': 'Settings',
        'State': DATA.selectedNav === 'Settings' ? 'Selected' : 'Default',
      });
      const iconNode = await figma.getNodeByIdAsync(DATA.settingsIcon);
      if (iconNode) item.setProperties({ 'Icon#17774:16': iconNode.id });
    } else {
      item.visible = false;
    }
  }
}

// Main area
const main = figma.createFrame();
main.name = 'Main';
main.layoutMode = 'VERTICAL';
main.primaryAxisSizingMode = 'FIXED';
main.counterAxisSizingMode = 'FIXED';
main.fills = [];
main.clipsContent = false;
root.appendChild(main);
main.layoutSizingHorizontal = 'FILL';
main.layoutSizingVertical = 'FILL';

// Topbar — ds-map §7b
const topbar = imp.Topbar.createInstance();
main.appendChild(topbar);
topbar.layoutSizingHorizontal = 'FILL';

// Breadcrumb — single level
const bcGroup = topbar.findOne(n => n.name === 'Breadcrumbs Group');
if (bcGroup) {
  bcGroup.setProperties({
    'Show Level 2#5876:5': false,
    'Show Level 3#5876:4': false,
  });
  const bcItems = bcGroup.findAll(n => n.name === 'Breadcrumb Items');
  if (bcItems[0]) bcItems[0].setProperties({ 'Breadcrumb#13715:736': DATA.pageTitle });
}

// Hide search
const searchInput = topbar.findOne(n => n.name === 'Search Input');
if (searchInput) searchInput.visible = false;

// Hide bell, swap settings icon to moon
const actionFrame = topbar.findOne(n => n.name === 'Frame 2171');
if (actionFrame) {
  const iconBtns = actionFrame.children.filter(n => n.type === 'INSTANCE');
  if (iconBtns[0]) iconBtns[0].visible = false;
  if (iconBtns[1]) {
    const moonComp = await figma.importComponentByKeyAsync('9dc21071e3acbab6091f8576ccba92ff42f6a47a');
    iconBtns[1].setProperties({ 'Icon#13715:303': moonComp.id });
  }
}

// Page header
const headerRow = figma.createFrame();
headerRow.name = 'Page Header';
headerRow.layoutMode = 'HORIZONTAL';
headerRow.primaryAxisSizingMode = 'FIXED';
headerRow.counterAxisSizingMode = 'AUTO';
headerRow.counterAxisAlignItems = 'CENTER';
headerRow.primaryAxisAlignItems = 'MIN';
headerRow.fills = [];
headerRow.clipsContent = false;
headerRow.setBoundVariable('paddingLeft', await V(T.sp24));
headerRow.setBoundVariable('paddingRight', await V(T.sp24));
headerRow.setBoundVariable('paddingTop', await V(T.sp24));
headerRow.setBoundVariable('paddingBottom', await V(T.sp16));
main.appendChild(headerRow);
headerRow.layoutSizingHorizontal = 'FILL';

const title = figma.createText();
title.characters = DATA.pageTitle;
await title.setTextStyleIdAsync(sty.h3);
title.fills = [await SOLID(T.fgBase)];
headerRow.appendChild(title);

if (DATA.ctaLabel) {
  headerRow.primaryAxisAlignItems = 'SPACE_BETWEEN';
  const btn = imp.Button.createInstance();
  btn.setProperties({ 'Label#13715:0': DATA.ctaLabel });
  headerRow.appendChild(btn);
}

// Content area — where content snippets inject
const content = figma.createFrame();
content.name = 'Content';
content.layoutMode = 'VERTICAL';
content.primaryAxisSizingMode = 'FIXED';
content.counterAxisSizingMode = 'FIXED';
content.fills = [];
content.clipsContent = false;
content.setBoundVariable('itemSpacing', await V(T.sp16));
content.setBoundVariable('paddingLeft', await V(T.sp24));
content.setBoundVariable('paddingRight', await V(T.sp24));
main.appendChild(content);
content.layoutSizingHorizontal = 'FILL';
content.layoutSizingVertical = 'FILL';

return { rootId: root.id, contentId: content.id };

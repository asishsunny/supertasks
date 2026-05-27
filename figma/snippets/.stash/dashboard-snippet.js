// dashboard-snippet.js — Snippet (1440×900)

// ── DATA (from data.yaml + views.yaml) ──
const DATA = {
  // TODO: fill from data.yaml + views.yaml
};

// ── Component keys ──
const COMP = {
  Sidebar: '269e4e534eeb952a4d7308b3fc9f75e3e79e01ee', // Sidebar
  Topbar: 'c27955f90e872b2b79e6ee7f8c7b4aed7372a4e5', // Topbar
};

// ── Text styles ──
const STYLES = {
  textCompactTxtCompactSmallPlus: '76cc3f3552860444bb19f826d0c8428c8d7264dc', // Text Compact/txt-compact-small-plus
  textCompactTxtCompactXsmallPlus: 'b44cf02f2c3ac7f0c5cd7bfd25c684aadad69ed7', // Text Compact/txt-compact-xsmall-plus
  textCompactTxtCompactSmall: '184b1bd4001407d480ae493b95b84e90d347cb52', // Text Compact/txt-compact-small
  headersWebsH3: 'adf130ea9e157e6e8bc1ec13b475668221cc831d', // Headers Webs/H3
};

// ── Effect styles ──
const EFFECTS = {
  base: '45005916e55e835426a4c5fe420463b20c369a24', // Light/Borders/base
};

// ── Tokens ──
const T = {
  backgroundsBgSubtle: 'VariableID:0f057c5e79ecd569f3ddf9031ff14eb8d7641e08/13723:1392', // backgrounds/bg-subtle
  spacing12: 'VariableID:77559b65a36808508ee6736034dc13c55e640514/6996:1895', // spacing-12
  spacing2: 'VariableID:2a22c96cab78cb41bf32ea26aec1c028be9b1b4f/6996:1901', // spacing-2
  spacing8: 'VariableID:0732ac1e93c221a6e6f7eb84ed8b00b62a9d57ef/6996:1898', // spacing-8
  radius6: 'VariableID:b3cc1de7f52baa50145b5a621d3e0752e2593732/6996:1712', // radius-6
  backgroundsBgBase: 'VariableID:a426e4a84e9b344ec6a576ccd94d08a189532d69/13723:1393', // backgrounds/bg-base
  foregroundsFgBase: 'VariableID:155eba32b1cd754e3d29d82fddd40e387753959f/13723:1408', // foregrounds/fg-base
  fontSizeSmall: 'VariableID:08c154b96f5d46323f201e407bb748cdc453d52e/11733:4', // font/size/small
  fontSizeMedium: 'VariableID:e00f44ed717f5b1067887b5278e30cb8094fb68b/6996:1821', // font/size/medium
  fontFamilyBody: 'VariableID:e06d9db3d6ed02de73697eae005622387ab0e8b6/7870:94', // font/family/body
  fontWeight500: 'VariableID:f404fa95f32ace66073174f8f325798a84ca57e4/6996:1829', // font/weight/500
  foregroundsFgMuted: 'VariableID:f3577a26be5ee797eeb1a13b34c96237cdf238bb/13723:1410', // foregrounds/fg-muted
  bordersBorderStrong: 'VariableID:52e370e3808de877c43ce2fea5c2501da5affab7/13723:1418', // borders/border-strong
  backgroundsBgSubtlePressed: 'VariableID:94a195327cd83f2264f49dfd65811a5eb9d8cbce/17834:25', // backgrounds/bg-subtle-pressed
  foregroundsFgSubtle: 'VariableID:77e30ee7a903973aac43f720b387e89390946184/13723:1409', // foregrounds/fg-subtle
  bordersBorderBase: 'VariableID:ffbe5f08347e6455d869b13eaaab921056481e06/13723:1417', // borders/border-base
  buttonsButtonTransparent: 'VariableID:659b67f824931d5093943abe4cb83a19847a513b/13723:1527', // buttons/button-transparent
  spacing4: 'VariableID:df05201f6fbd29c44c88e87f4b8842f9c0e94bf1/6996:1900', // spacing-4
  fontSizeXsmall: 'VariableID:2b5ad447e8b97d3131afd9c9d727efaeca69e146/11733:9', // font/size/xsmall
  radiusFull: 'VariableID:0a4f8e80cf597d7004f537b5ce0ce965dfcf9015/6996:1724', // radius-full
  backgroundsBgField: 'VariableID:bc019e1f0a717d049b899d12f32e60c6f3ee6216/13723:1399', // backgrounds/bg-field
  fontWeight400: 'VariableID:aa9a1d9edce50530b1c57295d885e98682159acb/6996:1823', // font/weight/400
  spacing10: 'VariableID:e6ada489537c0313d703fec4b320a30e4ea37e29/6996:1897', // spacing-10
  spacing16: 'VariableID:66fa38c9c8238168f844eee4b16541d4462b42c2/6996:1894', // spacing-16
  spacing32: 'VariableID:3abe2da048270a211905ea8a64ae6689bc54b025/6996:1893', // spacing-32
  fontFamilyHeader: 'VariableID:d58f1fdf63b93407b5e27891010af340e2384e9d/7870:35', // font/family/header
};

// ── Frozen logic — do not edit below this line ──
await figma.loadFontAsync({ family: 'Geist', style: 'Medium' });
await figma.loadFontAsync({ family: 'Geist', style: 'Regular' });
await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });

const V = async (id) => {
  const v = await figma.variables.getVariableByIdAsync(id);
  if (!v) throw new Error(`Variable not found: ${id} — is SuperTasks-DS library enabled?`);
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
  return figma.variables.setBoundVariableForPaint(
    { type: 'SOLID', color: rgb, opacity: 1 }, 'color', v
  );
};
const findChild = (parent, name) => parent.findOne(n => n.name === name);
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

const imp = {};
for (const [k, key] of Object.entries(COMP))
  imp[k] = await figma.importComponentByKeyAsync(key);
const sty = {};
for (const [k, key] of Object.entries(STYLES)) {
  const s = await figma.importStyleByKeyAsync(key);
  sty[k] = s.id;
}
const eff = {};
for (const [k, key] of Object.entries(EFFECTS)) {
  const s = await figma.importStyleByKeyAsync(key);
  eff[k] = s.id;
}

const page = figma.currentPage;

// ── Render ──

// Icon imports (INSTANCE_SWAP targets from overrides)
const ic = {};
for (const [n, k] of Object.entries({
  'chart-bar': '40b383d1044a6d7246003bc5b1dcdbe2cc98c165',
  'list-checkbox': 'a3aa604fd736d007c4a7562e1f0da2ff91bc2b09',
  'users': 'b09639d04a393c97fb78d0d8def6608c049ff226',
  'chart-pie': '1425f86bbbf64a99123ae4d2279102c4eeb619b9',
  'cog-six-tooth': '8234a192a46356656a13805cbdaf0e94fe923311',
  'sidebar-left': '6a0cadbf3895ce5854f50c6e1445855c3966a68c',
  'moon': '9dc21071e3acbab6091f8576ccba92ff42f6a47a',
})) ic[n] = await figma.importComponentByKeyAsync(k);

// Icon fill helper
async function applyIconFills(inst, varId) {
  const vecs = inst.findAll(n => n.type === 'VECTOR' || n.type === 'BOOLEAN_OPERATION');
  for (const v of vecs) { if (v.fills?.length) try { v.fills = [await SOLID(varId)]; } catch {} }
}

// ── Frame ──
const frame = figma.createFrame();
frame.name = 'Dashboard';
frame.resize(1440, 900);
frame.layoutMode = 'HORIZONTAL';
frame.primaryAxisSizingMode = 'FIXED';
frame.counterAxisSizingMode = 'FIXED';
frame.clipsContent = true;
frame.fills = [await SOLID(T.backgroundsBgSubtle)];

// ── Sidebar ──
const sidebar = imp.Sidebar.createInstance();
frame.appendChild(sidebar);
sidebar.layoutSizingVertical = 'FILL';
setProps(sidebar, { Type: 'Main' });

// Sidebar header
const sHeader = sidebar.findOne(n => n.name === 'Sidebar Header');
if (sHeader) {
  setProps(sHeader, { Type: 'Main', State: 'Default' });
  await applyIconFills(sHeader, T.foregroundsFgMuted);
  const av = sHeader.findOne(n => n.name === 'Avatar');
  if (av) setProps(av, { Initials: 'L', Content: 'Image', Type: 'Squared', Size: 'Xsmall (24)' });
}

// Dotted divider
const dividers = sidebar.findAll(n => n.name === 'Horizontal Divider');
if (dividers[0]) setProps(dividers[0], { Type: 'Dots' });
if (dividers[1]) dividers[1].visible = false;

// Menu items (data.yaml nav.menu)
const menu = sidebar.findOne(n => n.name === 'Menu');
const menuItems = menu?.children?.filter(c => c.name === 'Sidebar List Item') || [];
const NAV = [
  { title: 'Dashboard', icon: 'chart-bar', state: 'Selected', fill: T.foregroundsFgBase },
  { title: 'Tasks', icon: 'list-checkbox', state: 'Default', fill: T.foregroundsFgSubtle },
  { title: 'Team', icon: 'users', state: 'Default', fill: T.foregroundsFgSubtle },
  { title: 'Reports', icon: 'chart-pie', state: 'Default', fill: T.foregroundsFgSubtle },
];
for (let i = 0; i < menuItems.length; i++) {
  if (i < NAV.length) {
    setProps(menuItems[i], {
      Title: NAV[i].title, Icon: ic[NAV[i].icon].id, 'Show Icon': true,
      Contrast: 'Light', Type: 'Parent', State: NAV[i].state, Open: 'True',
    });
    await applyIconFills(menuItems[i], NAV[i].fill);
  } else {
    menuItems[i].visible = false;
  }
}

// Extensions — hide all, show only Settings (3rd item in 2nd group)
const allExts = sidebar.findAll(n => n.name === 'Extensions');
for (const ext of allExts)
  for (const c of (ext.children || []))
    if (c.name === 'Sidebar List Item') c.visible = false;
const ext2Items = allExts[1]?.children?.filter(c => c.name === 'Sidebar List Item') || [];
if (ext2Items[2]) {
  ext2Items[2].visible = true;
  setProps(ext2Items[2], {
    Title: 'Settings', Icon: ic['cog-six-tooth'].id, 'Show Icon': true,
    Contrast: 'Light', Type: 'Parent', State: 'Default', Open: 'True',
  });
  await applyIconFills(ext2Items[2], T.foregroundsFgSubtle);
}

// Vertical divider
const vd = sidebar.findOne(n => n.name === 'Vertical Divider');
if (vd) setProps(vd, { Type: 'Line' });

// ── Content Area ──
const content = figma.createFrame();
content.name = 'Content Area';
frame.appendChild(content);
content.layoutMode = 'VERTICAL';
content.layoutSizingHorizontal = 'FILL';
content.layoutSizingVertical = 'FILL';
content.clipsContent = false;
content.fills = [];

// ── Topbar ──
const topbar = imp.Topbar.createInstance();
content.appendChild(topbar);
topbar.layoutSizingHorizontal = 'FILL';
setProps(topbar, { 'Show Breadcrumbs Group': true, Device: 'Desktop' });

// Topbar icon button
const tbIcon = topbar.findOne(n => n.name === 'IconButton');
if (tbIcon) {
  setProps(tbIcon, { Icon: ic['sidebar-left'].id, Contrast: 'Light', Style: 'Transparent Muted', Size: 'Small (28)', State: 'Default' });
  await applyIconFills(tbIcon, T.foregroundsFgMuted);
}

// Breadcrumbs
const bc = topbar.findOne(n => n.name === 'Breadcrumbs Group');
if (bc) {
  setProps(bc, { 'Show Level 1': true, 'Show Level 2': false, 'Show Level 3': false, Theme: 'Muted' });
  const bcItems = bc.findAll(n => n.name === 'Breadcrumb Items');
  if (bcItems[0]) setProps(bcItems[0], { Breadcrumb: 'Dashboard', State: 'Default', Variant: 'Text', Theme: 'Subtle' });
  for (let i = 1; i < bcItems.length; i++) bcItems[i].visible = false;
  const tris = bc.findAll(n => n.name === 'triangle-right-mini');
  for (const t of tris) t.visible = false;
  await applyIconFills(bc, T.foregroundsFgMuted);
}

// Search hidden
const search = topbar.findOne(n => n.name === 'Search Input');
if (search) search.visible = false;

// Right — bell hidden, moon visible, user badge
const rightFrame = topbar.findOne(n => n.name === 'Frame 2171');
if (rightFrame) {
  const btns = rightFrame.children?.filter(c => c.name === 'IconButton') || [];
  if (btns[0]) btns[0].visible = false;
  if (btns[1]) {
    setProps(btns[1], { Icon: ic['moon'].id, Contrast: 'Light', Style: 'Transparent Muted', Size: 'Small (28)', State: 'Default' });
    await applyIconFills(btns[1], T.foregroundsFgMuted);
  }
}
const badge = topbar.findOne(n => n.name === 'User Badge');
if (badge) {
  setProps(badge, { Name: 'Ludvig Rask', State: 'Default' });
  const bAvatar = badge.findOne(n => n.name === 'Avatar');
  if (bAvatar) setProps(bAvatar, { Initials: 'L', Content: 'Image', Type: 'Rounded', Size: '2xsmall (20)' });
}
const tbDiv = topbar.findOne(n => n.name === 'Horizontal Divider');
if (tbDiv) setProps(tbDiv, { Type: 'Line' });

// ── Page Body ──
const body = figma.createFrame();
body.name = 'Page Body';
content.appendChild(body);
body.layoutMode = 'VERTICAL';
body.layoutSizingHorizontal = 'FILL';
body.layoutSizingVertical = 'FILL';
body.itemSpacing = 16;
body.paddingTop = body.paddingRight = body.paddingBottom = body.paddingLeft = 32;
body.setBoundVariable('itemSpacing', await V(T.spacing16));
body.setBoundVariable('paddingLeft', await V(T.spacing32));
body.setBoundVariable('paddingTop', await V(T.spacing32));
body.setBoundVariable('paddingRight', await V(T.spacing32));
body.setBoundVariable('paddingBottom', await V(T.spacing32));
body.clipsContent = false;
body.fills = [];

// Page Title
const title = figma.createText();
title.name = 'Page Title';
body.appendChild(title);
title.characters = 'Dashboard';
await title.setTextStyleIdAsync(sty.headersWebsH3);
title.fills = [await SOLID(T.foregroundsFgBase)];

page.appendChild(frame);
figma.viewport.scrollAndZoomIntoView([frame]);
return 'Dashboard rendered';

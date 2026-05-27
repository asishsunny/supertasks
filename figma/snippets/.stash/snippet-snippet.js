// snippet-snippet.js — Shell frame (1440×900): Sidebar + Topbar + Page Body
// Edit PAGE block only. Content snippets inject into the returned content frame.

// ── PAGE config ──────────────────────────────────────────────────────────────
const PAGE = {
  pageName:    'Screens',
  frameName:   'Snippet',
  frameX:      0,
  frameY:      0,
  height:      900,
  selectedNav: 'Dashboard',
  pageTitle:   'Dashboard',
};

// ── Component keys ──────────────────────────────────────────────────────────
const COMP = {
  Sidebar:       '269e4e534eeb952a4d7308b3fc9f75e3e79e01ee', // Sidebar: Type=Main
  Topbar:        'c27955f90e872b2b79e6ee7f8c7b4aed7372a4e5', // Topbar: Device=Desktop
  SidebarItem:   '8a055a283aa3f83271b2c75a8b37528a3d1e70fd', // Sidebar List Item: Selected Parent
  SidebarItemDef:'69801c50663dfb9f8c21908f7b080d13665d1480', // Sidebar List Item: Default Parent
  Divider:       'ac8568e481d6d7efd278bda37b8fa9cd1ecbf44f', // Horizontal Divider: Type=Line
  DividerDots:   'a7c39fcade77d5687ed8e7cf13245689e8304cc7', // Horizontal Divider: Type=Dots
  IconButton:    '31588456aa1bd491061c5fcdeb04d0d7c87bcdf7', // IconButton: Transparent Muted Small
  BreadcrumbItem:'77bf0447ee0c336a8c18f16353640b2cbb99034c', // Breadcrumb Items: Subtle
  UserBadge:     'cebc64f03e30adccdc0a57c6b4511646249bdb91', // User Badge: State=Default
};

// ── Icon component keys (for INSTANCE_SWAP) ─────────────────────────────────
const ICONS = {
  chartbar:       '40b383d1044a6d7246003bc5b1dcdbe2cc98c165',
  listcheckbox:   'a3aa604fd736d007c4a7562e1f0da2ff91bc2b09',
  users:          'b09639d04a393c97fb78d0d8def6608c049ff226',
  chartpie:       '1425f86bbbf64a99123ae4d2279102c4eeb619b9',
  cogsixtooth:    '8234a192a46356656a13805cbdaf0e94fe923311',
  sidebarleft:    '6a0cadbf3895ce5854f50c6e1445855c3966a68c',
  moon:           '9dc21071e3acbab6091f8576ccba92ff42f6a47a',
};

// ── Text style keys ─────────────────────────────────────────────────────────
const STYLES = {
  H3: 'adf130ea9e157e6e8bc1ec13b475668221cc831d', // Headers Webs/H3
};

// ── Effect styles ───────────────────────────────────────────────────────────
const EFFECTS = {
  borderBase: '45005916e55e835426a4c5fe420463b20c369a24', // Light/Borders/base
};

// ── Token variable IDs ──────────────────────────────────────────────────────
const T = {
  bgSubtle:      'VariableID:0f057c5e79ecd569f3ddf9031ff14eb8d7641e08/17968:46',   // backgrounds/bg-subtle
  bgBase:        'VariableID:a426e4a84e9b344ec6a576ccd94d08a189532d69/17968:59',   // backgrounds/bg-base
  fgBase:        'VariableID:155eba32b1cd754e3d29d82fddd40e387753959f/17968:47',   // foregrounds/fg-base
  fgSubtle:      'VariableID:77e30ee7a903973aac43f720b387e89390946184/17968:158',  // foregrounds/fg-subtle
  fgMuted:       'VariableID:f3577a26be5ee797eeb1a13b34c96237cdf238bb/17968:159',  // foregrounds/fg-muted
  borderBase:    'VariableID:ffbe5f08347e6455d869b13eaaab921056481e06/17968:192',  // borders/border-base
  borderStrong:  'VariableID:52e370e3808de877c43ce2fea5c2501da5affab7/17968:174',  // borders/border-strong
  sp4:           'VariableID:df05201f6fbd29c44c88e87f4b8842f9c0e94bf1/6996:1900',  // spacing-4
  sp8:           'VariableID:0732ac1e93c221a6e6f7eb84ed8b00b62a9d57ef/6996:1898',  // spacing-8
  sp12:          'VariableID:77559b65a36808508ee6736034dc13c55e640514/6996:1895',  // spacing-12
  sp16:          'VariableID:66fa38c9c8238168f844eee4b16541d4462b42c2/6996:1894',  // spacing-16
  sp32:          'VariableID:3abe2da048270a211905ea8a64ae6689bc54b025/6996:1893',  // spacing-32
  rad6:          'VariableID:b3cc1de7f52baa50145b5a621d3e0752e2593732/6996:1712',  // radius-6
};

// ── Frozen logic — do not edit below this line ──────────────────────────────
await figma.loadFontAsync({ family: 'Geist', style: 'Regular' });
await figma.loadFontAsync({ family: 'Geist', style: 'Medium' });
await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });

await figma.loadAllPagesAsync();
const page = figma.root.children.find(p => p.name === PAGE.pageName);
if (!page) throw new Error(`Page "${PAGE.pageName}" not found`);
await figma.setCurrentPageAsync(page);

const old = page.children.find(n => n.name === PAGE.frameName);
if (old) old.remove();

const V = async (id) => {
  const v = await figma.variables.getVariableByIdAsync(id);
  if (!v) {
    const m = id.match(/VariableID:([a-f0-9]+)\//);
    if (m) return await figma.variables.importVariableByKeyAsync(m[1]);
    throw new Error(`Variable not found: ${id}`);
  }
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

const icons = {};
for (const [k, key] of Object.entries(ICONS))
  icons[k] = await figma.importComponentByKeyAsync(key);

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

// ── DATA ────────────────────────────────────────────────────────────────────
const DATA = {
  appName: 'SuperTasks',
  nav: [
    { title: 'Dashboard', icon: 'chartbar',     state: 'Selected' },
    { title: 'Tasks',     icon: 'listcheckbox', state: 'Default' },
    { title: 'Team',      icon: 'users',        state: 'Default' },
    { title: 'Reports',   icon: 'chartpie',     state: 'Default' },
  ],
  extensions: [
    { title: 'Settings', icon: 'cogsixtooth', state: 'Default' },
  ],
  user: { name: 'Ludvig Rask', initials: 'L' },
};

// ── Root frame ──────────────────────────────────────────────────────────────
const root = figma.createFrame();
root.name = PAGE.frameName;
root.resize(1440, PAGE.height);
root.layoutMode = 'HORIZONTAL';
root.primaryAxisSizingMode = 'FIXED';
root.counterAxisSizingMode = 'FIXED';
root.itemSpacing = 0;
root.clipsContent = true;
root.fills = [await SOLID(T.bgSubtle)];
page.appendChild(root);

// ── Sidebar ─────────────────────────────────────────────────────────────────
const sidebar = imp.Sidebar.createInstance();
root.appendChild(sidebar);
sidebar.layoutSizingVertical = 'FILL';

const sInner = sidebar.children.find(n => n.name === 'Sidebar');
const top = sInner?.children.find(n => n.name === 'Top');

// Header — set app name
const header = top?.children.find(n => n.name === 'Header');
if (header) {
  const sidebarHeader = header.findOne(n => n.type === 'INSTANCE' && n.name === 'Sidebar Header');
  if (sidebarHeader) {
    setProps(sidebarHeader, { Type: 'Main', State: 'Default' });
    const acme = sidebarHeader.findOne(n => n.type === 'TEXT' && n.name === 'Acme');
    if (acme) { await figma.loadFontAsync(acme.fontName); acme.characters = DATA.appName; }
  }
}

// Menu nav items
const menu = top?.children.find(n => n.name === 'Menu');
if (menu) {
  const items = menu.children.filter(n => n.type === 'INSTANCE');
  for (let i = 0; i < items.length; i++) {
    const navItem = DATA.nav[i];
    if (!navItem) { items[i].visible = false; continue; }
    items[i].visible = true;
    setProps(items[i], {
      Title: navItem.title,
      'Show Icon': true,
      Contrast: 'Light',
      Type: 'Parent',
      State: navItem.state,
      Open: 'True',
    });
    const iconComp = icons[navItem.icon];
    if (iconComp) setProps(items[i], { Icon: iconComp.id });
    // Re-set title after variant swap
    const titleText = items[i].findOne(n => n.type === 'TEXT' && n.name === 'Title');
    if (titleText) { await figma.loadFontAsync(titleText.fontName); titleText.characters = navItem.title; }
    // Icon fills — selected uses fgBase, default uses fgSubtle
    const iconFill = await SOLID(navItem.state === 'Selected' ? T.fgBase : T.fgSubtle);
    for (const vec of items[i].findAll(n => n.type === 'VECTOR' || n.type === 'BOOLEAN_OPERATION')) {
      if (vec.fills?.length) vec.fills = [iconFill];
    }
  }
}

// Horizontal dividers — first one: Type=Dots, second: hidden
const dividers = top?.findAll(n => n.type === 'INSTANCE' && n.name === 'Horizontal Divider') || [];
if (dividers[0]) {
  dividers[0].swapComponent(imp.DividerDots);
  setProps(dividers[0], { Type: 'Dots' });
}
if (dividers[1]) dividers[1].visible = false;

// Extensions — Settings only
const extensions = top?.children.filter(n => n.name === 'Extensions') || [];
for (const ext of extensions) {
  const extItems = ext.children?.filter(n => n.type === 'INSTANCE') || [];
  let settingsFound = false;
  for (const item of extItems) {
    const textNode = item.findOne(n => n.type === 'TEXT');
    if (!settingsFound && textNode) {
      // First visible item = Settings
      const extData = DATA.extensions[0];
      if (extData) {
        item.visible = true;
        settingsFound = true;
        setProps(item, {
          Title: extData.title,
          'Show Icon': true,
          Contrast: 'Light',
          Type: 'Parent',
          State: extData.state,
          Open: 'True',
        });
        const iconComp = icons[extData.icon];
        if (iconComp) setProps(item, { Icon: iconComp.id });
        const titleText = item.findOne(n => n.type === 'TEXT' && n.name === 'Title');
        if (titleText) { await figma.loadFontAsync(titleText.fontName); titleText.characters = extData.title; }
        const fgSubtleFill = await SOLID(T.fgSubtle);
        for (const vec of item.findAll(n => n.type === 'VECTOR' || n.type === 'BOOLEAN_OPERATION')) {
          if (vec.fills?.length) vec.fills = [fgSubtleFill];
        }
      }
    } else {
      item.visible = false;
    }
  }
  if (!settingsFound) ext.visible = true;
}

// Vertical divider
const vDiv = sidebar.findOne(n => n.type === 'INSTANCE' && n.name === 'Vertical Divider');
if (vDiv) setProps(vDiv, { Type: 'Line' });

// ── Content Area ────────────────────────────────────────────────────────────
const contentArea = figma.createFrame();
contentArea.name = 'Content Area';
contentArea.fills = [];
contentArea.layoutMode = 'VERTICAL';
contentArea.primaryAxisSizingMode = 'FIXED';
contentArea.counterAxisSizingMode = 'FIXED';
contentArea.resize(1440 - sidebar.width, PAGE.height);
contentArea.itemSpacing = 0;
contentArea.clipsContent = false;
root.appendChild(contentArea);

// ── Topbar ──────────────────────────────────────────────────────────────────
const topbar = imp.Topbar.createInstance();
contentArea.appendChild(topbar);
topbar.layoutSizingHorizontal = 'FILL';

setProps(topbar, { 'Show Breadcrumbs Group': true, Device: 'Desktop' });

// Sidebar toggle icon
const leftActions = topbar.findOne(n => n.name === 'Left');
const sidebarBtn = leftActions?.findOne(n => n.type === 'INSTANCE' && n.name === 'IconButton');
if (sidebarBtn) {
  setProps(sidebarBtn, { Contrast: 'Light', Style: 'Transparent Muted', Size: 'Small (28)', State: 'Default' });
  setProps(sidebarBtn, { Icon: icons.sidebarleft.id });
  const mutedFill = await SOLID(T.fgMuted);
  for (const vec of sidebarBtn.findAll(n => n.type === 'VECTOR' || n.type === 'BOOLEAN_OPERATION')) {
    if (vec.fills?.length) vec.fills = [mutedFill];
  }
}

// Breadcrumbs
const bcGroup = topbar.findOne(n => n.name === 'Breadcrumbs Group');
if (bcGroup) {
  setProps(bcGroup, { 'Show Level 1': true, 'Show Level 2': false, 'Show Level 3': false, Theme: 'Muted' });
  const bcItems = bcGroup.findAll(n => n.type === 'INSTANCE' && n.name === 'Breadcrumb Items');
  if (bcItems[0]) setProps(bcItems[0], { Breadcrumb: PAGE.pageTitle, State: 'Default', Variant: 'Text', Theme: 'Subtle' });
  // Hide separators and extra breadcrumbs
  const triangles = bcGroup.findAll(n => n.name.includes('triangle'));
  for (const t of triangles) t.visible = false;
  if (bcItems[1]) bcItems[1].visible = false;
  if (bcItems[2]) bcItems[2].visible = false;
}

// Search input — hidden
const searchInput = topbar.findOne(n => n.name === 'Search Input');
if (searchInput) searchInput.visible = false;

// Right actions
const rightFrame = topbar.findOne(n => n.name === 'Frame 2171');
const iconBtns = rightFrame?.children.filter(n => n.type === 'INSTANCE' && n.name === 'IconButton') || [];
if (iconBtns[0]) iconBtns[0].visible = false;
if (iconBtns[1]) {
  setProps(iconBtns[1], { Contrast: 'Light', Style: 'Transparent Muted', Size: 'Small (28)', State: 'Default' });
  setProps(iconBtns[1], { Icon: icons.moon.id });
  const mutedFill = await SOLID(T.fgMuted);
  for (const vec of iconBtns[1].findAll(n => n.type === 'VECTOR' || n.type === 'BOOLEAN_OPERATION')) {
    if (vec.fills?.length) vec.fills = [mutedFill];
  }
}

// User badge
const userBadge = topbar.findOne(n => n.type === 'INSTANCE' && n.name === 'User Badge');
if (userBadge) {
  setProps(userBadge, { Name: DATA.user.name, State: 'Default' });
  const avatar = userBadge.findOne(n => n.type === 'INSTANCE' && n.name === 'Avatar');
  if (avatar) setProps(avatar, { Initials: DATA.user.initials, Content: 'Image', Type: 'Rounded', Size: '2xsmall (20)' });
  const nameText = userBadge.findOne(n => n.type === 'TEXT');
  if (nameText) { await figma.loadFontAsync(nameText.fontName); nameText.characters = DATA.user.name; }
}

// Topbar bottom divider
const topbarDiv = topbar.findOne(n => n.type === 'INSTANCE' && n.name === 'Horizontal Divider');
if (topbarDiv) setProps(topbarDiv, { Type: 'Line' });

// ── Page Body ───────────────────────────────────────────────────────────────
const pageBody = figma.createFrame();
pageBody.name = 'Page Body';
pageBody.fills = [];
pageBody.layoutMode = 'VERTICAL';
pageBody.primaryAxisSizingMode = 'AUTO';
pageBody.counterAxisSizingMode = 'FIXED';
pageBody.resize(1440 - sidebar.width, 80);
contentArea.appendChild(pageBody);
pageBody.layoutSizingHorizontal = 'FILL';
pageBody.layoutSizingVertical = 'HUG';
pageBody.setBoundVariable('paddingTop', await V(T.sp32));
pageBody.setBoundVariable('paddingRight', await V(T.sp32));
pageBody.setBoundVariable('paddingBottom', await V(T.sp16));
pageBody.setBoundVariable('paddingLeft', await V(T.sp32));
pageBody.setBoundVariable('itemSpacing', await V(T.sp16));
pageBody.clipsContent = false;

const titleNode = figma.createText();
titleNode.name = 'Page Title';
titleNode.characters = PAGE.pageTitle;
await titleNode.setTextStyleIdAsync(sty.H3);
titleNode.fills = [await SOLID(T.fgBase)];
pageBody.appendChild(titleNode);

// ── Content (injection point for child snippets) ────────────────────────────
const content = figma.createFrame();
content.name = 'Content';
content.fills = [];
content.layoutMode = 'VERTICAL';
content.primaryAxisSizingMode = 'FIXED';
content.counterAxisSizingMode = 'FIXED';
content.resize(1440 - sidebar.width, PAGE.height - topbar.height - pageBody.height);
contentArea.appendChild(content);
content.layoutSizingHorizontal = 'FILL';
content.layoutSizingVertical = 'FILL';
content.setBoundVariable('paddingLeft', await V(T.sp32));
content.setBoundVariable('paddingRight', await V(T.sp32));
content.paddingTop = 0;
content.setBoundVariable('paddingBottom', await V(T.sp16));
content.setBoundVariable('itemSpacing', await V(T.sp16));
content.clipsContent = false;

return { rootId: root.id, contentId: content.id, sidebarW: sidebar.width, topbarH: topbar.height };

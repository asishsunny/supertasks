// shell-snippet.js — Snippet (1440×900)

// ── DATA (from data.yaml + views.yaml) ──
/* __DATA__ */
const DATA = {
  pageName: 'Dashboard',
  frameName: 'Dashboard v2',
  app: { name: 'SuperTasks', initials: 'L' },
  activeNav: 'Dashboard',
  breadcrumbs: ['Dashboard'],
  pageTitle: 'Dashboard',
  user: { name: 'Ludvig Rask', initials: 'L' },
  nav: [
    { title: 'Dashboard', iconKey: 'chartbar',     state: 'Selected' },
    { title: 'Tasks',     iconKey: 'listcheckbox', state: 'Default' },
    { title: 'Team',      iconKey: 'users',        state: 'Default' },
    { title: 'Reports',   iconKey: 'chartpie',     state: 'Default' },
  ],
  extensions: [
    { title: 'Settings', iconKey: 'cogsixtooth', state: 'Default' },
  ],
};

// ── Component keys ──
const COMP = {
  TypeMain: '269e4e534eeb952a4d7308b3fc9f75e3e79e01ee', // Type=Main
  DeviceDesktop: 'c27955f90e872b2b79e6ee7f8c7b4aed7372a4e5', // Device=Desktop
  chartbar: '40b383d1044a6d7246003bc5b1dcdbe2cc98c165', // chart-bar
  listcheckbox: 'a3aa604fd736d007c4a7562e1f0da2ff91bc2b09', // list-checkbox
  users: 'b09639d04a393c97fb78d0d8def6608c049ff226', // users
  chartpie: '1425f86bbbf64a99123ae4d2279102c4eeb619b9', // chart-pie
  cogsixtooth: '8234a192a46356656a13805cbdaf0e94fe923311', // cog-six-tooth
  sidebarleft: '6a0cadbf3895ce5854f50c6e1445855c3966a68c', // sidebar-left
  moon: '9dc21071e3acbab6091f8576ccba92ff42f6a47a', // moon
  Button: '576fe1cbf94e7d7101e6dd2aa718e6162cb8eaf4', // Style=Primary, Size=Small (28), State=Default
  plusmini: 'f287d241694114e81aacb73f1acb87bda5b269fa', // plus-mini
  TypeMainStateDefault: 'afdcda3bcfb54d765fccee20feead291324c1c20', // Type=Main, State=Default
  ContentImageTypeSquaredSizeXsmall24: 'd465fdd0d1a0b364ae609b8ba5c1d4fbddf47ec2', // Content=Image, Type=Squared, Size=Xsmall (24)
  TypeDots: 'a7c39fcade77d5687ed8e7cf13245689e8304cc7', // Type=Dots
  ContrastLightTypeParentStateSelectedOpenTrue: '8a055a283aa3f83271b2c75a8b37528a3d1e70fd', // Contrast=Light, Type=Parent, State=Selected, Open=True
  ContrastLightTypeParentStateDefaultOpenTrue: '69801c50663dfb9f8c21908f7b080d13665d1480', // Contrast=Light, Type=Parent, State=Default, Open=True
  TypeLine: 'ac8568e481d6d7efd278bda37b8fa9cd1ecbf44f', // Type=Line
  ContrastLightStyleTransparentMutedSizeSmall28StateDefault: '31588456aa1bd491061c5fcdeb04d0d7c87bcdf7', // Contrast=Light, Style=Transparent Muted, Size=Small (28), State=Default
  ThemeMuted: '22db401f1503f15cf431c088fcdfe24e1c710768', // Theme=Muted
  StateDefaultVariantTextThemeSubtle: '77bf0447ee0c336a8c18f16353640b2cbb99034c', // State=Default, Variant=Text, Theme=Subtle
  StateDefault: 'cebc64f03e30adccdc0a57c6b4511646249bdb91', // State=Default
  ContentImageTypeRoundedSize2xsmall20: '572b8073571d998a9579f9107c1e5ada91263f26', // Content=Image, Type=Rounded, Size=2xsmall (20)
  TypeLine_5b0928: '5b0928ffff3b77cdb0a9de765092cb23d1e04657', // Type=Line
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
  backgroundsBgSubtle: 'VariableID:0f057c5e79ecd569f3ddf9031ff14eb8d7641e08/17968:46', // backgrounds/bg-subtle
  spacing12: 'VariableID:77559b65a36808508ee6736034dc13c55e640514/6996:1895', // spacing-12
  spacing2: 'VariableID:2a22c96cab78cb41bf32ea26aec1c028be9b1b4f/6996:1901', // spacing-2
  spacing8: 'VariableID:0732ac1e93c221a6e6f7eb84ed8b00b62a9d57ef/6996:1898', // spacing-8
  radius6: 'VariableID:b3cc1de7f52baa50145b5a621d3e0752e2593732/6996:1712', // radius-6
  backgroundsBgBase: 'VariableID:a426e4a84e9b344ec6a576ccd94d08a189532d69/17968:59', // backgrounds/bg-base
  foregroundsFgBase: 'VariableID:155eba32b1cd754e3d29d82fddd40e387753959f/17968:47', // foregrounds/fg-base
  fontSizeSmall: 'VariableID:08c154b96f5d46323f201e407bb748cdc453d52e/11733:4', // font/size/small
  fontSizeMedium: 'VariableID:e00f44ed717f5b1067887b5278e30cb8094fb68b/6996:1821', // font/size/medium
  fontFamilyBody: 'VariableID:e06d9db3d6ed02de73697eae005622387ab0e8b6/7870:94', // font/family/body
  fontWeight500: 'VariableID:f404fa95f32ace66073174f8f325798a84ca57e4/6996:1829', // font/weight/500
  foregroundsFgMuted: 'VariableID:f3577a26be5ee797eeb1a13b34c96237cdf238bb/17968:159', // foregrounds/fg-muted
  bordersBorderStrong: 'VariableID:52e370e3808de877c43ce2fea5c2501da5affab7/17968:174', // borders/border-strong
  backgroundsBgSubtlePressed: 'VariableID:94a195327cd83f2264f49dfd65811a5eb9d8cbce/17968:210', // backgrounds/bg-subtle-pressed
  foregroundsFgSubtle: 'VariableID:77e30ee7a903973aac43f720b387e89390946184/17968:158', // foregrounds/fg-subtle
  bordersBorderBase: 'VariableID:ffbe5f08347e6455d869b13eaaab921056481e06/17968:192', // borders/border-base
  buttonsButtonTransparent: 'VariableID:659b67f824931d5093943abe4cb83a19847a513b/13723:1527', // buttons/button-transparent
  spacing4: 'VariableID:df05201f6fbd29c44c88e87f4b8842f9c0e94bf1/6996:1900', // spacing-4
  fontSizeXsmall: 'VariableID:2b5ad447e8b97d3131afd9c9d727efaeca69e146/11733:9', // font/size/xsmall
  radiusFull: 'VariableID:0a4f8e80cf597d7004f537b5ce0ce965dfcf9015/6996:1724', // radius-full
  backgroundsBgField: 'VariableID:bc019e1f0a717d049b899d12f32e60c6f3ee6216/17968:6', // backgrounds/bg-field
  fontWeight400: 'VariableID:aa9a1d9edce50530b1c57295d885e98682159acb/6996:1823', // font/weight/400
  spacing10: 'VariableID:e6ada489537c0313d703fec4b320a30e4ea37e29/6996:1897', // spacing-10
  spacing16: 'VariableID:66fa38c9c8238168f844eee4b16541d4462b42c2/6996:1894', // spacing-16
  spacing32: 'VariableID:3abe2da048270a211905ea8a64ae6689bc54b025/6996:1893', // spacing-32
  fontFamilyHeader: 'VariableID:d58f1fdf63b93407b5e27891010af340e2384e9d/7870:35', // font/family/header
  spacing0: 'VariableID:a1c28706a42ef7439875a76d07c22441141b8742/6996:1903', // spacing-0
  contrastFgSecondary: 'VariableID:1fadca7b2141689906e029c4f5596cc58dd57f00/13723:1531', // contrast/contrast-fg-secondary
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
async function applyIconFills(parent, varId) {
  const vectors = parent.findAll(n => n.type === 'VECTOR' || n.type === 'BOOLEAN_OPERATION');
  if (!vectors.length) return;
  const fill = await SOLID(varId);
  for (const v of vectors) v.fills = [fill];
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
await figma.loadAllPagesAsync();
let targetPage = figma.root.children.find(p => p.name === DATA.pageName);
if (!targetPage) { targetPage = figma.createPage(); targetPage.name = DATA.pageName; }
await figma.setCurrentPageAsync(targetPage);

const existing = targetPage.children.find(n => n.name === DATA.frameName);
if (existing) existing.remove();

// Shell frame — 1440×900
const shell = figma.createFrame();
shell.name = DATA.frameName;
shell.resize(1440, 900);
shell.layoutMode = 'HORIZONTAL';
shell.primaryAxisSizingMode = 'FIXED';
shell.counterAxisSizingMode = 'FIXED';
shell.itemSpacing = 0;
shell.paddingTop = 0; shell.paddingRight = 0; shell.paddingBottom = 0; shell.paddingLeft = 0;
shell.clipsContent = true;
shell.fills = [await SOLID(T.backgroundsBgSubtle)];
targetPage.appendChild(shell);

// ── Sidebar ──
const sidebar = imp.TypeMain.createInstance();
sidebar.name = 'Sidebar';
shell.appendChild(sidebar);
sidebar.layoutSizingVertical = 'FILL';

// Sidebar header text
const sidebarInner = findChild(sidebar, 'Sidebar');
if (sidebarInner) {
  const headerArea = findChild(sidebarInner, 'Top');
  if (headerArea) {
    const header = headerArea.findOne(n => n.name === 'Sidebar Header');
    if (header) {
      setProps(header, { 'Type': 'Main', 'State': 'Default' });
      const acmeText = header.findOne(n => n.name === 'Acme' && n.type === 'TEXT');
      if (acmeText) acmeText.characters = DATA.app.name;
    }

    // Nav items
    const menu = findChild(headerArea, 'Menu');
    if (menu) {
      const menuItems = menu.children.filter(n => n.type === 'INSTANCE' && n.name === 'Sidebar List Item');
      for (let i = 0; i < Math.min(DATA.nav.length, menuItems.length); i++) {
        const item = menuItems[i];
        const d = DATA.nav[i];
        const iconComp = imp[d.iconKey];
        setProps(item, {
          'Title': d.title,
          'Icon': iconComp.id,
          'Show Icon': true,
          'Contrast': 'Light',
          'Type': 'Parent',
          'State': d.state,
          'Open': 'True',
        });
        const fillToken = d.state === 'Selected' ? T.foregroundsFgBase : T.foregroundsFgSubtle;
        await applyIconFills(item, fillToken);
      }
    }

    // Hide extra menu items beyond nav count
    const allMenuItems = menu ? menu.children.filter(n => n.type === 'INSTANCE' && n.name === 'Sidebar List Item') : [];
    for (let i = DATA.nav.length; i < allMenuItems.length; i++) {
      allMenuItems[i].visible = false;
    }

    // Extensions (Settings)
    const extensions = headerArea.findAll(n => n.name === 'Extensions');
    const extSection = extensions.length > 1 ? extensions[1] : extensions[0];
    if (extSection) {
      const extItems = extSection.children.filter(n => n.type === 'INSTANCE' && n.name === 'Sidebar List Item' && n.visible);
      for (let i = 0; i < extItems.length; i++) {
        if (i < DATA.extensions.length) {
          const d = DATA.extensions[i];
          const iconComp = imp[d.iconKey];
          setProps(extItems[i], {
            'Title': d.title,
            'Icon': iconComp.id,
            'Show Icon': true,
            'Contrast': 'Light',
            'Type': 'Parent',
            'State': d.state,
            'Open': 'True',
          });
          const extFill = d.state === 'Selected' ? T.foregroundsFgBase : T.foregroundsFgSubtle;
          await applyIconFills(extItems[i], extFill);
        } else {
          extItems[i].visible = false;
        }
      }
    }
  }
}

// ── Content Area ──
const content = figma.createFrame();
content.name = 'Content Area';
content.layoutMode = 'VERTICAL';
content.primaryAxisSizingMode = 'FIXED';
content.counterAxisSizingMode = 'FIXED';
content.itemSpacing = 0;
content.paddingTop = 0; content.paddingRight = 0; content.paddingBottom = 0; content.paddingLeft = 0;
content.fills = [];
content.clipsContent = false;
shell.appendChild(content);
content.layoutSizingHorizontal = 'FILL';
content.layoutSizingVertical = 'FILL';

// ── Topbar ──
const topbar = imp.DeviceDesktop.createInstance();
topbar.name = 'Topbar';
content.appendChild(topbar);
topbar.layoutSizingHorizontal = 'FILL';
setProps(topbar, { 'Show Breadcrumbs Group': true, 'Device': 'Desktop' });

// Topbar — sidebar toggle icon
const sidebarBtn = topbar.findOne(n => n.name === 'IconButton' && n.type === 'INSTANCE');
if (sidebarBtn) {
  setProps(sidebarBtn, {
    'Icon': imp.sidebarleft.id,
    'Contrast': 'Light',
    'Style': 'Transparent Muted',
    'Size': 'Small (28)',
    'State': 'Default',
  });
  await applyIconFills(sidebarBtn, T.foregroundsFgMuted);
}

// Topbar — breadcrumbs
const breadcrumbsGroup = topbar.findOne(n => n.name === 'Breadcrumbs Group' && n.type === 'INSTANCE');
if (breadcrumbsGroup) {
  setProps(breadcrumbsGroup, {
    'Show Level 1': true,
    'Show Level 2': DATA.breadcrumbs.length >= 2,
    'Show Level 3': DATA.breadcrumbs.length >= 3,
    'Theme': 'Muted',
  });
  const bcItems = breadcrumbsGroup.findAll(n => n.name === 'Breadcrumb Items' && n.type === 'INSTANCE');
  for (let i = 0; i < Math.min(DATA.breadcrumbs.length, bcItems.length); i++) {
    setProps(bcItems[i], { 'Breadcrumb': DATA.breadcrumbs[i], 'State': 'Default', 'Variant': 'Text', 'Theme': 'Subtle' });
  }
}

// Topbar — hide search
const searchInput = topbar.findOne(n => n.name === 'Search Input' && n.type === 'INSTANCE');
if (searchInput) searchInput.visible = false;

// Topbar — right actions: only moon icon
const rightFrame = topbar.findOne(n => n.name === 'Frame 2171');
if (rightFrame) {
  const iconBtns = rightFrame.children.filter(n => n.type === 'INSTANCE' && n.name === 'IconButton');
  for (let i = 0; i < iconBtns.length; i++) {
    if (i === 0) {
      iconBtns[i].visible = false;
    } else {
      setProps(iconBtns[i], {
        'Icon': imp.moon.id,
        'Contrast': 'Light',
        'Style': 'Transparent Muted',
        'Size': 'Small (28)',
        'State': 'Default',
      });
      await applyIconFills(iconBtns[i], T.foregroundsFgMuted);
    }
  }
}

// Topbar — user badge
const userBadge = topbar.findOne(n => n.name === 'User Badge' && n.type === 'INSTANCE');
if (userBadge) {
  setProps(userBadge, { 'Name': DATA.user.name, 'State': 'Default' });
}

// ── Page Header (title area) ──
const pageHeader = figma.createFrame();
pageHeader.name = 'Page Body';
pageHeader.layoutMode = 'VERTICAL';
pageHeader.primaryAxisSizingMode = 'AUTO';
pageHeader.counterAxisSizingMode = 'FIXED';
pageHeader.fills = [];
pageHeader.clipsContent = false;
pageHeader.setBoundVariable('paddingTop', await V(T.spacing32));
pageHeader.setBoundVariable('paddingRight', await V(T.spacing32));
pageHeader.setBoundVariable('paddingBottom', await V(T.spacing16));
pageHeader.setBoundVariable('paddingLeft', await V(T.spacing32));
pageHeader.setBoundVariable('itemSpacing', await V(T.spacing16));
content.appendChild(pageHeader);
pageHeader.layoutSizingHorizontal = 'FILL';

const titleRow = figma.createFrame();
titleRow.name = 'Title Row';
titleRow.layoutMode = 'HORIZONTAL';
titleRow.primaryAxisSizingMode = 'FIXED';
titleRow.counterAxisSizingMode = 'AUTO';
titleRow.counterAxisAlignItems = 'CENTER';
titleRow.primaryAxisAlignItems = DATA.headerActions?.length ? 'SPACE_BETWEEN' : 'MIN';
titleRow.fills = [];
titleRow.clipsContent = false;
titleRow.itemSpacing = 0;
pageHeader.appendChild(titleRow);
titleRow.layoutSizingHorizontal = 'FILL';

const titleText = figma.createText();
titleText.name = 'Page Title';
titleText.characters = DATA.pageTitle;
await titleText.setTextStyleIdAsync(sty.headersWebsH3);
titleText.fills = [await SOLID(T.foregroundsFgBase)];
titleRow.appendChild(titleText);

if (DATA.headerActions?.length) {
  for (const action of DATA.headerActions) {
    const btn = imp.Button.createInstance();
    btn.name = action.label;
    setProps(btn, {
      'Label': action.label,
      'Show Icon Left': true,
      'Icon Left': imp[action.iconKey].id,
      'Style': 'Primary',
      'Size': 'Small (28)',
      'State': 'Default',
    });
    await applyIconFills(btn, T.contrastFgSecondary);
    titleRow.appendChild(btn);
  }
}

// ── Page Body (content slot) ──
const pageBody = figma.createFrame();
pageBody.name = 'Page Body';
pageBody.layoutMode = 'VERTICAL';
pageBody.primaryAxisSizingMode = 'FIXED';
pageBody.counterAxisSizingMode = 'FIXED';
pageBody.fills = [];
pageBody.clipsContent = false;
pageBody.setBoundVariable('paddingTop', await V(T.spacing0));
pageBody.setBoundVariable('paddingRight', await V(T.spacing32));
pageBody.setBoundVariable('paddingBottom', await V(T.spacing16));
pageBody.setBoundVariable('paddingLeft', await V(T.spacing32));
pageBody.setBoundVariable('itemSpacing', await V(T.spacing16));
content.appendChild(pageBody);
pageBody.layoutSizingHorizontal = 'FILL';
pageBody.layoutSizingVertical = 'FILL';

return {
  shellId: shell.id,
  contentSlotId: pageBody.id,
  sidebarId: sidebar.id,
  topbarId: topbar.id,
};

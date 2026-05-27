// dashboard-view.js — Composed view
// Shell + stats + charts + table

// SuperTasks shell snippet — creates app chrome (sidebar + topbar + content area).
// Edit PAGE block only. Content snippets inject into the returned content frame.

// ── PAGE config ──
const PAGE = {
  pageName:    'Screens',
  frameName: 'Dashboard View',
  frameX:      0,
  frameY:      0,
  height:      900,
  selectedNav: 'Dashboard',
  pageTitle: 'Dashboard',
  ctaLabel: 'Create task',
};

// ── Component keys ──
const COMP = {
  Sidebar: '269e4e534eeb952a4d7308b3fc9f75e3e79e01ee',
  Topbar:  'c27955f90e872b2b79e6ee7f8c7b4aed7372a4e5',
  Button:  '576fe1cbf94e7d7101e6dd2aa718e6162cb8eaf4',

  TypeHeaderAlignmentLeft: 'ea005a34a6c9afff258391b28e8bbec799b41d90', // Type=Header, Alignment=Left
  TypeLine: '5b0928ffff3b77cdb0a9de765092cb23d1e04657', // Type=Line
  TypeBaseAlignmentLeft: '779ff8da1cc85c047ae029261428f7bacfac1315', // Type=Base, Alignment=Left
  TypeUserAlignmentLeft: 'da35acd2972e192163dac6b6514f00853cb8396b', // Type=User, Alignment=Left
  TypeBadgeAlignmentLeft: '4633a6e5ea37f89117b8ce53a490adebfb1b7233', // Type=Badge, Alignment=Left
  TypeSubtleAlignmentLeft: '59549d2b30c127ec5a228a101460c6a36be64339', // Type=Subtle, Alignment=Left
  TypeStatusBadgeAlignmentLeft: 'e9125f0bc919a81f95bb83896249a4482d901b36', // Type=Status Badge, Alignment=Left
  plusmini: 'f287d241694114e81aacb73f1acb87bda5b269fa', // plus-mini
  ContentLettersTypeRoundedSize2xsmall20: '841e9ed068f6479e054d61b80872a848cde779c6', // Content=Letters, Type=Rounded, Size=2xsmall (20)
  Size2xsmall20StateNeutralRadiusRounded: '2708147d47326c65f87268de856bcf636e5c5ca6', // Size=2xsmall (20), State=Neutral, Radius=Rounded
  squaregreysolid: '1950f75d5eaa7f748541b97ed485c49dad92cf86', // square-grey-solid
  Size2xsmall20StateWarningRadiusRounded: '6db9196e9d45985395c9340e812efc98fed9c2db', // Size=2xsmall (20), State=Warning, Radius=Rounded
  squarebluesolid: '9fdba03ef454885f29b4468ee58a79850dc36a92', // square-blue-solid
  Size2xsmall20StateErrorRadiusRounded: 'dae9711e0bddaff23d41f8374d768a4334f9a69b', // Size=2xsmall (20), State=Error, Radius=Rounded
  squareorangesolid: 'f691fe7606441b1bd8907119b0c525c088b20eaa', // square-orange-solid
};
const STYLES = {
  H3: 'adf130ea9e157e6e8bc1ec13b475668221cc831d',

  textCompactTxtCompactSmall: '184b1bd4001407d480ae493b95b84e90d347cb52', // Text Compact/txt-compact-small
  headersWebsH3: 'adf130ea9e157e6e8bc1ec13b475668221cc831d', // Headers Webs/H3
  textCompactTxtCompactMediumPlus: 'edb007633bab9d52364f6c0d78da75d3f40197a7', // Text Compact/txt-compact-medium-plus
  textCompactTxtCompactSmallPlus: '76cc3f3552860444bb19f826d0c8428c8d7264dc', // Text Compact/txt-compact-small-plus
  textCompactTxtCompactXsmallPlus: 'b44cf02f2c3ac7f0c5cd7bfd25c684aadad69ed7', // Text Compact/txt-compact-xsmall-plus
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

  spacing16: 'VariableID:66fa38c9c8238168f844eee4b16541d4462b42c2/6996:1894', // spacing-16
  spacing8: 'VariableID:0732ac1e93c221a6e6f7eb84ed8b00b62a9d57ef/6996:1898', // spacing-8
  spacing24: 'VariableID:f9f59aa761a5b46f53c37d0e8bd544eb529c7b79/6996:1902', // spacing-24
  radius12: 'VariableID:e92b5a3aa058a87489262fd5161b29f8b2b48d5e/6996:1718', // radius-12
  backgroundsBgBase: 'VariableID:a426e4a84e9b344ec6a576ccd94d08a189532d69/13723:1393', // backgrounds/bg-base
  foregroundsFgSubtle: 'VariableID:77e30ee7a903973aac43f720b387e89390946184/13723:1409', // foregrounds/fg-subtle
  fontSizeSmall: 'VariableID:08c154b96f5d46323f201e407bb748cdc453d52e/11733:4', // font/size/small
  fontFamilyBody: 'VariableID:e06d9db3d6ed02de73697eae005622387ab0e8b6/7870:94', // font/family/body
  fontWeight400: 'VariableID:aa9a1d9edce50530b1c57295d885e98682159acb/6996:1823', // font/weight/400
  foregroundsFgBase: 'VariableID:155eba32b1cd754e3d29d82fddd40e387753959f/13723:1408', // foregrounds/fg-base
  fontFamilyHeader: 'VariableID:d58f1fdf63b93407b5e27891010af340e2384e9d/7870:35', // font/family/header
  fontSizeMedium: 'VariableID:e00f44ed717f5b1067887b5278e30cb8094fb68b/6996:1821', // font/size/medium
  fontWeight500: 'VariableID:f404fa95f32ace66073174f8f325798a84ca57e4/6996:1829', // font/weight/500
  spacing4: 'VariableID:df05201f6fbd29c44c88e87f4b8842f9c0e94bf1/6996:1900', // spacing-4
  radius4: 'VariableID:fc26ff4b40b530c2bed8b79f226427ca30f6de46/6996:1710', // radius-4
  bordersBorderBase: 'VariableID:ffbe5f08347e6455d869b13eaaab921056481e06/13723:1417', // borders/border-base
  tagPurpleTagPurpleIcon: 'VariableID:b55a20e0108d05b4e43b8ac904717f3783da1b0d/13723:1542', // tag/purple/tag-purple-icon
  tagErrorTagRedIcon: 'VariableID:8a1bfa6bb4d1c3e73e69a6aa5fc8d362241d4595/13723:1554', // tag/error/tag-red-icon
  tagWarningTagOrangeIcon: 'VariableID:b08df4fe508b449ebdb5d256e72680a31f26cd9e/13723:1551', // tag/warning/tag-orange-icon
  tagNeutralTagNeutralIcon: 'VariableID:9acf68ac429d615d06b1231878308b831e257784/13723:1539', // tag/neutral/tag-neutral-icon
  tagBlueTagBlueIcon: 'VariableID:303c2dbc9886c58e842b2d131ca498ba1d7b58e1/13723:1545', // tag/blue/tag-blue-icon
  tagSuccessTagGreenIcon: 'VariableID:3da49128df12418eb4f77556623c6434faeb31f0/13723:1548', // tag/success/tag-green-icon
  spacing0: 'VariableID:a1c28706a42ef7439875a76d07c22441141b8742/6996:1903', // spacing-0
  backgroundsBgSubtle: 'VariableID:0f057c5e79ecd569f3ddf9031ff14eb8d7641e08/13723:1392', // backgrounds/bg-subtle
  radiusFull: 'VariableID:0a4f8e80cf597d7004f537b5ce0ce965dfcf9015/6996:1724', // radius-full
  tagSuccessTagGreenBg: 'VariableID:0e352014159e2036fcdaf97465ed781e70895f53/13723:2147', // tag/success/tag-green-bg
  tagSuccessTagGreenText: 'VariableID:246116ae03ae335606cca254e4c208c77ec4faa3/13723:1547', // tag/success/tag-green-text
  fontSizeXsmall: 'VariableID:2b5ad447e8b97d3131afd9c9d727efaeca69e146/11733:9', // font/size/xsmall
  spacing2: 'VariableID:2a22c96cab78cb41bf32ea26aec1c028be9b1b4f/6996:1901', // spacing-2
  spacing6: 'VariableID:b91313b6188684b4087ce0b957bb9a0ebb3da1e9/7020:2', // spacing-6
  tagNeutralTagNeutralBg: 'VariableID:0de1938b914dacd18b6d64cefee65c9615a7c0b9/13723:1537', // tag/neutral/tag-neutral-bg
  tagNeutralTagNeutralBorder: 'VariableID:cb09cade7d0c5571cf862d3dc410f70602979e13/13723:1540', // tag/neutral/tag-neutral-border
  tagNeutralTagNeutralText: 'VariableID:9a673b5d89b9739f0bcb62ea719f40518d2c105d/13723:1538', // tag/neutral/tag-neutral-text
  alphaBlackAlpha12: 'VariableID:61b7ce0df1eb73fc2d9c4b9e51f1afe6d8302e07/17834:20', // alpha black/alpha-12
  tagBlueTagBlueBg: 'VariableID:c138645c5821cf3fb7a2806bf1692c831b616846/13723:2124', // tag/blue/tag-blue-bg
  tagBlueTagBlueText: 'VariableID:a3ba0c36bdc9b7d9f5becf55cec39b2558c9ace2/13723:1544', // tag/blue/tag-blue-text
  tagWarningTagOrangeBg: 'VariableID:e5a19807780182e3813147e1d027b07ba19d68b6/13723:2158', // tag/warning/tag-orange-bg
  tagWarningTagOrangeBorder: 'VariableID:99dff854d92b8ccff5c5799205be544b8f15ec8b/13723:1552', // tag/warning/tag-orange-border
  tagWarningTagOrangeText: 'VariableID:c2417b7057d2a4dd0d31322b507896e316263bea/13723:1550', // tag/warning/tag-orange-text
  tagErrorTagRedBg: 'VariableID:c9402018a1c54ce9457f3c5708e08377a2c40c54/13723:2170', // tag/error/tag-red-bg
  tagErrorTagRedBorder: 'VariableID:450f8fd54b5c560715b97579290e6bca73dac51f/13723:1555', // tag/error/tag-red-border
  tagErrorTagRedText: 'VariableID:16c7dfec616333d701e9e2a94e1f2b5219e2ba0d/13723:1553', // tag/error/tag-red-text
  tagPurpleTagPurpleBg: 'VariableID:635a7c55a80e4de40ebc1ce7ca68a0a9a934bfe2/13723:2136', // tag/purple/tag-purple-bg
  tagPurpleTagPurpleText: 'VariableID:a8b0994d0a2981dfa945a5ce74f2a9a971c54b69/13723:1541', // tag/purple/tag-purple-text
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



// ── Extra fonts ──
await figma.loadFontAsync({ family: 'Geist', style: 'Regular' });
await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
await figma.loadFontAsync({ family: 'Geist', style: 'Medium' });

// ── Extra helpers ──
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

const SOLID_ALIAS = async (id) => {
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
async function applyIconFills(parent, varId) {
  const vectors = parent.findAll(n => n.type === 'VECTOR' || n.type === 'BOOLEAN_OPERATION');
  if (!vectors.length) return;
  const fill = await SOLID(varId);
  for (const v of vectors) v.fills = [fill];
}

// ── Content ──
// ── stats ──
{
const statCards = figma.createFrame();
statCards.name = "Stat Cards";
statCards.layoutMode = 'HORIZONTAL';
statCards.primaryAxisSizingMode = 'FIXED';
statCards.itemSpacing = 16;
statCards.paddingTop = 0;
statCards.paddingRight = 0;
statCards.paddingBottom = 0;
statCards.paddingLeft = 0;
statCards.resize(1136, 108);
statCards.clipsContent = false;
statCards.fills = [];
content.appendChild(statCards);
statCards.setBoundVariable('itemSpacing', await V(T.spacing16));

const totalTasks = figma.createFrame();
totalTasks.name = "Total Tasks";
totalTasks.layoutMode = 'VERTICAL';
totalTasks.primaryAxisSizingMode = 'AUTO';
totalTasks.itemSpacing = 8;
totalTasks.paddingTop = 24;
totalTasks.paddingRight = 24;
totalTasks.paddingBottom = 24;
totalTasks.paddingLeft = 24;
totalTasks.resize(272, 108);
totalTasks.clipsContent = false;
totalTasks.fills = [await SOLID(T.backgroundsBgBase)];
totalTasks.cornerRadius = 12;
await totalTasks.setEffectStyleIdAsync(eff.cardRest);
statCards.appendChild(totalTasks);
totalTasks.layoutSizingHorizontal = 'FILL';
totalTasks.layoutSizingVertical = 'HUG';
totalTasks.setBoundVariable('itemSpacing', await V(T.spacing8));
totalTasks.setBoundVariable('paddingLeft', await V(T.spacing24));
totalTasks.setBoundVariable('paddingTop', await V(T.spacing24));
totalTasks.setBoundVariable('paddingRight', await V(T.spacing24));
totalTasks.setBoundVariable('paddingBottom', await V(T.spacing24));
totalTasks.setBoundVariable('topLeftRadius', await V(T.radius12));
totalTasks.setBoundVariable('topRightRadius', await V(T.radius12));
totalTasks.setBoundVariable('bottomLeftRadius', await V(T.radius12));
totalTasks.setBoundVariable('bottomRightRadius', await V(T.radius12));

const label = figma.createText();
label.name = "Label";
await label.setTextStyleIdAsync(sty.textCompactTxtCompactSmall);
label.characters = "Total Tasks";
label.textAutoResize = 'WIDTH_AND_HEIGHT';
label.fills = [await SOLID(T.foregroundsFgSubtle)];
totalTasks.appendChild(label);

const value = figma.createText();
value.name = "Value";
await value.setTextStyleIdAsync(sty.headersWebsH3);
value.characters = "18";
value.textAutoResize = 'WIDTH_AND_HEIGHT';
value.fills = [await SOLID(T.foregroundsFgBase)];
totalTasks.appendChild(value);

const inProgress = figma.createFrame();
inProgress.name = "In Progress";
inProgress.layoutMode = 'VERTICAL';
inProgress.primaryAxisSizingMode = 'AUTO';
inProgress.itemSpacing = 8;
inProgress.paddingTop = 24;
inProgress.paddingRight = 24;
inProgress.paddingBottom = 24;
inProgress.paddingLeft = 24;
inProgress.resize(272, 108);
inProgress.clipsContent = false;
inProgress.fills = [await SOLID(T.backgroundsBgBase)];
inProgress.cornerRadius = 12;
await inProgress.setEffectStyleIdAsync(eff.cardRest);
statCards.appendChild(inProgress);
inProgress.layoutSizingHorizontal = 'FILL';
inProgress.layoutSizingVertical = 'HUG';
inProgress.setBoundVariable('itemSpacing', await V(T.spacing8));
inProgress.setBoundVariable('paddingLeft', await V(T.spacing24));
inProgress.setBoundVariable('paddingTop', await V(T.spacing24));
inProgress.setBoundVariable('paddingRight', await V(T.spacing24));
inProgress.setBoundVariable('paddingBottom', await V(T.spacing24));
inProgress.setBoundVariable('topLeftRadius', await V(T.radius12));
inProgress.setBoundVariable('topRightRadius', await V(T.radius12));
inProgress.setBoundVariable('bottomLeftRadius', await V(T.radius12));
inProgress.setBoundVariable('bottomRightRadius', await V(T.radius12));

const label2 = figma.createText();
label2.name = "Label";
await label2.setTextStyleIdAsync(sty.textCompactTxtCompactSmall);
label2.characters = "In Progress";
label2.textAutoResize = 'WIDTH_AND_HEIGHT';
label2.fills = [await SOLID(T.foregroundsFgSubtle)];
inProgress.appendChild(label2);

const value2 = figma.createText();
value2.name = "Value";
await value2.setTextStyleIdAsync(sty.headersWebsH3);
value2.characters = "5";
value2.textAutoResize = 'WIDTH_AND_HEIGHT';
value2.fills = [await SOLID(T.foregroundsFgBase)];
inProgress.appendChild(value2);

const completed = figma.createFrame();
completed.name = "Completed";
completed.layoutMode = 'VERTICAL';
completed.primaryAxisSizingMode = 'AUTO';
completed.itemSpacing = 8;
completed.paddingTop = 24;
completed.paddingRight = 24;
completed.paddingBottom = 24;
completed.paddingLeft = 24;
completed.resize(272, 108);
completed.clipsContent = false;
completed.fills = [await SOLID(T.backgroundsBgBase)];
completed.cornerRadius = 12;
await completed.setEffectStyleIdAsync(eff.cardRest);
statCards.appendChild(completed);
completed.layoutSizingHorizontal = 'FILL';
completed.layoutSizingVertical = 'HUG';
completed.setBoundVariable('itemSpacing', await V(T.spacing8));
completed.setBoundVariable('paddingLeft', await V(T.spacing24));
completed.setBoundVariable('paddingTop', await V(T.spacing24));
completed.setBoundVariable('paddingRight', await V(T.spacing24));
completed.setBoundVariable('paddingBottom', await V(T.spacing24));
completed.setBoundVariable('topLeftRadius', await V(T.radius12));
completed.setBoundVariable('topRightRadius', await V(T.radius12));
completed.setBoundVariable('bottomLeftRadius', await V(T.radius12));
completed.setBoundVariable('bottomRightRadius', await V(T.radius12));

const label3 = figma.createText();
label3.name = "Label";
await label3.setTextStyleIdAsync(sty.textCompactTxtCompactSmall);
label3.characters = "Completed";
label3.textAutoResize = 'WIDTH_AND_HEIGHT';
label3.fills = [await SOLID(T.foregroundsFgSubtle)];
completed.appendChild(label3);

const value3 = figma.createText();
value3.name = "Value";
await value3.setTextStyleIdAsync(sty.headersWebsH3);
value3.characters = "3";
value3.textAutoResize = 'WIDTH_AND_HEIGHT';
value3.fills = [await SOLID(T.foregroundsFgBase)];
completed.appendChild(value3);

const overdue = figma.createFrame();
overdue.name = "Overdue";
overdue.layoutMode = 'VERTICAL';
overdue.primaryAxisSizingMode = 'AUTO';
overdue.itemSpacing = 8;
overdue.paddingTop = 24;
overdue.paddingRight = 24;
overdue.paddingBottom = 24;
overdue.paddingLeft = 24;
overdue.resize(272, 108);
overdue.clipsContent = false;
overdue.fills = [await SOLID(T.backgroundsBgBase)];
overdue.cornerRadius = 12;
await overdue.setEffectStyleIdAsync(eff.cardRest);
statCards.appendChild(overdue);
overdue.layoutSizingHorizontal = 'FILL';
overdue.layoutSizingVertical = 'HUG';
overdue.setBoundVariable('itemSpacing', await V(T.spacing8));
overdue.setBoundVariable('paddingLeft', await V(T.spacing24));
overdue.setBoundVariable('paddingTop', await V(T.spacing24));
overdue.setBoundVariable('paddingRight', await V(T.spacing24));
overdue.setBoundVariable('paddingBottom', await V(T.spacing24));
overdue.setBoundVariable('topLeftRadius', await V(T.radius12));
overdue.setBoundVariable('topRightRadius', await V(T.radius12));
overdue.setBoundVariable('bottomLeftRadius', await V(T.radius12));
overdue.setBoundVariable('bottomRightRadius', await V(T.radius12));

const label4 = figma.createText();
label4.name = "Label";
await label4.setTextStyleIdAsync(sty.textCompactTxtCompactSmall);
label4.characters = "Overdue";
label4.textAutoResize = 'WIDTH_AND_HEIGHT';
label4.fills = [await SOLID(T.foregroundsFgSubtle)];
overdue.appendChild(label4);

const value4 = figma.createText();
value4.name = "Value";
await value4.setTextStyleIdAsync(sty.headersWebsH3);
value4.characters = "13";
value4.textAutoResize = 'WIDTH_AND_HEIGHT';
value4.fills = [await SOLID(T.foregroundsFgBase)];
overdue.appendChild(value4);

statCards.resize(1136, statCards.height);


}

// ── charts ──
{
const chartCards = figma.createFrame();
chartCards.name = "Chart Cards";
chartCards.layoutMode = 'HORIZONTAL';
chartCards.primaryAxisSizingMode = 'FIXED';
chartCards.itemSpacing = 16;
chartCards.paddingTop = 0;
chartCards.paddingRight = 0;
chartCards.paddingBottom = 0;
chartCards.paddingLeft = 0;
chartCards.resize(1136, 260);
chartCards.clipsContent = false;
chartCards.fills = [];
content.appendChild(chartCards);
chartCards.setBoundVariable('itemSpacing', await V(T.spacing16));

const tasksByPriority = figma.createFrame();
tasksByPriority.name = "Tasks by Priority";
tasksByPriority.layoutMode = 'VERTICAL';
tasksByPriority.primaryAxisSizingMode = 'AUTO';
tasksByPriority.itemSpacing = 16;
tasksByPriority.paddingTop = 24;
tasksByPriority.paddingRight = 24;
tasksByPriority.paddingBottom = 24;
tasksByPriority.paddingLeft = 24;
tasksByPriority.resize(560, 260);
tasksByPriority.clipsContent = false;
tasksByPriority.fills = [await SOLID(T.backgroundsBgBase)];
tasksByPriority.cornerRadius = 12;
await tasksByPriority.setEffectStyleIdAsync(eff.cardRest);
chartCards.appendChild(tasksByPriority);
tasksByPriority.layoutSizingHorizontal = 'FILL';
tasksByPriority.layoutSizingVertical = 'HUG';
tasksByPriority.setBoundVariable('itemSpacing', await V(T.spacing16));
tasksByPriority.setBoundVariable('paddingLeft', await V(T.spacing24));
tasksByPriority.setBoundVariable('paddingTop', await V(T.spacing24));
tasksByPriority.setBoundVariable('paddingRight', await V(T.spacing24));
tasksByPriority.setBoundVariable('paddingBottom', await V(T.spacing24));
tasksByPriority.setBoundVariable('topLeftRadius', await V(T.radius12));
tasksByPriority.setBoundVariable('topRightRadius', await V(T.radius12));
tasksByPriority.setBoundVariable('bottomLeftRadius', await V(T.radius12));
tasksByPriority.setBoundVariable('bottomRightRadius', await V(T.radius12));

const title = figma.createText();
title.name = "Title";
await title.setTextStyleIdAsync(sty.textCompactTxtCompactMediumPlus);
title.characters = "Tasks by Priority";
title.textAutoResize = 'WIDTH_AND_HEIGHT';
title.fills = [await SOLID(T.foregroundsFgBase)];
tasksByPriority.appendChild(title);

const rows = figma.createFrame();
rows.name = "Rows";
rows.layoutMode = 'VERTICAL';
rows.primaryAxisSizingMode = 'AUTO';
rows.itemSpacing = 16;
rows.paddingTop = 0;
rows.paddingRight = 0;
rows.paddingBottom = 0;
rows.paddingLeft = 0;
rows.resize(512, 176);
rows.clipsContent = false;
rows.fills = [];
tasksByPriority.appendChild(rows);
rows.layoutSizingHorizontal = 'FILL';
rows.layoutSizingVertical = 'HUG';
rows.setBoundVariable('itemSpacing', await V(T.spacing16));

const critical = figma.createFrame();
critical.name = "Critical";
critical.layoutMode = 'VERTICAL';
critical.primaryAxisSizingMode = 'AUTO';
critical.itemSpacing = 4;
critical.paddingTop = 0;
critical.paddingRight = 0;
critical.paddingBottom = 0;
critical.paddingLeft = 0;
critical.resize(512, 32);
critical.clipsContent = false;
critical.fills = [];
rows.appendChild(critical);
critical.layoutSizingHorizontal = 'FILL';
critical.layoutSizingVertical = 'HUG';
critical.setBoundVariable('itemSpacing', await V(T.spacing4));

const labelRow = figma.createFrame();
labelRow.name = "Label Row";
labelRow.layoutMode = 'HORIZONTAL';
labelRow.primaryAxisSizingMode = 'FIXED';
labelRow.itemSpacing = 0;
labelRow.paddingTop = 0;
labelRow.paddingRight = 0;
labelRow.paddingBottom = 0;
labelRow.paddingLeft = 0;
labelRow.counterAxisAlignItems = 'CENTER';
labelRow.primaryAxisAlignItems = 'SPACE_BETWEEN';
labelRow.resize(512, 20);
labelRow.clipsContent = false;
labelRow.fills = [];
critical.appendChild(labelRow);
labelRow.layoutSizingHorizontal = 'FILL';
labelRow.layoutSizingVertical = 'HUG';

const critical2 = figma.createText();
critical2.name = "Critical";
await critical2.setTextStyleIdAsync(sty.textCompactTxtCompactSmall);
critical2.characters = "Critical";
critical2.textAutoResize = 'WIDTH_AND_HEIGHT';
critical2.fills = [await SOLID(T.foregroundsFgSubtle)];
labelRow.appendChild(critical2);

const n4 = figma.createText();
n4.name = "4";
await n4.setTextStyleIdAsync(sty.textCompactTxtCompactSmallPlus);
n4.characters = "4";
n4.textAutoResize = 'WIDTH_AND_HEIGHT';
n4.fills = [await SOLID(T.foregroundsFgBase)];
labelRow.appendChild(n4);

const track = figma.createFrame();
track.name = "Track";
track.resize(512, 8);
track.clipsContent = true;
track.fills = [await SOLID(T.bordersBorderBase)];
track.cornerRadius = 4;
critical.appendChild(track);
track.setBoundVariable('topLeftRadius', await V(T.radius4));
track.setBoundVariable('topRightRadius', await V(T.radius4));
track.setBoundVariable('bottomLeftRadius', await V(T.radius4));
track.setBoundVariable('bottomRightRadius', await V(T.radius4));

const bar = figma.createFrame();
bar.name = "Bar";
bar.resize(89, 8);
bar.clipsContent = true;
bar.fills = [await SOLID(T.tagPurpleTagPurpleIcon)];
bar.cornerRadius = 4;
track.appendChild(bar);
bar.setBoundVariable('topLeftRadius', await V(T.radius4));
bar.setBoundVariable('topRightRadius', await V(T.radius4));
bar.setBoundVariable('bottomLeftRadius', await V(T.radius4));
bar.setBoundVariable('bottomRightRadius', await V(T.radius4));

const high = figma.createFrame();
high.name = "High";
high.layoutMode = 'VERTICAL';
high.primaryAxisSizingMode = 'AUTO';
high.itemSpacing = 4;
high.paddingTop = 0;
high.paddingRight = 0;
high.paddingBottom = 0;
high.paddingLeft = 0;
high.resize(512, 32);
high.clipsContent = false;
high.fills = [];
rows.appendChild(high);
high.layoutSizingHorizontal = 'FILL';
high.layoutSizingVertical = 'HUG';
high.setBoundVariable('itemSpacing', await V(T.spacing4));

const labelRow2 = figma.createFrame();
labelRow2.name = "Label Row";
labelRow2.layoutMode = 'HORIZONTAL';
labelRow2.primaryAxisSizingMode = 'FIXED';
labelRow2.itemSpacing = 0;
labelRow2.paddingTop = 0;
labelRow2.paddingRight = 0;
labelRow2.paddingBottom = 0;
labelRow2.paddingLeft = 0;
labelRow2.counterAxisAlignItems = 'CENTER';
labelRow2.primaryAxisAlignItems = 'SPACE_BETWEEN';
labelRow2.resize(512, 20);
labelRow2.clipsContent = false;
labelRow2.fills = [];
high.appendChild(labelRow2);
labelRow2.layoutSizingHorizontal = 'FILL';
labelRow2.layoutSizingVertical = 'HUG';

const high2 = figma.createText();
high2.name = "High";
await high2.setTextStyleIdAsync(sty.textCompactTxtCompactSmall);
high2.characters = "High";
high2.textAutoResize = 'WIDTH_AND_HEIGHT';
high2.fills = [await SOLID(T.foregroundsFgSubtle)];
labelRow2.appendChild(high2);

const n5 = figma.createText();
n5.name = "5";
await n5.setTextStyleIdAsync(sty.textCompactTxtCompactSmallPlus);
n5.characters = "5";
n5.textAutoResize = 'WIDTH_AND_HEIGHT';
n5.fills = [await SOLID(T.foregroundsFgBase)];
labelRow2.appendChild(n5);

const track2 = figma.createFrame();
track2.name = "Track";
track2.resize(512, 8);
track2.clipsContent = true;
track2.fills = [await SOLID(T.bordersBorderBase)];
track2.cornerRadius = 4;
high.appendChild(track2);
track2.setBoundVariable('topLeftRadius', await V(T.radius4));
track2.setBoundVariable('topRightRadius', await V(T.radius4));
track2.setBoundVariable('bottomLeftRadius', await V(T.radius4));
track2.setBoundVariable('bottomRightRadius', await V(T.radius4));

const bar2 = figma.createFrame();
bar2.name = "Bar";
bar2.resize(111, 8);
bar2.clipsContent = true;
bar2.fills = [await SOLID(T.tagErrorTagRedIcon)];
bar2.cornerRadius = 4;
track2.appendChild(bar2);
bar2.setBoundVariable('topLeftRadius', await V(T.radius4));
bar2.setBoundVariable('topRightRadius', await V(T.radius4));
bar2.setBoundVariable('bottomLeftRadius', await V(T.radius4));
bar2.setBoundVariable('bottomRightRadius', await V(T.radius4));

const medium = figma.createFrame();
medium.name = "Medium";
medium.layoutMode = 'VERTICAL';
medium.primaryAxisSizingMode = 'AUTO';
medium.itemSpacing = 4;
medium.paddingTop = 0;
medium.paddingRight = 0;
medium.paddingBottom = 0;
medium.paddingLeft = 0;
medium.resize(512, 32);
medium.clipsContent = false;
medium.fills = [];
rows.appendChild(medium);
medium.layoutSizingHorizontal = 'FILL';
medium.layoutSizingVertical = 'HUG';
medium.setBoundVariable('itemSpacing', await V(T.spacing4));

const labelRow3 = figma.createFrame();
labelRow3.name = "Label Row";
labelRow3.layoutMode = 'HORIZONTAL';
labelRow3.primaryAxisSizingMode = 'FIXED';
labelRow3.itemSpacing = 0;
labelRow3.paddingTop = 0;
labelRow3.paddingRight = 0;
labelRow3.paddingBottom = 0;
labelRow3.paddingLeft = 0;
labelRow3.counterAxisAlignItems = 'CENTER';
labelRow3.primaryAxisAlignItems = 'SPACE_BETWEEN';
labelRow3.resize(512, 20);
labelRow3.clipsContent = false;
labelRow3.fills = [];
medium.appendChild(labelRow3);
labelRow3.layoutSizingHorizontal = 'FILL';
labelRow3.layoutSizingVertical = 'HUG';

const medium2 = figma.createText();
medium2.name = "Medium";
await medium2.setTextStyleIdAsync(sty.textCompactTxtCompactSmall);
medium2.characters = "Medium";
medium2.textAutoResize = 'WIDTH_AND_HEIGHT';
medium2.fills = [await SOLID(T.foregroundsFgSubtle)];
labelRow3.appendChild(medium2);

const n6 = figma.createText();
n6.name = "6";
await n6.setTextStyleIdAsync(sty.textCompactTxtCompactSmallPlus);
n6.characters = "6";
n6.textAutoResize = 'WIDTH_AND_HEIGHT';
n6.fills = [await SOLID(T.foregroundsFgBase)];
labelRow3.appendChild(n6);

const track3 = figma.createFrame();
track3.name = "Track";
track3.resize(512, 8);
track3.clipsContent = true;
track3.fills = [await SOLID(T.bordersBorderBase)];
track3.cornerRadius = 4;
medium.appendChild(track3);
track3.setBoundVariable('topLeftRadius', await V(T.radius4));
track3.setBoundVariable('topRightRadius', await V(T.radius4));
track3.setBoundVariable('bottomLeftRadius', await V(T.radius4));
track3.setBoundVariable('bottomRightRadius', await V(T.radius4));

const bar3 = figma.createFrame();
bar3.name = "Bar";
bar3.resize(133, 8);
bar3.clipsContent = true;
bar3.fills = [await SOLID(T.tagWarningTagOrangeIcon)];
bar3.cornerRadius = 4;
track3.appendChild(bar3);
bar3.setBoundVariable('topLeftRadius', await V(T.radius4));
bar3.setBoundVariable('topRightRadius', await V(T.radius4));
bar3.setBoundVariable('bottomLeftRadius', await V(T.radius4));
bar3.setBoundVariable('bottomRightRadius', await V(T.radius4));

const low = figma.createFrame();
low.name = "Low";
low.layoutMode = 'VERTICAL';
low.primaryAxisSizingMode = 'AUTO';
low.itemSpacing = 4;
low.paddingTop = 0;
low.paddingRight = 0;
low.paddingBottom = 0;
low.paddingLeft = 0;
low.resize(512, 32);
low.clipsContent = false;
low.fills = [];
rows.appendChild(low);
low.layoutSizingHorizontal = 'FILL';
low.layoutSizingVertical = 'HUG';
low.setBoundVariable('itemSpacing', await V(T.spacing4));

const labelRow4 = figma.createFrame();
labelRow4.name = "Label Row";
labelRow4.layoutMode = 'HORIZONTAL';
labelRow4.primaryAxisSizingMode = 'FIXED';
labelRow4.itemSpacing = 0;
labelRow4.paddingTop = 0;
labelRow4.paddingRight = 0;
labelRow4.paddingBottom = 0;
labelRow4.paddingLeft = 0;
labelRow4.counterAxisAlignItems = 'CENTER';
labelRow4.primaryAxisAlignItems = 'SPACE_BETWEEN';
labelRow4.resize(512, 20);
labelRow4.clipsContent = false;
labelRow4.fills = [];
low.appendChild(labelRow4);
labelRow4.layoutSizingHorizontal = 'FILL';
labelRow4.layoutSizingVertical = 'HUG';

const low2 = figma.createText();
low2.name = "Low";
await low2.setTextStyleIdAsync(sty.textCompactTxtCompactSmall);
low2.characters = "Low";
low2.textAutoResize = 'WIDTH_AND_HEIGHT';
low2.fills = [await SOLID(T.foregroundsFgSubtle)];
labelRow4.appendChild(low2);

const n3 = figma.createText();
n3.name = "3";
await n3.setTextStyleIdAsync(sty.textCompactTxtCompactSmallPlus);
n3.characters = "3";
n3.textAutoResize = 'WIDTH_AND_HEIGHT';
n3.fills = [await SOLID(T.foregroundsFgBase)];
labelRow4.appendChild(n3);

const track4 = figma.createFrame();
track4.name = "Track";
track4.resize(512, 8);
track4.clipsContent = true;
track4.fills = [await SOLID(T.bordersBorderBase)];
track4.cornerRadius = 4;
low.appendChild(track4);
track4.setBoundVariable('topLeftRadius', await V(T.radius4));
track4.setBoundVariable('topRightRadius', await V(T.radius4));
track4.setBoundVariable('bottomLeftRadius', await V(T.radius4));
track4.setBoundVariable('bottomRightRadius', await V(T.radius4));

const bar4 = figma.createFrame();
bar4.name = "Bar";
bar4.resize(67, 8);
bar4.clipsContent = true;
bar4.fills = [await SOLID(T.tagNeutralTagNeutralIcon)];
bar4.cornerRadius = 4;
track4.appendChild(bar4);
bar4.setBoundVariable('topLeftRadius', await V(T.radius4));
bar4.setBoundVariable('topRightRadius', await V(T.radius4));
bar4.setBoundVariable('bottomLeftRadius', await V(T.radius4));
bar4.setBoundVariable('bottomRightRadius', await V(T.radius4));

const tasksByStatus = figma.createFrame();
tasksByStatus.name = "Tasks by Status";
tasksByStatus.layoutMode = 'VERTICAL';
tasksByStatus.primaryAxisSizingMode = 'AUTO';
tasksByStatus.itemSpacing = 16;
tasksByStatus.paddingTop = 24;
tasksByStatus.paddingRight = 24;
tasksByStatus.paddingBottom = 24;
tasksByStatus.paddingLeft = 24;
tasksByStatus.resize(560, 260);
tasksByStatus.clipsContent = false;
tasksByStatus.fills = [await SOLID(T.backgroundsBgBase)];
tasksByStatus.cornerRadius = 12;
await tasksByStatus.setEffectStyleIdAsync(eff.cardRest);
chartCards.appendChild(tasksByStatus);
tasksByStatus.layoutSizingHorizontal = 'FILL';
tasksByStatus.layoutSizingVertical = 'HUG';
tasksByStatus.setBoundVariable('itemSpacing', await V(T.spacing16));
tasksByStatus.setBoundVariable('paddingLeft', await V(T.spacing24));
tasksByStatus.setBoundVariable('paddingTop', await V(T.spacing24));
tasksByStatus.setBoundVariable('paddingRight', await V(T.spacing24));
tasksByStatus.setBoundVariable('paddingBottom', await V(T.spacing24));
tasksByStatus.setBoundVariable('topLeftRadius', await V(T.radius12));
tasksByStatus.setBoundVariable('topRightRadius', await V(T.radius12));
tasksByStatus.setBoundVariable('bottomLeftRadius', await V(T.radius12));
tasksByStatus.setBoundVariable('bottomRightRadius', await V(T.radius12));

const title2 = figma.createText();
title2.name = "Title";
await title2.setTextStyleIdAsync(sty.textCompactTxtCompactMediumPlus);
title2.characters = "Tasks by Status";
title2.textAutoResize = 'WIDTH_AND_HEIGHT';
title2.fills = [await SOLID(T.foregroundsFgBase)];
tasksByStatus.appendChild(title2);

const rows2 = figma.createFrame();
rows2.name = "Rows";
rows2.layoutMode = 'VERTICAL';
rows2.primaryAxisSizingMode = 'AUTO';
rows2.itemSpacing = 16;
rows2.paddingTop = 0;
rows2.paddingRight = 0;
rows2.paddingBottom = 0;
rows2.paddingLeft = 0;
rows2.resize(512, 176);
rows2.clipsContent = false;
rows2.fills = [];
tasksByStatus.appendChild(rows2);
rows2.layoutSizingHorizontal = 'FILL';
rows2.layoutSizingVertical = 'HUG';
rows2.setBoundVariable('itemSpacing', await V(T.spacing16));

const toDo = figma.createFrame();
toDo.name = "To Do";
toDo.layoutMode = 'VERTICAL';
toDo.primaryAxisSizingMode = 'AUTO';
toDo.itemSpacing = 4;
toDo.paddingTop = 0;
toDo.paddingRight = 0;
toDo.paddingBottom = 0;
toDo.paddingLeft = 0;
toDo.resize(512, 32);
toDo.clipsContent = false;
toDo.fills = [];
rows2.appendChild(toDo);
toDo.layoutSizingHorizontal = 'FILL';
toDo.layoutSizingVertical = 'HUG';
toDo.setBoundVariable('itemSpacing', await V(T.spacing4));

const labelRow5 = figma.createFrame();
labelRow5.name = "Label Row";
labelRow5.layoutMode = 'HORIZONTAL';
labelRow5.primaryAxisSizingMode = 'FIXED';
labelRow5.itemSpacing = 0;
labelRow5.paddingTop = 0;
labelRow5.paddingRight = 0;
labelRow5.paddingBottom = 0;
labelRow5.paddingLeft = 0;
labelRow5.counterAxisAlignItems = 'CENTER';
labelRow5.primaryAxisAlignItems = 'SPACE_BETWEEN';
labelRow5.resize(512, 20);
labelRow5.clipsContent = false;
labelRow5.fills = [];
toDo.appendChild(labelRow5);
labelRow5.layoutSizingHorizontal = 'FILL';
labelRow5.layoutSizingVertical = 'HUG';

const toDo2 = figma.createText();
toDo2.name = "To Do";
await toDo2.setTextStyleIdAsync(sty.textCompactTxtCompactSmall);
toDo2.characters = "To Do";
toDo2.textAutoResize = 'WIDTH_AND_HEIGHT';
toDo2.fills = [await SOLID(T.foregroundsFgSubtle)];
labelRow5.appendChild(toDo2);

const n62 = figma.createText();
n62.name = "6";
await n62.setTextStyleIdAsync(sty.textCompactTxtCompactSmallPlus);
n62.characters = "6";
n62.textAutoResize = 'WIDTH_AND_HEIGHT';
n62.fills = [await SOLID(T.foregroundsFgBase)];
labelRow5.appendChild(n62);

const track5 = figma.createFrame();
track5.name = "Track";
track5.resize(512, 8);
track5.clipsContent = true;
track5.fills = [await SOLID(T.bordersBorderBase)];
track5.cornerRadius = 4;
toDo.appendChild(track5);
track5.setBoundVariable('topLeftRadius', await V(T.radius4));
track5.setBoundVariable('topRightRadius', await V(T.radius4));
track5.setBoundVariable('bottomLeftRadius', await V(T.radius4));
track5.setBoundVariable('bottomRightRadius', await V(T.radius4));

const bar5 = figma.createFrame();
bar5.name = "Bar";
bar5.resize(133, 8);
bar5.clipsContent = true;
bar5.fills = [await SOLID(T.tagNeutralTagNeutralIcon)];
bar5.cornerRadius = 4;
track5.appendChild(bar5);
bar5.setBoundVariable('topLeftRadius', await V(T.radius4));
bar5.setBoundVariable('topRightRadius', await V(T.radius4));
bar5.setBoundVariable('bottomLeftRadius', await V(T.radius4));
bar5.setBoundVariable('bottomRightRadius', await V(T.radius4));

const inProgress = figma.createFrame();
inProgress.name = "In Progress";
inProgress.layoutMode = 'VERTICAL';
inProgress.primaryAxisSizingMode = 'AUTO';
inProgress.itemSpacing = 4;
inProgress.paddingTop = 0;
inProgress.paddingRight = 0;
inProgress.paddingBottom = 0;
inProgress.paddingLeft = 0;
inProgress.resize(512, 32);
inProgress.clipsContent = false;
inProgress.fills = [];
rows2.appendChild(inProgress);
inProgress.layoutSizingHorizontal = 'FILL';
inProgress.layoutSizingVertical = 'HUG';
inProgress.setBoundVariable('itemSpacing', await V(T.spacing4));

const labelRow6 = figma.createFrame();
labelRow6.name = "Label Row";
labelRow6.layoutMode = 'HORIZONTAL';
labelRow6.primaryAxisSizingMode = 'FIXED';
labelRow6.itemSpacing = 0;
labelRow6.paddingTop = 0;
labelRow6.paddingRight = 0;
labelRow6.paddingBottom = 0;
labelRow6.paddingLeft = 0;
labelRow6.counterAxisAlignItems = 'CENTER';
labelRow6.primaryAxisAlignItems = 'SPACE_BETWEEN';
labelRow6.resize(512, 20);
labelRow6.clipsContent = false;
labelRow6.fills = [];
inProgress.appendChild(labelRow6);
labelRow6.layoutSizingHorizontal = 'FILL';
labelRow6.layoutSizingVertical = 'HUG';

const inProgress2 = figma.createText();
inProgress2.name = "In Progress";
await inProgress2.setTextStyleIdAsync(sty.textCompactTxtCompactSmall);
inProgress2.characters = "In Progress";
inProgress2.textAutoResize = 'WIDTH_AND_HEIGHT';
inProgress2.fills = [await SOLID(T.foregroundsFgSubtle)];
labelRow6.appendChild(inProgress2);

const n52 = figma.createText();
n52.name = "5";
await n52.setTextStyleIdAsync(sty.textCompactTxtCompactSmallPlus);
n52.characters = "5";
n52.textAutoResize = 'WIDTH_AND_HEIGHT';
n52.fills = [await SOLID(T.foregroundsFgBase)];
labelRow6.appendChild(n52);

const track6 = figma.createFrame();
track6.name = "Track";
track6.resize(512, 8);
track6.clipsContent = true;
track6.fills = [await SOLID(T.bordersBorderBase)];
track6.cornerRadius = 4;
inProgress.appendChild(track6);
track6.setBoundVariable('topLeftRadius', await V(T.radius4));
track6.setBoundVariable('topRightRadius', await V(T.radius4));
track6.setBoundVariable('bottomLeftRadius', await V(T.radius4));
track6.setBoundVariable('bottomRightRadius', await V(T.radius4));

const bar6 = figma.createFrame();
bar6.name = "Bar";
bar6.resize(111, 8);
bar6.clipsContent = true;
bar6.fills = [await SOLID(T.tagBlueTagBlueIcon)];
bar6.cornerRadius = 4;
track6.appendChild(bar6);
bar6.setBoundVariable('topLeftRadius', await V(T.radius4));
bar6.setBoundVariable('topRightRadius', await V(T.radius4));
bar6.setBoundVariable('bottomLeftRadius', await V(T.radius4));
bar6.setBoundVariable('bottomRightRadius', await V(T.radius4));

const inReview = figma.createFrame();
inReview.name = "In Review";
inReview.layoutMode = 'VERTICAL';
inReview.primaryAxisSizingMode = 'AUTO';
inReview.itemSpacing = 4;
inReview.paddingTop = 0;
inReview.paddingRight = 0;
inReview.paddingBottom = 0;
inReview.paddingLeft = 0;
inReview.resize(512, 32);
inReview.clipsContent = false;
inReview.fills = [];
rows2.appendChild(inReview);
inReview.layoutSizingHorizontal = 'FILL';
inReview.layoutSizingVertical = 'HUG';
inReview.setBoundVariable('itemSpacing', await V(T.spacing4));

const labelRow7 = figma.createFrame();
labelRow7.name = "Label Row";
labelRow7.layoutMode = 'HORIZONTAL';
labelRow7.primaryAxisSizingMode = 'FIXED';
labelRow7.itemSpacing = 0;
labelRow7.paddingTop = 0;
labelRow7.paddingRight = 0;
labelRow7.paddingBottom = 0;
labelRow7.paddingLeft = 0;
labelRow7.counterAxisAlignItems = 'CENTER';
labelRow7.primaryAxisAlignItems = 'SPACE_BETWEEN';
labelRow7.resize(512, 20);
labelRow7.clipsContent = false;
labelRow7.fills = [];
inReview.appendChild(labelRow7);
labelRow7.layoutSizingHorizontal = 'FILL';
labelRow7.layoutSizingVertical = 'HUG';

const inReview2 = figma.createText();
inReview2.name = "In Review";
await inReview2.setTextStyleIdAsync(sty.textCompactTxtCompactSmall);
inReview2.characters = "In Review";
inReview2.textAutoResize = 'WIDTH_AND_HEIGHT';
inReview2.fills = [await SOLID(T.foregroundsFgSubtle)];
labelRow7.appendChild(inReview2);

const n42 = figma.createText();
n42.name = "4";
await n42.setTextStyleIdAsync(sty.textCompactTxtCompactSmallPlus);
n42.characters = "4";
n42.textAutoResize = 'WIDTH_AND_HEIGHT';
n42.fills = [await SOLID(T.foregroundsFgBase)];
labelRow7.appendChild(n42);

const track7 = figma.createFrame();
track7.name = "Track";
track7.resize(512, 8);
track7.clipsContent = true;
track7.fills = [await SOLID(T.bordersBorderBase)];
track7.cornerRadius = 4;
inReview.appendChild(track7);
track7.setBoundVariable('topLeftRadius', await V(T.radius4));
track7.setBoundVariable('topRightRadius', await V(T.radius4));
track7.setBoundVariable('bottomLeftRadius', await V(T.radius4));
track7.setBoundVariable('bottomRightRadius', await V(T.radius4));

const bar7 = figma.createFrame();
bar7.name = "Bar";
bar7.resize(89, 8);
bar7.clipsContent = true;
bar7.fills = [await SOLID(T.tagWarningTagOrangeIcon)];
bar7.cornerRadius = 4;
track7.appendChild(bar7);
bar7.setBoundVariable('topLeftRadius', await V(T.radius4));
bar7.setBoundVariable('topRightRadius', await V(T.radius4));
bar7.setBoundVariable('bottomLeftRadius', await V(T.radius4));
bar7.setBoundVariable('bottomRightRadius', await V(T.radius4));

const done = figma.createFrame();
done.name = "Done";
done.layoutMode = 'VERTICAL';
done.primaryAxisSizingMode = 'AUTO';
done.itemSpacing = 4;
done.paddingTop = 0;
done.paddingRight = 0;
done.paddingBottom = 0;
done.paddingLeft = 0;
done.resize(512, 32);
done.clipsContent = false;
done.fills = [];
rows2.appendChild(done);
done.layoutSizingHorizontal = 'FILL';
done.layoutSizingVertical = 'HUG';
done.setBoundVariable('itemSpacing', await V(T.spacing4));

const labelRow8 = figma.createFrame();
labelRow8.name = "Label Row";
labelRow8.layoutMode = 'HORIZONTAL';
labelRow8.primaryAxisSizingMode = 'FIXED';
labelRow8.itemSpacing = 0;
labelRow8.paddingTop = 0;
labelRow8.paddingRight = 0;
labelRow8.paddingBottom = 0;
labelRow8.paddingLeft = 0;
labelRow8.counterAxisAlignItems = 'CENTER';
labelRow8.primaryAxisAlignItems = 'SPACE_BETWEEN';
labelRow8.resize(512, 20);
labelRow8.clipsContent = false;
labelRow8.fills = [];
done.appendChild(labelRow8);
labelRow8.layoutSizingHorizontal = 'FILL';
labelRow8.layoutSizingVertical = 'HUG';

const done2 = figma.createText();
done2.name = "Done";
await done2.setTextStyleIdAsync(sty.textCompactTxtCompactSmall);
done2.characters = "Done";
done2.textAutoResize = 'WIDTH_AND_HEIGHT';
done2.fills = [await SOLID(T.foregroundsFgSubtle)];
labelRow8.appendChild(done2);

const n32 = figma.createText();
n32.name = "3";
await n32.setTextStyleIdAsync(sty.textCompactTxtCompactSmallPlus);
n32.characters = "3";
n32.textAutoResize = 'WIDTH_AND_HEIGHT';
n32.fills = [await SOLID(T.foregroundsFgBase)];
labelRow8.appendChild(n32);

const track8 = figma.createFrame();
track8.name = "Track";
track8.resize(512, 8);
track8.clipsContent = true;
track8.fills = [await SOLID(T.bordersBorderBase)];
track8.cornerRadius = 4;
done.appendChild(track8);
track8.setBoundVariable('topLeftRadius', await V(T.radius4));
track8.setBoundVariable('topRightRadius', await V(T.radius4));
track8.setBoundVariable('bottomLeftRadius', await V(T.radius4));
track8.setBoundVariable('bottomRightRadius', await V(T.radius4));

const bar8 = figma.createFrame();
bar8.name = "Bar";
bar8.resize(67, 8);
bar8.clipsContent = true;
bar8.fills = [await SOLID(T.tagSuccessTagGreenIcon)];
bar8.cornerRadius = 4;
track8.appendChild(bar8);
bar8.setBoundVariable('topLeftRadius', await V(T.radius4));
bar8.setBoundVariable('topRightRadius', await V(T.radius4));
bar8.setBoundVariable('bottomLeftRadius', await V(T.radius4));
bar8.setBoundVariable('bottomRightRadius', await V(T.radius4));

chartCards.resize(1136, chartCards.height);


}

// ── table ──
{
const recentTasks = figma.createFrame();
recentTasks.name = "Recent Tasks";
recentTasks.layoutMode = 'VERTICAL';
recentTasks.primaryAxisSizingMode = 'AUTO';
recentTasks.itemSpacing = 16;
recentTasks.paddingTop = 24;
recentTasks.paddingRight = 0;
recentTasks.paddingBottom = 24;
recentTasks.paddingLeft = 0;
recentTasks.resize(1136, 426);
recentTasks.clipsContent = false;
recentTasks.fills = [await SOLID(T.backgroundsBgBase)];
recentTasks.cornerRadius = 12;
await recentTasks.setEffectStyleIdAsync(eff.cardRest);
content.appendChild(recentTasks);
recentTasks.setBoundVariable('itemSpacing', await V(T.spacing16));
recentTasks.setBoundVariable('paddingLeft', await V(T.spacing0));
recentTasks.setBoundVariable('paddingTop', await V(T.spacing24));
recentTasks.setBoundVariable('paddingRight', await V(T.spacing0));
recentTasks.setBoundVariable('paddingBottom', await V(T.spacing24));
recentTasks.setBoundVariable('topLeftRadius', await V(T.radius12));
recentTasks.setBoundVariable('topRightRadius', await V(T.radius12));
recentTasks.setBoundVariable('bottomLeftRadius', await V(T.radius12));
recentTasks.setBoundVariable('bottomRightRadius', await V(T.radius12));

const titleWrapper = figma.createFrame();
titleWrapper.name = "Title Wrapper";
titleWrapper.layoutMode = 'HORIZONTAL';
titleWrapper.primaryAxisSizingMode = 'FIXED';
titleWrapper.itemSpacing = 0;
titleWrapper.paddingTop = 0;
titleWrapper.paddingRight = 24;
titleWrapper.paddingBottom = 0;
titleWrapper.paddingLeft = 24;
titleWrapper.resize(1136, 20);
titleWrapper.clipsContent = false;
titleWrapper.fills = [];
recentTasks.appendChild(titleWrapper);
titleWrapper.layoutSizingHorizontal = 'FILL';
titleWrapper.layoutSizingVertical = 'HUG';
titleWrapper.setBoundVariable('paddingLeft', await V(T.spacing24));
titleWrapper.setBoundVariable('paddingRight', await V(T.spacing24));

const title = figma.createText();
title.name = "Title";
await title.setTextStyleIdAsync(sty.textCompactTxtCompactMediumPlus);
title.characters = "Recent Tasks";
title.textAutoResize = 'WIDTH_AND_HEIGHT';
title.fills = [await SOLID(T.foregroundsFgBase)];
titleWrapper.appendChild(title);

const table = figma.createFrame();
table.name = "Table";
table.layoutMode = 'VERTICAL';
table.primaryAxisSizingMode = 'AUTO';
table.itemSpacing = 0;
table.paddingTop = 0;
table.paddingRight = 0;
table.paddingBottom = 0;
table.paddingLeft = 0;
table.resize(1136, 342);
table.clipsContent = false;
table.fills = [];
recentTasks.appendChild(table);
table.layoutSizingHorizontal = 'FILL';
table.layoutSizingVertical = 'HUG';

const tableHeader = figma.createFrame();
tableHeader.name = "Table Header";
tableHeader.layoutMode = 'HORIZONTAL';
tableHeader.primaryAxisSizingMode = 'FIXED';
tableHeader.counterAxisSizingMode = 'FIXED';
tableHeader.itemSpacing = 12;
tableHeader.paddingTop = 0;
tableHeader.paddingRight = 24;
tableHeader.paddingBottom = 0;
tableHeader.paddingLeft = 24;
tableHeader.counterAxisAlignItems = 'CENTER';
tableHeader.primaryAxisAlignItems = 'CENTER';
tableHeader.resize(1136, 48);
tableHeader.clipsContent = false;
tableHeader.fills = [await SOLID(T.backgroundsBgSubtle)];
table.appendChild(tableHeader);
tableHeader.layoutSizingHorizontal = 'FILL';

const tableCellHeader = imp.TypeHeaderAlignmentLeft.createInstance();
tableCellHeader.name = "Table Cell";
tableHeader.appendChild(tableCellHeader);
tableCellHeader.layoutSizingHorizontal = 'FILL';
tableCellHeader.layoutSizingVertical = 'FILL';
const tcLabel = findChild(tableCellHeader, "Label");
if (tcLabel && tcLabel.type === 'TEXT') { await figma.loadFontAsync(tcLabel.fontName); tcLabel.characters = "Task"; }
const foLabel = findChild(tableCellHeader, "Label");
if (foLabel) foLabel.fills = [await SOLID(T.foregroundsFgSubtle)];

const tableCellHeader2 = imp.TypeHeaderAlignmentLeft.createInstance();
tableCellHeader2.name = "Table Cell";
tableCellHeader2.resize(160, 48);
tableHeader.appendChild(tableCellHeader2);
tableCellHeader2.layoutSizingVertical = 'FILL';
const tcLabel2 = findChild(tableCellHeader2, "Label");
if (tcLabel2 && tcLabel2.type === 'TEXT') { await figma.loadFontAsync(tcLabel2.fontName); tcLabel2.characters = "Assignee"; }
const foLabel2 = findChild(tableCellHeader2, "Label");
if (foLabel2) foLabel2.fills = [await SOLID(T.foregroundsFgSubtle)];

const tableCellHeader3 = imp.TypeHeaderAlignmentLeft.createInstance();
tableCellHeader3.name = "Table Cell";
tableCellHeader3.resize(120, 48);
tableHeader.appendChild(tableCellHeader3);
tableCellHeader3.layoutSizingVertical = 'FILL';
const tcLabel3 = findChild(tableCellHeader3, "Label");
if (tcLabel3 && tcLabel3.type === 'TEXT') { await figma.loadFontAsync(tcLabel3.fontName); tcLabel3.characters = "Priority"; }
const foLabel3 = findChild(tableCellHeader3, "Label");
if (foLabel3) foLabel3.fills = [await SOLID(T.foregroundsFgSubtle)];

const tableCellHeader4 = imp.TypeHeaderAlignmentLeft.createInstance();
tableCellHeader4.name = "Table Cell";
tableCellHeader4.resize(130, 48);
tableHeader.appendChild(tableCellHeader4);
tableCellHeader4.layoutSizingVertical = 'FILL';
const tcLabel4 = findChild(tableCellHeader4, "Label");
if (tcLabel4 && tcLabel4.type === 'TEXT') { await figma.loadFontAsync(tcLabel4.fontName); tcLabel4.characters = "Due Date"; }
const foLabel4 = findChild(tableCellHeader4, "Label");
if (foLabel4) foLabel4.fills = [await SOLID(T.foregroundsFgSubtle)];

const tableCellHeader5 = imp.TypeHeaderAlignmentLeft.createInstance();
tableCellHeader5.name = "Table Cell";
tableCellHeader5.resize(140, 48);
tableHeader.appendChild(tableCellHeader5);
tableCellHeader5.layoutSizingVertical = 'FILL';
const tcLabel5 = findChild(tableCellHeader5, "Label");
if (tcLabel5 && tcLabel5.type === 'TEXT') { await figma.loadFontAsync(tcLabel5.fontName); tcLabel5.characters = "Status"; }
const foLabel5 = findChild(tableCellHeader5, "Label");
if (foLabel5) foLabel5.fills = [await SOLID(T.foregroundsFgSubtle)];

const horizontalDividerLine = imp.TypeLine.createInstance();
horizontalDividerLine.name = "Horizontal Divider";
table.appendChild(horizontalDividerLine);
horizontalDividerLine.layoutSizingHorizontal = 'FILL';
horizontalDividerLine.layoutSizingVertical = 'HUG';

const iconSystemAudit = figma.createFrame();
iconSystemAudit.name = "Icon system audit";
iconSystemAudit.layoutMode = 'HORIZONTAL';
iconSystemAudit.primaryAxisSizingMode = 'FIXED';
iconSystemAudit.counterAxisSizingMode = 'FIXED';
iconSystemAudit.itemSpacing = 12;
iconSystemAudit.paddingTop = 0;
iconSystemAudit.paddingRight = 24;
iconSystemAudit.paddingBottom = 0;
iconSystemAudit.paddingLeft = 24;
iconSystemAudit.counterAxisAlignItems = 'CENTER';
iconSystemAudit.primaryAxisAlignItems = 'CENTER';
iconSystemAudit.resize(1136, 48);
iconSystemAudit.clipsContent = false;
iconSystemAudit.fills = [await SOLID(T.backgroundsBgBase)];
table.appendChild(iconSystemAudit);
iconSystemAudit.layoutSizingHorizontal = 'FILL';

const tableCellBase = imp.TypeBaseAlignmentLeft.createInstance();
tableCellBase.name = "Table Cell";
iconSystemAudit.appendChild(tableCellBase);
tableCellBase.layoutSizingHorizontal = 'FILL';
tableCellBase.layoutSizingVertical = 'FILL';
const tcLabel6 = findChild(tableCellBase, "Label");
if (tcLabel6 && tcLabel6.type === 'TEXT') { await figma.loadFontAsync(tcLabel6.fontName); tcLabel6.characters = "Icon system audit"; }
const foLabel6 = findChild(tableCellBase, "Label");
if (foLabel6) foLabel6.fills = [await SOLID(T.foregroundsFgBase)];

const tableCellUser = imp.TypeUserAlignmentLeft.createInstance();
tableCellUser.name = "Table Cell";
tableCellUser.resize(160, 48);
iconSystemAudit.appendChild(tableCellUser);
tableCellUser.layoutSizingVertical = 'FILL';
const tcL = findChild(tableCellUser, "L");
if (tcL && tcL.type === 'TEXT') { await figma.loadFontAsync(tcL.fontName); tcL.characters = "L"; }
const tcLabel7 = findChild(tableCellUser, "Label");
if (tcLabel7 && tcLabel7.type === 'TEXT') { await figma.loadFontAsync(tcLabel7.fontName); tcLabel7.characters = "Lara Sato"; }
const foLabel7 = findChild(tableCellUser, "Label");
if (foLabel7) foLabel7.fills = [await SOLID(T.foregroundsFgBase)];
const swAvatar = tableCellUser.findOne(n => n.type === 'INSTANCE' && n.name === "Avatar") || tableCellUser.findOne(n => n.type === 'INSTANCE');
if (swAvatar) {
swAvatar.swapComponent(imp.ContentLettersTypeRoundedSize2xsmall20);
setProps(swAvatar, {"Initials":"L","Content":"Letters","Type":"Rounded","Size":"2xsmall (20)"});
const tcL2 = findChild(swAvatar, "L");
if (tcL2 && tcL2.type === 'TEXT') { await figma.loadFontAsync(tcL2.fontName); tcL2.characters = "L"; }
const foBackground = findChild(swAvatar, "Background");
if (foBackground) foBackground.fills = [await SOLID(T.tagSuccessTagGreenBg)];
const foL = findChild(swAvatar, "L");
if (foL) foL.fills = [await SOLID(T.tagSuccessTagGreenText)];
}

const tableCellBadge = imp.TypeBadgeAlignmentLeft.createInstance();
tableCellBadge.name = "Table Cell";
tableCellBadge.resize(120, 48);
iconSystemAudit.appendChild(tableCellBadge);
tableCellBadge.layoutSizingVertical = 'FILL';
const tcBadge = findChild(tableCellBadge, "Badge");
if (tcBadge && tcBadge.type === 'TEXT') { await figma.loadFontAsync(tcBadge.fontName); tcBadge.characters = "Low"; }
const swBadge = tableCellBadge.findOne(n => n.type === 'INSTANCE' && n.name === "Badge") || tableCellBadge.findOne(n => n.type === 'INSTANCE');
if (swBadge) {
swBadge.swapComponent(imp.Size2xsmall20StateNeutralRadiusRounded);
setProps(swBadge, {"Show Icon Right":false,"Show Icon Left":false,"Badge":"Low","Size":"2xsmall (20)","State":"Neutral","Radius":"Rounded"});
const tcBadge2 = findChild(swBadge, "Badge");
if (tcBadge2 && tcBadge2.type === 'TEXT') { await figma.loadFontAsync(tcBadge2.fontName); tcBadge2.characters = "Low"; }
const foBadge = findChild(swBadge, "Badge");
if (foBadge) foBadge.fills = [await SOLID(T.tagNeutralTagNeutralText)];
await applyIconFills(swBadge, T.tagNeutralTagNeutralIcon);
}
const ovBadge = tableCellBadge ? findChild(tableCellBadge, "Badge") : null;
const ovPlusMini = ovBadge?.findAll(n => n.name === "plus-mini")?.[0];
if (ovPlusMini) {
ovPlusMini.swapComponent(imp.plusmini);
ovPlusMini.visible = false;
await applyIconFills(ovPlusMini, T.tagNeutralTagNeutralIcon);
}
const ovPlusMini2 = ovBadge?.findAll(n => n.name === "plus-mini")?.[1];
if (ovPlusMini2) {
ovPlusMini2.swapComponent(imp.plusmini);
ovPlusMini2.visible = false;
await applyIconFills(ovPlusMini2, T.tagNeutralTagNeutralIcon);
}

const tableCellSubtle = imp.TypeSubtleAlignmentLeft.createInstance();
tableCellSubtle.name = "Table Cell";
tableCellSubtle.resize(130, 48);
iconSystemAudit.appendChild(tableCellSubtle);
tableCellSubtle.layoutSizingVertical = 'FILL';
const tcLabel8 = findChild(tableCellSubtle, "Label");
if (tcLabel8 && tcLabel8.type === 'TEXT') { await figma.loadFontAsync(tcLabel8.fontName); tcLabel8.characters = "May 7, 2026"; }
const foLabel8 = findChild(tableCellSubtle, "Label");
if (foLabel8) foLabel8.fills = [await SOLID(T.foregroundsFgSubtle)];

const tableCellStatusBadge = imp.TypeStatusBadgeAlignmentLeft.createInstance();
tableCellStatusBadge.name = "Table Cell";
tableCellStatusBadge.resize(140, 48);
iconSystemAudit.appendChild(tableCellStatusBadge);
tableCellStatusBadge.layoutSizingVertical = 'FILL';
const tcLabel9 = findChild(tableCellStatusBadge, "Label");
if (tcLabel9 && tcLabel9.type === 'TEXT') { await figma.loadFontAsync(tcLabel9.fontName); tcLabel9.characters = "To Do"; }
const foLabel9 = findChild(tableCellStatusBadge, "Label");
if (foLabel9) foLabel9.fills = [await SOLID(T.foregroundsFgSubtle)];
const swSquareGreySolid = tableCellStatusBadge.findOne(n => n.type === 'INSTANCE' && n.name === "square-grey-solid") || tableCellStatusBadge.findOne(n => n.type === 'INSTANCE');
if (swSquareGreySolid) {
swSquareGreySolid.swapComponent(imp.squaregreysolid);
const foRectangle4 = findChild(swSquareGreySolid, "Rectangle 4");
if (foRectangle4) foRectangle4.fills = [await SOLID(T.tagNeutralTagNeutralIcon)];
}

const horizontalDividerLine2 = imp.TypeLine.createInstance();
horizontalDividerLine2.name = "Horizontal Divider";
table.appendChild(horizontalDividerLine2);
horizontalDividerLine2.layoutSizingHorizontal = 'FILL';
horizontalDividerLine2.layoutSizingVertical = 'HUG';

const mobileNavRefactor = figma.createFrame();
mobileNavRefactor.name = "Mobile nav refactor";
mobileNavRefactor.layoutMode = 'HORIZONTAL';
mobileNavRefactor.primaryAxisSizingMode = 'FIXED';
mobileNavRefactor.counterAxisSizingMode = 'FIXED';
mobileNavRefactor.itemSpacing = 12;
mobileNavRefactor.paddingTop = 0;
mobileNavRefactor.paddingRight = 24;
mobileNavRefactor.paddingBottom = 0;
mobileNavRefactor.paddingLeft = 24;
mobileNavRefactor.counterAxisAlignItems = 'CENTER';
mobileNavRefactor.primaryAxisAlignItems = 'CENTER';
mobileNavRefactor.resize(1136, 48);
mobileNavRefactor.clipsContent = false;
mobileNavRefactor.fills = [await SOLID(T.backgroundsBgBase)];
table.appendChild(mobileNavRefactor);
mobileNavRefactor.layoutSizingHorizontal = 'FILL';

const tableCellBase2 = imp.TypeBaseAlignmentLeft.createInstance();
tableCellBase2.name = "Table Cell";
mobileNavRefactor.appendChild(tableCellBase2);
tableCellBase2.layoutSizingHorizontal = 'FILL';
tableCellBase2.layoutSizingVertical = 'FILL';
const tcLabel10 = findChild(tableCellBase2, "Label");
if (tcLabel10 && tcLabel10.type === 'TEXT') { await figma.loadFontAsync(tcLabel10.fontName); tcLabel10.characters = "Mobile nav refactor"; }
const foLabel10 = findChild(tableCellBase2, "Label");
if (foLabel10) foLabel10.fills = [await SOLID(T.foregroundsFgBase)];

const tableCellUser2 = imp.TypeUserAlignmentLeft.createInstance();
tableCellUser2.name = "Table Cell";
tableCellUser2.resize(160, 48);
mobileNavRefactor.appendChild(tableCellUser2);
tableCellUser2.layoutSizingVertical = 'FILL';
const tcL3 = findChild(tableCellUser2, "L");
if (tcL3 && tcL3.type === 'TEXT') { await figma.loadFontAsync(tcL3.fontName); tcL3.characters = "S"; }
const tcLabel11 = findChild(tableCellUser2, "Label");
if (tcLabel11 && tcLabel11.type === 'TEXT') { await figma.loadFontAsync(tcLabel11.fontName); tcLabel11.characters = "Sara Nelson"; }
const foLabel11 = findChild(tableCellUser2, "Label");
if (foLabel11) foLabel11.fills = [await SOLID(T.foregroundsFgBase)];
const swAvatar2 = tableCellUser2.findOne(n => n.type === 'INSTANCE' && n.name === "Avatar") || tableCellUser2.findOne(n => n.type === 'INSTANCE');
if (swAvatar2) {
swAvatar2.swapComponent(imp.ContentLettersTypeRoundedSize2xsmall20);
setProps(swAvatar2, {"Initials":"S","Content":"Letters","Type":"Rounded","Size":"2xsmall (20)"});
const tcL4 = findChild(swAvatar2, "L");
if (tcL4 && tcL4.type === 'TEXT') { await figma.loadFontAsync(tcL4.fontName); tcL4.characters = "S"; }
const foBackground2 = findChild(swAvatar2, "Background");
if (foBackground2) foBackground2.fills = [await SOLID(T.tagBlueTagBlueBg)];
const foL2 = findChild(swAvatar2, "L");
if (foL2) foL2.fills = [await SOLID(T.tagBlueTagBlueText)];
}

const tableCellBadge2 = imp.TypeBadgeAlignmentLeft.createInstance();
tableCellBadge2.name = "Table Cell";
tableCellBadge2.resize(120, 48);
mobileNavRefactor.appendChild(tableCellBadge2);
tableCellBadge2.layoutSizingVertical = 'FILL';
const tcBadge3 = findChild(tableCellBadge2, "Badge");
if (tcBadge3 && tcBadge3.type === 'TEXT') { await figma.loadFontAsync(tcBadge3.fontName); tcBadge3.characters = "Medium"; }
const swBadge2 = tableCellBadge2.findOne(n => n.type === 'INSTANCE' && n.name === "Badge") || tableCellBadge2.findOne(n => n.type === 'INSTANCE');
if (swBadge2) {
swBadge2.swapComponent(imp.Size2xsmall20StateWarningRadiusRounded);
setProps(swBadge2, {"Show Icon Right":false,"Show Icon Left":false,"Badge":"Medium","Size":"2xsmall (20)","State":"Warning","Radius":"Rounded"});
const tcBadge4 = findChild(swBadge2, "Badge");
if (tcBadge4 && tcBadge4.type === 'TEXT') { await figma.loadFontAsync(tcBadge4.fontName); tcBadge4.characters = "Medium"; }
const foBadge2 = findChild(swBadge2, "Badge");
if (foBadge2) foBadge2.fills = [await SOLID(T.tagWarningTagOrangeText)];
await applyIconFills(swBadge2, T.tagWarningTagOrangeIcon);
}
const ovBadge2 = tableCellBadge2 ? findChild(tableCellBadge2, "Badge") : null;
const ovPlusMini3 = ovBadge2?.findAll(n => n.name === "plus-mini")?.[0];
if (ovPlusMini3) {
ovPlusMini3.swapComponent(imp.plusmini);
ovPlusMini3.visible = false;
await applyIconFills(ovPlusMini3, T.tagWarningTagOrangeIcon);
}
const ovPlusMini4 = ovBadge2?.findAll(n => n.name === "plus-mini")?.[1];
if (ovPlusMini4) {
ovPlusMini4.swapComponent(imp.plusmini);
ovPlusMini4.visible = false;
await applyIconFills(ovPlusMini4, T.tagWarningTagOrangeIcon);
}

const tableCellSubtle2 = imp.TypeSubtleAlignmentLeft.createInstance();
tableCellSubtle2.name = "Table Cell";
tableCellSubtle2.resize(130, 48);
mobileNavRefactor.appendChild(tableCellSubtle2);
tableCellSubtle2.layoutSizingVertical = 'FILL';
const tcLabel12 = findChild(tableCellSubtle2, "Label");
if (tcLabel12 && tcLabel12.type === 'TEXT') { await figma.loadFontAsync(tcLabel12.fontName); tcLabel12.characters = "May 5, 2026"; }
const foLabel12 = findChild(tableCellSubtle2, "Label");
if (foLabel12) foLabel12.fills = [await SOLID(T.foregroundsFgSubtle)];

const tableCellStatusBadge2 = imp.TypeStatusBadgeAlignmentLeft.createInstance();
tableCellStatusBadge2.name = "Table Cell";
tableCellStatusBadge2.resize(140, 48);
mobileNavRefactor.appendChild(tableCellStatusBadge2);
tableCellStatusBadge2.layoutSizingVertical = 'FILL';
const tcLabel13 = findChild(tableCellStatusBadge2, "Label");
if (tcLabel13 && tcLabel13.type === 'TEXT') { await figma.loadFontAsync(tcLabel13.fontName); tcLabel13.characters = "In Progress"; }
const foLabel13 = findChild(tableCellStatusBadge2, "Label");
if (foLabel13) foLabel13.fills = [await SOLID(T.foregroundsFgSubtle)];
const swSquareBlueSolid = tableCellStatusBadge2.findOne(n => n.type === 'INSTANCE' && n.name === "square-blue-solid") || tableCellStatusBadge2.findOne(n => n.type === 'INSTANCE');
if (swSquareBlueSolid) {
swSquareBlueSolid.swapComponent(imp.squarebluesolid);
const foRectangle42 = findChild(swSquareBlueSolid, "Rectangle 4");
if (foRectangle42) foRectangle42.fills = [await SOLID(T.tagBlueTagBlueIcon)];
}

const horizontalDividerLine3 = imp.TypeLine.createInstance();
horizontalDividerLine3.name = "Horizontal Divider";
table.appendChild(horizontalDividerLine3);
horizontalDividerLine3.layoutSizingHorizontal = 'FILL';
horizontalDividerLine3.layoutSizingVertical = 'HUG';

const performanceAudit = figma.createFrame();
performanceAudit.name = "Performance audit";
performanceAudit.layoutMode = 'HORIZONTAL';
performanceAudit.primaryAxisSizingMode = 'FIXED';
performanceAudit.counterAxisSizingMode = 'FIXED';
performanceAudit.itemSpacing = 12;
performanceAudit.paddingTop = 0;
performanceAudit.paddingRight = 24;
performanceAudit.paddingBottom = 0;
performanceAudit.paddingLeft = 24;
performanceAudit.counterAxisAlignItems = 'CENTER';
performanceAudit.primaryAxisAlignItems = 'CENTER';
performanceAudit.resize(1136, 48);
performanceAudit.clipsContent = false;
performanceAudit.fills = [await SOLID(T.backgroundsBgBase)];
table.appendChild(performanceAudit);
performanceAudit.layoutSizingHorizontal = 'FILL';

const tableCellBase3 = imp.TypeBaseAlignmentLeft.createInstance();
tableCellBase3.name = "Table Cell";
performanceAudit.appendChild(tableCellBase3);
tableCellBase3.layoutSizingHorizontal = 'FILL';
tableCellBase3.layoutSizingVertical = 'FILL';
const tcLabel14 = findChild(tableCellBase3, "Label");
if (tcLabel14 && tcLabel14.type === 'TEXT') { await figma.loadFontAsync(tcLabel14.fontName); tcLabel14.characters = "Performance audit"; }
const foLabel14 = findChild(tableCellBase3, "Label");
if (foLabel14) foLabel14.fills = [await SOLID(T.foregroundsFgBase)];

const tableCellUser3 = imp.TypeUserAlignmentLeft.createInstance();
tableCellUser3.name = "Table Cell";
tableCellUser3.resize(160, 48);
performanceAudit.appendChild(tableCellUser3);
tableCellUser3.layoutSizingVertical = 'FILL';
const tcL5 = findChild(tableCellUser3, "L");
if (tcL5 && tcL5.type === 'TEXT') { await figma.loadFontAsync(tcL5.fontName); tcL5.characters = "O"; }
const tcLabel15 = findChild(tableCellUser3, "Label");
if (tcLabel15 && tcLabel15.type === 'TEXT') { await figma.loadFontAsync(tcLabel15.fontName); tcLabel15.characters = "Owen King"; }
const foLabel15 = findChild(tableCellUser3, "Label");
if (foLabel15) foLabel15.fills = [await SOLID(T.foregroundsFgBase)];
const swAvatar3 = tableCellUser3.findOne(n => n.type === 'INSTANCE' && n.name === "Avatar") || tableCellUser3.findOne(n => n.type === 'INSTANCE');
if (swAvatar3) {
swAvatar3.swapComponent(imp.ContentLettersTypeRoundedSize2xsmall20);
setProps(swAvatar3, {"Initials":"O","Content":"Letters","Type":"Rounded","Size":"2xsmall (20)"});
const tcL6 = findChild(swAvatar3, "L");
if (tcL6 && tcL6.type === 'TEXT') { await figma.loadFontAsync(tcL6.fontName); tcL6.characters = "O"; }
const foBackground3 = findChild(swAvatar3, "Background");
if (foBackground3) foBackground3.fills = [await SOLID(T.tagNeutralTagNeutralBg)];
const foL3 = findChild(swAvatar3, "L");
if (foL3) foL3.fills = [await SOLID(T.tagNeutralTagNeutralText)];
}

const tableCellBadge3 = imp.TypeBadgeAlignmentLeft.createInstance();
tableCellBadge3.name = "Table Cell";
tableCellBadge3.resize(120, 48);
performanceAudit.appendChild(tableCellBadge3);
tableCellBadge3.layoutSizingVertical = 'FILL';
const tcBadge5 = findChild(tableCellBadge3, "Badge");
if (tcBadge5 && tcBadge5.type === 'TEXT') { await figma.loadFontAsync(tcBadge5.fontName); tcBadge5.characters = "High"; }
const swBadge3 = tableCellBadge3.findOne(n => n.type === 'INSTANCE' && n.name === "Badge") || tableCellBadge3.findOne(n => n.type === 'INSTANCE');
if (swBadge3) {
swBadge3.swapComponent(imp.Size2xsmall20StateErrorRadiusRounded);
setProps(swBadge3, {"Show Icon Left":false,"Show Icon Right":false,"Badge":"High","Size":"2xsmall (20)","State":"Error","Radius":"Rounded"});
const tcBadge6 = findChild(swBadge3, "Badge");
if (tcBadge6 && tcBadge6.type === 'TEXT') { await figma.loadFontAsync(tcBadge6.fontName); tcBadge6.characters = "High"; }
const foBadge3 = findChild(swBadge3, "Badge");
if (foBadge3) foBadge3.fills = [await SOLID(T.tagErrorTagRedText)];
await applyIconFills(swBadge3, T.tagErrorTagRedIcon);
}
const ovBadge3 = tableCellBadge3 ? findChild(tableCellBadge3, "Badge") : null;
const ovPlusMini5 = ovBadge3?.findAll(n => n.name === "plus-mini")?.[0];
if (ovPlusMini5) {
ovPlusMini5.swapComponent(imp.plusmini);
ovPlusMini5.visible = false;
await applyIconFills(ovPlusMini5, T.tagErrorTagRedIcon);
}
const ovPlusMini6 = ovBadge3?.findAll(n => n.name === "plus-mini")?.[1];
if (ovPlusMini6) {
ovPlusMini6.swapComponent(imp.plusmini);
ovPlusMini6.visible = false;
await applyIconFills(ovPlusMini6, T.tagErrorTagRedIcon);
}

const tableCellSubtle3 = imp.TypeSubtleAlignmentLeft.createInstance();
tableCellSubtle3.name = "Table Cell";
tableCellSubtle3.resize(130, 48);
performanceAudit.appendChild(tableCellSubtle3);
tableCellSubtle3.layoutSizingVertical = 'FILL';
const tcLabel16 = findChild(tableCellSubtle3, "Label");
if (tcLabel16 && tcLabel16.type === 'TEXT') { await figma.loadFontAsync(tcLabel16.fontName); tcLabel16.characters = "May 3, 2026"; }
const foLabel16 = findChild(tableCellSubtle3, "Label");
if (foLabel16) foLabel16.fills = [await SOLID(T.foregroundsFgSubtle)];

const tableCellStatusBadge3 = imp.TypeStatusBadgeAlignmentLeft.createInstance();
tableCellStatusBadge3.name = "Table Cell";
tableCellStatusBadge3.resize(140, 48);
performanceAudit.appendChild(tableCellStatusBadge3);
tableCellStatusBadge3.layoutSizingVertical = 'FILL';
const tcLabel17 = findChild(tableCellStatusBadge3, "Label");
if (tcLabel17 && tcLabel17.type === 'TEXT') { await figma.loadFontAsync(tcLabel17.fontName); tcLabel17.characters = "In Review"; }
const foLabel17 = findChild(tableCellStatusBadge3, "Label");
if (foLabel17) foLabel17.fills = [await SOLID(T.foregroundsFgSubtle)];
const swSquareOrangeSolid = tableCellStatusBadge3.findOne(n => n.type === 'INSTANCE' && n.name === "square-orange-solid") || tableCellStatusBadge3.findOne(n => n.type === 'INSTANCE');
if (swSquareOrangeSolid) {
swSquareOrangeSolid.swapComponent(imp.squareorangesolid);
const foRectangle43 = findChild(swSquareOrangeSolid, "Rectangle 4");
if (foRectangle43) foRectangle43.fills = [await SOLID(T.tagWarningTagOrangeIcon)];
}

const horizontalDividerLine4 = imp.TypeLine.createInstance();
horizontalDividerLine4.name = "Horizontal Divider";
table.appendChild(horizontalDividerLine4);
horizontalDividerLine4.layoutSizingHorizontal = 'FILL';
horizontalDividerLine4.layoutSizingVertical = 'HUG';

const userResearchInterviews = figma.createFrame();
userResearchInterviews.name = "User research interviews";
userResearchInterviews.layoutMode = 'HORIZONTAL';
userResearchInterviews.primaryAxisSizingMode = 'FIXED';
userResearchInterviews.counterAxisSizingMode = 'FIXED';
userResearchInterviews.itemSpacing = 12;
userResearchInterviews.paddingTop = 0;
userResearchInterviews.paddingRight = 24;
userResearchInterviews.paddingBottom = 0;
userResearchInterviews.paddingLeft = 24;
userResearchInterviews.counterAxisAlignItems = 'CENTER';
userResearchInterviews.primaryAxisAlignItems = 'CENTER';
userResearchInterviews.resize(1136, 48);
userResearchInterviews.clipsContent = false;
userResearchInterviews.fills = [await SOLID(T.backgroundsBgBase)];
table.appendChild(userResearchInterviews);
userResearchInterviews.layoutSizingHorizontal = 'FILL';

const tableCellBase4 = imp.TypeBaseAlignmentLeft.createInstance();
tableCellBase4.name = "Table Cell";
userResearchInterviews.appendChild(tableCellBase4);
tableCellBase4.layoutSizingHorizontal = 'FILL';
tableCellBase4.layoutSizingVertical = 'FILL';
const tcLabel18 = findChild(tableCellBase4, "Label");
if (tcLabel18 && tcLabel18.type === 'TEXT') { await figma.loadFontAsync(tcLabel18.fontName); tcLabel18.characters = "User research interviews"; }
const foLabel18 = findChild(tableCellBase4, "Label");
if (foLabel18) foLabel18.fills = [await SOLID(T.foregroundsFgBase)];

const tableCellUser4 = imp.TypeUserAlignmentLeft.createInstance();
tableCellUser4.name = "Table Cell";
tableCellUser4.resize(160, 48);
userResearchInterviews.appendChild(tableCellUser4);
tableCellUser4.layoutSizingVertical = 'FILL';
const tcL7 = findChild(tableCellUser4, "L");
if (tcL7 && tcL7.type === 'TEXT') { await figma.loadFontAsync(tcL7.fontName); tcL7.characters = "P"; }
const tcLabel19 = findChild(tableCellUser4, "Label");
if (tcLabel19 && tcLabel19.type === 'TEXT') { await figma.loadFontAsync(tcLabel19.fontName); tcLabel19.characters = "Priya Rao"; }
const foLabel19 = findChild(tableCellUser4, "Label");
if (foLabel19) foLabel19.fills = [await SOLID(T.foregroundsFgBase)];
const swAvatar4 = tableCellUser4.findOne(n => n.type === 'INSTANCE' && n.name === "Avatar") || tableCellUser4.findOne(n => n.type === 'INSTANCE');
if (swAvatar4) {
swAvatar4.swapComponent(imp.ContentLettersTypeRoundedSize2xsmall20);
setProps(swAvatar4, {"Initials":"P","Content":"Letters","Type":"Rounded","Size":"2xsmall (20)"});
const tcL8 = findChild(swAvatar4, "L");
if (tcL8 && tcL8.type === 'TEXT') { await figma.loadFontAsync(tcL8.fontName); tcL8.characters = "P"; }
const foBackground4 = findChild(swAvatar4, "Background");
if (foBackground4) foBackground4.fills = [await SOLID(T.tagWarningTagOrangeBg)];
const foL4 = findChild(swAvatar4, "L");
if (foL4) foL4.fills = [await SOLID(T.tagWarningTagOrangeText)];
}

const tableCellBadge4 = imp.TypeBadgeAlignmentLeft.createInstance();
tableCellBadge4.name = "Table Cell";
tableCellBadge4.resize(120, 48);
userResearchInterviews.appendChild(tableCellBadge4);
tableCellBadge4.layoutSizingVertical = 'FILL';
const tcBadge7 = findChild(tableCellBadge4, "Badge");
if (tcBadge7 && tcBadge7.type === 'TEXT') { await figma.loadFontAsync(tcBadge7.fontName); tcBadge7.characters = "Medium"; }
const swBadge4 = tableCellBadge4.findOne(n => n.type === 'INSTANCE' && n.name === "Badge") || tableCellBadge4.findOne(n => n.type === 'INSTANCE');
if (swBadge4) {
swBadge4.swapComponent(imp.Size2xsmall20StateWarningRadiusRounded);
setProps(swBadge4, {"Show Icon Right":false,"Show Icon Left":false,"Badge":"Medium","Size":"2xsmall (20)","State":"Warning","Radius":"Rounded"});
const tcBadge8 = findChild(swBadge4, "Badge");
if (tcBadge8 && tcBadge8.type === 'TEXT') { await figma.loadFontAsync(tcBadge8.fontName); tcBadge8.characters = "Medium"; }
const foBadge4 = findChild(swBadge4, "Badge");
if (foBadge4) foBadge4.fills = [await SOLID(T.tagWarningTagOrangeText)];
await applyIconFills(swBadge4, T.tagWarningTagOrangeIcon);
}
const ovBadge4 = tableCellBadge4 ? findChild(tableCellBadge4, "Badge") : null;
const ovPlusMini7 = ovBadge4?.findAll(n => n.name === "plus-mini")?.[0];
if (ovPlusMini7) {
ovPlusMini7.swapComponent(imp.plusmini);
ovPlusMini7.visible = false;
await applyIconFills(ovPlusMini7, T.tagWarningTagOrangeIcon);
}
const ovPlusMini8 = ovBadge4?.findAll(n => n.name === "plus-mini")?.[1];
if (ovPlusMini8) {
ovPlusMini8.swapComponent(imp.plusmini);
ovPlusMini8.visible = false;
await applyIconFills(ovPlusMini8, T.tagWarningTagOrangeIcon);
}

const tableCellSubtle4 = imp.TypeSubtleAlignmentLeft.createInstance();
tableCellSubtle4.name = "Table Cell";
tableCellSubtle4.resize(130, 48);
userResearchInterviews.appendChild(tableCellSubtle4);
tableCellSubtle4.layoutSizingVertical = 'FILL';
const tcLabel20 = findChild(tableCellSubtle4, "Label");
if (tcLabel20 && tcLabel20.type === 'TEXT') { await figma.loadFontAsync(tcLabel20.fontName); tcLabel20.characters = "May 2, 2026"; }
const foLabel20 = findChild(tableCellSubtle4, "Label");
if (foLabel20) foLabel20.fills = [await SOLID(T.foregroundsFgSubtle)];

const tableCellStatusBadge4 = imp.TypeStatusBadgeAlignmentLeft.createInstance();
tableCellStatusBadge4.name = "Table Cell";
tableCellStatusBadge4.resize(140, 48);
userResearchInterviews.appendChild(tableCellStatusBadge4);
tableCellStatusBadge4.layoutSizingVertical = 'FILL';
const tcLabel21 = findChild(tableCellStatusBadge4, "Label");
if (tcLabel21 && tcLabel21.type === 'TEXT') { await figma.loadFontAsync(tcLabel21.fontName); tcLabel21.characters = "To Do"; }
const foLabel21 = findChild(tableCellStatusBadge4, "Label");
if (foLabel21) foLabel21.fills = [await SOLID(T.foregroundsFgSubtle)];
const swSquareGreySolid2 = tableCellStatusBadge4.findOne(n => n.type === 'INSTANCE' && n.name === "square-grey-solid") || tableCellStatusBadge4.findOne(n => n.type === 'INSTANCE');
if (swSquareGreySolid2) {
swSquareGreySolid2.swapComponent(imp.squaregreysolid);
const foRectangle44 = findChild(swSquareGreySolid2, "Rectangle 4");
if (foRectangle44) foRectangle44.fills = [await SOLID(T.tagNeutralTagNeutralIcon)];
}

const horizontalDividerLine5 = imp.TypeLine.createInstance();
horizontalDividerLine5.name = "Horizontal Divider";
table.appendChild(horizontalDividerLine5);
horizontalDividerLine5.layoutSizingHorizontal = 'FILL';
horizontalDividerLine5.layoutSizingVertical = 'HUG';

const setupCiCdPipeline = figma.createFrame();
setupCiCdPipeline.name = "Setup CI/CD pipeline";
setupCiCdPipeline.layoutMode = 'HORIZONTAL';
setupCiCdPipeline.primaryAxisSizingMode = 'FIXED';
setupCiCdPipeline.counterAxisSizingMode = 'FIXED';
setupCiCdPipeline.itemSpacing = 12;
setupCiCdPipeline.paddingTop = 0;
setupCiCdPipeline.paddingRight = 24;
setupCiCdPipeline.paddingBottom = 0;
setupCiCdPipeline.paddingLeft = 24;
setupCiCdPipeline.counterAxisAlignItems = 'CENTER';
setupCiCdPipeline.primaryAxisAlignItems = 'CENTER';
setupCiCdPipeline.resize(1136, 48);
setupCiCdPipeline.clipsContent = false;
setupCiCdPipeline.fills = [await SOLID(T.backgroundsBgBase)];
table.appendChild(setupCiCdPipeline);
setupCiCdPipeline.layoutSizingHorizontal = 'FILL';

const tableCellBase5 = imp.TypeBaseAlignmentLeft.createInstance();
tableCellBase5.name = "Table Cell";
setupCiCdPipeline.appendChild(tableCellBase5);
tableCellBase5.layoutSizingHorizontal = 'FILL';
tableCellBase5.layoutSizingVertical = 'FILL';
const tcLabel22 = findChild(tableCellBase5, "Label");
if (tcLabel22 && tcLabel22.type === 'TEXT') { await figma.loadFontAsync(tcLabel22.fontName); tcLabel22.characters = "Setup CI/CD pipeline"; }
const foLabel22 = findChild(tableCellBase5, "Label");
if (foLabel22) foLabel22.fills = [await SOLID(T.foregroundsFgBase)];

const tableCellUser5 = imp.TypeUserAlignmentLeft.createInstance();
tableCellUser5.name = "Table Cell";
tableCellUser5.resize(160, 48);
setupCiCdPipeline.appendChild(tableCellUser5);
tableCellUser5.layoutSizingVertical = 'FILL';
const tcL9 = findChild(tableCellUser5, "L");
if (tcL9 && tcL9.type === 'TEXT') { await figma.loadFontAsync(tcL9.fontName); tcL9.characters = "M"; }
const tcLabel23 = findChild(tableCellUser5, "Label");
if (tcLabel23 && tcLabel23.type === 'TEXT') { await figma.loadFontAsync(tcLabel23.fontName); tcLabel23.characters = "Mark Tan"; }
const foLabel23 = findChild(tableCellUser5, "Label");
if (foLabel23) foLabel23.fills = [await SOLID(T.foregroundsFgBase)];
const swAvatar5 = tableCellUser5.findOne(n => n.type === 'INSTANCE' && n.name === "Avatar") || tableCellUser5.findOne(n => n.type === 'INSTANCE');
if (swAvatar5) {
swAvatar5.swapComponent(imp.ContentLettersTypeRoundedSize2xsmall20);
setProps(swAvatar5, {"Initials":"M","Content":"Letters","Type":"Rounded","Size":"2xsmall (20)"});
const tcL10 = findChild(swAvatar5, "L");
if (tcL10 && tcL10.type === 'TEXT') { await figma.loadFontAsync(tcL10.fontName); tcL10.characters = "M"; }
const foBackground5 = findChild(swAvatar5, "Background");
if (foBackground5) foBackground5.fills = [await SOLID(T.tagPurpleTagPurpleBg)];
const foL5 = findChild(swAvatar5, "L");
if (foL5) foL5.fills = [await SOLID(T.tagPurpleTagPurpleText)];
}

const tableCellBadge5 = imp.TypeBadgeAlignmentLeft.createInstance();
tableCellBadge5.name = "Table Cell";
tableCellBadge5.resize(120, 48);
setupCiCdPipeline.appendChild(tableCellBadge5);
tableCellBadge5.layoutSizingVertical = 'FILL';
const tcBadge9 = findChild(tableCellBadge5, "Badge");
if (tcBadge9 && tcBadge9.type === 'TEXT') { await figma.loadFontAsync(tcBadge9.fontName); tcBadge9.characters = "High"; }
const swBadge5 = tableCellBadge5.findOne(n => n.type === 'INSTANCE' && n.name === "Badge") || tableCellBadge5.findOne(n => n.type === 'INSTANCE');
if (swBadge5) {
swBadge5.swapComponent(imp.Size2xsmall20StateErrorRadiusRounded);
setProps(swBadge5, {"Show Icon Left":false,"Show Icon Right":false,"Badge":"High","Size":"2xsmall (20)","State":"Error","Radius":"Rounded"});
const tcBadge10 = findChild(swBadge5, "Badge");
if (tcBadge10 && tcBadge10.type === 'TEXT') { await figma.loadFontAsync(tcBadge10.fontName); tcBadge10.characters = "High"; }
const foBadge5 = findChild(swBadge5, "Badge");
if (foBadge5) foBadge5.fills = [await SOLID(T.tagErrorTagRedText)];
await applyIconFills(swBadge5, T.tagErrorTagRedIcon);
}
const ovBadge5 = tableCellBadge5 ? findChild(tableCellBadge5, "Badge") : null;
const ovPlusMini9 = ovBadge5?.findAll(n => n.name === "plus-mini")?.[0];
if (ovPlusMini9) {
ovPlusMini9.swapComponent(imp.plusmini);
ovPlusMini9.visible = false;
await applyIconFills(ovPlusMini9, T.tagErrorTagRedIcon);
}
const ovPlusMini10 = ovBadge5?.findAll(n => n.name === "plus-mini")?.[1];
if (ovPlusMini10) {
ovPlusMini10.swapComponent(imp.plusmini);
ovPlusMini10.visible = false;
await applyIconFills(ovPlusMini10, T.tagErrorTagRedIcon);
}

const tableCellSubtle5 = imp.TypeSubtleAlignmentLeft.createInstance();
tableCellSubtle5.name = "Table Cell";
tableCellSubtle5.resize(130, 48);
setupCiCdPipeline.appendChild(tableCellSubtle5);
tableCellSubtle5.layoutSizingVertical = 'FILL';
const tcLabel24 = findChild(tableCellSubtle5, "Label");
if (tcLabel24 && tcLabel24.type === 'TEXT') { await figma.loadFontAsync(tcLabel24.fontName); tcLabel24.characters = "May 1, 2026"; }
const foLabel24 = findChild(tableCellSubtle5, "Label");
if (foLabel24) foLabel24.fills = [await SOLID(T.foregroundsFgSubtle)];

const tableCellStatusBadge5 = imp.TypeStatusBadgeAlignmentLeft.createInstance();
tableCellStatusBadge5.name = "Table Cell";
tableCellStatusBadge5.resize(140, 48);
setupCiCdPipeline.appendChild(tableCellStatusBadge5);
tableCellStatusBadge5.layoutSizingVertical = 'FILL';
const tcLabel25 = findChild(tableCellStatusBadge5, "Label");
if (tcLabel25 && tcLabel25.type === 'TEXT') { await figma.loadFontAsync(tcLabel25.fontName); tcLabel25.characters = "In Progress"; }
const foLabel25 = findChild(tableCellStatusBadge5, "Label");
if (foLabel25) foLabel25.fills = [await SOLID(T.foregroundsFgSubtle)];
const swSquareBlueSolid2 = tableCellStatusBadge5.findOne(n => n.type === 'INSTANCE' && n.name === "square-blue-solid") || tableCellStatusBadge5.findOne(n => n.type === 'INSTANCE');
if (swSquareBlueSolid2) {
swSquareBlueSolid2.swapComponent(imp.squarebluesolid);
const foRectangle45 = findChild(swSquareBlueSolid2, "Rectangle 4");
if (foRectangle45) foRectangle45.fills = [await SOLID(T.tagBlueTagBlueIcon)];
}

const horizontalDividerLine6 = imp.TypeLine.createInstance();
horizontalDividerLine6.name = "Horizontal Divider";
table.appendChild(horizontalDividerLine6);
horizontalDividerLine6.layoutSizingHorizontal = 'FILL';
horizontalDividerLine6.layoutSizingVertical = 'HUG';

const accessibilityPass = figma.createFrame();
accessibilityPass.name = "Accessibility pass";
accessibilityPass.layoutMode = 'HORIZONTAL';
accessibilityPass.primaryAxisSizingMode = 'FIXED';
accessibilityPass.counterAxisSizingMode = 'FIXED';
accessibilityPass.itemSpacing = 12;
accessibilityPass.paddingTop = 0;
accessibilityPass.paddingRight = 24;
accessibilityPass.paddingBottom = 0;
accessibilityPass.paddingLeft = 24;
accessibilityPass.counterAxisAlignItems = 'CENTER';
accessibilityPass.primaryAxisAlignItems = 'CENTER';
accessibilityPass.resize(1136, 48);
accessibilityPass.clipsContent = false;
accessibilityPass.fills = [await SOLID(T.backgroundsBgBase)];
table.appendChild(accessibilityPass);
accessibilityPass.layoutSizingHorizontal = 'FILL';

const tableCellBase6 = imp.TypeBaseAlignmentLeft.createInstance();
tableCellBase6.name = "Table Cell";
accessibilityPass.appendChild(tableCellBase6);
tableCellBase6.layoutSizingHorizontal = 'FILL';
tableCellBase6.layoutSizingVertical = 'FILL';
const tcLabel26 = findChild(tableCellBase6, "Label");
if (tcLabel26 && tcLabel26.type === 'TEXT') { await figma.loadFontAsync(tcLabel26.fontName); tcLabel26.characters = "Accessibility pass"; }
const foLabel26 = findChild(tableCellBase6, "Label");
if (foLabel26) foLabel26.fills = [await SOLID(T.foregroundsFgBase)];

const tableCellUser6 = imp.TypeUserAlignmentLeft.createInstance();
tableCellUser6.name = "Table Cell";
tableCellUser6.resize(160, 48);
accessibilityPass.appendChild(tableCellUser6);
tableCellUser6.layoutSizingVertical = 'FILL';
const tcL11 = findChild(tableCellUser6, "L");
if (tcL11 && tcL11.type === 'TEXT') { await figma.loadFontAsync(tcL11.fontName); tcL11.characters = "O"; }
const tcLabel27 = findChild(tableCellUser6, "Label");
if (tcLabel27 && tcLabel27.type === 'TEXT') { await figma.loadFontAsync(tcLabel27.fontName); tcLabel27.characters = "Owen King"; }
const foLabel27 = findChild(tableCellUser6, "Label");
if (foLabel27) foLabel27.fills = [await SOLID(T.foregroundsFgBase)];
const swAvatar6 = tableCellUser6.findOne(n => n.type === 'INSTANCE' && n.name === "Avatar") || tableCellUser6.findOne(n => n.type === 'INSTANCE');
if (swAvatar6) {
swAvatar6.swapComponent(imp.ContentLettersTypeRoundedSize2xsmall20);
setProps(swAvatar6, {"Initials":"O","Content":"Letters","Type":"Rounded","Size":"2xsmall (20)"});
const tcL12 = findChild(swAvatar6, "L");
if (tcL12 && tcL12.type === 'TEXT') { await figma.loadFontAsync(tcL12.fontName); tcL12.characters = "O"; }
const foBackground6 = findChild(swAvatar6, "Background");
if (foBackground6) foBackground6.fills = [await SOLID(T.tagNeutralTagNeutralBg)];
const foL6 = findChild(swAvatar6, "L");
if (foL6) foL6.fills = [await SOLID(T.tagNeutralTagNeutralText)];
}

const tableCellBadge6 = imp.TypeBadgeAlignmentLeft.createInstance();
tableCellBadge6.name = "Table Cell";
tableCellBadge6.resize(120, 48);
accessibilityPass.appendChild(tableCellBadge6);
tableCellBadge6.layoutSizingVertical = 'FILL';
const tcBadge11 = findChild(tableCellBadge6, "Badge");
if (tcBadge11 && tcBadge11.type === 'TEXT') { await figma.loadFontAsync(tcBadge11.fontName); tcBadge11.characters = "Medium"; }
const swBadge6 = tableCellBadge6.findOne(n => n.type === 'INSTANCE' && n.name === "Badge") || tableCellBadge6.findOne(n => n.type === 'INSTANCE');
if (swBadge6) {
swBadge6.swapComponent(imp.Size2xsmall20StateWarningRadiusRounded);
setProps(swBadge6, {"Show Icon Right":false,"Show Icon Left":false,"Badge":"Medium","Size":"2xsmall (20)","State":"Warning","Radius":"Rounded"});
const tcBadge12 = findChild(swBadge6, "Badge");
if (tcBadge12 && tcBadge12.type === 'TEXT') { await figma.loadFontAsync(tcBadge12.fontName); tcBadge12.characters = "Medium"; }
const foBadge6 = findChild(swBadge6, "Badge");
if (foBadge6) foBadge6.fills = [await SOLID(T.tagWarningTagOrangeText)];
await applyIconFills(swBadge6, T.tagWarningTagOrangeIcon);
}
const ovBadge6 = tableCellBadge6 ? findChild(tableCellBadge6, "Badge") : null;
const ovPlusMini11 = ovBadge6?.findAll(n => n.name === "plus-mini")?.[0];
if (ovPlusMini11) {
ovPlusMini11.swapComponent(imp.plusmini);
ovPlusMini11.visible = false;
await applyIconFills(ovPlusMini11, T.tagWarningTagOrangeIcon);
}
const ovPlusMini12 = ovBadge6?.findAll(n => n.name === "plus-mini")?.[1];
if (ovPlusMini12) {
ovPlusMini12.swapComponent(imp.plusmini);
ovPlusMini12.visible = false;
await applyIconFills(ovPlusMini12, T.tagWarningTagOrangeIcon);
}

const tableCellSubtle6 = imp.TypeSubtleAlignmentLeft.createInstance();
tableCellSubtle6.name = "Table Cell";
tableCellSubtle6.resize(130, 48);
accessibilityPass.appendChild(tableCellSubtle6);
tableCellSubtle6.layoutSizingVertical = 'FILL';
const tcLabel28 = findChild(tableCellSubtle6, "Label");
if (tcLabel28 && tcLabel28.type === 'TEXT') { await figma.loadFontAsync(tcLabel28.fontName); tcLabel28.characters = "Apr 30, 2026"; }
const foLabel28 = findChild(tableCellSubtle6, "Label");
if (foLabel28) foLabel28.fills = [await SOLID(T.foregroundsFgSubtle)];

const tableCellStatusBadge6 = imp.TypeStatusBadgeAlignmentLeft.createInstance();
tableCellStatusBadge6.name = "Table Cell";
tableCellStatusBadge6.resize(140, 48);
accessibilityPass.appendChild(tableCellStatusBadge6);
tableCellStatusBadge6.layoutSizingVertical = 'FILL';
const tcLabel29 = findChild(tableCellStatusBadge6, "Label");
if (tcLabel29 && tcLabel29.type === 'TEXT') { await figma.loadFontAsync(tcLabel29.fontName); tcLabel29.characters = "To Do"; }
const foLabel29 = findChild(tableCellStatusBadge6, "Label");
if (foLabel29) foLabel29.fills = [await SOLID(T.foregroundsFgSubtle)];
const swSquareGreySolid3 = tableCellStatusBadge6.findOne(n => n.type === 'INSTANCE' && n.name === "square-grey-solid") || tableCellStatusBadge6.findOne(n => n.type === 'INSTANCE');
if (swSquareGreySolid3) {
swSquareGreySolid3.swapComponent(imp.squaregreysolid);
const foRectangle46 = findChild(swSquareGreySolid3, "Rectangle 4");
if (foRectangle46) foRectangle46.fills = [await SOLID(T.tagNeutralTagNeutralIcon)];
}

recentTasks.resize(1136, recentTasks.height);


}

// ── Position ──
root.x = Math.round(figma.viewport.center.x - 720);
root.y = Math.round(figma.viewport.center.y - 450);
figma.viewport.scrollAndZoomIntoView([root]);
return 'Done — dashboard view';

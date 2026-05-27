// charts-snippet.js — Snippet (1136×260)

// ── DATA (from data.yaml + views.yaml) ──
const DATA = {
  // TODO: fill from data.yaml + views.yaml
};

// ── Component keys ──
const COMP = {

};

// ── Text styles ──
const STYLES = {
  textCompactTxtCompactMediumPlus: 'edb007633bab9d52364f6c0d78da75d3f40197a7', // Text Compact/txt-compact-medium-plus
  textCompactTxtCompactSmall: '184b1bd4001407d480ae493b95b84e90d347cb52', // Text Compact/txt-compact-small
  textCompactTxtCompactSmallPlus: '76cc3f3552860444bb19f826d0c8428c8d7264dc', // Text Compact/txt-compact-small-plus
};

// ── Effect styles ──
const EFFECTS = {
  cardRest: '018e45b617548e9ac778ceb6d8c1cf245108c5db', // Light/Elevation/card-rest
};

// ── Tokens ──
const T = {
  spacing16: 'VariableID:66fa38c9c8238168f844eee4b16541d4462b42c2/6996:1894', // spacing-16
  spacing24: 'VariableID:f9f59aa761a5b46f53c37d0e8bd544eb529c7b79/6996:1902', // spacing-24
  radius12: 'VariableID:e92b5a3aa058a87489262fd5161b29f8b2b48d5e/6996:1718', // radius-12
  backgroundsBgBase: 'VariableID:a426e4a84e9b344ec6a576ccd94d08a189532d69/13723:1393', // backgrounds/bg-base
  foregroundsFgBase: 'VariableID:155eba32b1cd754e3d29d82fddd40e387753959f/13723:1408', // foregrounds/fg-base
  fontSizeMedium: 'VariableID:e00f44ed717f5b1067887b5278e30cb8094fb68b/6996:1821', // font/size/medium
  fontFamilyBody: 'VariableID:e06d9db3d6ed02de73697eae005622387ab0e8b6/7870:94', // font/family/body
  fontWeight500: 'VariableID:f404fa95f32ace66073174f8f325798a84ca57e4/6996:1829', // font/weight/500
  spacing4: 'VariableID:df05201f6fbd29c44c88e87f4b8842f9c0e94bf1/6996:1900', // spacing-4
  foregroundsFgSubtle: 'VariableID:77e30ee7a903973aac43f720b387e89390946184/13723:1409', // foregrounds/fg-subtle
  fontSizeSmall: 'VariableID:08c154b96f5d46323f201e407bb748cdc453d52e/11733:4', // font/size/small
  fontWeight400: 'VariableID:aa9a1d9edce50530b1c57295d885e98682159acb/6996:1823', // font/weight/400
  radius4: 'VariableID:fc26ff4b40b530c2bed8b79f226427ca30f6de46/6996:1710', // radius-4
  bordersBorderBase: 'VariableID:ffbe5f08347e6455d869b13eaaab921056481e06/13723:1417', // borders/border-base
  tagPurpleTagPurpleIcon: 'VariableID:b55a20e0108d05b4e43b8ac904717f3783da1b0d/13723:1542', // tag/purple/tag-purple-icon
  tagErrorTagRedIcon: 'VariableID:8a1bfa6bb4d1c3e73e69a6aa5fc8d362241d4595/13723:1554', // tag/error/tag-red-icon
  tagWarningTagOrangeIcon: 'VariableID:b08df4fe508b449ebdb5d256e72680a31f26cd9e/13723:1551', // tag/warning/tag-orange-icon
  tagNeutralTagNeutralIcon: 'VariableID:9acf68ac429d615d06b1231878308b831e257784/13723:1539', // tag/neutral/tag-neutral-icon
  tagBlueTagBlueIcon: 'VariableID:303c2dbc9886c58e842b2d131ca498ba1d7b58e1/13723:1545', // tag/blue/tag-blue-icon
  tagSuccessTagGreenIcon: 'VariableID:3da49128df12418eb4f77556623c6434faeb31f0/13723:1548', // tag/success/tag-green-icon
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
page.appendChild(chartCards);
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

chartCards.x = Math.round(figma.viewport.center.x - 568);
chartCards.y = Math.round(figma.viewport.center.y - 130);
figma.viewport.scrollAndZoomIntoView([chartCards]);
return 'Done';

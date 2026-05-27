// stats-snippet.js — Snippet (1136×108)

// ── DATA (from data.yaml + views.yaml) ──
const DATA = {
  // TODO: fill from data.yaml + views.yaml
};

// ── Component keys ──
const COMP = {

};

// ── Text styles ──
const STYLES = {
  textCompactTxtCompactSmall: '184b1bd4001407d480ae493b95b84e90d347cb52', // Text Compact/txt-compact-small
  headersWebsH3: 'adf130ea9e157e6e8bc1ec13b475668221cc831d', // Headers Webs/H3
};

// ── Effect styles ──
const EFFECTS = {
  cardRest: '018e45b617548e9ac778ceb6d8c1cf245108c5db', // Light/Elevation/card-rest
};

// ── Tokens ──
const T = {
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
};

// ── Frozen logic — do not edit below this line ──
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
page.appendChild(statCards);
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

statCards.x = Math.round(figma.viewport.center.x - 568);
statCards.y = Math.round(figma.viewport.center.y - 54);
figma.viewport.scrollAndZoomIntoView([statCards]);
return 'Done';

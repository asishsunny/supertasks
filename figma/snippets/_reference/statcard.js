// statcard-snippet.js — Execute for KPI stat card row.
// Edit DATA block only. Logic is frozen — do not rewrite.

// ── DATA ──────────────────────────────────────────────────────────────────────
const DATA = {
  pageName:  'Dashboard',
  frameName: 'Dashboard v2',
  cards: [
    { label: 'Total Tasks', value: '248', sub: 'All time',           valueDanger: false },
    { label: 'In Progress', value: '64',  sub: '12 due this week',   valueDanger: false },
    { label: 'Completed',   value: '152', sub: '88% on time',        valueDanger: false },
    { label: 'Overdue',     value: '9',   sub: '−3 vs last week',    valueDanger: true  },
  ],
};

// ── Token IDs — from reference/tokens.json ─────────────────────────────
// Update only when DS version changes.
const T = {
  bgBase:   'VariableID:a426e4a84e9b344ec6a576ccd94d08a189532d69/17968:59',
  fgBase:   'VariableID:155eba32b1cd754e3d29d82fddd40e387753959f/17968:47',
  fgSubtle: 'VariableID:77e30ee7a903973aac43f720b387e89390946184/17968:158',
  fgMuted:  'VariableID:f3577a26be5ee797eeb1a13b34c96237cdf238bb/17968:159',
  danger:   'VariableID:833309ac5fb38d1ede5084319750b3b7656db04c/13723:1587',
  sp4:      'VariableID:a1c28706a42ef7439875a76d07c22441141b8742/6996:1903',
  sp8:      'VariableID:0732ac1e93c221a6e6f7eb84ed8b00b62a9d57ef/6996:1898',
  sp16:     'VariableID:66fa38c9c8238168f844eee4b16541d4462b42c2/6996:1894',
  sp24:     'VariableID:f9f59aa761a5b46f53c37d0e8bd544eb529c7b79/6996:1902',
  r8:       'VariableID:4832ceb3fdb882a1ce42f91b75ed1dc3c27b229f/6996:1716',
};

// ── Style keys — source: RULES.md frozen style IDs ────────────────────────────
const STYLES = {
  H2:                  '4278d08d0604b397e820783f5e1006b6477b0ef4',
  txtCompactMedPlus:   'edb007633bab9d52364f6c0d78da75d3f40197a7',
  txtXsmall:           '2fba5bbe8f8c04ee7f241f644ee12899f654094e',
  cardRestShadow:      '018e45b617548e9ac778ceb6d8c1cf245108c5db',
};

// ── Frozen logic — do not edit below this line ────────────────────────────────
await figma.loadAllPagesAsync();
let content;
if (DATA.sectionId) {
  content = await figma.getNodeByIdAsync(DATA.sectionId);
  if (!content) throw new Error('Section not found: ' + DATA.sectionId);
} else {
  const page = figma.root.children.find(p => p.name === DATA.pageName);
  if (!page) throw new Error(`Page "${DATA.pageName}" not found`);
  await figma.setCurrentPageAsync(page);
  const root = page.children.find(n => n.name === DATA.frameName);
  if (!root) throw new Error(`Frame "${DATA.frameName}" not found`);
  content = root.findOne(n => n.name === 'Content');
  if (!content) throw new Error('Content frame not found — run shell execute first');
}

await figma.loadFontAsync({ family: 'Geist', style: 'Regular' });
await figma.loadFontAsync({ family: 'Geist', style: 'Medium' });

const V = async (id) => {
  const v = await figma.variables.getVariableByIdAsync(id);
  if (!v) throw new Error(`Variable not found: ${id} — DS library linked?`);
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

const sty = {};
for (const [k, key] of Object.entries(STYLES)) {
  const s = await figma.importStyleByKeyAsync(key);
  sty[k] = s.id;
}

// ── KPI row ───────────────────────────────────────────────────────────────────
const row = figma.createFrame();
row.name = 'KPI Row';
row.layoutMode = 'HORIZONTAL';
row.primaryAxisSizingMode = 'FIXED';
row.counterAxisSizingMode = 'AUTO';
row.setBoundVariable('itemSpacing', await V(T.sp16));
row.fills = [];
row.clipsContent = false;
content.appendChild(row);
row.layoutSizingHorizontal = 'FILL';

// ── Stat cards ────────────────────────────────────────────────────────────────
for (const card of DATA.cards) {
  const frame = figma.createFrame();
  frame.name = card.label;
  frame.layoutMode = 'VERTICAL';
  frame.primaryAxisSizingMode = 'AUTO';
  frame.counterAxisSizingMode = 'FIXED';
  frame.setBoundVariable('paddingTop',    await V(T.sp16));
  frame.setBoundVariable('paddingBottom', await V(T.sp16));
  frame.setBoundVariable('paddingLeft',   await V(T.sp16));
  frame.setBoundVariable('paddingRight',  await V(T.sp16));
  frame.setBoundVariable('itemSpacing',   await V(T.sp24));
  frame.setBoundVariable('cornerRadius',  await V(T.r8));
  frame.fills = [await SOLID(T.bgBase)];
  frame.clipsContent = true;
  await frame.setEffectStyleIdAsync(sty.cardRestShadow);
  row.appendChild(frame);
  frame.layoutGrow = 1;

  // Label
  const labelTxt = figma.createText();
  labelTxt.characters = card.label;
  await labelTxt.setTextStyleIdAsync(sty.txtCompactMedPlus);
  labelTxt.fills = [await SOLID(T.fgSubtle)];
  frame.appendChild(labelTxt);

  // Value + Sub wrapper (4px gap)
  const valGroup = figma.createFrame();
  valGroup.name = 'Value';
  valGroup.layoutMode = 'VERTICAL';
  valGroup.primaryAxisSizingMode = 'AUTO';
  valGroup.counterAxisSizingMode = 'AUTO';
  valGroup.setBoundVariable('itemSpacing', await V(T.sp4));
  valGroup.fills = [];
  frame.appendChild(valGroup);
  valGroup.layoutSizingHorizontal = 'FILL';

  const valueTxt = figma.createText();
  valueTxt.characters = card.value;
  await valueTxt.setTextStyleIdAsync(sty.H2);
  valueTxt.fills = [await SOLID(card.valueDanger ? T.danger : T.fgBase)];
  valGroup.appendChild(valueTxt);

  const subTxt = figma.createText();
  subTxt.characters = card.sub;
  await subTxt.setTextStyleIdAsync(sty.txtXsmall);
  subTxt.fills = [await SOLID(T.fgMuted)];
  valGroup.appendChild(subTxt);
}

return { kpiRowId: row.id, cards: DATA.cards.length };

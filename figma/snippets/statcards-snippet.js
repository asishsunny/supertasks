// statcards-snippet.js — Stat Cards row (1136×128)

// ── DATA (counts auto-computed from task offsets) ──
// Task due-date offsets from today (negative = overdue)
const taskOffsets = [
  { offset: -6,  status: 'todo' },
  { offset: -2,  status: 'in_progress' },
  { offset: 3,   status: 'in_review' },
  { offset: 7,   status: 'todo' },
  { offset: 12,  status: 'in_progress' },
  { offset: -8,  status: 'in_progress' },
  { offset: 1,   status: 'in_progress' },
  { offset: 5,   status: 'todo' },
  { offset: 15,  status: 'todo' },
  { offset: 18,  status: 'in_progress' },
  { offset: -3,  status: 'todo' },
  { offset: 10,  status: 'in_review' },
  { offset: -10, status: 'done' },
  { offset: 4,   status: 'in_progress' },
  { offset: 20,  status: 'todo' },
  { offset: -5,  status: 'done' },
  { offset: -1,  status: 'in_review' },
  { offset: 8,   status: 'todo' },
];

const total = taskOffsets.length;
const inProgress = taskOffsets.filter(t => t.status === 'in_progress').length;
const completed = taskOffsets.filter(t => t.status === 'done').length;
const overdue = taskOffsets.filter(t => t.offset < 0 && t.status !== 'done').length;

const DATA = {
  cards: [
    { label: 'Total Tasks', value: String(total) },
    { label: 'In Progress', value: String(inProgress) },
    { label: 'Completed',   value: String(completed) },
    { label: 'Overdue',     value: String(overdue) },
  ],
};

// ── Tokens ──
const T = {
  sp16:   'VariableID:66fa38c9c8238168f844eee4b16541d4462b42c2/6996:1894',
  sp24:   'VariableID:f9f59aa761a5b46f53c37d0e8bd544eb529c7b79/6996:1902',
  r12:    'VariableID:e92b5a3aa058a87489262fd5161b29f8b2b48d5e/6996:1718',
  bgBase: 'VariableID:a426e4a84e9b344ec6a576ccd94d08a189532d69/17968:59',
  fgBase: 'VariableID:155eba32b1cd754e3d29d82fddd40e387753959f/17968:47',
  fgError: 'VariableID:385bff17b274a766f7549d1344ddb987ca3e86ea/13723:1416',
};

// ── Styles ──
const STYLES = {
  txtCompactMedPlus: 'edb007633bab9d52364f6c0d78da75d3f40197a7',
  H2:                '4278d08d0604b397e820783f5e1006b6477b0ef4',
  cardRest:          '018e45b617548e9ac778ceb6d8c1cf245108c5db',
};

// ── Frozen logic ──
await figma.loadFontAsync({ family: 'Geist', style: 'Medium' });
await figma.loadFontAsync({ family: 'Geist', style: 'Regular' });
await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });

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
  return figma.variables.setBoundVariableForPaint(
    { type: 'SOLID', color: rgb, opacity: 1 }, 'color', v
  );
};

const sty = {};
for (const [k, key] of Object.entries(STYLES)) {
  const s = await figma.importStyleByKeyAsync(key);
  sty[k] = s.id;
}

// ── Render ──
const row = figma.createFrame();
row.name = 'Stat Cards';
row.layoutMode = 'HORIZONTAL';
row.primaryAxisSizingMode = 'FIXED';
row.resize(1136, 1);
row.counterAxisSizingMode = 'AUTO';
row.setBoundVariable('itemSpacing', await V(T.sp16));
row.fills = [];
row.clipsContent = false;

for (const card of DATA.cards) {
  const frame = figma.createFrame();
  frame.name = card.label;
  frame.layoutMode = 'VERTICAL';
  frame.primaryAxisSizingMode = 'AUTO';
  frame.counterAxisSizingMode = 'FIXED';
  frame.setBoundVariable('paddingTop',    await V(T.sp24));
  frame.setBoundVariable('paddingBottom', await V(T.sp24));
  frame.setBoundVariable('paddingLeft',   await V(T.sp24));
  frame.setBoundVariable('paddingRight',  await V(T.sp24));
  frame.setBoundVariable('itemSpacing',   await V(T.sp16));
  frame.setBoundVariable('topLeftRadius',     await V(T.r12));
  frame.setBoundVariable('topRightRadius',    await V(T.r12));
  frame.setBoundVariable('bottomLeftRadius',  await V(T.r12));
  frame.setBoundVariable('bottomRightRadius', await V(T.r12));
  frame.fills = [await SOLID(T.bgBase)];
  frame.clipsContent = true;
  await frame.setEffectStyleIdAsync(sty.cardRest);
  row.appendChild(frame);
  frame.layoutSizingHorizontal = 'FILL';

  const labelTxt = figma.createText();
  labelTxt.name = 'Label';
  labelTxt.characters = card.label;
  await labelTxt.setTextStyleIdAsync(sty.txtCompactMedPlus);
  labelTxt.fills = [await SOLID(T.fgBase)];
  frame.appendChild(labelTxt);

  const valueTxt = figma.createText();
  valueTxt.name = 'Value';
  valueTxt.characters = card.value;
  await valueTxt.setTextStyleIdAsync(sty.H2);
  valueTxt.fills = [await SOLID(card.error ? T.fgError : T.fgBase)];
  frame.appendChild(valueTxt);
}

figma.currentPage.appendChild(row);
figma.viewport.scrollAndZoomIntoView([row]);
return { id: row.id, cards: DATA.cards.length };

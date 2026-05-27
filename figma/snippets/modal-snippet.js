// modal-snippet.js — Generic form modal (480×auto)
// DATA block injected by build-screen.mjs from data.yaml modals.*

/* __MODAL_DATA__ */

// ── Component keys ──
const COMP = {
  divider: '5b0928ffff3b77cdb0a9de765092cb23d1e04657',
  button: '576fe1cbf94e7d7101e6dd2aa718e6162cb8eaf4',
  kbd: '2698f7b89fc5474ed0033b6c33da647a88a7a58b',
  textInput: 'e7c9b8a059736b0790d8fc980ded5173546941e7',
  textArea: 'bd1f5406d356ddd230c8f16d424fb22f9886c325',
  select: '5415d9807f4608f2623c8079c4939722ea5deaac',
  iconBtnTransparentMuted: '31588456aa1bd491061c5fcdeb04d0d7c87bcdf7',
  xMark: '19baee343aaebb55e7ccc3b1f5e1ba88e0b7ba0d',
  label: '9855219e4e5c7dd4834dacff3c39d8cc09565cdd',
};

// ── Text styles ──
const STYLES = {
  h3: '519b127faf43433cea7182293137df5935e12ad4',
  txtSmall: '293209460cb844f3b3feacdbdb0d2c4205b35035',
};

// ── Effect styles ──
const EFFECTS = {
  cardRest: '018e45b617548e9ac778ceb6d8c1cf245108c5db',
};

// ── Tokens ──
const T = {
  bgBase: 'VariableID:a426e4a84e9b344ec6a576ccd94d08a189532d69/17968:59',
  fgBase: 'VariableID:155eba32b1cd754e3d29d82fddd40e387753959f/17968:47',
  fgMuted: 'VariableID:f3577a26be5ee797eeb1a13b34c96237cdf238bb/17968:159',
  bgOverlay: 'VariableID:24ce4c2f842fa1d703c04c7b87e4a0ac45903713/17834:11',
};

// ── Frozen logic ──
await Promise.all([
  figma.loadFontAsync({ family: 'Geist', style: 'Medium' }),
  figma.loadFontAsync({ family: 'Geist', style: 'Regular' }),
  figma.loadFontAsync({ family: 'Inter', style: 'Regular' }),
  figma.loadFontAsync({ family: 'Inter', style: 'Medium' }),
]);

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

const imp = {};
const _compEntries = Object.entries(COMP);
const _compResults = await Promise.all(_compEntries.map(([, key]) => figma.importComponentByKeyAsync(key)));
for (let i = 0; i < _compEntries.length; i++) imp[_compEntries[i][0]] = _compResults[i];

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

// ── Render ──
function setProps(inst, overrides) {
  const props = {}, cp = inst.componentProperties;
  for (const [k, v] of Object.entries(overrides))
    for (const cpk of Object.keys(cp))
      if (cpk === k || cpk.startsWith(k + '#')) { props[cpk] = v; break; }
  if (Object.keys(props).length) inst.setProperties(props);
}
async function setText(parent, name, chars) {
  const t = parent.findOne(n => n.type === 'TEXT' && n.name === name);
  if (t) { await figma.loadFontAsync(t.fontName); t.characters = chars; }
  return t;
}
async function applyIconFills(parent, paintPromise) {
  const vecs = parent.findAll(n => n.type === 'VECTOR' || n.type === 'BOOLEAN_OPERATION');
  const fill = await paintPromise;
  for (const vec of vecs) vec.fills = [fill];
}
function mkFrame(name, opts = {}) {
  const f = figma.createFrame();
  f.name = name;
  f.layoutMode = opts.dir || 'VERTICAL';
  f.primaryAxisSizingMode = opts.mainSize || 'AUTO';
  f.counterAxisSizingMode = opts.crossSize || 'FIXED';
  f.fills = []; f.clipsContent = false;
  return f;
}
async function mkLabel(text) {
  const inst = imp.label.createInstance();
  inst.name = text;
  setProps(inst, { Label: text, 'Show Optional': false, 'Show Tooltip': false });
  await setText(inst, 'Label', text);
  return inst;
}

// ── Modal ──
const modal = figma.createFrame();
modal.name = DATA.name || 'Modal';
modal.layoutMode = 'VERTICAL';
modal.primaryAxisSizingMode = 'AUTO';
modal.counterAxisSizingMode = 'FIXED';
modal.resize(480, 100);
modal.layoutSizingVertical = 'HUG';
modal.cornerRadius = 12;
modal.fills = [await SOLID(T.bgBase)];
await modal.setEffectStyleIdAsync(eff.cardRest);
modal.clipsContent = true;

// ── HEADER ──
const header = mkFrame('header', { dir: 'VERTICAL', crossSize: 'FIXED' });
header.fills = [];
modal.appendChild(header);
header.layoutSizingHorizontal = 'FILL';
header.layoutSizingVertical = 'HUG';

const titleRow = mkFrame('title + button', { dir: 'HORIZONTAL', crossSize: 'AUTO' });
titleRow.itemSpacing = 8;
titleRow.primaryAxisAlignItems = 'SPACE_BETWEEN';
titleRow.counterAxisAlignItems = 'CENTER';
titleRow.paddingTop = 8; titleRow.paddingBottom = 8;
titleRow.paddingLeft = 24; titleRow.paddingRight = 24;
header.appendChild(titleRow);
titleRow.layoutSizingHorizontal = 'FILL';
titleRow.layoutSizingVertical = 'HUG';

const titleTxt = figma.createText();
titleTxt.name = 'Title'; titleTxt.characters = DATA.title;
await titleTxt.setTextStyleIdAsync(sty.h3);
titleTxt.fills = [await SOLID(T.fgBase)];
titleRow.appendChild(titleTxt);
titleTxt.layoutSizingHorizontal = 'FILL';

const btns = mkFrame('buttons', { dir: 'HORIZONTAL', mainSize: 'AUTO', crossSize: 'AUTO' });
btns.itemSpacing = 4; btns.counterAxisAlignItems = 'CENTER';
titleRow.appendChild(btns);

const kbdInst = imp.kbd.createInstance();
kbdInst.name = 'Kbd';
btns.appendChild(kbdInst);
setProps(kbdInst, { Type: 'Multiple' });
const kbdTxt = kbdInst.findOne(n => n.type === 'TEXT');
if (kbdTxt) { await figma.loadFontAsync(kbdTxt.fontName); kbdTxt.characters = 'Esc'; }

const closeBtn = imp.iconBtnTransparentMuted.createInstance();
closeBtn.name = 'Close';
btns.appendChild(closeBtn);
setProps(closeBtn, { Icon: imp.xMark.id });
await applyIconFills(closeBtn, SOLID(T.fgMuted));

const hDiv = imp.divider.createInstance();
header.appendChild(hDiv);
hDiv.layoutSizingHorizontal = 'FILL';

// ── CONTENT ──
const content = mkFrame('Content');
content.paddingTop = 24; content.paddingBottom = 24;
content.paddingLeft = 24; content.paddingRight = 24;
content.itemSpacing = 20;
modal.appendChild(content);
content.layoutSizingHorizontal = 'FILL';
content.layoutSizingVertical = 'HUG';

// ── Fields (data-driven) ──
const rows = {};
for (const field of DATA.fields) {
  const r = field.row || null;
  if (!rows[r]) rows[r] = [];
  rows[r].push(field);
}

async function renderField(parent, field) {
  const group = mkFrame(field.label + ' Field');
  group.itemSpacing = 6;
  parent.appendChild(group);
  group.layoutSizingHorizontal = 'FILL';

  const lbl = await mkLabel(field.label);
  group.appendChild(lbl);
  lbl.layoutSizingHorizontal = 'FILL';

  if (field.type === 'input') {
    const input = imp.textInput.createInstance();
    input.name = 'Text Input';
    group.appendChild(input);
    input.layoutSizingHorizontal = 'FILL';
    if (field.placeholder) {
      setProps(input, { Placeholder: field.placeholder });
      await setText(input, 'Placeholder', field.placeholder);
    }
    if (field.value) {
      setProps(input, { State: 'Filled' });
      await setText(input, 'Placeholder', field.value);
    }
  } else if (field.type === 'textarea') {
    const ta = imp.textArea.createInstance();
    ta.name = 'Text Area';
    group.appendChild(ta);
    ta.layoutSizingHorizontal = 'FILL';
    if (field.placeholder) {
      setProps(ta, { Placeholder: field.placeholder });
      await setText(ta, 'Placeholder', field.placeholder);
    }
  } else if (field.type === 'select') {
    const sel = imp.select.createInstance();
    sel.name = 'Select';
    group.appendChild(sel);
    sel.layoutSizingHorizontal = 'FILL';
    const display = field.value || field.placeholder || 'Select';
    if (field.value && field.value !== 'Select') {
      setProps(sel, { State: 'Selected' });
    }
    await setText(sel, 'Select', display);
  }
}

for (const [rowKey, fields] of Object.entries(rows)) {
  if (rowKey === 'null') {
    for (const field of fields) await renderField(content, field);
  } else {
    const rowNames = fields.map(f => f.label).join(' + ');
    const row = mkFrame(rowNames, { dir: 'HORIZONTAL' });
    row.itemSpacing = 16;
    content.appendChild(row);
    row.layoutSizingHorizontal = 'FILL';
    row.layoutSizingVertical = 'HUG';
    for (const field of fields) await renderField(row, field);
  }
}

// ── FOOTER ──
const footer = mkFrame('footer', { dir: 'VERTICAL' });
footer.itemSpacing = 0; footer.fills = [];
modal.appendChild(footer);
footer.layoutSizingHorizontal = 'FILL';
footer.layoutSizingVertical = 'HUG';

const fDiv = imp.divider.createInstance();
footer.appendChild(fDiv);
fDiv.layoutSizingHorizontal = 'FILL';

const actions = mkFrame('actions', { dir: 'HORIZONTAL' });
actions.paddingTop = 16; actions.paddingBottom = 16;
actions.paddingLeft = 24; actions.paddingRight = 24;
actions.primaryAxisAlignItems = 'MAX';
actions.counterAxisAlignItems = 'CENTER';
actions.itemSpacing = 8;
footer.appendChild(actions);
actions.layoutSizingHorizontal = 'FILL';
actions.layoutSizingVertical = 'HUG';

const cancelBtn = imp.button.createInstance();
cancelBtn.name = DATA.actions.secondary;
actions.appendChild(cancelBtn);
setProps(cancelBtn, { Label: DATA.actions.secondary, Style: 'Secondary' });

const primaryBtn = imp.button.createInstance();
primaryBtn.name = DATA.actions.primary;
actions.appendChild(primaryBtn);
setProps(primaryBtn, { Label: DATA.actions.primary, Style: 'Primary' });

figma.currentPage.appendChild(modal);
figma.viewport.scrollAndZoomIntoView([modal]);
return { id: modal.id, name: modal.name, w: modal.width, h: modal.height };

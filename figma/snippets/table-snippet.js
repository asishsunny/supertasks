// table-snippet.js — Generic data-driven table with filter, footer, any columns

// ── Date helper — offset from today ──
function dueDate(offset) {
  const d = new Date(); d.setDate(d.getDate() + offset);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const label = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  return { label, overdue: offset < 0 };
}

// ── DATA ──
/* __DATA__ */
const DATA = {
  title: 'Recent Tasks',
  showTitle: true,
  showFilter: false,
  showFooter: false,
  footer: { from: 1, to: 5, total: 18, page: 1, pages: 2 },

  columns: [
    { header: 'Task',     type: 'base',        width: 'FILL' },
    { header: 'Assignee', type: 'user',         width: 160 },
    { header: 'Priority', type: 'badge',        width: 120 },
    { header: 'Due Date', type: 'subtle',       width: 130 },
    { header: 'Status',   type: 'statusBadge',  width: 140 },
    { type: 'actions' },
  ],

  rows: [
    {
      base:        'Icon system audit',
      user:        { name: 'Lara Sato', initial: 'L', color: 'green' },
      badge:       { label: 'Low', state: 'Neutral' },
      ...{ subtle: dueDate(-6).label, overdue: dueDate(-6).overdue },
      statusBadge: 'To Do',
    },
    {
      base:        'Mobile nav refactor',
      user:        { name: 'Sara Nelson', initial: 'S', color: 'blue' },
      badge:       { label: 'Medium', state: 'Warning' },
      ...{ subtle: dueDate(-2).label, overdue: dueDate(-2).overdue },
      statusBadge: 'In Progress',
    },
    {
      base:        'Performance audit',
      user:        { name: 'Owen King', initial: 'O', color: 'neutral' },
      badge:       { label: 'High', state: 'Error' },
      ...{ subtle: dueDate(3).label, overdue: dueDate(3).overdue },
      statusBadge: 'In Review',
    },
    {
      base:        'User research interviews',
      user:        { name: 'Priya Rao', initial: 'P', color: 'orange' },
      badge:       { label: 'Medium', state: 'Warning' },
      ...{ subtle: dueDate(7).label, overdue: dueDate(7).overdue },
      statusBadge: 'To Do',
    },
    {
      base:        'Setup CI/CD pipeline',
      user:        { name: 'Mark Tan', initial: 'M', color: 'purple' },
      badge:       { label: 'High', state: 'Error' },
      ...{ subtle: dueDate(12).label, overdue: dueDate(12).overdue },
      statusBadge: 'In Progress',
    },
  ],
};

// ── Component keys (variant keys, importable) ──
const COMP = {
  cellHeader:      'ea005a34a6c9afff258391b28e8bbec799b41d90',
  cellBase:        '779ff8da1cc85c047ae029261428f7bacfac1315',
  cellUser:        'da35acd2972e192163dac6b6514f00853cb8396b',
  cellBadge:       '4633a6e5ea37f89117b8ce53a490adebfb1b7233',
  cellSubtle:      '59549d2b30c127ec5a228a101460c6a36be64339',
  cellStatusBadge: 'e9125f0bc919a81f95bb83896249a4482d901b36',
  cellActions:     '020bf065f11cd042619d80837009d21a6234bf49',
  divider:         '5b0928ffff3b77cdb0a9de765092cb23d1e04657',
  badgeNeutral:    '2708147d47326c65f87268de856bcf636e5c5ca6',
  badgeWarning:    '6db9196e9d45985395c9340e812efc98fed9c2db',
  badgeError:      'dae9711e0bddaff23d41f8374d768a4334f9a69b',
  badgeFeature:    '5a4639df6967dab525814cc4ee2ccf225882938b',
  dotGrey:         '1950f75d5eaa7f748541b97ed485c49dad92cf86',
  dotBlue:         '9fdba03ef454885f29b4468ee58a79850dc36a92',
  dotOrange:       'f691fe7606441b1bd8907119b0c525c088b20eaa',
  filterDisabled:  'be87429c2843c2cda4214f20550629b70cfaf110',
  filterEnabled:   '62e4a0d55bebd5da707c9ec525e68bcca1561562',
  footer:          '97904dd459a0d78f6dde94a4911925472fc7942d',
};

// ── Tokens ──
const T = {
  sp0:      'VariableID:a1c28706a42ef7439875a76d07c22441141b8742/6996:1903',
  sp16:     'VariableID:66fa38c9c8238168f844eee4b16541d4462b42c2/6996:1894',
  sp24:     'VariableID:f9f59aa761a5b46f53c37d0e8bd544eb529c7b79/6996:1902',
  r12:      'VariableID:e92b5a3aa058a87489262fd5161b29f8b2b48d5e/6996:1718',
  bgBase:   'VariableID:a426e4a84e9b344ec6a576ccd94d08a189532d69/17968:59',
  fgBase:   'VariableID:155eba32b1cd754e3d29d82fddd40e387753959f/17968:47',
  bgSubtle: 'VariableID:0f057c5e79ecd569f3ddf9031ff14eb8d7641e08/17968:46',
  fgMuted:  'VariableID:f3577a26be5ee797eeb1a13b34c96237cdf238bb/17968:159',
  fgError: 'VariableID:385bff17b274a766f7549d1344ddb987ca3e86ea/13723:1416',
  tagBlueBg:     'VariableID:c138645c5821cf3fb7a2806bf1692c831b616846/13723:2124',
  tagBlueText:   'VariableID:a3ba0c36bdc9b7d9f5becf55cec39b2558c9ace2/13723:1544',
  tagPurpleBg:   'VariableID:635a7c55a80e4de40ebc1ce7ca68a0a9a934bfe2/13723:2136',
  tagPurpleText: 'VariableID:a8b0994d0a2981dfa945a5ce74f2a9a971c54b69/13723:1541',
  tagOrangeBg:   'VariableID:e5a19807780182e3813147e1d027b07ba19d68b6/13723:2158',
  tagOrangeText: 'VariableID:c2417b7057d2a4dd0d31322b507896e316263bea/13723:1550',
  tagGreenBg:    'VariableID:0e352014159e2036fcdaf97465ed781e70895f53/13723:2147',
  tagGreenText:  'VariableID:246116ae03ae335606cca254e4c208c77ec4faa3/13723:1547',
  tagRedBg:      'VariableID:c9402018a1c54ce9457f3c5708e08377a2c40c54/13723:2170',
  tagRedText:    'VariableID:16c7dfec616333d701e9e2a94e1f2b5219e2ba0d/13723:1553',
  tagNeutralBg:  'VariableID:0de1938b914dacd18b6d64cefee65c9615a7c0b9/17968:33',
  tagNeutralText:'VariableID:9a673b5d89b9739f0bcb62ea719f40518d2c105d/17968:176',
};

// ── Styles ──
const STYLES = {
  txtCompactMedPlus: 'edb007633bab9d52364f6c0d78da75d3f40197a7',
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
async function setText(parent, name, chars) {
  const t = parent.findOne(n => n.type === 'TEXT' && n.name === name);
  if (t) { await figma.loadFontAsync(t.fontName); t.characters = chars; }
  return t;
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

const BADGE_MAP = { Neutral: imp.badgeNeutral, Warning: imp.badgeWarning, Error: imp.badgeError, Feature: imp.badgeFeature };

// ── Cell factory ──
const CELL_TYPE_MAP = {
  base:        'cellBase',
  user:        'cellUser',
  badge:       'cellBadge',
  subtle:      'cellSubtle',
  statusBadge: 'cellStatusBadge',
  actions:     'cellActions',
};

async function createCell(col, rowData, rowFrame) {
  const compKey = CELL_TYPE_MAP[col.type];
  if (!compKey || !imp[compKey]) return;
  const cell = imp[compKey].createInstance();
  rowFrame.appendChild(cell);

  if (col.width === 'FILL') cell.layoutSizingHorizontal = 'FILL';
  else if (col.width) { cell.layoutSizingHorizontal = 'FIXED'; cell.resize(col.width, 48); }
  else cell.layoutSizingHorizontal = 'HUG';
  cell.layoutSizingVertical = 'FILL';

  const useField = col.field && (col.type === 'base' || col.type === 'subtle');
  const val = useField ? rowData?.[col.field] : rowData?.[col.type];

  if (col.type === 'base' && typeof val === 'string') {
    await setText(cell, 'Label', val);
    if (rowData?.errorFields?.includes(col.field)) {
      const labelNode = cell.findOne(n => n.type === 'TEXT' && n.name === 'Label');
      if (labelNode) labelNode.fills = [await SOLID(T.fgError)];
    }
  }
  else if (col.type === 'user' && val) {
    await setText(cell, 'Label', val.name);
    await setText(cell, 'L', val.initial);
    const avatar = cell.findOne(n => n.type === 'INSTANCE' && n.name === 'Avatar');
    if (avatar) {
      setProps(avatar, { Initials: val.initial });
      if (val.color) {
        const colorMap = {
          blue:    { bg: T.tagBlueBg,    text: T.tagBlueText },
          purple:  { bg: T.tagPurpleBg,  text: T.tagPurpleText },
          orange:  { bg: T.tagOrangeBg,  text: T.tagOrangeText },
          red:     { bg: T.tagRedBg,     text: T.tagRedText },
          green:   { bg: T.tagGreenBg,   text: T.tagGreenText },
          neutral: { bg: T.tagNeutralBg, text: T.tagNeutralText },
        };
        const c = colorMap[val.color];
        if (c) {
          const bg = avatar.findOne(n => n.name === 'Background');
          if (bg) bg.fills = [await SOLID(c.bg)];
          const txt = avatar.findOne(n => n.type === 'TEXT');
          if (txt) txt.fills = [await SOLID(c.text)];
        }
      }
    }
  }
  else if (col.type === 'badge' && val) {
    const badge = cell.findOne(n => n.type === 'INSTANCE' && n.name === 'Badge');
    if (badge) {
      const badgeComp = BADGE_MAP[val.state];
      if (badgeComp) badge.swapComponent(badgeComp);
      setProps(badge, { Badge: val.label });
    }
  }
  else if (col.type === 'subtle' && typeof val === 'string') {
    await setText(cell, 'Label', val);
    if (rowData?.errorFields?.includes(col.field)) {
      const labelNode = cell.findOne(n => n.type === 'TEXT' && n.name === 'Label');
      if (labelNode) labelNode.fills = [await SOLID(T.fgError)];
    }
  }
  else if (col.type === 'statusBadge' && typeof val === 'string') {
    await setText(cell, 'Label', val);
    const dotMap = { 'To Do': imp.dotGrey, 'In Progress': imp.dotBlue, 'In Review': imp.dotOrange, 'Done': null };
    const dotComp = dotMap[val];
    if (dotComp) {
      const dot = cell.findOne(n => n.type === 'INSTANCE' && n.name.startsWith('square-'));
      if (dot) dot.swapComponent(dotComp);
    }
  }
  else if (col.type === 'actions') {
    await applyIconFills(cell, T.fgMuted);
  }

  return cell;
}

// ── Render ──
const card = figma.createFrame();
card.name = DATA.title;
card.layoutMode = 'VERTICAL';
card.primaryAxisSizingMode = 'AUTO';
card.counterAxisSizingMode = 'FIXED';
card.resize(1136, 1);
card.setBoundVariable('itemSpacing',   await V(T.sp0));
card.setBoundVariable('paddingTop',    await V(T.sp0));
card.setBoundVariable('paddingBottom', await V(T.sp0));
card.setBoundVariable('paddingLeft',   await V(T.sp0));
card.setBoundVariable('paddingRight',  await V(T.sp0));
card.setBoundVariable('topLeftRadius',     await V(T.r12));
card.setBoundVariable('topRightRadius',    await V(T.r12));
card.setBoundVariable('bottomLeftRadius',  await V(T.r12));
card.setBoundVariable('bottomRightRadius', await V(T.r12));
card.fills = [await SOLID(T.bgBase)];
card.clipsContent = true;
card.primaryAxisSizingMode = 'AUTO';
await card.setEffectStyleIdAsync(sty.cardRest);

// Title wrapper
if (DATA.showTitle) {
  const titleWrap = figma.createFrame();
  titleWrap.name = 'Title Wrapper';
  titleWrap.layoutMode = 'HORIZONTAL';
  titleWrap.primaryAxisSizingMode = 'FIXED';
  titleWrap.counterAxisSizingMode = 'AUTO';
  titleWrap.paddingTop = 24;
  titleWrap.paddingBottom = 16;
  titleWrap.paddingLeft = 24;
  titleWrap.paddingRight = 24;
  titleWrap.fills = [];
  card.appendChild(titleWrap);
  titleWrap.layoutSizingHorizontal = 'FILL';

  const titleTxt = figma.createText();
  titleTxt.name = 'Title';
  titleTxt.characters = DATA.title;
  await titleTxt.setTextStyleIdAsync(sty.txtCompactMedPlus);
  titleTxt.fills = [await SOLID(T.fgBase)];
  titleWrap.appendChild(titleTxt);
}

// Filter bar
if (DATA.showFilter) {
  const filter = imp.filterDisabled.createInstance();
  filter.name = 'Table Filter';
  card.appendChild(filter);
  filter.layoutSizingHorizontal = 'FILL';
}

// Table body
const table = figma.createFrame();
table.name = 'Table';
table.layoutMode = 'VERTICAL';
table.primaryAxisSizingMode = 'AUTO';
table.counterAxisSizingMode = 'FIXED';
table.itemSpacing = 0;
table.fills = [];
table.clipsContent = false;
card.appendChild(table);
table.layoutSizingHorizontal = 'FILL';

// Compute header padding-right: 24 base + actions column width (28) + gap (12) = 64 when actions present
const hasActions = DATA.columns.some(c => c.type === 'actions');
const headerPadRight = hasActions ? 64 : 24;

// Header row
const headerRow = figma.createFrame();
headerRow.name = 'Table Header';
headerRow.layoutMode = 'HORIZONTAL';
headerRow.primaryAxisSizingMode = 'FIXED';
headerRow.counterAxisSizingMode = 'FIXED';
headerRow.resize(1136, 48);
headerRow.counterAxisAlignItems = 'CENTER';
headerRow.primaryAxisAlignItems = 'CENTER';
headerRow.itemSpacing = 12;
headerRow.paddingLeft = 24;
headerRow.paddingRight = headerPadRight;
headerRow.fills = [await SOLID(T.bgSubtle)];
headerRow.clipsContent = false;
table.appendChild(headerRow);
headerRow.layoutSizingHorizontal = 'FILL';

for (const col of DATA.columns) {
  if (col.type === 'actions') continue;
  const cell = imp.cellHeader.createInstance();
  headerRow.appendChild(cell);
  if (col.width === 'FILL') cell.layoutSizingHorizontal = 'FILL';
  else { cell.layoutSizingHorizontal = 'FIXED'; cell.resize(col.width, 48); }
  cell.layoutSizingVertical = 'FILL';
  if (col.header) await setText(cell, 'Label', col.header);
}

// Data rows
for (const row of DATA.rows) {
  const div = imp.divider.createInstance();
  table.appendChild(div);
  div.layoutSizingHorizontal = 'FILL';

  const rowFrame = figma.createFrame();
  rowFrame.name = row.base || 'Row';
  rowFrame.layoutMode = 'HORIZONTAL';
  rowFrame.primaryAxisSizingMode = 'FIXED';
  rowFrame.counterAxisSizingMode = 'FIXED';
  rowFrame.resize(1136, 48);
  rowFrame.counterAxisAlignItems = 'CENTER';
  rowFrame.primaryAxisAlignItems = 'CENTER';
  rowFrame.itemSpacing = 12;
  rowFrame.paddingLeft = 24;
  rowFrame.paddingRight = 24;
  rowFrame.fills = [await SOLID(T.bgBase)];
  rowFrame.clipsContent = false;
  table.appendChild(rowFrame);
  rowFrame.layoutSizingHorizontal = 'FILL';

  for (const col of DATA.columns) {
    await createCell(col, row, rowFrame);
  }
}


// Footer
if (DATA.showFooter && DATA.footer) {
  const footerInst = imp.footer.createInstance();
  footerInst.name = 'Table Footer';
  card.appendChild(footerInst);
  footerInst.layoutSizingHorizontal = 'FILL';
  const f = DATA.footer;
  await setText(footerInst, '1', String(f.from));
  await setText(footerInst, '10 of 100 results', `${f.to} of ${f.total} results`);
  const pageBtn = footerInst.findOne(n => n.type === 'INSTANCE' && n.name === 'Button');
  // Find the page count button (contains "of X pages")
  const allBtns = footerInst.findAll(n => n.type === 'INSTANCE');
  for (const btn of allBtns) {
    const label = btn.findOne(n => n.type === 'TEXT' && n.name === 'Label');
    if (label) {
      await figma.loadFontAsync(label.fontName);
      if (label.characters.includes('pages')) {
        label.characters = `${f.page} of ${f.pages} pages`;
      }
    }
  }
}

figma.currentPage.appendChild(card);
figma.viewport.scrollAndZoomIntoView([card]);
return { id: card.id, rows: DATA.rows.length, filter: DATA.showFilter, footer: DATA.showFooter };

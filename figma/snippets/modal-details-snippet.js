// modal-details-snippet.js — Task Details drawer

// ── Date helper — offset from today ──
function dueDate(offset) {
  const d = new Date(); d.setDate(d.getDate() + offset);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

// ── DATA (from data.yaml) ──
/* __DATA__ */
const DATA = {
  drawerTitle: 'Task details',
  kbdLabel: 'Esc',
  infoLabel: 'Info',
  activityLabel: 'Activity log',
  title: 'Update onboarding flow',
  desc: 'Create a comprehensive onboarding experience for new users including welcome screens, feature tours, and initial setup steps.',
  status: { label: 'In Progress', badgeState: 'Information' },
  priority: { label: 'High', badgeState: 'Error' },
  assignee: { name: 'Sara Nelson', initials: 'S', bgToken: 'tagBlueBg', textToken: 'tagBlueText' },
  dueDate: dueDate(-6),
  created: 'Jan 5, 2026',
  activity: [
    { name: 'Priya Rao', initials: 'P', bgToken: 'tagOrangeBg', textToken: 'tagOrangeText', time: '2h ago', text: 'Moving this to in progress — starting the research phase today.' },
    { name: 'Sara Nelson', initials: 'S', bgToken: 'tagBlueBg', textToken: 'tagBlueText', time: 'Yesterday', text: 'Added initial wireframes to the shared drive. Let me know if you have feedback.' },
  ],
};

// ── Component keys ──
const COMP = {
  divider: '5b0928ffff3b77cdb0a9de765092cb23d1e04657',
  button: '576fe1cbf94e7d7101e6dd2aa718e6162cb8eaf4',
  badge: '4ded201519cef4b0a9f96d037b659b9ba7ba82f5',
  avatar: '841e9ed068f6479e054d61b80872a848cde779c6',
  kbd: '2698f7b89fc5474ed0033b6c33da647a88a7a58b',
  iconBtnTransparentMuted: '31588456aa1bd491061c5fcdeb04d0d7c87bcdf7',
  xMark: '19baee343aaebb55e7ccc3b1f5e1ba88e0b7ba0d',
};

// ── Text styles ──
const STYLES = {
  h1: '03806342a7fa5481e1fa2bf60bba9a10213b82e5',
  h3: '519b127faf43433cea7182293137df5935e12ad4',
  txtCompactSmallPlus: '76cc3f3552860444bb19f826d0c8428c8d7264dc',
  txtCompactSmall: '184b1bd4001407d480ae493b95b84e90d347cb52',
  txtCompactXsmall: '6bf119e8621766948a9972915a94b26382ecc3ca',
  txtSmall: '293209460cb844f3b3feacdbdb0d2c4205b35035',
};

// ── Effect styles ──
const EFFECTS = {
  modal: '15d4f47a133db13d6173a1c7393ac5996f65bcbf',
};

// ── Tokens ──
const T = {
  bgBase: 'VariableID:a426e4a84e9b344ec6a576ccd94d08a189532d69/17968:59',
  fgBase: 'VariableID:155eba32b1cd754e3d29d82fddd40e387753959f/17968:47',
  fgMuted: 'VariableID:f3577a26be5ee797eeb1a13b34c96237cdf238bb/17968:159',
  fgSubtle: 'VariableID:77e30ee7a903973aac43f720b387e89390946184/17968:158',
  fgError: 'VariableID:385bff17b274a766f7549d1344ddb987ca3e86ea/13723:1416',
  tagBlueBg: 'VariableID:c138645c5821cf3fb7a2806bf1692c831b616846/13723:2124',
  tagBlueText: 'VariableID:a3ba0c36bdc9b7d9f5becf55cec39b2558c9ace2/13723:1544',
  tagPurpleBg: 'VariableID:635a7c55a80e4de40ebc1ce7ca68a0a9a934bfe2/13723:2136',
  tagPurpleText: 'VariableID:a8b0994d0a2981dfa945a5ce74f2a9a971c54b69/13723:1541',
  tagOrangeBg: 'VariableID:e5a19807780182e3813147e1d027b07ba19d68b6/13723:2158',
  tagOrangeText: 'VariableID:c2417b7057d2a4dd0d31322b507896e316263bea/13723:1550',
  tagRedBg: 'VariableID:c9402018a1c54ce9457f3c5708e08377a2c40c54/13723:2170',
  tagRedText: 'VariableID:16c7dfec616333d701e9e2a94e1f2b5219e2ba0d/13723:1553',
  tagGreenBg: 'VariableID:0e352014159e2036fcdaf97465ed781e70895f53/13723:2147',
  tagGreenText: 'VariableID:246116ae03ae335606cca254e4c208c77ec4faa3/13723:1547',
  tagNeutralBg: 'VariableID:0de1938b914dacd18b6d64cefee65c9615a7c0b9/17968:33',
  tagNeutralText: 'VariableID:9a673b5d89b9739f0bcb62ea719f40518d2c105d/17968:176',
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
function mkFrame(name, opts = {}) {
  const f = figma.createFrame();
  f.name = name;
  f.layoutMode = opts.dir || 'VERTICAL';
  f.primaryAxisSizingMode = opts.mainSize || 'AUTO';
  f.counterAxisSizingMode = opts.crossSize || 'FIXED';
  f.fills = []; f.clipsContent = false;
  return f;
}

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

async function applyIconFills(parent, id) {
  const vecs = parent.findAll(n => n.type === 'VECTOR' || n.type === 'BOOLEAN_OPERATION');
  const fill = await SOLID(id);
  for (const vec of vecs) vec.fills = [fill];
}

async function colorAvatar(inst, bgToken, textToken) {
  const inner = inst.findOne(n => (n.type === 'FRAME' || n.type === 'RECTANGLE') && n.fills?.length > 0) || inst;
  if (inner.fills?.length) inner.fills = [await SOLID(T[bgToken])];
  const txt = inst.findOne(n => n.type === 'TEXT');
  if (txt) { await figma.loadFontAsync(txt.fontName); txt.fills = [await SOLID(T[textToken])]; }
}

// ── Modal ──
const modal = figma.createFrame();
modal.name = 'Task Details Modal';
modal.layoutMode = 'VERTICAL';
modal.primaryAxisSizingMode = 'FIXED';
modal.counterAxisSizingMode = 'FIXED';
modal.resize(480, 900);
modal.cornerRadius = 12;
modal.fills = [await SOLID(T.bgBase)];
await modal.setEffectStyleIdAsync(eff.modal);
modal.clipsContent = true;

// ── HEADER (vertical: title row + divider) ──
const header = mkFrame('header', { dir: 'VERTICAL', crossSize: 'FIXED' });
header.counterAxisAlignItems = 'CENTER';
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
titleTxt.name = 'Title'; titleTxt.characters = DATA.drawerTitle;
await titleTxt.setTextStyleIdAsync(sty.h3);
titleTxt.fills = [await SOLID(T.fgBase)];
titleRow.appendChild(titleTxt);
titleTxt.layoutSizingHorizontal = 'FILL';

const buttons = mkFrame('buttons', { dir: 'HORIZONTAL', mainSize: 'AUTO', crossSize: 'AUTO' });
buttons.itemSpacing = 4; buttons.counterAxisAlignItems = 'CENTER';
titleRow.appendChild(buttons);

// Kbd "Esc"
const kbdInst = imp.kbd.createInstance();
kbdInst.name = 'Kbd';
buttons.appendChild(kbdInst);
setProps(kbdInst, { Type: 'Multiple' });
const kbdTxt = kbdInst.findOne(n => n.type === 'TEXT');
if (kbdTxt) { await figma.loadFontAsync(kbdTxt.fontName); kbdTxt.characters = DATA.kbdLabel; }

// Close IconButton (Transparent Muted variant with Icon swap to x-mark)
const closeBtn = imp.iconBtnTransparentMuted.createInstance();
closeBtn.name = 'Close';
buttons.appendChild(closeBtn);
setProps(closeBtn, { Icon: imp.xMark.id });
await applyIconFills(closeBtn, T.fgMuted);

const hDiv = imp.divider.createInstance();
header.appendChild(hDiv);
hDiv.layoutSizingHorizontal = 'FILL';

// ── CONTENT ──
const content = mkFrame('Content');
content.paddingTop = 16; content.paddingBottom = 24;
content.paddingLeft = 24; content.paddingRight = 24;
content.itemSpacing = 24;
content.fills = [];
modal.appendChild(content);
content.layoutSizingHorizontal = 'FILL';
content.layoutSizingVertical = 'FILL';

// Task title + desc group
const titleGroup = mkFrame('Title Group');
titleGroup.itemSpacing = 8;
content.appendChild(titleGroup);
titleGroup.layoutSizingHorizontal = 'FILL';

const taskTitle = figma.createText();
taskTitle.name = 'Secondary title'; taskTitle.characters = DATA.title;
await taskTitle.setTextStyleIdAsync(sty.h1);
taskTitle.fills = [await SOLID(T.fgBase)];
titleGroup.appendChild(taskTitle);
taskTitle.layoutSizingHorizontal = 'FILL';

const taskDesc = figma.createText();
taskDesc.name = 'Description'; taskDesc.characters = DATA.desc;
await taskDesc.setTextStyleIdAsync(sty.txtSmall);
taskDesc.fills = [await SOLID(T.fgSubtle)];
titleGroup.appendChild(taskDesc);
taskDesc.layoutSizingHorizontal = 'FILL';
taskDesc.textAutoResize = 'HEIGHT';

// ── Section 1: Info ──
const section1 = mkFrame('Section 1');
section1.itemSpacing = 16;
content.appendChild(section1); section1.layoutSizingHorizontal = 'FILL';

const infoLabel = figma.createText();
infoLabel.name = 'Info'; infoLabel.characters = DATA.infoLabel;
await infoLabel.setTextStyleIdAsync(sty.txtCompactSmallPlus);
infoLabel.fills = [await SOLID(T.fgBase)]; section1.appendChild(infoLabel);

const rows = [
  { label: 'Status', type: 'badge', badgeText: DATA.status.label, badgeState: DATA.status.badgeState },
  { label: 'Priority', type: 'badge', badgeText: DATA.priority.label, badgeState: DATA.priority.badgeState },
  { label: 'Assignee', type: 'avatar' },
  { label: 'Due date', type: 'text', value: DATA.dueDate, overdue: true },
  { label: 'Created', type: 'text', value: DATA.created },
];

for (const row of rows) {
  const rf = mkFrame(row.label + ' Row', { dir: 'HORIZONTAL', crossSize: 'AUTO' });
  rf.counterAxisAlignItems = 'CENTER'; rf.primaryAxisAlignItems = 'SPACE_BETWEEN';
  section1.appendChild(rf); rf.layoutSizingHorizontal = 'FILL';

  const lbl = figma.createText(); lbl.name = 'Label'; lbl.characters = row.label;
  await lbl.setTextStyleIdAsync(sty.txtCompactSmall);
  lbl.fills = [await SOLID(T.fgSubtle)]; rf.appendChild(lbl);

  if (row.type === 'badge') {
    const b = imp.badge.createInstance(); b.name = row.badgeText;
    rf.appendChild(b);
    setProps(b, { Badge: row.badgeText, State: row.badgeState, Size: '2xsmall (20)', Radius: 'Rounded' });
  } else if (row.type === 'avatar') {
    const ag = mkFrame('Assignee', { dir: 'HORIZONTAL', mainSize: 'AUTO', crossSize: 'AUTO' });
    ag.itemSpacing = 8; ag.counterAxisAlignItems = 'CENTER'; rf.appendChild(ag);
    const av = imp.avatar.createInstance(); av.name = 'Avatar';
    setProps(av, { Initials: DATA.assignee.initials, Content: 'Letters', Size: '2xsmall (20)' });
    ag.appendChild(av);
    await colorAvatar(av, DATA.assignee.bgToken, DATA.assignee.textToken);
    const nm = figma.createText(); nm.name = 'Name'; nm.characters = DATA.assignee.name;
    await nm.setTextStyleIdAsync(sty.txtCompactSmall);
    nm.fills = [await SOLID(T.fgBase)]; ag.appendChild(nm);
  } else {
    const val = figma.createText(); val.name = 'Value'; val.characters = row.value;
    await val.setTextStyleIdAsync(sty.txtCompactSmall);
    val.fills = [await SOLID(row.overdue ? T.fgError : T.fgBase)]; rf.appendChild(val);
  }
}

// ── Section 2: Activity log ──
const section2 = mkFrame('Section 2');
section2.itemSpacing = 16;
content.appendChild(section2); section2.layoutSizingHorizontal = 'FILL';

const al = figma.createText(); al.name = 'Activity log'; al.characters = DATA.activityLabel;
await al.setTextStyleIdAsync(sty.txtCompactSmallPlus);
al.fills = [await SOLID(T.fgBase)]; section2.appendChild(al);

for (const e of DATA.activity) {
  const ef = mkFrame(e.name); ef.itemSpacing = 4;
  section2.appendChild(ef); ef.layoutSizingHorizontal = 'FILL';

  const nr = mkFrame('Name Row', { dir: 'HORIZONTAL', mainSize: 'FIXED', crossSize: 'AUTO' });
  nr.primaryAxisAlignItems = 'SPACE_BETWEEN'; nr.counterAxisAlignItems = 'CENTER';
  ef.appendChild(nr); nr.layoutSizingHorizontal = 'FILL';

  const lg = mkFrame('Left', { dir: 'HORIZONTAL', mainSize: 'AUTO', crossSize: 'AUTO' });
  lg.itemSpacing = 8; lg.counterAxisAlignItems = 'CENTER'; nr.appendChild(lg);

  const av = imp.avatar.createInstance(); av.name = 'Avatar';
  setProps(av, { Initials: e.initials, Content: 'Letters', Size: '2xsmall (20)' });
  lg.appendChild(av);
  await colorAvatar(av, e.bgToken, e.textToken);

  const nm = figma.createText(); nm.name = 'Name'; nm.characters = e.name;
  await nm.setTextStyleIdAsync(sty.txtCompactSmallPlus);
  nm.fills = [await SOLID(T.fgBase)]; lg.appendChild(nm);

  const tm = figma.createText(); tm.name = 'Time'; tm.characters = e.time;
  await tm.setTextStyleIdAsync(sty.txtCompactXsmall);
  tm.fills = [await SOLID(T.fgSubtle)]; nr.appendChild(tm);

  const ct = figma.createText(); ct.name = 'Comment'; ct.characters = e.text;
  await ct.setTextStyleIdAsync(sty.txtSmall);
  ct.fills = [await SOLID(T.fgSubtle)];
  ef.appendChild(ct);
  ct.layoutSizingHorizontal = 'FILL';
  ct.textAutoResize = 'HEIGHT';
}

// ── FOOTER (divider + actions) ──
const footer = mkFrame('footer', { dir: 'VERTICAL' });
footer.counterAxisAlignItems = 'CENTER';
footer.itemSpacing = 0;
footer.fills = [];
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

const editBtn = imp.button.createInstance(); editBtn.name = 'Edit';
actions.appendChild(editBtn); setProps(editBtn, { Label: 'Edit', Style: 'Secondary', Size: 'Small (28)' });

const completeBtn = imp.button.createInstance(); completeBtn.name = 'Mark Complete';
actions.appendChild(completeBtn); setProps(completeBtn, { Label: 'Mark complete', Style: 'Primary', Size: 'Small (28)' });

figma.currentPage.appendChild(modal);
figma.viewport.scrollAndZoomIntoView([modal]);
return { id: modal.id, name: modal.name, w: modal.width, h: modal.height };

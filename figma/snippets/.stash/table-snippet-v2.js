// table-snippet-v2.js — Recent tasks table, built from playbook + ds-contract.
// Edit DATA block only. Logic is frozen — do not rewrite.

// ── DATA ──────────────────────────────────────────────────────────────────────
const DATA = {
  pageName:  'Screens',
  frameName: 'Table Test v2',
  title:     'Recent Tasks',

  columns: [
    { header: 'Task',     width: 490, sizing: 'FILL' },
    { header: 'Assignee', width: 160, sizing: 'FIXED' },
    { header: 'Priority', width: 120, sizing: 'FIXED' },
    { header: 'Due Date', width: 130, sizing: 'FIXED' },
    { header: 'Status',   width: 140, sizing: 'FIXED' },
  ],

  rows: [
    { title: 'Icon system audit',
      member: { initial: 'P', name: 'Priya Rao',
        avatarBg: 'VariableID:e5a19807780182e3813147e1d027b07ba19d68b6/13723:2158',
        avatarText: 'VariableID:c2417b7057d2a4dd0d31322b507896e316263bea/13723:1550' },
      priority: { label: 'Low', state: 'Neutral' },
      due: 'May 7, 2026',
      status: { label: 'In Progress', dotKey: '9fdba03ef454885f29b4468ee58a79850dc36a92' } },

    { title: 'User research interviews',
      member: { initial: 'L', name: 'Lara Sato',
        avatarBg: 'VariableID:0e352014159e2036fcdaf97465ed781e70895f53/13723:2147',
        avatarText: 'VariableID:246116ae03ae335606cca254e4c208c77ec4faa3/13723:1547' },
      priority: { label: 'Low', state: 'Neutral' },
      due: 'May 5, 2026',
      status: { label: 'To Do', dotKey: '1950f75d5eaa7f748541b97ed485c49dad92cf86' } },

    { title: 'Update onboarding flow',
      member: { initial: 'S', name: 'Sara Nelson',
        avatarBg: 'VariableID:c138645c5821cf3fb7a2806bf1692c831b616846/13723:2124',
        avatarText: 'VariableID:a3ba0c36bdc9b7d9f5becf55cec39b2558c9ace2/13723:1544' },
      priority: { label: 'High', state: 'Information' },
      due: 'May 3, 2026',
      status: { label: 'In Progress', dotKey: '9fdba03ef454885f29b4468ee58a79850dc36a92' } },

    { title: 'Migrate analytics SDK',
      member: { initial: 'O', name: 'Owen King',
        avatarBg: 'VariableID:0de1938b914dacd18b6d64cefee65c9615a7c0b9/13723:1537',
        avatarText: 'VariableID:9a673b5d89b9739f0bcb62ea719f40518d2c105d/13723:1538' },
      priority: { label: 'Medium', state: 'Warning' },
      due: 'May 3, 2026',
      status: { label: 'To Do', dotKey: '1950f75d5eaa7f748541b97ed485c49dad92cf86' } },

    { title: 'Accessibility pass',
      member: { initial: 'L', name: 'Lara Sato',
        avatarBg: 'VariableID:0e352014159e2036fcdaf97465ed781e70895f53/13723:2147',
        avatarText: 'VariableID:246116ae03ae335606cca254e4c208c77ec4faa3/13723:1547' },
      priority: { label: 'Medium', state: 'Warning' },
      due: 'May 2, 2026',
      status: { label: 'In Progress', dotKey: '9fdba03ef454885f29b4468ee58a79850dc36a92' } },

    { title: 'Write API documentation',
      member: { initial: 'P', name: 'Priya Rao',
        avatarBg: 'VariableID:e5a19807780182e3813147e1d027b07ba19d68b6/13723:2158',
        avatarText: 'VariableID:c2417b7057d2a4dd0d31322b507896e316263bea/13723:1550' },
      priority: { label: 'Medium', state: 'Warning' },
      due: 'May 1, 2026',
      status: { label: 'To Do', dotKey: '1950f75d5eaa7f748541b97ed485c49dad92cf86' } },

    { title: 'Setup CI/CD pipeline',
      member: { initial: 'O', name: 'Owen King',
        avatarBg: 'VariableID:0de1938b914dacd18b6d64cefee65c9615a7c0b9/13723:1537',
        avatarText: 'VariableID:9a673b5d89b9739f0bcb62ea719f40518d2c105d/13723:1538' },
      priority: { label: 'High', state: 'Information' },
      due: 'Apr 30, 2026',
      status: { label: 'In Progress', dotKey: '9fdba03ef454885f29b4468ee58a79850dc36a92' } },
  ],
};

// ── Component variant keys ──────────────────────────────────────────────────
// Table Cell has typed variants: Header, Base, User, Badge, Status Badge, Subtle
const COMP = {
  CellHeader:  'ea005a34a6c9afff258391b28e8bbec799b41d90',  // Type=Header
  CellBase:    '779ff8da1cc85c047ae029261428f7bacfac1315',  // Type=Base
  CellUser:    'da35acd2972e192163dac6b6514f00853cb8396b',  // Type=User (Avatar + Label)
  CellBadge:   '4633a6e5ea37f89117b8ce53a490adebfb1b7233',  // Type=Badge
  CellStatus:  'e9125f0bc919a81f95bb83896249a4482d901b36',  // Type=Status Badge (dot + Label)
  Divider:     '5b0928ffff3b77cdb0a9de765092cb23d1e04657',  // Horizontal Divider, Type=Line
};

// ── Prop keys (inside cell children) ────────────────────────────────────────
const PROPS = {
  avatarInitials: 'Initials#13715:604',
  badgeText:      'Badge#13715:663',
  badgeState:     'State',
};

// ── Text style keys (ds-contract.md §4) ─────────────────────────────────────
const STYLES = {
  titleStyle: '76cc3f3552860444bb19f826d0c8428c8d7264dc',  // txt-compact-small-plus
};

// ── Token variable IDs (ds-contract.md §3) ──────────────────────────────────
const T = {
  fgBase:   'VariableID:155eba32b1cd754e3d29d82fddd40e387753959f/13723:1408',
  sp16:     'VariableID:66fa38c9c8238168f844eee4b16541d4462b42c2/6996:1894',
};

// ── Frozen logic — do not edit below this line ──────────────────────────────
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
  if (!content) throw new Error('Content frame not found — run shell first');
}

await figma.loadFontAsync({ family: 'Geist', style: 'Regular' });

const V = async (id) => {
  const v = await figma.variables.getVariableByIdAsync(id);
  if (!v) {
    const m = id.match(/VariableID:([a-f0-9]+)\//);
    if (m) return await figma.variables.importVariableByKeyAsync(m[1]);
    throw new Error(`Variable not found: ${id}`);
  }
  return v;
};
const SOLID = async (id) => figma.variables.setBoundVariableForPaint(
  { type: 'SOLID', color: { r:1, g:1, b:1 }, opacity: 1 }, 'color', await V(id)
);

const imp = {};
for (const [k, key] of Object.entries(COMP))
  imp[k] = await figma.importComponentByKeyAsync(key);

const sty = {};
for (const [k, key] of Object.entries(STYLES)) {
  const s = await figma.importStyleByKeyAsync(key);
  sty[k] = s.id;
}

// ── Recent Tasks table ──────────────────────────────────────────────────────
const wrapper = figma.createFrame();
wrapper.name = 'Recent Tasks';
wrapper.fills = [];
wrapper.layoutMode = 'VERTICAL';
wrapper.primaryAxisSizingMode = 'AUTO';
wrapper.counterAxisSizingMode = 'FIXED';
wrapper.paddingTop = 24; wrapper.paddingBottom = 24;
wrapper.setBoundVariable('itemSpacing', await V(T.sp16));
wrapper.clipsContent = false;
content.appendChild(wrapper);
wrapper.layoutSizingHorizontal = 'FILL';

const title = figma.createText();
title.characters = DATA.title;
await title.setTextStyleIdAsync(sty.titleStyle);
title.fills = [await SOLID(T.fgBase)];
wrapper.appendChild(title);

const table = figma.createFrame();
table.name = 'Table';
table.fills = [];
table.layoutMode = 'VERTICAL';
table.primaryAxisSizingMode = 'AUTO';
table.counterAxisSizingMode = 'FIXED';
table.itemSpacing = 0;
table.clipsContent = false;
wrapper.appendChild(table);
table.layoutSizingHorizontal = 'FILL';

const makeRow = () => {
  const row = figma.createFrame();
  row.fills = [];
  row.layoutMode = 'HORIZONTAL';
  row.counterAxisAlignItems = 'CENTER';
  row.primaryAxisSizingMode = 'FIXED';
  row.counterAxisSizingMode = 'FIXED';
  row.resize(100, 48);
  row.itemSpacing = 12;
  row.paddingLeft = 24; row.paddingRight = 24;
  row.clipsContent = false;
  return row;
};

const addDivider = () => {
  const div = imp.Divider.createInstance();
  table.appendChild(div);
  div.layoutSizingHorizontal = 'FILL';
};

// Header
const headerRow = makeRow();
headerRow.name = 'Table Header';
table.appendChild(headerRow);
headerRow.layoutSizingHorizontal = 'FILL';

for (const col of DATA.columns) {
  const cell = imp.CellHeader.createInstance();
  const lbl = cell.findOne(n => n.type === 'TEXT');
  if (lbl) lbl.characters = col.header;
  headerRow.appendChild(cell);
  if (col.sizing === 'FILL') cell.layoutSizingHorizontal = 'FILL';
  else cell.resize(col.width, cell.height);
}

// Body rows
for (const rowData of DATA.rows) {
  addDivider();

  const row = makeRow();
  row.name = rowData.title;
  table.appendChild(row);
  row.layoutSizingHorizontal = 'FILL';

  // Task — Base cell
  const taskCell = imp.CellBase.createInstance();
  const taskLbl = taskCell.findOne(n => n.type === 'TEXT');
  if (taskLbl) taskLbl.characters = rowData.title;
  row.appendChild(taskCell);
  taskCell.layoutSizingHorizontal = 'FILL';

  // Assignee — User cell (has Avatar + Label)
  const userCell = imp.CellUser.createInstance();
  const avatar = userCell.findOne(n => n.name === 'Avatar');
  if (avatar) {
    avatar.setProperties({ [PROPS.avatarInitials]: rowData.member.initial });
    const avatarBg = avatar.findOne(n => n.name === 'Background' || n.name === 'BG');
    if (avatarBg) {
      avatarBg.fills = [await SOLID(rowData.member.avatarBg)];
      const letter = avatarBg.findOne(n => n.type === 'TEXT');
      if (letter) letter.fills = [await SOLID(rowData.member.avatarText)];
    }
  }
  const userLbl = userCell.findOne(n => n.type === 'TEXT' && n.name === 'Label');
  if (userLbl) userLbl.characters = rowData.member.name;
  row.appendChild(userCell);
  userCell.resize(160, userCell.height);

  // Priority — Badge cell
  const badgeCell = imp.CellBadge.createInstance();
  const badge = badgeCell.findOne(n => n.name === 'Badge');
  if (badge) {
    badge.setProperties({
      [PROPS.badgeText]: rowData.priority.label,
      [PROPS.badgeState]: rowData.priority.state,
    });
  }
  row.appendChild(badgeCell);
  badgeCell.resize(120, badgeCell.height);

  // Due date — Base cell
  const dueCell = imp.CellBase.createInstance();
  const dueLbl = dueCell.findOne(n => n.type === 'TEXT');
  if (dueLbl) dueLbl.characters = rowData.due;
  row.appendChild(dueCell);
  dueCell.resize(130, dueCell.height);

  // Status — Status Badge cell (has dot + Label)
  const statusCell = imp.CellStatus.createInstance();
  const dot = statusCell.findOne(n => n.type === 'INSTANCE' && n.name !== 'Label');
  if (dot) {
    const dotComp = await figma.importComponentByKeyAsync(rowData.status.dotKey);
    dot.swapComponent(dotComp);
  }
  const statusLbl = statusCell.findOne(n => n.type === 'TEXT' && n.name === 'Label');
  if (statusLbl) statusLbl.characters = rowData.status.label;
  row.appendChild(statusCell);
  statusCell.resize(140, statusCell.height);
}

return { wrapperId: wrapper.id };

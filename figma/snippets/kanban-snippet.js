// kanban-snippet.js — Data-driven kanban board, one column per status

// ── Date helper — offset from today ──
function dueDate(offset) {
  const d = new Date(); d.setDate(d.getDate() + offset);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return { label: `${months[d.getMonth()]} ${d.getDate()}`, overdue: offset < 0 };
}

// ── DATA ──
const DATA = {
  statuses: [
    { key: 'todo',        label: 'To Do',       dotKey: 'squareGreySolid' },
    { key: 'in_progress', label: 'In Progress', dotKey: 'squareBlueSolid' },
    { key: 'in_review',   label: 'In Review',   dotKey: 'squareOrangeSolid' },
    { key: 'done',        label: 'Done',         dotKey: 'squareGreenSolid' },
  ],

  priorityBadge: {
    low:      { label: 'Low',      state: 'Neutral' },
    medium:   { label: 'Medium',   state: 'Warning' },
    high:     { label: 'High',     state: 'Error' },
    critical: { label: 'Critical', state: 'Feature' },
  },

  members: {
    1: { name: 'Sara Nelson',  initial: 'S', color: 'blue' },
    2: { name: 'Mark Tan',     initial: 'M', color: 'purple' },
    3: { name: 'Priya Rao',    initial: 'P', color: 'orange' },
    4: { name: 'Ben Walsh',    initial: 'B', color: 'red' },
    5: { name: 'Lara Sato',    initial: 'L', color: 'green' },
    6: { name: 'Owen King',    initial: 'O', color: 'neutral' },
  },

  tasks: [
    { id: 3,  title: 'Customer interviews',      desc: 'Schedule and run five user feedback sessions',       assignee: 5, status: 'todo',        priority: 'medium',   due: dueDate(7) },
    { id: 6,  title: 'Migrate analytics SDK',    desc: 'Switch from legacy tracker to new events API',       assignee: 2, status: 'todo',        priority: 'high',     due: dueDate(5) },
    { id: 9,  title: 'Write API documentation',  desc: 'Document all public endpoints with examples',        assignee: 6, status: 'todo',        priority: 'low',      due: dueDate(15) },
    { id: 11, title: 'User research interviews', desc: 'Recruit participants and prepare script',            assignee: 3, status: 'todo',        priority: 'medium',   due: dueDate(-3) },
    { id: 15, title: 'Icon system audit',        desc: 'Catalog all icons and remove unused SVGs',           assignee: 5, status: 'todo',        priority: 'low',      due: dueDate(20) },
    { id: 18, title: 'Accessibility pass',       desc: 'Fix contrast ratios and add ARIA labels',            assignee: 6, status: 'todo',        priority: 'medium',   due: dueDate(8) },
    { id: 1,  title: 'Update onboarding flow',   desc: 'Revamp first-run experience for new users',          assignee: 1, status: 'in_progress', priority: 'high',     due: dueDate(-6) },
    { id: 4,  title: 'Fix billing bug #482',     desc: 'Null ref in payment callback causing failed charges', assignee: 4, status: 'in_progress', priority: 'critical', due: dueDate(-8) },
    { id: 7,  title: 'Redesign landing page',    desc: 'New hero section and updated feature grid',          assignee: 5, status: 'in_progress', priority: 'medium',   due: dueDate(1) },
    { id: 10, title: 'Setup CI/CD pipeline',     desc: 'Configure GitHub Actions for staging deploys',       assignee: 2, status: 'in_progress', priority: 'high',     due: dueDate(12) },
    { id: 14, title: 'Mobile nav refactor',      desc: 'Replace drawer with bottom tab navigation',          assignee: 1, status: 'in_progress', priority: 'medium',   due: dueDate(-2) },
    { id: 2,  title: 'Q2 roadmap review',        desc: 'Align team on priorities for next quarter',          assignee: 3, status: 'in_review',   priority: 'medium',   due: dueDate(-1) },
    { id: 5,  title: 'Design QA — Settings',     desc: 'Verify settings page matches latest design specs',   assignee: 1, status: 'in_review',   priority: 'high',     due: dueDate(3) },
    { id: 12, title: 'Performance audit',        desc: 'Profile render times and bundle size',               assignee: 6, status: 'in_review',   priority: 'high',     due: dueDate(10) },
    { id: 17, title: 'DB schema migration',      desc: 'Add indexes and normalize user preferences table',   assignee: 4, status: 'in_review',   priority: 'critical', due: dueDate(4) },
    { id: 8,  title: 'Fix login bug',            desc: 'Session token not refreshing on mobile browsers',    assignee: 4, status: 'done',        priority: 'critical', due: dueDate(-10) },
    { id: 13, title: 'Auth token refresh',       desc: 'Implement silent refresh with retry logic',          assignee: 2, status: 'done',        priority: 'critical', due: dueDate(-5) },
    { id: 16, title: 'Sprint retrospective',     desc: 'Review velocity and action items from last sprint',  assignee: 3, status: 'done',        priority: 'low',      due: dueDate(-5) },
  ],
};

// ── Component keys ──
const COMP = {
  squareGreySolid:   '1950f75d5eaa7f748541b97ed485c49dad92cf86',
  squareBlueSolid:   '9fdba03ef454885f29b4468ee58a79850dc36a92',
  squareOrangeSolid: 'f691fe7606441b1bd8907119b0c525c088b20eaa',
  squareGreenSolid:  '8f8efa94eba0d943ebaeecfe6946ec9062d2ca7d',
  avatar:            '841e9ed068f6479e054d61b80872a848cde779c6',
  badge:             '4ded201519cef4b0a9f96d037b659b9ba7ba82f5',
};

// ── Tokens ──
const T = {
  sp8:      'VariableID:0732ac1e93c221a6e6f7eb84ed8b00b62a9d57ef/6996:1898',
  sp12:     'VariableID:77559b65a36808508ee6736034dc13c55e640514/6996:1895',
  sp16:     'VariableID:66fa38c9c8238168f844eee4b16541d4462b42c2/6996:1894',
  r8:       'VariableID:4832ceb3fdb882a1ce42f91b75ed1dc3c27b229f/6996:1716',
  r12:      'VariableID:e92b5a3aa058a87489262fd5161b29f8b2b48d5e/6996:1718',
  bgKanban: 'VariableID:83de97d19f56bdd2967e86fcee94bbd7633b8f38/17834:32',
  bgBase:   'VariableID:a426e4a84e9b344ec6a576ccd94d08a189532d69/17968:59',
  fgBase:   'VariableID:155eba32b1cd754e3d29d82fddd40e387753959f/17968:47',
  fgMuted:  'VariableID:f3577a26be5ee797eeb1a13b34c96237cdf238bb/17968:159',
  fgSubtle: 'VariableID:77e30ee7a903973aac43f720b387e89390946184/17968:158',
  fgError:  'VariableID:385bff17b274a766f7549d1344ddb987ca3e86ea/13723:1416',
  tagBlueBg:      'VariableID:c138645c5821cf3fb7a2806bf1692c831b616846/13723:2124',
  tagBlueText:    'VariableID:a3ba0c36bdc9b7d9f5becf55cec39b2558c9ace2/13723:1544',
  tagPurpleBg:    'VariableID:635a7c55a80e4de40ebc1ce7ca68a0a9a934bfe2/13723:2136',
  tagPurpleText:  'VariableID:a8b0994d0a2981dfa945a5ce74f2a9a971c54b69/13723:1541',
  tagOrangeBg:    'VariableID:e5a19807780182e3813147e1d027b07ba19d68b6/13723:2158',
  tagOrangeText:  'VariableID:c2417b7057d2a4dd0d31322b507896e316263bea/13723:1550',
  tagGreenBg:     'VariableID:0e352014159e2036fcdaf97465ed781e70895f53/13723:2147',
  tagGreenText:   'VariableID:246116ae03ae335606cca254e4c208c77ec4faa3/13723:1547',
  tagNeutralBg:   'VariableID:0de1938b914dacd18b6d64cefee65c9615a7c0b9/17968:33',
  tagNeutralText: 'VariableID:9a673b5d89b9739f0bcb62ea719f40518d2c105d/17968:176',
  tagRedBg:       'VariableID:c9402018a1c54ce9457f3c5708e08377a2c40c54/13723:2170',
  tagRedText:     'VariableID:16c7dfec616333d701e9e2a94e1f2b5219e2ba0d/13723:1553',
};

// ── Styles ──
const STYLES = {
  txtCompactMedPlus:   'edb007633bab9d52364f6c0d78da75d3f40197a7',
  txtCompactMed:       'd38ecc7f2765fa9e14c5cbd6c7831fe88d2ceabe',
  txtCompactSmallPlus: '76cc3f3552860444bb19f826d0c8428c8d7264dc',
  txtCompactSmall:     '184b1bd4001407d480ae493b95b84e90d347cb52',
  cardRest:          '018e45b617548e9ac778ceb6d8c1cf245108c5db',
};

// ── Frozen logic ──
await Promise.all([
  figma.loadFontAsync({ family: 'Geist', style: 'Medium' }),
  figma.loadFontAsync({ family: 'Geist', style: 'Regular' }),
  figma.loadFontAsync({ family: 'Inter', style: 'Regular' }),
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

const imp = {};
for (const [k, key] of Object.entries(COMP)) {
  imp[k] = await figma.importComponentByKeyAsync(key);
}
const sty = {};
for (const [k, key] of Object.entries(STYLES)) {
  const s = await figma.importStyleByKeyAsync(key);
  sty[k] = s.id;
}

// ── Build board ──
const avatarColorMap = {
  blue:    { bg: T.tagBlueBg,    text: T.tagBlueText },
  purple:  { bg: T.tagPurpleBg,  text: T.tagPurpleText },
  orange:  { bg: T.tagOrangeBg,  text: T.tagOrangeText },
  green:   { bg: T.tagGreenBg,   text: T.tagGreenText },
  neutral: { bg: T.tagNeutralBg, text: T.tagNeutralText },
  red:     { bg: T.tagRedBg,     text: T.tagRedText },
};
const board = figma.createFrame();
board.name = 'Kanban Board';
board.layoutMode = 'HORIZONTAL';
board.resize(1136, 800);
board.primaryAxisSizingMode = 'FIXED';
board.counterAxisSizingMode = 'FIXED';
board.setBoundVariable('itemSpacing', await V(T.sp16));
board.fills = [];
board.clipsContent = false;

for (const status of DATA.statuses) {
  const tasks = DATA.tasks.filter(t => t.status === status.key);

  // Column
  const col = figma.createFrame();
  col.name = status.label;
  col.layoutMode = 'VERTICAL';
  col.primaryAxisSizingMode = 'AUTO';
  col.layoutGrow = 1;
  col.setBoundVariable('itemSpacing', await V(T.sp8));
  col.setBoundVariable('paddingTop', await V(T.sp8));
  col.setBoundVariable('paddingBottom', await V(T.sp8));
  col.setBoundVariable('paddingLeft', await V(T.sp8));
  col.setBoundVariable('paddingRight', await V(T.sp8));
  col.setBoundVariable('topLeftRadius', await V(T.r12));
  col.setBoundVariable('topRightRadius', await V(T.r12));
  col.setBoundVariable('bottomLeftRadius', await V(T.r12));
  col.setBoundVariable('bottomRightRadius', await V(T.r12));
  col.fills = [await SOLID(T.bgKanban)];
  col.clipsContent = false;
  board.appendChild(col);

  // Header
  const header = figma.createFrame();
  header.name = 'Header';
  header.layoutMode = 'HORIZONTAL';
  header.primaryAxisSizingMode = 'FIXED';
  header.counterAxisSizingMode = 'AUTO';
  header.itemSpacing = 6;
  header.paddingTop = 4;
  header.paddingBottom = 4;
  header.fills = [];
  header.clipsContent = true;
  header.counterAxisAlignItems = 'CENTER';
  col.appendChild(header);
  header.layoutSizingHorizontal = 'FILL';

  const dot = imp[status.dotKey].createInstance();
  header.appendChild(dot);

  const labelTxt = figma.createText();
  labelTxt.name = status.label;
  labelTxt.characters = status.label;
  await labelTxt.setTextStyleIdAsync(sty.txtCompactMedPlus);
  labelTxt.fills = [await SOLID(T.fgBase)];
  header.appendChild(labelTxt);

  const spacer = figma.createFrame();
  spacer.name = '_';
  spacer.resize(1, 1);
  spacer.fills = [];
  header.appendChild(spacer);
  spacer.layoutSizingHorizontal = 'FILL';

  const countTxt = figma.createText();
  countTxt.name = 'Count';
  countTxt.characters = String(tasks.length);
  await countTxt.setTextStyleIdAsync(sty.txtCompactMed);
  countTxt.fills = [await SOLID(T.fgMuted)];
  header.appendChild(countTxt);

  // Cards
  for (const task of tasks) {
    const member = DATA.members[task.assignee];
    const prio = DATA.priorityBadge[task.priority];

    const card = figma.createFrame();
    card.name = task.title;
    card.layoutMode = 'VERTICAL';
    card.primaryAxisSizingMode = 'AUTO';
    card.counterAxisSizingMode = 'FIXED';
    card.setBoundVariable('itemSpacing', await V(T.sp12));
    card.setBoundVariable('paddingTop', await V(T.sp12));
    card.setBoundVariable('paddingBottom', await V(T.sp12));
    card.setBoundVariable('paddingLeft', await V(T.sp12));
    card.setBoundVariable('paddingRight', await V(T.sp12));
    card.setBoundVariable('topLeftRadius', await V(T.r8));
    card.setBoundVariable('topRightRadius', await V(T.r8));
    card.setBoundVariable('bottomLeftRadius', await V(T.r8));
    card.setBoundVariable('bottomRightRadius', await V(T.r8));
    card.fills = [await SOLID(T.bgBase)];
    card.clipsContent = false;
    await card.setEffectStyleIdAsync(sty.cardRest);
    col.appendChild(card);
    card.layoutSizingHorizontal = 'FILL';

    // Title
    const titleTxt = figma.createText();
    titleTxt.name = 'Card title';
    titleTxt.characters = task.title;
    await titleTxt.setTextStyleIdAsync(sty.txtCompactSmallPlus);
    titleTxt.fills = [await SOLID(T.fgBase)];
    card.appendChild(titleTxt);

    // Description
    const descTxt = figma.createText();
    descTxt.name = 'Description';
    descTxt.characters = task.desc;
    await descTxt.setTextStyleIdAsync(sty.txtCompactSmall);
    descTxt.fills = [await SOLID(T.fgMuted)];
    descTxt.textTruncation = 'ENDING';
    descTxt.maxLines = 1;
    card.appendChild(descTxt);
    descTxt.layoutSizingHorizontal = 'FILL';

    // Meta row
    const meta = figma.createFrame();
    meta.name = 'Meta';
    meta.layoutMode = 'HORIZONTAL';
    meta.primaryAxisSizingMode = 'FIXED';
    meta.counterAxisSizingMode = 'AUTO';
    meta.itemSpacing = 6;
    meta.fills = [];
    meta.clipsContent = false;
    meta.counterAxisAlignItems = 'CENTER';
    card.appendChild(meta);
    meta.layoutSizingHorizontal = 'FILL';

    // Avatar
    const avatar = imp.avatar.createInstance();
    setProps(avatar, {
      Initials: member.initial,
      Content: 'Letters',
      Type: 'Rounded',
      Size: '2xsmall (20)',
    });
    meta.appendChild(avatar);
    const ac = avatarColorMap[member.color];
    if (ac) {
      const bg = avatar.findOne(n => n.name === 'Background');
      if (bg) bg.fills = [await SOLID(ac.bg)];
      const txt = avatar.findOne(n => n.type === 'TEXT');
      if (txt) txt.fills = [await SOLID(ac.text)];
    }

    // Member name
    const nameTxt = figma.createText();
    nameTxt.name = member.name;
    nameTxt.characters = member.name.split(' ')[0];
    nameTxt.fontSize = 12;
    nameTxt.fills = [await SOLID(T.fgSubtle)];
    meta.appendChild(nameTxt);

    // Spacer
    const mSpacer = figma.createFrame();
    mSpacer.name = '_';
    mSpacer.resize(1, 1);
    mSpacer.fills = [];
    meta.appendChild(mSpacer);
    mSpacer.layoutSizingHorizontal = 'FILL';

    // Due date
    const dueTxt = figma.createText();
    dueTxt.name = 'Due';
    dueTxt.characters = task.due.label;
    dueTxt.fontSize = 12;
    dueTxt.fills = [await SOLID(task.due.overdue && task.status !== 'done' ? T.fgError : T.fgSubtle)];
    meta.appendChild(dueTxt);

    // Priority badge
    const badge = imp.badge.createInstance();
    setProps(badge, {
      Badge: prio.label,
      Size: '2xsmall (20)',
      State: prio.state,
      Radius: 'Rounded',
      'Show Icon Left': false,
      'Show Icon Right': false,
    });
    meta.appendChild(badge);
  }
}

for (const col of board.children) {
  col.layoutSizingVertical = 'FILL';
}

figma.currentPage.appendChild(board);
figma.viewport.scrollAndZoomIntoView([board]);
return { id: board.id, columns: DATA.statuses.length, totalCards: DATA.tasks.length };

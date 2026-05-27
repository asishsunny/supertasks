// table-snippet.js — Execute for any table region.
// Edit DATA block only. Logic is frozen — do not rewrite.
//
// Column types:
//   hidden  — cell.visible = false
//   base    — plain text (title)
//   user    — avatar initial + bg/text + name label
//   badge   — Badge component: State variant + bg fill
//   subtle  — plain text cell (dates, secondary text)
//   number  — plain text, optional dangerIfNonZero
//   status  — swapComponent(dotKey) + label text
//   actions — leave untouched

// ── DATA — Dashboard example (swap entire DATA block per screen) ──────────────
const DATA = {
  pageName:     'Dashboard',
  frameName:    'Dashboard v2',
  toolbarTitle: 'Recent tasks',
  footerResults: '1–6 of 6 results',

  columns: [
    { idx: 0, type: 'base',    field: 'title',    header: 'Task' },
    { idx: 1, type: 'user',    field: 'member',   header: 'Assignee' },
    { idx: 2, type: 'hidden' },
    { idx: 3, type: 'badge',   field: 'priority', header: 'Priority' },
    { idx: 4, type: 'subtle',  field: 'due',      header: 'Due' },
    { idx: 5, type: 'status',  field: 'status',   header: 'Status' },
    { idx: 6, type: 'actions' },
  ],

  rows: [
    { title: 'Update onboarding flow',
      member:   { initial: 'S', name: 'Sara Nelson',
                  avatarBg:   'VariableID:c138645c5821cf3fb7a2806bf1692c831b616846/13723:2124',
                  avatarText: 'VariableID:a3ba0c36bdc9b7d9f5becf55cec39b2558c9ace2/13723:1544' },
      priority: { label: 'High',   state: 'Information' },
      due:      'May 3',
      status:   { label: 'In Progress', dotKey: '9fdba03ef454885f29b4468ee58a79850dc36a92' } },

    { title: 'Q2 roadmap review',
      member:   { initial: 'M', name: 'Mark Tan',
                  avatarBg:   'VariableID:635a7c55a80e4de40ebc1ce7ca68a0a9a934bfe2/13723:2136',
                  avatarText: 'VariableID:a8b0994d0a2981dfa945a5ce74f2a9a971c54b69/13723:1541' },
      priority: { label: 'High',   state: 'Information' },
      due:      'Apr 26',
      status:   { label: 'Todo',        dotKey: '1950f75d5eaa7f748541b97ed485c49dad92cf86' } },

    { title: 'Customer interviews',
      member:   { initial: 'P', name: 'Priya Rao',
                  avatarBg:   'VariableID:e5a19807780182e3813147e1d027b07ba19d68b6/13723:2158',
                  avatarText: 'VariableID:c2417b7057d2a4dd0d31322b507896e316263bea/13723:1550' },
      priority: { label: 'Medium', state: 'Warning' },
      due:      'Apr 28',
      status:   { label: 'In Progress', dotKey: '9fdba03ef454885f29b4468ee58a79850dc36a92' } },

    { title: 'Fix billing bug #482',
      member:   { initial: 'B', name: 'Ben Walsh',
                  avatarBg:   'VariableID:c9402018a1c54ce9457f3c5708e08377a2c40c54/13723:2170',
                  avatarText: 'VariableID:16c7dfec616333d701e9e2a94e1f2b5219e2ba0d/13723:1553' },
      priority: { label: 'High',   state: 'Information' },
      due:      'Apr 22',
      status:   { label: 'Overdue',     dotKey: '151034795ab92850dbdff272c6c3752c4640d629' } },

    { title: 'Design QA — Settings',
      member:   { initial: 'L', name: 'Lara Sato',
                  avatarBg:   'VariableID:0e352014159e2036fcdaf97465ed781e70895f53/13723:2147',
                  avatarText: 'VariableID:246116ae03ae335606cca254e4c208c77ec4faa3/13723:1547' },
      priority: { label: 'Low',    state: 'Neutral' },
      due:      'Apr 30',
      status:   { label: 'Done',        dotKey: '8f8efa94eba0d943ebaeecfe6946ec9062d2ca7d' } },

    { title: 'Migrate analytics SDK',
      member:   { initial: 'O', name: 'Owen King',
                  avatarBg:   'VariableID:0de1938b914dacd18b6d64cefee65c9615a7c0b9/13723:1537',
                  avatarText: 'VariableID:9a673b5d89b9739f0bcb62ea719f40518d2c105d/13723:1538' },
      priority: { label: 'Medium', state: 'Warning' },
      due:      'May 3',
      status:   { label: 'Todo',        dotKey: '1950f75d5eaa7f748541b97ed485c49dad92cf86' } },
  ],
};


// ── Component keys ────────────────────────────────────────────────────────────
const COMP = {
  TableHeader: '282aee4bc621a1a640be2ec305b4016e2d622e24',
  TableRow:    'e7f24bc932738c90a32c15165451e191be4b6eb1',
  TableFooter: '97904dd459a0d78f6dde94a4911925472fc7942d',
  Button:      '576fe1cbf94e7d7101e6dd2aa718e6162cb8eaf4',
};

const T = {
  bgBase:   'VariableID:a426e4a84e9b344ec6a576ccd94d08a189532d69/13723:1393',
  fgBase:   'VariableID:155eba32b1cd754e3d29d82fddd40e387753959f/13723:1408',
  danger:   'VariableID:833309ac5fb38d1ede5084319750b3b7656db04c/13723:1587',
  sp16:     'VariableID:66fa38c9c8238168f844eee4b16541d4462b42c2/6996:1894',
  sp24:     'VariableID:f9f59aa761a5b46f53c37d0e8bd544eb529c7b79/6996:1902',
  r8:       'VariableID:4832ceb3fdb882a1ce42f91b75ed1dc3c27b229f/6996:1716',
  border:   'VariableID:ffbe5f08347e6455d869b13eaaab921056481e06/13723:1417',
};

// ── Style keys ────────────────────────────────────────────────────────────────
const STYLES = {
  cardRestShadow: '018e45b617548e9ac778ceb6d8c1cf245108c5db',
  toolbarTitle:   '76cc3f3552860444bb19f826d0c8428c8d7264dc',
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

// ── Card wrapper ──────────────────────────────────────────────────────────────
const card = figma.createFrame();
card.name = 'Table Card';
card.layoutMode = 'VERTICAL';
card.primaryAxisSizingMode = 'AUTO';
card.counterAxisSizingMode = 'FIXED';
card.resize(content.width, 100);
card.itemSpacing = 0;
card.clipsContent = true;
card.fills = [await SOLID(T.bgBase)];
card.setBoundVariable('cornerRadius', await V(T.r8));
await card.setEffectStyleIdAsync(sty.cardRestShadow);
content.appendChild(card);
card.layoutSizingHorizontal = 'FILL';

// ── Toolbar ───────────────────────────────────────────────────────────────────
const toolbar = figma.createFrame();
toolbar.name = 'Toolbar';
toolbar.layoutMode = 'HORIZONTAL';
toolbar.counterAxisAlignItems = 'CENTER';
toolbar.primaryAxisAlignItems = 'SPACE_BETWEEN';
toolbar.primaryAxisSizingMode = 'FIXED';
toolbar.counterAxisSizingMode = 'AUTO';
toolbar.fills = [];
toolbar.setBoundVariable('paddingLeft',  await V(T.sp24));
toolbar.setBoundVariable('paddingRight', await V(T.sp24));
toolbar.setBoundVariable('paddingTop',   await V(T.sp16));
toolbar.setBoundVariable('paddingBottom', await V(T.sp16));
card.appendChild(toolbar);
toolbar.layoutSizingHorizontal = 'FILL';

const titleTxt = figma.createText();
titleTxt.characters = DATA.toolbarTitle;
await titleTxt.setTextStyleIdAsync(sty.toolbarTitle);
titleTxt.fills = [await SOLID(T.fgBase)];
toolbar.appendChild(titleTxt);

const filterBtn = imp.Button.createInstance();
filterBtn.setProperties({
  'Label#13715:0': 'Add filter',
  Style: 'Secondary',
  Size: 'Small (28)',
  'Show Icon Left#4633:481': false,
  'Show Icon Right#4633:0': false,
});
toolbar.appendChild(filterBtn);

// ── Header ────────────────────────────────────────────────────────────────────
const header = imp.TableHeader.createInstance();
card.appendChild(header);
header.layoutSizingHorizontal = 'FILL';

const headerCells = header.children;
for (const col of DATA.columns) {
  const cell = headerCells[col.idx];
  if (!cell) continue;
  if (col.type === 'hidden') { cell.visible = false; continue; }
  if (col.header) {
    const txt = cell.findOne(n => n.type === 'TEXT');
    if (txt) txt.characters = col.header;
  }
}

// ── Rows ──────────────────────────────────────────────────────────────────────
const borderVar = await V(T.border);

for (const row of DATA.rows) {
  const inst = imp.TableRow.createInstance();
  card.appendChild(inst);
  inst.layoutSizingHorizontal = 'FILL';

  const cells = inst.children;

  for (const col of DATA.columns) {
    const cell = cells[col.idx];
    if (!cell) continue;
    const value = row[col.field];

    switch (col.type) {
      case 'hidden': {
        cell.visible = false;
        break;
      }
      case 'actions': {
        break; // leave untouched
      }
      case 'base':
      case 'subtle': {
        const typeKey = Object.keys(cell.componentProperties || {}).find(k => k === 'Type');
        if (typeKey && !/subtle/i.test(cell.componentProperties[typeKey].value)) {
          cell.setProperties({ [typeKey]: 'Subtle' });
        }
        const txt = cell.findOne(n => n.type === 'TEXT');
        if (txt) txt.characters = String(value ?? '');
        break;
      }
      case 'number': {
        // Switch to Subtle if cell is Badge/Status type
        const typeKey = Object.keys(cell.componentProperties || {}).find(k => k === 'Type');
        if (typeKey && !/subtle/i.test(cell.componentProperties[typeKey].value)) {
          cell.setProperties({ [typeKey]: 'Subtle' });
        }
        const txt = cell.findOne(n => n.type === 'TEXT');
        if (txt) {
          txt.characters = String(value ?? '');
          if (col.dangerIfNonZero && Number(value) > 0) {
            txt.fills = [await SOLID(T.danger)];
          }
        }
        break;
      }
      case 'user': {
        cell.setProperties({ Type: 'User' });
        const avatar = cell.findAll(n => n.type === 'INSTANCE').find(
          n => Object.keys(n.componentProperties || {}).some(k => /Initial/i.test(k))
        );
        if (avatar) {
          const initKey = Object.keys(avatar.componentProperties).find(k => /Initial/i.test(k));
          if (initKey) avatar.setProperties({ [initKey]: value.initial });
          const bg = avatar.findOne(n => n.name === 'Background');
          if (bg) {
            bg.fills = [await SOLID(value.avatarBg)];
            const bgText = bg.findOne(n => n.type === 'TEXT');
            if (bgText) bgText.fills = [await SOLID(value.avatarText)];
          }
        }
        const nameNode = cell.findOne(n => n.type === 'TEXT' && n.name === 'Label');
        if (nameNode) nameNode.characters = value.name;
        break;
      }
      case 'badge': {
        cell.setProperties({ Type: 'Badge' });
        const badge = cell.findOne(n => n.type === 'INSTANCE' && n.name === 'Badge');
        if (badge) {
          const stateKey = Object.keys(badge.componentProperties).find(k => k === 'State');
          const textKey  = Object.keys(badge.componentProperties).find(k => /^Badge#/.test(k));
          if (stateKey) badge.setProperties({ [stateKey]: value.state });
          if (textKey)  badge.setProperties({ [textKey]:  value.label });
        }
        break;
      }
      case 'status': {
        const dotInst = cell.children.find(n => n.type === 'INSTANCE');
        if (dotInst) {
          const dotComp = await figma.importComponentByKeyAsync(value.dotKey);
          dotInst.swapComponent(dotComp);
        }
        const statusLabel = cell.children.find(n => n.type === 'TEXT');
        if (statusLabel) statusLabel.characters = value.label;
        break;
      }
    }
  }

  // Bottom border
  inst.strokes = [figma.variables.setBoundVariableForPaint(
    { type: 'SOLID', color: {r:0,g:0,b:0}, opacity: 1 }, 'color', borderVar
  )];
  inst.strokeAlign      = 'INSIDE';
  inst.strokeTopWeight  = 0; inst.strokeRightWeight = 0;
  inst.strokeBottomWeight = 1; inst.strokeLeftWeight = 0;
}

// ── Footer ────────────────────────────────────────────────────────────────────
const footer = imp.TableFooter.createInstance();
card.appendChild(footer);
footer.layoutSizingHorizontal = 'FILL';

const resultsTxt = footer.findAll(n => n.type === 'TEXT').find(n => /results/i.test(n.characters));
if (resultsTxt) resultsTxt.characters = DATA.footerResults;

const resultsFrame = footer.findOne(n => n.name === 'Results');
if (resultsFrame) {
  const oneNode   = resultsFrame.findOne(n => n.type === 'TEXT' && n.characters === '1');
  const minusNode = resultsFrame.findOne(n => n.name === 'minus');
  if (oneNode)   oneNode.visible   = false;
  if (minusNode) minusNode.visible = false;
}

return { tableCardId: card.id, rows: DATA.rows.length };

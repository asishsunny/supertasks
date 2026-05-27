// kanban-snippet.js — Execute for kanban board with status columns and task cards.
// Edit DATA block only. Logic is frozen — do not rewrite.

// ── DATA ──────────────────────────────────────────────────────────────────────
const DATA = {
  pageName:  'Screens',
  frameName: 'Tasks–Kanban',

  columns: [
    { label: 'To Do',       statusMatch: ['Todo'] },
    { label: 'In Progress', statusMatch: ['In Progress'] },
    { label: 'In Review',   statusMatch: ['In Review'] },
    { label: 'Done',        statusMatch: ['Done'] },
  ],

  rows: [],
};

// ── Component keys ────────────────────────────────────────────────────────────
const COMP = {
  Badge:  'ecf5b4088fb3d288c71c7b880da8768744f26184',
  Button: '576fe1cbf94e7d7101e6dd2aa718e6162cb8eaf4',
};

// ── Prop keys ─────────────────────────────────────────────────────────────────
const PROPS = {
  badgeText:  'Badge#13715:663',
  badgeState: 'State',
};

// ── Token IDs ─────────────────────────────────────────────────────────────────
const T = {
  bgBase:   'VariableID:a426e4a84e9b344ec6a576ccd94d08a189532d69/13723:1393',
  bgKanban: 'VariableID:83de97d19f56bdd2967e86fcee94bbd7633b8f38/17834:32',
  fgBase:   'VariableID:155eba32b1cd754e3d29d82fddd40e387753959f/13723:1408',
  fgSubtle: 'VariableID:77e30ee7a903973aac43f720b387e89390946184/13723:1409',
  fgMuted:  'VariableID:f3577a26be5ee797eeb1a13b34c96237cdf238bb/13723:1410',
  border:   'VariableID:ffbe5f08347e6455d869b13eaaab921056481e06/13723:1417',
  sp4:      'VariableID:df05201f6fbd29c44c88e87f4b8842f9c0e94bf1/6996:1900',
  sp8:      'VariableID:0732ac1e93c221a6e6f7eb84ed8b00b62a9d57ef/6996:1898',
  sp16:     'VariableID:66fa38c9c8238168f844eee4b16541d4462b42c2/6996:1894',
  sp24:     'VariableID:f9f59aa761a5b46f53c37d0e8bd544eb529c7b79/6996:1902',
  r8:       'VariableID:4832ceb3fdb882a1ce42f91b75ed1dc3c27b229f/6996:1716',
};

// ── Style keys ────────────────────────────────────────────────────────────────
const STYLES = {
  txtCompactSmallPlus: '76cc3f3552860444bb19f826d0c8428c8d7264dc',
  txtCompactSmall:     '184b1bd4001407d480ae493b95b84e90d347cb52',
  txtCompactXsmall:    '6bf119e8621766948a9972915a94b26382ecc3ca',
  cardRestShadow:      '018e45b617548e9ac778ceb6d8c1cf245108c5db',
};

const DOT_MAP = {
  'To Do':       'dot_todo',
  'In Progress': 'dot_in_progress',
  'In Review':   'dot_in_review',
  'Done':        'dot_done',
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
  if (!content) throw new Error('Content frame not found — run shell execute first');
}

await figma.loadFontAsync({ family: 'Geist', style: 'Regular' });
await figma.loadFontAsync({ family: 'Geist', style: 'Medium' });

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

// ── Kanban board ────────────────────────────────────────────────────────────
const board = figma.createFrame();
board.name = 'Kanban Board';
board.layoutMode = 'HORIZONTAL';
board.primaryAxisSizingMode = 'FIXED';
board.counterAxisSizingMode = 'AUTO';
board.setBoundVariable('itemSpacing', await V(T.sp16));
board.fills = [];
board.clipsContent = false;
content.appendChild(board);
board.layoutSizingHorizontal = 'FILL';
board.layoutSizingVertical = 'FILL';

for (const col of DATA.columns) {
  const colFrame = figma.createFrame();
  colFrame.name = col.label;
  colFrame.layoutMode = 'VERTICAL';
  colFrame.primaryAxisSizingMode = 'FIXED';
  colFrame.counterAxisSizingMode = 'FIXED';
  colFrame.fills = [await SOLID(T.bgKanban)];
  colFrame.setBoundVariable('cornerRadius', await V(T.r8));
  colFrame.setBoundVariable('paddingLeft', await V(T.sp8));
  colFrame.setBoundVariable('paddingRight', await V(T.sp8));
  colFrame.setBoundVariable('paddingTop', await V(T.sp8));
  colFrame.setBoundVariable('paddingBottom', await V(T.sp8));
  colFrame.setBoundVariable('itemSpacing', await V(T.sp8));
  colFrame.clipsContent = false;
  board.appendChild(colFrame);
  colFrame.layoutGrow = 1;
  colFrame.layoutSizingVertical = 'FILL';

  const colHeader = figma.createFrame();
  colHeader.name = 'Column Header';
  colHeader.layoutMode = 'HORIZONTAL';
  colHeader.primaryAxisSizingMode = 'FIXED';
  colHeader.counterAxisSizingMode = 'AUTO';
  colHeader.counterAxisAlignItems = 'CENTER';
  colHeader.primaryAxisAlignItems = 'SPACE_BETWEEN';
  colHeader.setBoundVariable('paddingLeft', await V(T.sp8));
  colHeader.setBoundVariable('paddingRight', await V(T.sp8));
  colHeader.setBoundVariable('paddingTop', await V(T.sp4));
  colHeader.setBoundVariable('paddingBottom', await V(T.sp4));
  colHeader.fills = [];
  colFrame.appendChild(colHeader);
  colHeader.layoutSizingHorizontal = 'FILL';

  const colTitle = figma.createText();
  colTitle.characters = col.label;
  await colTitle.setTextStyleIdAsync(sty.txtCompactSmallPlus);
  colTitle.fills = [await SOLID(T.fgBase)];
  colHeader.appendChild(colTitle);

  const colRows = DATA.rows.filter(r => col.statusMatch.includes(r.status));

  const countTxt = figma.createText();
  countTxt.characters = String(colRows.length);
  await countTxt.setTextStyleIdAsync(sty.txtCompactSmall);
  countTxt.fills = [await SOLID(T.fgMuted)];
  colHeader.appendChild(countTxt);

  for (const row of colRows) {
    const card = figma.createFrame();
    card.name = row.title;
    card.layoutMode = 'VERTICAL';
    card.primaryAxisSizingMode = 'AUTO';
    card.counterAxisSizingMode = 'FIXED';
    card.fills = [await SOLID(T.bgBase)];
    card.setBoundVariable('cornerRadius', await V(T.r8));
    card.setBoundVariable('paddingLeft', await V(T.sp16));
    card.setBoundVariable('paddingRight', await V(T.sp16));
    card.setBoundVariable('paddingTop', await V(T.sp16));
    card.setBoundVariable('paddingBottom', await V(T.sp16));
    card.setBoundVariable('itemSpacing', await V(T.sp8));
    card.clipsContent = false;
    await card.setEffectStyleIdAsync(sty.cardRestShadow);
    colFrame.appendChild(card);
    card.layoutSizingHorizontal = 'FILL';

    const titleTxt = figma.createText();
    titleTxt.characters = row.title;
    await titleTxt.setTextStyleIdAsync(sty.txtCompactSmallPlus);
    titleTxt.fills = [await SOLID(T.fgBase)];
    card.appendChild(titleTxt);

    if (row.desc) {
      const descTxt = figma.createText();
      descTxt.characters = row.desc;
      await descTxt.setTextStyleIdAsync(sty.txtCompactXsmall);
      descTxt.fills = [await SOLID(T.fgSubtle)];
      descTxt.textAutoResize = 'HEIGHT';
      card.appendChild(descTxt);
      descTxt.layoutSizingHorizontal = 'FILL';
    }

    const metaRow = figma.createFrame();
    metaRow.name = 'Meta';
    metaRow.layoutMode = 'HORIZONTAL';
    metaRow.primaryAxisSizingMode = 'FIXED';
    metaRow.counterAxisSizingMode = 'AUTO';
    metaRow.counterAxisAlignItems = 'CENTER';
    metaRow.primaryAxisAlignItems = 'SPACE_BETWEEN';
    metaRow.fills = [];
    metaRow.setBoundVariable('itemSpacing', await V(T.sp8));
    card.appendChild(metaRow);
    metaRow.layoutSizingHorizontal = 'FILL';

    const badge = imp.Badge.createInstance();
    badge.setProperties({
      [PROPS.badgeText]: row.priority.label,
      [PROPS.badgeState]: row.priority.state,
    });
    metaRow.appendChild(badge);

    const dueTxt = figma.createText();
    dueTxt.characters = row.due;
    await dueTxt.setTextStyleIdAsync(sty.txtCompactXsmall);
    dueTxt.fills = [await SOLID(T.fgMuted)];
    metaRow.appendChild(dueTxt);
  }
}

return { boardId: board.id, columns: DATA.columns.length };

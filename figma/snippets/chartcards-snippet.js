// chartcards-snippet.js — Chart Cards row (1136×212)

// ── DATA ──
const DATA = {
  cards: [
    {
      title: 'Tasks by Priority',
      rows: [
        { label: 'Critical', count: 4, color: 'critical' },
        { label: 'High',     count: 5, color: 'high' },
        { label: 'Medium',   count: 6, color: 'medium' },
        { label: 'Low',      count: 3, color: 'low' },
      ],
    },
    {
      title: 'Tasks by Status',
      rows: [
        { label: 'To Do',       count: 6, color: 'todo' },
        { label: 'In Progress', count: 5, color: 'in_progress' },
        { label: 'In Review',   count: 4, color: 'in_review' },
        { label: 'Done',        count: 3, color: 'done' },
      ],
    },
  ],
  total: 18,
};

// ── Tokens ──
const T = {
  sp4:      'VariableID:df05201f6fbd29c44c88e87f4b8842f9c0e94bf1/6996:1900',
  sp8:      'VariableID:4832ceb3fdb882a1ce42f91b75ed1dc3c27b229f/6996:1716',
  sp16:     'VariableID:66fa38c9c8238168f844eee4b16541d4462b42c2/6996:1894',
  sp24:     'VariableID:f9f59aa761a5b46f53c37d0e8bd544eb529c7b79/6996:1902',
  r4:       'VariableID:fc26ff4b40b530c2bed8b79f226427ca30f6de46/6996:1710',
  r12:      'VariableID:e92b5a3aa058a87489262fd5161b29f8b2b48d5e/6996:1718',
  bgBase:   'VariableID:a426e4a84e9b344ec6a576ccd94d08a189532d69/17968:59',
  fgBase:   'VariableID:155eba32b1cd754e3d29d82fddd40e387753959f/17968:47',
  fgMuted:  'VariableID:f3577a26be5ee797eeb1a13b34c96237cdf238bb/17968:159',
  fgSubtle: 'VariableID:77e30ee7a903973aac43f720b387e89390946184/17968:158',
  trackBg:  'VariableID:ffbe5f08347e6455d869b13eaaab921056481e06/17968:192',
};

// ── Bar colors ──
const BAR_COLORS = {
  critical:    'VariableID:b55a20e0108d05b4e43b8ac904717f3783da1b0d/13723:1542',
  high:        'VariableID:8a1bfa6bb4d1c3e73e69a6aa5fc8d362241d4595/13723:1554',
  medium:      'VariableID:b08df4fe508b449ebdb5d256e72680a31f26cd9e/13723:1551',
  low:         'VariableID:9acf68ac429d615d06b1231878308b831e257784/17968:162',
  todo:        'VariableID:9acf68ac429d615d06b1231878308b831e257784/17968:162',
  in_progress: 'VariableID:303c2dbc9886c58e842b2d131ca498ba1d7b58e1/13723:1545',
  in_review:   'VariableID:b08df4fe508b449ebdb5d256e72680a31f26cd9e/13723:1551',
  done:        'VariableID:3da49128df12418eb4f77556623c6434faeb31f0/13723:1548',
};

// ── Styles ──
const STYLES = {
  txtCompactMedPlus:   'edb007633bab9d52364f6c0d78da75d3f40197a7',
  txtCompactSmall:     '184b1bd4001407d480ae493b95b84e90d347cb52',
  txtCompactSmallPlus: '76cc3f3552860444bb19f826d0c8428c8d7264dc',
  cardRest:            '018e45b617548e9ac778ceb6d8c1cf245108c5db',
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
const TRACK_W = 399;

const outer = figma.createFrame();
outer.name = 'Chart Cards';
outer.layoutMode = 'HORIZONTAL';
outer.primaryAxisSizingMode = 'FIXED';
outer.resize(1136, 1);
outer.counterAxisSizingMode = 'AUTO';
outer.setBoundVariable('itemSpacing', await V(T.sp16));
outer.fills = [];
outer.clipsContent = false;

for (const card of DATA.cards) {
  const cardFrame = figma.createFrame();
  cardFrame.name = card.title;
  cardFrame.layoutMode = 'VERTICAL';
  cardFrame.primaryAxisSizingMode = 'AUTO';
  cardFrame.counterAxisSizingMode = 'FIXED';
  cardFrame.setBoundVariable('paddingTop',    await V(T.sp24));
  cardFrame.setBoundVariable('paddingBottom', await V(T.sp24));
  cardFrame.setBoundVariable('paddingLeft',   await V(T.sp24));
  cardFrame.setBoundVariable('paddingRight',  await V(T.sp24));
  cardFrame.setBoundVariable('itemSpacing',   await V(T.sp16));
  cardFrame.setBoundVariable('topLeftRadius',     await V(T.r12));
  cardFrame.setBoundVariable('topRightRadius',    await V(T.r12));
  cardFrame.setBoundVariable('bottomLeftRadius',  await V(T.r12));
  cardFrame.setBoundVariable('bottomRightRadius', await V(T.r12));
  cardFrame.fills = [await SOLID(T.bgBase)];
  cardFrame.clipsContent = true;
  await cardFrame.setEffectStyleIdAsync(sty.cardRest);
  outer.appendChild(cardFrame);
  cardFrame.layoutSizingHorizontal = 'FILL';

  const title = figma.createText();
  title.name = 'Title';
  title.characters = card.title;
  await title.setTextStyleIdAsync(sty.txtCompactMedPlus);
  title.fills = [await SOLID(T.fgBase)];
  cardFrame.appendChild(title);

  const rows = figma.createFrame();
  rows.name = 'Rows';
  rows.layoutMode = 'VERTICAL';
  rows.primaryAxisSizingMode = 'AUTO';
  rows.counterAxisSizingMode = 'FIXED';
  rows.setBoundVariable('itemSpacing', await V(T.sp16));
  rows.fills = [];
  rows.clipsContent = false;
  cardFrame.appendChild(rows);
  rows.layoutSizingHorizontal = 'FILL';

  for (const r of card.rows) {
    const rowFrame = figma.createFrame();
    rowFrame.name = r.label;
    rowFrame.layoutMode = 'VERTICAL';
    rowFrame.primaryAxisSizingMode = 'AUTO';
    rowFrame.counterAxisSizingMode = 'FIXED';
    rowFrame.setBoundVariable('itemSpacing', await V(T.sp4));
    rowFrame.fills = [];
    rowFrame.clipsContent = false;
    rows.appendChild(rowFrame);
    rowFrame.layoutSizingHorizontal = 'FILL';

    const labelRow = figma.createFrame();
    labelRow.name = 'Label Row';
    labelRow.layoutMode = 'HORIZONTAL';
    labelRow.primaryAxisSizingMode = 'FIXED';
    labelRow.counterAxisSizingMode = 'AUTO';
    labelRow.counterAxisAlignItems = 'CENTER';
    labelRow.setBoundVariable('itemSpacing', await V(T.sp8));
    labelRow.fills = [];
    labelRow.clipsContent = false;
    rowFrame.appendChild(labelRow);
    labelRow.layoutSizingHorizontal = 'FILL';

    const label = figma.createText();
    label.name = r.label;
    label.characters = r.label;
    await label.setTextStyleIdAsync(sty.txtCompactSmall);
    label.fills = [await SOLID(T.fgSubtle)];
    label.textAutoResize = 'HEIGHT';
    labelRow.appendChild(label);
    label.resize(88, label.height);

    const track = figma.createFrame();
    track.name = 'Track';
    track.layoutMode = 'NONE';
    track.setBoundVariable('topLeftRadius',     await V(T.r4));
    track.setBoundVariable('topRightRadius',    await V(T.r4));
    track.setBoundVariable('bottomLeftRadius',  await V(T.r4));
    track.setBoundVariable('bottomRightRadius', await V(T.r4));
    track.fills = [await SOLID(T.trackBg)];
    track.clipsContent = true;
    track.resize(TRACK_W, 8);
    labelRow.appendChild(track);
    track.layoutSizingHorizontal = 'FILL';
    track.layoutSizingVertical = 'FIXED';
    track.resize(track.width, 8);

    const barW = Math.round((r.count / DATA.total) * TRACK_W);
    const bar = figma.createFrame();
    bar.name = 'Bar';
    bar.setBoundVariable('topLeftRadius',     await V(T.r4));
    bar.setBoundVariable('topRightRadius',    await V(T.r4));
    bar.setBoundVariable('bottomLeftRadius',  await V(T.r4));
    bar.setBoundVariable('bottomRightRadius', await V(T.r4));
    bar.fills = [await SOLID(BAR_COLORS[r.color])];
    bar.clipsContent = true;
    bar.resize(barW, 8);
    track.appendChild(bar);

    const count = figma.createText();
    count.name = String(r.count);
    count.characters = String(r.count);
    await count.setTextStyleIdAsync(sty.txtCompactSmallPlus);
    count.fills = [await SOLID(T.fgBase)];
    labelRow.appendChild(count);
  }
}

figma.currentPage.appendChild(outer);
figma.viewport.scrollAndZoomIntoView([outer]);
return { id: outer.id, cards: DATA.cards.length };

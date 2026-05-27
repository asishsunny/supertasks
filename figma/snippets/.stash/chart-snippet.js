// chart-snippet.js — Execute for horizontal bar chart card.
// Edit DATA block only. Logic is frozen — do not rewrite.
// Reference: node 2030:41636 in Snippet generator section.

// ── DATA ──────────────────────────────────────────────────────────────────────
const DATA = {
  pageName:  'Testing',
  frameName: 'Dashboard',
  title:     'Tasks by Priority',

  bars: [
    { label: 'Critical', count: 2,  barColor: 'VariableID:8a1bfa6bb4d1c3e73e69a6aa5fc8d362241d4595/13723:1554' },
    { label: 'High',     count: 6,  barColor: 'VariableID:303c2dbc9886c58e842b2d131ca498ba1d7b58e1/13723:1545' },
    { label: 'Medium',   count: 6,  barColor: 'VariableID:b08df4fe508b449ebdb5d256e72680a31f26cd9e/13723:1551' },
    { label: 'Low',      count: 4,  barColor: 'VariableID:9acf68ac429d615d06b1231878308b831e257784/13723:1539' },
  ],
};

// ── Token IDs — from extractor output ─────────────────────────────────────────
const T = {
  bgBase:    'VariableID:a426e4a84e9b344ec6a576ccd94d08a189532d69/13723:1393',
  fgBase:    'VariableID:155eba32b1cd754e3d29d82fddd40e387753959f/13723:1408',
  fgSubtle:  'VariableID:77e30ee7a903973aac43f720b387e89390946184/13723:1409',
  fgMuted:   'VariableID:f3577a26be5ee797eeb1a13b34c96237cdf238bb/13723:1410',
  trackBg:   'VariableID:94a195327cd83f2264f49dfd65811a5eb9d8cbce/13723:1783',
  sp8:       'VariableID:0732ac1e93c221a6e6f7eb84ed8b00b62a9d57ef/6996:1898',
  sp16:      'VariableID:66fa38c9c8238168f844eee4b16541d4462b42c2/6996:1894',
  sp24:      'VariableID:f9f59aa761a5b46f53c37d0e8bd544eb529c7b79/6996:1902',
  r8:        'VariableID:4832ceb3fdb882a1ce42f91b75ed1dc3c27b229f/6996:1716',
  rFull:     'VariableID:0a4f8e80cf597d7004f537b5ce0ce965dfcf9015/6996:1724',
};

// ── Style keys — from extractor output ────────────────────────────────────────
const STYLES = {
  txtCompactMedPlus: 'edb007633bab9d52364f6c0d78da75d3f40197a7',
  txtCompactSmall:   '184b1bd4001407d480ae493b95b84e90d347cb52',
  txtSmallPlus:      'b44cf02f2c3ac7f0c5cd7bfd25c684aadad69ed7',
  cardRestShadow:    '018e45b617548e9ac778ceb6d8c1cf245108c5db',
};

// ── Frozen logic — do not edit below this line ───────────────────────────────
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
  if (!v) throw new Error(`Variable not found: ${id}`);
  return v;
};
const SOLID = async (id) => figma.variables.setBoundVariableForPaint(
  { type: 'SOLID', color: { r:1, g:1, b:1 }, opacity: 1 }, 'color', await V(id)
);

const sty = {};
for (const [k, key] of Object.entries(STYLES)) {
  const s = await figma.importStyleByKeyAsync(key);
  sty[k] = s.id;
}

// ── Chart card ──────────────────────────────────────────────────────────────
const card = figma.createFrame();
card.name = DATA.title;
card.layoutMode = 'VERTICAL';
card.primaryAxisSizingMode = 'AUTO';
card.counterAxisSizingMode = 'FIXED';
card.fills = [await SOLID(T.bgBase)];
card.clipsContent = true;
card.setBoundVariable('paddingLeft', await V(T.sp24));
card.setBoundVariable('paddingRight', await V(T.sp24));
card.setBoundVariable('paddingTop', await V(T.sp24));
card.setBoundVariable('paddingBottom', await V(T.sp24));
card.setBoundVariable('itemSpacing', await V(T.sp16));
card.setBoundVariable('cornerRadius', await V(T.r8));
await card.setEffectStyleIdAsync(sty.cardRestShadow);
content.appendChild(card);
card.layoutSizingHorizontal = 'FILL';
card.layoutSizingVertical = 'HUG';

// Title
const title = figma.createText();
title.characters = DATA.title;
await title.setTextStyleIdAsync(sty.txtCompactMedPlus);
title.fills = [await SOLID(T.fgBase)];
card.appendChild(title);

// Bars
const maxCount = Math.max(...DATA.bars.map(b => b.count));
const TRACK_REF_W = 392;

for (const bar of DATA.bars) {
  const row = figma.createFrame();
  row.name = bar.label;
  row.layoutMode = 'HORIZONTAL';
  row.primaryAxisSizingMode = 'FIXED';
  row.counterAxisSizingMode = 'AUTO';
  row.counterAxisAlignItems = 'CENTER';
  row.setBoundVariable('itemSpacing', await V(T.sp8));
  row.fills = [];
  row.clipsContent = true;
  card.appendChild(row);
  row.layoutSizingHorizontal = 'FILL';
  row.layoutSizingVertical = 'HUG';

  // Label — fixed width 88
  const lbl = figma.createText();
  lbl.characters = bar.label;
  await lbl.setTextStyleIdAsync(sty.txtCompactSmall);
  lbl.fills = [await SOLID(T.fgSubtle)];
  lbl.textAutoResize = 'HEIGHT';
  lbl.resize(88, lbl.height);
  row.appendChild(lbl);
  lbl.layoutSizingHorizontal = 'FIXED';
  lbl.layoutSizingVertical = 'HUG';

  // Track
  const track = figma.createFrame();
  track.name = 'track';
  track.resize(TRACK_REF_W, 8);
  track.clipsContent = true;
  const trackFill = await SOLID(T.trackBg);
  trackFill.opacity = 0.08;
  track.fills = [trackFill];
  track.setBoundVariable('topLeftRadius', await V(T.rFull));
  track.setBoundVariable('topRightRadius', await V(T.rFull));
  track.setBoundVariable('bottomLeftRadius', await V(T.rFull));
  track.setBoundVariable('bottomRightRadius', await V(T.rFull));
  row.appendChild(track);
  track.layoutSizingHorizontal = 'FILL';
  track.layoutSizingVertical = 'FIXED';

  // Bar inside track
  const barW = Math.max(4, Math.round((bar.count / maxCount) * TRACK_REF_W));
  const barFrame = figma.createFrame();
  barFrame.name = 'bar';
  barFrame.resize(barW, 8);
  barFrame.clipsContent = true;
  barFrame.fills = [await SOLID(bar.barColor)];
  barFrame.setBoundVariable('topLeftRadius', await V(T.rFull));
  barFrame.setBoundVariable('topRightRadius', await V(T.rFull));
  barFrame.setBoundVariable('bottomLeftRadius', await V(T.rFull));
  barFrame.setBoundVariable('bottomRightRadius', await V(T.rFull));
  track.appendChild(barFrame);

  // Count
  const cnt = figma.createText();
  cnt.characters = String(bar.count);
  await cnt.setTextStyleIdAsync(sty.txtSmallPlus);
  cnt.fills = [await SOLID(T.fgMuted)];
  row.appendChild(cnt);
}

return { chartId: card.id, bars: DATA.bars.length };

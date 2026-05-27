// controls-snippet.js — Execute for controls bar above table.
// Edit DATA block only. Logic is frozen — do not rewrite.

// ── DATA ──────────────────────────────────────────────────────────────────────
const DATA = {
  pageName:  'Testing',
  frameName: 'Tasks v1',

  segments: [
    { label: 'Kanban', state: 'Default' },
    { label: 'List',   state: 'Active'  },
  ],

  buttons: [
    { label: 'Filter', icon: '5e14720e7c49812bbe5646ba43ac59cee2958cee' },
    { label: 'Status', icon: '19ab591f4621c177a6a365f43ed9ad78d1ac5760' },
    { label: 'Date',   icon: '90e39a1738086053d8b2d8d378d22ddb137171b3' },
    { label: 'Column', icon: '6bab705b2509a1a98c7487bb09ff3e8ab23b68c0' },
  ],
};

// ── Component keys ────────────────────────────────────────────────────────────
const COMP = {
  SegmentControl: '2fc301fa1dbc38be81bda2ddad2df31460967d89',
  Button:         '576fe1cbf94e7d7101e6dd2aa718e6162cb8eaf4',
};

// ── Prop keys ─────────────────────────────────────────────────────────────────
const PROPS = {
  segLabel:    'Label#7773:15',
  segState:    'State',
  btnLabel:    'Label#13715:0',
  btnStyle:    'Style',
  btnSize:     'Size',
  btnIconLeft: 'Icon Left#13715:101',
  btnShowLeft: 'Show Icon Left#4633:481',
};

// ── Token IDs ─────────────────────────────────────────────────────────────────
const T = {
  sp4:  'VariableID:a1c28706a42ef7439875a76d07c22441141b8742/6996:1903',
  sp8:  'VariableID:0732ac1e93c221a6e6f7eb84ed8b00b62a9d57ef/6996:1898',
  sp16: 'VariableID:66fa38c9c8238168f844eee4b16541d4462b42c2/6996:1894',
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

const V = async (id) => {
  const v = await figma.variables.getVariableByIdAsync(id);
  if (!v) throw new Error(`Variable not found: ${id}`);
  return v;
};

const imp = {};
for (const [k, key] of Object.entries(COMP))
  imp[k] = await figma.importComponentByKeyAsync(key);

// ── Controls bar ──────────────────────────────────────────────────────────────
const bar = figma.createFrame();
bar.name = 'Controls';
bar.layoutMode = 'HORIZONTAL';
bar.primaryAxisSizingMode = 'FIXED';
bar.counterAxisSizingMode = 'AUTO';
bar.counterAxisAlignItems = 'CENTER';
bar.fills = [];
bar.clipsContent = false;
bar.setBoundVariable('paddingTop',    await V(T.sp4));
bar.setBoundVariable('paddingBottom', await V(T.sp4));
bar.setBoundVariable('itemSpacing',   await V(T.sp8));
content.insertChild(0, bar);
bar.layoutSizingHorizontal = 'FILL';

// ── Segment Control ───────────────────────────────────────────────────────────
const seg = imp.SegmentControl.createInstance();
bar.appendChild(seg);

for (let i = 0; i < seg.children.length; i++) {
  const item = seg.children[i];
  if (i < DATA.segments.length) {
    item.visible = true;
    item.setProperties({
      [PROPS.segLabel]: DATA.segments[i].label,
      [PROPS.segState]: DATA.segments[i].state,
    });
  } else {
    item.visible = false;
  }
}

// ── Spacer ────────────────────────────────────────────────────────────────────
const spacer = figma.createFrame();
spacer.name = 'Spacer';
spacer.fills = [];
spacer.layoutGrow = 1;
spacer.resize(1, 1);
bar.appendChild(spacer);

// ── Action buttons ────────────────────────────────────────────────────────────
for (const btn of DATA.buttons) {
  const inst = imp.Button.createInstance();
  const iconComp = await figma.importComponentByKeyAsync(btn.icon);
  inst.setProperties({
    [PROPS.btnLabel]:    btn.label,
    [PROPS.btnStyle]:    'Secondary',
    [PROPS.btnSize]:     'Small (28)',
    [PROPS.btnShowLeft]: true,
    [PROPS.btnIconLeft]: iconComp.id,
  });
  bar.appendChild(inst);
}

return { controlsId: bar.id, segments: DATA.segments.length, buttons: DATA.buttons.length };

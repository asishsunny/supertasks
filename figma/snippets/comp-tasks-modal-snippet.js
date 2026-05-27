// comp-tasks-modal-snippet.js — Tasks + Modal + Drawer + Scrim composition (1440×900)
// Clones existing frames, layers: base → drawer → scrim (bg-overlay) → modal (centered).

// ── DATA ──
const DATA = {
  baseName: 'Tasks — Kanban',
  modalName: 'Create Task Modal',
  compName: 'Tasks — New Task',
  pageW: 1440,
  pageH: 900,
};

// ── Tokens ──
const T = {
  bgOverlay: 'VariableID:24ce4c2f842fa1d703c04c7b87e4a0ac45903713/17834:11',
};

// ── Frozen logic ──
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

// ── Render ──
const findLast = (name) => {
  const all = figma.currentPage.children.filter(n => n.type === 'FRAME' && n.name === name);
  if (!all.length) throw new Error(`"${name}" not found on current page`);
  return all[all.length - 1];
};

const base = findLast(DATA.baseName);
const modalSrc = findLast(DATA.modalName);

const comp = figma.createFrame();
comp.name = DATA.compName;
comp.resize(DATA.pageW, DATA.pageH);
comp.fills = [];
comp.clipsContent = true;

// Layer 0: base
const baseClone = base.clone();
baseClone.x = 0; baseClone.y = 0;
comp.appendChild(baseClone);

// Layer 1: scrim
const scrim = figma.createRectangle();
scrim.name = 'Scrim';
scrim.resize(DATA.pageW, DATA.pageH);
scrim.x = 0; scrim.y = 0;
scrim.fills = [await SOLID(T.bgOverlay)];
comp.appendChild(scrim);

// Layer 2: modal (centered)
const modal = modalSrc.clone();
modal.x = (DATA.pageW - modal.width) / 2;
modal.y = (DATA.pageH - modal.height) / 2;
comp.appendChild(modal);

figma.currentPage.appendChild(comp);
figma.viewport.scrollAndZoomIntoView([comp]);
return { id: comp.id, name: comp.name, w: comp.width, h: comp.height };

// comp-tasks-drawer-snippet.js — Tasks + Drawer composition (1440×900)
// Clones existing "Tasks v2" and "Task Details Modal" frames, positions drawer inset 8px.

// ── DATA ──
const DATA = {
  baseName: 'Tasks — Kanban',
  drawerName: 'Task Details Modal',
  compName: 'Tasks — Drawer',
  pageW: 1440,
  pageH: 900,
  drawerW: 480,
  inset: 8,
};

// ── Render ──
const findLast = (name) => {
  const all = figma.currentPage.children.filter(n => n.type === 'FRAME' && n.name === name);
  if (!all.length) throw new Error(`"${name}" not found on current page`);
  return all[all.length - 1];
};

const base = findLast(DATA.baseName);
const drawerSrc = findLast(DATA.drawerName);

const comp = figma.createFrame();
comp.name = DATA.compName;
comp.resize(DATA.pageW, DATA.pageH);
comp.fills = [];
comp.clipsContent = true;

const baseClone = base.clone();
baseClone.x = 0; baseClone.y = 0;
comp.appendChild(baseClone);

const drawer = drawerSrc.clone();
drawer.x = DATA.pageW - DATA.drawerW - DATA.inset;
drawer.y = DATA.inset;
drawer.resize(DATA.drawerW, DATA.pageH - DATA.inset * 2);
comp.appendChild(drawer);

figma.currentPage.appendChild(comp);
figma.viewport.scrollAndZoomIntoView([comp]);
return { id: comp.id, name: comp.name, w: comp.width, h: comp.height };

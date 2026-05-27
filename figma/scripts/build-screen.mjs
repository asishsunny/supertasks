#!/usr/bin/env node
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { parse as parseYaml } from 'yaml';
import { parseAllDeps } from './parse-deps.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '../..');
const read = (rel) => readFileSync(resolve(root, rel), 'utf8');

// ── CLI ──
const args = process.argv.slice(2);
const screenName = args[0];
if (!screenName) { console.error('Usage: build-screen.mjs <screen> [--dark] [--page X] [--frame Y] [--x N] [--y N]'); process.exit(1); }
const flagVal = (flag) => { const i = args.indexOf(flag); return i !== -1 && args[i + 1] ? args[i + 1] : null; };
const darkMode = args.includes('--dark');
const pageOverride = flagVal('--page');
const frameOverride = flagVal('--frame');
const xOffset = flagVal('--x');
const yOffset = flagVal('--y');

// ── Load data sources ──
const registry = parseYaml(read('data/screens.yaml'));
const screen = registry[screenName];
if (!screen) { console.error(`Screen "${screenName}" not in registry. Available: ${Object.keys(registry).join(', ')}`); process.exit(1); }

const tokens = JSON.parse(read('reference/tokens.json'));
const effectStyles = JSON.parse(read('reference/effect-styles.json'));

// ── Modal screen path (standalone form modal, DATA injected from data.yaml) ──
if (screen.type === 'modal') {
  const data = parseYaml(read('data/data.yaml'));
  const modalData = data.modals?.[screen.modalKey];
  if (!modalData) { console.error(`No modal data for key "${screen.modalKey}" in data.yaml`); process.exit(1); }

  const snippetCode = read('figma/snippets/modal-snippet.js');
  const dataBlock = `const DATA = ${JSON.stringify(modalData)};`;
  const code = snippetCode.replace('/* __MODAL_DATA__ */', dataBlock);

  process.stdout.write(code);
  process.exit(0);
}

// ── Comp screen path (clone + overlay, no snippets) ──
if (screen.type === 'comp') {
  const pageName = pageOverride || screen.page;
  const frameName = frameOverride || screen.frame;
  const sx = xOffset || screen.x || 0;
  const sy = yOffset || screen.y || 0;
  const bgOverlay = 'VariableID:24ce4c2f842fa1d703c04c7b87e4a0ac45903713/17834:11';

  // Map all light→dark effect style pairs
  const lightToDark = {};
  for (const [lightName, lightKey] of Object.entries(effectStyles)) {
    if (!lightName.startsWith('Light/')) continue;
    const darkName = lightName.replace('Light/', 'Dark/');
    const darkKey = effectStyles[darkName];
    if (darkKey) lightToDark[lightKey] = darkKey;
  }

  let out = '';
  const emit = (s) => { out += s + '\n'; };

  emit(`await figma.loadAllPagesAsync();`);
  emit(`let targetPage = figma.root.children.find(p => p.name === ${JSON.stringify(pageName)});`);
  emit(`if (!targetPage) { targetPage = figma.createPage(); targetPage.name = ${JSON.stringify(pageName)}; }`);
  emit(`await figma.setCurrentPageAsync(targetPage);`);
  emit(``);
  emit(`const existing = targetPage.children.find(n => n.name === ${JSON.stringify(frameName)});`);
  emit(`if (existing) existing.remove();`);
  if (darkMode) {
    const darkName = frameName + ' — Dark';
    emit(`const existingDark = targetPage.children.find(n => n.name === ${JSON.stringify(darkName)});`);
    emit(`if (existingDark) existingDark.remove();`);
  }
  emit(``);

  emit(`const findLast = (name) => {`);
  emit(`  const all = targetPage.children.filter(n => n.type === 'FRAME' && n.name === name);`);
  emit(`  if (!all.length) throw new Error('"' + name + '" not found on page');`);
  emit(`  return all[all.length - 1];`);
  emit(`};`);
  emit(``);

  emit(`const base = findLast(${JSON.stringify(screen.base)});`);
  emit(`const overlaySrc = findLast(${JSON.stringify(screen.overlay)});`);
  emit(``);

  emit(`const comp = figma.createFrame();`);
  emit(`comp.name = ${JSON.stringify(frameName)};`);
  emit(`comp.resize(1440, 900);`);
  emit(`comp.fills = [];`);
  emit(`comp.clipsContent = true;`);
  emit(``);
  emit(`const baseClone = base.clone();`);
  emit(`baseClone.x = 0; baseClone.y = 0;`);
  emit(`comp.appendChild(baseClone);`);
  emit(``);

  if (screen.compStyle === 'drawer') {
    const dw = screen.drawerW || 480;
    const inset = screen.inset || 8;
    emit(`const overlay = overlaySrc.clone();`);
    emit(`overlay.x = ${1440 - dw - inset};`);
    emit(`overlay.y = ${inset};`);
    emit(`overlay.resize(${dw}, ${900 - inset * 2});`);
    emit(`comp.appendChild(overlay);`);
  } else {
    // modal with scrim
    emit(`const V_overlay = await figma.variables.getVariableByIdAsync(${JSON.stringify(bgOverlay)});`);
    emit(`let c_ov = V_overlay.valuesByMode[Object.keys(V_overlay.valuesByMode)[0]];`);
    emit(`while (c_ov?.type === 'VARIABLE_ALIAS') {`);
    emit(`  const av = await figma.variables.getVariableByIdAsync(c_ov.id);`);
    emit(`  if (!av) break; c_ov = av.valuesByMode[Object.keys(av.valuesByMode)[0]];`);
    emit(`}`);
    emit(`const rgb_ov = (c_ov && typeof c_ov.r === 'number') ? { r: c_ov.r, g: c_ov.g, b: c_ov.b } : { r: 0, g: 0, b: 0 };`);
    emit(`const scrimFill = figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: rgb_ov, opacity: 1 }, 'color', V_overlay);`);
    emit(``);
    emit(`const scrim = figma.createRectangle();`);
    emit(`scrim.name = 'Scrim';`);
    emit(`scrim.resize(1440, 900);`);
    emit(`scrim.x = 0; scrim.y = 0;`);
    emit(`scrim.fills = [scrimFill];`);
    emit(`comp.appendChild(scrim);`);
    emit(``);
    emit(`const modal = overlaySrc.clone();`);
    emit(`modal.x = Math.round((1440 - modal.width) / 2);`);
    emit(`modal.y = Math.round((900 - modal.height) / 2);`);
    emit(`comp.appendChild(modal);`);
  }
  emit(``);

  emit(`comp.x = ${sx};`);
  emit(`comp.y = ${sy};`);
  emit(`targetPage.appendChild(comp);`);
  emit(``);

  if (darkMode) {
    const darkName = frameName + ' — Dark';
    const allLightKeys = Object.keys(lightToDark);
    const darkKeysForImport = allLightKeys.map(lk => lightToDark[lk]);

    emit(`// ── Dark mode ──`);
    emit(`{`);
    emit(`  const anyVar = await figma.variables.getVariableByIdAsync(${JSON.stringify(bgOverlay)});`);
    emit(`  const rtColId = anyVar.variableCollectionId;`);
    emit(`  const colObj = await figma.variables.getVariableCollectionByIdAsync(rtColId);`);
    emit(`  const rtDarkId = colObj.modes.find(m => m.name === 'Dark').modeId;`);
    emit(`  const rtLightId = colObj.modes.find(m => m.name === 'Light').modeId;`);
    emit(``);

    if (darkKeysForImport.length) {
      emit(`  const _lightKeys = ${JSON.stringify(allLightKeys)};`);
      emit(`  const _darkKeys = ${JSON.stringify(darkKeysForImport)};`);
      emit(`  const _darkResults = await Promise.all(_darkKeys.map(k => figma.importStyleByKeyAsync(k)));`);
      emit(`  const darkStyleMap = {};`);
      emit(`  for (let i = 0; i < _lightKeys.length; i++) darkStyleMap[_lightKeys[i]] = _darkResults[i].id;`);
      emit(``);
    }

    emit(`  const clone = comp.clone();`);
    emit(`  clone.name = ${JSON.stringify(darkName)};`);
    emit(`  clone.x = comp.x + comp.width + 80;`);
    emit(`  clone.y = comp.y;`);
    emit(`  targetPage.appendChild(clone);`);
    emit(``);
    emit(`  clone.setExplicitVariableModeForCollection(colObj, rtDarkId);`);
    emit(`  for (const n of clone.findAll(n => n.explicitVariableModes?.[colObj.id] === rtLightId))`);
    emit(`    n.setExplicitVariableModeForCollection(colObj, rtDarkId);`);
    emit(``);

    if (darkKeysForImport.length) {
      emit(`  const _lightResults = await Promise.all(_lightKeys.map(k => figma.importStyleByKeyAsync(k)));`);
      emit(`  const lightIdMap = {};`);
      emit(`  for (let i = 0; i < _lightKeys.length; i++) lightIdMap[_lightResults[i].id] = darkStyleMap[_lightKeys[i]];`);
      emit(`  for (const n of clone.findAll(n => n.effectStyleId)) {`);
      emit(`    const darkId = lightIdMap[n.effectStyleId];`);
      emit(`    if (darkId) await n.setEffectStyleIdAsync(darkId);`);
      emit(`  }`);
      emit(``);
    }

    emit(`  return { rootId: comp.id, darkRootId: clone.id };`);
    emit(`}`);
  } else {
    emit(`return { rootId: comp.id };`);
  }

  process.stdout.write(out);
  process.exit(0);
}

// ── Standard snippets path ──
const data = parseYaml(read('data/data.yaml'));
const views = parseYaml(read('data/views.yaml'));

const viewData = views[screen.dataView];
if (!viewData) { console.error(`No view data for "${screen.dataView}" in views.yaml`); process.exit(1); }

// ── Parse deps from all snippets ──
const allDeps = parseAllDeps(screen.snippets);

// ── Data transforms ──
function mkShellData(scr, vd) {
  const activeNav = vd.shell?.activeNav || scr.selectedNav;
  return {
    pageName: pageOverride || scr.page,
    frameName: frameOverride || scr.frame,
    app: { name: data.app.name, initials: data.user.initials },
    activeNav,
    breadcrumbs: vd.shell?.breadcrumbs || [scr.pageTitle],
    pageTitle: vd.shell?.pageTitle || scr.pageTitle,
    headerActions: (vd.shell?.headerActions || []).map(a =>
      typeof a === 'string' ? { label: a, iconKey: 'plusmini' } : a
    ),
    user: { name: data.user.name, initials: data.user.initials },
    nav: data.nav.menu.map(item => ({
      title: item.title,
      iconKey: item.codeName.toLowerCase(),
      state: item.title === activeNav ? 'Selected' : 'Default',
    })),
    extensions: data.nav.extensions.map(item => ({
      title: item.title,
      iconKey: item.codeName.toLowerCase(),
      state: item.title === activeNav ? 'Selected' : 'Default',
    })),
  };
}

function mkStats(stats) {
  return {
    cards: [
      { label: 'Total Tasks', value: String(stats.total_tasks) },
      { label: 'In Progress', value: String(stats.in_progress) },
      { label: 'Completed',   value: String(stats.completed) },
      { label: 'Overdue',     value: String(stats.overdue) },
    ],
  };
}

function mkCharts(charts, totalTasks) {
  return {
    cards: [
      {
        title: 'Tasks by Priority',
        rows: [
          { label: 'Critical', count: charts.by_priority.critical, color: 'critical' },
          { label: 'High',     count: charts.by_priority.high,     color: 'high' },
          { label: 'Medium',   count: charts.by_priority.medium,   color: 'medium' },
          { label: 'Low',      count: charts.by_priority.low,      color: 'low' },
        ],
      },
      {
        title: 'Tasks by Status',
        rows: [
          { label: 'To Do',       count: charts.by_status.todo,        color: 'todo' },
          { label: 'In Progress', count: charts.by_status.in_progress, color: 'in_progress' },
          { label: 'In Review',   count: charts.by_status.in_review,   color: 'in_review' },
          { label: 'Done',        count: charts.by_status.done,        color: 'done' },
        ],
      },
    ],
    total: totalTasks,
  };
}

function mkTableData(recentTasks, rawData) {
  const taskMap = Object.fromEntries(rawData.tasks.map(t => [t.id, t]));
  const memberMap = Object.fromEntries(rawData.members.map(m => [m.id, m]));
  const avatarToColor = {
    'tag/blue/tag-blue-bg': 'blue',
    'tag/purple/tag-purple-bg': 'purple',
    'tag/warning/tag-orange-bg': 'orange',
    'tag/error/tag-red-bg': 'red',
    'tag/success/tag-green-bg': 'green',
    'tag/neutral/tag-neutral-bg': 'neutral',
  };
  const priorityState = { low: 'Neutral', medium: 'Warning', high: 'Error', critical: 'Feature' };
  const priorityLabel = { low: 'Low', medium: 'Medium', high: 'High', critical: 'Critical' };
  const statusLabel = { todo: 'To Do', in_progress: 'In Progress', in_review: 'In Review', done: 'Done' };

  const rows = recentTasks.map(rt => {
    const task = taskMap[rt.task_id];
    const member = memberMap[rt.assignee];
    const color = avatarToColor[member.avatar_bg] || 'neutral';
    const due = new Date();
    due.setDate(due.getDate() + task.due);
    const dateStr = due.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const isOverdue = task.due < 0 && task.status !== 'done';
    const row = {
      base: task.title,
      user: { name: member.name, initial: member.initials, color },
      badge: { label: priorityLabel[task.priority], state: priorityState[task.priority] },
      subtle: dateStr,
      statusBadge: statusLabel[task.status],
    };
    if (isOverdue) row.errorFields = ['subtle'];
    return row;
  });

  return {
    title: 'Recent Tasks',
    showTitle: true,
    showFilter: false,
    showFooter: false,
    footer: { from: 1, to: rows.length, total: rawData.tasks.length, page: 1, pages: 1 },
    columns: [
      { header: 'Task',     type: 'base',        field: 'base',       width: 'FILL' },
      { header: 'Assignee', type: 'user',         width: 160 },
      { header: 'Priority', type: 'badge',        width: 120 },
      { header: 'Due Date', type: 'subtle',       field: 'subtle',    width: 130 },
      { header: 'Status',   type: 'statusBadge',  width: 140 },
      { type: 'actions' },
    ],
    rows,
  };
}

function mkControls(controlsData) {
  const defaultFilters = [
    { label: 'Filter',  icon: 'funnel' },
    { label: 'Date',    icon: 'calendarMini' },
    { label: 'Columns', icon: 'adjustments' },
  ];
  return {
    tabs: (controlsData.tabs || []).map(t => ({
      label: typeof t === 'string' ? t : t.label,
      active: typeof t === 'string' ? t === controlsData.activeTab : !!t.active,
    })),
    filters: (controlsData.filters || defaultFilters).map(f =>
      typeof f === 'string' ? { label: f, icon: 'funnel' } : f
    ),
    showSort: controlsData.showSort !== undefined ? controlsData.showSort : true,
    showSearch: controlsData.showSearch !== undefined ? controlsData.showSearch : true,
    searchPlaceholder: controlsData.searchPlaceholder || 'Search',
  };
}

const avatarToColor = {
  'tag/blue/tag-blue-bg': 'blue',
  'tag/purple/tag-purple-bg': 'purple',
  'tag/warning/tag-orange-bg': 'orange',
  'tag/error/tag-red-bg': 'red',
  'tag/success/tag-green-bg': 'green',
  'tag/neutral/tag-neutral-bg': 'neutral',
};

function mkFullTableData(taskIds, rawData) {
  const taskMap = Object.fromEntries(rawData.tasks.map(t => [t.id, t]));
  const memberMap = Object.fromEntries(rawData.members.map(m => [m.id, m]));
  const priorityState = { low: 'Neutral', medium: 'Warning', high: 'Error', critical: 'Feature' };
  const priorityLabel = { low: 'Low', medium: 'Medium', high: 'High', critical: 'Critical' };
  const statusLabel = { todo: 'To Do', in_progress: 'In Progress', in_review: 'In Review', done: 'Done' };

  const rows = taskIds.map(id => {
    const task = taskMap[id];
    const member = memberMap[task.assignee];
    const color = avatarToColor[member.avatar_bg] || 'neutral';
    const due = new Date();
    due.setDate(due.getDate() + task.due);
    const dateStr = due.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const isOverdue = task.due < 0 && task.status !== 'done';
    const row = {
      base: task.title,
      user: { name: member.name, initial: member.initials, color },
      badge: { label: priorityLabel[task.priority], state: priorityState[task.priority] },
      subtle: dateStr,
      statusBadge: statusLabel[task.status],
    };
    if (isOverdue) row.errorFields = ['subtle'];
    return row;
  });

  const total = taskIds.length;
  const showPagination = total > 10;
  const visibleRows = showPagination ? rows.slice(0, 10) : rows;
  const pages = Math.ceil(total / 10);
  return {
    title: 'Tasks',
    showTitle: false,
    showFilter: false,
    showFooter: showPagination,
    footer: { from: 1, to: visibleRows.length, total, page: 1, pages },
    columns: [
      { header: 'Task',     type: 'base',        field: 'base',       width: 'FILL' },
      { header: 'Assignee', type: 'user',         width: 160 },
      { header: 'Priority', type: 'badge',        width: 120 },
      { header: 'Due Date', type: 'subtle',       field: 'subtle',    width: 130 },
      { header: 'Status',   type: 'statusBadge',  width: 140 },
      { type: 'actions' },
    ],
    rows: visibleRows,
  };
}

function mkMemberTableData(viewData, rawData) {
  const memberMap = Object.fromEntries(rawData.members.map(m => [m.id, m]));
  const colDefs = viewData.columns;
  const fieldResolvers = {
    name:      (m, r) => m.name,
    email:     (m, r) => m.email,
    role:      (m, r) => m.role,
    active:    (m, r) => String(r.active),
    overdue:   (m, r) => String(r.overdue),
    report:    (m, r) => r.report,
    range:     (m, r) => r.range,
    generated: (m, r) => r.generated,
    tasks:     (m, r) => String(r.tasks ?? ''),
    rate:      (m, r) => r.rate ?? '',
    progress:  (m, r) => `${r.completed} done · ${r.in_progress} active`,
    status:    (m, r) => r.overdue > 0 ? `${r.overdue} overdue` : 'On track',
  };
  const rows = viewData.rows.map(r => {
    const member = memberMap[r.member_id];
    const color = avatarToColor[member?.avatar_bg] || 'neutral';
    const row = {};
    const errorFields = [];
    for (const col of colDefs) {
      const val = fieldResolvers[col.field]?.(member, r) ?? r[col.field] ?? '';
      if (col.type === 'user')             row.user = { name: val, initial: member?.initials || '?', color };
      else if (col.type === 'badge')       row.badge = { label: val, state: 'Neutral' };
      else if (col.type === 'statusBadge') row.statusBadge = val;
      row[col.field] = val;
      if (col.field === 'overdue' && Number(r.overdue) > 0) errorFields.push('overdue');
    }
    if (errorFields.length) row.errorFields = errorFields;
    return row;
  });
  const columns = colDefs.map(c => ({
    header: c.header,
    type: c.type,
    field: c.field,
    width: c.width === 'FILL' ? 'FILL' : Number(c.width),
  }));
  columns.push({ type: 'actions' });
  return {
    title: viewData.shell?.pageTitle || 'Table',
    showTitle: false,
    showFilter: false,
    showFooter: false,
    footer: { from: 1, to: rows.length, total: rows.length, page: 1, pages: 1 },
    columns,
    rows,
  };
}

function mkKanbanData(columns, rawData) {
  const taskMap = Object.fromEntries(rawData.tasks.map(t => [t.id, t]));
  const memberMap = Object.fromEntries(rawData.members.map(m => [m.id, m]));
  const statusMeta = [
    { key: 'todo',        label: 'To Do',       dotKey: 'squareGreySolid' },
    { key: 'in_progress', label: 'In Progress', dotKey: 'squareBlueSolid' },
    { key: 'in_review',   label: 'In Review',   dotKey: 'squareOrangeSolid' },
    { key: 'done',        label: 'Done',         dotKey: 'squareGreenSolid' },
  ];
  const priorityBadge = {
    low:      { label: 'Low',      state: 'Neutral' },
    medium:   { label: 'Medium',   state: 'Warning' },
    high:     { label: 'High',     state: 'Error' },
    critical: { label: 'Critical', state: 'Feature' },
  };
  const members = {};
  for (const m of rawData.members) {
    const color = avatarToColor[m.avatar_bg] || 'neutral';
    members[m.id] = { name: m.name, initial: m.initials, color };
  }
  const tasks = [];
  for (const status of statusMeta) {
    const ids = columns[status.key] || [];
    for (const id of ids) {
      const t = taskMap[id];
      const due = new Date();
      due.setDate(due.getDate() + t.due);
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      tasks.push({
        id: t.id, title: t.title, desc: t.desc,
        assignee: t.assignee, status: status.key, priority: t.priority,
        due: { label: `${months[due.getMonth()]} ${due.getDate()}`, overdue: t.due < 0 },
      });
    }
  }
  return { statuses: statusMeta, priorityBadge, members, tasks };
}

function mkModalCreateData(rawData) {
  const mc = rawData.modal_create || {};
  return {
    name: 'Create Task Modal',
    title: 'Create new task',
    fields: [
      { label: 'Task name',   type: 'input',   placeholder: mc.placeholders?.task_name || 'Enter task name...' },
      { label: 'Description', type: 'textarea', placeholder: mc.placeholders?.description || 'Add a description...' },
      { label: 'Priority',    type: 'select',  value: 'Select', row: 1 },
      { label: 'Status',      type: 'select',  value: 'Select', row: 1 },
      { label: 'Assignee',    type: 'select',  value: 'Select', row: 2 },
      { label: 'Due date',    type: 'select',  value: 'Select', row: 2 },
    ],
    actions: { primary: 'Create task', secondary: 'Cancel' },
  };
}

function mkModalDetailsData(rawData) {
  const md = rawData.modal_detail || {};
  const taskMap = Object.fromEntries(rawData.tasks.map(t => [t.id, t]));
  const memberMap = Object.fromEntries(rawData.members.map(m => [m.id, m]));
  const task = taskMap[md.task_id] || rawData.tasks[0];
  const assignee = memberMap[task.assignee];
  const color = avatarToColor[assignee.avatar_bg] || 'neutral';
  const bgToken = { blue: 'tagBlueBg', purple: 'tagPurpleBg', orange: 'tagOrangeBg', red: 'tagRedBg', green: 'tagGreenBg', neutral: 'tagNeutralBg' }[color];
  const textToken = { blue: 'tagBlueText', purple: 'tagPurpleText', orange: 'tagOrangeText', red: 'tagRedText', green: 'tagGreenText', neutral: 'tagNeutralText' }[color];
  const statusLabel = { todo: 'To Do', in_progress: 'In Progress', in_review: 'In Review', done: 'Done' };
  const statusBadge = { todo: 'Neutral', in_progress: 'Information', in_review: 'Warning', done: 'Success' };
  const priorityLabel = { low: 'Low', medium: 'Medium', high: 'High', critical: 'Critical' };
  const priorityBadge = { low: 'Neutral', medium: 'Warning', high: 'Error', critical: 'Feature' };
  const due = new Date();
  due.setDate(due.getDate() + task.due);
  const dueStr = due.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const activity = (rawData.activity || [])
    .filter(a => a.task_id === task.id)
    .map(a => {
      const m = memberMap[a.member_id];
      const ac = avatarToColor[m.avatar_bg] || 'neutral';
      const abg = { blue: 'tagBlueBg', purple: 'tagPurpleBg', orange: 'tagOrangeBg', red: 'tagRedBg', green: 'tagGreenBg', neutral: 'tagNeutralBg' }[ac];
      const atx = { blue: 'tagBlueText', purple: 'tagPurpleText', orange: 'tagOrangeText', red: 'tagRedText', green: 'tagGreenText', neutral: 'tagNeutralText' }[ac];
      return { name: m.name, initials: m.initials, bgToken: abg, textToken: atx, time: a.time, text: a.text };
    });
  return {
    drawerTitle: 'Task details',
    kbdLabel: 'Esc',
    infoLabel: 'Info',
    activityLabel: 'Activity log',
    title: task.title,
    desc: task.desc,
    status: { label: statusLabel[task.status], badgeState: statusBadge[task.status] },
    priority: { label: priorityLabel[task.priority], badgeState: priorityBadge[task.priority] },
    assignee: { name: assignee.name, initials: assignee.initials, bgToken, textToken },
    dueDate: dueStr,
    created: md.created || 'Jan 5, 2026',
    activity,
  };
}

function mkModalInviteData(rawData) {
  const mi = rawData.modal_invite || {};
  return {
    name: 'Invite Member Modal',
    title: mi.title || 'Invite team member',
    fields: (mi.fields || []).map(f => ({
      label: f.label, type: 'input', placeholder: f.placeholder,
    })),
    actions: mi.actions || { primary: 'Send invite', secondary: 'Cancel' },
  };
}

function mkCompDrawerData(screen) {
  return {
    baseName: screen.frame.replace(' — Drawer', ' — Kanban').replace(' — Detail', ' — Kanban'),
    drawerName: 'Task Details Modal',
    compName: screen.frame,
    pageW: 1440, pageH: 900, drawerW: 480, inset: 8,
  };
}

function mkCompModalData(screen) {
  return {
    baseName: screen.frame.replace(' — New Task', ' — Kanban'),
    drawerName: 'Task Details Modal',
    modalName: 'Create Task Modal',
    compName: screen.frame,
    pageW: 1440, pageH: 900, drawerW: 480, inset: 8,
  };
}

// ── Build DATA per snippet ──
const snippetDataMap = {
  shell: mkShellData(screen, viewData),
};
if (viewData.controls)     snippetDataMap.controls   = mkControls(viewData.controls);
if (viewData.stats)        snippetDataMap.statcards  = mkStats(viewData.stats);
if (viewData.charts)       snippetDataMap.chartcards = mkCharts(viewData.charts, viewData.stats.total_tasks);
if (viewData.recent_tasks) snippetDataMap.table      = mkTableData(viewData.recent_tasks, data);
if (viewData.rows && Array.isArray(viewData.rows) && typeof viewData.rows[0] === 'number')
  snippetDataMap.table = mkFullTableData(viewData.rows, data);
if (viewData.rows && Array.isArray(viewData.rows) && typeof viewData.rows[0] === 'object') {
  snippetDataMap.table = mkMemberTableData(viewData, data);
}
if (viewData.columns)      snippetDataMap.kanban     = mkKanbanData(viewData.columns, data);
if (viewData.activeTab && screen.snippets.includes('settings')) {
  const settingsData = data.settings;
  const tab = viewData.activeTab;
  const tabLower = tab.toLowerCase();
  snippetDataMap.settings = {
    activeTab: tab,
    tabs: viewData.tabs,
    [tabLower]: { ...viewData[tabLower], ...settingsData[tabLower] },
  };
}
if (screen.snippets.includes('modal-create')) {
  if (screen.dataView === 'team') snippetDataMap['modal-create'] = mkModalInviteData(data);
  else                            snippetDataMap['modal-create'] = mkModalCreateData(data);
}
if (screen.snippets.includes('modal-details'))
  snippetDataMap['modal-details'] = mkModalDetailsData(data);
if (screen.snippets.includes('comp-tasks-drawer'))
  snippetDataMap['comp-tasks-drawer'] = mkCompDrawerData(screen);
if (screen.snippets.includes('comp-tasks-modal'))
  snippetDataMap['comp-tasks-modal'] = mkCompModalData(screen);

// ── Region extraction ──
function snippetRegion(name) {
  const src = readFileSync(resolve(root, 'figma/snippets', `${name}-snippet.js`), 'utf8');
  const lines = src.split('\n');
  let lastBoilerplate = -1;

  for (let i = 0; i < lines.length; i++) {
    if (/^\s*(sty\[|imp\[|eff\[|for \(const \[k|const sty|const imp|const eff|const BADGE_MAP|const CELL_TYPE_MAP)/.test(lines[i]))
      lastBoilerplate = i;
  }

  // Skip standalone function definitions — track from EACH function's line
  for (let i = 0; i < lines.length; i++) {
    if (/^(async )?function (createCell|setText|applyIconFills|setProps|findChild|mkFrame|colorAvatar|mkLabel|mkFilledInput|mkDivider)\b/.test(lines[i])) {
      let depth = 0;
      for (let j = i; j < lines.length; j++) {
        for (const ch of lines[j]) {
          if (ch === '{') depth++;
          if (ch === '}') {
            depth--;
            if (depth === 0) { lastBoilerplate = Math.max(lastBoilerplate, j); j = lines.length; break; }
          }
        }
      }
    }
  }

  // Also skip `const page = figma.currentPage;` line (statcards/chartcards/table don't have it but shell does)
  for (let i = lastBoilerplate + 1; i < lines.length; i++) {
    if (/^const page = figma\.currentPage/.test(lines[i])) {
      lastBoilerplate = Math.max(lastBoilerplate, i);
    }
  }

  let idx = -1;
  for (let i = lastBoilerplate + 1; i < lines.length; i++) {
    if (/^\/\/ ──/.test(lines[i])) { idx = i; break; }
  }
  if (idx === -1) idx = lastBoilerplate + 1;

  let code = lines.slice(idx).join('\n');
  code = code.replace(/\nreturn\s*\{[^}]*\};\s*$/, '');
  code = code.replace(/^.*figma\.currentPage\.appendChild.*$/gm, '');
  code = code.replace(/^.*figma\.viewport\.scrollAndZoomIntoView.*$/gm, '');

  if (name === 'shell') {
    code = code.replace(/^await figma\.loadAllPagesAsync\(\);$/gm, '');
    code = code.replace(/^let targetPage = .*$/gm, '');
    code = code.replace(/^if \(!targetPage\).*$/gm, '');
    code = code.replace(/^await figma\.setCurrentPageAsync.*$/gm, '');
    code = code.replace(/^const existing = .*$/gm, '');
    code = code.replace(/^if \(existing\).*$/gm, '');
    code = code.replace(/^const page = .*$/gm, '');
  }

  return code.split('\n').filter(l => !/^\s*\/\//.test(l) && l.trim() !== '').join('\n');
}

function findRootVar(regionCode) {
  const m = regionCode.match(/const\s+(\w+)\s*=\s*(?:figma\.createFrame\(\)|mkFrame\()/);
  return m ? m[1] : null;
}

// ── Collect all VariableIDs ──
function collectVarIds(obj) {
  const ids = new Set();
  const str = JSON.stringify(obj);
  const re = /VariableID:[^"',}\s]+/g;
  let m;
  while ((m = re.exec(str)) !== null) ids.add(m[0]);
  return ids;
}

const allVarIds = new Set();
for (const block of [allDeps.T, allDeps.BAR_COLORS || {}]) {
  for (const id of collectVarIds(block)) allVarIds.add(id);
}

// ── Build light→dark effect style map ──
const lightToDark = {};
for (const [lightName, lightKey] of Object.entries(effectStyles)) {
  if (!lightName.startsWith('Light/')) continue;
  const darkName = lightName.replace('Light/', 'Dark/');
  const darkKey = effectStyles[darkName];
  if (darkKey) lightToDark[lightKey] = darkKey;
}

// ── Collect effect style keys used by snippets ──
const usedEffectKeys = new Set();
for (const block of [allDeps.EFFECTS || {}, allDeps.STYLES || {}]) {
  for (const val of Object.values(block)) {
    if (effectStyles['Light/Elevation/card-rest'] === val || Object.values(effectStyles).includes(val)) {
      usedEffectKeys.add(val);
    }
  }
}
// Also scan snippet source for effect style keys
for (const sn of screen.snippets) {
  const src = readFileSync(resolve(root, 'figma/snippets', `${sn}-snippet.js`), 'utf8');
  for (const [, key] of Object.entries(effectStyles)) {
    if (src.includes(key)) usedEffectKeys.add(key);
  }
}

// ── Sun icon key (for dark mode moon→sun swap) ──
const componentKeys = JSON.parse(read('reference/component-keys.json'));
const sunIconKey = allDeps.COMP?.sun || (() => {
  for (const [name, key] of Object.entries(componentKeys)) {
    if (/\bsun\b/i.test(name)) return key;
  }
  return null;
})();

// ── Emit composed code ──
const shellData = snippetDataMap.shell;
const contentSnippets = screen.snippets.slice(1);

let out = '';
const emit = (s) => { out += s + '\n'; };

// 1. Page setup
emit(`await figma.loadAllPagesAsync();`);
emit(`let targetPage = figma.root.children.find(p => p.name === ${JSON.stringify(shellData.pageName)});`);
emit(`if (!targetPage) { targetPage = figma.createPage(); targetPage.name = ${JSON.stringify(shellData.pageName)}; }`);
emit(`await figma.setCurrentPageAsync(targetPage);`);
emit(`const existing = targetPage.children.find(n => n.name === ${JSON.stringify(shellData.frameName)});`);
emit(`if (existing) existing.remove();`);
emit(``);

// Also remove dark frame if exists
if (darkMode) {
  const darkFrameName = shellData.frameName + ' — Dark';
  emit(`const existingDark = targetPage.children.find(n => n.name === ${JSON.stringify(darkFrameName)});`);
  emit(`if (existingDark) existingDark.remove();`);
  emit(``);
}

// 2. Font loading
emit(`await Promise.all([`);
emit(`  figma.loadFontAsync({ family: 'Geist', style: 'Medium' }),`);
emit(`  figma.loadFontAsync({ family: 'Geist', style: 'Regular' }),`);
emit(`  figma.loadFontAsync({ family: 'Inter', style: 'Regular' }),`);
emit(`  figma.loadFontAsync({ family: 'Inter', style: 'Medium' }),`);
emit(`]);`);
emit(``);

// 3. Variable preload
const varIdArray = [...allVarIds];
emit(`const _vi = ${JSON.stringify(varIdArray)};`);
emit(`const _vm = {};`);
emit(`await Promise.all(_vi.map(async id => {`);
emit(`  try { _vm[id] = await figma.variables.getVariableByIdAsync(id); } catch(e) {}`);
emit(`}));`);
emit(`const V = (id) => { const v = _vm[id]; if (!v) throw new Error('Var missing: ' + id); return v; };`);
emit(``);

// 4. SOLID helper with cache + alias resolution
emit(`const _solidCache = {};`);
emit(`async function SOLID(id) {`);
emit(`  if (_solidCache[id]) return _solidCache[id];`);
emit(`  const v = V(id);`);
emit(`  let c = v.valuesByMode[Object.keys(v.valuesByMode)[0]];`);
emit(`  while (c?.type === 'VARIABLE_ALIAS') {`);
emit(`    const av = _vm[c.id] || await figma.variables.getVariableByIdAsync(c.id);`);
emit(`    if (!av) break;`);
emit(`    c = av.valuesByMode[Object.keys(av.valuesByMode)[0]];`);
emit(`  }`);
emit(`  const rgb = (c && typeof c.r === 'number') ? { r: c.r, g: c.g, b: c.b } : { r: 1, g: 1, b: 1 };`);
emit(`  _solidCache[id] = figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: rgb, opacity: 1 }, 'color', v);`);
emit(`  return _solidCache[id];`);
emit(`}`);
emit(``);

// findChild helper
emit(`const findChild = (parent, name) => parent.findOne(n => n.name === name);`);
emit(``);

// setProps helper
emit(`function setProps(inst, overrides) {`);
emit(`  const props = {};`);
emit(`  const cp = inst.componentProperties;`);
emit(`  for (const [k, v] of Object.entries(overrides)) {`);
emit(`    for (const cpk of Object.keys(cp)) {`);
emit(`      if (cpk === k || cpk.startsWith(k + '#')) { props[cpk] = v; break; }`);
emit(`    }`);
emit(`  }`);
emit(`  if (Object.keys(props).length) inst.setProperties(props);`);
emit(`}`);
emit(``);

// setText helper with font cache
emit(`const _fontCache = {};`);
emit(`async function setText(parent, name, chars) {`);
emit(`  const t = parent.findOne(n => n.type === 'TEXT' && n.name === name);`);
emit(`  if (!t) return t;`);
emit(`  const fk = t.fontName.family + '/' + t.fontName.style;`);
emit(`  if (!_fontCache[fk]) _fontCache[fk] = figma.loadFontAsync(t.fontName);`);
emit(`  await _fontCache[fk];`);
emit(`  t.characters = chars;`);
emit(`  return t;`);
emit(`}`);
emit(``);

// applyIconFills helper
emit(`async function applyIconFills(parent, varIdOrPaint) {`);
emit(`  const vectors = parent.findAll(n => n.type === 'VECTOR' || n.type === 'BOOLEAN_OPERATION');`);
emit(`  if (!vectors.length) return;`);
emit(`  const fill = typeof varIdOrPaint === 'string' ? await SOLID(varIdOrPaint) : await varIdOrPaint;`);
emit(`  for (const v of vectors) v.fills = [fill];`);
emit(`}`);
emit(``);

// 5. Import all components in parallel
const compEntries = Object.entries(allDeps.COMP || {});
if (compEntries.length) {
  emit(`const _compEntries = ${JSON.stringify(compEntries)};`);
  emit(`const _compResults = await Promise.all(_compEntries.map(([, key]) => figma.importComponentByKeyAsync(key)));`);
  emit(`const imp = Object.fromEntries(_compEntries.map(([k], i) => [k, _compResults[i]]));`);
} else {
  emit(`const imp = {};`);
}
emit(``);

// 6. Import all styles in parallel
const styleEntries = Object.entries(allDeps.STYLES || {});
if (styleEntries.length) {
  emit(`const _styEntries = ${JSON.stringify(styleEntries)};`);
  emit(`const _styResults = await Promise.all(_styEntries.map(([, key]) => figma.importStyleByKeyAsync(key)));`);
  emit(`const sty = Object.fromEntries(_styEntries.map(([k], i) => [k, _styResults[i].id]));`);
} else {
  emit(`const sty = {};`);
}
emit(``);

// 7. Import all effect styles in parallel
const effEntries = Object.entries(allDeps.EFFECTS || {});
if (effEntries.length) {
  emit(`const _effEntries = ${JSON.stringify(effEntries)};`);
  emit(`const _effResults = await Promise.all(_effEntries.map(([, key]) => figma.importStyleByKeyAsync(key)));`);
  emit(`const eff = Object.fromEntries(_effEntries.map(([k], i) => [k, _effResults[i].id]));`);
} else {
  emit(`const eff = {};`);
}
emit(``);

// Merged T (token IDs) — region code references T.xxx
emit(`const T = ${JSON.stringify(allDeps.T)};`);
emit(``);

// BAR_COLORS (if chartcards is in the mix)
if (allDeps.BAR_COLORS && Object.keys(allDeps.BAR_COLORS).length) {
  emit(`const BAR_COLORS = ${JSON.stringify(allDeps.BAR_COLORS)};`);
  emit(``);
}

// BADGE_MAP (if table is in the mix)
if (screen.snippets.includes('table')) {
  emit(`const BADGE_MAP = { Neutral: imp.badgeNeutral, Warning: imp.badgeWarning, Error: imp.badgeError, Feature: imp.badgeFeature };`);
  emit(``);
}

// CELL_TYPE_MAP + createCell (if table is in the mix)
if (screen.snippets.includes('table')) {
  emit(`const CELL_TYPE_MAP = {`);
  emit(`  base: 'cellBase', user: 'cellUser', badge: 'cellBadge',`);
  emit(`  subtle: 'cellSubtle', statusBadge: 'cellStatusBadge', actions: 'cellActions',`);
  emit(`};`);
  emit(``);

  // Extract createCell function from table snippet
  const tableSrc = readFileSync(resolve(root, 'figma/snippets', 'table-snippet.js'), 'utf8');
  const createCellMatch = tableSrc.match(/async function createCell\([\s\S]*?\n\}/);
  if (createCellMatch) {
    emit(createCellMatch[0]);
    emit(``);
  }
}

// Settings helpers (if settings snippet is in the mix)
if (screen.snippets.includes('settings')) {
  const settSrc = readFileSync(resolve(root, 'figma/snippets', 'settings-snippet.js'), 'utf8');
  const helperNames = ['mkFrame', 'colorAvatar', 'mkLabel', 'mkFilledInput', 'mkDivider'];
  for (const fn of helperNames) {
    const re = new RegExp(`^(async )?function ${fn}\\b[\\s\\S]*?\\n\\}`, 'm');
    const m = settSrc.match(re);
    if (m) { emit(m[0]); emit(``); }
  }
}

// Modal helpers (if modal-create or modal-details is in the mix)
if (screen.snippets.includes('modal-create') || screen.snippets.includes('modal-details')) {
  const modalSnippet = screen.snippets.includes('modal-create') ? 'modal-create' : 'modal-details';
  const modalSrc = readFileSync(resolve(root, 'figma/snippets', `${modalSnippet}-snippet.js`), 'utf8');
  const helperNames = ['mkFrame', 'mkLabel'];
  for (const fn of helperNames) {
    const re = new RegExp(`^(async )?function ${fn}\\b[\\s\\S]*?\\n\\}`, 'm');
    const m = modalSrc.match(re);
    if (m) { emit(m[0]); emit(``); }
  }
}

// 8. Shell region
emit(`// ── Shell ──`);
emit(`const DATA = ${JSON.stringify(shellData)};`);
const shellRegion = snippetRegion('shell');
emit(shellRegion);
const sx = xOffset || screen.x || 0;
const sy = yOffset || screen.y || 0;
if (sx || sy) {
  emit(`shell.x = ${sx};`);
  emit(`shell.y = ${sy};`);
}
emit(``);

// 9. Content snippets
for (const name of contentSnippets) {
  const region = snippetRegion(name);
  const rootVar = findRootVar(region);
  const snippetData = snippetDataMap[name];

  if (!snippetData) {
    emit(`// WARNING: No data transform for snippet "${name}" — skipping`);
    continue;
  }

  emit(`// ── ${name} ──`);
  emit(`{`);
  emit(`  const DATA = ${JSON.stringify(snippetData)};`);
  emit(region.split('\n').map(l => '  ' + l).join('\n'));
  if (rootVar) {
    emit(`  pageBody.appendChild(${rootVar});`);
    emit(`  ${rootVar}.layoutSizingHorizontal = 'FILL';`);
  }
  emit(`}`);
  emit(``);
}

// 10. Dark mode
if (darkMode) {
  const darkFrameName = shellData.frameName + ' — Dark';

  // Import ALL light→dark pairs — DS components bring their own effect styles
  const lightKeys = Object.keys(lightToDark);
  const darkKeysForImport = lightKeys.map(lk => lightToDark[lk]);

  emit(`// ── Dark mode ──`);
  emit(`{`);
  emit(`  const anyVar = _vm[Object.keys(_vm)[0]];`);
  emit(`  const rtColId = anyVar.variableCollectionId;`);
  const nFixed = 1 + (sunIconKey ? 1 : 0); // colObj + optional sunComp
  const nLight = lightKeys.length;
  const nDark = darkKeysForImport.length;
  emit(`  const _allStyles = await Promise.all([`);
  emit(`    figma.variables.getVariableCollectionByIdAsync(rtColId),`);
  if (sunIconKey) {
    emit(`    figma.importComponentByKeyAsync(${JSON.stringify(sunIconKey)}),`);
  }
  for (const lk of lightKeys) {
    emit(`    figma.importStyleByKeyAsync(${JSON.stringify(lk)}),`);
  }
  for (const dk of darkKeysForImport) {
    emit(`    figma.importStyleByKeyAsync(${JSON.stringify(dk)}),`);
  }
  emit(`  ]);`);
  emit(`  const colObj = _allStyles[0];`);
  if (sunIconKey) {
    emit(`  const sunComp = _allStyles[1];`);
  }
  if (nLight) {
    emit(`  const _lightResults = _allStyles.slice(${nFixed}, ${nFixed + nLight});`);
    emit(`  const _darkResults = _allStyles.slice(${nFixed + nLight}, ${nFixed + nLight + nDark});`);
    emit(`  const lightIdMap = {};`);
    emit(`  for (let i = 0; i < ${nLight}; i++) lightIdMap[_lightResults[i].id] = _darkResults[i].id;`);
  }
  emit(``);

  emit(`  const rtDarkId = colObj.modes.find(m => m.name === 'Dark').modeId;`);
  emit(`  const rtLightId = colObj.modes.find(m => m.name === 'Light').modeId;`);
  emit(``);
  emit(`  const clone = shell.clone();`);
  emit(`  clone.name = ${JSON.stringify(darkFrameName)};`);
  emit(`  clone.x = shell.x + shell.width + 80;`);
  emit(`  clone.y = shell.y;`);
  emit(`  targetPage.appendChild(clone);`);
  emit(``);
  emit(`  clone.setExplicitVariableModeForCollection(colObj, rtDarkId);`);
  emit(`  for (const n of clone.findAll(n => n.explicitVariableModes?.[colObj.id] === rtLightId))`);
  emit(`    n.setExplicitVariableModeForCollection(colObj, rtDarkId);`);
  emit(``);

  if (nLight) {
    emit(`  for (const n of clone.findAll(n => n.effectStyleId)) {`);
    emit(`    const darkId = lightIdMap[n.effectStyleId];`);
    emit(`    if (darkId) await n.setEffectStyleIdAsync(darkId);`);
    emit(`  }`);
    emit(``);
  }

  if (sunIconKey) {
    emit(`  const moonBtn = clone.findOne(n => n.name === 'IconButton' && n.parent?.name === 'Frame 2171' && n.visible);`);
    emit(`  if (moonBtn) {`);
    emit(`    setProps(moonBtn, { 'Icon': sunComp.id });`);
    emit(`  }`);
  }

  emit(`  return { rootId: shell.id, darkRootId: clone.id };`);
  emit(`}`);
} else {
  emit(`return { rootId: shell.id };`);
}

process.stdout.write(out);

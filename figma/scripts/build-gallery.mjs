#!/usr/bin/env node
/**
 * build-gallery.mjs — Fork of build-screen.mjs for snippet gallery.
 *
 * Same DATA computation, outputs individual snippets with injected DATA.
 * No shell, no dark mode, no region extraction.
 *
 * Usage:
 *   node build-gallery.mjs <screen> <snippet>     Output one snippet with injected DATA
 *   node build-gallery.mjs <screen> --all          Output all content snippets for a screen
 *   node build-gallery.mjs --list                  List all screen→snippet combos
 *   node build-gallery.mjs --render-all             Render all variations via bridge
 */

import { readFileSync } from 'fs';
import { execSync } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { parse as parseYaml } from 'yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '../..');
const read = (rel) => readFileSync(resolve(root, rel), 'utf8');

const args = process.argv.slice(2);
const flagVal = (flag) => { const i = args.indexOf(flag); return i !== -1 && args[i + 1] ? args[i + 1] : null; };

// ── Data sources ──
const registry = parseYaml(read('data/screens.yaml'));
const data = parseYaml(read('data/data.yaml'));
const views = parseYaml(read('data/views.yaml'));

// ── Shared maps ──
const avatarToColor = {
  'tag/blue/tag-blue-bg': 'blue', 'tag/purple/tag-purple-bg': 'purple',
  'tag/warning/tag-orange-bg': 'orange', 'tag/error/tag-red-bg': 'red',
  'tag/success/tag-green-bg': 'green', 'tag/neutral/tag-neutral-bg': 'neutral',
};
const priorityState = { low: 'Neutral', medium: 'Warning', high: 'Error', critical: 'Feature' };
const priorityLabel = { low: 'Low', medium: 'Medium', high: 'High', critical: 'Critical' };
const statusLabel = { todo: 'To Do', in_progress: 'In Progress', in_review: 'In Review', done: 'Done' };

// ── DATA transforms (from build-screen.mjs) ──

function mkStats(stats, rawData, vd) {
  if (stats === 'from-reports') {
    const rows = vd.rows || [];
    const total = rows.length;
    const memberOverdue = new Set(rawData.tasks.filter(t => t.due < 0 && t.status !== 'done').map(t => t.assignee));
    const flagged = rows.filter(r => memberOverdue.has(r.member_id)).length;
    const dates = rows.map(r => r.generated).sort();
    const latest = dates[dates.length - 1] || '—';
    return { cards: [
      { label: 'Total reports', value: String(total) },
      { label: 'Flagged overdue', value: String(flagged), error: true },
      { label: 'Avg per month', value: String(total > 0 ? Math.round((total / 3) * 10) / 10 : 0) },
      { label: 'Last generated', value: latest.replace(/, \d{4}$/, '') },
    ]};
  }
  return { cards: [
    { label: 'Total Tasks', value: String(stats.total_tasks) },
    { label: 'In Progress', value: String(stats.in_progress) },
    { label: 'Completed', value: String(stats.completed) },
    { label: 'Overdue', value: String(stats.overdue), error: true },
  ]};
}

function mkCharts(charts, totalTasks) {
  return {
    cards: [
      { title: 'Tasks by Priority', rows: ['critical','high','medium','low'].map(k => ({ label: priorityLabel[k], count: charts.by_priority[k], color: k })) },
      { title: 'Tasks by Status', rows: ['todo','in_progress','in_review','done'].map(k => ({ label: statusLabel[k], count: charts.by_status[k], color: k })) },
    ], total: totalTasks,
  };
}

function mkTaskRow(task, member) {
  const color = avatarToColor[member.avatar_bg] || 'neutral';
  const due = new Date(); due.setDate(due.getDate() + task.due);
  const dateStr = due.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const row = { base: task.title, user: { name: member.name, initial: member.initials, color },
    badge: { label: priorityLabel[task.priority], state: priorityState[task.priority] },
    subtle: dateStr, statusBadge: statusLabel[task.status] };
  if (task.due < 0 && task.status !== 'done') row.errorFields = ['subtle'];
  return row;
}

function mkTableData(rawData, vd) {
  const taskMap = Object.fromEntries(rawData.tasks.map(t => [t.id, t]));
  const memberMap = Object.fromEntries(rawData.members.map(m => [m.id, m]));
  const taskCols = [
    { header: 'Task', type: 'base', field: 'base', width: 'FILL' },
    { header: 'Assignee', type: 'user', width: 160 },
    { header: 'Priority', type: 'badge', width: 120 },
    { header: 'Due Date', type: 'subtle', field: 'subtle', width: 130 },
    { header: 'Status', type: 'statusBadge', width: 140 },
    { type: 'actions' },
  ];

  if (vd.recent_tasks) {
    const rows = vd.recent_tasks.map(rt => mkTaskRow(taskMap[rt.task_id], memberMap[rt.assignee]));
    return { title: 'Recent Tasks', showTitle: true, showFilter: false, showFooter: false,
      footer: { from: 1, to: rows.length, total: rawData.tasks.length, page: 1, pages: 1 }, columns: taskCols, rows };
  }
  if (vd.rows && typeof vd.rows[0] === 'number') {
    const rows = vd.rows.map(id => mkTaskRow(taskMap[id], memberMap[taskMap[id].assignee]));
    const vis = rows.length > 10 ? rows.slice(0, 10) : rows;
    return { title: 'Tasks', showTitle: false, showFilter: false, showFooter: rows.length > 10,
      footer: { from: 1, to: vis.length, total: rows.length, page: 1, pages: Math.ceil(rows.length / 10) }, columns: taskCols, rows: vis };
  }
  if (vd.rows && typeof vd.rows[0] === 'object') {
    const colDefs = vd.columns;
    const rows = vd.rows.map(r => {
      const member = memberMap[r.member_id];
      const color = avatarToColor[member?.avatar_bg] || 'neutral';
      const row = {}; const errorFields = [];
      for (const col of colDefs) {
        const val = r[col.field] ?? member?.[col.field] ?? '';
        if (col.type === 'user') row.user = { name: member?.name || '', initial: member?.initials || '?', color };
        else row[col.field] = typeof val === 'number' ? String(val) : val;
        if (col.field === 'overdue' && Number(r.overdue) > 0) errorFields.push('overdue');
      }
      if (errorFields.length) row.errorFields = errorFields;
      return row;
    });
    const columns = colDefs.map(c => ({ header: c.header, type: c.type, field: c.field, width: c.width === 'FILL' ? 'FILL' : Number(c.width) }));
    if (!columns.some(c => c.type === 'actions')) columns.push({ type: 'actions' });
    return { title: vd.shell?.pageTitle || 'Table', showTitle: false, showFilter: false, showFooter: false,
      footer: { from: 1, to: rows.length, total: rows.length, page: 1, pages: 1 }, columns, rows };
  }
  return null;
}

function mkControls(cd) {
  return {
    tabs: (cd.tabs || []).map(t => ({ label: typeof t === 'string' ? t : t.label, active: typeof t === 'string' ? t === cd.activeTab : !!t.active })),
    filters: cd.filters || [{ label: 'Filter', icon: 'funnel' }, { label: 'Date', icon: 'calendarMini' }, { label: 'Columns', icon: 'adjustments' }],
    showSort: cd.showSort !== undefined ? cd.showSort : true,
    showSearch: cd.showSearch !== undefined ? cd.showSearch : true,
    searchPlaceholder: cd.searchPlaceholder || 'Search',
  };
}

function mkKanbanData(columns, rawData) {
  const taskMap = Object.fromEntries(rawData.tasks.map(t => [t.id, t]));
  const statusMeta = [{ key: 'todo', label: 'To Do', dotKey: 'squareGreySolid' }, { key: 'in_progress', label: 'In Progress', dotKey: 'squareBlueSolid' },
    { key: 'in_review', label: 'In Review', dotKey: 'squareOrangeSolid' }, { key: 'done', label: 'Done', dotKey: 'squareGreenSolid' }];
  const members = {}; for (const m of rawData.members) members[m.id] = { name: m.name, initial: m.initials, color: avatarToColor[m.avatar_bg] || 'neutral' };
  const tasks = [];
  for (const s of statusMeta) for (const id of (columns[s.key] || [])) {
    const t = taskMap[id]; const due = new Date(); due.setDate(due.getDate() + t.due);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    tasks.push({ id: t.id, title: t.title, desc: t.desc, assignee: t.assignee, status: s.key, priority: t.priority, due: { label: `${months[due.getMonth()]} ${due.getDate()}`, overdue: t.due < 0 } });
  }
  return { statuses: statusMeta, priorityBadge: { low: { label: 'Low', state: 'Neutral' }, medium: { label: 'Medium', state: 'Warning' }, high: { label: 'High', state: 'Error' }, critical: { label: 'Critical', state: 'Feature' } }, members, tasks };
}

function mkSettingsData(rawData, vd) {
  const tab = vd.activeTab; const tabLower = tab.toLowerCase();
  return { activeTab: tab, tabs: vd.tabs, [tabLower]: { ...vd[tabLower], ...rawData.settings[tabLower] } };
}

function mkModalDetailsData(rawData) {
  const md = rawData.modal_detail || {};
  const taskMap = Object.fromEntries(rawData.tasks.map(t => [t.id, t]));
  const memberMap = Object.fromEntries(rawData.members.map(m => [m.id, m]));
  const task = taskMap[md.task_id] || rawData.tasks[0];
  const assignee = memberMap[task.assignee]; const color = avatarToColor[assignee.avatar_bg] || 'neutral';
  const tokenMap = (c) => ({
    bg: { blue: 'tagBlueBg', purple: 'tagPurpleBg', orange: 'tagOrangeBg', red: 'tagRedBg', green: 'tagGreenBg', neutral: 'tagNeutralBg' }[c],
    text: { blue: 'tagBlueText', purple: 'tagPurpleText', orange: 'tagOrangeText', red: 'tagRedText', green: 'tagGreenText', neutral: 'tagNeutralText' }[c],
  });
  const at = tokenMap(color);
  const due = new Date(); due.setDate(due.getDate() + task.due);
  const activity = (rawData.activity || []).filter(a => a.task_id === task.id).map(a => {
    const m = memberMap[a.member_id]; const t = tokenMap(avatarToColor[m.avatar_bg] || 'neutral');
    return { name: m.name, initials: m.initials, bgToken: t.bg, textToken: t.text, time: a.time, text: a.text };
  });
  return { drawerTitle: 'Task details', kbdLabel: 'Esc', infoLabel: 'Info', activityLabel: 'Activity log',
    title: task.title, desc: task.desc,
    status: { label: statusLabel[task.status], badgeState: { todo: 'Neutral', in_progress: 'Information', in_review: 'Warning', done: 'Success' }[task.status] },
    priority: { label: priorityLabel[task.priority], badgeState: priorityState[task.priority] },
    assignee: { name: assignee.name, initials: assignee.initials, bgToken: at.bg, textToken: at.text },
    dueDate: due.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), created: md.created || 'Jan 5, 2026', activity };
}

// ── Build DATA for a screen→snippet combo ──
function buildDATA(screenName, snippetName) {
  const screen = registry[screenName];
  if (!screen) return null;

  if (screen.type === 'modal') {
    return { type: 'modal', data: data.modals?.[screen.modalKey] };
  }
  if (screen.type === 'snippet') {
    return { type: 'raw' };
  }

  const vd = views[screen.dataView];
  if (!vd) return null;

  const map = {};
  if (vd.stats)        map.statcards  = mkStats(vd.stats, data, vd);
  if (vd.charts)       map.chartcards = mkCharts(vd.charts, vd.stats.total_tasks);
  if (vd.controls)     map.controls   = mkControls(vd.controls);
  if (vd.recent_tasks || vd.rows) map.table = mkTableData(data, vd);
  if (vd.columns)      map.kanban     = mkKanbanData(vd.columns, data);
  if (vd.activeTab && screen.snippets?.includes('settings')) map.settings = mkSettingsData(data, vd);

  return { type: 'snippet', data: map[snippetName] };
}

// ── Inject DATA into snippet source ──
function injectSnippet(screenName, snippetName) {
  const result = buildDATA(screenName, snippetName);
  if (!result) return null;

  if (result.type === 'modal') {
    const src = read('figma/snippets/modal-snippet.js');
    return src.replace('/* __MODAL_DATA__ */', `const DATA = ${JSON.stringify(result.data)};`);
  }

  if (result.type === 'raw') {
    return read(`figma/snippets/${registry[screenName].snippet}.js`);
  }

  if (snippetName === 'modal-details') {
    const detailsData = mkModalDetailsData(data);
    const src = read('figma/snippets/modal-details-snippet.js');
    let code = src.replace(/\nconst DATA = \{/, '\nconst _DATA_FALLBACK = {');
    return code.replace('/* __DATA__ */', `const DATA = ${JSON.stringify(detailsData)};`);
  }

  if (!result.data) return null;
  const src = read(`figma/snippets/${snippetName}-snippet.js`);
  let code = src.replace(/\nconst DATA = \{/, '\nconst _DATA_FALLBACK = {');
  return code.replace('/* __DATA__ */', `const DATA = ${JSON.stringify(result.data)};`);
}

// ── Gallery variations ──
const GALLERY = [
  // Stat Cards
  { label: 'StatCards — Dashboard', screen: 'dashboard', snippet: 'statcards' },
  { label: 'StatCards — Reports', screen: 'reports', snippet: 'statcards' },
  // Chart Cards
  { label: 'ChartCards', screen: 'dashboard', snippet: 'chartcards' },
  // Controls
  { label: 'Controls — Tasks', screen: 'tasks_list', snippet: 'controls' },
  { label: 'Controls — Reports', screen: 'reports', snippet: 'controls' },
  // Tables
  { label: 'Table — Dashboard', screen: 'dashboard', snippet: 'table' },
  { label: 'Table — Tasks', screen: 'tasks_list', snippet: 'table' },
  { label: 'Table — Team', screen: 'team', snippet: 'table' },
  { label: 'Table — Reports', screen: 'reports', snippet: 'table' },
  // Kanban
  { label: 'Kanban', screen: 'tasks_kanban', snippet: 'kanban' },
  // Settings
  { label: 'Settings — Profile', screen: 'settings', snippet: 'settings' },
  { label: 'Settings — Notifications', screen: 'settings_notifications', snippet: 'settings' },
  { label: 'Settings — Security', screen: 'settings_security', snippet: 'settings' },
  { label: 'Settings — Billing', screen: 'settings_billing', snippet: 'settings' },
  // Modals
  { label: 'Modal — Create Task', screen: '_modal_create_task', snippet: 'modal' },
  { label: 'Modal — Invite Member', screen: '_modal_invite_member', snippet: 'modal' },
  { label: 'Modal — Generate Report', screen: '_modal_generate_report', snippet: 'modal' },
  // Task Details
  { label: 'Task Details', screen: 'dashboard', snippet: 'modal-details' },
];

// ── Bridge execution ──
const BRIDGE = process.env.FIGMA_BRIDGE_URL || 'http://localhost:3333';

function execViaBridge(code, timeout = 90000) {
  const body = JSON.stringify({ code, timeout });
  const escaped = body.replace(/'/g, "'\\''");
  const resp = execSync(
    `curl -s -X POST ${BRIDGE}/execute -H "Content-Type: application/json" -d '${escaped}'`,
    { encoding: 'utf8', timeout: timeout + 10000, maxBuffer: 10 * 1024 * 1024 }
  );
  const parsed = JSON.parse(resp);
  const text = parsed?.result?.content?.[0]?.text;
  if (text) { const inner = JSON.parse(text); if (inner.success === false) throw new Error(inner.error || 'failed'); return inner.result; }
  if (parsed.error) throw new Error(JSON.stringify(parsed.error));
  return parsed;
}

// ── CLI modes ──

if (args.includes('--list')) {
  for (const v of GALLERY) console.log(`${v.screen}\t${v.snippet}\t${v.label}`);
  process.exit(0);
}

if (args.includes('--render-all')) {
  (async () => {
    console.log(`\n╔════════════════════════════════════╗`);
    console.log(`║     SNIPPET GALLERY RENDERER       ║`);
    console.log(`╚════════════════════════════════════╝\n`);

    try {
      const resp = await fetch(`${BRIDGE}/health`);
      const d = await resp.json();
      if (!d.ready) throw new Error('not ready');
      console.log('✓ Bridge connected\n');
    } catch { console.error('❌ Bridge not running. Start: node figma/scripts/figma-bridge.mjs'); process.exit(1); }

    const pageResult = execViaBridge(`
      await figma.loadAllPagesAsync();
      let page = figma.root.children.find(p => p.name === 'Snippet Gallery');
      if (!page) {
        page = figma.createPage();
        page.name = 'Snippet Gallery';
      }
      // Clear existing children
      for (const child of [...page.children]) {
        try { child.remove(); } catch {}
      }
      await figma.setCurrentPageAsync(page);
      return { pageId: page.id };
    `);
    console.log('✓ Snippet Gallery page ready\n');

    let ok = 0, fail = 0;
    for (const v of GALLERY) {
      process.stdout.write(`  ${v.label}...`);
      try {
        const code = injectSnippet(v.screen, v.snippet);
        if (!code) throw new Error('no code generated');
        execViaBridge(code);
        console.log(' ✓');
        ok++;
      } catch (e) { console.log(` ✗ ${e.message.slice(0, 100)}`); fail++; }
    }

    // Wrap all in one frame, stack vertically
    const wrapResult = execViaBridge(`
      const page = figma.currentPage;
      const wrapper = figma.createFrame();
      wrapper.name = 'Snippet Gallery';
      wrapper.layoutMode = 'VERTICAL';
      wrapper.primaryAxisSizingMode = 'AUTO';
      wrapper.counterAxisSizingMode = 'AUTO';
      wrapper.itemSpacing = 60;
      wrapper.fills = [];
      wrapper.clipsContent = false;
      const children = [...page.children].filter(c => c !== wrapper);
      for (const child of children) {
        wrapper.appendChild(child);
      }
      page.appendChild(wrapper);
      wrapper.x = 0;
      wrapper.y = 0;
      return { wrapperId: wrapper.id, children: wrapper.children.length, width: Math.round(wrapper.width), height: Math.round(wrapper.height) };
    `);
    console.log(`\n✓ Wrapper frame: ${wrapResult.wrapperId} (${wrapResult.children} items, ${wrapResult.width}×${wrapResult.height})`);

    console.log(`\n── Summary ──`);
    console.log(`  ✓ ${ok} rendered`);
    if (fail) console.log(`  ✗ ${fail} failed`);
  })().catch(e => { console.error(e); process.exit(1); });
} else {
  // Single snippet mode: output to stdout
  const screenName = args[0];
  const snippetName = args[1];
  if (!screenName) { console.error('Usage: build-gallery.mjs <screen> <snippet> | --render-all | --list'); process.exit(1); }

  if (snippetName === '--all') {
    const screen = registry[screenName];
    const content = (screen?.snippets || []).filter(s => s !== 'shell');
    for (const name of content) {
      const code = injectSnippet(screenName, name);
      if (code) process.stdout.write(code);
    }
  } else if (snippetName) {
    const code = injectSnippet(screenName, snippetName);
    if (code) process.stdout.write(code);
    else { console.error(`No code for ${screenName}/${snippetName}`); process.exit(1); }
  } else {
    const screen = registry[screenName];
    const content = (screen?.snippets || []).filter(s => s !== 'shell');
    console.error(`Available for ${screenName}: ${content.join(', ')}`);
    process.exit(1);
  }
}

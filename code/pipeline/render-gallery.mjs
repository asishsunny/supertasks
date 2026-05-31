#!/usr/bin/env node
/**
 * render-gallery.mjs — Render all block snippet variations into Snippet Gallery page.
 *
 * Pipes each snippet directly through figma-bridge (no shell, no build-screen).
 * Start bridge first: node figma/scripts/figma-bridge.mjs
 *
 * Usage: node code/pipeline/render-gallery.mjs
 */

import { readFileSync } from "fs";
import { execSync } from "child_process";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const SNIPPETS = resolve(ROOT, "figma/snippets");
const BRIDGE = process.env.FIGMA_BRIDGE_URL || "http://localhost:3333";

function readSnippet(name) {
  return readFileSync(resolve(SNIPPETS, `${name}-snippet.js`), "utf8");
}

function execViaBridge(code, timeout = 60000) {
  const body = JSON.stringify({ code, timeout });
  const escaped = body.replace(/'/g, "'\\''");
  const resp = execSync(
    `curl -s -X POST ${BRIDGE}/execute -H "Content-Type: application/json" -d '${escaped}'`,
    { encoding: "utf8", timeout: timeout + 10000, maxBuffer: 10 * 1024 * 1024 }
  );
  try {
    const parsed = JSON.parse(resp);
    const text = parsed?.result?.content?.[0]?.text;
    if (text) {
      const inner = JSON.parse(text);
      if (inner.success === false) throw new Error(inner.error || "execution failed");
      return inner.result;
    }
    if (parsed.error) throw new Error(JSON.stringify(parsed.error));
    return parsed;
  } catch (e) {
    if (e.message.includes("execution failed")) throw e;
    throw new Error(resp.slice(0, 200));
  }
}

// ── Variations ──
// Each: { label, snippet file, patch function (optional) }

// Load data sources — same as build-screen.mjs
import { parse as parseYaml } from "yaml";
const dataYaml = parseYaml(readFileSync(resolve(ROOT, "data/data.yaml"), "utf8"));
const views = parseYaml(readFileSync(resolve(ROOT, "data/views.yaml"), "utf8"));

// ── Data computation (mirrored from build-screen.mjs mk* functions) ──

const avatarToColor = {
  'tag/blue/tag-blue-bg': 'blue', 'tag/purple/tag-purple-bg': 'purple',
  'tag/warning/tag-orange-bg': 'orange', 'tag/error/tag-red-bg': 'red',
  'tag/success/tag-green-bg': 'green', 'tag/neutral/tag-neutral-bg': 'neutral',
};
const priorityState = { low: 'Neutral', medium: 'Warning', high: 'Error', critical: 'Feature' };
const priorityLabel = { low: 'Low', medium: 'Medium', high: 'High', critical: 'Critical' };
const statusLabel = { todo: 'To Do', in_progress: 'In Progress', in_review: 'In Review', done: 'Done' };

function mkTaskRow(task, member) {
  const color = avatarToColor[member.avatar_bg] || 'neutral';
  const due = new Date(); due.setDate(due.getDate() + task.due);
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
}

function mkTableDATA(screenKey) {
  const vd = views[screenKey];
  const taskMap = Object.fromEntries(dataYaml.tasks.map(t => [t.id, t]));
  const memberMap = Object.fromEntries(dataYaml.members.map(m => [m.id, m]));

  if (vd.recent_tasks) {
    const rows = vd.recent_tasks.map(rt => mkTaskRow(taskMap[rt.task_id], memberMap[rt.assignee]));
    return { title: 'Recent Tasks', showTitle: true, showFilter: false, showFooter: false,
      footer: { from: 1, to: rows.length, total: dataYaml.tasks.length, page: 1, pages: 1 },
      columns: [
        { header: 'Task', type: 'base', field: 'base', width: 'FILL' },
        { header: 'Assignee', type: 'user', width: 160 },
        { header: 'Priority', type: 'badge', width: 120 },
        { header: 'Due Date', type: 'subtle', field: 'subtle', width: 130 },
        { header: 'Status', type: 'statusBadge', width: 140 },
        { type: 'actions' },
      ], rows };
  }
  if (vd.rows && typeof vd.rows[0] === 'number') {
    const rows = vd.rows.map(id => mkTaskRow(taskMap[id], memberMap[taskMap[id].assignee]));
    const total = rows.length;
    const showPagination = total > 10;
    const visibleRows = showPagination ? rows.slice(0, 10) : rows;
    return { title: 'Tasks', showTitle: false, showFilter: false, showFooter: showPagination,
      footer: { from: 1, to: visibleRows.length, total, page: 1, pages: Math.ceil(total / 10) },
      columns: [
        { header: 'Task', type: 'base', field: 'base', width: 'FILL' },
        { header: 'Assignee', type: 'user', width: 160 },
        { header: 'Priority', type: 'badge', width: 120 },
        { header: 'Due Date', type: 'subtle', field: 'subtle', width: 130 },
        { header: 'Status', type: 'statusBadge', width: 140 },
        { type: 'actions' },
      ], rows: visibleRows };
  }
  if (vd.rows && typeof vd.rows[0] === 'object') {
    const colDefs = vd.columns;
    const rows = vd.rows.map(r => {
      const member = memberMap[r.member_id];
      const color = avatarToColor[member?.avatar_bg] || 'neutral';
      const row = {};
      const errorFields = [];
      for (const col of colDefs) {
        const val = r[col.field] ?? '';
        if (col.type === 'user') row.user = { name: member?.name || '', initial: member?.initials || '?', color };
        else row[col.field] = typeof val === 'number' ? String(val) : val;
        if (col.field === 'overdue' && Number(r.overdue) > 0) errorFields.push('overdue');
      }
      if (errorFields.length) row.errorFields = errorFields;
      return row;
    });
    const columns = colDefs.map(c => ({
      header: c.header, type: c.type, field: c.field,
      width: c.width === 'FILL' ? 'FILL' : Number(c.width),
    }));
    if (!columns.some(c => c.type === 'actions')) columns.push({ type: 'actions' });
    return { title: vd.shell?.pageTitle || 'Table', showTitle: false, showFilter: false, showFooter: false,
      footer: { from: 1, to: rows.length, total: rows.length, page: 1, pages: 1 },
      columns, rows };
  }
  return null;
}

function mkStatsDATA(screenKey) {
  const vd = views[screenKey];
  if (!vd.stats) return null;
  if (vd.stats === 'from-reports') {
    const rows = vd.rows || [];
    const total = rows.length;
    const memberOverdue = new Set(
      dataYaml.tasks.filter(t => t.due < 0 && t.status !== 'done').map(t => t.assignee)
    );
    const flagged = rows.filter(r => memberOverdue.has(r.member_id)).length;
    const dates = rows.map(r => r.generated).sort();
    const latest = dates[dates.length - 1] || '—';
    const avgPerMonth = total > 0 ? Math.round((total / 3) * 10) / 10 : 0;
    return { cards: [
      { label: 'Total reports', value: String(total) },
      { label: 'Flagged overdue', value: String(flagged), error: true },
      { label: 'Avg per month', value: String(avgPerMonth) },
      { label: 'Last generated', value: latest.replace(/, \d{4}$/, '') },
    ]};
  }
  return { cards: [
    { label: 'Total Tasks', value: String(vd.stats.total_tasks) },
    { label: 'In Progress', value: String(vd.stats.in_progress) },
    { label: 'Completed', value: String(vd.stats.completed) },
    { label: 'Overdue', value: String(vd.stats.overdue), error: true },
  ]};
}

function mkControlsDATA(screenKey) {
  const vd = views[screenKey];
  if (!vd.controls) return null;
  const c = vd.controls;
  return {
    tabs: (c.tabs || []).map(t => ({ label: typeof t === 'string' ? t : t.label, active: typeof t === 'string' ? t === c.activeTab : !!t.active })),
    filters: (c.filters || [{ label: 'Filter', icon: 'funnel' }, { label: 'Date', icon: 'calendarMini' }, { label: 'Columns', icon: 'adjustments' }]),
    showSort: c.showSort !== undefined ? c.showSort : true,
    showSearch: c.showSearch !== undefined ? c.showSearch : true,
    searchPlaceholder: c.searchPlaceholder || 'Search',
  };
}

function injectDATA(code, data) {
  const injected = `const DATA = ${JSON.stringify(data)};`;
  return code.replace('/* __DATA__ */', injected).replace(/\nconst DATA = \{/, '\nconst _DATA_FALLBACK = {');
}

function injectModalData(code, modalKey) {
  const modalData = dataYaml.modals[modalKey];
  return code.replace("/* __MODAL_DATA__ */", `const DATA = ${JSON.stringify(modalData)};`);
}

const VARIATIONS = [
  { label: "StatCards — Dashboard", snippet: "statcards", patch: (c) => injectDATA(c, mkStatsDATA('dashboard')) },
  { label: "StatCards — Reports", snippet: "statcards", patch: (c) => injectDATA(c, mkStatsDATA('reports')) },
  { label: "ChartCards", snippet: "chartcards" },
  { label: "Controls — Tasks", snippet: "controls", patch: (c) => injectDATA(c, mkControlsDATA('tasks_list')) },
  { label: "Controls — Reports", snippet: "controls", patch: (c) => injectDATA(c, mkControlsDATA('reports')) },
  { label: "Table — Dashboard", snippet: "table", patch: (c) => injectDATA(c, mkTableDATA('dashboard')) },
  { label: "Table — Tasks", snippet: "table", patch: (c) => injectDATA(c, mkTableDATA('tasks_list')) },
  { label: "Table — Team", snippet: "table", patch: (c) => injectDATA(c, mkTableDATA('team')) },
  { label: "Table — Reports", snippet: "table", patch: (c) => injectDATA(c, mkTableDATA('reports')) },
  { label: "Kanban", snippet: "kanban" },
  { label: "Settings — Profile", snippet: "settings" },
  { label: "Settings — Notifications", snippet: "settings", patch: (c) => c.replace(/activeTab:\s*'[^']*'/, "activeTab: 'Notifications'") },
  { label: "Settings — Security", snippet: "settings", patch: (c) => c.replace(/activeTab:\s*'[^']*'/, "activeTab: 'Security'") },
  { label: "Settings — Billing", snippet: "settings", patch: (c) => c.replace(/activeTab:\s*'[^']*'/, "activeTab: 'Billing'") },
  { label: "Modal — Create Task", snippet: "modal", patch: (c) => injectModalData(c, "create_task") },
  { label: "Modal — Invite Member", snippet: "modal", patch: (c) => injectModalData(c, "invite_member") },
  { label: "Modal — Generate Report", snippet: "modal", patch: (c) => injectModalData(c, "generate_report") },
  { label: "Task Details", snippet: "modal-details" },
];

async function main() {
  console.log(`\n╔════════════════════════════════════╗`);
  console.log(`║     SNIPPET GALLERY RENDERER       ║`);
  console.log(`╚════════════════════════════════════╝\n`);

  // Check bridge
  try {
    const resp = await fetch(`${BRIDGE}/health`);
    const data = await resp.json();
    if (!data.ready) throw new Error("not ready");
    console.log("✓ Bridge connected\n");
  } catch {
    console.error("❌ Bridge not running. Start: node figma/scripts/figma-bridge.mjs");
    process.exit(1);
  }

  // Ensure Snippet Gallery page is current
  execViaBridge(`
    await figma.loadAllPagesAsync();
    let page = figma.root.children.find(p => p.name === 'Snippet Gallery');
    if (!page) { page = figma.createPage(); page.name = 'Snippet Gallery'; }
    // Clear existing content
    for (const c of [...page.children]) c.remove();
    await figma.setCurrentPageAsync(page);
    return { pageId: page.id };
  `);
  console.log("✓ Snippet Gallery page ready\n");

  let ok = 0, fail = 0;

  for (const v of VARIATIONS) {
    process.stdout.write(`  ${v.label}...`);
    try {
      let code = readSnippet(v.snippet);
      if (v.patch) code = v.patch(code);
      const result = execViaBridge(code, 90000);
      console.log(` ✓`);
      ok++;
    } catch (e) {
      console.log(` ✗ ${e.message.slice(0, 100)}`);
      fail++;
    }
  }

  // Auto-arrange: stack all frames vertically
  execViaBridge(`
    const page = figma.currentPage;
    let y = 0;
    for (const child of page.children) {
      child.x = 0;
      child.y = y;
      y += child.height + 60;
    }
    return { arranged: page.children.length, totalHeight: y };
  `);

  console.log(`\n── Summary ──`);
  console.log(`  ✓ ${ok} rendered`);
  if (fail) console.log(`  ✗ ${fail} failed`);
}

main().catch(e => { console.error(e); process.exit(1); });

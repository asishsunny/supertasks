#!/usr/bin/env node
// generate-yaml.mjs — Parse plan.md → screens.yaml + views.yaml
// Uses data.yaml for row-level content (task IDs, member stats, reports)

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { parse as parseYaml, stringify as yamlStringify } from 'yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '../..');
const read = (rel) => readFileSync(resolve(root, rel), 'utf8');

const plan = read('plan.md');
const data = parseYaml(read('data/data.yaml'));

// ── Parse plan.md into sections ──
function parsePlan(md) {
  const sections = {};
  const parts = md.split(/^## /m).slice(1);
  for (const part of parts) {
    const lines = part.split('\n');
    const heading = lines[0].trim();
    const body = lines.slice(1).join('\n').trim();
    sections[heading] = body;
  }
  return sections;
}

const sections = parsePlan(plan);

// ── Parse render grid ──
function parseGrid(gridText) {
  const positions = {};
  const rows = gridText.split('\n').filter(l => l.startsWith('|') && /\d/.test(l));
  for (const row of rows) {
    const cells = row.split('|').map(c => c.trim()).filter(Boolean);
    if (cells.length < 3) continue;
    const y = parseInt(cells[1]);
    const screensPart = cells[2];
    const entries = screensPart.split('·').map(s => s.trim());
    for (const entry of entries) {
      const m = entry.match(/^(\S+)\s*\((\d+),\s*(\d+)\)/);
      if (m) {
        positions[m[1]] = { x: parseInt(m[2]), y, darkX: parseInt(m[3]) };
      }
    }
  }
  return positions;
}

const gridPositions = parseGrid(sections['Render grid'] || '');

// ── Parse modals section ──
function parseModals(text) {
  const modals = {};
  if (!text) return modals;
  const blocks = text.split(/^(\w+):/m).slice(1);
  for (let i = 0; i < blocks.length; i += 2) {
    const key = blocks[i].trim();
    const body = blocks[i + 1] || '';
    const title = body.match(/Title:\s*(.+)/)?.[1]?.trim();
    const fieldsRaw = body.match(/Fields:\s*(.+)/)?.[1]?.trim();
    const actionsRaw = body.match(/Actions:\s*(.+)/)?.[1]?.trim();
    const fields = [];
    if (fieldsRaw) {
      const fieldParts = fieldsRaw.split(/,\s*(?=[A-Z])/);
      for (const fp of fieldParts) {
        const fm = fp.match(/^(.+?)\s*\((\w+)(?:,\s*row=(\d+))?\)/);
        if (fm) {
          const f = { label: fm[1].trim(), type: fm[2] };
          if (fm[3]) f.row = parseInt(fm[3]);
          fields.push(f);
        }
      }
    }
    let actions = {};
    if (actionsRaw) {
      const [primary, secondary] = actionsRaw.split('/').map(s => s.trim());
      actions = { primary, secondary };
    }
    modals[key] = { name: title.replace(/^(.)/, c => c.toUpperCase()), title, fields, actions };
  }
  return modals;
}

const modals = parseModals(sections['Modals'] || '');

// ── Helpers ──
function parseList(str) {
  if (!str) return [];
  const m = str.match(/\[([^\]]*)\]/);
  if (m) return m[1].split(',').map(s => s.trim()).filter(Boolean);
  return str.split(',').map(s => s.trim()).filter(Boolean);
}

function getLine(body, key) {
  const re = new RegExp(`^${key}:\\s*(.+)`, 'm');
  const m = body.match(re);
  return m ? m[1].trim() : null;
}

function parseShell(body) {
  const shellLine = getLine(body, 'Shell');
  if (!shellLine) return null;
  const nav = shellLine.match(/nav=(\w+)/)?.[1];
  const bc = parseList(shellLine.match(/breadcrumbs=(\[[^\]]*\])/)?.[1]);
  const actions = parseList(shellLine.match(/actions=(\[[^\]]*\])/)?.[1]);
  return { activeNav: nav, breadcrumbs: bc, pageTitle: nav, headerActions: actions };
}

function parseControls(body) {
  const ctrlLine = getLine(body, 'Controls');
  if (!ctrlLine) return null;
  const tabs = parseList(ctrlLine.match(/tabs=(\[[^\]]*\])/)?.[1]);
  const active = ctrlLine.match(/active=(\w+)/)?.[1];
  const filters = parseList(ctrlLine.match(/filters=(\[[^\]]*\])/)?.[1]);
  const search = ctrlLine.includes('search=true');
  const ctrl = { tabs, activeTab: active };
  if (filters.length) ctrl.filters = filters;
  if (search) ctrl.showSearch = true;
  return ctrl;
}

function parseStats(body) {
  const m = body.match(/\*\*Stats\*\*\s*—\s*(.+)/m);
  const statsLine = m ? m[1].trim() : getLine(body, 'Stats');
  if (!statsLine) return null;
  const items = [];
  const re = /([^,]+?)\s*\(([^)]+)\)/g;
  let sm;
  while ((sm = re.exec(statsLine)) !== null) {
    const label = sm[1].trim();
    let value = sm[2].trim();
    if (/^\d+$/.test(value)) value = parseInt(value);
    items.push({ label, value });
  }
  return items;
}

function splitOutsideParens(str) {
  const parts = [];
  let depth = 0, cur = '';
  for (const ch of str) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (ch === ',' && depth === 0) { parts.push(cur.trim()); cur = ''; }
    else cur += ch;
  }
  if (cur.trim()) parts.push(cur.trim());
  return parts;
}

function parseColumns(body) {
  const colLine = body.match(/^Columns:\s*(.+)/m)?.[1]?.trim();
  if (!colLine) return null;
  const cols = [];
  const parts = splitOutsideParens(colLine);
  for (const part of parts) {
    const m = part.match(/^(.+?)\s*\(([^)]+)\)/);
    if (!m) continue;
    const header = m[1].trim();
    const attrs = m[2].split(',').map(s => s.trim());
    const type = attrs[0];
    let width = null;
    let extra = null;
    for (let i = 1; i < attrs.length; i++) {
      if (attrs[i] === 'FILL') width = 'FILL';
      else if (/^\d+$/.test(attrs[i])) width = parseInt(attrs[i]);
      else if (attrs[i].startsWith('fgError')) extra = attrs[i];
    }
    const field = headerToField(header);
    const col = { header, type, field };
    if (width) col.width = width;
    if (extra) col.extra = extra;
    cols.push(col);
  }
  return cols;
}

function headerToField(header) {
  const map = {
    'Member': 'name', 'Email': 'email', 'Role': 'role',
    'Active tasks': 'active', 'Overdue': 'overdue',
    'Report name': 'report', 'Date range': 'range',
    'Generated on': 'generated', 'Task': 'title',
    'Assignee': 'assignee', 'Status': 'status',
    'Priority': 'priority', 'Due date': 'due',
  };
  return map[header] || header.toLowerCase().replace(/\s+/g, '_');
}

function parseComp(body) {
  const type = getLine(body, 'Type');
  if (type !== 'comp') return null;
  const base = getLine(body, 'Base');
  const styleLine = getLine(body, 'Style');
  const overlay = getLine(body, 'Overlay');
  const modalKey = getLine(body, 'Modal');
  const comp = { base, overlay };
  if (styleLine.includes('drawer')) {
    comp.compStyle = 'drawer';
    const wm = styleLine.match(/width=(\d+)/);
    if (wm) comp.drawerW = parseInt(wm[1]);
    const im = styleLine.match(/inset=(\d+)/);
    if (im) comp.inset = parseInt(im[1]);
  } else {
    comp.compStyle = 'modal';
  }
  if (modalKey) comp.modalKey = modalKey;
  return comp;
}

function parseSettingsTab(body) {
  const tab = getLine(body, 'Settings tab');
  const nav = parseList(getLine(body, 'Settings nav'));
  if (!tab) return null;
  return { tab, nav };
}

// ── Compute rows from data.yaml ──
const today = new Date();
today.setHours(0, 0, 0, 0);

function taskDueDate(task) {
  const d = new Date(today);
  d.setDate(d.getDate() + task.due);
  return d;
}

function isOverdue(task) {
  return taskDueDate(task) < today && task.status !== 'done';
}

const tasks = data.tasks || [];
const members = data.members || [];

function computeDashboardData() {
  const statusCounts = {};
  const priorityCounts = {};
  let inProgress = 0, completed = 0, overdueCount = 0;

  for (const t of tasks) {
    statusCounts[t.status] = (statusCounts[t.status] || 0) + 1;
    priorityCounts[t.priority] = (priorityCounts[t.priority] || 0) + 1;
    if (t.status === 'in_progress') inProgress++;
    if (t.status === 'done') completed++;
    if (isOverdue(t)) overdueCount++;
  }

  const recentTasks = [...tasks]
    .filter(t => t.status !== 'done')
    .sort((a, b) => a.due - b.due)
    .slice(-5)
    .reverse()
    .map(t => ({ task_id: t.id, assignee: t.assignee }));

  return {
    stats: {
      total_tasks: tasks.length,
      in_progress: inProgress,
      completed,
      overdue: overdueCount,
    },
    charts: {
      by_status: {
        todo: statusCounts.todo || 0,
        in_progress: statusCounts.in_progress || 0,
        in_review: statusCounts.in_review || 0,
        done: statusCounts.done || 0,
      },
      by_priority: {
        low: priorityCounts.low || 0,
        medium: priorityCounts.medium || 0,
        high: priorityCounts.high || 0,
        critical: priorityCounts.critical || 0,
      },
    },
    recent_tasks: recentTasks,
  };
}

function computeTaskRows() {
  return tasks.map(t => t.id);
}

function computeKanbanColumns() {
  const cols = { todo: [], in_progress: [], in_review: [], done: [] };
  for (const t of tasks) {
    if (cols[t.status]) cols[t.status].push(t.id);
  }
  return cols;
}

function computeTeamRows() {
  return members.map(m => {
    const memberTasks = tasks.filter(t => t.assignee === m.id && t.status !== 'done');
    const active = memberTasks.length;
    const overdue = memberTasks.filter(t => isOverdue(t)).length;
    return { member_id: m.id, active, overdue };
  });
}

function computeReportsRows() {
  return (data.reports || []).map(r => ({
    report: r.report,
    member_id: r.member_id,
    range: r.range,
    generated: r.generated,
  }));
}

// ── Frame name from screen key ──
function keyToFrame(key) {
  const map = {
    dashboard: 'Dashboard',
    tasks_list: 'Tasks — List',
    tasks_kanban: 'Tasks — Kanban',
    tasks_drawer: 'Tasks — Drawer',
    tasks_modal_create: 'Tasks — New Task',
    team: 'Team',
    team_invite: 'Team — Invite',
    reports: 'Reports',
    reports_generate: 'Reports — Generate',
    settings: 'Settings',
    settings_notifications: 'Settings — Notifications',
    settings_security: 'Settings — Security',
    settings_billing: 'Settings — Billing',
  };
  return map[key] || key;
}

// ── Generate screens.yaml ──
function generateScreens() {
  const screens = {};
  const skipSections = ['Render grid', 'Notes', 'Modals'];

  for (const [key, body] of Object.entries(sections)) {
    if (skipSections.includes(key)) continue;

    const pos = gridPositions[key];
    const comp = parseComp(body);

    if (comp) {
      const entry = { type: 'comp', compStyle: comp.compStyle, base: comp.base, overlay: comp.overlay };
      if (comp.drawerW) entry.drawerW = comp.drawerW;
      if (comp.inset) entry.inset = comp.inset;
      entry.page = 'Final render';
      entry.frame = keyToFrame(key);
      if (pos) { entry.x = pos.x; entry.y = pos.y; }
      screens[key] = entry;
    } else {
      const snippets = parseList(getLine(body, 'Snippets'));
      if (!snippets.length) continue;
      const shell = parseShell(body);
      const entry = {
        snippets,
        page: 'Final render',
        frame: keyToFrame(key),
        pageTitle: shell?.pageTitle || key,
        selectedNav: shell?.activeNav || key,
        dataView: key,
      };
      if (pos) { entry.x = pos.x; entry.y = pos.y; }
      screens[key] = entry;
    }
  }

  // Add standalone modal entries
  for (const [modalKey, modalData] of Object.entries(modals)) {
    screens[`_modal_${modalKey}`] = { type: 'modal', modalKey };
  }
  screens['_modal_details'] = { type: 'snippet', snippet: 'modal-details-snippet.js' };

  return screens;
}

// ── Generate views.yaml ──
function generateViews() {
  const views = {};
  const skipSections = ['Render grid', 'Notes', 'Modals'];

  for (const [key, body] of Object.entries(sections)) {
    if (skipSections.includes(key)) continue;
    if (parseComp(body)) continue;

    const shell = parseShell(body);
    if (!shell) continue;

    const view = { shell };

    // Controls
    const controls = parseControls(body);
    if (controls) view.controls = controls;

    // Settings-specific
    const settingsInfo = parseSettingsTab(body);
    if (settingsInfo) {
      view.tabs = settingsInfo.nav;
      view.activeTab = settingsInfo.tab;

      const tabKey = settingsInfo.tab.toLowerCase();
      if (key !== 'settings') {
        if (tabKey === 'notifications' || tabKey === 'security') {
          const titleLine = getLine(body, 'Title');
          const subtitleLine = getLine(body, 'Subtitle');
          const actionLine = getLine(body, 'Action');
          view[tabKey] = { title: titleLine, subtitle: subtitleLine };
          if (actionLine) view[tabKey].action = actionLine;
        } else if (tabKey === 'billing') {
          view.billing = { title: 'Billing', subtitle: 'Manage your plan and payment' };
        }
      }
    }

    // Stats
    const stats = parseStats(body);
    if (stats && key === 'dashboard') {
      const dashData = computeDashboardData();
      view.stats = dashData.stats;
      view.charts = dashData.charts;
      view.recent_tasks = dashData.recent_tasks;
    } else if (stats) {
      view.stats = stats;
    }

    // Columns
    const columns = parseColumns(body);
    if (columns) {
      view.columns = columns.map(c => {
        const col = { header: c.header, type: c.type };
        if (c.width) col.width = c.width;
        col.field = c.field;
        return col;
      });
    }

    // Rows (computed from data.yaml)
    if (key === 'tasks_list') {
      view.rows = computeTaskRows();
    } else if (key === 'tasks_kanban') {
      view.columns = computeKanbanColumns();
    } else if (key === 'team') {
      view.rows = computeTeamRows();
    } else if (key === 'reports') {
      view.rows = (data.reports || []);
    }

    views[key] = view;
  }

  return views;
}

// ── Write output ──
const screens = generateScreens();
const views = generateViews();

const screensYaml = '# screens.yaml — generated from plan.md\n# Layout: one nav item per row, 80px between frames, 200px between rows\n# Each light+dark pair: 1440 + 80 + 1440 = 2960px wide\n\n' +
  yamlStringify(screens, { lineWidth: 0, flowCollectionPadding: false });

const viewsYaml = '# views.yaml — generated from plan.md + data.yaml\n\n' +
  yamlStringify(views, { lineWidth: 0, flowCollectionPadding: false });

writeFileSync(resolve(root, 'data/screens.yaml'), screensYaml);
writeFileSync(resolve(root, 'data/views.yaml'), viewsYaml);

console.log(`screens.yaml: ${Object.keys(screens).length} entries`);
console.log(`views.yaml: ${Object.keys(views).length} entries`);
console.log('Done.');

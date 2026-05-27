#!/usr/bin/env node
// Generates app/src/lib/data.ts from data/data.yaml
// Single source of truth: data.yaml → TypeScript constants

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { parse as parseYaml } from 'yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '../..');
const data = parseYaml(readFileSync(resolve(root, 'data/data.yaml'), 'utf8'));

function avatarToken(path) {
  if (!path) return '';
  const parts = path.split('/');
  return parts[parts.length - 1];
}

const members = data.members.map(m => ({
  id: m.id,
  name: m.name,
  initials: m.initials,
  email: m.email,
  role: m.role,
  avatarBg: avatarToken(m.avatar_bg),
  avatarText: avatarToken(m.avatar_text),
}));

const tasks = data.tasks.map(t => ({
  id: t.id,
  title: t.title,
  desc: t.desc,
  assignee: t.assignee,
  status: t.status,
  priority: t.priority,
  due: t.due,
}));

const reports = data.reports.map((r, i) => ({
  id: i + 1,
  report: r.report,
  memberId: r.member_id,
  range: r.range,
  generated: r.generated,
}));

const activity = data.activity.map(a => ({
  taskId: a.task_id,
  memberId: a.member_id,
  time: a.time,
  text: a.text,
}));

const user = data.user;
const settings = data.settings;

function jsObj(obj) {
  const pairs = Object.entries(obj).map(([k, v]) =>
    `${k}: ${JSON.stringify(v)}`
  );
  return `{ ${pairs.join(', ')} }`;
}

function memberLine(m) {
  return `  { id: ${m.id}, name: ${JSON.stringify(m.name)}, initials: ${JSON.stringify(m.initials)}, email: ${JSON.stringify(m.email)}, role: ${JSON.stringify(m.role)}, avatarBg: ${JSON.stringify(m.avatarBg)}, avatarText: ${JSON.stringify(m.avatarText)} },`;
}

function taskLine(t) {
  return `  { id: ${t.id}, title: ${JSON.stringify(t.title)}, desc: ${JSON.stringify(t.desc)}, assignee: ${t.assignee}, status: ${JSON.stringify(t.status)}, priority: ${JSON.stringify(t.priority)}, due: offsetDate(${t.due}) },`;
}

function reportLine(r) {
  return `  { id: ${r.id}, report: ${JSON.stringify(r.report)}, memberId: ${r.memberId}, range: ${JSON.stringify(r.range)}, generated: ${JSON.stringify(r.generated)} },`;
}

function activityLine(a) {
  return `  { taskId: ${a.taskId}, memberId: ${a.memberId}, time: ${JSON.stringify(a.time)}, text: ${JSON.stringify(a.text)} },`;
}

function toggleLine(t) {
  return `  { label: ${JSON.stringify(t.label)}, desc: ${JSON.stringify(t.desc)}, on: ${t.on} },`;
}

const modals = data.modals;

function modalConfigBlock(key, config) {
  const fields = config.fields.map(f => {
    const parts = [`label: ${JSON.stringify(f.label)}`, `type: ${JSON.stringify(f.type)}`];
    if (f.placeholder) parts.push(`placeholder: ${JSON.stringify(f.placeholder)}`);
    if (f.value) parts.push(`value: ${JSON.stringify(f.value)}`);
    if (f.row != null) parts.push(`row: ${f.row}`);
    return `    { ${parts.join(', ')} },`;
  });
  return `  ${key}: {
    title: ${JSON.stringify(config.title)},
    fields: [
${fields.join('\n')}
    ],
    actions: { primary: ${JSON.stringify(config.actions.primary)}, secondary: ${JSON.stringify(config.actions.secondary)} },
  },`;
}

const out = `// Auto-generated from data/data.yaml — do not edit manually
// Run: node code/scripts/gen-data-ts.mjs

import { offsetDate } from "./utils";
import type { Task, Member, Report, SettingsToggle, ModalConfig, ActivityItem } from "@/types";

export const MEMBERS: Member[] = [
${members.map(memberLine).join('\n')}
];

export const INITIAL_TASKS: Task[] = [
${tasks.map(taskLine).join('\n')}
];

export const INITIAL_REPORTS: Report[] = [
${reports.map(reportLine).join('\n')}
];

export const ACTIVITY: ActivityItem[] = [
${activity.map(activityLine).join('\n')}
];

export const CURRENT_USER = { name: ${JSON.stringify(user.name)}, initials: ${JSON.stringify(user.initials)}, email: ${JSON.stringify(user.email)}, role: ${JSON.stringify(user.role)}, avatar: "/avatar-ludvig.png" };

export const NOTIFICATION_TOGGLES: SettingsToggle[] = [
${settings.notifications.toggles.map(toggleLine).join('\n')}
];

export const SECURITY_TOGGLES: SettingsToggle[] = [
${settings.security.toggles.map(toggleLine).join('\n')}
];

export const MODAL_CONFIGS: Record<string, ModalConfig> = {
${Object.entries(modals).map(([k, v]) => modalConfigBlock(k, v)).join('\n')}
};

export const BILLING = {
  plan: ${jsObj(settings.billing.plan)},
  payment: ${jsObj(settings.billing.payment)},
  history: [
${settings.billing.history.map(h => `    ${jsObj(h)},`).join('\n')}
  ],
};
`;

const outPath = resolve(root, 'app/src/lib/data.ts');
writeFileSync(outPath, out);
console.log(`Wrote ${outPath}`);

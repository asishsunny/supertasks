#!/usr/bin/env node
/**
 * Sync plan.md — recompute all data-derived values from data.yaml.
 * Keeps plan structure intact, replaces numbers/counts with current data.
 *
 * Usage: node code/scripts/sync-plan.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(resolve(__dirname, "../../app/package.json"));
const yaml = require("js-yaml");

const DATA_PATH = resolve(__dirname, "../../data/data.yaml");
const PLAN_PATH = resolve(__dirname, "../../plan.md");

const data = yaml.load(readFileSync(DATA_PATH, "utf8"));
let plan = readFileSync(PLAN_PATH, "utf8");

// ── Compute stats ──

const tasks = data.tasks;
const members = data.members;
const reports = data.reports;

const byStatus = {};
const byPriority = {};
for (const t of tasks) {
  byStatus[t.status] = (byStatus[t.status] || 0) + 1;
  byPriority[t.priority] = (byPriority[t.priority] || 0) + 1;
}

const total = tasks.length;
const inProgress = byStatus.in_progress || 0;
const completed = byStatus.done || 0;
const overdue = tasks.filter(t => t.due < 0 && t.status !== "done").length;
const onTrack = tasks.filter(t => t.status !== "done" && t.due >= 0).length;
const avgRate = Math.round((completed / total) * 100);

const todo = byStatus.todo || 0;
const inReview = byStatus.in_review || 0;
const done = byStatus.done || 0;

const low = byPriority.low || 0;
const medium = byPriority.medium || 0;
const high = byPriority.high || 0;
const critical = byPriority.critical || 0;

// ── Replacements ──

const replacements = [
  // Dashboard stats
  [
    /\*\*Stats\*\* — Total tasks \(\d+\), In progress \(\d+\), Completed \(\d+\), Overdue \(\d+\)/,
    `**Stats** — Total tasks (${total}), In progress (${inProgress}), Completed (${completed}), Overdue (${overdue})`,
  ],
  // Dashboard charts - status
  [
    /Tasks by status — Todo \(\d+\), In Progress \(\d+\), In Review \(\d+\), Done \(\d+\)/,
    `Tasks by status — Todo (${todo}), In Progress (${inProgress}), In Review (${inReview}), Done (${done})`,
  ],
  // Dashboard charts - priority
  [
    /Tasks by priority — Low \(\d+\), Medium \(\d+\), High \(\d+\), Critical \(\d+\)/,
    `Tasks by priority — Low (${low}), Medium (${medium}), High (${high}), Critical (${critical})`,
  ],
  // Dashboard table rows
  [
    /\*\*Table\*\* — \d+ rows, no pagination/,
    `**Table** — 5 rows, no pagination`,
  ],
  // Tasks list table
  [
    /\*\*Table\*\* — \d+ rows, paginate after 10/,
    `**Table** — ${total} rows, paginate after 10`,
  ],
  // Kanban columns
  [
    /\*\*Kanban\*\* — Todo \(\d+\), In Progress \(\d+\), In Review \(\d+\), Done \(\d+\)/,
    `**Kanban** — Todo (${todo}), In Progress (${inProgress}), In Review (${inReview}), Done (${done})`,
  ],
  // Team table
  [
    /\*\*Table\*\* — \d+ rows, no pagination\nColumns: Member/,
    `**Table** — ${members.length} rows, no pagination\nColumns: Member`,
  ],
  // Reports stats
  [
    /\*\*Stats\*\* — Total completed \(\d+\), Avg completion rate \(\d+%\), Overdue \(\d+\), On track \(\d+\)/,
    `**Stats** — Total completed (${completed}), Avg completion rate (${avgRate}%), Overdue (${overdue}), On track (${onTrack})`,
  ],
  // Reports table
  [
    /\*\*Table\*\* — \d+ rows, no pagination\nColumns: Report/,
    `**Table** — ${reports.length} rows, no pagination\nColumns: Report`,
  ],
  // Settings billing history
  [
    /History rows: .+/,
    `History rows: ${data.settings.billing.history.map(h => `${h.date} / ${h.desc} / ${h.amount}`).join(", ")}`,
  ],
  // Settings toggles - notifications
  [
    /Toggles: Email notifications \(o(?:n|ff)\), Push notifications \(o(?:n|ff)\), Weekly digest \(o(?:n|ff)\), Mentions \(o(?:n|ff)\), Overdue alerts \(o(?:n|ff)\)/,
    `Toggles: ${data.settings.notifications.toggles.map(t => `${t.label} (${t.on ? "on" : "off"})`).join(", ")}`,
  ],
  // Settings toggles - security
  [
    /Toggles: Two-factor authentication \(o(?:n|ff)\), Login alerts \(o(?:n|ff)\), Session timeout \(o(?:n|ff)\), Require password change \(o(?:n|ff)\), SSO enforcement \(o(?:n|ff)\)/,
    `Toggles: ${data.settings.security.toggles.map(t => `${t.label} (${t.on ? "on" : "off"})`).join(", ")}`,
  ],
  // Modal fields - create_task
  [
    /create_task:\n  Title: .+\n  Fields: .+\n  Actions: .+/,
    `create_task:\n  Title: ${data.modals.create_task.title}\n  Fields: ${data.modals.create_task.fields.map(f => `${f.label} (${f.type}${f.row ? `, row=${f.row}` : ""})`).join(", ")}\n  Actions: ${data.modals.create_task.actions.primary} / ${data.modals.create_task.actions.secondary}`,
  ],
  // Modal fields - invite_member
  [
    /invite_member:\n  Title: .+\n  Fields: .+\n  Actions: .+/,
    `invite_member:\n  Title: ${data.modals.invite_member.title}\n  Fields: ${data.modals.invite_member.fields.map(f => `${f.label} (${f.type})`).join(", ")}\n  Actions: ${data.modals.invite_member.actions.primary} / ${data.modals.invite_member.actions.secondary}`,
  ],
  // Breadcrumbs for reports (30 days reference)
  [
    /breadcrumbs=\[Reports, \d+ days\]/,
    `breadcrumbs=[Reports, 30 days]`,
  ],
  // Billing plan details
  [
    /Plan: .+, \$\d+\/month, renews .+, Change plan/,
    `Plan: ${data.settings.billing.plan.name}, ${data.settings.billing.plan.price}, ${data.settings.billing.plan.renews.toLowerCase()}, ${data.settings.billing.plan.action}`,
  ],
  // Payment method
  [
    /Payment: .+ ending in \d+, Update/,
    `Payment: ${data.settings.billing.payment.value}, ${data.settings.billing.payment.action}`,
  ],
];

let changes = 0;
for (const [pattern, replacement] of replacements) {
  const before = plan;
  plan = plan.replace(pattern, replacement);
  if (plan !== before) changes++;
}

writeFileSync(PLAN_PATH, plan);
console.log(`sync-plan: ${changes} replacement${changes !== 1 ? "s" : ""} applied`);

if (changes === 0) {
  console.log("plan.md already in sync with data.yaml");
} else {
  console.log("plan.md updated");
}

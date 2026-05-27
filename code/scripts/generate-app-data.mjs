#!/usr/bin/env node
/**
 * Generate app data files from data.yaml → types, data, constants.
 *
 * Outputs:
 *   app/src/types/index.ts   — TypeScript interfaces
 *   app/src/lib/data.ts      — runtime data (tasks, members, reports, settings, nav)
 *   app/src/lib/constants.ts — color maps, label maps
 *
 * Usage: node code/scripts/generate-app-data.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const require = createRequire(resolve(ROOT, "app/package.json"));
const yaml = require("js-yaml");

const data = yaml.load(readFileSync(resolve(ROOT, "data/data.yaml"), "utf8"));
const write = (rel, content) => {
  const path = resolve(ROOT, rel);
  writeFileSync(path, content);
  console.log(`  wrote ${rel}`);
};

// ── Helpers ──

function avatarClass(raw) {
  // "tag/blue/tag-blue-bg" → "tag-blue-bg"
  if (!raw) return "";
  const parts = raw.split("/");
  return parts[parts.length - 1];
}

const STATUS_LABEL = {
  todo: "To do",
  in_progress: "In progress",
  in_review: "In review",
  done: "Done",
};

// Map data.yaml color token paths to Badge color props
function badgeColor(tokenPath) {
  if (!tokenPath) return "grey";
  if (tokenPath.includes("neutral")) return "grey";
  if (tokenPath.includes("blue")) return "blue";
  if (tokenPath.includes("purple")) return "purple";
  if (tokenPath.includes("orange") || tokenPath.includes("warning")) return "orange";
  if (tokenPath.includes("red") || tokenPath.includes("error")) return "red";
  if (tokenPath.includes("green") || tokenPath.includes("success")) return "green";
  return "grey";
}

// Map data.yaml chart color token paths to CSS vars
function chartVar(tokenPath) {
  if (!tokenPath) return "var(--tag-neutral-icon)";
  const slug = avatarClass(tokenPath);
  return `var(--${slug})`;
}

// ═══════════════════════════════════════════
// 1. types/index.ts
// ═══════════════════════════════════════════

const priorities = [...new Set(data.tasks.map(t => t.priority))];
const statuses = [...new Set(data.tasks.map(t => t.status))];

const typesFile = `export type Priority = ${priorities.map(p => `"${p}"`).join(" | ")};
export type Status = ${statuses.map(s => `"${s}"`).join(" | ")};

export interface Task {
  id: number;
  title: string;
  desc: string;
  assignee: number;
  status: Status;
  priority: Priority;
  due: string;
}

export interface Member {
  id: number;
  name: string;
  initials: string;
  email: string;
  role: string;
  avatarBg: string;
  avatarText: string;
}

export interface Report {
  id: number;
  report: string;
  memberId: number;
  range: string;
  generated: string;
}

export interface SettingsToggle {
  label: string;
  desc: string;
  on: boolean;
}

export interface ActivityItem {
  taskId: number;
  memberId: number;
  time: string;
  text: string;
}
`;

// ═══════════════════════════════════════════
// 2. lib/data.ts
// ═══════════════════════════════════════════

const membersStr = data.members.map(m =>
  `  { id: ${m.id}, name: "${m.name}", initials: "${m.initials}", email: "${m.email}", role: "${m.role}", avatarBg: "${avatarClass(m.avatar_bg)}", avatarText: "${avatarClass(m.avatar_text)}" },`
).join("\n");

const tasksStr = data.tasks.map(t =>
  `  { id: ${t.id}, title: ${JSON.stringify(t.title)}, desc: ${JSON.stringify(t.desc)}, assignee: ${t.assignee}, status: "${t.status}", priority: "${t.priority}", due: offsetDate(${t.due}) },`
).join("\n");

const reportsStr = data.reports.map((r, i) =>
  `  { id: ${i + 1}, report: ${JSON.stringify(r.report)}, memberId: ${r.member_id}, range: "${r.range}", generated: "${r.generated}" },`
).join("\n");

const notifToggles = data.settings.notifications.toggles.map(t =>
  `  { label: "${t.label}", desc: ${JSON.stringify(t.desc)}, on: ${t.on} },`
).join("\n");

const secToggles = data.settings.security.toggles.map(t =>
  `  { label: "${t.label}", desc: ${JSON.stringify(t.desc)}, on: ${t.on} },`
).join("\n");

const billingHistory = data.settings.billing.history.map(h =>
  `    { date: "${h.date}", desc: "${h.desc}", amount: "${h.amount}" },`
).join("\n");

const dataFile = `import { offsetDate } from "./utils";
import type { Task, Member, Report, SettingsToggle } from "@/types";

export const MEMBERS: Member[] = [
${membersStr}
];

export const INITIAL_TASKS: Task[] = [
${tasksStr}
];

export const INITIAL_REPORTS: Report[] = [
${reportsStr}
];

export const CURRENT_USER = { name: "${data.user.name}", initials: "${data.user.initials}", email: "${data.user.email}", role: "${data.user.role}", avatar: "/avatar-ludvig.png" };

export const NOTIFICATION_TOGGLES: SettingsToggle[] = [
${notifToggles}
];

export const SECURITY_TOGGLES: SettingsToggle[] = [
${secToggles}
];

export const BILLING = {
  plan: { name: "${data.settings.billing.plan.name}", price: "${data.settings.billing.plan.price}", renews: "${data.settings.billing.plan.renews}", action: "${data.settings.billing.plan.action}" },
  payment: { label: "${data.settings.billing.payment.label}", value: "${data.settings.billing.payment.value}", action: "${data.settings.billing.payment.action}" },
  history: [
${billingHistory}
  ],
};
`;

// ═══════════════════════════════════════════
// 3. lib/constants.ts
// ═══════════════════════════════════════════

const priorityColorEntries = Object.entries(data.priority_colors)
  .map(([k, v]) => `  ${k}: "${badgeColor(v.tag_bg)}",`).join("\n");

const statusColorEntries = Object.entries(data.status_colors)
  .map(([k, v]) => `  ${k}: "${badgeColor(v.tag_bg)}",`).join("\n");

const statusLabelEntries = Object.entries(STATUS_LABEL)
  .map(([k, v]) => `  ${k}: "${v}",`).join("\n");

const barColorEntries = Object.entries(data.status_colors)
  .map(([k, v]) => `  ${k}: "${chartVar(v.dot)}",`).join("\n");

const priorityBarEntries = Object.entries(data.priority_colors)
  .map(([k, v]) => `  ${k}: "${chartVar(v.chart)}",`).join("\n");

const constantsFile = `import type { Priority, Status } from "@/types";

type BadgeColor = "grey" | "orange" | "red" | "purple" | "blue" | "green";

export const PRIORITY_COLOR: Record<Priority, BadgeColor> = {
${priorityColorEntries}
};

export const STATUS_COLOR: Record<Status, BadgeColor> = {
${statusColorEntries}
};

export const STATUS_LABEL: Record<Status, string> = {
${statusLabelEntries}
};

export const BAR_COLORS: Record<Status, string> = {
${barColorEntries}
};

export const PRIORITY_BAR_COLORS: Record<Priority, string> = {
${priorityBarEntries}
};
`;

// ═══════════════════════════════════════════
// 4. lib/utils.ts
// ═══════════════════════════════════════════

const utilsFile = `export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function offsetDate(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function formatDueDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function isOverdue(iso: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(iso + "T00:00:00");
  return d < today;
}
`;

// ═══════════════════════════════════════════
// Write all files
// ═══════════════════════════════════════════

console.log("generate-app-data:");
write("app/src/types/index.ts", typesFile);
write("app/src/lib/data.ts", dataFile);
write("app/src/lib/constants.ts", constantsFile);
write("app/src/lib/utils.ts", utilsFile);
console.log("done");

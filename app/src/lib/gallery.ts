// Auto-generated from views.yaml + data.yaml + constants.ts
// Complete gallery data for all blocks. Prop names from generate-interfaces.
import { BAR_COLORS, PRIORITY_BAR_COLORS, STATUS_LABEL, STATUS_COLOR, PRIORITY_COLOR } from "./constants";
import { INITIAL_TASKS, MEMBERS, NOTIFICATION_TOGGLES, SECURITY_TOGGLES, BILLING, CURRENT_USER, MODAL_CONFIGS, ACTIVITY } from "./data";
import { formatDueDate, isOverdue } from "./utils";
import { SquareGreySolid, SquareBlueSolid, SquareOrangeSolid, SquareGreenSolid } from "@medusajs/icons";
import type { Status, Priority } from "@/types";

const STATUSES: Status[] = ["todo", "in_progress", "in_review", "done"];
const STATUS_ICON = { todo: SquareGreySolid, in_progress: SquareBlueSolid, in_review: SquareOrangeSolid, done: SquareGreenSolid };
const PRIORITIES: Priority[] = ["critical", "high", "medium", "low"];

export const GALLERY = {
  statCards: {
    cards: [
      { label: "Total Tasks", value: "18" },
      { label: "In Progress", value: "5" },
      { label: "Completed", value: "3" },
      { label: "Overdue", value: "5" },
    ],
  },
  chartCards: {
    charts: [
      { title: "Tasks by Priority", total: 18, rows: PRIORITIES.map(p => ({ label: p.charAt(0).toUpperCase() + p.slice(1), count: ({"low":3,"medium":6,"high":5,"critical":4} as Record<string,number>)[p] ?? 0, color: PRIORITY_BAR_COLORS[p] })) },
      { title: "Tasks by Status", total: 18, rows: STATUSES.map(s => ({ label: STATUS_LABEL[s], count: ({"todo":6,"in_progress":5,"in_review":4,"done":3} as Record<string,number>)[s] ?? 0, color: BAR_COLORS[s] })) },
    ],
  },
  controls: {
    tabs: [{ key: "kanban", label: "Kanban" }, { key: "list", label: "List" }],
  },
  recentTasks: {
    title: "Recent Tasks",
    rows: [15,9,10,12,18].map(id => { const t = INITIAL_TASKS.find(t => t.id === id)!; const m = MEMBERS.find(m => m.id === t.assignee)!; return { id: t.id, title: t.title, assigneeName: m.name, assignee: { initials: m.initials, avatarBg: m.avatarBg, avatarText: m.avatarText }, status: t.status, statusLabel: STATUS_LABEL[t.status], statusColor: STATUS_COLOR[t.status], priority: t.priority, priorityLabel: t.priority.charAt(0).toUpperCase() + t.priority.slice(1), priorityColor: PRIORITY_COLOR[t.priority], due: formatDueDate(t.due), overdue: isOverdue(t.due) && t.status !== "done" }; }),
  },
  kanbanBoard: {
    columns: STATUSES.map(status => {
      const tasks = INITIAL_TASKS.filter(t => t.status === status);
      return {
        label: STATUS_LABEL[status],
        icon: STATUS_ICON[status],
        cards: tasks.map(t => {
          const m = MEMBERS.find(m => m.id === t.assignee)!;
          return { title: t.title, description: t.desc, assignee: { initials: m.initials, avatarBg: m.avatarBg, avatarText: m.avatarText }, assigneeName: m.name.split(" ")[0], due: formatDueDate(t.due), dueDateOverdue: isOverdue(t.due) && t.status !== "done", priority: t.priority.charAt(0).toUpperCase() + t.priority.slice(1), priorityColor: PRIORITY_COLOR[t.priority] };
        }),
      };
    }),
  },
  settingsProfile: {
    navItems: [{ label: "Profile", active: true }, { label: "Notifications" }, { label: "Security" }, { label: "Billing" }],
    title: "Profile",
    userName: CURRENT_USER.name,
    avatarFallback: CURRENT_USER.initials,
    avatarHint: "Click to change photo",
  },
  settingsNotifications: {
    navItems: [{ label: "Profile" }, { label: "Notifications", active: true }, { label: "Security" }, { label: "Billing" }],
    title: "Notifications",
    heading: "Notifications",
    toggles: NOTIFICATION_TOGGLES,
    saveLabel: "Save changes",
  },
  settingsSecurity: {
    navItems: [{ label: "Profile" }, { label: "Notifications" }, { label: "Security", active: true }, { label: "Billing" }],
    title: "Security",
    heading: "Security",
    toggles: SECURITY_TOGGLES,
    saveLabel: "Save changes",
  },
  settingsBilling: {
    navItems: [{ label: "Profile" }, { label: "Notifications" }, { label: "Security" }, { label: "Billing", active: true }],
    title: "Billing",
    plan: { name: BILLING.plan.name, price: BILLING.plan.price, renewalNote: BILLING.plan.renews, changeLabel: BILLING.plan.action },
    payment: { label: BILLING.payment.label, desc: BILLING.payment.value, updateLabel: BILLING.payment.action },
    historyTitle: "Billing history",
    historyColumns: [{ key: "date", header: "Date", className: "w-[140px]" }, { key: "desc", header: "Description" }, { key: "amount", header: "Amount", className: "w-[100px]" }],
    historyRows: BILLING.history.map((h, i) => ({ id: i+1, date: h.date, desc: h.desc, amount: h.amount })),
  },
  createTaskModal: MODAL_CONFIGS.create_task,
  taskDetailsModal: (() => {
    const task = INITIAL_TASKS[0];
    const assignee = MEMBERS.find(m => m.id === task.assignee)!;
    return {
      title: task.title,
      headerLabel: "Task details",
      description: task.desc,
      infoLabel: "Info",
      infoRows: [
        { label: "Status", value: STATUS_LABEL[task.status], type: "status" as const },
        { label: "Assignee", value: assignee.name, type: "assignee" as const, member: { initials: assignee.initials, avatarBg: assignee.avatarBg, avatarText: assignee.avatarText } },
        { label: "Due date", value: formatDueDate(task.due), type: "date" as const, overdue: isOverdue(task.due) },
      ],
      activityLabel: "Activity log",
      activity: ACTIVITY.filter(a => a.taskId === task.id).map(a => { const m = MEMBERS.find(m => m.id === a.memberId)!; return { member: { initials: m.initials, avatarBg: m.avatarBg, avatarText: m.avatarText }, name: m.name, time: a.time, text: a.text }; }),
      primaryAction: "Mark complete",
      secondaryAction: "Edit",
      escLabel: "Esc",
    };
  })(),
};

"use client";
import { RecentTasks } from "@/components/blocks/RecentTasks";
import { INITIAL_TASKS, MEMBERS } from "@/lib/data";
import { PRIORITY_COLOR, STATUS_LABEL, BAR_COLORS } from "@/lib/constants";
import { formatDate, isOverdue } from "@/lib/utils";
import type { BadgeColor } from "@/lib/constants";

const memberMap = new Map(MEMBERS.map((m) => [m.id, m]));
const recent = [...INITIAL_TASKS].sort((a, b) => b.due.localeCompare(a.due)).slice(0, 5);

const columns = ["Task", "Assignee", "Priority", "Due Date", "Status"];

const rows = recent.map((t) => {
  const m = memberMap.get(t.assignee)!;
  return {
    task: t,
    member: { initials: m.initials, avatarBg: m.avatarBg, avatarText: m.avatarText, name: m.name },
    priorityColor: PRIORITY_COLOR[t.priority] as BadgeColor,
    priorityLabel: t.priority.charAt(0).toUpperCase() + t.priority.slice(1),
    statusColor: BAR_COLORS[t.status],
    statusLabel: STATUS_LABEL[t.status],
    dueDateLabel: formatDate(t.due),
  };
});

export default function Page() {
  return <RecentTasks title="Recent Tasks" columns={columns} rows={rows} />;
}

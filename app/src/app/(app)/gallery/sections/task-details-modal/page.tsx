"use client";
import { TaskDetailsModal } from "@/components/blocks/TaskDetailsModal";
import type { InfoRow, ActivityEntry } from "@/components/blocks/TaskDetailsModal";
import { INITIAL_TASKS, MEMBERS, ACTIVITY } from "@/lib/data";
import { STATUS_LABEL } from "@/lib/constants";
import { formatDueDate, isOverdue } from "@/lib/utils";
import type { Status, Priority } from "@/types";

/* Badge color palettes — section maps semantic status to raw CSS values */
const BADGE_PALETTE: Record<string, { bg: string; border: string; text: string }> = {
  blue:   { bg: "rgba(59,130,246,0.12)",  border: "#bfdbfe", text: "#1e40af" },
  green:  { bg: "rgba(34,197,94,0.12)",   border: "#bbf7d0", text: "#166534" },
  orange: { bg: "rgba(249,115,22,0.12)",  border: "#fed7aa", text: "#9a3412" },
  red:    { bg: "rgba(239,68,68,0.12)",   border: "#fecaca", text: "#991b1b" },
  purple: { bg: "rgba(168,85,247,0.12)",  border: "#e9d5ff", text: "#6b21a8" },
  grey:   { bg: "rgba(107,114,128,0.12)", border: "#d1d5db", text: "#374151" },
};

const STATUS_BADGE: Record<Status, string> = {
  todo: "grey",
  in_progress: "blue",
  in_review: "orange",
  done: "green",
};

const PRIORITY_BADGE: Record<Priority, string> = {
  low: "grey",
  medium: "orange",
  high: "red",
  critical: "purple",
};

const task = INITIAL_TASKS[0]; // "Update onboarding flow"
const member = MEMBERS.find((m) => m.id === task.assignee)!;

const statusPal = BADGE_PALETTE[STATUS_BADGE[task.status]];
const priorityPal = BADGE_PALETTE[PRIORITY_BADGE[task.priority]];

const info: InfoRow[] = [
  {
    type: "badge",
    label: "Status",
    badgeLabel: STATUS_LABEL[task.status],
    badgeBg: statusPal.bg,
    badgeBorder: statusPal.border,
    badgeText: statusPal.text,
  },
  {
    type: "badge",
    label: "Priority",
    badgeLabel: task.priority.charAt(0).toUpperCase() + task.priority.slice(1),
    badgeBg: priorityPal.bg,
    badgeBorder: priorityPal.border,
    badgeText: priorityPal.text,
  },
  {
    type: "avatar",
    label: "Assignee",
    member: { initials: member.initials, avatarBg: member.avatarBg, avatarText: member.avatarText },
    name: member.name,
  },
  {
    type: "text",
    label: "Due date",
    value: formatDueDate(task.due),
    error: isOverdue(task.due),
  },
];

const activityEntries: ActivityEntry[] = ACTIVITY.filter(
  (a) => a.taskId === task.id
).map((a) => {
  const m = MEMBERS.find((m) => m.id === a.memberId)!;
  return {
    member: { initials: m.initials, avatarBg: m.avatarBg, avatarText: m.avatarText },
    name: m.name,
    time: a.time,
    text: a.text,
  };
});

export default function Page() {
  return (
    <div className="max-w-lg mx-auto py-10">
      <TaskDetailsModal
        heading="Task details"
        title={task.title}
        desc={task.desc}
        infoLabel="Info"
        info={info}
        activityLabel="Activity log"
        activity={activityEntries}
        primaryAction="Mark complete"
        secondaryAction="Edit"
      />
    </div>
  );
}

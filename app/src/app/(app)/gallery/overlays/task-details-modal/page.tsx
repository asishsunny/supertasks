"use client";

import TaskDetailsModal from "@/components/blocks/TaskDetailsModal";
import { INITIAL_TASKS, MEMBERS, ACTIVITY } from "@/lib/data";
import { STATUS_LABEL } from "@/lib/constants";
import { formatDueDate, isOverdue } from "@/lib/utils";

/* Pick task #4 (Fix billing bug) as demo — has activity entries */
const task = INITIAL_TASKS.find((t) => t.id === 4)!;
const assignee = MEMBERS.find((m) => m.id === task.assignee)!;

const STATUS_BADGE_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  todo: { bg: "var(--tag-neutral-bg)", border: "var(--tag-neutral-border)", text: "var(--tag-neutral-text)" },
  in_progress: { bg: "var(--tag-blue-bg)", border: "var(--tag-blue-border)", text: "var(--tag-blue-text)" },
  in_review: { bg: "var(--tag-orange-bg)", border: "var(--tag-orange-border)", text: "var(--tag-orange-text)" },
  done: { bg: "var(--tag-green-bg)", border: "var(--tag-green-border)", text: "var(--tag-green-text)" },
};

const infoRows = [
  {
    label: "Status",
    value: STATUS_LABEL[task.status],
    type: "status" as const,
    statusColor: STATUS_BADGE_COLORS[task.status],
  },
  {
    label: "Assignee",
    value: assignee.name,
    type: "assignee" as const,
    member: { initials: assignee.initials, avatarBg: assignee.avatarBg, avatarText: assignee.avatarText },
  },
  {
    label: "Due date",
    value: formatDueDate(task.due),
    type: "date" as const,
    overdue: isOverdue(task.due) && task.status !== "done",
  },
];

const taskActivity = ACTIVITY.filter((a) => a.taskId === task.id).map((a) => {
  const member = MEMBERS.find((m) => m.id === a.memberId)!;
  return {
    member: { initials: member.initials, avatarBg: member.avatarBg, avatarText: member.avatarText },
    name: member.name,
    time: a.time,
    text: a.text,
  };
});

export default function TaskDetailsModalGallery() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-ui-fg-base txt-compact-medium-plus">Default</h2>
        <div className="max-w-[520px]">
          <TaskDetailsModal
            title={task.title}
            headerLabel="Task details"
            description={task.desc}
            infoLabel="Details"
            activityLabel="Activity"
            infoRows={infoRows}
            activity={taskActivity}
            primaryAction="Mark complete"
            secondaryAction="Edit task"
            escLabel="Esc"
          />
        </div>
      </div>
    </div>
  );
}

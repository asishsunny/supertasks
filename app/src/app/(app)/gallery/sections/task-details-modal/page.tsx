"use client";
import { Badge } from "@medusajs/ui";
import { TaskDetailsModal } from "@/components/blocks/TaskDetailsModal";
import type { InfoRow, ActivityEntry } from "@/components/blocks/TaskDetailsModal";
import { INITIAL_TASKS, MEMBERS, ACTIVITY } from "@/lib/data";
import { STATUS_COLOR, STATUS_LABEL, PRIORITY_COLOR } from "@/lib/constants";
import { ColorAvatar } from "@/components/ColorAvatar";
import { formatDueDate, isOverdue } from "@/lib/utils";

const task = INITIAL_TASKS[0]; // "Update onboarding flow"
const member = MEMBERS.find((m) => m.id === task.assignee)!;

const info: InfoRow[] = [
  {
    label: "Status",
    value: (
      <Badge color={STATUS_COLOR[task.status]} size="2xsmall" rounded="full">
        {STATUS_LABEL[task.status]}
      </Badge>
    ),
  },
  {
    label: "Priority",
    value: (
      <Badge color={PRIORITY_COLOR[task.priority]} size="2xsmall" rounded="full">
        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
      </Badge>
    ),
  },
  {
    label: "Assignee",
    value: (
      <div className="flex gap-2 items-center">
        <ColorAvatar member={member} size="xsmall" />
        <p className="text-ui-fg-base txt-compact-small">{member.name}</p>
      </div>
    ),
  },
  {
    label: "Due date",
    value: (
      <p className={`txt-compact-small ${isOverdue(task.due) ? "text-ui-fg-error" : "text-ui-fg-base"}`}>
        {formatDueDate(task.due)}
      </p>
    ),
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

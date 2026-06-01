"use client";

import type { Task, Member } from "@/types";
import { TaskDetailsModal, type TaskInfoRow, type TaskActivity } from "@/components/blocks/TaskDetailsModal";
import { PRIORITY_COLOR, STATUS_LABEL, STATUS_COLOR } from "@/lib/constants";
import { formatDueDate, isOverdue } from "@/lib/utils";

const TAG_BG: Record<string, string> = {
  grey: "var(--tag-neutral-bg)",
  blue: "var(--tag-blue-bg)",
  orange: "var(--tag-orange-bg)",
  green: "var(--tag-green-bg)",
  red: "var(--tag-red-bg)",
  purple: "var(--tag-purple-bg)",
};

const TAG_BORDER: Record<string, string> = {
  grey: "var(--tag-neutral-border)",
  blue: "var(--tag-blue-border)",
  orange: "var(--tag-orange-border)",
  green: "var(--tag-green-border)",
  red: "var(--tag-red-border)",
  purple: "var(--tag-purple-border)",
};

const TAG_TEXT: Record<string, string> = {
  grey: "var(--tag-neutral-text)",
  blue: "var(--tag-blue-text)",
  orange: "var(--tag-orange-text)",
  green: "var(--tag-green-text)",
  red: "var(--tag-red-text)",
  purple: "var(--tag-purple-text)",
};

interface TaskDetailDrawerProps {
  task: Task;
  member: Member;
  activity: { taskId: number; memberId: number; time: string; text: string; member: Member }[];
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export function TaskDetailDrawer({ task, member, activity, open, onClose, onComplete }: TaskDetailDrawerProps) {
  if (!open) return null;

  const statusColor = STATUS_COLOR[task.status];
  const priorityColor = PRIORITY_COLOR[task.priority];

  const infoRows: TaskInfoRow[] = [
    {
      type: "status",
      label: "Status",
      value: STATUS_LABEL[task.status],
      statusColor: {
        bg: TAG_BG[statusColor] ?? TAG_BG.grey,
        border: TAG_BORDER[statusColor] ?? TAG_BORDER.grey,
        text: TAG_TEXT[statusColor] ?? TAG_TEXT.grey,
      },
    },
    {
      type: "status",
      label: "Priority",
      value: task.priority.charAt(0).toUpperCase() + task.priority.slice(1),
      statusColor: {
        bg: TAG_BG[priorityColor] ?? TAG_BG.grey,
        border: TAG_BORDER[priorityColor] ?? TAG_BORDER.grey,
        text: TAG_TEXT[priorityColor] ?? TAG_TEXT.grey,
      },
    },
    {
      type: "assignee",
      label: "Assignee",
      value: member.name,
      member,
    },
    {
      type: "text",
      label: "Due Date",
      value: formatDueDate(task.due),
      isError: isOverdue(task.due),
    },
  ];

  const activities: TaskActivity[] = activity.map((a) => ({
    member: a.member,
    name: a.member.name,
    time: a.time,
    text: a.text,
  }));

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Scrim */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden />
      {/* Drawer panel */}
      <div className="relative w-full max-w-[440px] h-full bg-ui-bg-base">
        <TaskDetailsModal
          headerTitle="Task details"
          title={task.title}
          description={task.desc}
          infoHeading="Details"
          infoRows={infoRows}
          activityHeading="Activity"
          activities={activities}
          primaryAction="Mark complete"
          secondaryAction="Delete task"
          onClose={onClose}
          onPrimary={onComplete}
          onSecondary={onClose}
        />
      </div>
    </div>
  );
}

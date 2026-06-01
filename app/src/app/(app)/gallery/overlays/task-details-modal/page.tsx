"use client";

import TaskDetailsModal from "@/components/blocks/TaskDetailsModal";
import { INITIAL_TASKS, MEMBERS, ACTIVITY } from "@/lib/data";
import { STATUS_LABEL } from "@/lib/constants";
import { formatDueDate, isOverdue } from "@/lib/utils";
import type { Status } from "@/types";

const task = INITIAL_TASKS[0];
const assignee = MEMBERS.find(m => m.id === task.assignee)!;
const STATUS_BADGE_COLORS: Record<Status, { bg: string; border: string; text: string }> = {
  todo: { bg: 'var(--tag-neutral-bg)', border: 'var(--tag-neutral-border)', text: 'var(--tag-neutral-text)' },
  in_progress: { bg: 'var(--tag-blue-bg)', border: 'var(--tag-blue-border)', text: 'var(--tag-blue-text)' },
  in_review: { bg: 'var(--tag-orange-bg)', border: 'var(--tag-orange-border)', text: 'var(--tag-orange-text)' },
  done: { bg: 'var(--tag-green-bg)', border: 'var(--tag-green-border)', text: 'var(--tag-green-text)' },
};
const infoRows = [
  { label: 'Status', value: STATUS_LABEL[task.status], type: 'status' as const, statusColor: STATUS_BADGE_COLORS[task.status] },
  { label: 'Assignee', value: assignee.name, type: 'assignee' as const, member: { initials: assignee.initials, avatarBg: assignee.avatarBg, avatarText: assignee.avatarText } },
  { label: 'Due date', value: formatDueDate(task.due), type: 'date' as const, overdue: isOverdue(task.due) && task.status !== 'done' },
];
const activity = ACTIVITY.filter(a => a.taskId === task.id).map(a => { const m = MEMBERS.find(mem => mem.id === a.memberId)!; return { member: { initials: m.initials, avatarBg: m.avatarBg, avatarText: m.avatarText }, name: m.name, time: a.time, text: a.text }; });

export default function Page() {
  return (
    <div className="p-6">
      <div className="max-w-[520px]">
        <TaskDetailsModal title={task.title} headerLabel="Task details" description={task.desc} infoLabel="Info" activityLabel="Activity log" infoRows={infoRows} activity={activity} primaryAction="Mark complete" secondaryAction="Edit" escLabel="Esc" />
      </div>
    </div>
  );
}

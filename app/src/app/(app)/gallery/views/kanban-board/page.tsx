"use client";

import { KanbanBoard } from "@/components/blocks/KanbanBoard";
import { KanbanCard } from "@/components/blocks/KanbanCard";
import { StatusDot } from '@/components/shared/StatusDot';
import { INITIAL_TASKS, MEMBERS } from "@/lib/data";
import { STATUS_LABEL, PRIORITY_COLOR } from "@/lib/constants";
import { formatDueDate, isOverdue } from "@/lib/utils";
import type { Status } from "@/types";

const STATUSES: Status[] = ['todo', 'in_progress', 'in_review', 'done'];
const columns = STATUSES.map(s => {
  const tasks = INITIAL_TASKS.filter(t => t.status === s);
  return {
    status: s, label: STATUS_LABEL[s], count: tasks.length, statusIcon: <StatusDot status={s} />,
    cards: tasks.map(t => { const m = MEMBERS.find(mem => mem.id === t.assignee)!; return <KanbanCard key={t.id} title={t.title} desc={t.desc} member={{ initials: m.initials, avatarBg: m.avatarBg, avatarText: m.avatarText }} firstName={m.name.split(' ')[0]} dueDate={formatDueDate(t.due)} overdue={isOverdue(t.due) && t.status !== 'done'} priorityLabel={t.priority.charAt(0).toUpperCase() + t.priority.slice(1)} priorityColor={PRIORITY_COLOR[t.priority]} />; }),
  };
});

export default function Page() {
  return (
    <div className="p-6">
      <div className="h-[600px]">
        <KanbanBoard columns={columns} />
      </div>
    </div>
  );
}

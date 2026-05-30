"use client";

import { Badge } from "@medusajs/ui";
import { KanbanView, type KanbanColumn } from "@/components/views/KanbanView";
import { ColorAvatar } from "@/components/ColorAvatar";
import { StatusDot } from "@/components/shared/StatusDot";
import { INITIAL_TASKS, MEMBERS } from "@/lib/data";
import { PRIORITY_COLOR, STATUS_LABEL } from "@/lib/constants";
import { formatDueDate, isOverdue } from "@/lib/utils";
import type { Task, Status } from "@/types";

const memberMap = new Map(MEMBERS.map((m) => [m.id, m]));
const STATUSES: Status[] = ["todo", "in_progress", "in_review", "done"];

function KanbanCard({ task }: { task: Task }) {
  const member = memberMap.get(task.assignee)!;
  const overdue = isOverdue(task.due);
  const priorityLabel = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);
  return (
    <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 rounded-lg">
      <p className="txt-compact-small-plus text-ui-fg-base">{task.title}</p>
      <p className="txt-compact-small text-ui-fg-muted truncate">{task.desc}</p>
      <div className="flex gap-1.5 items-center">
        <ColorAvatar member={member} size="xsmall" />
        <span className="text-xs text-ui-fg-subtle">{member.name.split(" ")[0]}</span>
        <div className="flex-1" />
        <span className={`text-xs ${overdue ? "text-ui-fg-error" : "text-ui-fg-subtle"}`}>{formatDueDate(task.due)}</span>
        <Badge color={PRIORITY_COLOR[task.priority]} size="2xsmall" rounded="full">{priorityLabel}</Badge>
      </div>
    </div>
  );
}

export default function KanbanGallery() {
  const columns: KanbanColumn<Task>[] = STATUSES.map((s) => ({
    key: s,
    label: STATUS_LABEL[s],
    color: s,
    dotIcon: <StatusDot status={s} />,
    items: INITIAL_TASKS.filter((t) => t.status === s),
  }));

  return <KanbanView columns={columns} renderCard={(t) => <KanbanCard task={t} />} keyFn={(t) => t.id} />;
}

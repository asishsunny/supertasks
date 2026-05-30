"use client";

import { useState } from "react";
import { Badge } from "@medusajs/ui";
import { ControlsBar } from "@/components/controls/ControlsBar";
import { TableView, type Column } from "@/components/views/TableView";
import { KanbanView, type KanbanColumn } from "@/components/views/KanbanView";
import { Pagination } from "@/components/controls/Pagination";
import { AvatarCell, BadgeCell, StatusDotCell, DateCell } from "@/components/cells";
import { ColorAvatar } from "@/components/ColorAvatar";
import { StatusDot } from "@/components/shared/StatusDot";
import { INITIAL_TASKS, MEMBERS } from "@/lib/data";
import { PRIORITY_COLOR, STATUS_LABEL } from "@/lib/constants";
import { formatDate, formatDueDate, isOverdue } from "@/lib/utils";
import { EllipsisHorizontal } from "@medusajs/icons";
import { IconButton } from "@medusajs/ui";
import type { Task, Status } from "@/types";

const memberMap = new Map(MEMBERS.map((m) => [m.id, m]));
const VIEWS = [{ key: "kanban", label: "Kanban" }, { key: "list", label: "List" }];
const STATUSES: Status[] = ["todo", "in_progress", "in_review", "done"];

const columns: Column<Task>[] = [
  { header: "Task", render: (t) => <span className="txt-compact-small">{t.title}</span> },
  { header: "Assignee", width: "w-[160px]", render: (t) => { const m = memberMap.get(t.assignee); return m ? <AvatarCell member={m} /> : null; } },
  { header: "Priority", width: "w-[120px]", render: (t) => <BadgeCell label={t.priority.charAt(0).toUpperCase() + t.priority.slice(1)} color={PRIORITY_COLOR[t.priority]} /> },
  { header: "Due Date", width: "w-[130px]", render: (t) => <DateCell date={formatDate(t.due)} overdue={isOverdue(t.due)} /> },
  { header: "Status", width: "w-[140px]", render: (t) => <StatusDotCell status={t.status} /> },
  { header: "", width: "w-7", render: () => <IconButton size="small" variant="transparent"><EllipsisHorizontal /></IconButton> },
];

// kanban card markup from artifacts/transformed/kanban-board.tsx
function KanbanCard({ task }: { task: Task }) {
  const member = memberMap.get(task.assignee)!;
  const overdue = isOverdue(task.due);
  const priorityLabel = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);
  return (
    <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full">
      <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">{task.title}</p>
      <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis font-normal text-[13px] leading-[20px]">{task.desc}</p>
      <div className="flex gap-1.5 items-center relative shrink-0 w-full">
        <ColorAvatar member={member} size="xsmall" />
        <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal]">{member.name.split(" ")[0]}</p>
        <div className="flex-1" />
        <p className={`font-normal relative shrink-0 text-[12px] leading-[normal] ${overdue ? "text-ui-fg-error" : "text-ui-fg-subtle"}`}>{formatDueDate(task.due)}</p>
        <Badge color={PRIORITY_COLOR[task.priority]} size="2xsmall" rounded="full">{priorityLabel}</Badge>
      </div>
    </div>
  );
}

export default function TasksSectionGallery() {
  const [view, setView] = useState("kanban");
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const kanbanColumns: KanbanColumn<Task>[] = STATUSES.map((s) => ({
    key: s,
    label: STATUS_LABEL[s],
    color: s,
    dotIcon: <StatusDot status={s} />,
    items: tasks.filter((t) => t.status === s),
  }));

  function handleMove(itemKey: string | number, _from: string, to: string) {
    setTasks((prev) => prev.map((t) => t.id === Number(itemKey) ? { ...t, status: to as Status } : t));
  }

  return (
    <>
      <ControlsBar views={VIEWS} activeView={view} onViewChange={setView} />
      {view === "list" ? (
        <>
          <div className="bg-ui-bg-base rounded-xl shadow-elevation-card-rest overflow-clip">
            <TableView data={tasks.slice(0, 10)} columns={columns} keyFn={(t) => t.id} />
          </div>
          <Pagination page={1} pageSize={10} total={tasks.length} />
        </>
      ) : (
        <KanbanView
          columns={kanbanColumns}
          renderCard={(t) => <KanbanCard task={t} />}
          keyFn={(t) => t.id}
          onMove={handleMove}
        />
      )}
    </>
  );
}

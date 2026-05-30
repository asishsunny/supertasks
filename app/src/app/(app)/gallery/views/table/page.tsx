"use client";

import { TableView, type Column } from "@/components/views/TableView";
import { AvatarCell, BadgeCell, StatusDotCell, DateCell } from "@/components/cells";
import { INITIAL_TASKS, MEMBERS } from "@/lib/data";
import { PRIORITY_COLOR } from "@/lib/constants";
import { formatDate, isOverdue } from "@/lib/utils";
import type { Task } from "@/types";
import { EllipsisHorizontal } from "@medusajs/icons";
import { IconButton } from "@medusajs/ui";

const memberMap = new Map(MEMBERS.map((m) => [m.id, m]));

const columns: Column<Task>[] = [
  { header: "Task", render: (t) => <span className="txt-compact-small">{t.title}</span> },
  { header: "Assignee", width: "w-[160px]", render: (t) => { const m = memberMap.get(t.assignee); return m ? <AvatarCell member={m} /> : null; } },
  { header: "Priority", width: "w-[120px]", render: (t) => <BadgeCell label={t.priority.charAt(0).toUpperCase() + t.priority.slice(1)} color={PRIORITY_COLOR[t.priority]} /> },
  { header: "Due Date", width: "w-[130px]", render: (t) => <DateCell date={formatDate(t.due)} overdue={isOverdue(t.due)} /> },
  { header: "Status", width: "w-[140px]", render: (t) => <StatusDotCell status={t.status} /> },
  { header: "", width: "w-7", render: () => <IconButton size="small" variant="transparent"><EllipsisHorizontal /></IconButton> },
];

export default function TableGallery() {
  return (
    <div className="bg-ui-bg-base rounded-xl shadow-elevation-card-rest overflow-clip">
      <div className="px-6 pt-6 pb-4">
        <p className="txt-compact-medium-plus text-ui-fg-base">Recent Tasks</p>
      </div>
      <TableView data={INITIAL_TASKS.slice(0, 5)} columns={columns} keyFn={(t) => t.id} />
    </div>
  );
}

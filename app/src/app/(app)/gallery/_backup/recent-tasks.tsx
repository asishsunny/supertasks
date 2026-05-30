"use client";

import { TableView, type Column } from "@/components/views/TableView";
import { AvatarCell, BadgeCell, StatusDotCell, DateCell } from "@/components/cells";
import { INITIAL_TASKS, MEMBERS } from "@/lib/data";
import { PRIORITY_COLOR } from "@/lib/constants";
import { formatDate, isOverdue } from "@/lib/utils";
import { EllipsisHorizontal } from "@medusajs/icons";
import { IconButton } from "@medusajs/ui";
import type { Task } from "@/types";

const memberMap = new Map(MEMBERS.map((m) => [m.id, m]));
const recent = [...INITIAL_TASKS].sort((a, b) => b.due.localeCompare(a.due)).slice(0, 5);

const columns: Column<Task>[] = [
  { header: "Task", render: (t) => <span className="txt-compact-small">{t.title}</span> },
  { header: "Assignee", width: "w-[160px]", render: (t) => { const m = memberMap.get(t.assignee); return m ? <AvatarCell member={m} /> : null; } },
  { header: "Priority", width: "w-[120px]", render: (t) => <BadgeCell label={t.priority.charAt(0).toUpperCase() + t.priority.slice(1)} color={PRIORITY_COLOR[t.priority]} /> },
  { header: "Due Date", width: "w-[130px]", render: (t) => <DateCell date={formatDate(t.due)} overdue={isOverdue(t.due)} /> },
  { header: "Status", width: "w-[140px]", render: (t) => <StatusDotCell status={t.status} /> },
  { header: "", width: "w-7", render: () => <IconButton size="small" variant="transparent"><EllipsisHorizontal /></IconButton> },
];

// markup wrapper from artifacts/transformed/recent-tasks.tsx
export default function RecentTasksGallery() {
  return (
    <div className="bg-ui-bg-base flex flex-col gap-0 overflow-clip p-0 relative rounded-xl shadow-elevation-card-rest w-full">
      <div className="flex items-start overflow-clip pb-4 pt-6 px-6 relative shrink-0 w-full">
        <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">Recent Tasks</p>
      </div>
      <TableView data={recent} columns={columns} keyFn={(t) => t.id} />
    </div>
  );
}

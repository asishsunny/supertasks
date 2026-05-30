"use client";

import { useMemo } from "react";
import { useStore } from "@/app/(app)/store";
import { useMemberLookup } from "@/lib/hooks";
import { TableView, type Column } from "@/components/views/TableView";
import { AvatarCell, BadgeCell, StatusDotCell, DateCell } from "@/components/cells";
import { PRIORITY_COLOR } from "@/lib/constants";
import { formatDate, isOverdue } from "@/lib/utils";
import { ViewBoundary } from "@/components/shared/ViewBoundary";
import { EllipsisHorizontal } from "@medusajs/icons";
import { IconButton } from "@medusajs/ui";
import type { Task } from "@/types";

export function RecentTasks() {
  const { state } = useStore();
  const memberMap = useMemberLookup();

  const recent = useMemo(() =>
    [...state.tasks].sort((a, b) => b.due.localeCompare(a.due)).slice(0, 5),
    [state.tasks]
  );

  const columns: Column<Task>[] = useMemo(() => [
    { header: "Task", render: (t) => <span className="txt-compact-small">{t.title}</span> },
    { header: "Assignee", width: "w-[160px]", render: (t) => { const m = memberMap.get(t.assignee); return m ? <AvatarCell member={m} /> : null; } },
    { header: "Priority", width: "w-[120px]", render: (t) => <BadgeCell label={t.priority.charAt(0).toUpperCase() + t.priority.slice(1)} color={PRIORITY_COLOR[t.priority]} /> },
    { header: "Due Date", width: "w-[130px]", render: (t) => <DateCell date={formatDate(t.due)} overdue={isOverdue(t.due)} /> },
    { header: "Status", width: "w-[140px]", render: (t) => <StatusDotCell status={t.status} /> },
    { header: "", width: "w-7", render: () => <IconButton size="small" variant="transparent"><EllipsisHorizontal /></IconButton> },
  ], [memberMap]);

  return (
    <ViewBoundary>
      <div className="bg-ui-bg-base rounded-xl shadow-elevation-card-rest overflow-clip">
        <div className="px-6 pt-6 pb-4">
          <p className="txt-compact-medium-plus text-ui-fg-base">Recent Tasks</p>
        </div>
        <TableView data={recent} columns={columns} keyFn={(t) => t.id} />
      </div>
    </ViewBoundary>
  );
}

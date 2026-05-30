import { AvatarCell, BadgeCell, StatusDotCell, DateCell } from "@/components/cells";
import { PRIORITY_COLOR } from "@/lib/constants";
import { formatDate, isOverdue } from "@/lib/utils";
import { EllipsisHorizontal } from "@medusajs/icons";
import { IconButton } from "@medusajs/ui";
import type { Column } from "@/components/views/TableView";
import type { Task, Member } from "@/types";

export function getTaskColumns(
  memberMap: Map<number, Member>,
  onRowClick: (task: Task) => void
): Column<Task>[] {
  return [
    { header: "Task", render: (t) => <span className="txt-compact-small">{t.title}</span> },
    { header: "Assignee", width: "w-[160px]", render: (t) => { const m = memberMap.get(t.assignee); return m ? <AvatarCell member={m} /> : null; } },
    { header: "Priority", width: "w-[120px]", render: (t) => <BadgeCell label={t.priority.charAt(0).toUpperCase() + t.priority.slice(1)} color={PRIORITY_COLOR[t.priority]} /> },
    { header: "Due Date", width: "w-[130px]", render: (t) => <DateCell date={formatDate(t.due)} overdue={isOverdue(t.due)} /> },
    { header: "Status", width: "w-[140px]", render: (t) => <StatusDotCell status={t.status} /> },
    { header: "", width: "w-7", render: (t) => (
      <IconButton size="small" variant="transparent" onClick={() => onRowClick(t)}>
        <EllipsisHorizontal />
      </IconButton>
    ) },
  ];
}

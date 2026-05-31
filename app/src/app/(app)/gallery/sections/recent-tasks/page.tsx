"use client";
import { RecentTasks } from "@/components/blocks/RecentTasks";
import { AvatarCell, BadgeCell, StatusDotCell, DateCell } from "@/components/cells";
import { INITIAL_TASKS, MEMBERS } from "@/lib/data";
import { PRIORITY_COLOR } from "@/lib/constants";
import { formatDate, isOverdue } from "@/lib/utils";
import { EllipsisHorizontal } from "@medusajs/icons";
import { IconButton } from "@medusajs/ui";
import type { Task } from "@/types";

const memberMap = new Map(MEMBERS.map((m) => [m.id, m]));
const recent = [...INITIAL_TASKS].sort((a, b) => b.due.localeCompare(a.due)).slice(0, 5);

const columns = [
  { header: "Task", width: "min-w-[200px]", render: (t: Task) => <span className="txt-compact-small">{t.title}</span> },
  { header: "Assignee", width: "w-[160px]", render: (t: Task) => { const m = memberMap.get(t.assignee); return m ? <AvatarCell member={m} /> : null; } },
  { header: "Priority", width: "w-[120px]", render: (t: Task) => <BadgeCell label={t.priority.charAt(0).toUpperCase() + t.priority.slice(1)} color={PRIORITY_COLOR[t.priority]} /> },
  { header: "Due Date", width: "w-[130px]", render: (t: Task) => <DateCell date={formatDate(t.due)} overdue={isOverdue(t.due)} /> },
  { header: "Status", width: "w-[140px]", render: (t: Task) => <StatusDotCell status={t.status} /> },
  { header: "", width: "w-7", render: () => <IconButton size="small" variant="transparent"><EllipsisHorizontal /></IconButton> },
];

export default function Page() { return <RecentTasks columns={columns} data={recent} keyFn={(t: Task) => t.id} />; }

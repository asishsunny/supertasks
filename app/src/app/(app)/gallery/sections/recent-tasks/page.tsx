"use client";
import { RecentTasks } from "@/components/blocks/RecentTasks";
import { AvatarCell, BadgeCell, StatusDotCell, DateCell } from "@/components/cells";
import { INITIAL_TASKS, MEMBERS, INITIAL_REPORTS } from "@/lib/data";
import { PRIORITY_COLOR } from "@/lib/constants";
import { formatDate, isOverdue } from "@/lib/utils";
import { EllipsisHorizontal } from "@medusajs/icons";
import { IconButton } from "@medusajs/ui";
import type { Task, Member, Report } from "@/types";

const memberMap = new Map(MEMBERS.map((m) => [m.id, m]));

// Dashboard: 5 recent tasks
const dashboardData = [...INITIAL_TASKS].sort((a, b) => b.due.localeCompare(a.due)).slice(0, 5);
const dashboardColumns = [
  { header: "Task", width: "min-w-[200px]", render: (t: Task) => <span className="txt-compact-small">{t.title}</span> },
  { header: "Assignee", width: "w-[160px]", render: (t: Task) => { const m = memberMap.get(t.assignee); return m ? <AvatarCell member={m} /> : null; } },
  { header: "Priority", width: "w-[120px]", render: (t: Task) => <BadgeCell label={t.priority.charAt(0).toUpperCase() + t.priority.slice(1)} color={PRIORITY_COLOR[t.priority]} /> },
  { header: "Due Date", width: "w-[130px]", render: (t: Task) => <DateCell date={formatDate(t.due)} overdue={isOverdue(t.due)} /> },
  { header: "Status", width: "w-[140px]", render: (t: Task) => <StatusDotCell status={t.status} /> },
  { header: "", width: "w-7", render: () => <IconButton size="small" variant="transparent"><EllipsisHorizontal /></IconButton> },
];

// Team: member rows
const teamData = MEMBERS;
const teamColumns = [
  { header: "Member", render: (m: Member) => <AvatarCell member={m} /> },
  { header: "Email", width: "w-[220px]", render: (m: Member) => <span className="txt-compact-small text-ui-fg-subtle">{m.email}</span> },
  { header: "Role", width: "w-[160px]", render: (m: Member) => <span className="txt-compact-small text-ui-fg-subtle">{m.role}</span> },
  { header: "Active", width: "w-[100px]", render: (m: Member) => <span className="txt-compact-small">{INITIAL_TASKS.filter(t => t.assignee === m.id && t.status !== "done").length}</span> },
  { header: "Overdue", width: "w-[100px]", render: (m: Member) => { const n = INITIAL_TASKS.filter(t => t.assignee === m.id && isOverdue(t.due) && t.status !== "done").length; return <span className={`txt-compact-small ${n > 0 ? "text-ui-fg-error" : ""}`}>{n}</span>; } },
  { header: "", width: "w-7", render: () => <IconButton size="small" variant="transparent"><EllipsisHorizontal /></IconButton> },
];

// Reports: report rows
const reportsData = INITIAL_REPORTS;
const reportsColumns = [
  { header: "Report", render: (r: Report) => <span className="txt-compact-small">{r.report}</span> },
  { header: "Member", width: "w-[200px]", render: (r: Report) => { const m = memberMap.get(r.memberId); return m ? <AvatarCell member={m} /> : null; } },
  { header: "Date range", width: "w-[160px]", render: (r: Report) => <span className="txt-compact-small text-ui-fg-subtle">{r.range}</span> },
  { header: "Generated", width: "w-[140px]", render: (r: Report) => <span className="txt-compact-small text-ui-fg-subtle">{r.generated}</span> },
  { header: "", width: "w-7", render: () => <IconButton size="small" variant="transparent"><EllipsisHorizontal /></IconButton> },
];

export default function Page() {
  return (
    <div className="flex flex-col gap-8">
      <div><p className="text-ui-fg-subtle txt-compact-small mb-2">Dashboard (5 rows)</p><RecentTasks title="Recent Tasks" columns={dashboardColumns} data={dashboardData} keyFn={(t: Task) => t.id} /></div>
      <div><p className="text-ui-fg-subtle txt-compact-small mb-2">Team</p><RecentTasks title="Team" columns={teamColumns} data={teamData} keyFn={(m: Member) => m.id} /></div>
      <div><p className="text-ui-fg-subtle txt-compact-small mb-2">Reports</p><RecentTasks title="Reports" columns={reportsColumns} data={reportsData} keyFn={(r: Report) => r.id} /></div>
    </div>
  );
}

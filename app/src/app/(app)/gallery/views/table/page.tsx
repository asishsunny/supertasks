"use client";

import { TableView, type Column } from "@/components/views/TableView";
import { AvatarCell, BadgeCell, StatusDotCell, DateCell } from "@/components/cells";
import { INITIAL_TASKS, MEMBERS, INITIAL_REPORTS } from "@/lib/data";
import { PRIORITY_COLOR } from "@/lib/constants";
import { formatDate, isOverdue } from "@/lib/utils";
import type { Task, Member, Report } from "@/types";
import { EllipsisHorizontal } from "@medusajs/icons";
import { IconButton } from "@medusajs/ui";

const memberMap = new Map(MEMBERS.map((m) => [m.id, m]));

// Dashboard: 5 recent tasks
const dashboardCols: Column<Task>[] = [
  { header: "Task", width: "min-w-[200px]", render: (t) => <span className="txt-compact-small">{t.title}</span> },
  { header: "Assignee", width: "w-[160px]", render: (t) => { const m = memberMap.get(t.assignee); return m ? <AvatarCell member={m} /> : null; } },
  { header: "Priority", width: "w-[120px]", render: (t) => <BadgeCell label={t.priority.charAt(0).toUpperCase() + t.priority.slice(1)} color={PRIORITY_COLOR[t.priority]} /> },
  { header: "Due Date", width: "w-[130px]", render: (t) => <DateCell date={formatDate(t.due)} overdue={isOverdue(t.due)} /> },
  { header: "Status", width: "w-[140px]", render: (t) => <StatusDotCell status={t.status} /> },
  { header: "", width: "w-7", render: () => <IconButton size="small" variant="transparent"><EllipsisHorizontal /></IconButton> },
];

// Tasks: 10 of 18, paginated
const tasksCols = dashboardCols;

// Team: member columns
const teamCols: Column<Member>[] = [
  { header: "Member", render: (m) => <AvatarCell member={m} /> },
  { header: "Email", width: "w-[220px]", render: (m) => <span className="txt-compact-small text-ui-fg-subtle">{m.email}</span> },
  { header: "Role", width: "w-[160px]", render: (m) => <span className="txt-compact-small text-ui-fg-subtle">{m.role}</span> },
  { header: "Active", width: "w-[100px]", render: (m) => <span className="txt-compact-small">{INITIAL_TASKS.filter(t => t.assignee === m.id && t.status !== "done").length}</span> },
  { header: "Overdue", width: "w-[100px]", render: (m) => { const n = INITIAL_TASKS.filter(t => t.assignee === m.id && isOverdue(t.due) && t.status !== "done").length; return <span className={`txt-compact-small ${n > 0 ? "text-ui-fg-error" : ""}`}>{n}</span>; } },
  { header: "", width: "w-7", render: () => <IconButton size="small" variant="transparent"><EllipsisHorizontal /></IconButton> },
];

// Reports: report columns
const reportsCols: Column<Report>[] = [
  { header: "Report", render: (r) => <span className="txt-compact-small">{r.report}</span> },
  { header: "Member", width: "w-[200px]", render: (r) => { const m = memberMap.get(r.memberId); return m ? <AvatarCell member={m} /> : null; } },
  { header: "Date range", width: "w-[160px]", render: (r) => <span className="txt-compact-small text-ui-fg-subtle">{r.range}</span> },
  { header: "Generated", width: "w-[140px]", render: (r) => <span className="txt-compact-small text-ui-fg-subtle">{r.generated}</span> },
  { header: "", width: "w-7", render: () => <IconButton size="small" variant="transparent"><EllipsisHorizontal /></IconButton> },
];

const recent = [...INITIAL_TASKS].sort((a, b) => b.due.localeCompare(a.due)).slice(0, 5);

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-ui-fg-subtle txt-compact-small mb-2">{label}</p>
      <div className="bg-ui-bg-base rounded-xl shadow-elevation-card-rest overflow-clip">
        {children}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="flex flex-col gap-8">
      <Section label="Dashboard (5 rows)">
        <TableView data={recent} columns={dashboardCols} keyFn={(t) => t.id} />
      </Section>
      <Section label="Tasks (10 of 18, paginated)">
        <TableView data={INITIAL_TASKS.slice(0, 10)} columns={tasksCols} keyFn={(t) => t.id} />
      </Section>
      <Section label="Team">
        <TableView data={MEMBERS} columns={teamCols} keyFn={(m) => m.id} />
      </Section>
      <Section label="Reports">
        <TableView data={INITIAL_REPORTS} columns={reportsCols} keyFn={(r) => r.id} />
      </Section>
    </div>
  );
}

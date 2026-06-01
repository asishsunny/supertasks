"use client";

import { StatCards } from "@/components/blocks/StatCards";
import { INITIAL_TASKS, INITIAL_REPORTS } from "@/lib/data";
import { isOverdue } from "@/lib/utils";

const dashboardCards = [
  { label: "Total Tasks", value: INITIAL_TASKS.length },
  {
    label: "In Progress",
    value: INITIAL_TASKS.filter((t) => t.status === "in_progress").length,
  },
  {
    label: "Completed",
    value: INITIAL_TASKS.filter((t) => t.status === "done").length,
  },
  {
    label: "Overdue",
    value: INITIAL_TASKS.filter(
      (t) => isOverdue(t.due) && t.status !== "done"
    ).length,
  },
];

const overdueMembers = new Set(
  INITIAL_TASKS.filter((t) => isOverdue(t.due) && t.status !== "done").map(
    (t) => t.assignee
  )
);
const flagged = INITIAL_REPORTS.filter((r) =>
  overdueMembers.has(r.memberId)
).length;

const reportsCards = [
  { label: "Total Reports", value: INITIAL_REPORTS.length },
  { label: "Flagged Overdue", value: flagged },
  {
    label: "Avg per Month",
    value: Math.round((INITIAL_REPORTS.length / 3) * 10) / 10,
  },
  {
    label: "Pending Review",
    value: INITIAL_REPORTS.filter((r) => r.range.includes("Apr")).length,
  },
];

export default function Page() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <p className="text-ui-fg-subtle txt-compact-small mb-2">
          Dashboard variation
        </p>
        <StatCards cards={dashboardCards} />
      </div>
      <div>
        <p className="text-ui-fg-subtle txt-compact-small mb-2">
          Reports variation
        </p>
        <StatCards cards={reportsCards} />
      </div>
    </div>
  );
}

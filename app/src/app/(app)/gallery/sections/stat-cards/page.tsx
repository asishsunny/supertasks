"use client";
import { StatCards } from "@/components/blocks/StatCards";
import { INITIAL_TASKS, INITIAL_REPORTS, MEMBERS } from "@/lib/data";
import { isOverdue } from "@/lib/utils";

const dashboardCards = [
  { label: "Total Tasks", value: INITIAL_TASKS.length },
  { label: "In Progress", value: INITIAL_TASKS.filter((t) => t.status === "in_progress").length },
  { label: "Completed", value: INITIAL_TASKS.filter((t) => t.status === "done").length },
  { label: "Overdue", value: INITIAL_TASKS.filter((t) => isOverdue(t.due) && t.status !== "done").length, error: true },
];

const overdueMembers = new Set(INITIAL_TASKS.filter((t) => isOverdue(t.due) && t.status !== "done").map((t) => t.assignee));
const flagged = INITIAL_REPORTS.filter((r) => overdueMembers.has(r.memberId)).length;
const reportsCards = [
  { label: "Total reports", value: INITIAL_REPORTS.length },
  { label: "Flagged overdue", value: flagged, error: true },
  { label: "Avg per month", value: Math.round((INITIAL_REPORTS.length / 3) * 10) / 10 },
  { label: "Last generated", value: INITIAL_REPORTS[0]?.generated?.replace(/, \d{4}$/, "") || "—" },
];

export default function Page() {
  return (
    <div className="flex flex-col gap-8">
      <div><p className="text-ui-fg-subtle txt-compact-small mb-2">Dashboard</p><StatCards cards={dashboardCards} /></div>
      <div><p className="text-ui-fg-subtle txt-compact-small mb-2">Reports</p><StatCards cards={reportsCards} /></div>
    </div>
  );
}

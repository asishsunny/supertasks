"use client";

import StatCards from "@/components/blocks/StatCards";
import type { StatCardItem } from "@/components/blocks/StatCards";
import { INITIAL_TASKS, MEMBERS } from "@/lib/data";
import { STATUS_LABEL } from "@/lib/constants";
import type { Status } from "@/types";

/* ------------------------------------------------------------------ */
/*  Compute real stats from data.ts                                    */
/* ------------------------------------------------------------------ */

const totalTasks = INITIAL_TASKS.length;
const completedTasks = INITIAL_TASKS.filter((t) => t.status === "done").length;
const overdueTasks = INITIAL_TASKS.filter(
  (t) => t.status !== "done" && new Date(t.due) < new Date(),
).length;
const teamMembers = MEMBERS.length;

const dashboardCards: StatCardItem[] = [
  { label: "Total Tasks", value: totalTasks },
  { label: "Completed", value: completedTasks },
  { label: "Overdue", value: overdueTasks },
  { label: "Team Members", value: teamMembers },
];

/* Per-status breakdown */
const statusCounts = INITIAL_TASKS.reduce<Record<Status, number>>(
  (acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  },
  { todo: 0, in_progress: 0, in_review: 0, done: 0 },
);

const statusCards: StatCardItem[] = (
  Object.entries(statusCounts) as [Status, number][]
).map(([status, count]) => ({
  label: STATUS_LABEL[status],
  value: count,
}));

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">
          Dashboard
        </h2>
        <StatCards cards={dashboardCards} />
      </section>
      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">
          By Status
        </h2>
        <StatCards cards={statusCards} />
      </section>
    </div>
  );
}

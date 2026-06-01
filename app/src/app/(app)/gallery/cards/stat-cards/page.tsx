import StatCards from "@/components/blocks/StatCards";
import { INITIAL_TASKS } from "@/lib/data";
import { STATUS_LABEL } from "@/lib/constants";
import type { Status } from "@/types";

const STATUSES: Status[] = ["todo", "in_progress", "in_review", "done"];

/* Variation: dashboard — counts per status */
const dashboardCards = STATUSES.map((s) => ({
  label: STATUS_LABEL[s],
  value: String(INITIAL_TASKS.filter((t) => t.status === s).length),
}));

/* Variation: reports — total tasks, members, overdue, completed */
const overdue = INITIAL_TASKS.filter(
  (t) => t.status !== "done" && new Date(t.due + "T00:00:00") < new Date()
).length;
const reportsCards = [
  { label: "Total tasks", value: String(INITIAL_TASKS.length) },
  { label: "Completed", value: String(INITIAL_TASKS.filter((t) => t.status === "done").length) },
  { label: "Overdue", value: String(overdue) },
  { label: "In progress", value: String(INITIAL_TASKS.filter((t) => t.status === "in_progress").length) },
];

export default function StatCardsGallery() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-ui-fg-base txt-compact-medium-plus">Dashboard</h2>
        <StatCards cards={dashboardCards} />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-ui-fg-base txt-compact-medium-plus">Reports</h2>
        <StatCards cards={reportsCards} />
      </div>
    </div>
  );
}

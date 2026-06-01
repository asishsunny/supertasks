import { ChartCards } from "@/components/blocks/ChartCards";
import { INITIAL_TASKS } from "@/lib/data";
import { STATUS_LABEL, BAR_COLORS, PRIORITY_BAR_COLORS } from "@/lib/constants";
import type { Status, Priority } from "@/types";

const STATUSES: Status[] = ["todo", "in_progress", "in_review", "done"];
const PRIORITIES: Priority[] = ["critical", "high", "medium", "low"];

const statusChart = {
  title: "Tasks by status",
  total: INITIAL_TASKS.length,
  rows: STATUSES.map((s) => ({
    label: STATUS_LABEL[s],
    count: INITIAL_TASKS.filter((t) => t.status === s).length,
    color: BAR_COLORS[s],
  })),
};

const priorityChart = {
  title: "Tasks by priority",
  total: INITIAL_TASKS.length,
  rows: PRIORITIES.map((p) => ({
    label: p.charAt(0).toUpperCase() + p.slice(1),
    count: INITIAL_TASKS.filter((t) => t.priority === p).length,
    color: PRIORITY_BAR_COLORS[p],
  })),
};

export default function ChartCardsGallery() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-ui-fg-base txt-compact-medium-plus">Default</h2>
        <ChartCards charts={[statusChart, priorityChart]} />
      </div>
    </div>
  );
}

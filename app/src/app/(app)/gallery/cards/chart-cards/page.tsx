import { ChartCards } from "@/components/blocks/ChartCards";
import { CHART_STATUS, CHART_PRIORITY } from "@/lib/gallery";
import { BAR_COLORS, PRIORITY_BAR_COLORS } from "@/lib/constants";
import type { Status, Priority } from "@/types";

const STATUS_KEY: Record<string, Status> = {
  "Todo": "todo",
  "In Progress": "in_progress",
  "In Review": "in_review",
  "Done": "done",
};

const PRIORITY_KEY: Record<string, Priority> = {
  "Low": "low",
  "Medium": "medium",
  "High": "high",
  "Critical": "critical",
};

const cards = [
  {
    title: "Tasks by Status",
    bars: CHART_STATUS.map((s) => ({
      label: s.label,
      value: s.count,
      color: BAR_COLORS[STATUS_KEY[s.label]],
    })),
  },
  {
    title: "Tasks by Priority",
    bars: CHART_PRIORITY.map((p) => ({
      label: p.label,
      value: p.count,
      color: PRIORITY_BAR_COLORS[PRIORITY_KEY[p.label]],
    })),
  },
];

export default function Page() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <h2 className="txt-compact-medium-plus text-ui-fg-subtle">Chart Cards</h2>
      <ChartCards cards={cards} />
    </div>
  );
}

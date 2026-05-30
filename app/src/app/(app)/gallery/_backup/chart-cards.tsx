"use client";

import { INITIAL_TASKS } from "@/lib/data";
import { PRIORITY_BAR_COLORS, BAR_COLORS, STATUS_LABEL } from "@/lib/constants";
import type { Priority, Status } from "@/types";

const total = INITIAL_TASKS.length;
const priorities: { key: Priority; label: string }[] = [
  { key: "critical", label: "Critical" },
  { key: "high", label: "High" },
  { key: "medium", label: "Medium" },
  { key: "low", label: "Low" },
];
const statuses: { key: Status; label: string }[] = [
  { key: "todo", label: STATUS_LABEL.todo },
  { key: "in_progress", label: STATUS_LABEL.in_progress },
  { key: "in_review", label: STATUS_LABEL.in_review },
  { key: "done", label: STATUS_LABEL.done },
];

// markup from artifacts/transformed/chart-cards.tsx — bar row structure preserved
function BarRow({ label, count, color }: { label: string; count: number; color: string }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex flex-col gap-1 relative shrink-0 w-full">
      <div className="flex gap-2 items-center relative shrink-0 w-full">
        <p className="relative shrink-0 text-ui-fg-subtle w-[88px] txt-compact-small">{label}</p>
        <div className="bg-ui-border-base flex-1 h-2 min-w-[1px] overflow-clip relative rounded">
          <div className="absolute h-2 left-0 rounded top-0" style={{ width: `${pct}%`, backgroundColor: color }} />
        </div>
        <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">{count}</p>
      </div>
    </div>
  );
}

export default function ChartCardsGallery() {
  return (
    <div className="flex gap-4 items-start relative w-full">
      <div className="bg-ui-bg-base flex flex-1 flex-col gap-4 min-w-[1px] overflow-clip p-6 relative rounded-xl shadow-elevation-card-rest">
        <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">Tasks by Priority</p>
        <div className="flex flex-col gap-4 relative shrink-0 w-full">
          {priorities.map((p) => (
            <BarRow key={p.key} label={p.label} count={INITIAL_TASKS.filter((t) => t.priority === p.key).length} color={PRIORITY_BAR_COLORS[p.key]} />
          ))}
        </div>
      </div>
      <div className="bg-ui-bg-base flex flex-1 flex-col gap-4 min-w-[1px] overflow-clip p-6 relative rounded-xl shadow-elevation-card-rest">
        <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">Tasks by Status</p>
        <div className="flex flex-col gap-4 relative shrink-0 w-full">
          {statuses.map((s) => (
            <BarRow key={s.key} label={s.label} count={INITIAL_TASKS.filter((t) => t.status === s.key).length} color={BAR_COLORS[s.key]} />
          ))}
        </div>
      </div>
    </div>
  );
}

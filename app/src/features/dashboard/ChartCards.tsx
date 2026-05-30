"use client";

import { useMemo } from "react";
import { useStore } from "@/app/(app)/store";
import { PRIORITY_BAR_COLORS, BAR_COLORS, STATUS_LABEL } from "@/lib/constants";
import { ViewBoundary } from "@/components/shared/ViewBoundary";
import type { Priority, Status } from "@/types";

function BarRow({ label, count, total, color }: { label: string; count: number; total: number; color: string }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex gap-2 items-center w-full">
      <span className="txt-compact-small text-ui-fg-subtle w-[88px]">{label}</span>
      <div className="bg-ui-border-base flex-1 h-2 overflow-clip rounded relative">
        <div className="absolute h-2 left-0 top-0 rounded" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="txt-compact-small-plus text-ui-fg-base w-4 text-right">{count}</span>
    </div>
  );
}

const PRIORITIES: Priority[] = ["critical", "high", "medium", "low"];
const STATUSES: Status[] = ["todo", "in_progress", "in_review", "done"];

export function ChartCards() {
  const { state } = useStore();
  const total = state.tasks.length;

  const priorityCounts = useMemo(() =>
    PRIORITIES.map((p) => ({ key: p, label: p.charAt(0).toUpperCase() + p.slice(1), count: state.tasks.filter((t) => t.priority === p).length })),
    [state.tasks]
  );

  const statusCounts = useMemo(() =>
    STATUSES.map((s) => ({ key: s, label: STATUS_LABEL[s], count: state.tasks.filter((t) => t.status === s).length })),
    [state.tasks]
  );

  return (
    <ViewBoundary>
      <div className="flex gap-4 w-full">
        <div className="bg-ui-bg-base flex flex-1 flex-col gap-4 min-w-0 overflow-clip p-6 rounded-xl shadow-elevation-card-rest">
          <p className="txt-compact-medium-plus text-ui-fg-base">Tasks by Priority</p>
          <div className="flex flex-col gap-4">
            {priorityCounts.map((p) => (
              <BarRow key={p.key} label={p.label} count={p.count} total={total} color={PRIORITY_BAR_COLORS[p.key]} />
            ))}
          </div>
        </div>
        <div className="bg-ui-bg-base flex flex-1 flex-col gap-4 min-w-0 overflow-clip p-6 rounded-xl shadow-elevation-card-rest">
          <p className="txt-compact-medium-plus text-ui-fg-base">Tasks by Status</p>
          <div className="flex flex-col gap-4">
            {statusCounts.map((s) => (
              <BarRow key={s.key} label={s.label} count={s.count} total={total} color={BAR_COLORS[s.key]} />
            ))}
          </div>
        </div>
      </div>
    </ViewBoundary>
  );
}

"use client";

import { useMemo } from "react";
import { useStore } from "@/app/(app)/store";
import { ViewBoundary } from "@/components/shared/ViewBoundary";
import { isOverdue } from "@/lib/utils";

function StatCard({ label, value, error }: { label: string; value: string | number; error?: boolean }) {
  return (
    <div className="bg-ui-bg-base flex flex-1 flex-col gap-4 min-w-0 overflow-clip p-6 rounded-xl shadow-elevation-card-rest">
      <p className="txt-compact-medium-plus text-ui-fg-base">{label}</p>
      <p className={`text-[32px] leading-[44px] tracking-[-0.16px] font-normal ${error ? "text-ui-fg-error" : "text-ui-fg-base"}`}>
        {value}
      </p>
    </div>
  );
}

export function ReportsStatCards() {
  const { state } = useStore();

  const stats = useMemo(() => {
    const total = state.reports.length;
    const flagged = state.tasks.filter((t) => isOverdue(t.due) && t.status !== "done").length;
    const avgPerMonth = Math.round(total / 3);
    const latest = state.reports.length > 0
      ? new Date(state.reports[0].generated).toLocaleDateString("en-US", { month: "short", day: "numeric" })
      : "—";
    return { total, flagged, avgPerMonth, latest };
  }, [state.reports, state.tasks]);

  return (
    <ViewBoundary>
      <div className="flex gap-4 w-full">
        <StatCard label="Total reports" value={stats.total} />
        <StatCard label="Flagged overdue" value={stats.flagged} error />
        <StatCard label="Avg per month" value={stats.avgPerMonth} />
        <StatCard label="Last generated" value={stats.latest} />
      </div>
    </ViewBoundary>
  );
}

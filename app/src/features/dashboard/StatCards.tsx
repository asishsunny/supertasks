"use client";

import { useTaskStats } from "./hooks";
import { ViewBoundary } from "@/components/shared/ViewBoundary";

function StatCard({ label, value, error }: { label: string; value: number; error?: boolean }) {
  return (
    <div className="bg-ui-bg-base flex flex-1 flex-col gap-4 min-w-0 overflow-clip p-6 rounded-xl shadow-elevation-card-rest">
      <p className="txt-compact-medium-plus text-ui-fg-base">{label}</p>
      <p className={`text-[32px] leading-[44px] tracking-[-0.16px] font-normal ${error ? "text-ui-fg-error" : "text-ui-fg-base"}`}>
        {value}
      </p>
    </div>
  );
}

export function StatCards() {
  const stats = useTaskStats();
  return (
    <ViewBoundary>
      <div className="flex gap-4 w-full">
        <StatCard label="Total Tasks" value={stats.total} />
        <StatCard label="In Progress" value={stats.inProgress} />
        <StatCard label="Completed" value={stats.done} />
        <StatCard label="Overdue" value={stats.overdue} error />
      </div>
    </ViewBoundary>
  );
}

"use client";

import { ChartCards } from "@/components/blocks/ChartCards";
import type { ChartCardData } from "@/components/blocks/ChartCards";
import { INITIAL_TASKS } from "@/lib/data";
import {
  STATUS_LABEL,
  BAR_COLORS,
  PRIORITY_BAR_COLORS,
} from "@/lib/constants";
import type { Priority, Status } from "@/types";

/* ------------------------------------------------------------------ */
/*  Compute real chart data from INITIAL_TASKS                         */
/* ------------------------------------------------------------------ */

function buildPriorityCard(): ChartCardData {
  const counts: Record<Priority, number> = { low: 0, medium: 0, high: 0, critical: 0 };
  for (const t of INITIAL_TASKS) counts[t.priority]++;

  const priorityLabel: Record<Priority, string> = {
    critical: "Critical",
    high: "High",
    medium: "Medium",
    low: "Low",
  };

  return {
    title: "Tasks by Priority",
    bars: (["critical", "high", "medium", "low"] as Priority[]).map((p) => ({
      label: priorityLabel[p],
      value: counts[p],
      color: PRIORITY_BAR_COLORS[p],
    })),
  };
}

function buildStatusCard(): ChartCardData {
  const counts: Record<Status, number> = { todo: 0, in_progress: 0, in_review: 0, done: 0 };
  for (const t of INITIAL_TASKS) counts[t.status]++;

  return {
    title: "Tasks by Status",
    bars: (["todo", "in_progress", "in_review", "done"] as Status[]).map((s) => ({
      label: STATUS_LABEL[s],
      value: counts[s],
      color: BAR_COLORS[s],
    })),
  };
}

const realCards: ChartCardData[] = [buildPriorityCard(), buildStatusCard()];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">Default (Figma defaults)</h2>
        <ChartCards />
      </section>
      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">Dashboard (real data)</h2>
        <ChartCards cards={realCards} />
      </section>
    </div>
  );
}

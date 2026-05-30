"use client";
import { ChartCards } from "@/components/blocks/ChartCards";
import { INITIAL_TASKS } from "@/lib/data";
import { PRIORITY_BAR_COLORS, BAR_COLORS, STATUS_LABEL } from "@/lib/constants";
import type { Priority, Status } from "@/types";

const total = INITIAL_TASKS.length;
const charts = [
  {
    title: "Tasks by Priority",
    total,
    rows: (["critical","high","medium","low"] as Priority[]).map((p) => ({
      label: p.charAt(0).toUpperCase() + p.slice(1),
      count: INITIAL_TASKS.filter((t) => t.priority === p).length,
      color: PRIORITY_BAR_COLORS[p],
    })),
  },
  {
    title: "Tasks by Status",
    total,
    rows: (["todo","in_progress","in_review","done"] as Status[]).map((s) => ({
      label: STATUS_LABEL[s],
      count: INITIAL_TASKS.filter((t) => t.status === s).length,
      color: BAR_COLORS[s],
    })),
  },
];

export default function Page() { return <ChartCards charts={charts} />; }

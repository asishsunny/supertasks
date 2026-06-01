"use client";

import { ChartCards } from "@/components/blocks/ChartCards";
import { INITIAL_TASKS } from "@/lib/data";
import { STATUS_LABEL, BAR_COLORS, PRIORITY_BAR_COLORS } from "@/lib/constants";
import type { Status, Priority } from "@/types";

const STATUSES: Status[] = ['todo', 'in_progress', 'in_review', 'done'];
const PRIORITIES: Priority[] = ['critical', 'high', 'medium', 'low'];
const charts = [
  { title: 'Tasks by Priority', total: INITIAL_TASKS.length, rows: PRIORITIES.map(p => ({ label: p.charAt(0).toUpperCase() + p.slice(1), count: INITIAL_TASKS.filter(t => t.priority === p).length, color: PRIORITY_BAR_COLORS[p] })) },
  { title: 'Tasks by Status', total: INITIAL_TASKS.length, rows: STATUSES.map(s => ({ label: STATUS_LABEL[s], count: INITIAL_TASKS.filter(t => t.status === s).length, color: BAR_COLORS[s] })) },
];

export default function Page() {
  return (
    <div className="p-6">
      <ChartCards charts={charts} />
    </div>
  );
}

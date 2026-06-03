"use client";

import { RecentTasks } from "@/components/blocks/RecentTasks";
import { INITIAL_TASKS, MEMBERS } from "@/lib/data";
import { PRIORITY_COLOR, STATUS_LABEL, BAR_COLORS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import type { RecentTaskRow } from "@/components/blocks/RecentTasks";

const PRIORITY_LABEL: Record<string, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
};

function buildRows(count: number): RecentTaskRow[] {
  const sorted = [...INITIAL_TASKS].sort(
    (a, b) => new Date(b.due).getTime() - new Date(a.due).getTime()
  );
  return sorted.slice(0, count).map((task) => {
    const member = MEMBERS.find((m) => m.id === task.assignee)!;
    return {
      title: task.title,
      assignee: {
        initials: member.initials,
        avatarBg: member.avatarBg,
        avatarText: member.avatarText,
      },
      assigneeName: member.name,
      priority: PRIORITY_LABEL[task.priority] ?? task.priority,
      priorityColor: PRIORITY_COLOR[task.priority],
      dueDate: formatDate(task.due),
      statusLabel: STATUS_LABEL[task.status],
      statusColor: BAR_COLORS[task.status],
    };
  });
}

export default function Page() {
  const rows = buildRows(5);

  return (
    <div className="flex flex-col gap-8 p-6">
      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">Default</h2>
        <RecentTasks />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">
          With Real Data (5 most recent)
        </h2>
        <RecentTasks rows={rows} />
      </section>
    </div>
  );
}

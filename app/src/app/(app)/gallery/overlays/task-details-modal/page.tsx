"use client";

import TaskDetailsModal from "@/components/blocks/TaskDetailsModal";
import type { InfoRow, ActivityEntry } from "@/components/blocks/TaskDetailsModal";
import { INITIAL_TASKS, MEMBERS, ACTIVITY } from "@/lib/data";
import { STATUS_COLOR, STATUS_LABEL, PRIORITY_COLOR } from "@/lib/constants";
import type { Status, Priority } from "@/types";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const PRIORITY_LABEL: Record<Priority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
};

function memberById(id: number) {
  return MEMBERS.find((m) => m.id === id)!;
}

function buildInfoRows(task: (typeof INITIAL_TASKS)[number]): InfoRow[] {
  const assignee = memberById(task.assignee);
  const isOverdue = new Date(task.due) < new Date();
  return [
    {
      label: "Status",
      type: "status",
      value: STATUS_LABEL[task.status as Status],
      color: STATUS_COLOR[task.status as Status],
    },
    {
      label: "Priority",
      type: "priority",
      value: PRIORITY_LABEL[task.priority as Priority],
      color: PRIORITY_COLOR[task.priority as Priority],
    },
    {
      label: "Assignee",
      type: "assignee",
      value: assignee.name,
      member: {
        initials: assignee.initials,
        avatarBg: assignee.avatarBg,
        avatarText: assignee.avatarText,
      },
    },
    {
      label: "Due date",
      type: "date",
      value: new Date(task.due).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      isOverdue,
    },
  ];
}

function buildActivityEntries(taskId: number): ActivityEntry[] {
  return ACTIVITY.filter((a) => a.taskId === taskId).map((a) => {
    const m = memberById(a.memberId);
    return {
      member: {
        initials: m.initials,
        avatarBg: m.avatarBg,
        avatarText: m.avatarText,
        name: m.name,
      },
      time: a.time,
      text: a.text,
    };
  });
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Page() {
  // Task 1: "Update onboarding flow" — matches Figma source
  const task1 = INITIAL_TASKS.find((t) => t.id === 1)!;
  // Task 4: "Fix billing bug #482" — different status/priority/assignee
  const task4 = INITIAL_TASKS.find((t) => t.id === 4)!;

  return (
    <div className="flex flex-col gap-8 p-6">
      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">
          Task 1 — In Progress / High
        </h2>
        <TaskDetailsModal
          title={task1.title}
          description={task1.desc}
          infoRows={buildInfoRows(task1)}
          activityEntries={buildActivityEntries(task1.id)}
        />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">
          Task 4 — In Progress / Critical
        </h2>
        <TaskDetailsModal
          title={task4.title}
          description={task4.desc}
          infoRows={buildInfoRows(task4)}
          activityEntries={buildActivityEntries(task4.id)}
        />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">
          Default (Figma values)
        </h2>
        <TaskDetailsModal />
      </section>
    </div>
  );
}

"use client";

import {
  SquareGreySolid,
  SquareBlueSolid,
  SquareOrangeSolid,
  SquareGreenSolid,
} from "@medusajs/icons";
import { KanbanBoard } from "@/components/blocks/KanbanBoard";
import type { KanbanColumn, KanbanCard } from "@/components/blocks/KanbanBoard";
import { INITIAL_TASKS, MEMBERS } from "@/lib/data";
import { PRIORITY_COLOR, STATUS_LABEL } from "@/lib/constants";
import { formatDueDate, isOverdue } from "@/lib/utils";
import type { Status } from "@/types";

/* ------------------------------------------------------------------ */
/*  Map statuses to column icons                                       */
/* ------------------------------------------------------------------ */

const STATUS_ICON: Record<Status, typeof SquareGreySolid> = {
  todo: SquareGreySolid,
  in_progress: SquareBlueSolid,
  in_review: SquareOrangeSolid,
  done: SquareGreenSolid,
};

const COLUMN_ORDER: Status[] = ["todo", "in_progress", "in_review", "done"];

/* ------------------------------------------------------------------ */
/*  Build columns from real data                                       */
/* ------------------------------------------------------------------ */

function buildColumns(): KanbanColumn[] {
  return COLUMN_ORDER.map((status) => {
    const tasks = INITIAL_TASKS.filter((t) => t.status === status);
    const cards: KanbanCard[] = tasks.map((task) => {
      const member = MEMBERS.find((m) => m.id === task.assignee)!;
      return {
        title: task.title,
        description: task.desc,
        assignee: {
          initials: member.initials,
          avatarBg: member.avatarBg,
          avatarText: member.avatarText,
        },
        assigneeName: member.name.split(" ")[0],
        due: formatDueDate(task.due),
        dueDateOverdue: isOverdue(task.due),
        priority: task.priority.charAt(0).toUpperCase() + task.priority.slice(1),
        priorityColor: PRIORITY_COLOR[task.priority],
      };
    });

    return {
      label: STATUS_LABEL[status],
      icon: STATUS_ICON[status],
      cards,
    };
  });
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Page() {
  const columns = buildColumns();

  return (
    <div className="flex flex-col gap-8 p-6">
      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">
          Kanban Board — Live Data
        </h2>
        <KanbanBoard columns={columns} />
      </section>
    </div>
  );
}

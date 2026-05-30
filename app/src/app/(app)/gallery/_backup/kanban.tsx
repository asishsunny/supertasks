"use client";

// gallery page — resolves data, passes flat props to blocks
// blocks preserve all classNames from artifacts/transformed/kanban-board.tsx

import { useState } from "react";
import { SquareGreySolid, SquareBlueSolid, SquareOrangeSolid, SquareGreenSolid } from "@medusajs/icons";
import { KanbanBoard } from "@/components/blocks/KanbanBoard";
import { KanbanCard } from "@/components/blocks/KanbanCard";
import { INITIAL_TASKS, MEMBERS } from "@/lib/data";
import { PRIORITY_COLOR, STATUS_LABEL } from "@/lib/constants";
import { formatDueDate, isOverdue } from "@/lib/utils";
import type { Task, Status } from "@/types";

const memberMap = new Map(MEMBERS.map((m) => [m.id, m]));

const DOT_ICONS: Record<Status, React.ReactNode> = {
  todo: <SquareGreySolid className="w-[15px] h-[15px]" />,
  in_progress: <SquareBlueSolid className="w-[15px] h-[15px]" />,
  in_review: <SquareOrangeSolid className="w-[15px] h-[15px]" />,
  done: <SquareGreenSolid className="w-[15px] h-[15px]" />,
};

const STATUSES: Status[] = ["todo", "in_progress", "in_review", "done"];

function renderCard(t: Task) {
  const m = memberMap.get(t.assignee)!;
  return (
    <KanbanCard
      title={t.title}
      desc={t.desc}
      member={m}
      firstName={m.name.split(" ")[0]}
      dueDate={formatDueDate(t.due)}
      dueDateClass={isOverdue(t.due) ? "text-ui-fg-error" : "text-ui-fg-subtle"}
      priorityLabel={t.priority.charAt(0).toUpperCase() + t.priority.slice(1)}
      priorityColor={PRIORITY_COLOR[t.priority]}
    />
  );
}

export default function KanbanGallery() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const columns = STATUSES.map((s) => {
    const items = tasks.filter((t) => t.status === s);
    return {
      key: s,
      dotIcon: DOT_ICONS[s],
      label: STATUS_LABEL[s],
      count: items.length,
      items,
    };
  });

  function handleMove(itemKey: string | number, _from: string, to: string) {
    setTasks((prev) => prev.map((t) => t.id === Number(itemKey) ? { ...t, status: to as Status } : t));
  }

  return <KanbanBoard columns={columns} renderCard={renderCard} keyFn={(t) => t.id} onMove={handleMove} />;
}

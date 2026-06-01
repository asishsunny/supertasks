import type { ReactNode } from "react";
import type { Status } from "@/types";

export interface KanbanColumn {
  status: Status;
  label: string;
  count: number;
  statusIcon: ReactNode;
  cards: ReactNode[];
}

export interface KanbanBoardProps {
  columns: KanbanColumn[];
}

export function KanbanBoard({ columns }: KanbanBoardProps) {
  return (
    <div className="flex gap-4 items-start w-full h-full">
      {columns.map((col) => (
        <div
          key={col.status}
          className="bg-ui-bg-kanban-column flex flex-1 flex-col gap-2 h-full min-w-[1px] p-2 rounded-xl"
        >
          <div className="flex gap-1.5 items-center overflow-clip py-1 w-full">
            {col.statusIcon}
            <p className="text-ui-fg-base txt-compact-medium-plus">
              {col.label}
            </p>
            <div className="flex-1 h-px min-w-[1px]" />
            <p className="text-ui-fg-muted txt-compact-medium">{col.count}</p>
          </div>
          {col.cards}
        </div>
      ))}
    </div>
  );
}

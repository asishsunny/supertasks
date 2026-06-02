import { Badge } from "@medusajs/ui";
import type { ReactNode } from "react";

interface KanbanColumn {
  status: string;
  label: string;
  count: number;
  statusIcon: ReactNode;
  cards: ReactNode[];
}

export interface KanbanBoardProps {
  columns?: KanbanColumn[];
}

export function KanbanBoard({
  columns,
}: KanbanBoardProps) {
  return (
<div className="flex gap-4 h-[800px] items-start relative shrink-0 w-full">
  {columns?.map((column) => (
    <div key={column.status} className="bg-ui-bg-kanban-column flex flex-1 flex-col gap-2 h-full min-w-[1px] p-2 relative rounded-xl">
      <div className="flex gap-1.5 items-center overflow-clip py-1 relative shrink-0 w-full">
        {column.statusIcon}
        <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
          {column.label}
        </p>
        <div className="flex-1 h-px min-w-[1px] relative" />
        <p className="relative shrink-0 text-ui-fg-muted txt-compact-medium">
          {column.count}
        </p>
      </div>
      {column.cards.map((card, cardIndex) => (
        <div key={cardIndex}>
          {card}
        </div>
      ))}
    </div>
  ))}
</div>
  );
}

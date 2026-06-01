import { StatusDot } from "@/components/shared/StatusDot";
import { KanbanCard } from "@/components/blocks/KanbanCard";
import type { KanbanCardProps } from "@/components/blocks/KanbanCard";
import type { Status } from "@/types";

export interface KanbanColumn {
  status: Status;
  label: string;
  cards: KanbanCardProps[];
}

interface KanbanViewProps {
  columns: KanbanColumn[];
}

export function KanbanView({ columns }: KanbanViewProps) {
  return (
    <div className="flex gap-4 items-start w-full h-full overflow-x-auto">
      {columns.map((col) => (
        <div
          key={col.status}
          className="bg-ui-bg-kanban-column flex flex-1 flex-col gap-2 h-full min-w-[1px] p-2 rounded-xl"
        >
          <div className="flex gap-1.5 items-center overflow-clip py-1 shrink-0 w-full">
            <StatusDot status={col.status} />
            <p className="shrink-0 text-ui-fg-base txt-compact-medium-plus">
              {col.label}
            </p>
            <div className="flex-1 h-px min-w-[1px]" />
            <p className="shrink-0 text-ui-fg-muted txt-compact-medium">
              {col.cards.length}
            </p>
          </div>
          {col.cards.map((card, i) => (
            <KanbanCard key={i} {...card} />
          ))}
        </div>
      ))}
    </div>
  );
}

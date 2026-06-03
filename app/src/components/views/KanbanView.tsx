import { Badge } from "@medusajs/ui";
import { StatusDot } from "@/components/shared/StatusDot";
import { ColorAvatar } from "@/components/ColorAvatar";
import type { KanbanCard } from "@/components/blocks/KanbanBoard";
import type { Status } from "@/types";

export interface KanbanColumn {
  status: Status;
  label: string;
  cards: KanbanCard[];
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
            <div
              key={i}
              className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 rounded-lg shrink-0 w-full"
            >
              <p className="shrink-0 text-ui-fg-base txt-compact-small-plus">
                {card.title}
              </p>
              <p className="min-w-full overflow-hidden shrink-0 text-ui-fg-muted text-ellipsis txt-compact-small">
                {card.description}
              </p>
              <div className="flex gap-1.5 items-center shrink-0 w-full">
                <ColorAvatar member={card.assignee} size="xsmall" />
                <p className="shrink-0 text-ui-fg-subtle txt-compact-xsmall">
                  {card.assigneeName}
                </p>
                <div className="flex-1 h-px min-w-[1px]" />
                <p
                  className={`shrink-0 txt-compact-xsmall ${
                    card.dueDateOverdue
                      ? "text-ui-fg-error"
                      : "text-ui-fg-subtle"
                  }`}
                >
                  {card.due}
                </p>
                <Badge
                  color={card.priorityColor}
                  size="2xsmall"
                  rounded="full"
                >
                  {card.priority}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

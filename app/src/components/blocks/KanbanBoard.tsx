import { Badge } from "@medusajs/ui";
import { ColorAvatar } from "@/components/ColorAvatar";

interface KanbanCardData {
  id: string | number;
  title: string;
  desc: string;
  member: { initials: string; avatarBg: string; avatarText: string };
  firstName: string;
  dueDate: string;
  overdue?: boolean;
  priorityLabel: string;
  priorityColor: string;
}

interface KanbanColumnData {
  status: string;
  label: string;
  count: number;
  statusColor: string;
  cards: KanbanCardData[];
}

export interface KanbanBoardProps {
  columns?: KanbanColumnData[];
}

export function KanbanBoard({
  columns,
}: KanbanBoardProps) {
  return (
    <div className="flex gap-4 h-[800px] items-start relative shrink-0 w-full">
      {columns?.map((col) => (
        <div
          key={col.status}
          className="bg-ui-bg-kanban-column flex flex-1 flex-col gap-2 h-full min-w-[1px] p-2 relative rounded-xl"
        >
          <div className="flex gap-1.5 items-center overflow-clip py-1 relative shrink-0 w-full">
            <div
              className="w-[15px] h-[15px] rounded-sm"
              style={{ backgroundColor: col.statusColor }}
            />
            <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
              {col.label}
            </p>
            <div className="flex-1 h-px min-w-[1px] relative" />
            <p className="relative shrink-0 text-ui-fg-muted txt-compact-medium">
              {col.count}
            </p>
          </div>
          {col.cards.map((card) => (
            <div
              key={card.id}
              className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full"
            >
              <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">
                {card.title}
              </p>
              <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis font-normal text-[13px] leading-[20px]">
                {card.desc}
              </p>
              <div className="flex gap-1.5 items-center relative shrink-0 w-full">
                <ColorAvatar member={card.member} size="xsmall" />
                <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal]">
                  {card.firstName}
                </p>
                <div className="flex-1 h-px min-w-[1px] relative" />
                <p
                  className={`font-normal relative shrink-0 text-[12px] leading-[normal] ${
                    card.overdue ? "text-ui-fg-error" : "text-ui-fg-subtle"
                  }`}
                >
                  {card.dueDate}
                </p>
                <Badge
                  color={card.priorityColor as "grey" | "green" | "red" | "blue" | "orange" | "purple"}
                  size="2xsmall"
                  rounded="full"
                >
                  {card.priorityLabel}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

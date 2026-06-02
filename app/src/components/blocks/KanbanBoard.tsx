import { ReactNode } from "react";
import { Badge } from "@medusajs/ui";
import { ColorAvatar } from "@/components/ColorAvatar";
import type { Member, Priority } from "@/types";
import { PRIORITY_COLOR } from "@/lib/constants";

export interface KanbanCard {
  title: string;
  description: string;
  member: Pick<Member, "initials" | "avatarBg" | "avatarText">;
  memberName: string;
  dueDate: string;
  overdue?: boolean;
  priority: Priority;
  priorityLabel: string;
}

export interface KanbanColumn {
  status: string;
  label: string;
  count: number;
  statusIcon: ReactNode;
  cards: KanbanCard[];
}

export interface KanbanBoardProps {
  columns: KanbanColumn[];
}

export function KanbanBoard({ columns }: KanbanBoardProps) {
  return (
    <div className="flex gap-4 h-[800px] items-start w-full">
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
            <p className="text-ui-fg-muted txt-compact-medium">
              {col.count}
            </p>
          </div>
          {col.cards.map((card, i) => (
            <div
              key={i}
              className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 rounded-lg w-full"
            >
              <p className="text-ui-fg-base txt-compact-small-plus">
                {card.title}
              </p>
              <p className="min-w-full overflow-hidden text-ui-fg-muted text-ellipsis font-normal text-[13px] leading-[20px]">
                {card.description}
              </p>
              <div className="flex gap-1.5 items-center w-full">
                <ColorAvatar member={card.member} size="xsmall" />
                <p className="font-normal text-ui-fg-subtle text-[12px] leading-[normal]">
                  {card.memberName}
                </p>
                <div className="flex-1 h-px min-w-[1px]" />
                <p
                  className={`font-normal text-[12px] leading-[normal] ${
                    card.overdue ? "text-ui-fg-error" : "text-ui-fg-subtle"
                  }`}
                >
                  {card.dueDate}
                </p>
                <Badge
                  color={PRIORITY_COLOR[card.priority]}
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

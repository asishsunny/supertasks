import { Badge } from "@medusajs/ui";
import { SquareGreySolid } from "@medusajs/icons";
import type { ComponentType, SVGAttributes } from "react";
import { ColorAvatar } from "@/components/ColorAvatar";
import type { Member } from "@/types";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type BadgeColor = React.ComponentProps<typeof Badge>["color"];

export interface KanbanCard {
  title: string;
  description: string;
  assignee: Pick<Member, "initials" | "avatarBg" | "avatarText">;
  assigneeName: string;
  due: string;
  dueDateOverdue?: boolean;
  priority: string;
  priorityColor: BadgeColor;
}

export interface KanbanColumn {
  label: string;
  count?: number;
  icon: ComponentType<SVGAttributes<SVGSVGElement>>;
  cards: KanbanCard[];
}

export interface KanbanBoardProps {
  columns?: KanbanColumn[];
}

/* ------------------------------------------------------------------ */
/*  Default Figma data (one representative card from template)         */
/* ------------------------------------------------------------------ */

const defaultAssignee: Pick<Member, "initials" | "avatarBg" | "avatarText"> = {
  initials: "LA",
  avatarBg: "tag-neutral-bg",
  avatarText: "tag-neutral-text",
};

const DEFAULT_COLUMNS: KanbanColumn[] = [
  {
    label: "To Do",
    icon: SquareGreySolid,
    cards: [
      {
        title: "Customer interviews",
        description: "Schedule and run five user feedback sessions",
        assignee: defaultAssignee,
        assigneeName: "Lara",
        due: "Jun 8",
        priority: "Medium",
        priorityColor: "orange",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function KanbanBoard({ columns = DEFAULT_COLUMNS }: KanbanBoardProps) {
  return (
    <div className="flex gap-4 h-[800px] items-start relative shrink-0 w-full">
      {columns.map((col, ci) => {
        const Icon = col.icon;
        return (
          <div
            key={ci}
            className="bg-ui-bg-kanban-column flex flex-1 flex-col gap-2 h-full min-w-[1px] p-2 relative rounded-xl"
          >
            {/* Column header */}
            <div className="flex gap-1.5 items-center overflow-clip py-1 relative shrink-0 w-full">
              <Icon className="w-[15px] h-[15px]" />
              <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
                {col.label}
              </p>
              <div className="flex-1 h-px min-w-[1px] relative" />
              <p className="relative shrink-0 text-ui-fg-muted txt-compact-medium">
                {col.count ?? col.cards.length}
              </p>
            </div>

            {/* Cards */}
            {col.cards.map((card, cardIdx) => (
              <div
                key={cardIdx}
                className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full"
              >
                <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">
                  {card.title}
                </p>
                <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis txt-compact-small">
                  {card.description}
                </p>
                <div className="flex gap-1.5 items-center relative shrink-0 w-full">
                  <ColorAvatar member={card.assignee} size="xsmall" />
                  <p className="relative shrink-0 text-ui-fg-subtle txt-compact-xsmall">
                    {card.assigneeName}
                  </p>
                  <div className="flex-1 h-px min-w-[1px] relative" />
                  <p
                    className={`relative shrink-0 txt-compact-xsmall ${
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
        );
      })}
    </div>
  );
}

import { Badge } from "@medusajs/ui";
import { ColorAvatar } from "@/components/ColorAvatar";
import type { Member } from "@/types";
import type { BadgeColor } from "@/lib/constants";

export interface KanbanCardProps {
  title: string;
  desc: string;
  member: Pick<Member, "initials" | "avatarBg" | "avatarText">;
  name: string;
  dueDate: string;
  overdue: boolean;
  priorityLabel: string;
  priorityColor: BadgeColor;
  onClick?: () => void;
}

export function KanbanCard({
  title,
  desc,
  member,
  name,
  dueDate,
  overdue,
  priorityLabel,
  priorityColor,
  onClick,
}: KanbanCardProps) {
  return (
    <div
      className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 rounded-lg w-full"
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `${title} — ${priorityLabel} priority` : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      <p className="text-ui-fg-base txt-compact-small-plus">{title}</p>
      <p className="overflow-hidden text-ui-fg-muted text-ellipsis txt-compact-small">
        {desc}
      </p>
      <div className="flex gap-1.5 items-center w-full">
        <ColorAvatar member={member} size="xsmall" />
        <p className="text-ui-fg-subtle txt-compact-xsmall">{name}</p>
        <div className="flex-1 h-px min-w-[1px]" />
        <p
          className={`txt-compact-xsmall ${overdue ? "text-ui-fg-error" : "text-ui-fg-subtle"}`}
        >
          {dueDate}
        </p>
        <Badge color={priorityColor} size="2xsmall" rounded="full">
          {priorityLabel}
        </Badge>
      </div>
    </div>
  );
}

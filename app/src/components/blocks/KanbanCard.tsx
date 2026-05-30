// source: artifacts/transformed/kanban-board.tsx lines 19-36 (card subtree)
// step 2: split from KanbanBoard, noise cleaned with context, flat props

import { Badge } from "@medusajs/ui";
import { ColorAvatar } from "@/components/ColorAvatar";
import type { Member } from "@/types";

interface KanbanCardProps {
  title: string;
  desc: string;
  member: Pick<Member, "initials" | "avatarBg" | "avatarText" | "name">;
  firstName: string;
  dueDate: string;
  dueDateClass: string;
  priorityLabel: string;
  priorityColor: "grey" | "orange" | "red" | "purple" | "blue" | "green";
}

export function KanbanCard({ title, desc, member, firstName, dueDate, dueDateClass, priorityLabel, priorityColor }: KanbanCardProps) {
  return (
    // card: relative stripped (no absolute children), shrink-0 stripped (flex-col parent)
    <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 rounded-lg w-full">
      <p className="text-ui-fg-base txt-compact-small-plus">
        {title}
      </p>
      {/* min-w-full stripped (parent is flex-col w-full), overflow-hidden kept (text-ellipsis needs it) */}
      <p className="overflow-hidden text-ui-fg-muted text-ellipsis font-normal text-[13px] leading-[20px]">
        {desc}
      </p>
      {/* relative stripped, shrink-0 stripped */}
      <div className="flex gap-1.5 items-center w-full">
        <ColorAvatar member={member} size="xsmall" />
        {/* relative/shrink-0 stripped from text */}
        <p className="font-normal text-ui-fg-subtle text-[12px] leading-[normal]">
          {firstName}
        </p>
        <div className="flex-1" />
        <p className={`font-normal text-[12px] leading-[normal] ${dueDateClass}`}>
          {dueDate}
        </p>
        <Badge color={priorityColor} size="2xsmall" rounded="full">{priorityLabel}</Badge>
      </div>
    </div>
  );
}

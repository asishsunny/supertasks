import { Badge } from "@medusajs/ui";
import { ColorAvatar } from "@/components/ColorAvatar";
import { PRIORITY_COLOR } from "@/lib/constants";
import { formatDueDate, isOverdue } from "@/lib/utils";
import type { Task, Member } from "@/types";

export function KanbanCard({ task, member, onClick }: { task: Task; member: Member; onClick?: () => void }) {
  const overdue = isOverdue(task.due);
  const priorityLabel = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);

  return (
    <div
      className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 rounded-lg cursor-pointer hover:shadow-elevation-card-hover transition-shadow"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick?.(); }}
    >
      <p className="txt-compact-small-plus text-ui-fg-base">{task.title}</p>
      <p className="txt-compact-small text-ui-fg-muted truncate">{task.desc}</p>
      <div className="flex gap-1.5 items-center">
        <ColorAvatar member={member} size="xsmall" />
        <span className="text-xs text-ui-fg-subtle">{member.name.split(" ")[0]}</span>
        <div className="flex-1" />
        <span className={`text-xs ${overdue ? "text-ui-fg-error" : "text-ui-fg-subtle"}`}>
          {formatDueDate(task.due)}
        </span>
        <Badge color={PRIORITY_COLOR[task.priority]} size="2xsmall" rounded="full">
          {priorityLabel}
        </Badge>
      </div>
    </div>
  );
}

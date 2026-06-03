import { KanbanBoard } from "@/components/blocks/KanbanBoard";
import { KANBAN_COLUMNS, KANBAN_TASKS } from "@/lib/gallery";
import { INITIAL_TASKS, MEMBERS } from "@/lib/data";
import { STATUS_LABEL, PRIORITY_COLOR } from "@/lib/constants";
import { formatDueDate, isOverdue } from "@/lib/utils";
import {
  SquareGreySolid,
  SquareBlueSolid,
  SquareOrangeSolid,
  SquareGreenSolid,
} from "@medusajs/icons";
import type { Status } from "@/types";

const taskMap = Object.fromEntries(INITIAL_TASKS.map((t) => [t.id, t]));
const memberMap = Object.fromEntries(MEMBERS.map((m) => [m.id, m]));

const STATUS_ICONS: Record<Status, typeof SquareGreySolid> = {
  todo: SquareGreySolid,
  in_progress: SquareBlueSolid,
  in_review: SquareOrangeSolid,
  done: SquareGreenSolid,
};

const columns = KANBAN_COLUMNS.map((status) => {
  const taskIds = KANBAN_TASKS[status as keyof typeof KANBAN_TASKS] ?? [];
  return {
    label: STATUS_LABEL[status as Status],
    icon: STATUS_ICONS[status as Status],
    count: taskIds.length,
    cards: taskIds.map((id) => {
      const t = taskMap[id];
      const member = memberMap[t.assignee];
      return {
        title: t.title,
        description: t.desc,
        assignee: { initials: member.initials, avatarBg: member.avatarBg, avatarText: member.avatarText },
        assigneeName: member.name.split(" ")[0],
        due: formatDueDate(t.due),
        dueDateOverdue: isOverdue(t.due),
        priority: t.priority.charAt(0).toUpperCase() + t.priority.slice(1),
        priorityColor: PRIORITY_COLOR[t.priority],
      };
    }),
  };
});

export default function Page() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <h2 className="txt-compact-medium-plus text-ui-fg-subtle">Kanban Board</h2>
      <KanbanBoard columns={columns} />
    </div>
  );
}

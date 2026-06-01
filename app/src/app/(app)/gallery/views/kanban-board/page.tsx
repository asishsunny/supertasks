import { KanbanBoard } from "@/components/blocks/KanbanBoard";
import { INITIAL_TASKS, MEMBERS } from "@/lib/data";
import { STATUS_LABEL, STATUS_COLOR } from "@/lib/constants";
import { Badge } from "@medusajs/ui";
import { formatDueDate } from "@/lib/utils";
import type { Status } from "@/types";

const STATUSES: Status[] = ["todo", "in_progress", "in_review", "done"];

const statusIconMap: Record<Status, React.ReactNode> = {
  todo: <div className="w-2.5 h-2.5 rounded-full bg-ui-tag-neutral-icon" />,
  in_progress: <div className="w-2.5 h-2.5 rounded-full bg-ui-tag-blue-icon" />,
  in_review: <div className="w-2.5 h-2.5 rounded-full bg-ui-tag-orange-icon" />,
  done: <div className="w-2.5 h-2.5 rounded-full bg-ui-tag-green-icon" />,
};

function KanbanCard({ title, assignee, due }: { title: string; assignee: string; due: string }) {
  return (
    <div className="bg-ui-bg-base flex flex-col gap-2 p-3 rounded-lg shadow-elevation-card-rest w-full">
      <p className="text-ui-fg-base txt-compact-small-plus">{title}</p>
      <div className="flex items-center justify-between">
        <p className="text-ui-fg-subtle txt-compact-xsmall">{assignee}</p>
        <p className="text-ui-fg-muted txt-compact-xsmall">{formatDueDate(due)}</p>
      </div>
    </div>
  );
}

const columns = STATUSES.map((s) => {
  const tasks = INITIAL_TASKS.filter((t) => t.status === s);
  return {
    status: s,
    label: STATUS_LABEL[s],
    count: tasks.length,
    statusIcon: statusIconMap[s],
    cards: tasks.map((t) => {
      const member = MEMBERS.find((m) => m.id === t.assignee);
      return (
        <KanbanCard
          key={t.id}
          title={t.title}
          assignee={member?.name ?? ""}
          due={t.due}
        />
      );
    }),
  };
});

export default function KanbanBoardGallery() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-ui-fg-base txt-compact-medium-plus">Default</h2>
        <div className="h-[600px]">
          <KanbanBoard columns={columns} />
        </div>
      </div>
    </div>
  );
}

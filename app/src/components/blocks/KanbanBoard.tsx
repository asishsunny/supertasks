import type { ReactNode } from "react";

export interface KanbanColumn {
  status: string;
  label: string;
  count: number;
  statusIcon: ReactNode;
  cards: ReactNode[];
}

export interface KanbanBoardProps {
  columns?: KanbanColumn[];
}

const defaultColumns: KanbanColumn[] = [
  {
    status: "todo",
    label: "To Do",
    count: 6,
    statusIcon: (
      <span className="inline-block w-[15px] h-[15px] rounded-sm bg-ui-tag-neutral-icon" />
    ),
    cards: [],
  },
  {
    status: "in_progress",
    label: "In Progress",
    count: 5,
    statusIcon: (
      <span className="inline-block w-[15px] h-[15px] rounded-sm bg-ui-tag-blue-icon" />
    ),
    cards: [],
  },
  {
    status: "in_review",
    label: "In Review",
    count: 4,
    statusIcon: (
      <span className="inline-block w-[15px] h-[15px] rounded-sm bg-ui-tag-orange-icon" />
    ),
    cards: [],
  },
  {
    status: "done",
    label: "Done",
    count: 3,
    statusIcon: (
      <span className="inline-block w-[15px] h-[15px] rounded-sm bg-ui-tag-green-icon" />
    ),
    cards: [],
  },
];

export function KanbanBoard({
  columns = defaultColumns,
}: KanbanBoardProps) {
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
            <p className="text-ui-fg-muted txt-compact-medium">{col.count}</p>
          </div>
          {col.cards.map((card, i) => (
            <div key={i}>{card}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

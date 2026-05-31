// source: artifacts/transformed/recent-tasks-templatized.tsx
// adapt: card shell from transform, table delegated to TableView, generic props

import { TableView, type Column } from "@/components/views/TableView";

export interface RecentTasksProps<T> {
  title: string;
  columns: Column<T>[];
  data: T[];
  keyFn: (row: T) => string | number;
}

export function RecentTasks<T>({
  title,
  columns,
  data,
  keyFn,
}: RecentTasksProps<T>) {
  return (
    <div className="bg-ui-bg-base flex flex-col overflow-clip rounded-xl shadow-elevation-card-rest w-full">
      <div className="flex items-start pb-4 pt-6 px-6 w-full">
        <p className="text-ui-fg-base txt-compact-medium-plus">{title}</p>
      </div>
      <TableView data={data} columns={columns} keyFn={keyFn} />
    </div>
  );
}

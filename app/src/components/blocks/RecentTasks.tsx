// source: artifacts/transformed/recent-tasks-templatized.tsx
// built: data-repeat → .map(), hardcoded text → props, generic Column<T>

import type { ReactNode } from "react";
import { Table } from "@medusajs/ui";

export interface Column<T> {
  header: string;
  width?: string;
  render: (row: T) => ReactNode;
}

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
    <div className="bg-ui-bg-base flex flex-col overflow-clip rounded-xl shadow-elevation-card-rest w-full h-full">
      <div className="flex items-start pb-4 pt-6 px-6 w-full">
        <p className="text-ui-fg-base txt-compact-medium-plus">{title}</p>
      </div>
      <div className="overflow-x-auto w-full">
        <Table>
          <Table.Header className="border-t-0">
            <Table.Row>
              {columns.map((col) => (
                <Table.HeaderCell key={col.header || "__actions"} className={col.width}>
                  {col.header}
                </Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map((row) => (
              <Table.Row key={keyFn(row)}>
                {columns.map((col) => (
                  <Table.Cell key={col.header || "__actions"} className={col.width}>
                    {col.render(row)}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

// source: artifacts/transformed/recent-tasks-templatized.tsx

import { Table } from "@medusajs/ui";
import type { ReactNode } from "react";

export interface RecentTasksColumn<T extends RecentTasksRow = RecentTasksRow> {
  key: string;
  header: string;
  width?: string;
  render: (row: T) => ReactNode;
}

export interface RecentTasksRow {
  id: string | number;
}

export interface RecentTasksProps<T extends RecentTasksRow = RecentTasksRow> {
  title: string;
  columns: RecentTasksColumn<T>[];
  rows: T[];
}

export function RecentTasks<T extends RecentTasksRow>({
  title,
  columns,
  rows,
}: RecentTasksProps<T>) {
  return (
    <div className="bg-ui-bg-base flex flex-col overflow-clip rounded-xl shadow-elevation-card-rest w-full h-full">
      <div className="flex items-start overflow-clip pb-4 pt-6 px-6 w-full">
        <p className="text-ui-fg-base txt-compact-medium-plus">{title}</p>
      </div>
      <Table>
        <Table.Header className="border-t-0">
          <Table.Row>
            {columns.map((col) => (
              <Table.HeaderCell key={col.key} className={col.width}>
                {col.header}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((row) => (
            <Table.Row key={row.id}>
              {columns.map((col) => (
                <Table.Cell key={col.key} className={col.width}>
                  {col.render(row)}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

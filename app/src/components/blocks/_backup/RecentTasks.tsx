// source: artifacts/transformed/recent-tasks.tsx
// adapt: Table structure preserved, rows → props

"use client";

import { Table } from "@medusajs/ui";
import type { ReactNode } from "react";

interface Column {
  header: string;
  width?: string;
  render: (row: any) => ReactNode;
}

interface RecentTasksProps {
  columns: Column[];
  data: any[];
  keyFn: (row: any) => string | number;
}

export function RecentTasks({ columns, data, keyFn }: RecentTasksProps) {
  return (
    <div className="bg-ui-bg-base flex flex-col gap-0 overflow-clip p-0 relative rounded-xl shadow-elevation-card-rest w-full h-full">
      <div className="flex items-start overflow-clip pb-4 pt-6 px-6 relative shrink-0 w-full">
        <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
          Recent Tasks
        </p>
      </div>
      <Table>
        <Table.Header className="border-t-0">
          <Table.Row>
            {columns.map((col) => (
              <Table.HeaderCell key={col.header} className={col.width}>
                {col.header}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((row) => (
            <Table.Row key={keyFn(row)}>
              {columns.map((col) => (
                <Table.Cell key={col.header} className={col.width}>
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

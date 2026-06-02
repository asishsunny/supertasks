import { Table } from "@medusajs/ui";
import type { ReactNode } from "react";

interface Column {
  key: string;
  header: string;
  className?: string;
  render: (row: any) => ReactNode;
}

interface Row {
  id: string | number;
}

export interface RecentTasksProps {
  title: string;
  columns: Column[];
  rows: Row[];
}

export function RecentTasks({ title, columns, rows }: RecentTasksProps) {
  return (
    <div className="bg-ui-bg-base flex flex-col gap-0 overflow-clip p-0 rounded-xl shadow-elevation-card-rest w-full">
      <div className="flex items-start overflow-clip pb-4 pt-6 px-6 w-full">
        <p className="text-ui-fg-base txt-compact-medium-plus">{title}</p>
      </div>
      <Table>
        <Table.Header className="border-t-0">
          <Table.Row>
            {columns.map((col) => (
              <Table.HeaderCell key={col.key} className={col.className}>
                {col.header}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((row) => (
            <Table.Row key={row.id}>
              {columns.map((col) => (
                <Table.Cell key={col.key} className={col.className}>
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

export default RecentTasks;

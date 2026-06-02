import { Table, Badge, IconButton } from "@medusajs/ui";
import { EllipsisHorizontal } from "@medusajs/icons";
import type { ReactNode } from "react";

interface Column {
  key: string;
  header: string;
  width?: string;
  render: (row: any) => ReactNode;
}

interface Row {
  id: string | number;
}

export interface RecentTasksProps {
  title?: string;
  columns?: Column[];
  rows?: Row[];
}

const DEFAULT_TITLE = "Recent Tasks";

export function RecentTasks({
  title = DEFAULT_TITLE,
  columns,
  rows,
}: RecentTasksProps) {
  return (
<div className="bg-ui-bg-base flex flex-col gap-0 overflow-clip p-0 relative rounded-xl shadow-elevation-card-rest shrink-0 w-full">
  <div className="flex items-start overflow-clip pb-4 pt-6 px-6 relative shrink-0 w-full">
    <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
      {title}
    </p>
  </div>
  <Table>
    <Table.Header className="border-t-0">
      <Table.Row>
        {columns?.map((col) => (
          <Table.HeaderCell key={col.key} style={col.width ? { width: col.width } : undefined}>
            {col.header}
          </Table.HeaderCell>
        ))}
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {rows?.map((row) => (
        <Table.Row key={row.id}>
          {columns?.map((col) => (
            <Table.Cell key={col.key} style={col.width ? { width: col.width } : undefined}>
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

"use client";

// step 2: adapted from artifacts/transformed/recent-tasks.tsx
// Table import, columns/data driven via props

import { Badge, Button, Input, Label, Select, Table, Textarea, Avatar } from "@medusajs/ui";
import type { ReactNode } from "react";
import { ColorAvatar } from "@/components/ColorAvatar";

interface Column {
  header: string;
  width?: string;
  render: (row: any) => ReactNode;
}

interface RecentTasksProps {
  title?: string;
  columns: Column[];
  data: any[];
  keyFn: (row: any) => string | number;
}

export function RecentTasks({ title = "Recent Tasks", columns, data, keyFn }: RecentTasksProps) {
  return (
    <div className="bg-ui-bg-base flex flex-col overflow-clip rounded-xl shadow-elevation-card-rest w-full h-full">
      <div className="flex items-start overflow-clip pb-4 pt-6 px-6 w-full">
        <p className="text-ui-fg-base txt-compact-medium-plus">
          {title}
        </p>
      </div>
      <Table>
        <Table.Header className="border-t-0">
          <Table.Row>
            {columns.map((col) => (
              <Table.HeaderCell key={col.header} className={col.width}>{col.header}</Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((row) => (
            <Table.Row key={keyFn(row)}>
              {columns.map((col) => (
                <Table.Cell key={col.header} className={col.width}>{col.render(row)}</Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

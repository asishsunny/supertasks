"use client";

import { Table } from "@medusajs/ui";
import type { ReactNode } from "react";

export interface Column<T> {
  header: string;
  width?: string;
  render: (row: T) => ReactNode;
}

interface TableViewProps<T> {
  data: T[];
  columns: Column<T>[];
  keyFn: (row: T) => string | number;
}

export function TableView<T>({ data, columns, keyFn }: TableViewProps<T>) {
  return (
    <div className="overflow-x-auto w-full">
    <Table className="min-w-[800px] table-fixed">
      <Table.Header className="border-t-0">
        <Table.Row>
          {columns.map((col, i) => (
            <Table.HeaderCell key={col.header || `col-${i}`} className={`${col.width || ""} ${i === columns.length - 1 ? "pr-4" : ""}`}>
              {col.header}
            </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((row) => (
          <Table.Row key={keyFn(row)}>
            {columns.map((col, i) => (
              <Table.Cell key={col.header || `col-${i}`} className={`${col.width || ""} ${i === columns.length - 1 ? "pr-4" : ""}`}>
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

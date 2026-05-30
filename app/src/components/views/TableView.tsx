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
  );
}

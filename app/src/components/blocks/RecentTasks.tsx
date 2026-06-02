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
    // TODO: Agent fills from artifacts/transformed/recent-tasks.tsx
    <div>TODO</div>
  );
}

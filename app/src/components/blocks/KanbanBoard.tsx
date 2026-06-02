import { Badge } from "@medusajs/ui";
import type { ReactNode } from "react";

interface KanbanColumn {
  status: string;
  label: string;
  count: number;
  statusIcon: ReactNode;
  cards: ReactNode[];
}

export interface KanbanBoardProps {
  columns?: KanbanColumn[];
}

export function KanbanBoard({
  columns,
}: KanbanBoardProps) {
  return (
    // TODO: Agent fills from artifacts/transformed/kanban-board.tsx
    <div>TODO</div>
  );
}

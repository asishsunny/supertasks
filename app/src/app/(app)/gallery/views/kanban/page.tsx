"use client";

import { useId, useState, type ReactNode } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import { SquareGreySolid, SquareBlueSolid, SquareOrangeSolid, SquareGreenSolid } from "@medusajs/icons";
import { KanbanView, COLUMN_CLASSES } from "@/components/views/KanbanView";
import { KanbanCard } from "@/components/blocks/KanbanCard";
import { INITIAL_TASKS, MEMBERS } from "@/lib/data";
import { PRIORITY_COLOR, STATUS_LABEL } from "@/lib/constants";
import { formatDueDate, isOverdue } from "@/lib/utils";
import type { Task, Status } from "@/types";

const memberMap = new Map(MEMBERS.map((m) => [m.id, m]));
const STATUSES: Status[] = ["todo", "in_progress", "in_review", "done"];
const DOT_ICONS: Record<Status, React.ReactNode> = {
  todo: <SquareGreySolid className="w-[15px] h-[15px]" />,
  in_progress: <SquareBlueSolid className="w-[15px] h-[15px]" />,
  in_review: <SquareOrangeSolid className="w-[15px] h-[15px]" />,
  done: <SquareGreenSolid className="w-[15px] h-[15px]" />,
};

function DroppableColumn({ id, children }: { id: string; children: ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className={`${COLUMN_CLASSES} transition-colors ${isOver ? "bg-ui-bg-subtle-hover" : "bg-ui-bg-kanban-column"}`}>
      {children}
    </div>
  );
}

function DraggableCard({ id, children }: { id: string; children: ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
  const style = transform ? { transform: `translate(${transform.x}px, ${transform.y}px)`, opacity: isDragging ? 0.4 : 1 } : undefined;
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing touch-none">
      {children}
    </div>
  );
}

function renderCard(t: Task) {
  const m = memberMap.get(t.assignee)!;
  return (
    <KanbanCard
      title={t.title}
      desc={t.desc}
      member={m}
      name={m.name.split(" ")[0]}
      dueDate={formatDueDate(t.due)}
      overdue={isOverdue(t.due)}
      priorityLabel={t.priority.charAt(0).toUpperCase() + t.priority.slice(1)}
      priorityColor={PRIORITY_COLOR[t.priority]}
    />
  );
}

export default function KanbanGallery() {
  const dndId = useId();
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }), useSensor(KeyboardSensor));

  const columns = STATUSES.map((s) => {
    const items = tasks.filter((t) => t.status === s);
    return { key: s, dotIcon: DOT_ICONS[s], label: STATUS_LABEL[s], count: items.length, items };
  });

  const allItems = columns.flatMap((c) => c.items);
  const activeItem = activeId != null ? allItems.find((t) => String(t.id) === String(activeId)) : null;

  function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveId(null);
    if (!over) return;
    const fromCol = columns.find((c) => c.items.some((t) => String(t.id) === String(active.id)))?.key;
    const toCol = columns.find((c) => c.key === String(over.id))?.key
      ?? columns.find((c) => c.items.some((t) => String(t.id) === String(over.id)))?.key;
    if (fromCol && toCol && fromCol !== toCol) {
      setTasks((prev) => prev.map((t) => t.id === Number(active.id) ? { ...t, status: toCol as Status } : t));
    }
  }

  return (
    <DndContext id={dndId} sensors={sensors} onDragStart={(e: DragStartEvent) => setActiveId(e.active.id)} onDragEnd={handleDragEnd}>
      <KanbanView columns={columns} renderCard={renderCard} keyFn={(t) => t.id} columnWrapper={DroppableColumn} cardWrapper={DraggableCard} />
      <DragOverlay dropAnimation={null}>
        {activeItem ? <div className="rotate-2 scale-105 pointer-events-none">{renderCard(activeItem)}</div> : null}
      </DragOverlay>
    </DndContext>
  );
}

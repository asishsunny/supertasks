"use client";

import { type ReactNode, useState } from "react";
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

export interface KanbanColumn<T> {
  key: string;
  label: string;
  color: string;
  dotIcon: ReactNode;
  items: T[];
}

interface KanbanViewProps<T> {
  columns: KanbanColumn<T>[];
  renderCard: (item: T) => ReactNode;
  keyFn: (item: T) => string | number;
  onMove?: (itemKey: string | number, fromColumn: string, toColumn: string) => void;
}

function DroppableColumn({ id, children }: { id: string; children: ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className={`flex-1 flex flex-col gap-2 min-w-0 rounded-xl p-2 transition-colors ${
        isOver ? "bg-ui-bg-subtle-hover" : "bg-ui-bg-kanban-column"
      }`}
    >
      {children}
    </div>
  );
}

function DraggableCard({ id, children }: { id: string; children: ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)`, opacity: isDragging ? 0.4 : 1 }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing touch-none">
      {children}
    </div>
  );
}

export function KanbanView<T>({ columns, renderCard, keyFn, onMove }: KanbanViewProps<T>) {
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  const allItems = columns.flatMap((c) => c.items);
  const activeItem = activeId != null ? allItems.find((item) => String(keyFn(item)) === String(activeId)) : null;

  function findColumn(itemKey: string | number): string | undefined {
    return columns.find((c) => c.items.some((item) => String(keyFn(item)) === String(itemKey)))?.key;
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
    const { active, over } = event;
    if (!over || !onMove) return;

    const fromCol = findColumn(active.id);
    const overId = String(over.id);
    const toCol = columns.find((c) => c.key === overId)?.key ?? findColumn(overId);

    if (fromCol && toCol && fromCol !== toCol) {
      onMove(active.id, fromCol, toCol);
    }
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 w-full">
        {columns.map((col) => (
          <DroppableColumn key={col.key} id={col.key}>
            <div className="flex gap-1.5 items-center py-1 px-1">
              {col.dotIcon}
              <span className="txt-compact-medium-plus text-ui-fg-base">{col.label}</span>
              <div className="flex-1" />
              <span className="txt-compact-medium text-ui-fg-muted">{col.items.length}</span>
            </div>
            {col.items.map((item) => (
              <DraggableCard key={keyFn(item)} id={String(keyFn(item))}>
                {renderCard(item)}
              </DraggableCard>
            ))}
          </DroppableColumn>
        ))}
      </div>
      <DragOverlay dropAnimation={null}>
        {activeItem ? <div className="rotate-2 scale-105 pointer-events-none">{renderCard(activeItem)}</div> : null}
      </DragOverlay>
    </DndContext>
  );
}

"use client";

// source: artifacts/transformed/kanban-board.tsx (column subtree)
// step 2: split, columns → props/.map(), noise cleaned with context
// dnd-kit at view level per architecture: "KanbanView → dnd-kit"

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

interface KanbanColumnData<T> {
  key: string;
  dotIcon: ReactNode;
  label: string;
  count: number;
  items: T[];
}

interface KanbanBoardProps<T> {
  columns: KanbanColumnData<T>[];
  renderCard: (item: T) => ReactNode;
  keyFn: (item: T) => string | number;
  onMove?: (itemKey: string | number, fromColumn: string, toColumn: string) => void;
}

function DroppableColumn({ id, children }: { id: string; children: ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className={`flex flex-1 flex-col gap-2 h-full min-w-[1px] p-2 rounded-xl transition-colors ${
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

export function KanbanBoard<T>({ columns, renderCard, keyFn, onMove }: KanbanBoardProps<T>) {
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
    <DndContext
      sensors={sensors}
      onDragStart={(e: DragStartEvent) => setActiveId(e.active.id)}
      onDragEnd={handleDragEnd}
    >
      {/* outer wrapper: all classes from transform */}
      <div className="flex gap-4 items-start w-full h-full">
        {columns.map((col) => (
          <DroppableColumn key={col.key} id={col.key}>
            {/* header: from transform */}
            <div className="flex gap-1.5 items-center py-1 w-full">
              {col.dotIcon}
              <p className="text-ui-fg-base txt-compact-medium-plus">
                {col.label}
              </p>
              <div className="flex-1 h-px min-w-[1px]" />
              <p className="text-ui-fg-muted txt-compact-medium">
                {col.count}
              </p>
            </div>
            {/* cards: wrapped in DraggableCard */}
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

// source: artifacts/transformed/kanban-board-templatized.tsx (view extract)
import type { ReactNode } from "react";

export interface KanbanColumnData<T> {
  key: string;
  dotIcon: ReactNode;
  label: string;
  count: number;
  items: T[];
}

export interface KanbanViewProps<T> {
  columns: KanbanColumnData<T>[];
  renderCard: (item: T) => ReactNode;
  keyFn: (item: T) => string | number;
  columnWrapper?: (props: { id: string; children: ReactNode }) => ReactNode;
  cardWrapper?: (props: { id: string; children: ReactNode }) => ReactNode;
}

/** Shared column classes — exported for section wrappers (e.g. DroppableColumn). */
export const COLUMN_CLASSES =
  "flex flex-1 flex-col gap-2 h-full min-w-[1px] p-2 rounded-xl";

export function KanbanView<T>({
  columns,
  renderCard,
  keyFn,
  columnWrapper,
  cardWrapper,
}: KanbanViewProps<T>) {
  return (
    <div className="flex gap-4 items-start w-full h-full overflow-x-auto">
      {columns.map((col) => {
        const inner = (
          <>
            <div className="flex gap-1.5 items-center overflow-clip py-1 w-full">
              {col.dotIcon}
              <p className="text-ui-fg-base txt-compact-medium-plus">
                {col.label}
              </p>
              <div className="flex-1 min-w-[1px]" />
              <p className="text-ui-fg-muted txt-compact-medium">{col.count}</p>
            </div>
            {col.items.map((item) => {
              const key = String(keyFn(item));
              const card = renderCard(item);
              return cardWrapper ? (
                <span key={key}>{cardWrapper({ id: key, children: card })}</span>
              ) : (
                <span key={key}>{card}</span>
              );
            })}
          </>
        );

        return columnWrapper ? (
          <span key={col.key} className="flex flex-1 min-w-[1px]">
            {columnWrapper({ id: col.key, children: inner })}
          </span>
        ) : (
          <div
            key={col.key}
            className={`${COLUMN_CLASSES} bg-ui-bg-kanban-column`}
          >
            {inner}
          </div>
        );
      })}
    </div>
  );
}

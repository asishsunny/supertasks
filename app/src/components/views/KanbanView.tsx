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

/** Shared column classes — reused by section's DroppableColumn for consistent styling. */
export const COLUMN_CLASSES =
  "flex flex-1 flex-col gap-2 h-full min-w-[1px] p-2 rounded-xl";

export function KanbanView<T>({
  columns,
  renderCard,
  keyFn,
  columnWrapper,
  cardWrapper,
}: KanbanViewProps<T>) {
  const ColWrap =
    columnWrapper ??
    (({ children }: { id: string; children: ReactNode }) => (
      <div className={`${COLUMN_CLASSES} bg-ui-bg-kanban-column`}>
        {children}
      </div>
    ));
  const CardWrap =
    cardWrapper ??
    (({ children }: { id: string; children: ReactNode }) => <>{children}</>);

  return (
    <div className="flex gap-4 items-start w-full h-full overflow-x-auto">
      {columns.map((col) => (
        <ColWrap key={col.key} id={col.key}>
          <div className="flex gap-1.5 items-center overflow-clip py-1 w-full">
            {col.dotIcon}
            <p className="text-ui-fg-base txt-compact-medium-plus">
              {col.label}
            </p>
            <div className="flex-1 h-px min-w-[1px]" />
            <p className="text-ui-fg-muted txt-compact-medium">{col.count}</p>
          </div>
          {col.items.map((item) => {
            const k = keyFn(item);
            return (
              <CardWrap key={k} id={String(k)}>
                {renderCard(item)}
              </CardWrap>
            );
          })}
        </ColWrap>
      ))}
    </div>
  );
}

import type { ReactNode } from "react";

export interface KanbanColumnData<T> {
  key: string;
  dotIcon: ReactNode;
  label: string;
  count: number;
  items: T[];
}

interface KanbanViewProps<T> {
  columns: KanbanColumnData<T>[];
  renderCard: (item: T) => ReactNode;
  keyFn: (item: T) => string | number;
  columnWrapper?: (props: { id: string; children: ReactNode }) => ReactNode;
  cardWrapper?: (props: { id: string; children: ReactNode }) => ReactNode;
}

export const COLUMN_CLASSES = "flex flex-1 flex-col gap-2 h-full min-w-[220px] p-2 rounded-xl";

export function KanbanView<T>({
  columns,
  renderCard,
  keyFn,
  columnWrapper: ColumnWrap,
  cardWrapper: CardWrap,
}: KanbanViewProps<T>) {
  return (
    <div className="flex gap-4 items-start w-full h-full overflow-x-auto">
      {columns.map((col) => {
        const content = (
          <>
            <div className="flex gap-1.5 items-center overflow-clip py-1 w-full">
              {col.dotIcon}
              <p className="text-ui-fg-base txt-compact-medium-plus">
                {col.label}
              </p>
              <div className="flex-1" />
              <p className="text-ui-fg-muted txt-compact-medium">
                {col.count}
              </p>
            </div>
            {col.items.map((item) => {
              const card = renderCard(item);
              return CardWrap
                ? <CardWrap key={keyFn(item)} id={String(keyFn(item))}>{card}</CardWrap>
                : <div key={keyFn(item)}>{card}</div>;
            })}
          </>
        );

        return ColumnWrap
          ? <ColumnWrap key={col.key} id={col.key}>{content}</ColumnWrap>
          : <div key={col.key} className={`bg-ui-bg-kanban-column ${COLUMN_CLASSES}`}>{content}</div>;
      })}
    </div>
  );
}

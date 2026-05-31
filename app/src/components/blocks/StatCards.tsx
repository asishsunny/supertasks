export interface StatCardItem {
  label: string;
  value: number;
  error?: boolean;
}

export interface StatCardsProps {
  items: StatCardItem[];
}

export function StatCards({ items }: StatCardsProps) {
  return (
    <div className="flex gap-4 items-start w-full">
      {items.map((item) => (
        <div
          key={item.label}
          className={`bg-ui-bg-base flex flex-1 flex-col gap-4 min-w-[1px] overflow-clip p-6 rounded-xl shadow-elevation-card-rest ${
            item.error ? "text-ui-fg-error" : "text-ui-fg-base"
          }`}
        >
          <p className="txt-compact-medium-plus">{item.label}</p>
          <p className="text-[32px] leading-[44px] tracking-[-0.16px] font-normal">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}

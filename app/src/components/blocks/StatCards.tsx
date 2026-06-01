// source: artifacts/transformed/stat-cards-templatized.tsx

export interface StatCardItem {
  label: string;
  value: string | number;
}

export interface StatCardsProps {
  cards: StatCardItem[];
}

export function StatCards({ cards }: StatCardsProps) {
  return (
    <div className="flex gap-4 items-start w-full">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-ui-bg-base flex flex-1 flex-col gap-4 min-w-[1px] overflow-clip p-6 rounded-xl shadow-elevation-card-rest text-ui-fg-base"
        >
          <p className="txt-compact-medium-plus">{card.label}</p>
          <p className="text-[32px] leading-[44px] tracking-[-0.16px]">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}

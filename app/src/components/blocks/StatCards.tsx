export interface StatCardItem {
  label: string;
  value: string;
}

export interface StatCardsProps {
  cards: StatCardItem[];
}

export default function StatCards({ cards }: StatCardsProps) {
  return (
    <div className="flex gap-4 items-start w-full">
      {cards.map((card, i) => (
        <div
          key={i}
          className="bg-ui-bg-base flex flex-1 flex-col gap-4 min-w-[1px] overflow-clip p-6 rounded-xl shadow-elevation-card-rest text-ui-fg-base"
        >
          <p className="txt-compact-medium-plus">{card.label}</p>
          <p className="text-[32px] leading-[44px] tracking-[-0.16px] font-normal">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}

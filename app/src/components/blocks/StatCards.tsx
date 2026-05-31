export interface StatCard {
  label: string;
  value: string | number;
  error?: boolean;
}

export interface StatCardsProps {
  cards: StatCard[];
}

export function StatCards({ cards }: StatCardsProps) {
  return (
    <div className="flex gap-4 items-start w-full">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-ui-bg-base flex flex-1 flex-col gap-4 min-w-0 overflow-clip p-6 rounded-xl shadow-elevation-card-rest"
        >
          <p className="txt-compact-medium-plus text-ui-fg-base">
            {card.label}
          </p>
          <p
            className={`text-[32px] leading-[44px] tracking-[-0.16px] font-normal ${
              card.error ? "text-ui-fg-error" : "text-ui-fg-base"
            }`}
          >
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}

interface CardItem {
  label: string;
  value: string;
  error?: boolean;
}

export interface StatCardsProps {
  cards: CardItem[];
}

export default function StatCards({ cards }: StatCardsProps) {
  return (
    <div className="flex gap-4 items-start w-full">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`bg-ui-bg-base flex flex-1 flex-col gap-4 min-w-[1px] overflow-clip p-6 rounded-xl shadow-elevation-card-rest${
            card.error ? "" : " text-ui-fg-base"
          }`}
        >
          <p className={`txt-compact-medium-plus${card.error ? " text-ui-fg-base" : ""}`}>
            {card.label}
          </p>
          <p
            className={`text-[32px] leading-[44px] tracking-[-0.16px] font-normal${
              card.error ? " text-ui-fg-error" : ""
            }`}
          >
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}

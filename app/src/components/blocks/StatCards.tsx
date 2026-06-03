/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface StatCardItem {
  label: string;
  value: string | number;
}

export interface StatCardsProps {
  cards?: StatCardItem[];
}

/* ------------------------------------------------------------------ */
/*  Default Figma data (one representative item from template)         */
/* ------------------------------------------------------------------ */

const DEFAULT_CARDS: StatCardItem[] = [
  { label: "Total Tasks", value: 18 },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function StatCards({ cards = DEFAULT_CARDS }: StatCardsProps) {
  return (
    <div className="flex gap-4 items-start relative shrink-0 w-full">
      {cards.map((card, i) => (
        <div
          key={i}
          className="bg-ui-bg-base flex flex-1 flex-col gap-4 min-w-[1px] overflow-clip p-6 relative rounded-xl shadow-elevation-card-rest text-ui-fg-base"
        >
          <p className="relative shrink-0 txt-compact-medium-plus">
            {card.label}
          </p>
          <p className="relative shrink-0 text-[32px] leading-[44px] tracking-[-0.16px] font-normal">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}

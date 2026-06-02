interface CardItem {
  label: string;
  value: string;
}

export interface StatCardsProps {
  cards?: CardItem[];
}

const DEFAULT_CARDS: CardItem[] = [
  {
    label: "Total Tasks",
    value: "18"
  },
  {
    label: "In Progress",
    value: "5"
  },
  {
    label: "Completed",
    value: "3"
  },
  {
    label: "Overdue",
    value: "5"
  }
];

export const DASHBOARD_CARDS: CardItem[] = [
  {
    label: "Total Tasks",
    value: "18"
  },
  {
    label: "In Progress",
    value: "5"
  },
  {
    label: "Completed",
    value: "3"
  },
  {
    label: "Overdue",
    value: "5"
  }
];
export const REPORTS_CARDS: CardItem[] = [
  {
    label: "Total reports",
    value: "6"
  },
  {
    label: "Flagged overdue",
    value: "4"
  },
  {
    label: "Avg per month",
    value: "2"
  },
  {
    label: "Last generated",
    value: "May 7"
  }
];

export default function StatCards({
  cards = DEFAULT_CARDS,
}: StatCardsProps) {
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

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

export default function StatCards({
  cards = DEFAULT_CARDS,
}: StatCardsProps) {
  return (
    // TODO: Agent fills from artifacts/transformed/stat-cards.tsx
    <div>TODO</div>
  );
}

interface BarRow {
  label: string;
  count: number;
  color: string;
}

interface ChartCard {
  title: string;
  rows: BarRow[];
  total: number;
}

export interface ChartCardsProps {
  charts?: ChartCard[];
}

const DEFAULT_CHARTS: ChartCard[] = [
  {
    title: "Tasks by Priority",
    rows: [],
    total: 0
  },
  {
    title: "Tasks by Status",
    rows: [],
    total: 0
  }
];

export function ChartCards({
  charts = DEFAULT_CHARTS,
}: ChartCardsProps) {
  return (
    // TODO: Agent fills from artifacts/transformed/chart-cards.tsx
    <div>TODO</div>
  );
}

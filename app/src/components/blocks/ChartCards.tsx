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
  const maxCount = Math.max(...charts.flatMap((c) => c.rows.map((r) => r.count)), 1);

  return (
    <div className="flex gap-4 items-start relative shrink-0 w-full">
      {charts.map((chart, ci) => (
        <div
          key={ci}
          className="bg-ui-bg-base flex flex-1 flex-col gap-4 min-w-[1px] overflow-clip p-6 relative rounded-xl shadow-elevation-card-rest"
        >
          <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
            {chart.title}
          </p>
          <div className="flex flex-col gap-4 relative shrink-0 w-full">
            {chart.rows.map((row, ri) => (
              <div key={ri} className="flex flex-col gap-1 relative shrink-0 w-full">
                <div className="flex gap-2 items-center relative shrink-0 w-full">
                  <p className="relative shrink-0 text-ui-fg-subtle w-[88px] txt-compact-small">
                    {row.label}
                  </p>
                  <div className="bg-ui-border-base flex-1 h-2 min-w-[1px] overflow-clip relative rounded">
                    <div
                      className="absolute h-2 left-0 rounded top-0"
                      style={{
                        backgroundColor: row.color,
                        width: `${Math.round((row.count / maxCount) * 100)}%`,
                      }}
                    />
                  </div>
                  <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">
                    {row.count}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

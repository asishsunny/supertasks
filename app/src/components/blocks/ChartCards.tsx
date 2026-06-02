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
  charts: ChartCard[];
}

export function ChartCards({ charts }: ChartCardsProps) {
  return (
    <div className="flex gap-4 items-start w-full">
      {charts.map((chart, ci) => (
        <div
          key={ci}
          className="bg-ui-bg-base flex flex-1 flex-col gap-4 min-w-[1px] overflow-clip p-6 rounded-xl shadow-elevation-card-rest"
        >
          <p className="text-ui-fg-base txt-compact-medium-plus">
            {chart.title}
          </p>
          <div className="flex flex-col gap-4 w-full">
            {chart.rows.map((row, ri) => {
              const maxCount = Math.max(...chart.rows.map((r) => r.count));
              const pct = maxCount > 0 ? (row.count / maxCount) * 100 : 0;
              return (
                <div key={ri} className="flex flex-col gap-1 w-full">
                  <div className="flex gap-2 items-center w-full">
                    <p className="text-ui-fg-subtle w-[88px] txt-compact-small">
                      {row.label}
                    </p>
                    <div className="bg-ui-border-base flex-1 h-2 min-w-[1px] overflow-clip rounded">
                      <div
                        className="h-2 rounded"
                        style={{
                          backgroundColor: row.color,
                          width: `${pct}%`,
                        }}
                      />
                    </div>
                    <p className="text-ui-fg-base txt-compact-small-plus">
                      {row.count}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

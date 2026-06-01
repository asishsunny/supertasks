// source: artifacts/transformed/chart-cards-templatized.tsx
// data-repeat="2" → charts.map, data-repeat="4" → rows.map
// bg-[#a78bfa] + w-[89px] → dynamic color + percentage width via props

export interface BarRowData {
  label: string;
  count: number;
  color: string;
}

export interface ChartCardData {
  title: string;
  rows: BarRowData[];
  total: number;
}

export interface ChartCardsProps {
  charts: ChartCardData[];
}

export function ChartCards({ charts }: ChartCardsProps) {
  return (
    <div className="flex gap-4 items-start w-full h-full">
      {charts.map((chart) => (
        <div
          key={chart.title}
          className="bg-ui-bg-base flex flex-1 flex-col gap-4 min-w-[1px] overflow-clip p-6 rounded-xl shadow-elevation-card-rest"
        >
          <p className="text-ui-fg-base txt-compact-medium-plus">
            {chart.title}
          </p>
          <div className="flex flex-col gap-4 w-full">
            {chart.rows.map((row) => (
              <div key={row.label} className="flex flex-col gap-1 w-full">
                <div className="flex gap-2 items-center w-full">
                  <p className="text-ui-fg-subtle w-[88px] txt-compact-small">
                    {row.label}
                  </p>
                  <div className="bg-ui-border-base flex-1 h-2 min-w-[1px] overflow-clip rounded">
                    <div
                      className="absolute h-2 left-0 rounded top-0"
                      style={{
                        width: `${chart.total > 0 ? (row.count / chart.total) * 100 : 0}%`,
                        backgroundColor: row.color,
                      }}
                    />
                  </div>
                  <p className="text-ui-fg-base txt-compact-small-plus">
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

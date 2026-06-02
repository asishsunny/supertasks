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

const defaultCharts: ChartCard[] = [
  {
    title: "Tasks by Priority",
    total: 18,
    rows: [
      { label: "Critical", count: 4, color: "bg-[#a78bfa]" },
      { label: "High", count: 5, color: "bg-[#f43f5e]" },
      { label: "Medium", count: 6, color: "bg-[#f97316]" },
      { label: "Low", count: 3, color: "bg-[#a4aaa1]" },
    ],
  },
  {
    title: "Tasks by Status",
    total: 18,
    rows: [
      { label: "To Do", count: 6, color: "bg-[#a4aaa1]" },
      { label: "In Progress", count: 5, color: "bg-[#60a5fa]" },
      { label: "In Review", count: 4, color: "bg-[#f97316]" },
      { label: "Done", count: 3, color: "bg-[#10b981]" },
    ],
  },
];

export function ChartCards({ charts = defaultCharts }: ChartCardsProps) {
  return (
    <div className="flex gap-4 items-start w-full">
      {charts.map((chart) => {
        const maxCount = Math.max(...chart.rows.map((r) => r.count), 1);
        return (
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
                        className={`${row.color} h-2 rounded`}
                        style={{
                          width: `${Math.round((row.count / maxCount) * 100)}%`,
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
        );
      })}
    </div>
  );
}

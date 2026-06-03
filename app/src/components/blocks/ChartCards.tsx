interface ChartBarRow {
  label: string
  count: number
  color: string
}

interface ChartCardData {
  title: string
  rows: ChartBarRow[]
  total: number
}

export interface ChartCardsProps {
  charts?: ChartCardData[]
}

const defaultCharts: ChartCardData[] = [
  {
    title: "Tasks by Priority",
    rows: [
      { label: "Critical", count: 4, color: "#a78bfa" },
      { label: "High", count: 6, color: "#f87171" },
      { label: "Medium", count: 8, color: "#fbbf24" },
      { label: "Low", count: 3, color: "#34d399" },
    ],
    total: 21,
  },
  {
    title: "Tasks by Status",
    rows: [
      { label: "To Do", count: 6, color: "#a4aaa1" },
      { label: "In Progress", count: 5, color: "#60a5fa" },
      { label: "In Review", count: 4, color: "#c084fc" },
      { label: "Done", count: 7, color: "#34d399" },
    ],
    total: 22,
  },
]

export function ChartCards({ charts = defaultCharts }: ChartCardsProps) {
  return (
    <div className="flex gap-4 items-start relative shrink-0 w-full">
      {charts.map((chart, ci) => {
        const maxCount = Math.max(...chart.rows.map((r) => r.count), 1)
        return (
          <div
            key={ci}
            className="bg-ui-bg-base flex flex-1 flex-col gap-4 min-w-[1px] overflow-clip p-6 relative rounded-xl shadow-elevation-card-rest"
          >
            <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
              {chart.title}
            </p>
            <div className="flex flex-col gap-4 relative shrink-0 w-full">
              {chart.rows.map((row, ri) => (
                <div
                  key={ri}
                  className="flex flex-col gap-1 relative shrink-0 w-full"
                >
                  <div className="flex gap-2 items-center relative shrink-0 w-full">
                    <p className="relative shrink-0 text-ui-fg-subtle w-[88px] txt-compact-small">
                      {row.label}
                    </p>
                    <div className="bg-ui-border-base flex-1 h-2 min-w-[1px] overflow-clip relative rounded">
                      <div
                        className="absolute h-2 left-0 rounded top-0"
                        style={{
                          backgroundColor: row.color,
                          width: `${(row.count / maxCount) * 100}%`,
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
        )
      })}
    </div>
  )
}

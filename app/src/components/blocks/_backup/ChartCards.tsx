// source: artifacts/transformed/chart-cards.tsx
// adapt: hardcoded rows → props, hardcoded bar widths → percentage

import type { ReactNode } from "react";

interface BarRowData {
  label: string;
  count: number;
  color: string;
}

interface ChartCardData {
  title: string;
  rows: BarRowData[];
  total: number;
}

export function ChartCards({ charts }: { charts: ChartCardData[] }) {
  return (
    <div className="flex gap-4 items-start relative w-full h-full">
      {charts.map((chart) => (
        <div key={chart.title} className="bg-ui-bg-base flex flex-1 flex-col gap-4 min-w-[1px] overflow-clip p-6 relative rounded-xl shadow-elevation-card-rest">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
            {chart.title}
          </p>
          <div className="flex flex-col gap-4 relative shrink-0 w-full">
            {chart.rows.map((row) => (
              <div key={row.label} className="flex flex-col gap-1 relative shrink-0 w-full">
                <div className="flex gap-2 items-center relative shrink-0 w-full">
                  <p className="relative shrink-0 text-ui-fg-subtle w-[88px] txt-compact-small">
                    {row.label}
                  </p>
                  <div className="bg-ui-border-base flex-1 h-2 min-w-[1px] overflow-clip relative rounded">
                    <div
                      className="absolute h-2 left-0 rounded top-0"
                      style={{ width: `${chart.total > 0 ? (row.count / chart.total) * 100 : 0}%`, backgroundColor: row.color }}
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

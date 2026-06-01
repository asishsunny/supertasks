// source: artifacts/transformed/chart-cards-templatized.tsx

export interface BarItem {
  key: string;
  label: string;
  count: number;
  color: string;
}

export interface ChartCardData {
  title: string;
  bars: BarItem[];
}

interface ChartCardsProps {
  cards: ChartCardData[];
  total: number;
}

function BarRow({ label, count, total, color }: { label: string; count: number; total: number; color: string }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex gap-2 items-center w-full">
        <p className="text-ui-fg-subtle w-[88px] txt-compact-small">{label}</p>
        <div className="bg-ui-border-base flex-1 h-2 min-w-[1px] overflow-clip rounded relative">
          <div
            className="absolute h-2 left-0 rounded top-0"
            style={{ width: `${pct}%`, backgroundColor: color }}
          />
        </div>
        <p className="text-ui-fg-base txt-compact-small-plus">{count}</p>
      </div>
    </div>
  );
}

export function ChartCards({ cards, total }: ChartCardsProps) {
  return (
    <div className="flex gap-4 items-start w-full">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-ui-bg-base flex flex-1 flex-col gap-4 min-w-[1px] overflow-clip p-6 rounded-xl shadow-elevation-card-rest"
        >
          <p className="text-ui-fg-base txt-compact-medium-plus">{card.title}</p>
          <div className="flex flex-col gap-4 w-full">
            {card.bars.map((bar) => (
              <BarRow
                key={bar.key}
                label={bar.label}
                count={bar.count}
                total={total}
                color={bar.color}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

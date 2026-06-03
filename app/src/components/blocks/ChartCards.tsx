/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface ChartBarItem {
  label: string;
  value: number;
  color: string;
  /** Max value used to compute bar width proportion (defaults to total) */
}

export interface ChartCardData {
  title: string;
  bars: ChartBarItem[];
}

export interface ChartCardsProps {
  cards?: ChartCardData[];
}

/* ------------------------------------------------------------------ */
/*  Defaults (one representative item per Figma template)              */
/* ------------------------------------------------------------------ */

const defaultCards: ChartCardData[] = [
  {
    title: "Tasks by Priority",
    bars: [
      { label: "Critical", value: 4, color: "var(--tag-purple-icon)" },
    ],
  },
  {
    title: "Tasks by Status",
    bars: [
      { label: "To Do", value: 6, color: "var(--tag-neutral-icon)" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ChartCards({ cards = defaultCards }: ChartCardsProps) {
  return (
    <div className="flex gap-4 items-start relative shrink-0 w-full">
      {cards.map((card) => {
        const maxVal = Math.max(...card.bars.map((b) => b.value), 1);
        return (
          <div
            key={card.title}
            className="bg-ui-bg-base flex flex-1 flex-col gap-4 min-w-[1px] overflow-clip p-6 relative rounded-xl shadow-elevation-card-rest"
          >
            <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
              {card.title}
            </p>
            <div className="flex flex-col gap-4 relative shrink-0 w-full">
              {card.bars.map((bar) => (
                <div
                  key={bar.label}
                  className="flex flex-col gap-1 relative shrink-0 w-full"
                >
                  <div className="flex gap-2 items-center relative shrink-0 w-full">
                    <p className="relative shrink-0 text-ui-fg-subtle w-[88px] txt-compact-small">
                      {bar.label}
                    </p>
                    <div className="bg-ui-border-base flex-1 h-2 min-w-[1px] overflow-clip relative rounded">
                      <div
                        className="absolute h-2 left-0 rounded top-0"
                        style={{
                          backgroundColor: bar.color,
                          width: `${(bar.value / maxVal) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">
                      {bar.value}
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

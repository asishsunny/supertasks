// source: artifacts/transformed/stat-cards.tsx
// adapt: hardcoded values → props

interface StatCardData {
  label: string;
  value: string | number;
  error?: boolean;
}

export function StatCards({ cards }: { cards: StatCardData[] }) {
  return (
    <div className="flex gap-4 items-start relative w-full h-full">
      {cards.map((c) => (
        <div key={c.label} className="bg-ui-bg-base flex flex-1 flex-col gap-4 min-w-[1px] overflow-clip p-6 relative rounded-xl shadow-elevation-card-rest text-ui-fg-base">
          <p className="relative shrink-0 txt-compact-medium-plus">
            {c.label}
          </p>
          <p className={`relative shrink-0 text-[32px] leading-[44px] tracking-[-0.16px] font-normal ${c.error ? "text-ui-fg-error" : ""}`}>
            {c.value}
          </p>
        </div>
      ))}
    </div>
  );
}

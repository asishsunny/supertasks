export default function ChartCards() {
  return <div className="flex gap-4 items-start relative w-full h-full">
      {cards.map((card, index) => <div className="bg-ui-bg-base flex flex-1 flex-col gap-4 min-w-[1px] overflow-hidden p-6 relative rounded-xl shadow-elevation-card-rest" key={index}>
        <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">{card.title}</p>
        <div className="flex flex-col gap-4 relative shrink-0 w-full">
          {card.rows.map((row, index) => <div className="flex flex-col gap-1 relative shrink-0 w-full" key={index}>
            <div className="flex gap-2 items-center relative shrink-0 w-full">
              <p className="relative shrink-0 text-ui-fg-subtle w-[88px] txt-compact-small">{row.color}</p>
              <div className="bg-ui-border-base flex-1 h-2 min-w-[1px] overflow-clip relative rounded">
                <div className="absolute h-2 left-0 rounded top-0" style={{
                backgroundColor: BAR_COLORS_ALL[row.color],
                width: `${Math.round(row.count / DATA.total * 100)}%`
              }} />
              </div>
              <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">{row.count}</p>
            </div>
          </div>)}
          
          
          
        </div>
      </div>)}
      
    </div>;
}
export default function StatCards() {
  return <div className="flex gap-4 items-start relative w-full h-full">
      {cards.map((card, index) => <div className="bg-ui-bg-base flex flex-1 flex-col gap-4 min-w-[1px] overflow-hidden p-6 relative rounded-xl shadow-elevation-card-rest text-ui-fg-base" key={index}>
        <p className="relative shrink-0 txt-compact-medium-plus">{card.label}</p>
        <p className="relative shrink-0 text-[32px] leading-[44px] tracking-[-0.16px] font-normal">{card.value}</p>
      </div>)}
      
      
      
    </div>;
}
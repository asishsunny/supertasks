export default function StatCards() {
  return <div className="flex gap-4 items-start relative w-full h-full">
      <div className="bg-ui-bg-base flex flex-1 flex-col gap-4 min-w-[1px] overflow-clip p-6 relative rounded-xl shadow-elevation-card-rest text-ui-fg-base">
        <p className="relative shrink-0 txt-compact-medium-plus">
          Total Tasks
        </p>
        <p className="relative shrink-0 text-[32px] leading-[44px] tracking-[-0.16px] font-normal">
          18
        </p>
      </div>
      <div className="bg-ui-bg-base flex flex-1 flex-col gap-4 min-w-[1px] overflow-clip p-6 relative rounded-xl shadow-elevation-card-rest text-ui-fg-base">
        <p className="relative shrink-0 txt-compact-medium-plus">
          In Progress
        </p>
        <p className="relative shrink-0 text-[32px] leading-[44px] tracking-[-0.16px] font-normal">
          6
        </p>
      </div>
      <div className="bg-ui-bg-base flex flex-1 flex-col gap-4 min-w-[1px] overflow-clip p-6 relative rounded-xl shadow-elevation-card-rest text-ui-fg-base">
        <p className="relative shrink-0 txt-compact-medium-plus">
          Completed
        </p>
        <p className="relative shrink-0 text-[32px] leading-[44px] tracking-[-0.16px] font-normal">
          2
        </p>
      </div>
      <div className="bg-ui-bg-base flex flex-1 flex-col gap-4 min-w-[1px] overflow-clip p-6 relative rounded-xl shadow-elevation-card-rest">
        <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
          Overdue
        </p>
        <p className="relative shrink-0 text-ui-fg-error text-[32px] leading-[44px] tracking-[-0.16px] font-normal">
          5
        </p>
      </div>
    </div>;
}
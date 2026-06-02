export default function StatCards1() {
  return <div className="flex gap-4 items-start relative shrink-0 w-full">
        <div className="bg-ui-bg-base flex flex-1 flex-col gap-4 min-w-[1px] overflow-clip p-6 relative rounded-xl shadow-elevation-card-rest text-ui-fg-base" data-repeat="4">
          <p className="relative shrink-0 txt-compact-medium-plus">
            Total reports
          </p>
          <p className="relative shrink-0 text-[32px] leading-[44px] tracking-[-0.16px] font-normal">
            6
          </p>
        </div>
        <div className="bg-ui-bg-base flex flex-1 flex-col gap-4 min-w-[1px] overflow-clip p-6 relative rounded-xl shadow-elevation-card-rest">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
            Flagged overdue
          </p>
          <p className="relative shrink-0 text-ui-fg-error text-[32px] leading-[44px] tracking-[-0.16px] font-normal">
            4
          </p>
        </div>
        <div className="bg-ui-bg-base flex flex-1 flex-col gap-4 min-w-[1px] overflow-clip p-6 relative rounded-xl shadow-elevation-card-rest text-ui-fg-base">
          <p className="relative shrink-0 txt-compact-medium-plus">
            Avg per month
          </p>
          <p className="relative shrink-0 text-[32px] leading-[44px] tracking-[-0.16px] font-normal">
            2
          </p>
        </div>
        <div className="bg-ui-bg-base flex flex-1 flex-col gap-4 min-w-[1px] overflow-clip p-6 relative rounded-xl shadow-elevation-card-rest text-ui-fg-base">
          <p className="relative shrink-0 txt-compact-medium-plus">
            Last generated
          </p>
          <p className="relative shrink-0 text-[32px] leading-[44px] tracking-[-0.16px] font-normal">
            May 7
          </p>
        </div>
      </div>;
}
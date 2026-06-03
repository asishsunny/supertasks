export default function StatCards() {
  return <div className="flex gap-4 items-start relative shrink-0 w-full">
        <Card title="Total Tasks" memberName="18" data-repeat="4" />
        <div className="bg-ui-bg-base flex flex-1 flex-col gap-4 min-w-[1px] overflow-clip p-6 relative rounded-xl shadow-elevation-card-rest text-ui-fg-base">
          <p className="relative shrink-0 txt-compact-medium-plus">
            In Progress
          </p>
          <p className="relative shrink-0 text-[32px] leading-[44px] tracking-[-0.16px] font-normal">
            5
          </p>
        </div>
        <div className="bg-ui-bg-base flex flex-1 flex-col gap-4 min-w-[1px] overflow-clip p-6 relative rounded-xl shadow-elevation-card-rest text-ui-fg-base">
          <p className="relative shrink-0 txt-compact-medium-plus">
            Completed
          </p>
          <p className="relative shrink-0 text-[32px] leading-[44px] tracking-[-0.16px] font-normal">
            3
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
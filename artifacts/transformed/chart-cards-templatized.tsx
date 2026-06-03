export default function ChartCards() {
  return <div className="flex gap-4 items-start relative shrink-0 w-full">
        <div className="bg-ui-bg-base flex flex-1 flex-col gap-4 min-w-[1px] overflow-clip p-6 relative rounded-xl shadow-elevation-card-rest" data-repeat="2">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
            Tasks by Priority
          </p>
          <div className="flex flex-col gap-4 relative shrink-0 w-full">
            <div className="flex flex-col gap-1 relative shrink-0 w-full" data-repeat="4" data-repeat="2">
              <div className="flex gap-2 items-center relative shrink-0 w-full">
                <p className="relative shrink-0 text-ui-fg-subtle w-[88px] txt-compact-small">
                  Critical
                </p>
                <div className="bg-ui-border-base flex-1 h-2 min-w-[1px] overflow-clip relative rounded">
                  <div className="absolute bg-[#a78bfa] h-2 left-0 rounded top-0 w-[89px]" />
                </div>
                <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">
                  4
                </p>
              </div>
            </div>
            
            
            
          </div>
        </div>
        <div className="bg-ui-bg-base flex flex-1 flex-col gap-4 min-w-[1px] overflow-clip p-6 relative rounded-xl shadow-elevation-card-rest">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
            Tasks by Status
          </p>
          <div className="flex flex-col gap-4 relative shrink-0 w-full">
            <div className="flex flex-col gap-1 relative shrink-0 w-full" data-repeat="4" data-repeat="2">
              <div className="flex gap-2 items-center relative shrink-0 w-full">
                <p className="relative shrink-0 text-ui-fg-subtle w-[88px] txt-compact-small">
                  To Do
                </p>
                <div className="bg-ui-border-base flex-1 h-2 min-w-[1px] overflow-clip relative rounded">
                  <div className="absolute bg-[#a4aaa1] h-2 left-0 rounded top-0 w-[133px]" />
                </div>
                <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">
                  6
                </p>
              </div>
            </div>
            
            
            
          </div>
        </div>
      </div>;
}
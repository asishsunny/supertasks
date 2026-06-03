export default function KanbanBoard() {
  return <div className="flex gap-4 h-[800px] items-start relative shrink-0 w-full">
        <div className="bg-ui-bg-kanban-column flex flex-1 flex-col gap-2 h-full min-w-[1px] p-2 relative rounded-xl" data-repeat="4">
          <div className="flex gap-1.5 items-center overflow-clip py-1 relative shrink-0 w-full">
            <SquareGreySolid className="w-[15px] h-[15px]" />
            <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
              To Do
            </p>
            <div className="flex-1 h-px min-w-[1px] relative" />
            <p className="relative shrink-0 text-ui-fg-muted txt-compact-medium">
              6
            </p>
          </div>
          <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full" data-repeat="6">
            <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">
              Customer interviews
            </p>
            <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis txt-compact-small">
              Schedule and run five user feedback sessions
            </p>
            <div className="flex gap-1.5 items-center relative shrink-0 w-full">
              <>{
              /* TODO: size corrected: rule=xsmall → figma=small */
            }<ColorAvatar member={member} size="small" /></>
              <p className="relative shrink-0 text-ui-fg-subtle txt-compact-xsmall">
                Lara
              </p>
              <div className="flex-1 h-px min-w-[1px] relative" />
              <p className="relative shrink-0 text-ui-fg-subtle txt-compact-xsmall">
                Jun 8
              </p>
              <>{
              /* TODO: size corrected: rule=2xsmall → figma=small */
            }<Badge color={PRIORITY_COLOR[task.priority]} size="small" rounded="full">Medium</Badge></>
            </div>
          </div>
          
          
          
          
          
        </div>
        
        
        
      </div>;
}
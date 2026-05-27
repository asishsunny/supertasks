export default function RecentTasks() {
  return <div className="bg-ui-bg-base flex flex-col gap-0 overflow-clip p-0 rounded-xl shadow-elevation-card-rest w-full h-full">
      <div className="flex items-start overflow-clip pb-4 pt-6 px-6 shrink-0 w-full">
        <p className="shrink-0 text-ui-fg-base txt-compact-medium-plus">
          Recent Tasks
        </p>
      </div>
      <div className="flex flex-col shrink-0 w-full">
        <div className="bg-ui-bg-subtle flex gap-3 h-12 items-center justify-center shrink-0 w-full px-6">
          <div className="flex flex-1 h-full items-center min-w-[1px]">
            <p className="shrink-0 text-ui-fg-subtle txt-compact-small-plus">
              Task
            </p>
          </div>
          <div className="flex h-full items-center shrink-0 w-[160px]">
            <p className="shrink-0 text-ui-fg-subtle txt-compact-small-plus">
              Assignee
            </p>
          </div>
          <div className="flex h-full items-center shrink-0 w-[120px]">
            <p className="shrink-0 text-ui-fg-subtle txt-compact-small-plus">
              Priority
            </p>
          </div>
          <div className="flex h-full items-center shrink-0 w-[130px]">
            <p className="shrink-0 text-ui-fg-subtle txt-compact-small-plus">
              Due Date
            </p>
          </div>
          <div className="flex h-full items-center shrink-0 w-[140px]">
            <p className="shrink-0 text-ui-fg-subtle txt-compact-small-plus">
              Status
            </p>
          </div>
        <div className="shrink-0 w-[28px]" /></div>
        <div className="h-px bg-ui-border-base" />
        <div className="bg-ui-bg-base flex gap-3 h-12 items-center justify-center px-6 shrink-0 w-full" data-repeat="5">
          <div className="flex flex-1 h-full items-center min-w-[1px]">
            <p className="shrink-0 text-ui-fg-base txt-compact-small">
              Icon system audit
            </p>
          </div>
          <div className="flex gap-2 h-full items-center shrink-0 w-[160px]">
            <ColorAvatar member={member} size="xsmall" />
            <p className="shrink-0 text-ui-fg-base txt-compact-small">
              Lara Sato
            </p>
          </div>
          <div className="flex h-full items-center shrink-0 w-[120px]">
            <Badge color={PRIORITY_COLOR[task.priority]} size="2xsmall" rounded="full">Low</Badge>
          </div>
          <div className="flex h-full items-center shrink-0 w-[130px]">
            <p className="shrink-0 text-ui-fg-error txt-compact-small">
              May 7, 2026
            </p>
          </div>
          <div className="flex gap-1 h-full items-center shrink-0 w-[140px]">
            <span className="inline-flex items-center gap-1.5"><span className="inline-block size-2 rounded-[2px] shrink-0 border border-black/[.12] dark:border-white/[.12]" style={{
              backgroundColor: BAR_COLORS[task.status]
            }} /><span className="txt-compact-small text-ui-fg-subtle">{STATUS_LABEL[task.status]}</span></span>
            
          </div>
          <div className="flex h-full items-center justify-end shrink-0 w-7"><IconButton size="small"><EllipsisHorizontal /></IconButton></div>
        </div>
        <div className="h-px bg-ui-border-base" />
        
        <div className="h-px bg-ui-border-base" />
        
        <div className="h-px bg-ui-border-base" />
        
        <div className="h-px bg-ui-border-base" />
        
      </div>
    </div>;
}
export default function KanbanBoard() {
  return <div className="flex gap-4 items-start relative w-full h-full">
      {statuses.map(status => <div className="bg-ui-bg-kanban-column flex flex-1 flex-col gap-2 h-full min-w-[1px] p-2 relative rounded-xl" key={status.key}>
        <div className="flex gap-1.5 items-center overflow-clip py-1 relative shrink-0 w-full">
          <div className="inline-block size-2 rounded-[2px] shrink-0 border border-black/[.12] dark:border-white/[.12]" style={{
          backgroundColor: BAR_COLORS[status.key]
        }} />
          <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">{status.label}</p>
          <div className="flex-1 h-px min-w-[1px] relative" />
          <p className="relative shrink-0 text-ui-fg-muted txt-compact-medium">{tasks.filter(_t => _t.status === status.key).length}</p>
        </div>
        {tasks.filter(task => task.status === status.key).map(task => <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full" key={task.id}>
          <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">{task.title}</p>
          <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis txt-compact-medium whitespace-nowrap">{task.desc}</p>
          <div className="flex gap-1.5 items-center relative shrink-0 w-full">
            <ColorAvatar member={DATA.members[task.assignee]} size="xsmall" />
            <p className="relative shrink-0 text-ui-fg-subtle txt-compact-xsmall">{DATA.members[task.assignee]?.name?.split?.(" ")?.[0]}</p>
            <div className="flex-1 h-px min-w-[1px] relative" />
            <p className={`relative shrink-0 txt-compact-xsmall ${task.due?.overdue ? "text-ui-fg-error" : "text-ui-fg-subtle"}`}>{task.due?.label}</p>
            <Badge color={PRIORITY_COLOR[task.priority]} size="2xsmall" rounded="full">{DATA.priorityBadge[task.priority].label}</Badge>
          </div>
        </div>)}
        
        
        
        
        
      </div>)}
      
      
      
    </div>;
}
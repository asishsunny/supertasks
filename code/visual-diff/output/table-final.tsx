export default function RecentTasks() {
  return <div className="bg-ui-bg-base flex flex-col gap-0 overflow-hidden p-0 relative rounded-xl shadow-elevation-card-rest w-full">
      <div className="flex items-start overflow-clip pb-4 pt-6 px-6 relative shrink-0 w-full">
        <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
          Recent Tasks
        </p>
      </div>
      <Table><Table.Header className="border-t-0"><Table.Row><Table.HeaderCell>Task</Table.HeaderCell><Table.HeaderCell className="w-[160px]">Assignee</Table.HeaderCell><Table.HeaderCell className="w-[120px]">Priority</Table.HeaderCell><Table.HeaderCell className="w-[130px]">Due Date</Table.HeaderCell><Table.HeaderCell className="w-[140px]">Status</Table.HeaderCell><Table.HeaderCell className="w-7" /></Table.Row></Table.Header><Table.Body>{rows.map(row => {
          const task = row;
          return <Table.Row><Table.Cell><p className="relative shrink-0 text-ui-fg-base txt-compact-small">{row.base}</p></Table.Cell><Table.Cell className="w-[160px]"><span className="inline-flex items-center gap-2"><ColorAvatar member={row.user} size="xsmall" /><p className="relative shrink-0 text-ui-fg-base txt-compact-small">{row.user.name}</p></span></Table.Cell><Table.Cell className="w-[120px]"><Badge color={BADGE_STATE_COLOR[row.badge.state]} size="2xsmall" rounded="full">{row.badge.label}</Badge></Table.Cell><Table.Cell className="w-[130px]"><p className={`relative shrink-0 ${row.overdue ? "text-ui-fg-error" : "text-ui-fg-subtle"} txt-compact-small`}>{row.subtle}</p></Table.Cell><Table.Cell className="w-[140px]"><span className="inline-flex items-center gap-2"><span className="inline-flex items-center gap-1.5"><span className="inline-block size-2 rounded-[2px] shrink-0 border border-black/[.12] dark:border-white/[.12]" style={{
                    backgroundColor: BAR_COLORS[STATUS_KEY[row.statusBadge]]
                  }} /><span className="txt-compact-small text-ui-fg-subtle">{row.statusBadge}</span></span></span></Table.Cell><Table.Cell className="w-7"><div className="flex h-full items-center justify-end shrink-0 w-7"><IconButton size="small" variant="transparent"><EllipsisHorizontal /></IconButton></div></Table.Cell></Table.Row>;
        })}</Table.Body></Table>
    </div>;
}
export default function RecentTasks() {
  return <div className="bg-ui-bg-base flex flex-col gap-0 overflow-clip p-0 relative rounded-xl shadow-elevation-card-rest w-full h-full">
      <div className="flex items-start overflow-clip pb-4 pt-6 px-6 relative shrink-0 w-full">
        <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
          Recent Tasks
        </p>
      </div>
      <Table><Table.Header className="border-t-0"><Table.Row><Table.HeaderCell>Task</Table.HeaderCell><Table.HeaderCell className="w-[160px]">Assignee</Table.HeaderCell><Table.HeaderCell className="w-[120px]">Priority</Table.HeaderCell><Table.HeaderCell className="w-[130px]">Due Date</Table.HeaderCell><Table.HeaderCell className="w-[140px]">Status</Table.HeaderCell><Table.HeaderCell className="w-7" /></Table.Row></Table.Header><Table.Body><Table.Row data-repeat="5"><Table.Cell><p className="relative shrink-0 text-ui-fg-base txt-compact-small">
              Icon system audit
            </p></Table.Cell><Table.Cell className="w-[160px]"><span className="inline-flex items-center gap-2"><>{
                  /* TODO: size corrected: rule=xsmall → figma=small */
                }<ColorAvatar member={member} size="small" /></><p className="relative shrink-0 text-ui-fg-base txt-compact-small">
              Lara Sato
            </p></span></Table.Cell><Table.Cell className="w-[120px]"><>{
                /* TODO: size corrected: rule=2xsmall → figma=small */
              }<Badge color={PRIORITY_COLOR[task.priority]} size="small" rounded="full">Low</Badge></></Table.Cell><Table.Cell className="w-[130px]"><p className="relative shrink-0 text-ui-fg-error txt-compact-small">
              May 7, 2026
            </p></Table.Cell><Table.Cell className="w-[140px]"><span className="inline-flex items-center gap-2"><span className="inline-flex items-center gap-1.5"><span className="inline-block size-2 rounded-[2px] shrink-0 border border-black/[.12] dark:border-white/[.12]" style={{
                  backgroundColor: BAR_COLORS[task.status]
                }} /><span className="txt-compact-small text-ui-fg-subtle">{STATUS_LABEL[task.status]}</span></span></span></Table.Cell><Table.Cell className="w-7"><div className="flex h-full items-center justify-end shrink-0 w-7"><IconButton size="small"><EllipsisHorizontal /></IconButton></div></Table.Cell></Table.Row></Table.Body></Table>
    </div>;
}
export default function RecentTasks() {
  return <div className="bg-ui-bg-base flex flex-col gap-0 overflow-clip p-0 relative rounded-xl shadow-elevation-card-rest w-full h-full">
      <div className="flex items-start overflow-clip pb-4 pt-6 px-6 relative shrink-0 w-full">
        <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
          Recent Tasks
        </p>
      </div>
      <Table><Table.Header className="border-t-0"><Table.Row><Table.HeaderCell>Task</Table.HeaderCell><Table.HeaderCell className="w-[160px]">Assignee</Table.HeaderCell><Table.HeaderCell className="w-[120px]">Priority</Table.HeaderCell><Table.HeaderCell className="w-[130px]">Due Date</Table.HeaderCell><Table.HeaderCell className="w-[140px]">Status</Table.HeaderCell></Table.Row></Table.Header><Table.Body /></Table>
    </div>;
}
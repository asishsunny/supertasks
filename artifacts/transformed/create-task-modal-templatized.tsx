export default function CreateTaskModal() {
  return <div className="bg-ui-bg-base flex flex-col overflow-clip relative rounded-[12px] shadow-elevation-card-rest w-full h-full">
      <div className="flex flex-col relative shrink-0 w-full">
        <div className="flex items-center justify-between px-6 py-2 relative shrink-0 w-full">
          <p className="flex-1 min-w-[1px] relative text-ui-fg-base txt-compact-medium-plus">
            Create new task
          </p>
          <div className="flex gap-1 items-center relative shrink-0">
            <Kbd>Esc</Kbd>
            <IconButton size="small" variant="transparent"><XMark /></IconButton>
          </div>
        </div>
        <div className="h-px bg-ui-border-base" />
      </div>
      <div className="flex flex-col gap-5 p-6 relative shrink-0 w-full">
        <div className="flex flex-1 flex-col gap-1.5 min-w-[1px]"><Label size="small">Task Name</Label><Input size="small" className="w-full" /></div>
        <div className="flex flex-1 flex-col gap-1.5 min-w-[1px]"><Label size="small">Description</Label><Textarea placeholder="Placeholder" defaultValue="Add a description..." /></div>
        <div className="flex gap-4 items-start relative shrink-0 w-full" data-repeat="2">
          <div className="flex flex-1 flex-col gap-1.5 min-w-[1px]" data-repeat="2"><Label size="small">Priority</Label><Select size="small" placeholder="Select" /></div>
          
        </div>
        
      </div>
      <div className="flex flex-col relative shrink-0 w-full">
        <div className="h-px bg-ui-border-base" />
        <div className="flex gap-2 items-center justify-end px-6 py-4 relative shrink-0 w-full">
          <Button variant="secondary" size="small">Cancel</Button>
          <Button variant="primary" size="small">Create task</Button>
        </div>
      </div>
    </div>;
}
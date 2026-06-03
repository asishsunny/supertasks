export default function CreateTaskModal() {
  return <>    <div className="bg-ui-bg-base flex flex-col overflow-clip relative rounded-[12px] shadow-elevation-card-rest shrink-0 max-w-[480px] w-full">
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
          <div className="flex gap-4 items-start relative shrink-0 w-full" data-repeat="2">
            <div className="flex flex-1 flex-col gap-1.5 min-w-[1px]" data-repeat="2"><Label size="small">Priority</Label><Select size="small" placeholder="Select" /></div>
            <div className="flex flex-1 flex-col gap-1.5 min-w-[1px]"><Label size="small">Status</Label><Select size="small" placeholder="Select" /></div>
          </div>
          <div className="flex gap-4 items-start relative shrink-0 w-full">
            <div className="flex flex-1 flex-col gap-1.5 min-w-[1px]" data-repeat="2"><Label size="small">Assignee</Label><Select size="small" placeholder="Select" /></div>
            <div className="flex flex-1 flex-col gap-1.5 min-w-[1px]"><Label size="small">Due date</Label><Select size="small" placeholder="Select" /></div>
          </div>
          <div className="flex flex-1 flex-col gap-1.5 min-w-[1px]"><Label size="small">Task name</Label><Input size="small" className="w-full" /></div>
          <div className="flex flex-1 flex-col gap-1.5 min-w-[1px]"><Label size="small">Description</Label><Textarea placeholder="Placeholder" defaultValue="Add a description..." /></div>
        </div>
        <div className="flex flex-col relative shrink-0 w-full">
          <div className="h-px bg-ui-border-base" />
          <div className="flex gap-2 items-center justify-end px-6 py-4 relative shrink-0 w-full">
            <Button variant="secondary" size="small">Cancel</Button>
            <Button variant="primary" size="small">Create task</Button>
          </div>
        </div>
      </div>
      <div className="bg-ui-bg-base flex flex-col overflow-clip relative rounded-[12px] shadow-elevation-card-rest shrink-0 max-w-[480px] w-full">
        <div className="flex flex-col relative shrink-0 w-full">
          <div className="flex items-center justify-between px-6 py-2 relative shrink-0 w-full">
            <p className="flex-1 min-w-[1px] relative text-ui-fg-base txt-compact-medium-plus">
              Invite team member
            </p>
            <div className="flex gap-1 items-center relative shrink-0">
              <Kbd>Esc</Kbd>
              <IconButton size="small" variant="transparent"><XMark /></IconButton>
            </div>
          </div>
          <div className="h-px bg-ui-border-base" />
        </div>
        <div className="flex flex-col gap-5 p-6 relative shrink-0 w-full">
          <div className="flex flex-1 flex-col gap-1.5 min-w-[1px]" data-repeat="2"><Label size="small">Full name</Label><Input size="small" className="w-full" /></div>
          <div className="flex flex-1 flex-col gap-1.5 min-w-[1px]"><Label size="small">Email</Label><Input size="small" className="w-full" /></div>
          <div className="flex flex-1 flex-col gap-1.5 min-w-[1px]"><Label size="small">Role</Label><Select size="small" placeholder="Select role..." /></div>
        </div>
        <div className="flex flex-col relative shrink-0 w-full">
          <div className="h-px bg-ui-border-base" />
          <div className="flex gap-2 items-center justify-end px-6 py-4 relative shrink-0 w-full">
            <Button variant="secondary" size="small">Cancel</Button>
            <Button variant="primary" size="small">Send invite</Button>
          </div>
        </div>
      </div>
      <div className="bg-ui-bg-base flex flex-col overflow-clip relative rounded-[12px] shadow-elevation-card-rest shrink-0 max-w-[480px] w-full">
        <div className="flex flex-col relative shrink-0 w-full">
          <div className="flex items-center justify-between px-6 py-2 relative shrink-0 w-full">
            <p className="flex-1 min-w-[1px] relative text-ui-fg-base txt-compact-medium-plus">
              Generate report
            </p>
            <div className="flex gap-1 items-center relative shrink-0">
              <Kbd>Esc</Kbd>
              <IconButton size="small" variant="transparent"><XMark /></IconButton>
            </div>
          </div>
          <div className="h-px bg-ui-border-base" />
        </div>
        <div className="flex flex-col gap-5 p-6 relative shrink-0 w-full">
          <div className="flex flex-1 flex-col gap-1.5 min-w-[1px]"><Label size="small">Report name</Label><Input size="small" className="w-full" /></div>
          <div className="flex flex-1 flex-col gap-1.5 min-w-[1px]" data-repeat="2"><Label size="small">Member</Label><Select size="small" placeholder="Select member..." /></div>
          
        </div>
        <div className="flex flex-col relative shrink-0 w-full">
          <div className="h-px bg-ui-border-base" />
          <div className="flex gap-2 items-center justify-end px-6 py-4 relative shrink-0 w-full">
            <Button variant="secondary" size="small">Cancel</Button>
            <Button variant="primary" size="small">Generate report</Button>
          </div>
        </div>
      </div></>;
}
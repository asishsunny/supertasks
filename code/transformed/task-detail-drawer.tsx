export default function TaskDetailsModal() {
  return <div className="flex flex-col overflow-clip relative rounded-[12px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_8px_16px_0px_rgba(0,0,0,0.08),0px_16px_32px_0px_rgba(0,0,0,0.08)] w-full h-full">
      
      <div className="flex flex-col items-center relative shrink-0 w-full">
        <div className="flex items-center justify-between px-6 py-2 relative shrink-0 w-full">
          <p className="flex-1 min-w-[1px] relative text-ui-fg-base font-medium text-[14px] leading-[20px]">
            Task details
          </p>
          <div className="flex gap-1 items-center relative shrink-0">
            <Kbd>Esc</Kbd>
            <IconButton size="small" variant="transparent"><XMark /></IconButton>
          </div>
        </div>
        <div className="h-px bg-ui-border-base" />
      </div>
      <div className="flex flex-1 flex-col gap-6 min-h-[1px] pb-6 pt-4 px-6 relative w-full">
        <div className="flex flex-col gap-2 relative shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base w-full font-medium text-[18px] leading-[28px]">
            Update onboarding flow
          </p>
          <p className="relative shrink-0 text-ui-fg-subtle w-full txt-small">
            Description text here
          </p>
        </div>
        <div className="flex flex-col gap-4 relative shrink-0 w-full">
          <p className="text-ui-fg-base txt-compact-small-plus">Info</p>
          <div className="flex items-center justify-between relative shrink-0 w-full">
            <p className="text-ui-fg-subtle text-[13px]">Status</p>
            <p>Badge</p>
          </div>
          <div className="flex items-center justify-between relative shrink-0 w-full">
            <p className="text-ui-fg-subtle text-[13px]">Priority</p>
            <p>Badge</p>
          </div>
          <div className="flex items-center justify-between relative shrink-0 w-full">
            <p className="text-ui-fg-subtle text-[13px]">Assignee</p>
            <p>Avatar + Name</p>
          </div>
          <div className="flex items-center justify-between relative shrink-0 w-full">
            <p className="text-ui-fg-subtle text-[13px]">Due date</p>
            <p className="text-ui-fg-error">May 19, 2026</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center relative shrink-0 w-full">
        <div className="h-px bg-ui-border-base" />
        <div className="flex gap-2 items-center justify-end px-6 py-4 relative shrink-0 w-full">
          <button>Edit</button>
          <button>Mark complete</button>
        </div>
      </div>
    </div>;
}

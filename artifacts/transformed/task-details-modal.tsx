export default function TaskDetailsModal() {
  return <div className="flex flex-col overflow-clip relative rounded-[12px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_8px_16px_0px_rgba(0,0,0,0.08),0px_16px_32px_0px_rgba(0,0,0,0.08)] w-full h-full">
      
      <div className="flex flex-col items-center relative shrink-0 w-full">
        <div className="flex items-center justify-between px-6 py-2 relative shrink-0 w-full">
          <p className="flex-1 min-w-[1px] relative text-ui-fg-base font-medium text-[14px] leading-[20px]">Task details</p>
          <div className="flex gap-1 items-center relative shrink-0">
            <div className="bg-ui-bg-field border border-ui-border-base flex flex-col h-4 items-center justify-center overflow-clip px-1 relative rounded shrink-0">
              <p className="relative shrink-0 text-ui-fg-subtle text-center txt-compact-xsmall-plus">Esc</p>
            </div>
            <IconButton size="small" variant="transparent"><EllipsisHorizontal /></IconButton>
          </div>
        </div>
        <div className="bg-ui-border-base h-px relative shrink-0 w-full" />
      </div>
      <div className="flex flex-1 flex-col gap-6 min-h-[1px] pb-6 pt-4 px-6 relative w-full">
        <div className="flex flex-col gap-2 relative shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base w-full font-medium text-[18px] leading-[28px]">Update onboarding flow</p>
          <p className="relative shrink-0 text-ui-fg-subtle w-full txt-small">Create a comprehensive onboarding experience for new users including welcome screens, feature tours, and initial setup steps.</p>
        </div>
        <div className="flex flex-col gap-4 relative shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">Info</p>
          <div className="flex items-center justify-between relative shrink-0 w-full">
            <p className="relative shrink-0 text-ui-fg-subtle txt-compact-small">Status</p>
            <div className="bg-[rgba(59,130,246,0.12)] border border-[#bfdbfe] flex h-5 items-center justify-center px-1.5 py-px relative rounded-full shrink-0">
              <p className="relative shrink-0 text-[#1e40af] text-center txt-compact-xsmall-plus">In Progress</p>
            </div>
          </div>
          <div className="flex items-center justify-between relative shrink-0 w-full">
            <p className="relative shrink-0 text-ui-fg-subtle txt-compact-small">Priority</p>
            <div className="bg-[rgba(244,63,94,0.12)] border border-[#fecdd3] flex h-5 items-center justify-center px-1.5 py-px relative rounded-full shrink-0">
              <p className="relative shrink-0 text-[#9f1239] text-center txt-compact-xsmall-plus">High</p>
            </div>
          </div>
          <div className="flex items-center justify-between relative shrink-0 w-full">
            <p className="relative shrink-0 text-ui-fg-subtle txt-compact-small">Assignee</p>
            <div className="flex gap-2 items-center relative shrink-0">
              <>{
                /* TODO: size corrected: rule=xsmall → figma=small */
              }<ColorAvatar member={member} size="small" /></>
              <p className="relative shrink-0 text-ui-fg-base txt-compact-small">Sara Nelson</p>
            </div>
          </div>
          <div className="flex items-center justify-between relative shrink-0 w-full">
            <p className="relative shrink-0 text-ui-fg-subtle txt-compact-small">Due date</p>
            <p className="relative shrink-0 text-ui-fg-error txt-compact-small">May 7, 2026</p>
          </div>
          <div className="flex items-center justify-between relative shrink-0 w-full">
            <p className="relative shrink-0 text-ui-fg-subtle txt-compact-small">Created</p>
            <p className="relative shrink-0 text-ui-fg-base txt-compact-small">Jan 5, 2026</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 relative shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">Activity log</p>
          <div className="flex flex-col gap-1 relative shrink-0 w-full">
            <div className="flex items-center justify-between relative shrink-0 w-full">
              <div className="flex gap-2 items-center relative shrink-0">
                <>{
                  /* TODO: size corrected: rule=xsmall → figma=small */
                }<ColorAvatar member={member} size="small" /></>
                <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">Priya Rao</p>
              </div>
              <p className="relative shrink-0 text-ui-fg-subtle txt-compact-xsmall">2h ago</p>
            </div>
            <p className="relative shrink-0 text-ui-fg-subtle w-full txt-small">Moving this to in progress — starting the research phase today.</p>
          </div>
          <div className="flex flex-col gap-1 relative shrink-0 w-full">
            <div className="flex items-center justify-between relative shrink-0 w-full">
              <div className="flex gap-2 items-center relative shrink-0">
                <>{
                  /* TODO: size corrected: rule=xsmall → figma=small */
                }<ColorAvatar member={member} size="small" /></>
                <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">Sara Nelson</p>
              </div>
              <p className="relative shrink-0 text-ui-fg-subtle txt-compact-xsmall">Yesterday</p>
            </div>
            <p className="relative shrink-0 text-ui-fg-subtle w-full txt-small">Added initial wireframes to the shared drive. Let me know if you have feedback.</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center relative shrink-0 w-full">
        <div className="bg-ui-border-base h-px relative shrink-0 w-full" />
        <div className="flex gap-2 items-center justify-end px-6 py-4 relative shrink-0 w-full">
          <Button variant="secondary" size="small">Edit</Button>
          <Button variant="primary" size="small">Mark complete</Button>
        </div>
      </div>
      
    </div>;
}
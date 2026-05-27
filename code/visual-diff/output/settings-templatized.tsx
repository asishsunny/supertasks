export default function SettingsContent() {
  return <div className="flex gap-6 items-start relative w-full h-full">
      <div className="bg-ui-bg-base flex flex-col overflow-clip py-2 relative rounded-[8px] shadow-elevation-card-rest shrink-0 w-[200px]">
        <div className="bg-ui-bg-subtle border-ui-fg-base border-l-2 flex items-center px-4 py-2.5 relative shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">
            Profile
          </p>
        </div>
        <div className="flex items-center px-4 py-2.5 relative shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-subtle txt-compact-small">
            Notifications
          </p>
        </div>
        <div className="flex items-center px-4 py-2.5 relative shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-subtle txt-compact-small">
            Security
          </p>
        </div>
        <div className="flex items-center px-4 py-2.5 relative shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-subtle txt-compact-small">
            Billing
          </p>
        </div>
      </div>
      <div className="bg-ui-bg-base flex flex-1 flex-col min-w-[1px] overflow-clip relative rounded-[8px] shadow-elevation-card-rest">
        <div className="flex flex-col px-6 py-3 relative shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
            Profile
          </p>
        </div>
        <div className="h-px bg-ui-border-base" />
        <div className="flex flex-col gap-5 p-6 relative shrink-0 w-full">
          <div className="flex gap-3 items-center relative shrink-0 w-full">
            <Avatar className="bg-ui-bg-base overflow-clip relative rounded-full shadow-borders-base shrink-0 size-[48px]" />
            <div className="flex flex-col gap-0.5 relative shrink-0 w-[100px]">
              <p className="relative shrink-0 text-ui-fg-base font-medium text-[14px]">
                Ludvig Rask
              </p>
              <p className="relative shrink-0 text-ui-fg-subtle font-normal text-[13px]">
                Click to change photo
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start relative shrink-0 w-full" data-repeat="3">
            <div className="flex flex-1 flex-col gap-1.5 min-w-[1px]" data-repeat="2"><Label size="small">Full name</Label><Input size="small" className="w-full" defaultValue="Ludvig Rask" /></div>
            
          </div>
          
          
          <div className="flex flex-1 flex-col gap-1.5 min-w-[1px]"><Label size="small">Bio</Label><textarea className="bg-ui-bg-field min-h-[80px] overflow-clip px-2 py-1.5 rounded-md shadow-borders-base w-full text-ui-fg-muted txt-small resize-none" placeholder="Placeholder" /></div>
          <div className="flex items-start justify-end relative shrink-0 w-full">
            <Button variant="primary" size="small">Save changes</Button>
          </div>
        </div>
      </div>
    </div>;
}
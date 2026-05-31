export default function SettingsNotifications() {
  return <div className="flex gap-6 items-start relative shrink-0 w-[960px]">
        <div className="bg-ui-bg-base flex flex-col overflow-clip py-2 relative rounded-[8px] shadow-elevation-card-rest shrink-0 w-[240px]">
          <div className="flex items-center px-4 py-2.5 relative shrink-0 w-full">
            <p className="relative shrink-0 text-ui-fg-subtle txt-compact-small">
              Profile
            </p>
          </div>
          <div className="bg-ui-bg-subtle border-ui-fg-base border-l-2 flex items-center px-4 py-2.5 relative shrink-0 w-full">
            <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">
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
            <p className="relative shrink-0 text-ui-fg-base font-medium text-[14px] leading-[20px]">
              Notifications
            </p>
          </div>
          <div className="h-px bg-ui-border-base" />
          <div className="flex flex-col gap-5 p-6 relative shrink-0 w-full">
            <div className="flex flex-col gap-3 relative shrink-0 w-full">
              <div className="flex items-center justify-between relative shrink-0 w-full">
                <div className="flex flex-col gap-1 relative shrink-0 w-[100px] text-[13px] leading-[20px]">
                  <p className="relative shrink-0 text-ui-fg-base font-medium">
                    Email notifications
                  </p>
                  <p className="relative shrink-0 text-ui-fg-subtle font-normal">
                    Receive email for task assignments
                  </p>
                </div>
                <Switch checked className="h-5 relative shrink-0 w-[32px]" />
              </div>
              <div className="h-px bg-ui-border-base" />
              <div className="flex items-center justify-between relative shrink-0 w-full">
                <div className="flex flex-col gap-1 relative shrink-0 w-[100px] text-[13px] leading-[20px]">
                  <p className="relative shrink-0 text-ui-fg-base font-medium">
                    Push notifications
                  </p>
                  <p className="relative shrink-0 text-ui-fg-subtle font-normal">
                    Get push alerts for due dates
                  </p>
                </div>
                <Switch checked className="h-5 relative shrink-0 w-[32px]" />
              </div>
              <div className="h-px bg-ui-border-base" />
              <div className="flex items-center justify-between relative shrink-0 w-full">
                <div className="flex flex-col gap-1 relative shrink-0 w-[100px] text-[13px] leading-[20px]">
                  <p className="relative shrink-0 text-ui-fg-base font-medium">
                    Weekly digest
                  </p>
                  <p className="relative shrink-0 text-ui-fg-subtle font-normal">{`Summary of your team's progress`}</p>
                </div>
                <Switch className="h-5 relative shrink-0 w-[32px]" />
              </div>
              <div className="h-px bg-ui-border-base" />
              <div className="flex items-center justify-between relative shrink-0 w-full">
                <div className="flex flex-col gap-1 relative shrink-0 w-[100px] text-[13px] leading-[20px]">
                  <p className="relative shrink-0 text-ui-fg-base font-medium">
                    Mentions
                  </p>
                  <p className="relative shrink-0 text-ui-fg-subtle font-normal">
                    Notify when someone mentions you
                  </p>
                </div>
                <Switch checked className="h-5 relative shrink-0 w-[32px]" />
              </div>
              <div className="h-px bg-ui-border-base" />
              <div className="flex items-center justify-between relative shrink-0 w-full">
                <div className="flex flex-col gap-1 relative shrink-0 w-[100px] text-[13px] leading-[20px]">
                  <p className="relative shrink-0 text-ui-fg-base font-medium">
                    Overdue alerts
                  </p>
                  <p className="relative shrink-0 text-ui-fg-subtle font-normal">
                    Alert when tasks pass their due date
                  </p>
                </div>
                <Switch checked className="h-5 relative shrink-0 w-[32px]" />
              </div>
            </div>
            <div className="flex items-start justify-end pt-2 relative shrink-0 w-full">
              <Button variant="primary" size="small">Save changes</Button>
            </div>
          </div>
        </div>
      </div>;
}
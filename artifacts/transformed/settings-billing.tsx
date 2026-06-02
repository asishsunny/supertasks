export default function SettingsBilling() {
  return <div className="flex gap-6 items-start relative shrink-0 w-full">
        <div className="bg-ui-bg-base flex flex-col overflow-clip py-2 relative rounded-[8px] shadow-elevation-card-rest shrink-0 w-[240px]">
          <div className="flex items-center px-4 py-2.5 relative shrink-0 w-full">
            <p className="relative shrink-0 text-ui-fg-subtle txt-compact-small">
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
          <div className="bg-ui-bg-subtle border-ui-fg-base border-l-2 flex items-center px-4 py-2.5 relative shrink-0 w-full">
            <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">
              Billing
            </p>
          </div>
        </div>
        <div className="bg-ui-bg-base flex flex-1 flex-col min-w-[1px] overflow-clip relative rounded-[8px] shadow-elevation-card-rest">
          <div className="flex flex-col px-6 py-3 relative shrink-0 w-full">
            <p className="relative shrink-0 text-ui-fg-base font-medium text-[14px] leading-[20px]">
              Billing
            </p>
          </div>
          <div className="h-px bg-ui-border-base" />
          <div className="flex flex-col gap-5 p-6 relative shrink-0 w-full">
            <div className="bg-ui-bg-base flex flex-col gap-1 overflow-clip px-6 py-5 relative rounded-[8px] shadow-elevation-card-rest shrink-0 w-full">
              <div className="flex items-center justify-between relative shrink-0 w-full">
                <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">
                  Pro plan
                </p>
                <Button variant="secondary" size="small">Change plan</Button>
              </div>
              <p className="relative shrink-0 text-ui-fg-base font-medium text-[18px] leading-[28px]">
                $12/month
              </p>
              <p className="relative shrink-0 text-ui-fg-subtle txt-compact-small">
                Renews on Apr 15, 2026
              </p>
            </div>
            <div className="flex items-center justify-between py-2 relative shrink-0 w-full">
              <div className="flex flex-col gap-1 relative shrink-0 text-[13px] leading-[20px]">
                <p className="relative shrink-0 text-ui-fg-base font-medium">
                  Payment method
                </p>
                <p className="relative shrink-0 text-ui-fg-subtle font-normal">
                  Visa ending in 4242
                </p>
              </div>
              <Button variant="secondary" size="small">Update</Button>
            </div>
            <div className="bg-ui-bg-base flex flex-col overflow-clip relative rounded-[12px] shadow-elevation-card-rest shrink-0 w-full">
              <div className="flex items-start pb-4 pt-6 px-6 relative shrink-0 w-full">
                <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
                  Billing history
                </p>
              </div>
              <Table><Table.Header className="border-t-0"><Table.Row><Table.HeaderCell>Date</Table.HeaderCell><Table.HeaderCell>Description</Table.HeaderCell><Table.HeaderCell className="w-[120px]">Amount</Table.HeaderCell></Table.Row></Table.Header><Table.Body><Table.Row data-repeat="3"><Table.Cell><p className="relative shrink-0 text-ui-fg-subtle txt-compact-small">
                      Mar 1, 2026
                    </p></Table.Cell><Table.Cell><p className="relative shrink-0 text-ui-fg-base txt-compact-small">
                      Pro Plan — Monthly
                    </p></Table.Cell><Table.Cell className="w-[120px]"><p className="relative shrink-0 text-ui-fg-subtle txt-compact-small">
                      $12.00
                    </p></Table.Cell></Table.Row><Table.Row><Table.Cell><p className="relative shrink-0 text-ui-fg-subtle txt-compact-small">
                      Feb 1, 2026
                    </p></Table.Cell><Table.Cell><p className="relative shrink-0 text-ui-fg-base txt-compact-small">
                      Pro Plan — Monthly
                    </p></Table.Cell><Table.Cell className="w-[120px]"><p className="relative shrink-0 text-ui-fg-subtle txt-compact-small">
                      $12.00
                    </p></Table.Cell></Table.Row><Table.Row><Table.Cell><p className="relative shrink-0 text-ui-fg-subtle txt-compact-small">
                      Jan 1, 2026
                    </p></Table.Cell><Table.Cell><p className="relative shrink-0 text-ui-fg-base txt-compact-small">
                      Pro Plan — Monthly
                    </p></Table.Cell><Table.Cell className="w-[120px]"><p className="relative shrink-0 text-ui-fg-subtle txt-compact-small">
                      $12.00
                    </p></Table.Cell></Table.Row></Table.Body></Table>
            </div>
          </div>
        </div>
      </div>;
}
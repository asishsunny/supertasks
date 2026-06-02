export default function SettingsNotifications() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-[960px]" data-node-id="4593:6551" data-name="Settings Content">
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-col items-start overflow-clip py-[8px] relative rounded-[8px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)] shrink-0 w-[240px]" data-node-id="4593:6552" data-name="Settings Nav">
          <div className="content-stretch flex items-center px-[16px] py-[10px] relative shrink-0 w-full" data-node-id="4593:6553" data-name="Profile">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4593:6554">
              Profile
            </p>
          </div>
          <div className="bg-[var(--backgrounds\/bg-subtle,#f8faf7)] border-[var(--foregrounds\/fg-base,#0a0b09)] border-l-2 border-solid content-stretch flex items-center px-[16px] py-[10px] relative shrink-0 w-full" data-node-id="4593:6555" data-name="Notifications">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4593:6556">
              Notifications
            </p>
          </div>
          <div className="content-stretch flex items-center px-[16px] py-[10px] relative shrink-0 w-full" data-node-id="4593:6557" data-name="Security">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4593:6558">
              Security
            </p>
          </div>
          <div className="content-stretch flex items-center px-[16px] py-[10px] relative shrink-0 w-full" data-node-id="4593:6559" data-name="Billing">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4593:6560">
              Billing
            </p>
          </div>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative rounded-[8px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)]" data-node-id="4593:6561" data-name="Content Card">
          <div className="content-stretch flex flex-col items-start px-[24px] py-[12px] relative shrink-0 w-full" data-node-id="4593:6562" data-name="Card Header">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/header,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[14px] text-[color:var(--foregrounds\/fg-base,#0a0b09)] whitespace-nowrap" data-node-id="4593:6563">
              Notifications
            </p>
          </div>
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
          <div className="content-stretch flex flex-col gap-[20px] items-start p-[24px] relative shrink-0 w-full" data-node-id="4593:6565" data-name="Card Body">
            <div className="content-stretch flex flex-col gap-[var(--spacing-12,12px)] items-start relative shrink-0 w-full" data-node-id="4593:6566" data-name="stack">
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4593:6567" data-name="Email notifications">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[20px] relative shrink-0 text-[length:var(--font\/size\/small,13px)] w-[100px] whitespace-nowrap" data-node-id="4593:6568" data-name="Info">
                  <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4593:6569">
                    Email notifications
                  </p>
                  <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)]" data-node-id="4593:6570">
                    Receive email for task assignments
                  </p>
                </div>
                <Switch checked className="h-[20px] relative shrink-0 w-[32px]" />
              </div>
              <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4593:6577" data-name="Push notifications">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[20px] relative shrink-0 text-[length:var(--font\/size\/small,13px)] w-[100px] whitespace-nowrap" data-node-id="4593:6578" data-name="Info">
                  <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4593:6579">
                    Push notifications
                  </p>
                  <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)]" data-node-id="4593:6580">
                    Get push alerts for due dates
                  </p>
                </div>
                <Switch checked className="h-[20px] relative shrink-0 w-[32px]" />
              </div>
              <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4593:6587" data-name="Weekly digest">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[20px] relative shrink-0 text-[length:var(--font\/size\/small,13px)] w-[100px] whitespace-nowrap" data-node-id="4593:6588" data-name="Info">
                  <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4593:6589">
                    Weekly digest
                  </p>
                  <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)]" data-node-id="4593:6590">{`Summary of your team's progress`}</p>
                </div>
                <Switch className="h-[20px] relative shrink-0 w-[32px]" />
              </div>
              <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4593:6595" data-name="Mentions">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[20px] relative shrink-0 text-[length:var(--font\/size\/small,13px)] w-[100px] whitespace-nowrap" data-node-id="4593:6596" data-name="Info">
                  <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4593:6597">
                    Mentions
                  </p>
                  <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)]" data-node-id="4593:6598">
                    Notify when someone mentions you
                  </p>
                </div>
                <Switch checked className="h-[20px] relative shrink-0 w-[32px]" />
              </div>
              <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4593:6605" data-name="Overdue alerts">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[20px] relative shrink-0 text-[length:var(--font\/size\/small,13px)] w-[100px] whitespace-nowrap" data-node-id="4593:6606" data-name="Info">
                  <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4593:6607">
                    Overdue alerts
                  </p>
                  <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)]" data-node-id="4593:6608">
                    Alert when tasks pass their due date
                  </p>
                </div>
                <Switch checked className="h-[20px] relative shrink-0 w-[32px]" />
              </div>
            </div>
            <div className="content-stretch flex items-start justify-end pt-[8px] relative shrink-0 w-full" data-node-id="4593:6614" data-name="Actions">
              <div className="content-stretch flex gap-[var(--spacing-6,6px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.4),0px_0px_0px_1px_#18181b] shrink-0" data-node-id="4593:6615" data-name="Save changes">
                <div aria-hidden className="absolute bg-[var(--buttons\/button-inverted,#282a27)] inset-0 pointer-events-none rounded-[var(--radius-6,6px)]" />
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--contrast\/contrast-fg-primary,rgba(255,255,255,0.88))] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4593:6615;5934:2712">
                  Save changes
                </p>
                <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0.75px_0px_0px_rgba(255,255,255,0.2)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
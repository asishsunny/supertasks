export default function SettingsNotifications() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-[960px]" data-node-id="4553:130030" data-name="Settings Content">
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-col items-start overflow-clip py-[8px] relative rounded-[8px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)] shrink-0 w-[240px]" data-node-id="4553:130031" data-name="Settings Nav">
          <div className="content-stretch flex items-center px-[16px] py-[10px] relative shrink-0 w-full" data-node-id="4553:130032" data-name="Profile">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:130033">
              Profile
            </p>
          </div>
          <div className="bg-[var(--backgrounds\/bg-subtle,#f8faf7)] border-[var(--foregrounds\/fg-base,#0a0b09)] border-l-2 border-solid content-stretch flex items-center px-[16px] py-[10px] relative shrink-0 w-full" data-node-id="4553:130034" data-name="Notifications">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:130035">
              Notifications
            </p>
          </div>
          <div className="content-stretch flex items-center px-[16px] py-[10px] relative shrink-0 w-full" data-node-id="4553:130036" data-name="Security">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:130037">
              Security
            </p>
          </div>
          <div className="content-stretch flex items-center px-[16px] py-[10px] relative shrink-0 w-full" data-node-id="4553:130038" data-name="Billing">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:130039">
              Billing
            </p>
          </div>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative rounded-[8px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)]" data-node-id="4553:130040" data-name="Content Card">
          <div className="content-stretch flex flex-col items-start px-[24px] py-[12px] relative shrink-0 w-full" data-node-id="4553:130041" data-name="Card Header">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/header,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[14px] text-[color:var(--foregrounds\/fg-base,#0a0b09)] whitespace-nowrap" data-node-id="4553:130042">
              Notifications
            </p>
          </div>
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
          <div className="content-stretch flex flex-col gap-[20px] items-start p-[24px] relative shrink-0 w-full" data-node-id="4553:130044" data-name="Card Body">
            <div className="content-stretch flex flex-col gap-[var(--spacing-12,12px)] items-start relative shrink-0 w-full" data-node-id="4553:130045" data-name="stack">
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4553:130046" data-name="Email notifications">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[20px] relative shrink-0 text-[length:var(--font\/size\/small,13px)] w-[100px] whitespace-nowrap" data-node-id="4553:130047" data-name="Info">
                  <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4553:130048">
                    Email notifications
                  </p>
                  <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)]" data-node-id="4553:130049">
                    Receive email for task assignments
                  </p>
                </div>
                <Switch checked className="h-[20px] relative shrink-0 w-[32px]" />
              </div>
              <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4553:130056" data-name="Push notifications">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[20px] relative shrink-0 text-[length:var(--font\/size\/small,13px)] w-[100px] whitespace-nowrap" data-node-id="4553:130057" data-name="Info">
                  <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4553:130058">
                    Push notifications
                  </p>
                  <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)]" data-node-id="4553:130059">
                    Get push alerts for due dates
                  </p>
                </div>
                <Switch checked className="h-[20px] relative shrink-0 w-[32px]" />
              </div>
              <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4553:130066" data-name="Weekly digest">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[20px] relative shrink-0 text-[length:var(--font\/size\/small,13px)] w-[100px] whitespace-nowrap" data-node-id="4553:130067" data-name="Info">
                  <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4553:130068">
                    Weekly digest
                  </p>
                  <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)]" data-node-id="4553:130069">{`Summary of your team's progress`}</p>
                </div>
                <Switch className="h-[20px] relative shrink-0 w-[32px]" />
              </div>
              <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4553:130074" data-name="Mentions">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[20px] relative shrink-0 text-[length:var(--font\/size\/small,13px)] w-[100px] whitespace-nowrap" data-node-id="4553:130075" data-name="Info">
                  <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4553:130076">
                    Mentions
                  </p>
                  <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)]" data-node-id="4553:130077">
                    Notify when someone mentions you
                  </p>
                </div>
                <Switch checked className="h-[20px] relative shrink-0 w-[32px]" />
              </div>
              <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4553:130084" data-name="Overdue alerts">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[20px] relative shrink-0 text-[length:var(--font\/size\/small,13px)] w-[100px] whitespace-nowrap" data-node-id="4553:130085" data-name="Info">
                  <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4553:130086">
                    Overdue alerts
                  </p>
                  <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)]" data-node-id="4553:130087">
                    Alert when tasks pass their due date
                  </p>
                </div>
                <Switch checked className="h-[20px] relative shrink-0 w-[32px]" />
              </div>
            </div>
            <div className="content-stretch flex items-start justify-end pt-[8px] relative shrink-0 w-full" data-node-id="4553:130093" data-name="Actions">
              <div className="content-stretch flex gap-[var(--spacing-6,6px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.4),0px_0px_0px_1px_#18181b] shrink-0" data-node-id="4553:130094" data-name="Save changes">
                <div aria-hidden className="absolute bg-[var(--buttons\/button-inverted,#282a27)] inset-0 pointer-events-none rounded-[var(--radius-6,6px)]" />
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--contrast\/contrast-fg-primary,rgba(255,255,255,0.88))] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:130094;5934:2712">
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
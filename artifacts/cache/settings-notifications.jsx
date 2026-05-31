type SwitchProps = {
  className?: string;
  checked?: boolean;
  size?: "3xsmall (18)";
  state?: "Enabled";
};

function Switch({ className, checked = false, size = "3xsmall (18)", state = "Enabled" }: SwitchProps) {
  const is3Xsmall18AndEnabledAndChecked = size === "3xsmall (18)" && state === "Enabled" && checked;
  return (
    <div className={className || "h-[20px] relative w-[32px]"} id={is3Xsmall18AndEnabledAndChecked ? "node-4197_3687" : "node-4197_3681"}>
      <div className="-translate-y-1/2 absolute h-[18px] left-0 overflow-clip pointer-events-none rounded-[99px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.04)] top-1/2 w-[32px]" id={is3Xsmall18AndEnabledAndChecked ? "node-4197_3688" : "node-4197_3682"} data-name="toggle-bg">
        <div aria-hidden className={`absolute inset-0 rounded-[99px] ${is3Xsmall18AndEnabledAndChecked ? String.raw`bg-[var(--backgrounds\/bg-interactive,#3b82f6)]` : String.raw`bg-[var(--backgrounds\/bg-switch-off,#e5e7e4)]`}`} />
        <div className={`absolute rounded-[99px] shadow-[0px_0px_0px_0.5px_rgba(0,0,0,0.02),0px_5px_4px_0px_rgba(0,0,0,0.02),0px_3px_3px_0px_rgba(0,0,0,0.04),0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_1px_0px_rgba(0,0,0,0.08)] size-[14px] top-[2px] ${is3Xsmall18AndEnabledAndChecked ? "left-[16px]" : "left-[2px]"}`} id={is3Xsmall18AndEnabledAndChecked ? "node-4197_3689" : "node-4197_3683"} data-name="circle">
          <div aria-hidden className="absolute bg-[var(--foregrounds\/fg-on-color,white)] inset-0 rounded-[99px]" />
          <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_2px_1px_white,inset_0px_1px_0px_0px_white]" />
        </div>
        <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0px_1px_1px_0px_rgba(0,0,0,0.04),inset_0px_2px_4px_0px_rgba(0,0,0,0.04),inset_0px_0px_0px_0.75px_rgba(0,0,0,0.06),inset_0px_0px_8px_0px_rgba(0,0,0,0.02)]" />
      </div>
    </div>
  );
}

type HorizontalDividerProps = {
  className?: string;
  type?: "Line";
};

function HorizontalDivider({ className, type = "Line" }: HorizontalDividerProps) {
  return <div className={className || "bg-[var(--borders\\/border-base,#e5e7e4)] h-px overflow-clip relative w-[933px]"} data-node-id="4131:5284" />;
}

export default function SettingsContent() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative size-full" data-node-id="4553:47282" data-name="Settings Content">
      <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-col items-start overflow-clip py-[8px] relative rounded-[8px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)] shrink-0 w-[240px]" data-node-id="4553:47283" data-name="Settings Nav">
        <div className="content-stretch flex items-center px-[16px] py-[10px] relative shrink-0 w-full" data-node-id="4553:47284" data-name="Profile">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:47285">
            Profile
          </p>
        </div>
        <div className="bg-[var(--backgrounds\/bg-subtle,#f8faf7)] border-[var(--foregrounds\/fg-base,#0a0b09)] border-l-2 border-solid content-stretch flex items-center px-[16px] py-[10px] relative shrink-0 w-full" data-node-id="4553:47286" data-name="Notifications">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:47287">
            Notifications
          </p>
        </div>
        <div className="content-stretch flex items-center px-[16px] py-[10px] relative shrink-0 w-full" data-node-id="4553:47288" data-name="Security">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:47289">
            Security
          </p>
        </div>
        <div className="content-stretch flex items-center px-[16px] py-[10px] relative shrink-0 w-full" data-node-id="4553:47290" data-name="Billing">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:47291">
            Billing
          </p>
        </div>
      </div>
      <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative rounded-[8px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)]" data-node-id="4553:47292" data-name="Content Card">
        <div className="content-stretch flex flex-col items-start px-[24px] py-[12px] relative shrink-0 w-full" data-node-id="4553:47293" data-name="Card Header">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/header,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[14px] text-[color:var(--foregrounds\/fg-base,#0a0b09)] whitespace-nowrap" data-node-id="4553:47294">
            Notifications
          </p>
        </div>
        <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
        <div className="content-stretch flex flex-col gap-[20px] items-start p-[24px] relative shrink-0 w-full" data-node-id="4553:47296" data-name="Card Body">
          <div className="content-stretch flex flex-col gap-[var(--spacing-12,12px)] items-start relative shrink-0 w-full" data-node-id="4553:47297" data-name="stack">
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4553:47298" data-name="Email notifications">
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[20px] relative shrink-0 text-[length:var(--font\/size\/small,13px)] w-[100px] whitespace-nowrap" data-node-id="4553:47299" data-name="Info">
                <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4553:47300">
                  Email notifications
                </p>
                <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)]" data-node-id="4553:47301">
                  Receive email for task assignments
                </p>
              </div>
              <Switch checked className="h-[20px] relative shrink-0 w-[32px]" />
            </div>
            <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4553:47308" data-name="Push notifications">
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[20px] relative shrink-0 text-[length:var(--font\/size\/small,13px)] w-[100px] whitespace-nowrap" data-node-id="4553:47309" data-name="Info">
                <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4553:47310">
                  Push notifications
                </p>
                <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)]" data-node-id="4553:47311">
                  Get push alerts for due dates
                </p>
              </div>
              <Switch checked className="h-[20px] relative shrink-0 w-[32px]" />
            </div>
            <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4553:47318" data-name="Weekly digest">
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[20px] relative shrink-0 text-[length:var(--font\/size\/small,13px)] w-[100px] whitespace-nowrap" data-node-id="4553:47319" data-name="Info">
                <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4553:47320">
                  Weekly digest
                </p>
                <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)]" data-node-id="4553:47321">{`Summary of your team's progress`}</p>
              </div>
              <Switch className="h-[20px] relative shrink-0 w-[32px]" />
            </div>
            <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4553:47326" data-name="Mentions">
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[20px] relative shrink-0 text-[length:var(--font\/size\/small,13px)] w-[100px] whitespace-nowrap" data-node-id="4553:47327" data-name="Info">
                <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4553:47328">
                  Mentions
                </p>
                <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)]" data-node-id="4553:47329">
                  Notify when someone mentions you
                </p>
              </div>
              <Switch checked className="h-[20px] relative shrink-0 w-[32px]" />
            </div>
            <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4553:47336" data-name="Overdue alerts">
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[20px] relative shrink-0 text-[length:var(--font\/size\/small,13px)] w-[100px] whitespace-nowrap" data-node-id="4553:47337" data-name="Info">
                <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4553:47338">
                  Overdue alerts
                </p>
                <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)]" data-node-id="4553:47339">
                  Alert when tasks pass their due date
                </p>
              </div>
              <Switch checked className="h-[20px] relative shrink-0 w-[32px]" />
            </div>
          </div>
          <div className="content-stretch flex items-start justify-end pt-[8px] relative shrink-0 w-full" data-node-id="4553:47345" data-name="Actions">
            <div className="content-stretch flex gap-[var(--spacing-6,6px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.4),0px_0px_0px_1px_#18181b] shrink-0" data-node-id="4553:47346" data-name="Save changes">
              <div aria-hidden className="absolute bg-[var(--buttons\/button-inverted,#282a27)] inset-0 pointer-events-none rounded-[var(--radius-6,6px)]" />
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--contrast\/contrast-fg-primary,rgba(255,255,255,0.88))] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47346;5934:2712">
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

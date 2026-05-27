const imgBackground = "https://www.figma.com/api/mcp/asset/12511dd2-3b3c-4a59-879f-0e40bb3722bb";
const imgVector = "https://www.figma.com/api/mcp/asset/69536119-ce9e-45b3-9323-0633ac1e1991";

type AvatarProps = {
  className?: string;
  content?: "Image";
  size?: "Xlarge (48)";
  type?: "Rounded";
};

function Avatar({ className, content = "Image", size = "Xlarge (48)", type = "Rounded" }: AvatarProps) {
  return (
    <div className={className || "bg-[var(--backgrounds\\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] size-[48px]"} data-node-id="4131:4439">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 rounded-[var(--radius-full,999px)] size-[44px] top-1/2" data-node-id="4131:4485" data-name="Background">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[var(--radius-full,999px)] size-full" src={imgBackground} />
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
    <div className="content-stretch flex gap-[24px] items-start relative size-full" data-node-id="4223:127208" data-name="Settings Content">
      <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-col items-start overflow-clip py-[8px] relative rounded-[8px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)] shrink-0 w-[200px]" data-node-id="4223:127209" data-name="Settings Nav">
        <div className="bg-[var(--backgrounds\/bg-subtle,#f8faf7)] border-[var(--foregrounds\/fg-base,#0a0b09)] border-l-2 border-solid content-stretch flex items-center px-[16px] py-[10px] relative shrink-0 w-full" data-node-id="4223:127210" data-name="Profile">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4223:127211">
            Profile
          </p>
        </div>
        <div className="content-stretch flex items-center px-[16px] py-[10px] relative shrink-0 w-full" data-node-id="4223:127212" data-name="Notifications">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4223:127213">
            Notifications
          </p>
        </div>
        <div className="content-stretch flex items-center px-[16px] py-[10px] relative shrink-0 w-full" data-node-id="4223:127218" data-name="Security">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4223:127219">
            Security
          </p>
        </div>
        <div className="content-stretch flex items-center px-[16px] py-[10px] relative shrink-0 w-full" data-node-id="4223:127220" data-name="Billing">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4223:127221">
            Billing
          </p>
        </div>
      </div>
      <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative rounded-[8px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)]" data-node-id="4223:127222" data-name="Content Card">
        <div className="content-stretch flex flex-col items-start px-[24px] py-[12px] relative shrink-0 w-full" data-node-id="4223:127223" data-name="Card Header">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/header,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[14px] text-[color:var(--foregrounds\/fg-base,#0a0b09)] whitespace-nowrap" data-node-id="4223:127224">
            Profile
          </p>
        </div>
        <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
        <div className="content-stretch flex flex-col gap-[20px] items-start p-[24px] relative shrink-0 w-full" data-node-id="4223:127226" data-name="Card Body">
          <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-node-id="4223:127227" data-name="Avatar Row">
            <Avatar className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[48px]" />
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[20px] relative shrink-0 w-[100px] whitespace-nowrap" data-node-id="4223:127230" data-name="Avatar Info">
              <p className="font-[family-name:var(--font\/family\/header,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] relative shrink-0 text-[14px] text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4223:127231">
                Ludvig Rask
              </p>
              <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)]" data-node-id="4223:127232">
                Click to change photo
              </p>
            </div>
          </div>
          <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-node-id="4223:127233" data-name="Row 1">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative" data-node-id="4223:127234" data-name="Full name Field">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="4223:127235" data-name="Full name">
                <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:127235;3503:3030">
                  <p className="leading-[20px]">Full name</p>
                </div>
              </div>
              <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[var(--spacing-4,0px)] h-[32px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full" data-node-id="4223:127240" data-name="Text Input">
                <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-px relative text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)]" data-node-id="I4223:127240;4093:7457">
                  Ludvig Rask
                </p>
              </div>
            </div>
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative" data-node-id="4223:127243" data-name="Email Field">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="4223:127244" data-name="Email">
                <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:127244;3503:3030">
                  <p className="leading-[20px]">Email</p>
                </div>
              </div>
              <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[var(--spacing-4,0px)] h-[32px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full" data-node-id="4223:127249" data-name="Text Input">
                <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-px relative text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)]" data-node-id="I4223:127249;4093:7457">
                  ludvig@taskflow.io
                </p>
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-node-id="4223:127252" data-name="Row 2">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative" data-node-id="4223:127253" data-name="Job title Field">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="4223:127254" data-name="Job title">
                <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:127254;3503:3030">
                  <p className="leading-[20px]">Job title</p>
                </div>
              </div>
              <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[var(--spacing-4,0px)] h-[32px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full" data-node-id="4223:127259" data-name="Text Input">
                <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-px relative text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)]" data-node-id="I4223:127259;4093:7457">
                  Product Designer
                </p>
              </div>
            </div>
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative" data-node-id="4223:127262" data-name="Phone Field">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="4223:127263" data-name="Phone">
                <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:127263;3503:3030">
                  <p className="leading-[20px]">Phone</p>
                </div>
              </div>
              <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[var(--spacing-4,0px)] h-[32px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full" data-node-id="4223:127268" data-name="Text Input">
                <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-px relative text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)]" data-node-id="I4223:127268;4093:7457">
                  +1 (555) 000-0000
                </p>
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-node-id="4223:127271" data-name="Row 3">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative" data-node-id="4223:127272" data-name="Location Field">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="4223:127273" data-name="Location">
                <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:127273;3503:3030">
                  <p className="leading-[20px]">Location</p>
                </div>
              </div>
              <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[var(--spacing-4,0px)] h-[32px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full" data-node-id="4223:127278" data-name="Text Input">
                <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-px relative text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)]" data-node-id="I4223:127278;4093:7457">
                  San Francisco, CA
                </p>
              </div>
            </div>
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative" data-node-id="4223:127281" data-name="Time zone Field">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="4223:127282" data-name="Time zone">
                <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:127282;3503:3030">
                  <p className="leading-[20px]">Time zone</p>
                </div>
              </div>
              <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[var(--spacing-4,0px)] h-[32px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full" data-node-id="4223:127287" data-name="Text Input">
                <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-px relative text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)]" data-node-id="I4223:127287;4093:7457">
                  Pacific Time (UTC-8)
                </p>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-node-id="4223:127290" data-name="Bio Field">
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="4223:127291" data-name="Bio">
              <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:127291;3503:3030">
                <p className="leading-[20px]">Bio</p>
              </div>
            </div>
            <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex flex-col gap-[var(--spacing-6,6px)] items-end justify-end overflow-clip px-[var(--spacing-8,8px)] py-[var(--spacing-6,6px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full" data-node-id="4223:127296" data-name="Text Area">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[1.5] min-w-full relative shrink-0 text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-[length:var(--font\/size\/small,13px)] w-[min-content]" data-node-id="I4223:127296;3609:3542">
                Placeholder
              </p>
              <div className="relative shrink-0 size-[15px]" data-node-id="I4223:127296;3609:3543" data-name="resize">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+1px)] size-[10.864px] top-[calc(50%+1px)]" data-node-id="I4223:127296;3609:3543;13721:2301347" data-name="Vector">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex items-start justify-end relative shrink-0 w-full" data-node-id="4223:127300" data-name="Actions">
            <div className="content-stretch flex gap-[var(--spacing-6,6px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.4),0px_0px_0px_1px_#18181b] shrink-0" data-node-id="4223:127301" data-name="Save changes">
              <div aria-hidden="true" className="absolute bg-[var(--buttons\/button-inverted,#282a27)] inset-0 pointer-events-none rounded-[var(--radius-6,6px)]" />
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--contrast\/contrast-fg-primary,rgba(255,255,255,0.88))] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:127301;5934:2712">
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

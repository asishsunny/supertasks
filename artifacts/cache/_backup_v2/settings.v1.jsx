const imgBackground = "https://www.figma.com/api/mcp/asset/53f4c648-2f3a-465f-ac81-3a9746f85754";
const imgVector = "https://www.figma.com/api/mcp/asset/28e4265d-a97a-4e7f-8663-c2ce798e3d89";

export default function SettingsContent() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative size-full" data-node-id="4223:127208" data-name="Settings Content">
      <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-col items-start overflow-clip py-[8px] relative rounded-[8px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)] shrink-0 w-[200px]">
        <div className="bg-[var(--backgrounds\/bg-subtle,#f8faf7)] border-[var(--foregrounds\/fg-base,#0a0b09)] border-l-2 border-solid content-stretch flex items-center px-[16px] py-[10px] relative shrink-0 w-full">
          <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)]">Profile</p>
        </div>
        <div className="content-stretch flex items-center px-[16px] py-[10px] relative shrink-0 w-full">
          <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)]">Notifications</p>
        </div>
        <div className="content-stretch flex items-center px-[16px] py-[10px] relative shrink-0 w-full">
          <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)]">Security</p>
        </div>
        <div className="content-stretch flex items-center px-[16px] py-[10px] relative shrink-0 w-full">
          <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)]">Billing</p>
        </div>
      </div>
      <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative rounded-[8px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)]">
        <div className="content-stretch flex flex-col items-start px-[24px] py-[12px] relative shrink-0 w-full">
          <p className="font-[family-name:var(--font\/family\/header,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[14px] text-[color:var(--foregrounds\/fg-base,#0a0b09)]">Profile</p>
        </div>
        <div className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
        <div className="content-stretch flex flex-col gap-[20px] items-start p-[24px] relative shrink-0 w-full">
          <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[48px]">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 rounded-[var(--radius-full,999px)] size-[44px] top-1/2">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[var(--radius-full,999px)] size-full" src={imgBackground} />
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-[100px]">
              <p className="font-[family-name:var(--font\/family\/header,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[14px] text-[color:var(--foregrounds\/fg-base,#0a0b09)]">Ludvig Rask</p>
              <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)]">Click to change photo</p>
            </div>
          </div>
          <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative">
              <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)]">Full name</p>
              <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex h-[32px] items-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full">
                <p className="flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)]">Ludvig Rask</p>
              </div>
            </div>
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative">
              <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)]">Email</p>
              <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex h-[32px] items-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full">
                <p className="flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)]">ludvig@taskflow.io</p>
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative">
              <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)]">Job title</p>
              <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex h-[32px] items-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full">
                <p className="flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)]">Product Designer</p>
              </div>
            </div>
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative">
              <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)]">Phone</p>
              <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex h-[32px] items-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full">
                <p className="flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)]">+1 (555) 000-0000</p>
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative">
              <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)]">Location</p>
              <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex h-[32px] items-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full">
                <p className="flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)]">San Francisco, CA</p>
              </div>
            </div>
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative">
              <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)]">Time zone</p>
              <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex h-[32px] items-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full">
                <p className="flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)]">Pacific Time (UTC-8)</p>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
            <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)]">Bio</p>
            <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex flex-col gap-[var(--spacing-6,6px)] items-end justify-end overflow-clip px-[var(--spacing-8,8px)] py-[var(--spacing-6,6px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full">
              <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[1.5] min-w-full relative shrink-0 text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-[length:var(--font\/size\/small,13px)]">Placeholder</p>
              <div className="relative shrink-0 size-[15px]">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector} />
              </div>
            </div>
          </div>
          <div className="content-stretch flex items-start justify-end relative shrink-0 w-full">
            <div className="content-stretch flex gap-[var(--spacing-6,6px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.4),0px_0px_0px_1px_#18181b] shrink-0">
              <div aria-hidden className="absolute bg-[var(--buttons\/button-inverted,#282a27)] inset-0 pointer-events-none rounded-[var(--radius-6,6px)]" />
              <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--contrast\/contrast-fg-primary,rgba(255,255,255,0.88))] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap">Save changes</p>
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0.75px_0px_0px_rgba(255,255,255,0.2)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

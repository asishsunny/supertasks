const imgVector = "https://www.figma.com/api/mcp/asset/9a5dd064-be5f-47f8-8741-75684057e42e";
const imgVector1 = "https://www.figma.com/api/mcp/asset/d2e5e1ab-17e3-4c10-b791-828a3267374c";
const imgVector2 = "https://www.figma.com/api/mcp/asset/2277509c-10dd-43b1-987f-41bd18b740b7";

export default function CreateTaskModal() {
  return (
    <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-col items-start overflow-clip relative rounded-[12px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)] size-full" data-node-id="4223:127016" data-name="Create Task Modal">
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="4223:127017" data-name="header">
        <div className="content-stretch flex items-center justify-between px-[24px] py-[8px] relative shrink-0 w-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/header,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] min-w-px relative text-[14px] text-[color:var(--foregrounds\/fg-base,#0a0b09)]">Create new task</p>
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
            <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] border border-[var(--borders\/border-base,#e5e7e4)] border-solid content-stretch flex flex-col h-[16px] items-center justify-center overflow-clip px-[var(--spacing-4,4px)] relative rounded-[var(--radius-4,4px)] shrink-0">
              <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap">Esc</p>
            </div>
            <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[28px]">
              <div className="relative shrink-0 size-[15px]">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[9px] top-1/2">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
      </div>
      <div className="content-stretch flex flex-col gap-[20px] items-start p-[24px] relative shrink-0 w-full">
        <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
          <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)]">Task name</p>
          <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex h-[32px] items-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full">
            <p className="flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-[length:var(--font\/size\/small,13px)]">Enter task name...</p>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
          <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)]">Description</p>
          <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex flex-col gap-[var(--spacing-6,6px)] items-end justify-end overflow-clip px-[var(--spacing-8,8px)] py-[var(--spacing-6,6px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full">
            <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[1.5] min-w-full relative shrink-0 text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-[length:var(--font\/size\/small,13px)]">Add a description...</p>
            <div className="relative shrink-0 size-[15px]">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector1} />
            </div>
          </div>
        </div>
        <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative">
            <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)]">Priority</p>
            <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[8px] items-center overflow-clip px-[8px] py-[6px] relative rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full">
              <p className="flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-[length:var(--font\/size\/small,13px)]">Select</p>
              <div className="relative shrink-0 size-[15px]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector2} /></div>
            </div>
          </div>
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative">
            <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)]">Status</p>
            <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[8px] items-center overflow-clip px-[8px] py-[6px] relative rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full">
              <p className="flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-[length:var(--font\/size\/small,13px)]">Select</p>
              <div className="relative shrink-0 size-[15px]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector2} /></div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative">
            <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)]">Assignee</p>
            <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[8px] items-center overflow-clip px-[8px] py-[6px] relative rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full">
              <p className="flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-[length:var(--font\/size\/small,13px)]">Select</p>
              <div className="relative shrink-0 size-[15px]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector2} /></div>
            </div>
          </div>
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative">
            <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)]">Due date</p>
            <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[8px] items-center overflow-clip px-[8px] py-[6px] relative rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full">
              <p className="flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-[length:var(--font\/size\/small,13px)]">Select</p>
              <div className="relative shrink-0 size-[15px]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector2} /></div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
        <div className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
        <div className="content-stretch flex gap-[8px] items-center justify-end px-[24px] py-[16px] relative shrink-0 w-full">
          <div className="bg-[var(--buttons\/button-neutral,white)] content-stretch flex gap-[var(--spacing-6,6px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0">
            <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap">Cancel</p>
          </div>
          <div className="content-stretch flex gap-[var(--spacing-6,6px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.4),0px_0px_0px_1px_#18181b] shrink-0">
            <div aria-hidden className="absolute bg-[var(--buttons\/button-inverted,#282a27)] inset-0 pointer-events-none rounded-[var(--radius-6,6px)]" />
            <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--contrast\/contrast-fg-primary,rgba(255,255,255,0.88))] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap">Create task</p>
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0.75px_0px_0px_rgba(255,255,255,0.2)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

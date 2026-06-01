const imgVector = "https://www.figma.com/api/mcp/asset/1e60c6e5-a0ae-43d2-b248-37c91058cc1a";

function TableCell({ className, alignment = "Left", type = "Base" }) {
  const isActionsAndRight = type === "Actions" && alignment === "Right";
  return (
    <div className={className || `content-stretch flex h-[48px] items-center relative ${isActionsAndRight ? "justify-end" : ""}`}>
      {isActionsAndRight && (
        <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[28px]">
          <div className="relative shrink-0 size-[15px]">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
              <div className="absolute inset-[42.04%_7.96%]">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function HorizontalDivider({ className }) {
  return <div className={className || "bg-[var(--borders\/border-base,#e5e7e4)] h-px overflow-clip relative w-full"} />;
}

export default function RecentTasks() {
  return (
    <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-col gap-[var(--spacing-0,0px)] items-start overflow-clip p-[var(--spacing-0,0px)] relative rounded-[var(--radius-12,12px)] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)] size-full" data-node-id="4223:126439" data-name="Recent Tasks">
      <div className="content-stretch flex items-start overflow-clip pb-[16px] pt-[24px] px-[24px] relative shrink-0 w-full" data-node-id="4223:126440" data-name="Title Wrapper">
        <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4223:126441">
          Recent Tasks
        </p>
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="4223:126442" data-name="Table">
        <div className="bg-[var(--backgrounds\/bg-subtle,#f8faf7)] content-stretch flex gap-[12px] h-[48px] items-center justify-center pl-[24px] pr-[64px] relative shrink-0 w-full" data-node-id="4223:126443" data-name="Table Header">
          <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative">
            <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap">Task</p>
          </div>
          <div className="content-stretch flex h-full items-center relative shrink-0 w-[160px]">
            <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap">Assignee</p>
          </div>
          <div className="content-stretch flex h-full items-center relative shrink-0 w-[120px]">
            <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap">Priority</p>
          </div>
          <div className="content-stretch flex h-full items-center relative shrink-0 w-[130px]">
            <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap">Due Date</p>
          </div>
          <div className="content-stretch flex h-full items-center relative shrink-0 w-[140px]">
            <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap">Status</p>
          </div>
        </div>
        <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
        {/* Row: Icon system audit */}
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[12px] h-[48px] items-center justify-center px-[24px] relative shrink-0 w-full" data-node-id="4223:126455" data-name="Icon system audit">
          <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative">
            <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap">Icon system audit</p>
          </div>
          <div className="content-stretch flex gap-[var(--spacing-8,8px)] h-full items-center relative shrink-0 w-[160px]">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/success\/tag-green-bg,rgba(16,185,129,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2">
                <p className="-translate-x-1/2 absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/success\/tag-green-text,#065f46)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap">L</p>
              </div>
            </div>
            <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap">Lara Sato</p>
          </div>
          <div className="content-stretch flex h-full items-center relative shrink-0 w-[120px]">
            <div className="bg-[var(--tag\/neutral\/tag-neutral-bg,#f4f5f4)] border border-[var(--tag\/neutral\/tag-neutral-border,#e5e7e4)] border-solid content-stretch flex h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0">
              <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/neutral\/tag-neutral-text,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap">Low</p>
            </div>
          </div>
          <div className="content-stretch flex h-full items-center relative shrink-0 w-[130px]">
            <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-error,#e11d48)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap">May 7, 2026</p>
          </div>
          <div className="content-stretch flex gap-[var(--spacing-4,4px)] h-full items-center relative shrink-0 w-[140px]">
            <div className="overflow-clip relative shrink-0 size-[15px]">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/neutral\/tag-neutral-icon,#a4aaa1)] border border-[var(--alpha-black\/alpha-12,rgba(0,0,0,0.12))] border-solid left-1/2 rounded-[2px] size-[8px] top-1/2" />
            </div>
            <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap">To Do</p>
          </div>
          <TableCell alignment="Right" className="content-stretch flex h-full items-center justify-end relative shrink-0" type="Actions" />
        </div>
        <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
        {/* Row: Mobile nav refactor */}
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[12px] h-[48px] items-center justify-center px-[24px] relative shrink-0 w-full" data-node-id="4223:126482" data-name="Mobile nav refactor">
          <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative">
            <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap">Mobile nav refactor</p>
          </div>
          <div className="content-stretch flex gap-[var(--spacing-8,8px)] h-full items-center relative shrink-0 w-[160px]">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/blue\/tag-blue-bg,rgba(59,130,246,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2">
                <p className="-translate-x-1/2 absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/blue\/tag-blue-text,#1e40af)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap">S</p>
              </div>
            </div>
            <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap">Sara Nelson</p>
          </div>
          <div className="content-stretch flex h-full items-center relative shrink-0 w-[120px]">
            <div className="bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] border border-[var(--tag\/warning\/tag-orange-border,#fed7aa)] border-solid content-stretch flex h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0">
              <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap">Medium</p>
            </div>
          </div>
          <div className="content-stretch flex h-full items-center relative shrink-0 w-[130px]">
            <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-error,#e11d48)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap">May 11, 2026</p>
          </div>
          <div className="content-stretch flex gap-[var(--spacing-4,4px)] h-full items-center relative shrink-0 w-[140px]">
            <div className="overflow-clip relative shrink-0 size-[15px]">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/blue\/tag-blue-icon,#60a5fa)] border border-[var(--alpha-black\/alpha-12,rgba(0,0,0,0.12))] border-solid left-1/2 rounded-[2px] size-[8px] top-1/2" />
            </div>
            <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap">In Progress</p>
          </div>
          <TableCell alignment="Right" className="content-stretch flex h-full items-center justify-end relative shrink-0" type="Actions" />
        </div>
        <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
        {/* Row: Performance audit */}
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[12px] h-[48px] items-center justify-center px-[24px] relative shrink-0 w-full" data-node-id="4223:126514" data-name="Performance audit">
          <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative">
            <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap">Performance audit</p>
          </div>
          <div className="content-stretch flex gap-[var(--spacing-8,8px)] h-full items-center relative shrink-0 w-[160px]">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/neutral\/tag-neutral-bg,#f4f5f4)] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2">
                <p className="-translate-x-1/2 absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/neutral\/tag-neutral-text,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap">O</p>
              </div>
            </div>
            <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap">Owen King</p>
          </div>
          <div className="content-stretch flex h-full items-center relative shrink-0 w-[120px]">
            <div className="bg-[var(--tag\/error\/tag-red-bg,rgba(244,63,94,0.12))] border border-[var(--tag\/error\/tag-red-border,#fecdd3)] border-solid content-stretch flex h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0">
              <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/error\/tag-red-text,#9f1239)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap">High</p>
            </div>
          </div>
          <div className="content-stretch flex h-full items-center relative shrink-0 w-[130px]">
            <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap">May 16, 2026</p>
          </div>
          <div className="content-stretch flex gap-[var(--spacing-4,4px)] h-full items-center relative shrink-0 w-[140px]">
            <div className="overflow-clip relative shrink-0 size-[15px]">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/warning\/tag-orange-icon,#f97316)] border border-[var(--alpha-black\/alpha-12,rgba(0,0,0,0.12))] border-solid left-1/2 rounded-[2px] size-[8px] top-1/2" />
            </div>
            <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap">In Review</p>
          </div>
          <TableCell alignment="Right" className="content-stretch flex h-full items-center justify-end relative shrink-0" type="Actions" />
        </div>
        <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
        {/* Row: User research interviews */}
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[12px] h-[48px] items-center justify-center px-[24px] relative shrink-0 w-full" data-node-id="4223:126546" data-name="User research interviews">
          <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative">
            <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap">User research interviews</p>
          </div>
          <div className="content-stretch flex gap-[var(--spacing-8,8px)] h-full items-center relative shrink-0 w-[160px]">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2">
                <p className="-translate-x-1/2 absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap">P</p>
              </div>
            </div>
            <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap">Priya Rao</p>
          </div>
          <div className="content-stretch flex h-full items-center relative shrink-0 w-[120px]">
            <div className="bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] border border-[var(--tag\/warning\/tag-orange-border,#fed7aa)] border-solid content-stretch flex h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0">
              <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap">Medium</p>
            </div>
          </div>
          <div className="content-stretch flex h-full items-center relative shrink-0 w-[130px]">
            <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap">May 20, 2026</p>
          </div>
          <div className="content-stretch flex gap-[var(--spacing-4,4px)] h-full items-center relative shrink-0 w-[140px]">
            <div className="overflow-clip relative shrink-0 size-[15px]">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/neutral\/tag-neutral-icon,#a4aaa1)] border border-[var(--alpha-black\/alpha-12,rgba(0,0,0,0.12))] border-solid left-1/2 rounded-[2px] size-[8px] top-1/2" />
            </div>
            <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap">To Do</p>
          </div>
          <TableCell alignment="Right" className="content-stretch flex h-full items-center justify-end relative shrink-0" type="Actions" />
        </div>
        <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
        {/* Row: Setup CI/CD pipeline */}
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[12px] h-[48px] items-center justify-center px-[24px] relative shrink-0 w-full" data-node-id="4223:126578" data-name="Setup CI/CD pipeline">
          <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative">
            <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap">Setup CI/CD pipeline</p>
          </div>
          <div className="content-stretch flex gap-[var(--spacing-8,8px)] h-full items-center relative shrink-0 w-[160px]">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/purple\/tag-purple-bg,rgba(139,92,246,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2">
                <p className="-translate-x-1/2 absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/purple\/tag-purple-text,#5b21b6)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap">M</p>
              </div>
            </div>
            <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap">Mark Tan</p>
          </div>
          <div className="content-stretch flex h-full items-center relative shrink-0 w-[120px]">
            <div className="bg-[var(--tag\/error\/tag-red-bg,rgba(244,63,94,0.12))] border border-[var(--tag\/error\/tag-red-border,#fecdd3)] border-solid content-stretch flex h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0">
              <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/error\/tag-red-text,#9f1239)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap">High</p>
            </div>
          </div>
          <div className="content-stretch flex h-full items-center relative shrink-0 w-[130px]">
            <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap">May 25, 2026</p>
          </div>
          <div className="content-stretch flex gap-[var(--spacing-4,4px)] h-full items-center relative shrink-0 w-[140px]">
            <div className="overflow-clip relative shrink-0 size-[15px]">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/blue\/tag-blue-icon,#60a5fa)] border border-[var(--alpha-black\/alpha-12,rgba(0,0,0,0.12))] border-solid left-1/2 rounded-[2px] size-[8px] top-1/2" />
            </div>
            <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap">In Progress</p>
          </div>
          <TableCell alignment="Right" className="content-stretch flex h-full items-center justify-end relative shrink-0" type="Actions" />
        </div>
      </div>
    </div>
  );
}

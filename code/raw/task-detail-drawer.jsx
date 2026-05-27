const imgVector = "https://www.figma.com/api/mcp/asset/fa763ae1-fe6a-486c-b75e-d78fd1dc058f";

function HorizontalDivider({ className }) {
  return <div className={className || "bg-[var(--borders\\/border-base,#e5e7e4)] h-px overflow-clip relative w-[933px]"} />;
}

export default function TaskDetailsModal() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[12px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_8px_16px_0px_rgba(0,0,0,0.08),0px_16px_32px_0px_rgba(0,0,0,0.08)] size-full" data-node-id="4417:109607" data-name="Task Details Modal">
      <div aria-hidden="true" className="absolute bg-[var(--backgrounds\/bg-base,white)] inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-node-id="4417:109608" data-name="header">
        <div className="content-stretch flex items-center justify-between px-[24px] py-[8px] relative shrink-0 w-full" data-node-id="4417:109609" data-name="title + button">
          <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/header,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] min-w-px relative text-[14px] text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4417:109610">
            Task details
          </p>
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="4417:109611" data-name="buttons">
            <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] border border-[var(--borders\/border-base,#e5e7e4)] border-solid content-stretch flex flex-col h-[16px] items-center justify-center overflow-clip px-[var(--spacing-4,4px)] relative rounded-[var(--radius-4,4px)] shrink-0" data-node-id="4417:109612" data-name="Kbd">
              <p className="leading-[20px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/xsmall,12px)]">Esc</p>
            </div>
            <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[28px]" data-node-id="4417:109613" data-name="Close">
              <div className="relative shrink-0 size-[15px]" data-name="x-mark">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector} />
              </div>
            </div>
          </div>
        </div>
        <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px pb-[24px] pt-[16px] px-[24px] relative w-full" data-node-id="4417:109615" data-name="Content">
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-node-id="4417:109616" data-name="Title Group">
          <p className="font-[family-name:var(--font\/family\/header,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[28px] relative shrink-0 text-[18px] text-[color:var(--foregrounds\/fg-base,#0a0b09)] w-full">
            Update onboarding flow
          </p>
          <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[1.5] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] w-full">
            Description text here
          </p>
        </div>
        <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-node-id="4417:109619" data-name="Section 1">
          <p className="font-[var(--font\/weight\/500,500)] leading-[20px] text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)]">Info</p>
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
            <p className="text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)]">Status</p>
            <p>Badge</p>
          </div>
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
            <p className="text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)]">Priority</p>
            <p>Badge</p>
          </div>
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
            <p className="text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)]">Assignee</p>
            <p>Avatar + Name</p>
          </div>
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
            <p className="text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)]">Due date</p>
            <p className="text-[color:var(--foregrounds\/fg-error,#e11d48)]">May 19, 2026</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-node-id="4417:109654" data-name="footer">
        <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
        <div className="content-stretch flex gap-[8px] items-center justify-end px-[24px] py-[16px] relative shrink-0 w-full">
          <button>Edit</button>
          <button>Mark complete</button>
        </div>
      </div>
    </div>
  );
}

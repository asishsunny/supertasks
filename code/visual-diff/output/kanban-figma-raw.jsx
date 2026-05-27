function SquareGreenSolid({ className }: { className?: string }) {
  return (
    <div className={className || "overflow-clip relative size-[15px]"} data-node-id="4004:301" data-name="square-green-solid">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/success\/tag-green-icon,#10b981)] border border-[var(--alpha-black\/alpha-12,rgba(0,0,0,0.12))] border-solid left-1/2 rounded-[2px] size-[8px] top-1/2" data-node-id="4004:302" />
    </div>
  );
}

function SquareOrangeSolid({ className }: { className?: string }) {
  return (
    <div className={className || "overflow-clip relative size-[15px]"} data-node-id="4071:5584" data-name="square-orange-solid">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/warning\/tag-orange-icon,#f97316)] border border-[var(--alpha-black\/alpha-12,rgba(0,0,0,0.12))] border-solid left-1/2 rounded-[2px] size-[8px] top-1/2" data-node-id="4071:5585" />
    </div>
  );
}

function SquareBlueSolid({ className }: { className?: string }) {
  return (
    <div className={className || "overflow-clip relative size-[15px]"} data-node-id="4004:297" data-name="square-blue-solid">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/blue\/tag-blue-icon,#60a5fa)] border border-[var(--alpha-black\/alpha-12,rgba(0,0,0,0.12))] border-solid left-1/2 rounded-[2px] size-[8px] top-1/2" data-node-id="4004:298" />
    </div>
  );
}

function SquareGreySolid({ className }: { className?: string }) {
  return (
    <div className={className || "overflow-clip relative size-[15px]"} data-node-id="4131:3931" data-name="square-grey-solid">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/neutral\/tag-neutral-icon,#a4aaa1)] border border-[var(--alpha-black\/alpha-12,rgba(0,0,0,0.12))] border-solid left-1/2 rounded-[2px] size-[8px] top-1/2" data-node-id="4131:3932" />
    </div>
  );
}

export default function KanbanBoard() {
  return (
    <div className="content-stretch flex gap-[var(--spacing-16,16px)] items-start relative size-full" data-node-id="4229:78906" data-name="Kanban Board">
      <div className="bg-[var(--backgrounds\/bg-kanban-column,rgba(0,0,0,0.04))] content-stretch flex flex-[1_0_0] flex-col gap-[var(--spacing-8,8px)] h-full items-start min-w-px p-[var(--spacing-8,8px)] relative rounded-[var(--radius-12,12px)]" data-node-id="4229:78907" data-name="To Do">
        <div className="content-stretch flex gap-[6px] items-center overflow-clip py-[4px] relative shrink-0 w-full" data-node-id="4229:78908" data-name="Header">
          <SquareGreySolid className="overflow-clip relative shrink-0 size-[15px]" />
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4229:78911">
            To Do
          </p>
          <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4229:78912" data-name="_" />
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4229:78913">
            6
          </p>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4229:78914" data-name="Customer interviews">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4229:78915">
            Customer interviews
          </p>
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[14px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4229:78916">
            Schedule and run five user feedback sessions
          </p>
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4229:78917" data-name="Meta">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4229:78918" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/success\/tag-green-bg,rgba(16,185,129,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4229:78918;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/success\/tag-green-text,#065f46)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4229:78918;5726:636">
                  L
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4229:78921">
              Lara
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4229:78922" data-name="_" />
            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4229:78923">
              May 21
            </p>
            <div className="bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] border border-[var(--tag\/warning\/tag-orange-border,#fed7aa)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4229:78924" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4229:78924;6180:143">
                Medium
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4229:78935" data-name="Migrate analytics SDK">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4229:78936">
            Migrate analytics SDK
          </p>
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[14px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4229:78937">
            Switch from legacy tracker to new events API
          </p>
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4229:78938" data-name="Meta">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4229:78939" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/purple\/tag-purple-bg,rgba(139,92,246,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4229:78939;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/purple\/tag-purple-text,#5b21b6)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4229:78939;5726:636">
                  M
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4229:78942">
              Mark
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4229:78943" data-name="_" />
            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4229:78944">
              May 19
            </p>
            <div className="bg-[var(--tag\/error\/tag-red-bg,rgba(244,63,94,0.12))] border border-[var(--tag\/error\/tag-red-border,#fecdd3)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4229:78945" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/error\/tag-red-text,#9f1239)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4229:78945;6180:145">
                High
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4229:78956" data-name="Write API documentation">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4229:78957">
            Write API documentation
          </p>
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[14px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4229:78958">
            Document all public endpoints with examples
          </p>
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4229:78959" data-name="Meta">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4229:78960" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/neutral\/tag-neutral-bg,#f4f5f4)] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4229:78960;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/neutral\/tag-neutral-text,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4229:78960;5726:636">
                  O
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4229:78963">
              Owen
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4229:78964" data-name="_" />
            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4229:78965">
              May 29
            </p>
            <div className="bg-[var(--tag\/neutral\/tag-neutral-bg,#f4f5f4)] border border-[var(--tag\/neutral\/tag-neutral-border,#e5e7e4)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4229:78966" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/neutral\/tag-neutral-text,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4229:78966;6180:151">
                Low
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4229:78977" data-name="User research interviews">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4229:78978">
            User research interviews
          </p>
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[14px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4229:78979">
            Recruit participants and prepare script
          </p>
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4229:78980" data-name="Meta">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4229:78981" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4229:78981;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4229:78981;5726:636">
                  P
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4229:78984">
              Priya
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4229:78985" data-name="_" />
            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-error,#e11d48)] whitespace-nowrap" data-node-id="4229:78986">
              May 11
            </p>
            <div className="bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] border border-[var(--tag\/warning\/tag-orange-border,#fed7aa)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4229:78987" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4229:78987;6180:143">
                Medium
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4229:78998" data-name="Icon system audit">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4229:78999">
            Icon system audit
          </p>
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[14px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4229:79000">
            Catalog all icons and remove unused SVGs
          </p>
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4229:79001" data-name="Meta">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4229:79002" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/success\/tag-green-bg,rgba(16,185,129,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4229:79002;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/success\/tag-green-text,#065f46)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4229:79002;5726:636">
                  L
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4229:79005">
              Lara
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4229:79006" data-name="_" />
            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4229:79007">
              Jun 3
            </p>
            <div className="bg-[var(--tag\/neutral\/tag-neutral-bg,#f4f5f4)] border border-[var(--tag\/neutral\/tag-neutral-border,#e5e7e4)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4229:79008" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/neutral\/tag-neutral-text,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4229:79008;6180:151">
                Low
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4229:79019" data-name="Accessibility pass">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4229:79020">
            Accessibility pass
          </p>
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[14px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4229:79021">
            Fix contrast ratios and add ARIA labels
          </p>
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4229:79022" data-name="Meta">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4229:79023" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/neutral\/tag-neutral-bg,#f4f5f4)] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4229:79023;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/neutral\/tag-neutral-text,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4229:79023;5726:636">
                  O
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4229:79026">
              Owen
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4229:79027" data-name="_" />
            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4229:79028">
              May 22
            </p>
            <div className="bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] border border-[var(--tag\/warning\/tag-orange-border,#fed7aa)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4229:79029" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4229:79029;6180:143">
                Medium
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[var(--backgrounds\/bg-kanban-column,rgba(0,0,0,0.04))] content-stretch flex flex-[1_0_0] flex-col gap-[var(--spacing-8,8px)] h-full items-start min-w-px p-[var(--spacing-8,8px)] relative rounded-[var(--radius-12,12px)]" data-node-id="4229:79040" data-name="In Progress">
        <div className="content-stretch flex gap-[6px] items-center overflow-clip py-[4px] relative shrink-0 w-full" data-node-id="4229:79041" data-name="Header">
          <SquareBlueSolid className="overflow-clip relative shrink-0 size-[15px]" />
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4229:79044">
            In Progress
          </p>
          <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4229:79045" data-name="_" />
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4229:79046">
            5
          </p>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4229:79047" data-name="Update onboarding flow">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4229:79048">
            Update onboarding flow
          </p>
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[14px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4229:79049">
            Revamp first-run experience for new users
          </p>
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4229:79050" data-name="Meta">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4229:79051" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/blue\/tag-blue-bg,rgba(59,130,246,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4229:79051;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/blue\/tag-blue-text,#1e40af)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4229:79051;5726:636">
                  S
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4229:79054">
              Sara
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4229:79055" data-name="_" />
            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-error,#e11d48)] whitespace-nowrap" data-node-id="4229:79056">
              May 8
            </p>
            <div className="bg-[var(--tag\/error\/tag-red-bg,rgba(244,63,94,0.12))] border border-[var(--tag\/error\/tag-red-border,#fecdd3)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4229:79057" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/error\/tag-red-text,#9f1239)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4229:79057;6180:145">
                High
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4229:79068" data-name="Fix billing bug #482">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4229:79069">
            Fix billing bug #482
          </p>
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[14px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4229:79070">
            Null ref in payment callback causing failed charges
          </p>
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4229:79071" data-name="Meta">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4229:79072" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/error\/tag-red-bg,rgba(244,63,94,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4229:79072;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/error\/tag-red-text,#9f1239)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4229:79072;5726:636">
                  B
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4229:79075">
              Ben
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4229:79076" data-name="_" />
            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-error,#e11d48)] whitespace-nowrap" data-node-id="4229:79077">
              May 6
            </p>
            <div className="bg-[var(--tag\/purple\/tag-purple-bg,rgba(139,92,246,0.12))] border border-[var(--tag\/purple\/tag-purple-border,#ddd6fe)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4229:79078" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/purple\/tag-purple-text,#5b21b6)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4229:79078;6180:149">
                Critical
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4229:79089" data-name="Redesign landing page">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4229:79090">
            Redesign landing page
          </p>
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[14px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4229:79091">
            New hero section and updated feature grid
          </p>
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4229:79092" data-name="Meta">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4229:79093" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/success\/tag-green-bg,rgba(16,185,129,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4229:79093;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/success\/tag-green-text,#065f46)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4229:79093;5726:636">
                  L
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4229:79096">
              Lara
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4229:79097" data-name="_" />
            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4229:79098">
              May 15
            </p>
            <div className="bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] border border-[var(--tag\/warning\/tag-orange-border,#fed7aa)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4229:79099" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4229:79099;6180:143">
                Medium
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4229:79110" data-name="Setup CI/CD pipeline">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4229:79111">
            Setup CI/CD pipeline
          </p>
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[14px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4229:79112">
            Configure GitHub Actions for staging deploys
          </p>
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4229:79113" data-name="Meta">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4229:79114" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/purple\/tag-purple-bg,rgba(139,92,246,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4229:79114;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/purple\/tag-purple-text,#5b21b6)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4229:79114;5726:636">
                  M
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4229:79117">
              Mark
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4229:79118" data-name="_" />
            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4229:79119">
              May 26
            </p>
            <div className="bg-[var(--tag\/error\/tag-red-bg,rgba(244,63,94,0.12))] border border-[var(--tag\/error\/tag-red-border,#fecdd3)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4229:79120" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/error\/tag-red-text,#9f1239)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4229:79120;6180:145">
                High
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4229:79131" data-name="Mobile nav refactor">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4229:79132">
            Mobile nav refactor
          </p>
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[14px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4229:79133">
            Replace drawer with bottom tab navigation
          </p>
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4229:79134" data-name="Meta">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4229:79135" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/blue\/tag-blue-bg,rgba(59,130,246,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4229:79135;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/blue\/tag-blue-text,#1e40af)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4229:79135;5726:636">
                  S
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4229:79138">
              Sara
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4229:79139" data-name="_" />
            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-error,#e11d48)] whitespace-nowrap" data-node-id="4229:79140">
              May 12
            </p>
            <div className="bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] border border-[var(--tag\/warning\/tag-orange-border,#fed7aa)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4229:79141" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4229:79141;6180:143">
                Medium
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[var(--backgrounds\/bg-kanban-column,rgba(0,0,0,0.04))] content-stretch flex flex-[1_0_0] flex-col gap-[var(--spacing-8,8px)] h-full items-start min-w-px p-[var(--spacing-8,8px)] relative rounded-[var(--radius-12,12px)]" data-node-id="4229:79152" data-name="In Review">
        <div className="content-stretch flex gap-[6px] items-center overflow-clip py-[4px] relative shrink-0 w-full" data-node-id="4229:79153" data-name="Header">
          <SquareOrangeSolid className="overflow-clip relative shrink-0 size-[15px]" />
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4229:79156">
            In Review
          </p>
          <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4229:79157" data-name="_" />
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4229:79158">
            4
          </p>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4229:79159" data-name="Q2 roadmap review">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4229:79160">
            Q2 roadmap review
          </p>
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[14px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4229:79161">
            Align team on priorities for next quarter
          </p>
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4229:79162" data-name="Meta">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4229:79163" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4229:79163;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4229:79163;5726:636">
                  P
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4229:79166">
              Priya
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4229:79167" data-name="_" />
            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-error,#e11d48)] whitespace-nowrap" data-node-id="4229:79168">
              May 13
            </p>
            <div className="bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] border border-[var(--tag\/warning\/tag-orange-border,#fed7aa)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4229:79169" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4229:79169;6180:143">
                Medium
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4229:79180" data-name="Design QA — Settings">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4229:79181">
            Design QA — Settings
          </p>
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[14px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4229:79182">
            Verify settings page matches latest design specs
          </p>
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4229:79183" data-name="Meta">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4229:79184" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/blue\/tag-blue-bg,rgba(59,130,246,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4229:79184;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/blue\/tag-blue-text,#1e40af)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4229:79184;5726:636">
                  S
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4229:79187">
              Sara
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4229:79188" data-name="_" />
            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4229:79189">
              May 17
            </p>
            <div className="bg-[var(--tag\/error\/tag-red-bg,rgba(244,63,94,0.12))] border border-[var(--tag\/error\/tag-red-border,#fecdd3)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4229:79190" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/error\/tag-red-text,#9f1239)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4229:79190;6180:145">
                High
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4229:79201" data-name="Performance audit">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4229:79202">
            Performance audit
          </p>
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[14px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4229:79203">
            Profile render times and bundle size
          </p>
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4229:79204" data-name="Meta">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4229:79205" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/neutral\/tag-neutral-bg,#f4f5f4)] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4229:79205;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/neutral\/tag-neutral-text,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4229:79205;5726:636">
                  O
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4229:79208">
              Owen
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4229:79209" data-name="_" />
            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4229:79210">
              May 24
            </p>
            <div className="bg-[var(--tag\/error\/tag-red-bg,rgba(244,63,94,0.12))] border border-[var(--tag\/error\/tag-red-border,#fecdd3)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4229:79211" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/error\/tag-red-text,#9f1239)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4229:79211;6180:145">
                High
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4229:79222" data-name="DB schema migration">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4229:79223">
            DB schema migration
          </p>
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[14px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4229:79224">
            Add indexes and normalize user preferences table
          </p>
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4229:79225" data-name="Meta">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4229:79226" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/error\/tag-red-bg,rgba(244,63,94,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4229:79226;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/error\/tag-red-text,#9f1239)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4229:79226;5726:636">
                  B
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4229:79229">
              Ben
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4229:79230" data-name="_" />
            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4229:79231">
              May 18
            </p>
            <div className="bg-[var(--tag\/purple\/tag-purple-bg,rgba(139,92,246,0.12))] border border-[var(--tag\/purple\/tag-purple-border,#ddd6fe)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4229:79232" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/purple\/tag-purple-text,#5b21b6)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4229:79232;6180:149">
                Critical
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[var(--backgrounds\/bg-kanban-column,rgba(0,0,0,0.04))] content-stretch flex flex-[1_0_0] flex-col gap-[var(--spacing-8,8px)] h-full items-start min-w-px p-[var(--spacing-8,8px)] relative rounded-[var(--radius-12,12px)]" data-node-id="4229:79243" data-name="Done">
        <div className="content-stretch flex gap-[6px] items-center overflow-clip py-[4px] relative shrink-0 w-full" data-node-id="4229:79244" data-name="Header">
          <SquareGreenSolid className="overflow-clip relative shrink-0 size-[15px]" />
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4229:79247">
            Done
          </p>
          <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4229:79248" data-name="_" />
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4229:79249">
            3
          </p>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4229:79250" data-name="Fix login bug">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4229:79251">
            Fix login bug
          </p>
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[14px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4229:79252">
            Session token not refreshing on mobile browsers
          </p>
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4229:79253" data-name="Meta">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4229:79254" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/error\/tag-red-bg,rgba(244,63,94,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4229:79254;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/error\/tag-red-text,#9f1239)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4229:79254;5726:636">
                  B
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4229:79257">
              Ben
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4229:79258" data-name="_" />
            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4229:79259">
              May 4
            </p>
            <div className="bg-[var(--tag\/purple\/tag-purple-bg,rgba(139,92,246,0.12))] border border-[var(--tag\/purple\/tag-purple-border,#ddd6fe)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4229:79260" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/purple\/tag-purple-text,#5b21b6)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4229:79260;6180:149">
                Critical
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4229:79271" data-name="Auth token refresh">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4229:79272">
            Auth token refresh
          </p>
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[14px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4229:79273">
            Implement silent refresh with retry logic
          </p>
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4229:79274" data-name="Meta">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4229:79275" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/purple\/tag-purple-bg,rgba(139,92,246,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4229:79275;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/purple\/tag-purple-text,#5b21b6)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4229:79275;5726:636">
                  M
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4229:79278">
              Mark
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4229:79279" data-name="_" />
            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4229:79280">
              May 9
            </p>
            <div className="bg-[var(--tag\/purple\/tag-purple-bg,rgba(139,92,246,0.12))] border border-[var(--tag\/purple\/tag-purple-border,#ddd6fe)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4229:79281" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/purple\/tag-purple-text,#5b21b6)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4229:79281;6180:149">
                Critical
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4229:79292" data-name="Sprint retrospective">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4229:79293">
            Sprint retrospective
          </p>
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[14px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4229:79294">
            Review velocity and action items from last sprint
          </p>
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4229:79295" data-name="Meta">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4229:79296" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4229:79296;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4229:79296;5726:636">
                  P
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4229:79299">
              Priya
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4229:79300" data-name="_" />
            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4229:79301">
              May 9
            </p>
            <div className="bg-[var(--tag\/neutral\/tag-neutral-bg,#f4f5f4)] border border-[var(--tag\/neutral\/tag-neutral-border,#e5e7e4)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4229:79302" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/neutral\/tag-neutral-text,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4229:79302;6180:151">
                Low
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
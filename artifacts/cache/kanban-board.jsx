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
    <div className="content-stretch flex gap-[var(--spacing-16,16px)] items-start relative size-full" data-node-id="4417:76386" data-name="Kanban Board">
      <div className="bg-[var(--backgrounds\/bg-kanban-column,rgba(0,0,0,0.04))] content-stretch flex flex-[1_0_0] flex-col gap-[var(--spacing-8,8px)] h-full items-start min-w-px p-[var(--spacing-8,8px)] relative rounded-[var(--radius-12,12px)]" data-node-id="4417:76387" data-name="To Do">
        <div className="content-stretch flex gap-[6px] items-center overflow-clip py-[4px] relative shrink-0 w-full" data-node-id="4417:76388" data-name="Header">
          <SquareGreySolid className="overflow-clip relative shrink-0 size-[15px]" />
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4417:76390">
            To Do
          </p>
          <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4417:76391" data-name="_" />
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4417:76392">
            6
          </p>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4417:76393" data-name="Customer interviews">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4417:76394">
            Customer interviews
          </p>
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4417:76395">
            Schedule and run five user feedback sessions
          </p>
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4417:76396" data-name="Meta">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4417:76397" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/success\/tag-green-bg,rgba(16,185,129,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4417:76397;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/success\/tag-green-text,#065f46)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4417:76397;5726:636">
                  L
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4417:76398">
              Lara
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4417:76399" data-name="_" />
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4417:76400">
              Jun 1
            </p>
            <div className="bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] border border-[var(--tag\/warning\/tag-orange-border,#fed7aa)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4417:76401" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4417:76401;6180:143">
                Medium
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4417:76402" data-name="Migrate analytics SDK">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4417:76403">
            Migrate analytics SDK
          </p>
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4417:76404">
            Switch from legacy tracker to new events API
          </p>
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4417:76405" data-name="Meta">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4417:76406" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/purple\/tag-purple-bg,rgba(139,92,246,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4417:76406;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/purple\/tag-purple-text,#5b21b6)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4417:76406;5726:636">
                  M
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4417:76407">
              Mark
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4417:76408" data-name="_" />
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4417:76409">
              May 30
            </p>
            <div className="bg-[var(--tag\/error\/tag-red-bg,rgba(244,63,94,0.12))] border border-[var(--tag\/error\/tag-red-border,#fecdd3)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4417:76410" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/error\/tag-red-text,#9f1239)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4417:76410;6180:145">
                High
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4417:76411" data-name="Write API documentation">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4417:76412">
            Write API documentation
          </p>
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4417:76413">
            Document all public endpoints with examples
          </p>
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4417:76414" data-name="Meta">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4417:76415" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/neutral\/tag-neutral-bg,#f4f5f4)] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4417:76415;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/neutral\/tag-neutral-text,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4417:76415;5726:636">
                  O
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4417:76416">
              Owen
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4417:76417" data-name="_" />
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4417:76418">
              Jun 9
            </p>
            <div className="bg-[var(--tag\/neutral\/tag-neutral-bg,#f4f5f4)] border border-[var(--tag\/neutral\/tag-neutral-border,#e5e7e4)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4417:76419" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/neutral\/tag-neutral-text,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4417:76419;6180:151">
                Low
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4417:76420" data-name="User research interviews">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4417:76421">
            User research interviews
          </p>
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4417:76422">
            Recruit participants and prepare script
          </p>
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4417:76423" data-name="Meta">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4417:76424" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4417:76424;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4417:76424;5726:636">
                  P
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4417:76425">
              Priya
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4417:76426" data-name="_" />
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-error,#e11d48)] whitespace-nowrap" data-node-id="4417:76427">
              May 22
            </p>
            <div className="bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] border border-[var(--tag\/warning\/tag-orange-border,#fed7aa)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4417:76428" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4417:76428;6180:143">
                Medium
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4417:76429" data-name="Icon system audit">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4417:76430">
            Icon system audit
          </p>
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4417:76431">
            Catalog all icons and remove unused SVGs
          </p>
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4417:76432" data-name="Meta">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4417:76433" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/success\/tag-green-bg,rgba(16,185,129,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4417:76433;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/success\/tag-green-text,#065f46)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4417:76433;5726:636">
                  L
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4417:76434">
              Lara
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4417:76435" data-name="_" />
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4417:76436">
              Jun 14
            </p>
            <div className="bg-[var(--tag\/neutral\/tag-neutral-bg,#f4f5f4)] border border-[var(--tag\/neutral\/tag-neutral-border,#e5e7e4)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4417:76437" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/neutral\/tag-neutral-text,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4417:76437;6180:151">
                Low
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4417:76438" data-name="Accessibility pass">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4417:76439">
            Accessibility pass
          </p>
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4417:76440">
            Fix contrast ratios and add ARIA labels
          </p>
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4417:76441" data-name="Meta">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4417:76442" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/neutral\/tag-neutral-bg,#f4f5f4)] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4417:76442;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/neutral\/tag-neutral-text,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4417:76442;5726:636">
                  O
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4417:76443">
              Owen
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4417:76444" data-name="_" />
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4417:76445">
              Jun 2
            </p>
            <div className="bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] border border-[var(--tag\/warning\/tag-orange-border,#fed7aa)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4417:76446" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4417:76446;6180:143">
                Medium
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[var(--backgrounds\/bg-kanban-column,rgba(0,0,0,0.04))] content-stretch flex flex-[1_0_0] flex-col gap-[var(--spacing-8,8px)] h-full items-start min-w-px p-[var(--spacing-8,8px)] relative rounded-[var(--radius-12,12px)]" data-node-id="4417:76447" data-name="In Progress">
        <div className="content-stretch flex gap-[6px] items-center overflow-clip py-[4px] relative shrink-0 w-full" data-node-id="4417:76448" data-name="Header">
          <SquareBlueSolid className="overflow-clip relative shrink-0 size-[15px]" />
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4417:76450">
            In Progress
          </p>
          <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4417:76451" data-name="_" />
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4417:76452">
            5
          </p>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4417:76453" data-name="Update onboarding flow">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4417:76454">
            Update onboarding flow
          </p>
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4417:76455">
            Revamp first-run experience for new users
          </p>
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4417:76456" data-name="Meta">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4417:76457" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/blue\/tag-blue-bg,rgba(59,130,246,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4417:76457;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/blue\/tag-blue-text,#1e40af)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4417:76457;5726:636">
                  S
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4417:76458">
              Sara
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4417:76459" data-name="_" />
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-error,#e11d48)] whitespace-nowrap" data-node-id="4417:76460">
              May 19
            </p>
            <div className="bg-[var(--tag\/error\/tag-red-bg,rgba(244,63,94,0.12))] border border-[var(--tag\/error\/tag-red-border,#fecdd3)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4417:76461" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/error\/tag-red-text,#9f1239)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4417:76461;6180:145">
                High
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4417:76462" data-name="Fix billing bug #482">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4417:76463">
            Fix billing bug #482
          </p>
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4417:76464">
            Null ref in payment callback causing failed charges
          </p>
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4417:76465" data-name="Meta">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4417:76466" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/error\/tag-red-bg,rgba(244,63,94,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4417:76466;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/error\/tag-red-text,#9f1239)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4417:76466;5726:636">
                  B
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4417:76467">
              Ben
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4417:76468" data-name="_" />
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-error,#e11d48)] whitespace-nowrap" data-node-id="4417:76469">
              May 17
            </p>
            <div className="bg-[var(--tag\/purple\/tag-purple-bg,rgba(139,92,246,0.12))] border border-[var(--tag\/purple\/tag-purple-border,#ddd6fe)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4417:76470" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/purple\/tag-purple-text,#5b21b6)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4417:76470;6180:149">
                Critical
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4417:76471" data-name="Redesign landing page">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4417:76472">
            Redesign landing page
          </p>
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4417:76473">
            New hero section and updated feature grid
          </p>
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4417:76474" data-name="Meta">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4417:76475" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/success\/tag-green-bg,rgba(16,185,129,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4417:76475;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/success\/tag-green-text,#065f46)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4417:76475;5726:636">
                  L
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4417:76476">
              Lara
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4417:76477" data-name="_" />
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4417:76478">
              May 26
            </p>
            <div className="bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] border border-[var(--tag\/warning\/tag-orange-border,#fed7aa)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4417:76479" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4417:76479;6180:143">
                Medium
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4417:76480" data-name="Setup CI/CD pipeline">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4417:76481">
            Setup CI/CD pipeline
          </p>
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4417:76482">
            Configure GitHub Actions for staging deploys
          </p>
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4417:76483" data-name="Meta">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4417:76484" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/purple\/tag-purple-bg,rgba(139,92,246,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4417:76484;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/purple\/tag-purple-text,#5b21b6)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4417:76484;5726:636">
                  M
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4417:76485">
              Mark
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4417:76486" data-name="_" />
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4417:76487">
              Jun 6
            </p>
            <div className="bg-[var(--tag\/error\/tag-red-bg,rgba(244,63,94,0.12))] border border-[var(--tag\/error\/tag-red-border,#fecdd3)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4417:76488" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/error\/tag-red-text,#9f1239)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4417:76488;6180:145">
                High
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4417:76489" data-name="Mobile nav refactor">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4417:76490">
            Mobile nav refactor
          </p>
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4417:76491">
            Replace drawer with bottom tab navigation
          </p>
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4417:76492" data-name="Meta">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4417:76493" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/blue\/tag-blue-bg,rgba(59,130,246,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4417:76493;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/blue\/tag-blue-text,#1e40af)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4417:76493;5726:636">
                  S
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4417:76494">
              Sara
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4417:76495" data-name="_" />
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-error,#e11d48)] whitespace-nowrap" data-node-id="4417:76496">
              May 23
            </p>
            <div className="bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] border border-[var(--tag\/warning\/tag-orange-border,#fed7aa)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4417:76497" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4417:76497;6180:143">
                Medium
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[var(--backgrounds\/bg-kanban-column,rgba(0,0,0,0.04))] content-stretch flex flex-[1_0_0] flex-col gap-[var(--spacing-8,8px)] h-full items-start min-w-px p-[var(--spacing-8,8px)] relative rounded-[var(--radius-12,12px)]" data-node-id="4417:76498" data-name="In Review">
        <div className="content-stretch flex gap-[6px] items-center overflow-clip py-[4px] relative shrink-0 w-full" data-node-id="4417:76499" data-name="Header">
          <SquareOrangeSolid className="overflow-clip relative shrink-0 size-[15px]" />
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4417:76501">
            In Review
          </p>
          <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4417:76502" data-name="_" />
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4417:76503">
            4
          </p>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4417:76504" data-name="Q2 roadmap review">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4417:76505">
            Q2 roadmap review
          </p>
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4417:76506">
            Align team on priorities for next quarter
          </p>
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4417:76507" data-name="Meta">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4417:76508" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4417:76508;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4417:76508;5726:636">
                  P
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4417:76509">
              Priya
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4417:76510" data-name="_" />
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-error,#e11d48)] whitespace-nowrap" data-node-id="4417:76511">
              May 24
            </p>
            <div className="bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] border border-[var(--tag\/warning\/tag-orange-border,#fed7aa)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4417:76512" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4417:76512;6180:143">
                Medium
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4417:76513" data-name="Design QA — Settings">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4417:76514">
            Design QA — Settings
          </p>
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4417:76515">
            Verify settings page matches latest design specs
          </p>
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4417:76516" data-name="Meta">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4417:76517" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/blue\/tag-blue-bg,rgba(59,130,246,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4417:76517;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/blue\/tag-blue-text,#1e40af)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4417:76517;5726:636">
                  S
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4417:76518">
              Sara
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4417:76519" data-name="_" />
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4417:76520">
              May 28
            </p>
            <div className="bg-[var(--tag\/error\/tag-red-bg,rgba(244,63,94,0.12))] border border-[var(--tag\/error\/tag-red-border,#fecdd3)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4417:76521" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/error\/tag-red-text,#9f1239)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4417:76521;6180:145">
                High
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4417:76522" data-name="Performance audit">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4417:76523">
            Performance audit
          </p>
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4417:76524">
            Profile render times and bundle size
          </p>
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4417:76525" data-name="Meta">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4417:76526" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/neutral\/tag-neutral-bg,#f4f5f4)] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4417:76526;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/neutral\/tag-neutral-text,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4417:76526;5726:636">
                  O
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4417:76527">
              Owen
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4417:76528" data-name="_" />
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4417:76529">
              Jun 4
            </p>
            <div className="bg-[var(--tag\/error\/tag-red-bg,rgba(244,63,94,0.12))] border border-[var(--tag\/error\/tag-red-border,#fecdd3)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4417:76530" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/error\/tag-red-text,#9f1239)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4417:76530;6180:145">
                High
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4417:76531" data-name="DB schema migration">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4417:76532">
            DB schema migration
          </p>
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4417:76533">
            Add indexes and normalize user preferences table
          </p>
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4417:76534" data-name="Meta">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4417:76535" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/error\/tag-red-bg,rgba(244,63,94,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4417:76535;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/error\/tag-red-text,#9f1239)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4417:76535;5726:636">
                  B
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4417:76536">
              Ben
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4417:76537" data-name="_" />
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4417:76538">
              May 29
            </p>
            <div className="bg-[var(--tag\/purple\/tag-purple-bg,rgba(139,92,246,0.12))] border border-[var(--tag\/purple\/tag-purple-border,#ddd6fe)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4417:76539" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/purple\/tag-purple-text,#5b21b6)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4417:76539;6180:149">
                Critical
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[var(--backgrounds\/bg-kanban-column,rgba(0,0,0,0.04))] content-stretch flex flex-[1_0_0] flex-col gap-[var(--spacing-8,8px)] h-full items-start min-w-px p-[var(--spacing-8,8px)] relative rounded-[var(--radius-12,12px)]" data-node-id="4417:76540" data-name="Done">
        <div className="content-stretch flex gap-[6px] items-center overflow-clip py-[4px] relative shrink-0 w-full" data-node-id="4417:76541" data-name="Header">
          <SquareGreenSolid className="overflow-clip relative shrink-0 size-[15px]" />
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4417:76543">
            Done
          </p>
          <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4417:76544" data-name="_" />
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4417:76545">
            3
          </p>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4417:76546" data-name="Fix login bug">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4417:76547">
            Fix login bug
          </p>
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4417:76548">
            Session token not refreshing on mobile browsers
          </p>
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4417:76549" data-name="Meta">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4417:76550" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/error\/tag-red-bg,rgba(244,63,94,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4417:76550;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/error\/tag-red-text,#9f1239)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4417:76550;5726:636">
                  B
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4417:76551">
              Ben
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4417:76552" data-name="_" />
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4417:76553">
              May 15
            </p>
            <div className="bg-[var(--tag\/purple\/tag-purple-bg,rgba(139,92,246,0.12))] border border-[var(--tag\/purple\/tag-purple-border,#ddd6fe)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4417:76554" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/purple\/tag-purple-text,#5b21b6)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4417:76554;6180:149">
                Critical
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4417:76555" data-name="Auth token refresh">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4417:76556">
            Auth token refresh
          </p>
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4417:76557">
            Implement silent refresh with retry logic
          </p>
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4417:76558" data-name="Meta">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4417:76559" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/purple\/tag-purple-bg,rgba(139,92,246,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4417:76559;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/purple\/tag-purple-text,#5b21b6)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4417:76559;5726:636">
                  M
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4417:76560">
              Mark
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4417:76561" data-name="_" />
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4417:76562">
              May 20
            </p>
            <div className="bg-[var(--tag\/purple\/tag-purple-bg,rgba(139,92,246,0.12))] border border-[var(--tag\/purple\/tag-purple-border,#ddd6fe)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4417:76563" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/purple\/tag-purple-text,#5b21b6)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4417:76563;6180:149">
                Critical
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4417:76564" data-name="Sprint retrospective">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4417:76565">
            Sprint retrospective
          </p>
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4417:76566">
            Review velocity and action items from last sprint
          </p>
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4417:76567" data-name="Meta">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4417:76568" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4417:76568;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4417:76568;5726:636">
                  P
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4417:76569">
              Priya
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4417:76570" data-name="_" />
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4417:76571">
              May 20
            </p>
            <div className="bg-[var(--tag\/neutral\/tag-neutral-bg,#f4f5f4)] border border-[var(--tag\/neutral\/tag-neutral-border,#e5e7e4)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4417:76572" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/neutral\/tag-neutral-text,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4417:76572;6180:151">
                Low
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

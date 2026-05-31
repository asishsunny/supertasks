export default function TaskDetailsModal() {
  return (
    <div className="content-stretch flex flex-col h-[900px] items-start overflow-clip relative rounded-[12px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_8px_16px_0px_rgba(0,0,0,0.08),0px_16px_32px_0px_rgba(0,0,0,0.08)] shrink-0 w-[480px]" data-node-id="4553:130472" data-name="Task Details Modal">
        <div aria-hidden className="absolute bg-[var(--backgrounds\/bg-base,white)] inset-0 pointer-events-none rounded-[12px]" />
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-node-id="4553:130473" data-name="header">
          <div className="content-stretch flex items-center justify-between px-[24px] py-[8px] relative shrink-0 w-full" data-node-id="4553:130474" data-name="title + button">
            <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/header,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] min-w-px relative text-[14px] text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4553:130475">
              Task details
            </p>
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="4553:130476" data-name="buttons">
              <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] border border-[var(--borders\/border-base,#e5e7e4)] border-solid content-stretch flex flex-col h-[16px] items-center justify-center overflow-clip px-[var(--spacing-4,4px)] relative rounded-[var(--radius-4,4px)] shrink-0" data-node-id="4553:130477" data-name="Kbd">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:130477;4737:1537">
                  Esc
                </p>
              </div>
              <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[28px]" data-node-id="4553:130480" data-name="Close">
                <div className="relative shrink-0 size-[15px]" data-node-id="I4553:130480;5934:5924" data-name="x-mark">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[9px] top-1/2" data-node-id="I4553:130480;5934:5924;13721:2301251" data-name="Vector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector8} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px pb-[24px] pt-[16px] px-[24px] relative w-full" data-node-id="4553:130485" data-name="Content">
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-node-id="4553:130486" data-name="Title Group">
            <p className="font-[family-name:var(--font\/family\/header,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[28px] relative shrink-0 text-[18px] text-[color:var(--foregrounds\/fg-base,#0a0b09)] w-full" data-node-id="4553:130487">
              Update onboarding flow
            </p>
            <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[1.5] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] w-full" data-node-id="4553:130488">
              Revamp first-run experience for new users
            </p>
          </div>
          <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-node-id="4553:130489" data-name="Section 1">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:130490">
              Info
            </p>
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4553:130491" data-name="Status Row">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:130492">
                Status
              </p>
              <div className="bg-[var(--tag\/blue\/tag-blue-bg,rgba(59,130,246,0.12))] border border-[var(--tag\/blue\/tag-blue-border,#bfdbfe)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4553:130493" data-name="In Progress">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/blue\/tag-blue-text,#1e40af)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:130493;6180:141">
                  In Progress
                </p>
              </div>
            </div>
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4553:130504" data-name="Priority Row">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:130505">
                Priority
              </p>
              <div className="bg-[var(--tag\/error\/tag-red-bg,rgba(244,63,94,0.12))] border border-[var(--tag\/error\/tag-red-border,#fecdd3)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4553:130506" data-name="High">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/error\/tag-red-text,#9f1239)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:130506;6180:145">
                  High
                </p>
              </div>
            </div>
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4553:130517" data-name="Assignee Row">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:130518">
                Assignee
              </p>
              <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-node-id="4553:130519" data-name="Assignee">
                <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4553:130520" data-name="Avatar">
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/blue\/tag-blue-bg,rgba(59,130,246,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:130520;5726:635" data-name="Background">
                    <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/blue\/tag-blue-text,#1e40af)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:130520;5726:636">
                      S
                    </p>
                  </div>
                </div>
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:130523">
                  Sara Nelson
                </p>
              </div>
            </div>
            <div className="[word-break:break-word] content-stretch flex font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] items-center justify-between leading-[20px] relative shrink-0 text-[length:var(--font\/size\/small,13px)] w-full whitespace-nowrap" data-node-id="4553:130524" data-name="Due date Row">
              <p className="relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)]" data-node-id="4553:130525">
                Due date
              </p>
              <p className="relative shrink-0 text-[color:var(--foregrounds\/fg-error,#e11d48)]" data-node-id="4553:130526">
                May 25, 2026
              </p>
            </div>
            <div className="[word-break:break-word] content-stretch flex font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] items-center justify-between leading-[20px] relative shrink-0 text-[length:var(--font\/size\/small,13px)] w-full whitespace-nowrap" data-node-id="4553:130527" data-name="Created Row">
              <p className="relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)]" data-node-id="4553:130528">
                Created
              </p>
              <p className="relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4553:130529">
                Jan 5, 2026
              </p>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-node-id="4553:130530" data-name="Section 2">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:130531">
              Activity log
            </p>
            <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-node-id="4553:130532" data-name="Priya Rao">
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4553:130533" data-name="Name Row">
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-node-id="4553:130534" data-name="Left">
                  <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4553:130535" data-name="Avatar">
                    <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:130535;5726:635" data-name="Background">
                      <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:130535;5726:636">
                        P
                      </p>
                    </div>
                  </div>
                  <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:130538">
                    Priya Rao
                  </p>
                </div>
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] whitespace-nowrap" data-node-id="4553:130539">
                  2h ago
                </p>
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[1.5] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] w-full" data-node-id="4553:130540">
                Moving this to in progress — starting the research phase today.
              </p>
            </div>
            <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-node-id="4553:130541" data-name="Sara Nelson">
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4553:130542" data-name="Name Row">
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-node-id="4553:130543" data-name="Left">
                  <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4553:130544" data-name="Avatar">
                    <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/blue\/tag-blue-bg,rgba(59,130,246,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:130544;5726:635" data-name="Background">
                      <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/blue\/tag-blue-text,#1e40af)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:130544;5726:636">
                        S
                      </p>
                    </div>
                  </div>
                  <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:130547">
                    Sara Nelson
                  </p>
                </div>
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] whitespace-nowrap" data-node-id="4553:130548">
                  Yesterday
                </p>
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[1.5] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] w-full" data-node-id="4553:130549">
                Added initial wireframes to the shared drive. Let me know if you have feedback.
              </p>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-node-id="4553:130550" data-name="footer">
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
          <div className="content-stretch flex gap-[8px] items-center justify-end px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="4553:130552" data-name="actions">
            <div className="bg-[var(--buttons\/button-neutral,white)] content-stretch flex gap-[var(--spacing-6,6px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0" data-node-id="4553:130553" data-name="Edit">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:130553;5934:2744">
                Edit
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-6,6px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.4),0px_0px_0px_1px_#18181b] shrink-0" data-node-id="4553:130564" data-name="Mark Complete">
              <div aria-hidden className="absolute bg-[var(--buttons\/button-inverted,#282a27)] inset-0 pointer-events-none rounded-[var(--radius-6,6px)]" />
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--contrast\/contrast-fg-primary,rgba(255,255,255,0.88))] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:130564;5934:2712">
                Mark complete
              </p>
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0.75px_0px_0px_rgba(255,255,255,0.2)]" />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0px_1px_white,inset_0px_0px_0px_1.5px_rgba(228,228,231,0.6)]" />
      </div>
  );
}
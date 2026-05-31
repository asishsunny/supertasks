export default function GenerateReportModal() {
  return (
    <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-col items-start overflow-clip relative rounded-[12px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)] shrink-0 w-[480px]" data-node-id="4553:130404" data-name="Generate Report">
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="4553:130405" data-name="header">
          <div className="content-stretch flex items-center justify-between px-[24px] py-[8px] relative shrink-0 w-full" data-node-id="4553:130406" data-name="title + button">
            <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/header,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] min-w-px relative text-[14px] text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4553:130407">
              Generate report
            </p>
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="4553:130408" data-name="buttons">
              <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] border border-[var(--borders\/border-base,#e5e7e4)] border-solid content-stretch flex flex-col h-[16px] items-center justify-center overflow-clip px-[var(--spacing-4,4px)] relative rounded-[var(--radius-4,4px)] shrink-0" data-node-id="4553:130409" data-name="Kbd">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:130409;4737:1537">
                  Esc
                </p>
              </div>
              <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[28px]" data-node-id="4553:130412" data-name="Close">
                <div className="relative shrink-0 size-[15px]" data-node-id="I4553:130412;5934:5924" data-name="x-mark">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[9px] top-1/2" data-node-id="I4553:130412;5934:5924;13721:2301251" data-name="Vector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector8} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
        </div>
        <div className="content-stretch flex flex-col gap-[20px] items-start p-[24px] relative shrink-0 w-full" data-node-id="4553:130417" data-name="Content">
          <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-node-id="4553:130418" data-name="Report name Field">
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="4553:130419" data-name="Report name">
              <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:130419;3503:3030">
                <p className="leading-[20px]">Report name</p>
              </div>
            </div>
            <TextInput className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[var(--spacing-4,0px)] h-[32px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full" placeholder="Enter report name..." />
          </div>
          <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-node-id="4553:130426" data-name="Member Field">
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="4553:130427" data-name="Member">
              <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:130427;3503:3030">
                <p className="leading-[20px]">Member</p>
              </div>
            </div>
            <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[8px] py-[6px] relative rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full" data-node-id="4553:130432" data-name="Select">
              <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] h-full leading-[20px] min-w-px relative text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)]" data-node-id="I4553:130432;5946:2672">
                Select member...
              </p>
              <div className="relative shrink-0 size-[15px]" data-node-id="I4553:130432;5946:2673" data-name="triangles-mini">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[13.5px] left-1/2 top-1/2 w-[7px]" data-node-id="I4553:130432;5946:2673;13721:2301545" data-name="Vector">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector9} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-node-id="4553:130439" data-name="Date range Field">
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="4553:130440" data-name="Date range">
              <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:130440;3503:3030">
                <p className="leading-[20px]">Date range</p>
              </div>
            </div>
            <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[8px] py-[6px] relative rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full" data-node-id="4553:130445" data-name="Select">
              <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] h-full leading-[20px] min-w-px relative text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)]" data-node-id="I4553:130445;5946:2672">
                Select range...
              </p>
              <div className="relative shrink-0 size-[15px]" data-node-id="I4553:130445;5946:2673" data-name="triangles-mini">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[13.5px] left-1/2 top-1/2 w-[7px]" data-node-id="I4553:130445;5946:2673;13721:2301545" data-name="Vector">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector9} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="4553:130452" data-name="footer">
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
          <div className="content-stretch flex gap-[8px] items-center justify-end px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="4553:130454" data-name="actions">
            <div className="bg-[var(--buttons\/button-neutral,white)] content-stretch flex gap-[var(--spacing-6,6px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0" data-node-id="4553:130455" data-name="Cancel">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:130455;5934:2744">
                Cancel
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-6,6px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.4),0px_0px_0px_1px_#18181b] shrink-0" data-node-id="4553:130466" data-name="Generate report">
              <div aria-hidden className="absolute bg-[var(--buttons\/button-inverted,#282a27)] inset-0 pointer-events-none rounded-[var(--radius-6,6px)]" />
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--contrast\/contrast-fg-primary,rgba(255,255,255,0.88))] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:130466;5934:2712">
                Generate report
              </p>
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0.75px_0px_0px_rgba(255,255,255,0.2)]" />
            </div>
          </div>
        </div>
      </div>
  );
}
const imgVector = "https://www.figma.com/api/mcp/asset/ab78eacd-70d6-4c0e-ad80-91b234ca28c4";
const imgVector1 = "https://www.figma.com/api/mcp/asset/b9b69212-5204-4588-a491-f94a68e1fe82";
const imgVector2 = "https://www.figma.com/api/mcp/asset/27e8d5c8-0ebc-44fe-bf8c-1552818ef7c9";
const imgVector3 = "https://www.figma.com/api/mcp/asset/b0a78460-38e5-4482-b0af-c18e91331007";
const imgVector4 = "https://www.figma.com/api/mcp/asset/8148a527-d3bd-4746-ae17-4a368fcaf6fe";

export default function Controls() {
  return (
    <div className="content-stretch flex gap-[var(--spacing-0,0px)] items-center relative size-full" data-node-id="4229:9176" data-name="Controls">
      <div className="bg-[var(--backgrounds\/bg-segment-control,rgba(0,0,0,0.06))] content-stretch flex gap-[2px] items-center justify-center p-[2px] relative rounded-[8px] shrink-0" data-node-id="4229:9177" data-name="Segment Control">
        <div className="content-stretch flex gap-[4px] items-center justify-center px-[10px] py-[4px] relative rounded-[6px] shrink-0" data-node-id="I4229:9177;7774:181794" data-name="Segment Item">
          <p className="[word-break:break-word] font-['Geist:Medium'] font-medium leading-[20px] relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="I4229:9177;7774:181794;7773:161134">
            Kanban
          </p>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[4px] items-center justify-center overflow-clip px-[10px] py-[4px] relative rounded-[6px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)] shrink-0" data-node-id="I4229:9177;7774:181802" data-name="Segment Item">
          <p className="[word-break:break-word] font-['Geist:Medium'] font-medium leading-[20px] relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-base,#0a0b09)] whitespace-nowrap" data-node-id="I4229:9177;7774:181802;7773:161136">
            List
          </p>
        </div>
      </div>
      <div className="flex-[1_0_0] h-full min-w-px relative" data-node-id="4229:9178" data-name="Spacer" />
      <div className="content-stretch flex gap-[var(--spacing-8,8px)] items-center relative shrink-0" data-node-id="4229:9179" data-name="Actions">
        <div className="content-stretch flex gap-[var(--spacing-8,8px)] items-center relative shrink-0" data-node-id="4229:9180" data-name="Filters">
          <div className="bg-[var(--buttons\/button-neutral,white)] content-stretch flex gap-[var(--spacing-6,6px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0" data-node-id="4229:9181" data-name="Button">
            <div className="relative shrink-0 size-[15px]" data-node-id="I4229:9181;5934:2743" data-name="funnel">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                <div className="absolute inset-[7.96%_7.96%_2.04%_7.96%]" data-node-id="I4229:9181;5934:2743;13721:2301367" data-name="Vector">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector} />
                </div>
              </div>
            </div>
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4229:9181;5934:2744">
              Filter
            </p>
          </div>
          <div className="bg-[var(--buttons\/button-neutral,white)] content-stretch flex gap-[var(--spacing-6,6px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0" data-node-id="4229:9182" data-name="Button">
            <div className="relative shrink-0 size-[15px]" data-node-id="I4229:9182;5934:2743" data-name="calendar-mini">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                <div className="absolute inset-[2.04%_5%]" data-node-id="I4229:9182;5934:2743;7271:14184" data-name="Vector">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector1} />
                </div>
              </div>
            </div>
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4229:9182;5934:2744">
              Date
            </p>
          </div>
          <div className="bg-[var(--buttons\/button-neutral,white)] content-stretch flex gap-[var(--spacing-6,6px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0" data-node-id="4229:9183" data-name="Button">
            <div className="relative shrink-0 size-[15px]" data-node-id="I4229:9183;5934:2743" data-name="adjustments">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                <div className="absolute inset-[5%]" data-node-id="I4229:9183;5934:2743;13721:2301363" data-name="Vector">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector2} />
                </div>
              </div>
            </div>
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4229:9183;5934:2744">
              Columns
            </p>
          </div>
        </div>
        <div className="bg-[var(--buttons\/button-neutral,white)] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[28px]" data-node-id="4229:9184" data-name="IconButton">
          <div className="relative shrink-0 size-[15px]" data-node-id="I4229:9184;5934:5846" data-name="descending-sorting">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
              <div className="absolute inset-[7.96%]" data-node-id="I4229:9184;5934:5846;13721:2301299" data-name="Vector">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector3} />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[var(--spacing-8,8px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--spacing-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-[160px]" data-node-id="4229:9185" data-name="Search Input">
          <div className="relative shrink-0 size-[15px]" data-node-id="I4229:9185;5943:7660" data-name="magnifying-glass">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
              <div className="absolute inset-[7.96%]" data-node-id="I4229:9185;5943:7660;13721:2301281" data-name="Vector">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector4} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-px relative text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-[length:var(--font\/size\/small,13px)]" data-node-id="I4229:9185;5943:7661">
            Search
          </p>
          <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] border border-[var(--borders\/border-base,#e5e7e4)] border-solid h-[18px] relative rounded-[var(--radius-4,4px)] shrink-0" data-node-id="I4229:9185;7083:56201" data-name="Kbd">
            <div className="bg-clip-padding border border-[transparent] border-solid content-stretch flex flex-col items-center justify-center overflow-clip px-[var(--spacing-4,4px)] relative rounded-[inherit] size-full">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4229:9185;7083:56201;4737:1537">
                ⌘K
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
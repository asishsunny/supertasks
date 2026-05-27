const imgVector = "https://www.figma.com/api/mcp/asset/b1a86c52-3b92-434c-beac-8d1afc3deac6";
const imgVector1 = "https://www.figma.com/api/mcp/asset/ff49b8ee-0038-4058-86ad-67ca0e357954";

type HorizontalDividerProps = {
  className?: string;
  type?: "Line";
};

function HorizontalDivider({ className, type = "Line" }: HorizontalDividerProps) {
  return <div className={className || "bg-[var(--borders\\/border-base,#e5e7e4)] h-px overflow-clip relative w-[933px]"} data-node-id="4131:5284" />;
}

type TextInputProps = {
  className?: string;
  color?: "bg-field";
  placeholder?: string;
  size?: "Base (32)";
  state?: "Default";
};

function TextInput({ className, color = "bg-field", placeholder = "Placeholder", size = "Base (32)", state = "Default" }: TextInputProps) {
  return (
    <div className={className || "bg-[var(--backgrounds\\/bg-field,#f8faf7)] content-stretch flex gap-[var(--spacing-4,0px)] h-[32px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] w-[280px]"} data-node-id="4197:3532">
      <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-px relative text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-[length:var(--font\/size\/small,13px)]" data-node-id="4197:3533">
        {placeholder}
      </p>
    </div>
  );
}

export default function GenerateReport() {
  return (
    <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-col items-start overflow-clip relative rounded-[12px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)] size-full" data-node-id="4417:118743" data-name="Generate Report">
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="4417:118744" data-name="header">
        <div className="content-stretch flex items-center justify-between px-[24px] py-[8px] relative shrink-0 w-full" data-node-id="4417:118745" data-name="title + button">
          <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/header,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] min-w-px relative text-[14px] text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4417:118746">
            Generate report
          </p>
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="4417:118747" data-name="buttons">
            <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] border border-[var(--borders\/border-base,#e5e7e4)] border-solid content-stretch flex flex-col h-[16px] items-center justify-center overflow-clip px-[var(--spacing-4,4px)] relative rounded-[var(--radius-4,4px)] shrink-0" data-node-id="4417:118748" data-name="Kbd">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4417:118748;4737:1537">
                Esc
              </p>
            </div>
            <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[28px]" data-node-id="4417:118749" data-name="Close">
              <div className="relative shrink-0 size-[15px]" data-node-id="I4417:118749;5934:5924" data-name="x-mark">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[9px] top-1/2" data-node-id="I4417:118749;5934:5924;13721:2301251" data-name="Vector">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
      </div>
      <div className="content-stretch flex flex-col gap-[20px] items-start p-[24px] relative shrink-0 w-full" data-node-id="4417:118751" data-name="Content">
        <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-node-id="4417:118752" data-name="Report name Field">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="4417:118753" data-name="Report name">
            <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4417:118753;3503:3030">
              <p className="leading-[20px]">Report name</p>
            </div>
          </div>
          <TextInput className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[var(--spacing-4,0px)] h-[32px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full" placeholder="Enter report name..." />
        </div>
        <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-node-id="4417:118755" data-name="Member Field">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="4417:118756" data-name="Member">
            <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4417:118756;3503:3030">
              <p className="leading-[20px]">Member</p>
            </div>
          </div>
          <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[8px] py-[6px] relative rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full" data-node-id="4417:118757" data-name="Select">
            <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] h-full leading-[20px] min-w-px relative text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)]" data-node-id="I4417:118757;5946:2672">
              Select member...
            </p>
            <div className="relative shrink-0 size-[15px]" data-node-id="I4417:118757;5946:2673" data-name="triangles-mini">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[13.5px] left-1/2 top-1/2 w-[7px]" data-node-id="I4417:118757;5946:2673;13721:2301545" data-name="Vector">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector1} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-node-id="4417:118758" data-name="Date range Field">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="4417:118759" data-name="Date range">
            <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4417:118759;3503:3030">
              <p className="leading-[20px]">Date range</p>
            </div>
          </div>
          <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[8px] py-[6px] relative rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full" data-node-id="4417:118760" data-name="Select">
            <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] h-full leading-[20px] min-w-px relative text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)]" data-node-id="I4417:118760;5946:2672">
              Select range...
            </p>
            <div className="relative shrink-0 size-[15px]" data-node-id="I4417:118760;5946:2673" data-name="triangles-mini">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[13.5px] left-1/2 top-1/2 w-[7px]" data-node-id="I4417:118760;5946:2673;13721:2301545" data-name="Vector">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector1} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="4417:118761" data-name="footer">
        <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
        <div className="content-stretch flex gap-[8px] items-center justify-end px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="4417:118763" data-name="actions">
          <div className="bg-[var(--buttons\/button-neutral,white)] content-stretch flex gap-[var(--spacing-6,6px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0" data-node-id="4417:118764" data-name="Cancel">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4417:118764;5934:2744">
              Cancel
            </p>
          </div>
          <div className="content-stretch flex gap-[var(--spacing-6,6px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.4),0px_0px_0px_1px_#18181b] shrink-0" data-node-id="4417:118765" data-name="Generate report">
            <div aria-hidden="true" className="absolute bg-[var(--buttons\/button-inverted,#282a27)] inset-0 pointer-events-none rounded-[var(--radius-6,6px)]" />
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--contrast\/contrast-fg-primary,rgba(255,255,255,0.88))] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4417:118765;5934:2712">
              Generate report
            </p>
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0.75px_0px_0px_rgba(255,255,255,0.2)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

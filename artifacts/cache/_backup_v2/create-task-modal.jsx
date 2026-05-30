const imgVector = "https://www.figma.com/api/mcp/asset/97fec8fa-3c4b-429c-97b3-e1f0d3988071";
const imgVector1 = "https://www.figma.com/api/mcp/asset/d5e29710-00ce-40ac-9045-3cf457aff621";
const imgVector2 = "https://www.figma.com/api/mcp/asset/f9edea1e-c0d4-4312-b6c2-a8dd9d8dffb6";

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
      <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-px relative text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-[length:var(--font\/size\/small,13px)]" data-node-id="4197:3533">
        {placeholder}
      </p>
    </div>
  );
}

export default function CreateTaskModal() {
  return (
    <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-col items-start overflow-clip relative rounded-[12px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)] size-full" data-node-id="4223:127016" data-name="Create Task Modal">
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="4223:127017" data-name="header">
        <div className="content-stretch flex items-center justify-between px-[24px] py-[8px] relative shrink-0 w-full" data-node-id="4223:127018" data-name="title + button">
          <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/header,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] min-w-px relative text-[14px] text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4223:127019">
            Create new task
          </p>
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="4223:127020" data-name="buttons">
            <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] border border-[var(--borders\/border-base,#e5e7e4)] border-solid content-stretch flex flex-col h-[16px] items-center justify-center overflow-clip px-[var(--spacing-4,4px)] relative rounded-[var(--radius-4,4px)] shrink-0" data-node-id="4223:127021" data-name="Kbd">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4223:127021;4737:1537">
                Esc
              </p>
            </div>
            <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[28px]" data-node-id="4223:127024" data-name="Close">
              <div className="relative shrink-0 size-[15px]" data-node-id="I4223:127024;5934:5924" data-name="x-mark">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[9px] top-1/2" data-node-id="I4223:127024;5934:5924;13721:2301251" data-name="Vector">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
      </div>
      <div className="content-stretch flex flex-col gap-[20px] items-start p-[24px] relative shrink-0 w-full" data-node-id="4223:127029" data-name="Content">
        <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-node-id="4223:127030" data-name="Task Name Field">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="4223:127031" data-name="Task name">
            <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:127031;3503:3030">
              <p className="leading-[20px]">Task name</p>
            </div>
          </div>
          <TextInput className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[var(--spacing-4,0px)] h-[32px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full" placeholder="Enter task name..." />
        </div>
        <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-node-id="4223:127038" data-name="Description Field">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="4223:127039" data-name="Description">
            <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:127039;3503:3030">
              <p className="leading-[20px]">Description</p>
            </div>
          </div>
          <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex flex-col gap-[var(--spacing-6,6px)] items-end justify-end overflow-clip px-[var(--spacing-8,8px)] py-[var(--spacing-6,6px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full" data-node-id="4223:127044" data-name="Text Area">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[1.5] min-w-full relative shrink-0 text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-[length:var(--font\/size\/small,13px)] w-[min-content]" data-node-id="I4223:127044;3609:3542">
              Add a description...
            </p>
            <div className="relative shrink-0 size-[15px]" data-node-id="I4223:127044;3609:3543" data-name="resize">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+1px)] size-[10.864px] top-[calc(50%+1px)]" data-node-id="I4223:127044;3609:3543;13721:2301347" data-name="Vector">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector1} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-node-id="4223:127048" data-name="Priority + Status">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative" data-node-id="4223:127049" data-name="Priority Field">
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="4223:127050" data-name="Priority">
              <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:127050;3503:3030">
                <p className="leading-[20px]">Priority</p>
              </div>
            </div>
            <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[8px] py-[6px] relative rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full" data-node-id="4223:127055" data-name="Select">
              <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] h-full leading-[20px] min-w-px relative text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-[length:var(--font\/size\/small,13px)]" data-node-id="I4223:127055;5946:2508">
                Select
              </p>
              <div className="relative shrink-0 size-[15px]" data-node-id="I4223:127055;5946:2509" data-name="triangles-mini">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[13.5px] left-1/2 top-1/2 w-[7px]" data-node-id="I4223:127055;5946:2509;13721:2301545" data-name="Vector">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector2} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative" data-node-id="4223:127059" data-name="Status Field">
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="4223:127060" data-name="Status">
              <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:127060;3503:3030">
                <p className="leading-[20px]">Status</p>
              </div>
            </div>
            <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[8px] py-[6px] relative rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full" data-node-id="4223:127065" data-name="Select">
              <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] h-full leading-[20px] min-w-px relative text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-[length:var(--font\/size\/small,13px)]" data-node-id="I4223:127065;5946:2508">
                Select
              </p>
              <div className="relative shrink-0 size-[15px]" data-node-id="I4223:127065;5946:2509" data-name="triangles-mini">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[13.5px] left-1/2 top-1/2 w-[7px]" data-node-id="I4223:127065;5946:2509;13721:2301545" data-name="Vector">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector2} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-node-id="4223:127069" data-name="Assignee + Due date">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative" data-node-id="4223:127070" data-name="Assignee Field">
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="4223:127071" data-name="Assignee">
              <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:127071;3503:3030">
                <p className="leading-[20px]">Assignee</p>
              </div>
            </div>
            <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[8px] py-[6px] relative rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full" data-node-id="4223:127076" data-name="Select">
              <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] h-full leading-[20px] min-w-px relative text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-[length:var(--font\/size\/small,13px)]" data-node-id="I4223:127076;5946:2508">
                Select
              </p>
              <div className="relative shrink-0 size-[15px]" data-node-id="I4223:127076;5946:2509" data-name="triangles-mini">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[13.5px] left-1/2 top-1/2 w-[7px]" data-node-id="I4223:127076;5946:2509;13721:2301545" data-name="Vector">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector2} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative" data-node-id="4223:127080" data-name="Due date Field">
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="4223:127081" data-name="Due date">
              <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:127081;3503:3030">
                <p className="leading-[20px]">Due date</p>
              </div>
            </div>
            <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[8px] py-[6px] relative rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full" data-node-id="4223:127086" data-name="Select">
              <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] h-full leading-[20px] min-w-px relative text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-[length:var(--font\/size\/small,13px)]" data-node-id="I4223:127086;5946:2508">
                Select
              </p>
              <div className="relative shrink-0 size-[15px]" data-node-id="I4223:127086;5946:2509" data-name="triangles-mini">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[13.5px] left-1/2 top-1/2 w-[7px]" data-node-id="I4223:127086;5946:2509;13721:2301545" data-name="Vector">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector2} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="4223:127090" data-name="footer">
        <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
        <div className="content-stretch flex gap-[8px] items-center justify-end px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="4223:127092" data-name="actions">
          <div className="bg-[var(--buttons\/button-neutral,white)] content-stretch flex gap-[var(--spacing-6,6px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0" data-node-id="4223:127093" data-name="Cancel">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:127093;5934:2744">
              Cancel
            </p>
          </div>
          <div className="content-stretch flex gap-[var(--spacing-6,6px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.4),0px_0px_0px_1px_#18181b] shrink-0" data-node-id="4223:127104" data-name="Create task">
            <div aria-hidden className="absolute bg-[var(--buttons\/button-inverted,#282a27)] inset-0 pointer-events-none rounded-[var(--radius-6,6px)]" />
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--contrast\/contrast-fg-primary,rgba(255,255,255,0.88))] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:127104;5934:2712">
              Create task
            </p>
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0.75px_0px_0px_rgba(255,255,255,0.2)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

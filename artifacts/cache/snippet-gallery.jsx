const imgBackground = "https://www.figma.com/api/mcp/asset/a967b224-a1c5-4ce9-8497-7582abb7ac73";
const imgVector = "https://www.figma.com/api/mcp/asset/4109d927-a8b3-4997-8a07-4a681a119815";
const imgVector1 = "https://www.figma.com/api/mcp/asset/974c6ecc-59d6-42d4-8520-5168739d71da";
const imgVector2 = "https://www.figma.com/api/mcp/asset/6af1cfc4-2131-4db6-9084-1d4beae99be1";
const imgVector3 = "https://www.figma.com/api/mcp/asset/c22cf0eb-61ba-4a33-b6ef-a9fda4da7e5c";
const imgVector4 = "https://www.figma.com/api/mcp/asset/02b16284-ab8b-4b2f-969b-f8995b9fab9c";
const imgVector5 = "https://www.figma.com/api/mcp/asset/fa88927c-a1a2-48df-957b-a63a4a963b64";
const imgVector6 = "https://www.figma.com/api/mcp/asset/e055a0a8-273b-486c-aa30-fa207dd62b29";
const imgVector7 = "https://www.figma.com/api/mcp/asset/fbad1bd9-0b4e-4590-b1c7-2e717fe4bf52";
const imgVector8 = "https://www.figma.com/api/mcp/asset/e7dc3efb-6e99-4550-8ebe-f2676a29f131";
const imgVector9 = "https://www.figma.com/api/mcp/asset/45fb961d-d9c1-4ae2-bf96-6936fb412ec0";

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

type SwitchProps = {
  className?: string;
  checked?: boolean;
  size?: "3xsmall (18)";
  state?: "Enabled";
};

function Switch({ className, checked = false, size = "3xsmall (18)", state = "Enabled" }: SwitchProps) {
  const is3Xsmall18AndEnabledAndChecked = size === "3xsmall (18)" && state === "Enabled" && checked;
  return (
    <div className={className || "h-[20px] relative w-[32px]"} id={is3Xsmall18AndEnabledAndChecked ? "node-4197_3687" : "node-4197_3681"}>
      <div className="-translate-y-1/2 absolute h-[18px] left-0 overflow-clip pointer-events-none rounded-[99px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.04)] top-1/2 w-[32px]" id={is3Xsmall18AndEnabledAndChecked ? "node-4197_3688" : "node-4197_3682"} data-name="toggle-bg">
        <div aria-hidden className={`absolute inset-0 rounded-[99px] ${is3Xsmall18AndEnabledAndChecked ? String.raw`bg-[var(--backgrounds\/bg-interactive,#3b82f6)]` : String.raw`bg-[var(--backgrounds\/bg-switch-off,#e5e7e4)]`}`} />
        <div className={`absolute rounded-[99px] shadow-[0px_0px_0px_0.5px_rgba(0,0,0,0.02),0px_5px_4px_0px_rgba(0,0,0,0.02),0px_3px_3px_0px_rgba(0,0,0,0.04),0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_1px_0px_rgba(0,0,0,0.08)] size-[14px] top-[2px] ${is3Xsmall18AndEnabledAndChecked ? "left-[16px]" : "left-[2px]"}`} id={is3Xsmall18AndEnabledAndChecked ? "node-4197_3689" : "node-4197_3683"} data-name="circle">
          <div aria-hidden className="absolute bg-[var(--foregrounds\/fg-on-color,white)] inset-0 rounded-[99px]" />
          <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_2px_1px_white,inset_0px_1px_0px_0px_white]" />
        </div>
        <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0px_1px_1px_0px_rgba(0,0,0,0.04),inset_0px_2px_4px_0px_rgba(0,0,0,0.04),inset_0px_0px_0px_0.75px_rgba(0,0,0,0.06),inset_0px_0px_8px_0px_rgba(0,0,0,0.02)]" />
      </div>
    </div>
  );
}

type AvatarProps = {
  className?: string;
  content?: "Letters" | "Image";
  initials?: string;
  size?: "2xsmall (20)" | "Xlarge (48)";
  type?: "Rounded";
};

function Avatar({ className, content = "Letters", initials = "L", size = "2xsmall (20)", type = "Rounded" }: AvatarProps) {
  const isImageAndRoundedAndXlarge48 = content === "Image" && type === "Rounded" && size === "Xlarge (48)";
  return (
    <div className={className || `${String.raw`bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] `}${isImageAndRoundedAndXlarge48 ? "size-[48px]" : "size-[20px]"}`} id={isImageAndRoundedAndXlarge48 ? "node-4131_4439" : "node-4131_4417"}>
      <div className={`-translate-x-1/2 -translate-y-1/2 absolute left-1/2 rounded-[var(--radius-full,999px)] top-1/2 ${isImageAndRoundedAndXlarge48 ? "size-[44px]" : String.raw`bg-[var(--backgrounds\/bg-disabled,#f4f5f4)] size-[16px]`}`} id={isImageAndRoundedAndXlarge48 ? "node-4131_4485" : "node-4131_4451"} data-name="Background">
        {content === "Letters" && type === "Rounded" && size === "2xsmall (20)" && (
          <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="4131:4452">
            {initials}
          </p>
        )}
        {isImageAndRoundedAndXlarge48 && <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[var(--radius-full,999px)] size-full" src={imgBackground} />}
      </div>
    </div>
  );
}

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

export default function SnippetGallery() {
  return (
    <div className="content-stretch flex flex-col gap-[60px] items-start relative size-full" data-node-id="4553:47822" data-name="Snippet Gallery">
      <div className="[word-break:break-word] content-stretch flex gap-[var(--spacing-16,16px)] items-start relative shrink-0 w-[1136px] whitespace-nowrap" data-node-id="4553:45762" data-name="Stat Cards">
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-[1_0_0] flex-col gap-[var(--spacing-16,16px)] items-start min-w-px overflow-clip p-[var(--spacing-24,24px)] relative rounded-[var(--radius-12,12px)] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)] text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4553:45763" data-name="Total Tasks">
          <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[length:var(--font\/size\/medium,14px)]" data-node-id="4553:45764">
            Total Tasks
          </p>
          <p className="font-[family-name:var(--font\/family\/header,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[44px] relative shrink-0 text-[32px] tracking-[-0.16px]" data-node-id="4553:45765">
            18
          </p>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-[1_0_0] flex-col gap-[var(--spacing-16,16px)] items-start min-w-px overflow-clip p-[var(--spacing-24,24px)] relative rounded-[var(--radius-12,12px)] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)] text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4553:45766" data-name="In Progress">
          <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[length:var(--font\/size\/medium,14px)]" data-node-id="4553:45767">
            In Progress
          </p>
          <p className="font-[family-name:var(--font\/family\/header,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[44px] relative shrink-0 text-[32px] tracking-[-0.16px]" data-node-id="4553:45768">
            5
          </p>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-[1_0_0] flex-col gap-[var(--spacing-16,16px)] items-start min-w-px overflow-clip p-[var(--spacing-24,24px)] relative rounded-[var(--radius-12,12px)] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)] text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4553:45769" data-name="Completed">
          <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[length:var(--font\/size\/medium,14px)]" data-node-id="4553:45770">
            Completed
          </p>
          <p className="font-[family-name:var(--font\/family\/header,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[44px] relative shrink-0 text-[32px] tracking-[-0.16px]" data-node-id="4553:45771">
            3
          </p>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-[1_0_0] flex-col gap-[var(--spacing-16,16px)] items-start min-w-px overflow-clip p-[var(--spacing-24,24px)] relative rounded-[var(--radius-12,12px)] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)]" data-node-id="4553:45772" data-name="Overdue">
          <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/medium,14px)]" data-node-id="4553:45773">
            Overdue
          </p>
          <p className="font-[family-name:var(--font\/family\/header,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[44px] relative shrink-0 text-[32px] text-[color:var(--foregrounds\/fg-error,#e11d48)] tracking-[-0.16px]" data-node-id="4553:45774">
            5
          </p>
        </div>
      </div>
      <div className="[word-break:break-word] content-stretch flex gap-[var(--spacing-16,16px)] items-start relative shrink-0 w-[1136px] whitespace-nowrap" data-node-id="4553:45775" data-name="Stat Cards">
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-[1_0_0] flex-col gap-[var(--spacing-16,16px)] items-start min-w-px overflow-clip p-[var(--spacing-24,24px)] relative rounded-[var(--radius-12,12px)] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)] text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4553:45776" data-name="Total reports">
          <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[length:var(--font\/size\/medium,14px)]" data-node-id="4553:45777">
            Total reports
          </p>
          <p className="font-[family-name:var(--font\/family\/header,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[44px] relative shrink-0 text-[32px] tracking-[-0.16px]" data-node-id="4553:45778">
            6
          </p>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-[1_0_0] flex-col gap-[var(--spacing-16,16px)] items-start min-w-px overflow-clip p-[var(--spacing-24,24px)] relative rounded-[var(--radius-12,12px)] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)]" data-node-id="4553:45779" data-name="Flagged overdue">
          <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/medium,14px)]" data-node-id="4553:45780">
            Flagged overdue
          </p>
          <p className="font-[family-name:var(--font\/family\/header,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[44px] relative shrink-0 text-[32px] text-[color:var(--foregrounds\/fg-error,#e11d48)] tracking-[-0.16px]" data-node-id="4553:45781">
            4
          </p>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-[1_0_0] flex-col gap-[var(--spacing-16,16px)] items-start min-w-px overflow-clip p-[var(--spacing-24,24px)] relative rounded-[var(--radius-12,12px)] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)] text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4553:45782" data-name="Avg per month">
          <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[length:var(--font\/size\/medium,14px)]" data-node-id="4553:45783">
            Avg per month
          </p>
          <p className="font-[family-name:var(--font\/family\/header,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[44px] relative shrink-0 text-[32px] tracking-[-0.16px]" data-node-id="4553:45784">
            2
          </p>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-[1_0_0] flex-col gap-[var(--spacing-16,16px)] items-start min-w-px overflow-clip p-[var(--spacing-24,24px)] relative rounded-[var(--radius-12,12px)] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)] text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4553:45785" data-name="Last generated">
          <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[length:var(--font\/size\/medium,14px)]" data-node-id="4553:45786">
            Last generated
          </p>
          <p className="font-[family-name:var(--font\/family\/header,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[44px] relative shrink-0 text-[32px] tracking-[-0.16px]" data-node-id="4553:45787">
            May 7
          </p>
        </div>
      </div>
      <div className="content-stretch flex gap-[var(--spacing-16,16px)] items-start relative shrink-0 w-[1136px]" data-node-id="4553:45788" data-name="Chart Cards">
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-[1_0_0] flex-col gap-[var(--spacing-16,16px)] items-start min-w-px overflow-clip p-[var(--spacing-24,24px)] relative rounded-[var(--radius-12,12px)] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)]" data-node-id="4553:45789" data-name="Tasks by Priority">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4553:45790">
            Tasks by Priority
          </p>
          <div className="content-stretch flex flex-col gap-[var(--spacing-16,16px)] items-start relative shrink-0 w-full" data-node-id="4553:45791" data-name="Rows">
            <div className="content-stretch flex flex-col gap-[var(--spacing-4,0px)] items-start relative shrink-0 w-full" data-node-id="4553:45792" data-name="Critical">
              <div className="content-stretch flex gap-[var(--radius-8,8px)] items-center relative shrink-0 w-full" data-node-id="4553:45793" data-name="Label Row">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] w-[88px]" data-node-id="4553:45794">
                  Critical
                </p>
                <div className="bg-[var(--borders\/border-base,#e5e7e4)] flex-[1_0_0] h-[8px] min-w-px overflow-clip relative rounded-[var(--radius-4,4px)]" data-node-id="4553:45795" data-name="Track">
                  <div className="absolute bg-[var(--tag\/purple\/tag-purple-icon,#a78bfa)] h-[8px] left-0 rounded-[var(--radius-4,4px)] top-0 w-[89px]" data-node-id="4553:45796" data-name="Bar" />
                </div>
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:45797">
                  4
                </p>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[var(--spacing-4,0px)] items-start relative shrink-0 w-full" data-node-id="4553:45798" data-name="High">
              <div className="content-stretch flex gap-[var(--radius-8,8px)] items-center relative shrink-0 w-full" data-node-id="4553:45799" data-name="Label Row">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] w-[88px]" data-node-id="4553:45800">
                  High
                </p>
                <div className="bg-[var(--borders\/border-base,#e5e7e4)] flex-[1_0_0] h-[8px] min-w-px overflow-clip relative rounded-[var(--radius-4,4px)]" data-node-id="4553:45801" data-name="Track">
                  <div className="absolute bg-[var(--tag\/error\/tag-red-icon,#f43f5e)] h-[8px] left-0 rounded-[var(--radius-4,4px)] top-0 w-[111px]" data-node-id="4553:45802" data-name="Bar" />
                </div>
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:45803">
                  5
                </p>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[var(--spacing-4,0px)] items-start relative shrink-0 w-full" data-node-id="4553:45804" data-name="Medium">
              <div className="content-stretch flex gap-[var(--radius-8,8px)] items-center relative shrink-0 w-full" data-node-id="4553:45805" data-name="Label Row">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] w-[88px]" data-node-id="4553:45806">
                  Medium
                </p>
                <div className="bg-[var(--borders\/border-base,#e5e7e4)] flex-[1_0_0] h-[8px] min-w-px overflow-clip relative rounded-[var(--radius-4,4px)]" data-node-id="4553:45807" data-name="Track">
                  <div className="absolute bg-[var(--tag\/warning\/tag-orange-icon,#f97316)] h-[8px] left-0 rounded-[var(--radius-4,4px)] top-0 w-[133px]" data-node-id="4553:45808" data-name="Bar" />
                </div>
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:45809">
                  6
                </p>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[var(--spacing-4,0px)] items-start relative shrink-0 w-full" data-node-id="4553:45810" data-name="Low">
              <div className="content-stretch flex gap-[var(--radius-8,8px)] items-center relative shrink-0 w-full" data-node-id="4553:45811" data-name="Label Row">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] w-[88px]" data-node-id="4553:45812">
                  Low
                </p>
                <div className="bg-[var(--borders\/border-base,#e5e7e4)] flex-[1_0_0] h-[8px] min-w-px overflow-clip relative rounded-[var(--radius-4,4px)]" data-node-id="4553:45813" data-name="Track">
                  <div className="absolute bg-[var(--tag\/neutral\/tag-neutral-icon,#a4aaa1)] h-[8px] left-0 rounded-[var(--radius-4,4px)] top-0 w-[67px]" data-node-id="4553:45814" data-name="Bar" />
                </div>
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:45815">
                  3
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-[1_0_0] flex-col gap-[var(--spacing-16,16px)] items-start min-w-px overflow-clip p-[var(--spacing-24,24px)] relative rounded-[var(--radius-12,12px)] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)]" data-node-id="4553:45816" data-name="Tasks by Status">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4553:45817">
            Tasks by Status
          </p>
          <div className="content-stretch flex flex-col gap-[var(--spacing-16,16px)] items-start relative shrink-0 w-full" data-node-id="4553:45818" data-name="Rows">
            <div className="content-stretch flex flex-col gap-[var(--spacing-4,0px)] items-start relative shrink-0 w-full" data-node-id="4553:45819" data-name="To Do">
              <div className="content-stretch flex gap-[var(--radius-8,8px)] items-center relative shrink-0 w-full" data-node-id="4553:45820" data-name="Label Row">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] w-[88px]" data-node-id="4553:45821">
                  To Do
                </p>
                <div className="bg-[var(--borders\/border-base,#e5e7e4)] flex-[1_0_0] h-[8px] min-w-px overflow-clip relative rounded-[var(--radius-4,4px)]" data-node-id="4553:45822" data-name="Track">
                  <div className="absolute bg-[var(--tag\/neutral\/tag-neutral-icon,#a4aaa1)] h-[8px] left-0 rounded-[var(--radius-4,4px)] top-0 w-[133px]" data-node-id="4553:45823" data-name="Bar" />
                </div>
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:45824">
                  6
                </p>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[var(--spacing-4,0px)] items-start relative shrink-0 w-full" data-node-id="4553:45825" data-name="In Progress">
              <div className="content-stretch flex gap-[var(--radius-8,8px)] items-center relative shrink-0 w-full" data-node-id="4553:45826" data-name="Label Row">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] w-[88px]" data-node-id="4553:45827">
                  In Progress
                </p>
                <div className="bg-[var(--borders\/border-base,#e5e7e4)] flex-[1_0_0] h-[8px] min-w-px overflow-clip relative rounded-[var(--radius-4,4px)]" data-node-id="4553:45828" data-name="Track">
                  <div className="absolute bg-[var(--tag\/blue\/tag-blue-icon,#60a5fa)] h-[8px] left-0 rounded-[var(--radius-4,4px)] top-0 w-[111px]" data-node-id="4553:45829" data-name="Bar" />
                </div>
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:45830">
                  5
                </p>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[var(--spacing-4,0px)] items-start relative shrink-0 w-full" data-node-id="4553:45831" data-name="In Review">
              <div className="content-stretch flex gap-[var(--radius-8,8px)] items-center relative shrink-0 w-full" data-node-id="4553:45832" data-name="Label Row">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] w-[88px]" data-node-id="4553:45833">
                  In Review
                </p>
                <div className="bg-[var(--borders\/border-base,#e5e7e4)] flex-[1_0_0] h-[8px] min-w-px overflow-clip relative rounded-[var(--radius-4,4px)]" data-node-id="4553:45834" data-name="Track">
                  <div className="absolute bg-[var(--tag\/warning\/tag-orange-icon,#f97316)] h-[8px] left-0 rounded-[var(--radius-4,4px)] top-0 w-[89px]" data-node-id="4553:45835" data-name="Bar" />
                </div>
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:45836">
                  4
                </p>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[var(--spacing-4,0px)] items-start relative shrink-0 w-full" data-node-id="4553:45837" data-name="Done">
              <div className="content-stretch flex gap-[var(--radius-8,8px)] items-center relative shrink-0 w-full" data-node-id="4553:45838" data-name="Label Row">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] w-[88px]" data-node-id="4553:45839">
                  Done
                </p>
                <div className="bg-[var(--borders\/border-base,#e5e7e4)] flex-[1_0_0] h-[8px] min-w-px overflow-clip relative rounded-[var(--radius-4,4px)]" data-node-id="4553:45840" data-name="Track">
                  <div className="absolute bg-[var(--tag\/success\/tag-green-icon,#10b981)] h-[8px] left-0 rounded-[var(--radius-4,4px)] top-0 w-[67px]" data-node-id="4553:45841" data-name="Bar" />
                </div>
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:45842">
                  3
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex gap-[var(--spacing-0,0px)] h-[32px] items-center relative shrink-0 w-[1136px]" data-node-id="4553:45843" data-name="Controls">
        <div className="bg-[var(--backgrounds\/bg-segment-control,rgba(0,0,0,0.06))] content-stretch flex gap-[2px] items-center justify-center p-[2px] relative rounded-[8px] shrink-0" data-node-id="4553:45844" data-name="Segment Control">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[10px] py-[4px] relative rounded-[6px] shrink-0" data-node-id="I4553:45844;7774:181794" data-name="Segment Item">
            <p className="[word-break:break-word] font-['Geist:Medium'] font-medium leading-[20px] relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="I4553:45844;7774:181794;7773:161134">
              Kanban
            </p>
          </div>
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[4px] items-center justify-center overflow-clip px-[10px] py-[4px] relative rounded-[6px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)] shrink-0" data-node-id="I4553:45844;7774:181802" data-name="Segment Item">
            <p className="[word-break:break-word] font-['Geist:Medium'] font-medium leading-[20px] relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-base,#0a0b09)] whitespace-nowrap" data-node-id="I4553:45844;7774:181802;7773:161136">
              List
            </p>
          </div>
        </div>
        <div className="flex-[1_0_0] h-full min-w-px relative" data-node-id="4553:45899" data-name="Spacer" />
        <div className="content-stretch flex gap-[var(--spacing-8,8px)] items-center relative shrink-0" data-node-id="4553:45900" data-name="Actions">
          <div className="content-stretch flex gap-[var(--spacing-8,8px)] items-center relative shrink-0" data-node-id="4553:45901" data-name="Filters">
            <div className="bg-[var(--buttons\/button-neutral,white)] content-stretch flex gap-[var(--spacing-6,6px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0" data-node-id="4553:45902" data-name="Button">
              <div className="relative shrink-0 size-[15px]" data-node-id="I4553:45902;5934:2743" data-name="funnel">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                  <div className="absolute inset-[7.96%_7.96%_2.04%_7.96%]" data-node-id="I4553:45902;5934:2743;13721:2301367" data-name="Vector">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector} />
                  </div>
                </div>
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:45902;5934:2744">
                Filter
              </p>
            </div>
            <div className="bg-[var(--buttons\/button-neutral,white)] content-stretch flex gap-[var(--spacing-6,6px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0" data-node-id="4553:45909" data-name="Button">
              <div className="relative shrink-0 size-[15px]" data-node-id="I4553:45909;5934:2743" data-name="calendar-mini">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                  <div className="absolute inset-[2.04%_5%]" data-node-id="I4553:45909;5934:2743;7271:14184" data-name="Vector">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector1} />
                  </div>
                </div>
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:45909;5934:2744">
                Date
              </p>
            </div>
            <div className="bg-[var(--buttons\/button-neutral,white)] content-stretch flex gap-[var(--spacing-6,6px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0" data-node-id="4553:45916" data-name="Button">
              <div className="relative shrink-0 size-[15px]" data-node-id="I4553:45916;5934:2743" data-name="adjustments">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                  <div className="absolute inset-[5%]" data-node-id="I4553:45916;5934:2743;13721:2301363" data-name="Vector">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector2} />
                  </div>
                </div>
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:45916;5934:2744">
                Columns
              </p>
            </div>
          </div>
          <div className="bg-[var(--buttons\/button-neutral,white)] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[28px]" data-node-id="4553:45923" data-name="IconButton">
            <div className="relative shrink-0 size-[15px]" data-node-id="I4553:45923;5934:5846" data-name="descending-sorting">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                <div className="absolute inset-[7.96%]" data-node-id="I4553:45923;5934:5846;13721:2301299" data-name="Vector">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector3} />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[var(--spacing-8,8px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--spacing-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-[160px]" data-node-id="4553:45927" data-name="Search Input">
            <div className="relative shrink-0 size-[15px]" data-node-id="I4553:45927;5943:7660" data-name="magnifying-glass">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                <div className="absolute inset-[7.96%]" data-node-id="I4553:45927;5943:7660;13721:2301281" data-name="Vector">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector4} />
                </div>
              </div>
            </div>
            <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-px relative text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-[length:var(--font\/size\/small,13px)]" data-node-id="I4553:45927;5943:7661">
              Search
            </p>
            <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] border border-[var(--borders\/border-base,#e5e7e4)] border-solid h-[18px] relative rounded-[var(--radius-4,4px)] shrink-0" data-node-id="I4553:45927;7083:56201" data-name="Kbd">
              <div className="bg-clip-padding border border-[transparent] border-solid content-stretch flex flex-col items-center justify-center overflow-clip px-[var(--spacing-4,4px)] relative rounded-[inherit] size-full">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:45927;7083:56201;4737:1537">
                  ⌘K
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex gap-[var(--spacing-0,0px)] h-[32px] items-center relative shrink-0 w-[1136px]" data-node-id="4553:45933" data-name="Controls">
        <div className="bg-[var(--backgrounds\/bg-segment-control,rgba(0,0,0,0.06))] content-stretch flex gap-[2px] items-center justify-center p-[2px] relative rounded-[8px] shrink-0" data-node-id="4553:45934" data-name="Segment Control">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[10px] py-[4px] relative rounded-[6px] shrink-0" data-node-id="I4553:45934;7774:181794" data-name="Segment Item">
            <p className="[word-break:break-word] font-['Geist:Medium'] font-medium leading-[20px] relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="I4553:45934;7774:181794;7773:161134">
              90d
            </p>
          </div>
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[4px] items-center justify-center overflow-clip px-[10px] py-[4px] relative rounded-[6px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)] shrink-0" data-node-id="I4553:45934;7774:181802" data-name="Segment Item">
            <p className="[word-break:break-word] font-['Geist:Medium'] font-medium leading-[20px] relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-base,#0a0b09)] whitespace-nowrap" data-node-id="I4553:45934;7774:181802;7773:161136">
              30d
            </p>
          </div>
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[10px] py-[4px] relative rounded-[6px] shrink-0" data-node-id="I4553:45934;7774:181810" data-name="Segment Item">
            <p className="[word-break:break-word] font-['Geist:Medium'] font-medium leading-[20px] relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="I4553:45934;7774:181810;7773:161134">
              7d
            </p>
          </div>
        </div>
        <div className="flex-[1_0_0] h-full min-w-px relative" data-node-id="4553:45989" data-name="Spacer" />
        <div className="content-stretch flex gap-[var(--spacing-8,8px)] items-center relative shrink-0" data-node-id="4553:45990" data-name="Actions">
          <div className="content-stretch flex gap-[var(--spacing-8,8px)] items-center relative shrink-0" data-node-id="4553:45991" data-name="Filters">
            <div className="bg-[var(--buttons\/button-neutral,white)] content-stretch flex gap-[var(--spacing-6,6px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0" data-node-id="4553:45992" data-name="Button">
              <div className="relative shrink-0 size-[15px]" data-node-id="I4553:45992;5934:2743" data-name="funnel">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                  <div className="absolute inset-[7.96%_7.96%_2.04%_7.96%]" data-node-id="I4553:45992;5934:2743;13721:2301367" data-name="Vector">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector} />
                  </div>
                </div>
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:45992;5934:2744">
                Filter
              </p>
            </div>
            <div className="bg-[var(--buttons\/button-neutral,white)] content-stretch flex gap-[var(--spacing-6,6px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0" data-node-id="4553:45999" data-name="Button">
              <div className="relative shrink-0 size-[15px]" data-node-id="I4553:45999;5934:2743" data-name="calendar-mini">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                  <div className="absolute inset-[2.04%_5%]" data-node-id="I4553:45999;5934:2743;7271:14184" data-name="Vector">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector1} />
                  </div>
                </div>
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:45999;5934:2744">
                Date
              </p>
            </div>
            <div className="bg-[var(--buttons\/button-neutral,white)] content-stretch flex gap-[var(--spacing-6,6px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0" data-node-id="4553:46006" data-name="Button">
              <div className="relative shrink-0 size-[15px]" data-node-id="I4553:46006;5934:2743" data-name="adjustments">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                  <div className="absolute inset-[5%]" data-node-id="I4553:46006;5934:2743;13721:2301363" data-name="Vector">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector2} />
                  </div>
                </div>
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46006;5934:2744">
                Columns
              </p>
            </div>
          </div>
          <div className="bg-[var(--buttons\/button-neutral,white)] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[28px]" data-node-id="4553:46013" data-name="IconButton">
            <div className="relative shrink-0 size-[15px]" data-node-id="I4553:46013;5934:5846" data-name="descending-sorting">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                <div className="absolute inset-[7.96%]" data-node-id="I4553:46013;5934:5846;13721:2301299" data-name="Vector">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector3} />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[var(--spacing-8,8px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--spacing-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-[160px]" data-node-id="4553:46017" data-name="Search Input">
            <div className="relative shrink-0 size-[15px]" data-node-id="I4553:46017;5943:7660" data-name="magnifying-glass">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                <div className="absolute inset-[7.96%]" data-node-id="I4553:46017;5943:7660;13721:2301281" data-name="Vector">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector4} />
                </div>
              </div>
            </div>
            <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-px relative text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-[length:var(--font\/size\/small,13px)]" data-node-id="I4553:46017;5943:7661">
              Search
            </p>
            <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] border border-[var(--borders\/border-base,#e5e7e4)] border-solid h-[18px] relative rounded-[var(--radius-4,4px)] shrink-0" data-node-id="I4553:46017;7083:56201" data-name="Kbd">
              <div className="bg-clip-padding border border-[transparent] border-solid content-stretch flex flex-col items-center justify-center overflow-clip px-[var(--spacing-4,4px)] relative rounded-[inherit] size-full">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:46017;7083:56201;4737:1537">
                  ⌘K
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-col gap-[var(--spacing-0,0px)] items-start overflow-clip p-[var(--spacing-0,0px)] relative rounded-[var(--radius-12,12px)] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)] shrink-0 w-[1136px]" data-node-id="4553:46023" data-name="Recent Tasks">
        <div className="content-stretch flex items-start overflow-clip pb-[16px] pt-[24px] px-[24px] relative shrink-0 w-full" data-node-id="4553:46024" data-name="Title Wrapper">
          <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4553:46025">
            Recent Tasks
          </p>
        </div>
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="4553:46026" data-name="Table">
          <div className="bg-[var(--backgrounds\/bg-subtle,#f8faf7)] content-stretch flex gap-[12px] h-[48px] items-center justify-center pl-[24px] pr-[64px] relative shrink-0 w-full" data-node-id="4553:46027" data-name="Table Header">
            <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-node-id="4553:46028" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46028;3645:3724">
                Task
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[160px]" data-node-id="4553:46030" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46030;3645:3724">
                Assignee
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[120px]" data-node-id="4553:46032" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46032;3645:3724">
                Priority
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[130px]" data-node-id="4553:46034" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46034;3645:3724">
                Due Date
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[140px]" data-node-id="4553:46036" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46036;3645:3724">
                Status
              </p>
            </div>
          </div>
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[12px] h-[48px] items-center justify-center px-[24px] relative shrink-0 w-full" data-node-id="4553:46039" data-name="Icon system audit">
            <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-node-id="4553:46040" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46040;3645:3720">
                Icon system audit
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-8,8px)] h-full items-center relative shrink-0 w-[160px]" data-node-id="4553:46042" data-name="Table Cell">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="I4553:46042;15725:1404" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/success\/tag-green-bg,rgba(16,185,129,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:46042;15725:1404;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/success\/tag-green-text,#065f46)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:46042;15725:1404;5726:636">
                    L
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46042;15725:1407">
                Lara Sato
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[120px]" data-node-id="4553:46047" data-name="Table Cell">
              <div className="bg-[var(--tag\/neutral\/tag-neutral-bg,#f4f5f4)] border border-[var(--tag\/neutral\/tag-neutral-border,#e5e7e4)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I4553:46047;5263:1338" data-name="Badge">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/neutral\/tag-neutral-text,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:46047;5263:1338;6180:151">
                  Low
                </p>
              </div>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[130px]" data-node-id="4553:46054" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46054;3645:3722">
                Jun 20, 2026
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-4,4px)] h-full items-center relative shrink-0 w-[140px]" data-node-id="4553:46056" data-name="Table Cell">
              <div className="overflow-clip relative shrink-0 size-[15px]" data-node-id="I4553:46056;6171:12910" data-name="square-grey-solid">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/neutral\/tag-neutral-icon,#a4aaa1)] border border-[var(--alpha-black\/alpha-12,rgba(0,0,0,0.12))] border-solid left-1/2 rounded-[2px] size-[8px] top-1/2" data-node-id="I4553:46056;6171:12910;6166:952" />
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46056;6171:12909">
                To Do
              </p>
            </div>
            <div className="content-stretch flex h-full items-center justify-end relative shrink-0" data-node-id="4553:46060" data-name="Table Cell">
              <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[28px]" data-node-id="I4553:46060;5507:859" data-name="IconButton">
                <div className="relative shrink-0 size-[15px]" data-node-id="I4553:46060;5507:859;5934:5864" data-name="ellipsis-horizontal">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                    <div className="absolute inset-[42.04%_7.96%]" data-node-id="I4553:46060;5507:859;5934:5864;13721:2301555" data-name="Vector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[12px] h-[48px] items-center justify-center px-[24px] relative shrink-0 w-full" data-node-id="4553:46066" data-name="Write API documentation">
            <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-node-id="4553:46067" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46067;3645:3720">
                Write API documentation
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-8,8px)] h-full items-center relative shrink-0 w-[160px]" data-node-id="4553:46069" data-name="Table Cell">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="I4553:46069;15725:1404" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/neutral\/tag-neutral-bg,#f4f5f4)] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:46069;15725:1404;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/neutral\/tag-neutral-text,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:46069;15725:1404;5726:636">
                    O
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46069;15725:1407">
                Owen King
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[120px]" data-node-id="4553:46074" data-name="Table Cell">
              <div className="bg-[var(--tag\/neutral\/tag-neutral-bg,#f4f5f4)] border border-[var(--tag\/neutral\/tag-neutral-border,#e5e7e4)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I4553:46074;5263:1338" data-name="Badge">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/neutral\/tag-neutral-text,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:46074;5263:1338;6180:151">
                  Low
                </p>
              </div>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[130px]" data-node-id="4553:46081" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46081;3645:3722">
                Jun 15, 2026
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-4,4px)] h-full items-center relative shrink-0 w-[140px]" data-node-id="4553:46083" data-name="Table Cell">
              <div className="overflow-clip relative shrink-0 size-[15px]" data-node-id="I4553:46083;6171:12910" data-name="square-grey-solid">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/neutral\/tag-neutral-icon,#a4aaa1)] border border-[var(--alpha-black\/alpha-12,rgba(0,0,0,0.12))] border-solid left-1/2 rounded-[2px] size-[8px] top-1/2" data-node-id="I4553:46083;6171:12910;6166:952" />
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46083;6171:12909">
                To Do
              </p>
            </div>
            <div className="content-stretch flex h-full items-center justify-end relative shrink-0" data-node-id="4553:46087" data-name="Table Cell">
              <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[28px]" data-node-id="I4553:46087;5507:859" data-name="IconButton">
                <div className="relative shrink-0 size-[15px]" data-node-id="I4553:46087;5507:859;5934:5864" data-name="ellipsis-horizontal">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                    <div className="absolute inset-[42.04%_7.96%]" data-node-id="I4553:46087;5507:859;5934:5864;13721:2301555" data-name="Vector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[12px] h-[48px] items-center justify-center px-[24px] relative shrink-0 w-full" data-node-id="4553:46093" data-name="Setup CI/CD pipeline">
            <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-node-id="4553:46094" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46094;3645:3720">
                Setup CI/CD pipeline
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-8,8px)] h-full items-center relative shrink-0 w-[160px]" data-node-id="4553:46096" data-name="Table Cell">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="I4553:46096;15725:1404" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/purple\/tag-purple-bg,rgba(139,92,246,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:46096;15725:1404;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/purple\/tag-purple-text,#5b21b6)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:46096;15725:1404;5726:636">
                    M
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46096;15725:1407">
                Mark Tan
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[120px]" data-node-id="4553:46101" data-name="Table Cell">
              <div className="bg-[var(--tag\/error\/tag-red-bg,rgba(244,63,94,0.12))] border border-[var(--tag\/error\/tag-red-border,#fecdd3)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I4553:46101;5263:1338" data-name="Badge">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/error\/tag-red-text,#9f1239)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:46101;5263:1338;6180:145">
                  High
                </p>
              </div>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[130px]" data-node-id="4553:46113" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46113;3645:3722">
                Jun 12, 2026
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-4,4px)] h-full items-center relative shrink-0 w-[140px]" data-node-id="4553:46115" data-name="Table Cell">
              <div className="overflow-clip relative shrink-0 size-[15px]" data-node-id="I4553:46115;6171:12910" data-name="square-blue-solid">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/blue\/tag-blue-icon,#60a5fa)] border border-[var(--alpha-black\/alpha-12,rgba(0,0,0,0.12))] border-solid left-1/2 rounded-[2px] size-[8px] top-1/2" data-node-id="I4553:46115;6171:12910;6173:13254" />
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46115;6171:12909">
                In Progress
              </p>
            </div>
            <div className="content-stretch flex h-full items-center justify-end relative shrink-0" data-node-id="4553:46119" data-name="Table Cell">
              <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[28px]" data-node-id="I4553:46119;5507:859" data-name="IconButton">
                <div className="relative shrink-0 size-[15px]" data-node-id="I4553:46119;5507:859;5934:5864" data-name="ellipsis-horizontal">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                    <div className="absolute inset-[42.04%_7.96%]" data-node-id="I4553:46119;5507:859;5934:5864;13721:2301555" data-name="Vector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[12px] h-[48px] items-center justify-center px-[24px] relative shrink-0 w-full" data-node-id="4553:46125" data-name="Performance audit">
            <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-node-id="4553:46126" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46126;3645:3720">
                Performance audit
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-8,8px)] h-full items-center relative shrink-0 w-[160px]" data-node-id="4553:46128" data-name="Table Cell">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="I4553:46128;15725:1404" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/neutral\/tag-neutral-bg,#f4f5f4)] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:46128;15725:1404;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/neutral\/tag-neutral-text,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:46128;15725:1404;5726:636">
                    O
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46128;15725:1407">
                Owen King
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[120px]" data-node-id="4553:46133" data-name="Table Cell">
              <div className="bg-[var(--tag\/error\/tag-red-bg,rgba(244,63,94,0.12))] border border-[var(--tag\/error\/tag-red-border,#fecdd3)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I4553:46133;5263:1338" data-name="Badge">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/error\/tag-red-text,#9f1239)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:46133;5263:1338;6180:145">
                  High
                </p>
              </div>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[130px]" data-node-id="4553:46145" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46145;3645:3722">
                Jun 10, 2026
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-4,4px)] h-full items-center relative shrink-0 w-[140px]" data-node-id="4553:46147" data-name="Table Cell">
              <div className="overflow-clip relative shrink-0 size-[15px]" data-node-id="I4553:46147;6171:12910" data-name="square-orange-solid">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/warning\/tag-orange-icon,#f97316)] border border-[var(--alpha-black\/alpha-12,rgba(0,0,0,0.12))] border-solid left-1/2 rounded-[2px] size-[8px] top-1/2" data-node-id="I4553:46147;6171:12910;6166:950" />
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46147;6171:12909">
                In Review
              </p>
            </div>
            <div className="content-stretch flex h-full items-center justify-end relative shrink-0" data-node-id="4553:46151" data-name="Table Cell">
              <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[28px]" data-node-id="I4553:46151;5507:859" data-name="IconButton">
                <div className="relative shrink-0 size-[15px]" data-node-id="I4553:46151;5507:859;5934:5864" data-name="ellipsis-horizontal">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                    <div className="absolute inset-[42.04%_7.96%]" data-node-id="I4553:46151;5507:859;5934:5864;13721:2301555" data-name="Vector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[12px] h-[48px] items-center justify-center px-[24px] relative shrink-0 w-full" data-node-id="4553:46157" data-name="Accessibility pass">
            <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-node-id="4553:46158" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46158;3645:3720">
                Accessibility pass
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-8,8px)] h-full items-center relative shrink-0 w-[160px]" data-node-id="4553:46160" data-name="Table Cell">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="I4553:46160;15725:1404" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/neutral\/tag-neutral-bg,#f4f5f4)] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:46160;15725:1404;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/neutral\/tag-neutral-text,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:46160;15725:1404;5726:636">
                    O
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46160;15725:1407">
                Owen King
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[120px]" data-node-id="4553:46165" data-name="Table Cell">
              <div className="bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] border border-[var(--tag\/warning\/tag-orange-border,#fed7aa)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I4553:46165;5263:1338" data-name="Badge">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:46165;5263:1338;6180:143">
                  Medium
                </p>
              </div>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[130px]" data-node-id="4553:46177" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46177;3645:3722">
                Jun 8, 2026
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-4,4px)] h-full items-center relative shrink-0 w-[140px]" data-node-id="4553:46179" data-name="Table Cell">
              <div className="overflow-clip relative shrink-0 size-[15px]" data-node-id="I4553:46179;6171:12910" data-name="square-grey-solid">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/neutral\/tag-neutral-icon,#a4aaa1)] border border-[var(--alpha-black\/alpha-12,rgba(0,0,0,0.12))] border-solid left-1/2 rounded-[2px] size-[8px] top-1/2" data-node-id="I4553:46179;6171:12910;6166:952" />
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46179;6171:12909">
                To Do
              </p>
            </div>
            <div className="content-stretch flex h-full items-center justify-end relative shrink-0" data-node-id="4553:46183" data-name="Table Cell">
              <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[28px]" data-node-id="I4553:46183;5507:859" data-name="IconButton">
                <div className="relative shrink-0 size-[15px]" data-node-id="I4553:46183;5507:859;5934:5864" data-name="ellipsis-horizontal">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                    <div className="absolute inset-[42.04%_7.96%]" data-node-id="I4553:46183;5507:859;5934:5864;13721:2301555" data-name="Vector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-col gap-[var(--spacing-0,0px)] items-start overflow-clip p-[var(--spacing-0,0px)] relative rounded-[var(--radius-12,12px)] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)] shrink-0 w-[1136px]" data-node-id="4553:46188" data-name="Tasks">
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="4553:46189" data-name="Table">
          <div className="bg-[var(--backgrounds\/bg-subtle,#f8faf7)] content-stretch flex gap-[12px] h-[48px] items-center justify-center pl-[24px] pr-[64px] relative shrink-0 w-full" data-node-id="4553:46190" data-name="Table Header">
            <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-node-id="4553:46191" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46191;3645:3724">
                Task
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[160px]" data-node-id="4553:46193" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46193;3645:3724">
                Assignee
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[120px]" data-node-id="4553:46195" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46195;3645:3724">
                Priority
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[130px]" data-node-id="4553:46197" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46197;3645:3724">
                Due Date
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[140px]" data-node-id="4553:46199" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46199;3645:3724">
                Status
              </p>
            </div>
          </div>
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[12px] h-[48px] items-center justify-center px-[24px] relative shrink-0 w-full" data-node-id="4553:46202" data-name="Update onboarding flow">
            <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-node-id="4553:46203" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46203;3645:3720">
                Update onboarding flow
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-8,8px)] h-full items-center relative shrink-0 w-[160px]" data-node-id="4553:46205" data-name="Table Cell">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="I4553:46205;15725:1404" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/blue\/tag-blue-bg,rgba(59,130,246,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:46205;15725:1404;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/blue\/tag-blue-text,#1e40af)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:46205;15725:1404;5726:636">
                    S
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46205;15725:1407">
                Sara Nelson
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[120px]" data-node-id="4553:46210" data-name="Table Cell">
              <div className="bg-[var(--tag\/error\/tag-red-bg,rgba(244,63,94,0.12))] border border-[var(--tag\/error\/tag-red-border,#fecdd3)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I4553:46210;5263:1338" data-name="Badge">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/error\/tag-red-text,#9f1239)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:46210;5263:1338;6180:145">
                  High
                </p>
              </div>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[130px]" data-node-id="4553:46222" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-error,#e11d48)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46222;3645:3722">
                May 25, 2026
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-4,4px)] h-full items-center relative shrink-0 w-[140px]" data-node-id="4553:46224" data-name="Table Cell">
              <div className="overflow-clip relative shrink-0 size-[15px]" data-node-id="I4553:46224;6171:12910" data-name="square-blue-solid">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/blue\/tag-blue-icon,#60a5fa)] border border-[var(--alpha-black\/alpha-12,rgba(0,0,0,0.12))] border-solid left-1/2 rounded-[2px] size-[8px] top-1/2" data-node-id="I4553:46224;6171:12910;6173:13254" />
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46224;6171:12909">
                In Progress
              </p>
            </div>
            <div className="content-stretch flex h-full items-center justify-end relative shrink-0" data-node-id="4553:46228" data-name="Table Cell">
              <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[28px]" data-node-id="I4553:46228;5507:859" data-name="IconButton">
                <div className="relative shrink-0 size-[15px]" data-node-id="I4553:46228;5507:859;5934:5864" data-name="ellipsis-horizontal">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                    <div className="absolute inset-[42.04%_7.96%]" data-node-id="I4553:46228;5507:859;5934:5864;13721:2301555" data-name="Vector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[12px] h-[48px] items-center justify-center px-[24px] relative shrink-0 w-full" data-node-id="4553:46234" data-name="Q2 roadmap review">
            <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-node-id="4553:46235" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46235;3645:3720">
                Q2 roadmap review
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-8,8px)] h-full items-center relative shrink-0 w-[160px]" data-node-id="4553:46237" data-name="Table Cell">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="I4553:46237;15725:1404" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:46237;15725:1404;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:46237;15725:1404;5726:636">
                    P
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46237;15725:1407">
                Priya Rao
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[120px]" data-node-id="4553:46242" data-name="Table Cell">
              <div className="bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] border border-[var(--tag\/warning\/tag-orange-border,#fed7aa)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I4553:46242;5263:1338" data-name="Badge">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:46242;5263:1338;6180:143">
                  Medium
                </p>
              </div>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[130px]" data-node-id="4553:46254" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-error,#e11d48)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46254;3645:3722">
                May 30, 2026
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-4,4px)] h-full items-center relative shrink-0 w-[140px]" data-node-id="4553:46256" data-name="Table Cell">
              <div className="overflow-clip relative shrink-0 size-[15px]" data-node-id="I4553:46256;6171:12910" data-name="square-orange-solid">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/warning\/tag-orange-icon,#f97316)] border border-[var(--alpha-black\/alpha-12,rgba(0,0,0,0.12))] border-solid left-1/2 rounded-[2px] size-[8px] top-1/2" data-node-id="I4553:46256;6171:12910;6166:950" />
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46256;6171:12909">
                In Review
              </p>
            </div>
            <div className="content-stretch flex h-full items-center justify-end relative shrink-0" data-node-id="4553:46260" data-name="Table Cell">
              <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[28px]" data-node-id="I4553:46260;5507:859" data-name="IconButton">
                <div className="relative shrink-0 size-[15px]" data-node-id="I4553:46260;5507:859;5934:5864" data-name="ellipsis-horizontal">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                    <div className="absolute inset-[42.04%_7.96%]" data-node-id="I4553:46260;5507:859;5934:5864;13721:2301555" data-name="Vector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[12px] h-[48px] items-center justify-center px-[24px] relative shrink-0 w-full" data-node-id="4553:46266" data-name="Customer interviews">
            <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-node-id="4553:46267" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46267;3645:3720">
                Customer interviews
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-8,8px)] h-full items-center relative shrink-0 w-[160px]" data-node-id="4553:46269" data-name="Table Cell">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="I4553:46269;15725:1404" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/success\/tag-green-bg,rgba(16,185,129,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:46269;15725:1404;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/success\/tag-green-text,#065f46)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:46269;15725:1404;5726:636">
                    L
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46269;15725:1407">
                Lara Sato
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[120px]" data-node-id="4553:46274" data-name="Table Cell">
              <div className="bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] border border-[var(--tag\/warning\/tag-orange-border,#fed7aa)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I4553:46274;5263:1338" data-name="Badge">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:46274;5263:1338;6180:143">
                  Medium
                </p>
              </div>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[130px]" data-node-id="4553:46286" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46286;3645:3722">
                Jun 7, 2026
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-4,4px)] h-full items-center relative shrink-0 w-[140px]" data-node-id="4553:46288" data-name="Table Cell">
              <div className="overflow-clip relative shrink-0 size-[15px]" data-node-id="I4553:46288;6171:12910" data-name="square-grey-solid">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/neutral\/tag-neutral-icon,#a4aaa1)] border border-[var(--alpha-black\/alpha-12,rgba(0,0,0,0.12))] border-solid left-1/2 rounded-[2px] size-[8px] top-1/2" data-node-id="I4553:46288;6171:12910;6166:952" />
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46288;6171:12909">
                To Do
              </p>
            </div>
            <div className="content-stretch flex h-full items-center justify-end relative shrink-0" data-node-id="4553:46292" data-name="Table Cell">
              <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[28px]" data-node-id="I4553:46292;5507:859" data-name="IconButton">
                <div className="relative shrink-0 size-[15px]" data-node-id="I4553:46292;5507:859;5934:5864" data-name="ellipsis-horizontal">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                    <div className="absolute inset-[42.04%_7.96%]" data-node-id="I4553:46292;5507:859;5934:5864;13721:2301555" data-name="Vector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[12px] h-[48px] items-center justify-center px-[24px] relative shrink-0 w-full" data-node-id="4553:46298" data-name="Fix billing bug #482">
            <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-node-id="4553:46299" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46299;3645:3720">
                Fix billing bug #482
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-8,8px)] h-full items-center relative shrink-0 w-[160px]" data-node-id="4553:46301" data-name="Table Cell">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="I4553:46301;15725:1404" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/error\/tag-red-bg,rgba(244,63,94,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:46301;15725:1404;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/error\/tag-red-text,#9f1239)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:46301;15725:1404;5726:636">
                    B
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46301;15725:1407">
                Ben Walsh
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[120px]" data-node-id="4553:46306" data-name="Table Cell">
              <div className="bg-[var(--tag\/purple\/tag-purple-bg,rgba(139,92,246,0.12))] border border-[var(--tag\/purple\/tag-purple-border,#ddd6fe)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center pl-[var(--spacing-8,9px)] pr-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I4553:46306;5263:1338" data-name="Badge">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/purple\/tag-purple-text,#5b21b6)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:46306;5263:1338;6180:177">
                  Critical
                </p>
              </div>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[130px]" data-node-id="4553:46318" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-error,#e11d48)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46318;3645:3722">
                May 23, 2026
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-4,4px)] h-full items-center relative shrink-0 w-[140px]" data-node-id="4553:46320" data-name="Table Cell">
              <div className="overflow-clip relative shrink-0 size-[15px]" data-node-id="I4553:46320;6171:12910" data-name="square-blue-solid">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/blue\/tag-blue-icon,#60a5fa)] border border-[var(--alpha-black\/alpha-12,rgba(0,0,0,0.12))] border-solid left-1/2 rounded-[2px] size-[8px] top-1/2" data-node-id="I4553:46320;6171:12910;6173:13254" />
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46320;6171:12909">
                In Progress
              </p>
            </div>
            <div className="content-stretch flex h-full items-center justify-end relative shrink-0" data-node-id="4553:46324" data-name="Table Cell">
              <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[28px]" data-node-id="I4553:46324;5507:859" data-name="IconButton">
                <div className="relative shrink-0 size-[15px]" data-node-id="I4553:46324;5507:859;5934:5864" data-name="ellipsis-horizontal">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                    <div className="absolute inset-[42.04%_7.96%]" data-node-id="I4553:46324;5507:859;5934:5864;13721:2301555" data-name="Vector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[12px] h-[48px] items-center justify-center px-[24px] relative shrink-0 w-full" data-node-id="4553:46330" data-name="Design QA — Settings">
            <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-node-id="4553:46331" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46331;3645:3720">
                Design QA — Settings
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-8,8px)] h-full items-center relative shrink-0 w-[160px]" data-node-id="4553:46333" data-name="Table Cell">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="I4553:46333;15725:1404" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/blue\/tag-blue-bg,rgba(59,130,246,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:46333;15725:1404;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/blue\/tag-blue-text,#1e40af)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:46333;15725:1404;5726:636">
                    S
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46333;15725:1407">
                Sara Nelson
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[120px]" data-node-id="4553:46338" data-name="Table Cell">
              <div className="bg-[var(--tag\/error\/tag-red-bg,rgba(244,63,94,0.12))] border border-[var(--tag\/error\/tag-red-border,#fecdd3)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I4553:46338;5263:1338" data-name="Badge">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/error\/tag-red-text,#9f1239)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:46338;5263:1338;6180:145">
                  High
                </p>
              </div>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[130px]" data-node-id="4553:46350" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46350;3645:3722">
                Jun 3, 2026
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-4,4px)] h-full items-center relative shrink-0 w-[140px]" data-node-id="4553:46352" data-name="Table Cell">
              <div className="overflow-clip relative shrink-0 size-[15px]" data-node-id="I4553:46352;6171:12910" data-name="square-orange-solid">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/warning\/tag-orange-icon,#f97316)] border border-[var(--alpha-black\/alpha-12,rgba(0,0,0,0.12))] border-solid left-1/2 rounded-[2px] size-[8px] top-1/2" data-node-id="I4553:46352;6171:12910;6166:950" />
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46352;6171:12909">
                In Review
              </p>
            </div>
            <div className="content-stretch flex h-full items-center justify-end relative shrink-0" data-node-id="4553:46356" data-name="Table Cell">
              <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[28px]" data-node-id="I4553:46356;5507:859" data-name="IconButton">
                <div className="relative shrink-0 size-[15px]" data-node-id="I4553:46356;5507:859;5934:5864" data-name="ellipsis-horizontal">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                    <div className="absolute inset-[42.04%_7.96%]" data-node-id="I4553:46356;5507:859;5934:5864;13721:2301555" data-name="Vector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[12px] h-[48px] items-center justify-center px-[24px] relative shrink-0 w-full" data-node-id="4553:46362" data-name="Migrate analytics SDK">
            <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-node-id="4553:46363" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46363;3645:3720">
                Migrate analytics SDK
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-8,8px)] h-full items-center relative shrink-0 w-[160px]" data-node-id="4553:46365" data-name="Table Cell">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="I4553:46365;15725:1404" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/purple\/tag-purple-bg,rgba(139,92,246,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:46365;15725:1404;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/purple\/tag-purple-text,#5b21b6)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:46365;15725:1404;5726:636">
                    M
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46365;15725:1407">
                Mark Tan
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[120px]" data-node-id="4553:46370" data-name="Table Cell">
              <div className="bg-[var(--tag\/error\/tag-red-bg,rgba(244,63,94,0.12))] border border-[var(--tag\/error\/tag-red-border,#fecdd3)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I4553:46370;5263:1338" data-name="Badge">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/error\/tag-red-text,#9f1239)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:46370;5263:1338;6180:145">
                  High
                </p>
              </div>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[130px]" data-node-id="4553:46382" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46382;3645:3722">
                Jun 5, 2026
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-4,4px)] h-full items-center relative shrink-0 w-[140px]" data-node-id="4553:46384" data-name="Table Cell">
              <div className="overflow-clip relative shrink-0 size-[15px]" data-node-id="I4553:46384;6171:12910" data-name="square-grey-solid">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/neutral\/tag-neutral-icon,#a4aaa1)] border border-[var(--alpha-black\/alpha-12,rgba(0,0,0,0.12))] border-solid left-1/2 rounded-[2px] size-[8px] top-1/2" data-node-id="I4553:46384;6171:12910;6166:952" />
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46384;6171:12909">
                To Do
              </p>
            </div>
            <div className="content-stretch flex h-full items-center justify-end relative shrink-0" data-node-id="4553:46388" data-name="Table Cell">
              <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[28px]" data-node-id="I4553:46388;5507:859" data-name="IconButton">
                <div className="relative shrink-0 size-[15px]" data-node-id="I4553:46388;5507:859;5934:5864" data-name="ellipsis-horizontal">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                    <div className="absolute inset-[42.04%_7.96%]" data-node-id="I4553:46388;5507:859;5934:5864;13721:2301555" data-name="Vector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[12px] h-[48px] items-center justify-center px-[24px] relative shrink-0 w-full" data-node-id="4553:46394" data-name="Redesign landing page">
            <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-node-id="4553:46395" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46395;3645:3720">
                Redesign landing page
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-8,8px)] h-full items-center relative shrink-0 w-[160px]" data-node-id="4553:46397" data-name="Table Cell">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="I4553:46397;15725:1404" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/success\/tag-green-bg,rgba(16,185,129,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:46397;15725:1404;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/success\/tag-green-text,#065f46)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:46397;15725:1404;5726:636">
                    L
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46397;15725:1407">
                Lara Sato
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[120px]" data-node-id="4553:46402" data-name="Table Cell">
              <div className="bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] border border-[var(--tag\/warning\/tag-orange-border,#fed7aa)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I4553:46402;5263:1338" data-name="Badge">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:46402;5263:1338;6180:143">
                  Medium
                </p>
              </div>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[130px]" data-node-id="4553:46414" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46414;3645:3722">
                Jun 1, 2026
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-4,4px)] h-full items-center relative shrink-0 w-[140px]" data-node-id="4553:46416" data-name="Table Cell">
              <div className="overflow-clip relative shrink-0 size-[15px]" data-node-id="I4553:46416;6171:12910" data-name="square-blue-solid">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/blue\/tag-blue-icon,#60a5fa)] border border-[var(--alpha-black\/alpha-12,rgba(0,0,0,0.12))] border-solid left-1/2 rounded-[2px] size-[8px] top-1/2" data-node-id="I4553:46416;6171:12910;6173:13254" />
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46416;6171:12909">
                In Progress
              </p>
            </div>
            <div className="content-stretch flex h-full items-center justify-end relative shrink-0" data-node-id="4553:46420" data-name="Table Cell">
              <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[28px]" data-node-id="I4553:46420;5507:859" data-name="IconButton">
                <div className="relative shrink-0 size-[15px]" data-node-id="I4553:46420;5507:859;5934:5864" data-name="ellipsis-horizontal">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                    <div className="absolute inset-[42.04%_7.96%]" data-node-id="I4553:46420;5507:859;5934:5864;13721:2301555" data-name="Vector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[12px] h-[48px] items-center justify-center px-[24px] relative shrink-0 w-full" data-node-id="4553:46426" data-name="Fix login bug">
            <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-node-id="4553:46427" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46427;3645:3720">
                Fix login bug
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-8,8px)] h-full items-center relative shrink-0 w-[160px]" data-node-id="4553:46429" data-name="Table Cell">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="I4553:46429;15725:1404" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/error\/tag-red-bg,rgba(244,63,94,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:46429;15725:1404;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/error\/tag-red-text,#9f1239)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:46429;15725:1404;5726:636">
                    B
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46429;15725:1407">
                Ben Walsh
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[120px]" data-node-id="4553:46434" data-name="Table Cell">
              <div className="bg-[var(--tag\/purple\/tag-purple-bg,rgba(139,92,246,0.12))] border border-[var(--tag\/purple\/tag-purple-border,#ddd6fe)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center pl-[var(--spacing-8,9px)] pr-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I4553:46434;5263:1338" data-name="Badge">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/purple\/tag-purple-text,#5b21b6)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:46434;5263:1338;6180:177">
                  Critical
                </p>
              </div>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[130px]" data-node-id="4553:46446" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46446;3645:3722">
                May 21, 2026
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-4,4px)] h-full items-center relative shrink-0 w-[140px]" data-node-id="4553:46448" data-name="Table Cell">
              <SquareGreenSolid className="overflow-clip relative shrink-0 size-[15px]" />
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46448;6171:12909">
                Done
              </p>
            </div>
            <div className="content-stretch flex h-full items-center justify-end relative shrink-0" data-node-id="4553:46452" data-name="Table Cell">
              <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[28px]" data-node-id="I4553:46452;5507:859" data-name="IconButton">
                <div className="relative shrink-0 size-[15px]" data-node-id="I4553:46452;5507:859;5934:5864" data-name="ellipsis-horizontal">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                    <div className="absolute inset-[42.04%_7.96%]" data-node-id="I4553:46452;5507:859;5934:5864;13721:2301555" data-name="Vector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[12px] h-[48px] items-center justify-center px-[24px] relative shrink-0 w-full" data-node-id="4553:46457" data-name="Write API documentation">
            <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-node-id="4553:46458" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46458;3645:3720">
                Write API documentation
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-8,8px)] h-full items-center relative shrink-0 w-[160px]" data-node-id="4553:46460" data-name="Table Cell">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="I4553:46460;15725:1404" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/neutral\/tag-neutral-bg,#f4f5f4)] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:46460;15725:1404;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/neutral\/tag-neutral-text,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:46460;15725:1404;5726:636">
                    O
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46460;15725:1407">
                Owen King
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[120px]" data-node-id="4553:46465" data-name="Table Cell">
              <div className="bg-[var(--tag\/neutral\/tag-neutral-bg,#f4f5f4)] border border-[var(--tag\/neutral\/tag-neutral-border,#e5e7e4)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I4553:46465;5263:1338" data-name="Badge">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/neutral\/tag-neutral-text,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:46465;5263:1338;6180:151">
                  Low
                </p>
              </div>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[130px]" data-node-id="4553:46472" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46472;3645:3722">
                Jun 15, 2026
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-4,4px)] h-full items-center relative shrink-0 w-[140px]" data-node-id="4553:46474" data-name="Table Cell">
              <div className="overflow-clip relative shrink-0 size-[15px]" data-node-id="I4553:46474;6171:12910" data-name="square-grey-solid">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/neutral\/tag-neutral-icon,#a4aaa1)] border border-[var(--alpha-black\/alpha-12,rgba(0,0,0,0.12))] border-solid left-1/2 rounded-[2px] size-[8px] top-1/2" data-node-id="I4553:46474;6171:12910;6166:952" />
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46474;6171:12909">
                To Do
              </p>
            </div>
            <div className="content-stretch flex h-full items-center justify-end relative shrink-0" data-node-id="4553:46478" data-name="Table Cell">
              <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[28px]" data-node-id="I4553:46478;5507:859" data-name="IconButton">
                <div className="relative shrink-0 size-[15px]" data-node-id="I4553:46478;5507:859;5934:5864" data-name="ellipsis-horizontal">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                    <div className="absolute inset-[42.04%_7.96%]" data-node-id="I4553:46478;5507:859;5934:5864;13721:2301555" data-name="Vector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[12px] h-[48px] items-center justify-center px-[24px] relative shrink-0 w-full" data-node-id="4553:46484" data-name="Setup CI/CD pipeline">
            <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-node-id="4553:46485" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46485;3645:3720">
                Setup CI/CD pipeline
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-8,8px)] h-full items-center relative shrink-0 w-[160px]" data-node-id="4553:46487" data-name="Table Cell">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="I4553:46487;15725:1404" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/purple\/tag-purple-bg,rgba(139,92,246,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:46487;15725:1404;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/purple\/tag-purple-text,#5b21b6)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:46487;15725:1404;5726:636">
                    M
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46487;15725:1407">
                Mark Tan
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[120px]" data-node-id="4553:46492" data-name="Table Cell">
              <div className="bg-[var(--tag\/error\/tag-red-bg,rgba(244,63,94,0.12))] border border-[var(--tag\/error\/tag-red-border,#fecdd3)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I4553:46492;5263:1338" data-name="Badge">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/error\/tag-red-text,#9f1239)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:46492;5263:1338;6180:145">
                  High
                </p>
              </div>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[130px]" data-node-id="4553:46504" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46504;3645:3722">
                Jun 12, 2026
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-4,4px)] h-full items-center relative shrink-0 w-[140px]" data-node-id="4553:46506" data-name="Table Cell">
              <div className="overflow-clip relative shrink-0 size-[15px]" data-node-id="I4553:46506;6171:12910" data-name="square-blue-solid">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/blue\/tag-blue-icon,#60a5fa)] border border-[var(--alpha-black\/alpha-12,rgba(0,0,0,0.12))] border-solid left-1/2 rounded-[2px] size-[8px] top-1/2" data-node-id="I4553:46506;6171:12910;6173:13254" />
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46506;6171:12909">
                In Progress
              </p>
            </div>
            <div className="content-stretch flex h-full items-center justify-end relative shrink-0" data-node-id="4553:46510" data-name="Table Cell">
              <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[28px]" data-node-id="I4553:46510;5507:859" data-name="IconButton">
                <div className="relative shrink-0 size-[15px]" data-node-id="I4553:46510;5507:859;5934:5864" data-name="ellipsis-horizontal">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                    <div className="absolute inset-[42.04%_7.96%]" data-node-id="I4553:46510;5507:859;5934:5864;13721:2301555" data-name="Vector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex items-center justify-between p-[16px] relative shrink-0 w-full" data-node-id="4553:46515" data-name="Table Footer">
          <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex gap-[4px] items-center px-[8px] py-[4px] relative rounded-[6px] shrink-0" data-node-id="I4553:46515;3665:3510" data-name="Results">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46515;3665:3507">
              1
            </p>
            <div className="relative shrink-0 size-[15px]" data-node-id="I4553:46515;3665:3508" data-name="minus">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[1.5px] left-1/2 top-1/2 w-[11.5px]" data-node-id="I4553:46515;3665:3508;13721:2301301" data-name="Vector">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector6} />
                </div>
              </div>
            </div>
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46515;3665:3511">
              10 of 18 results
            </p>
          </div>
          <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0" data-node-id="I4553:46515;3651:3991" data-name="Pages">
            <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex gap-[var(--spacing-6,6px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shrink-0" data-node-id="I4553:46515;4663:11421" data-name="Button">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46515;4663:11421;5934:2788">
                1 of 10 pages
              </p>
            </div>
            <div className="content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.12),0px_0px_0px_rgba(0,0,0,0.08)] flex gap-[var(--spacing-6,6px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shrink-0" data-node-id="I4553:46515;4663:11395" data-name="Button">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-disabled,#d5d8d4)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46515;4663:11395;5934:2760">
                Prev
              </p>
            </div>
            <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex gap-[var(--spacing-6,6px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shrink-0" data-node-id="I4553:46515;4663:11408" data-name="Button">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46515;4663:11408;5934:2788">
                Next
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-col gap-[var(--spacing-0,0px)] items-start overflow-clip p-[var(--spacing-0,0px)] relative rounded-[var(--radius-12,12px)] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)] shrink-0 w-[1136px]" data-node-id="4553:46540" data-name="Team">
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="4553:46541" data-name="Table">
          <div className="bg-[var(--backgrounds\/bg-subtle,#f8faf7)] content-stretch flex gap-[12px] h-[48px] items-center justify-center pl-[24px] pr-[64px] relative shrink-0 w-full" data-node-id="4553:46542" data-name="Table Header">
            <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-node-id="4553:46543" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46543;3645:3724">
                Member
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[220px]" data-node-id="4553:46545" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46545;3645:3724">
                Email
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[160px]" data-node-id="4553:46547" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46547;3645:3724">
                Role
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[100px]" data-node-id="4553:46549" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46549;3645:3724">
                Active tasks
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[100px]" data-node-id="4553:46551" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46551;3645:3724">
                Overdue
              </p>
            </div>
          </div>
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[12px] h-[48px] items-center justify-center px-[24px] relative shrink-0 w-full" data-node-id="4553:46554" data-name="Row">
            <div className="content-stretch flex flex-[1_0_0] gap-[var(--spacing-8,8px)] h-full items-center min-w-px relative" data-node-id="4553:46555" data-name="Table Cell">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="I4553:46555;15725:1404" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/blue\/tag-blue-bg,rgba(59,130,246,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:46555;15725:1404;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/blue\/tag-blue-text,#1e40af)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:46555;15725:1404;5726:636">
                    S
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46555;15725:1407">
                Sara Nelson
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[220px]" data-node-id="4553:46560" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="I4553:46560;3645:3722">
                ​
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[160px]" data-node-id="4553:46562" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="I4553:46562;3645:3722">
                ​
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[100px]" data-node-id="4553:46564" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46564;3645:3720">
                3
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[100px]" data-node-id="4553:46566" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-error,#e11d48)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46566;3645:3720">
                2
              </p>
            </div>
            <div className="content-stretch flex h-full items-center justify-end relative shrink-0" data-node-id="4553:46568" data-name="Table Cell">
              <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[28px]" data-node-id="I4553:46568;5507:859" data-name="IconButton">
                <div className="relative shrink-0 size-[15px]" data-node-id="I4553:46568;5507:859;5934:5864" data-name="ellipsis-horizontal">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                    <div className="absolute inset-[42.04%_7.96%]" data-node-id="I4553:46568;5507:859;5934:5864;13721:2301555" data-name="Vector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[12px] h-[48px] items-center justify-center px-[24px] relative shrink-0 w-full" data-node-id="4553:46573" data-name="Row">
            <div className="content-stretch flex flex-[1_0_0] gap-[var(--spacing-8,8px)] h-full items-center min-w-px relative" data-node-id="4553:46574" data-name="Table Cell">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="I4553:46574;15725:1404" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/purple\/tag-purple-bg,rgba(139,92,246,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:46574;15725:1404;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/purple\/tag-purple-text,#5b21b6)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:46574;15725:1404;5726:636">
                    M
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46574;15725:1407">
                Mark Tan
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[220px]" data-node-id="4553:46579" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="I4553:46579;3645:3722">
                ​
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[160px]" data-node-id="4553:46581" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="I4553:46581;3645:3722">
                ​
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[100px]" data-node-id="4553:46583" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46583;3645:3720">
                2
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[100px]" data-node-id="4553:46585" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46585;3645:3720">
                0
              </p>
            </div>
            <div className="content-stretch flex h-full items-center justify-end relative shrink-0" data-node-id="4553:46587" data-name="Table Cell">
              <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[28px]" data-node-id="I4553:46587;5507:859" data-name="IconButton">
                <div className="relative shrink-0 size-[15px]" data-node-id="I4553:46587;5507:859;5934:5864" data-name="ellipsis-horizontal">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                    <div className="absolute inset-[42.04%_7.96%]" data-node-id="I4553:46587;5507:859;5934:5864;13721:2301555" data-name="Vector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[12px] h-[48px] items-center justify-center px-[24px] relative shrink-0 w-full" data-node-id="4553:46592" data-name="Row">
            <div className="content-stretch flex flex-[1_0_0] gap-[var(--spacing-8,8px)] h-full items-center min-w-px relative" data-node-id="4553:46593" data-name="Table Cell">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="I4553:46593;15725:1404" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:46593;15725:1404;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:46593;15725:1404;5726:636">
                    P
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46593;15725:1407">
                Priya Rao
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[220px]" data-node-id="4553:46598" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="I4553:46598;3645:3722">
                ​
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[160px]" data-node-id="4553:46600" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="I4553:46600;3645:3722">
                ​
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[100px]" data-node-id="4553:46602" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46602;3645:3720">
                2
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[100px]" data-node-id="4553:46604" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-error,#e11d48)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46604;3645:3720">
                2
              </p>
            </div>
            <div className="content-stretch flex h-full items-center justify-end relative shrink-0" data-node-id="4553:46606" data-name="Table Cell">
              <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[28px]" data-node-id="I4553:46606;5507:859" data-name="IconButton">
                <div className="relative shrink-0 size-[15px]" data-node-id="I4553:46606;5507:859;5934:5864" data-name="ellipsis-horizontal">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                    <div className="absolute inset-[42.04%_7.96%]" data-node-id="I4553:46606;5507:859;5934:5864;13721:2301555" data-name="Vector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[12px] h-[48px] items-center justify-center px-[24px] relative shrink-0 w-full" data-node-id="4553:46611" data-name="Row">
            <div className="content-stretch flex flex-[1_0_0] gap-[var(--spacing-8,8px)] h-full items-center min-w-px relative" data-node-id="4553:46612" data-name="Table Cell">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="I4553:46612;15725:1404" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/error\/tag-red-bg,rgba(244,63,94,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:46612;15725:1404;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/error\/tag-red-text,#9f1239)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:46612;15725:1404;5726:636">
                    B
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46612;15725:1407">
                Ben Walsh
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[220px]" data-node-id="4553:46617" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="I4553:46617;3645:3722">
                ​
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[160px]" data-node-id="4553:46619" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="I4553:46619;3645:3722">
                ​
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[100px]" data-node-id="4553:46621" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46621;3645:3720">
                2
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[100px]" data-node-id="4553:46623" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-error,#e11d48)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46623;3645:3720">
                1
              </p>
            </div>
            <div className="content-stretch flex h-full items-center justify-end relative shrink-0" data-node-id="4553:46625" data-name="Table Cell">
              <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[28px]" data-node-id="I4553:46625;5507:859" data-name="IconButton">
                <div className="relative shrink-0 size-[15px]" data-node-id="I4553:46625;5507:859;5934:5864" data-name="ellipsis-horizontal">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                    <div className="absolute inset-[42.04%_7.96%]" data-node-id="I4553:46625;5507:859;5934:5864;13721:2301555" data-name="Vector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[12px] h-[48px] items-center justify-center px-[24px] relative shrink-0 w-full" data-node-id="4553:46630" data-name="Row">
            <div className="content-stretch flex flex-[1_0_0] gap-[var(--spacing-8,8px)] h-full items-center min-w-px relative" data-node-id="4553:46631" data-name="Table Cell">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="I4553:46631;15725:1404" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/success\/tag-green-bg,rgba(16,185,129,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:46631;15725:1404;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/success\/tag-green-text,#065f46)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:46631;15725:1404;5726:636">
                    L
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46631;15725:1407">
                Lara Sato
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[220px]" data-node-id="4553:46636" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="I4553:46636;3645:3722">
                ​
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[160px]" data-node-id="4553:46638" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="I4553:46638;3645:3722">
                ​
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[100px]" data-node-id="4553:46640" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46640;3645:3720">
                3
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[100px]" data-node-id="4553:46642" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46642;3645:3720">
                0
              </p>
            </div>
            <div className="content-stretch flex h-full items-center justify-end relative shrink-0" data-node-id="4553:46644" data-name="Table Cell">
              <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[28px]" data-node-id="I4553:46644;5507:859" data-name="IconButton">
                <div className="relative shrink-0 size-[15px]" data-node-id="I4553:46644;5507:859;5934:5864" data-name="ellipsis-horizontal">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                    <div className="absolute inset-[42.04%_7.96%]" data-node-id="I4553:46644;5507:859;5934:5864;13721:2301555" data-name="Vector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[12px] h-[48px] items-center justify-center px-[24px] relative shrink-0 w-full" data-node-id="4553:46649" data-name="Row">
            <div className="content-stretch flex flex-[1_0_0] gap-[var(--spacing-8,8px)] h-full items-center min-w-px relative" data-node-id="4553:46650" data-name="Table Cell">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="I4553:46650;15725:1404" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/neutral\/tag-neutral-bg,#f4f5f4)] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:46650;15725:1404;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/neutral\/tag-neutral-text,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:46650;15725:1404;5726:636">
                    O
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46650;15725:1407">
                Owen King
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[220px]" data-node-id="4553:46655" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="I4553:46655;3645:3722">
                ​
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[160px]" data-node-id="4553:46657" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="I4553:46657;3645:3722">
                ​
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[100px]" data-node-id="4553:46659" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46659;3645:3720">
                3
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[100px]" data-node-id="4553:46661" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46661;3645:3720">
                0
              </p>
            </div>
            <div className="content-stretch flex h-full items-center justify-end relative shrink-0" data-node-id="4553:46663" data-name="Table Cell">
              <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[28px]" data-node-id="I4553:46663;5507:859" data-name="IconButton">
                <div className="relative shrink-0 size-[15px]" data-node-id="I4553:46663;5507:859;5934:5864" data-name="ellipsis-horizontal">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                    <div className="absolute inset-[42.04%_7.96%]" data-node-id="I4553:46663;5507:859;5934:5864;13721:2301555" data-name="Vector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-col gap-[var(--spacing-0,0px)] items-start overflow-clip p-[var(--spacing-0,0px)] relative rounded-[var(--radius-12,12px)] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)] shrink-0 w-[1136px]" data-node-id="4553:46667" data-name="Reports">
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="4553:46668" data-name="Table">
          <div className="bg-[var(--backgrounds\/bg-subtle,#f8faf7)] content-stretch flex gap-[12px] h-[48px] items-center justify-center pl-[24px] pr-[64px] relative shrink-0 w-full" data-node-id="4553:46669" data-name="Table Header">
            <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-node-id="4553:46670" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46670;3645:3724">
                Report name
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[200px]" data-node-id="4553:46672" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46672;3645:3724">
                Member
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[160px]" data-node-id="4553:46674" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46674;3645:3724">
                Date range
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[140px]" data-node-id="4553:46676" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46676;3645:3724">
                Generated on
              </p>
            </div>
          </div>
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[12px] h-[48px] items-center justify-center px-[24px] relative shrink-0 w-full" data-node-id="4553:46679" data-name="Row">
            <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-node-id="4553:46680" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46680;3645:3720">
                Sprint velocity — Q2 week 5
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-8,8px)] h-full items-center relative shrink-0 w-[200px]" data-node-id="4553:46682" data-name="Table Cell">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="I4553:46682;15725:1404" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:46682;15725:1404;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:46682;15725:1404;5726:636">
                    P
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46682;15725:1407">
                Priya Rao
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[160px]" data-node-id="4553:46687" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46687;3645:3722">
                Apr 7 – May 7
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[140px]" data-node-id="4553:46689" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46689;3645:3722">
                May 7, 2026
              </p>
            </div>
            <div className="content-stretch flex h-full items-center justify-end relative shrink-0" data-node-id="4553:46691" data-name="Table Cell">
              <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[28px]" data-node-id="I4553:46691;5507:859" data-name="IconButton">
                <div className="relative shrink-0 size-[15px]" data-node-id="I4553:46691;5507:859;5934:5864" data-name="ellipsis-horizontal">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                    <div className="absolute inset-[42.04%_7.96%]" data-node-id="I4553:46691;5507:859;5934:5864;13721:2301555" data-name="Vector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[12px] h-[48px] items-center justify-center px-[24px] relative shrink-0 w-full" data-node-id="4553:46696" data-name="Row">
            <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-node-id="4553:46697" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46697;3645:3720">
                Task completion by assignee
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-8,8px)] h-full items-center relative shrink-0 w-[200px]" data-node-id="4553:46699" data-name="Table Cell">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="I4553:46699;15725:1404" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/blue\/tag-blue-bg,rgba(59,130,246,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:46699;15725:1404;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/blue\/tag-blue-text,#1e40af)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:46699;15725:1404;5726:636">
                    S
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46699;15725:1407">
                Sara Nelson
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[160px]" data-node-id="4553:46704" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46704;3645:3722">
                Apr 7 – May 7
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[140px]" data-node-id="4553:46706" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46706;3645:3722">
                May 7, 2026
              </p>
            </div>
            <div className="content-stretch flex h-full items-center justify-end relative shrink-0" data-node-id="4553:46708" data-name="Table Cell">
              <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[28px]" data-node-id="I4553:46708;5507:859" data-name="IconButton">
                <div className="relative shrink-0 size-[15px]" data-node-id="I4553:46708;5507:859;5934:5864" data-name="ellipsis-horizontal">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                    <div className="absolute inset-[42.04%_7.96%]" data-node-id="I4553:46708;5507:859;5934:5864;13721:2301555" data-name="Vector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[12px] h-[48px] items-center justify-center px-[24px] relative shrink-0 w-full" data-node-id="4553:46713" data-name="Row">
            <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-node-id="4553:46714" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46714;3645:3720">
                Overdue tasks — root cause analysis
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-8,8px)] h-full items-center relative shrink-0 w-[200px]" data-node-id="4553:46716" data-name="Table Cell">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="I4553:46716;15725:1404" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/neutral\/tag-neutral-bg,#f4f5f4)] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:46716;15725:1404;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/neutral\/tag-neutral-text,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:46716;15725:1404;5726:636">
                    O
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46716;15725:1407">
                Owen King
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[160px]" data-node-id="4553:46721" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46721;3645:3722">
                Apr 7 – May 7
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[140px]" data-node-id="4553:46723" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46723;3645:3722">
                May 6, 2026
              </p>
            </div>
            <div className="content-stretch flex h-full items-center justify-end relative shrink-0" data-node-id="4553:46725" data-name="Table Cell">
              <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[28px]" data-node-id="I4553:46725;5507:859" data-name="IconButton">
                <div className="relative shrink-0 size-[15px]" data-node-id="I4553:46725;5507:859;5934:5864" data-name="ellipsis-horizontal">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                    <div className="absolute inset-[42.04%_7.96%]" data-node-id="I4553:46725;5507:859;5934:5864;13721:2301555" data-name="Vector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[12px] h-[48px] items-center justify-center px-[24px] relative shrink-0 w-full" data-node-id="4553:46730" data-name="Row">
            <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-node-id="4553:46731" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46731;3645:3720">
                Team workload distribution
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-8,8px)] h-full items-center relative shrink-0 w-[200px]" data-node-id="4553:46733" data-name="Table Cell">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="I4553:46733;15725:1404" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:46733;15725:1404;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:46733;15725:1404;5726:636">
                    P
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46733;15725:1407">
                Priya Rao
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[160px]" data-node-id="4553:46738" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46738;3645:3722">
                Apr 7 – May 7
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[140px]" data-node-id="4553:46740" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46740;3645:3722">
                May 5, 2026
              </p>
            </div>
            <div className="content-stretch flex h-full items-center justify-end relative shrink-0" data-node-id="4553:46742" data-name="Table Cell">
              <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[28px]" data-node-id="I4553:46742;5507:859" data-name="IconButton">
                <div className="relative shrink-0 size-[15px]" data-node-id="I4553:46742;5507:859;5934:5864" data-name="ellipsis-horizontal">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                    <div className="absolute inset-[42.04%_7.96%]" data-node-id="I4553:46742;5507:859;5934:5864;13721:2301555" data-name="Vector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[12px] h-[48px] items-center justify-center px-[24px] relative shrink-0 w-full" data-node-id="4553:46747" data-name="Row">
            <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-node-id="4553:46748" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46748;3645:3720">
                Priority breakdown across sprints
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-8,8px)] h-full items-center relative shrink-0 w-[200px]" data-node-id="4553:46750" data-name="Table Cell">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="I4553:46750;15725:1404" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/purple\/tag-purple-bg,rgba(139,92,246,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:46750;15725:1404;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/purple\/tag-purple-text,#5b21b6)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:46750;15725:1404;5726:636">
                    M
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46750;15725:1407">
                Mark Tan
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[160px]" data-node-id="4553:46755" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46755;3645:3722">
                Apr 14 – May 7
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[140px]" data-node-id="4553:46757" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46757;3645:3722">
                May 4, 2026
              </p>
            </div>
            <div className="content-stretch flex h-full items-center justify-end relative shrink-0" data-node-id="4553:46759" data-name="Table Cell">
              <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[28px]" data-node-id="I4553:46759;5507:859" data-name="IconButton">
                <div className="relative shrink-0 size-[15px]" data-node-id="I4553:46759;5507:859;5934:5864" data-name="ellipsis-horizontal">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                    <div className="absolute inset-[42.04%_7.96%]" data-node-id="I4553:46759;5507:859;5934:5864;13721:2301555" data-name="Vector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[12px] h-[48px] items-center justify-center px-[24px] relative shrink-0 w-full" data-node-id="4553:46764" data-name="Row">
            <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-node-id="4553:46765" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46765;3645:3720">
                Burndown chart — milestone alpha
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-8,8px)] h-full items-center relative shrink-0 w-[200px]" data-node-id="4553:46767" data-name="Table Cell">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="I4553:46767;15725:1404" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/error\/tag-red-bg,rgba(244,63,94,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:46767;15725:1404;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/error\/tag-red-text,#9f1239)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:46767;15725:1404;5726:636">
                    B
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46767;15725:1407">
                Ben Walsh
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[160px]" data-node-id="4553:46772" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46772;3645:3722">
                Apr 7 – May 7
              </p>
            </div>
            <div className="content-stretch flex h-full items-center relative shrink-0 w-[140px]" data-node-id="4553:46774" data-name="Table Cell">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:46774;3645:3722">
                May 3, 2026
              </p>
            </div>
            <div className="content-stretch flex h-full items-center justify-end relative shrink-0" data-node-id="4553:46776" data-name="Table Cell">
              <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[28px]" data-node-id="I4553:46776;5507:859" data-name="IconButton">
                <div className="relative shrink-0 size-[15px]" data-node-id="I4553:46776;5507:859;5934:5864" data-name="ellipsis-horizontal">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                    <div className="absolute inset-[42.04%_7.96%]" data-node-id="I4553:46776;5507:859;5934:5864;13721:2301555" data-name="Vector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex gap-[var(--spacing-16,16px)] h-[800px] items-start relative shrink-0 w-[1136px]" data-node-id="4553:46780" data-name="Kanban Board">
        <div className="bg-[var(--backgrounds\/bg-kanban-column,rgba(0,0,0,0.04))] content-stretch flex flex-[1_0_0] flex-col gap-[var(--spacing-8,8px)] h-full items-start min-w-px p-[var(--spacing-8,8px)] relative rounded-[var(--radius-12,12px)]" data-node-id="4553:46781" data-name="To Do">
          <div className="content-stretch flex gap-[6px] items-center overflow-clip py-[4px] relative shrink-0 w-full" data-node-id="4553:46782" data-name="Header">
            <SquareGreySolid className="overflow-clip relative shrink-0 size-[15px]" />
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4553:46785">
              To Do
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4553:46786" data-name="_" />
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4553:46787">
              6
            </p>
          </div>
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4553:46788" data-name="Customer interviews">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:46789">
              Customer interviews
            </p>
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4553:46790">
              Schedule and run five user feedback sessions
            </p>
            <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4553:46791" data-name="Meta">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4553:46792" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/success\/tag-green-bg,rgba(16,185,129,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:46792;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/success\/tag-green-text,#065f46)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:46792;5726:636">
                    L
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4553:46795">
                Lara
              </p>
              <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4553:46796" data-name="_" />
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4553:46797">
                Jun 7
              </p>
              <div className="bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] border border-[var(--tag\/warning\/tag-orange-border,#fed7aa)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4553:46798" data-name="Badge">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:46798;6180:143">
                  Medium
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4553:46809" data-name="Migrate analytics SDK">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:46810">
              Migrate analytics SDK
            </p>
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4553:46811">
              Switch from legacy tracker to new events API
            </p>
            <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4553:46812" data-name="Meta">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4553:46813" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/purple\/tag-purple-bg,rgba(139,92,246,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:46813;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/purple\/tag-purple-text,#5b21b6)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:46813;5726:636">
                    M
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4553:46816">
                Mark
              </p>
              <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4553:46817" data-name="_" />
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4553:46818">
                Jun 5
              </p>
              <div className="bg-[var(--tag\/error\/tag-red-bg,rgba(244,63,94,0.12))] border border-[var(--tag\/error\/tag-red-border,#fecdd3)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4553:46819" data-name="Badge">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/error\/tag-red-text,#9f1239)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:46819;6180:145">
                  High
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4553:46830" data-name="Write API documentation">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:46831">
              Write API documentation
            </p>
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4553:46832">
              Document all public endpoints with examples
            </p>
            <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4553:46833" data-name="Meta">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4553:46834" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/neutral\/tag-neutral-bg,#f4f5f4)] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:46834;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/neutral\/tag-neutral-text,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:46834;5726:636">
                    O
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4553:46837">
                Owen
              </p>
              <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4553:46838" data-name="_" />
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4553:46839">
                Jun 15
              </p>
              <div className="bg-[var(--tag\/neutral\/tag-neutral-bg,#f4f5f4)] border border-[var(--tag\/neutral\/tag-neutral-border,#e5e7e4)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4553:46840" data-name="Badge">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/neutral\/tag-neutral-text,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:46840;6180:151">
                  Low
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4553:46851" data-name="User research interviews">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:46852">
              User research interviews
            </p>
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4553:46853">
              Recruit participants and prepare script
            </p>
            <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4553:46854" data-name="Meta">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4553:46855" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:46855;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:46855;5726:636">
                    P
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4553:46858">
                Priya
              </p>
              <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4553:46859" data-name="_" />
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-error,#e11d48)] whitespace-nowrap" data-node-id="4553:46860">
                May 28
              </p>
              <div className="bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] border border-[var(--tag\/warning\/tag-orange-border,#fed7aa)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4553:46861" data-name="Badge">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:46861;6180:143">
                  Medium
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4553:46872" data-name="Icon system audit">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:46873">
              Icon system audit
            </p>
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4553:46874">
              Catalog all icons and remove unused SVGs
            </p>
            <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4553:46875" data-name="Meta">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4553:46876" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/success\/tag-green-bg,rgba(16,185,129,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:46876;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/success\/tag-green-text,#065f46)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:46876;5726:636">
                    L
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4553:46879">
                Lara
              </p>
              <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4553:46880" data-name="_" />
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4553:46881">
                Jun 20
              </p>
              <div className="bg-[var(--tag\/neutral\/tag-neutral-bg,#f4f5f4)] border border-[var(--tag\/neutral\/tag-neutral-border,#e5e7e4)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4553:46882" data-name="Badge">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/neutral\/tag-neutral-text,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:46882;6180:151">
                  Low
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4553:46893" data-name="Accessibility pass">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:46894">
              Accessibility pass
            </p>
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4553:46895">
              Fix contrast ratios and add ARIA labels
            </p>
            <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4553:46896" data-name="Meta">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4553:46897" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/neutral\/tag-neutral-bg,#f4f5f4)] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:46897;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/neutral\/tag-neutral-text,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:46897;5726:636">
                    O
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4553:46900">
                Owen
              </p>
              <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4553:46901" data-name="_" />
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4553:46902">
                Jun 8
              </p>
              <div className="bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] border border-[var(--tag\/warning\/tag-orange-border,#fed7aa)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4553:46903" data-name="Badge">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:46903;6180:143">
                  Medium
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[var(--backgrounds\/bg-kanban-column,rgba(0,0,0,0.04))] content-stretch flex flex-[1_0_0] flex-col gap-[var(--spacing-8,8px)] h-full items-start min-w-px p-[var(--spacing-8,8px)] relative rounded-[var(--radius-12,12px)]" data-node-id="4553:46914" data-name="In Progress">
          <div className="content-stretch flex gap-[6px] items-center overflow-clip py-[4px] relative shrink-0 w-full" data-node-id="4553:46915" data-name="Header">
            <SquareBlueSolid className="overflow-clip relative shrink-0 size-[15px]" />
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4553:46918">
              In Progress
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4553:46919" data-name="_" />
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4553:46920">
              5
            </p>
          </div>
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4553:46921" data-name="Update onboarding flow">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:46922">
              Update onboarding flow
            </p>
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4553:46923">
              Revamp first-run experience for new users
            </p>
            <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4553:46924" data-name="Meta">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4553:46925" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/blue\/tag-blue-bg,rgba(59,130,246,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:46925;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/blue\/tag-blue-text,#1e40af)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:46925;5726:636">
                    S
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4553:46928">
                Sara
              </p>
              <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4553:46929" data-name="_" />
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-error,#e11d48)] whitespace-nowrap" data-node-id="4553:46930">
                May 25
              </p>
              <div className="bg-[var(--tag\/error\/tag-red-bg,rgba(244,63,94,0.12))] border border-[var(--tag\/error\/tag-red-border,#fecdd3)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4553:46931" data-name="Badge">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/error\/tag-red-text,#9f1239)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:46931;6180:145">
                  High
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4553:46942" data-name="Fix billing bug #482">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:46943">
              Fix billing bug #482
            </p>
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4553:46944">
              Null ref in payment callback causing failed charges
            </p>
            <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4553:46945" data-name="Meta">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4553:46946" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/error\/tag-red-bg,rgba(244,63,94,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:46946;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/error\/tag-red-text,#9f1239)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:46946;5726:636">
                    B
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4553:46949">
                Ben
              </p>
              <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4553:46950" data-name="_" />
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-error,#e11d48)] whitespace-nowrap" data-node-id="4553:46951">
                May 23
              </p>
              <div className="bg-[var(--tag\/purple\/tag-purple-bg,rgba(139,92,246,0.12))] border border-[var(--tag\/purple\/tag-purple-border,#ddd6fe)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4553:46952" data-name="Badge">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/purple\/tag-purple-text,#5b21b6)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:46952;6180:149">
                  Critical
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4553:46963" data-name="Redesign landing page">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:46964">
              Redesign landing page
            </p>
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4553:46965">
              New hero section and updated feature grid
            </p>
            <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4553:46966" data-name="Meta">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4553:46967" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/success\/tag-green-bg,rgba(16,185,129,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:46967;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/success\/tag-green-text,#065f46)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:46967;5726:636">
                    L
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4553:46970">
                Lara
              </p>
              <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4553:46971" data-name="_" />
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4553:46972">
                Jun 1
              </p>
              <div className="bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] border border-[var(--tag\/warning\/tag-orange-border,#fed7aa)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4553:46973" data-name="Badge">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:46973;6180:143">
                  Medium
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4553:46984" data-name="Setup CI/CD pipeline">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:46985">
              Setup CI/CD pipeline
            </p>
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4553:46986">
              Configure GitHub Actions for staging deploys
            </p>
            <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4553:46987" data-name="Meta">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4553:46988" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/purple\/tag-purple-bg,rgba(139,92,246,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:46988;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/purple\/tag-purple-text,#5b21b6)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:46988;5726:636">
                    M
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4553:46991">
                Mark
              </p>
              <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4553:46992" data-name="_" />
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4553:46993">
                Jun 12
              </p>
              <div className="bg-[var(--tag\/error\/tag-red-bg,rgba(244,63,94,0.12))] border border-[var(--tag\/error\/tag-red-border,#fecdd3)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4553:46994" data-name="Badge">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/error\/tag-red-text,#9f1239)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:46994;6180:145">
                  High
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4553:47005" data-name="Mobile nav refactor">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:47006">
              Mobile nav refactor
            </p>
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4553:47007">
              Replace drawer with bottom tab navigation
            </p>
            <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4553:47008" data-name="Meta">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4553:47009" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/blue\/tag-blue-bg,rgba(59,130,246,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:47009;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/blue\/tag-blue-text,#1e40af)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:47009;5726:636">
                    S
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4553:47012">
                Sara
              </p>
              <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4553:47013" data-name="_" />
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-error,#e11d48)] whitespace-nowrap" data-node-id="4553:47014">
                May 29
              </p>
              <div className="bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] border border-[var(--tag\/warning\/tag-orange-border,#fed7aa)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4553:47015" data-name="Badge">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:47015;6180:143">
                  Medium
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[var(--backgrounds\/bg-kanban-column,rgba(0,0,0,0.04))] content-stretch flex flex-[1_0_0] flex-col gap-[var(--spacing-8,8px)] h-full items-start min-w-px p-[var(--spacing-8,8px)] relative rounded-[var(--radius-12,12px)]" data-node-id="4553:47026" data-name="In Review">
          <div className="content-stretch flex gap-[6px] items-center overflow-clip py-[4px] relative shrink-0 w-full" data-node-id="4553:47027" data-name="Header">
            <SquareOrangeSolid className="overflow-clip relative shrink-0 size-[15px]" />
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4553:47030">
              In Review
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4553:47031" data-name="_" />
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4553:47032">
              4
            </p>
          </div>
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4553:47033" data-name="Q2 roadmap review">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:47034">
              Q2 roadmap review
            </p>
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4553:47035">
              Align team on priorities for next quarter
            </p>
            <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4553:47036" data-name="Meta">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4553:47037" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:47037;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:47037;5726:636">
                    P
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4553:47040">
                Priya
              </p>
              <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4553:47041" data-name="_" />
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-error,#e11d48)] whitespace-nowrap" data-node-id="4553:47042">
                May 30
              </p>
              <div className="bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] border border-[var(--tag\/warning\/tag-orange-border,#fed7aa)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4553:47043" data-name="Badge">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:47043;6180:143">
                  Medium
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4553:47054" data-name="Design QA — Settings">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:47055">
              Design QA — Settings
            </p>
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4553:47056">
              Verify settings page matches latest design specs
            </p>
            <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4553:47057" data-name="Meta">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4553:47058" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/blue\/tag-blue-bg,rgba(59,130,246,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:47058;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/blue\/tag-blue-text,#1e40af)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:47058;5726:636">
                    S
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4553:47061">
                Sara
              </p>
              <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4553:47062" data-name="_" />
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4553:47063">
                Jun 3
              </p>
              <div className="bg-[var(--tag\/error\/tag-red-bg,rgba(244,63,94,0.12))] border border-[var(--tag\/error\/tag-red-border,#fecdd3)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4553:47064" data-name="Badge">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/error\/tag-red-text,#9f1239)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:47064;6180:145">
                  High
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4553:47075" data-name="Performance audit">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:47076">
              Performance audit
            </p>
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4553:47077">
              Profile render times and bundle size
            </p>
            <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4553:47078" data-name="Meta">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4553:47079" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/neutral\/tag-neutral-bg,#f4f5f4)] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:47079;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/neutral\/tag-neutral-text,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:47079;5726:636">
                    O
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4553:47082">
                Owen
              </p>
              <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4553:47083" data-name="_" />
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4553:47084">
                Jun 10
              </p>
              <div className="bg-[var(--tag\/error\/tag-red-bg,rgba(244,63,94,0.12))] border border-[var(--tag\/error\/tag-red-border,#fecdd3)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4553:47085" data-name="Badge">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/error\/tag-red-text,#9f1239)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:47085;6180:145">
                  High
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4553:47096" data-name="DB schema migration">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:47097">
              DB schema migration
            </p>
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4553:47098">
              Add indexes and normalize user preferences table
            </p>
            <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4553:47099" data-name="Meta">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4553:47100" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/error\/tag-red-bg,rgba(244,63,94,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:47100;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/error\/tag-red-text,#9f1239)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:47100;5726:636">
                    B
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4553:47103">
                Ben
              </p>
              <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4553:47104" data-name="_" />
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4553:47105">
                Jun 4
              </p>
              <div className="bg-[var(--tag\/purple\/tag-purple-bg,rgba(139,92,246,0.12))] border border-[var(--tag\/purple\/tag-purple-border,#ddd6fe)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4553:47106" data-name="Badge">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/purple\/tag-purple-text,#5b21b6)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:47106;6180:149">
                  Critical
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[var(--backgrounds\/bg-kanban-column,rgba(0,0,0,0.04))] content-stretch flex flex-[1_0_0] flex-col gap-[var(--spacing-8,8px)] h-full items-start min-w-px p-[var(--spacing-8,8px)] relative rounded-[var(--radius-12,12px)]" data-node-id="4553:47117" data-name="Done">
          <div className="content-stretch flex gap-[6px] items-center overflow-clip py-[4px] relative shrink-0 w-full" data-node-id="4553:47118" data-name="Header">
            <SquareGreenSolid className="overflow-clip relative shrink-0 size-[15px]" />
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4553:47121">
              Done
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4553:47122" data-name="_" />
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4553:47123">
              3
            </p>
          </div>
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4553:47124" data-name="Fix login bug">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:47125">
              Fix login bug
            </p>
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4553:47126">
              Session token not refreshing on mobile browsers
            </p>
            <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4553:47127" data-name="Meta">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4553:47128" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/error\/tag-red-bg,rgba(244,63,94,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:47128;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/error\/tag-red-text,#9f1239)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:47128;5726:636">
                    B
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4553:47131">
                Ben
              </p>
              <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4553:47132" data-name="_" />
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4553:47133">
                May 21
              </p>
              <div className="bg-[var(--tag\/purple\/tag-purple-bg,rgba(139,92,246,0.12))] border border-[var(--tag\/purple\/tag-purple-border,#ddd6fe)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4553:47134" data-name="Badge">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/purple\/tag-purple-text,#5b21b6)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:47134;6180:149">
                  Critical
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4553:47145" data-name="Auth token refresh">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:47146">
              Auth token refresh
            </p>
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4553:47147">
              Implement silent refresh with retry logic
            </p>
            <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4553:47148" data-name="Meta">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4553:47149" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/purple\/tag-purple-bg,rgba(139,92,246,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:47149;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/purple\/tag-purple-text,#5b21b6)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:47149;5726:636">
                    M
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4553:47152">
                Mark
              </p>
              <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4553:47153" data-name="_" />
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4553:47154">
                May 26
              </p>
              <div className="bg-[var(--tag\/purple\/tag-purple-bg,rgba(139,92,246,0.12))] border border-[var(--tag\/purple\/tag-purple-border,#ddd6fe)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4553:47155" data-name="Badge">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/purple\/tag-purple-text,#5b21b6)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:47155;6180:149">
                  Critical
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch drop-shadow-[0px_0px_0px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04)] flex flex-col gap-[var(--spacing-12,12px)] items-start p-[var(--spacing-12,12px)] relative rounded-[var(--radius-8,8px)] shrink-0 w-full" data-node-id="4553:47166" data-name="Sprint retrospective">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:47167">
              Sprint retrospective
            </p>
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[13px] text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="4553:47168">
              Review velocity and action items from last sprint
            </p>
            <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="4553:47169" data-name="Meta">
              <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4553:47170" data-name="Avatar">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:47170;5726:635" data-name="Background">
                  <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:47170;5726:636">
                    P
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4553:47173">
                Priya
              </p>
              <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="4553:47174" data-name="_" />
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--foregrounds\/fg-subtle,#555b52)] whitespace-nowrap" data-node-id="4553:47175">
                May 26
              </p>
              <div className="bg-[var(--tag\/neutral\/tag-neutral-bg,#f4f5f4)] border border-[var(--tag\/neutral\/tag-neutral-border,#e5e7e4)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4553:47176" data-name="Badge">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/neutral\/tag-neutral-text,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:47176;6180:151">
                  Low
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-[960px]" data-node-id="4553:47187" data-name="Settings Content">
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-col items-start overflow-clip py-[8px] relative rounded-[8px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)] shrink-0 w-[240px]" data-node-id="4553:47188" data-name="Settings Nav">
          <div className="bg-[var(--backgrounds\/bg-subtle,#f8faf7)] border-[var(--foregrounds\/fg-base,#0a0b09)] border-l-2 border-solid content-stretch flex items-center px-[16px] py-[10px] relative shrink-0 w-full" data-node-id="4553:47189" data-name="Profile">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:47190">
              Profile
            </p>
          </div>
          <div className="content-stretch flex items-center px-[16px] py-[10px] relative shrink-0 w-full" data-node-id="4553:47191" data-name="Notifications">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:47192">
              Notifications
            </p>
          </div>
          <div className="content-stretch flex items-center px-[16px] py-[10px] relative shrink-0 w-full" data-node-id="4553:47193" data-name="Security">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:47194">
              Security
            </p>
          </div>
          <div className="content-stretch flex items-center px-[16px] py-[10px] relative shrink-0 w-full" data-node-id="4553:47195" data-name="Billing">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:47196">
              Billing
            </p>
          </div>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative rounded-[8px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)]" data-node-id="4553:47197" data-name="Content Card">
          <div className="content-stretch flex flex-col items-start px-[24px] py-[12px] relative shrink-0 w-full" data-node-id="4553:47198" data-name="Card Header">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/header,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[14px] text-[color:var(--foregrounds\/fg-base,#0a0b09)] whitespace-nowrap" data-node-id="4553:47199">
              Profile
            </p>
          </div>
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
          <div className="content-stretch flex flex-col gap-[20px] items-start p-[24px] relative shrink-0 w-full" data-node-id="4553:47201" data-name="Card Body">
            <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-node-id="4553:47202" data-name="Avatar Row">
              <Avatar className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[48px]" content="Image" size="Xlarge (48)" />
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[20px] relative shrink-0 w-[100px] whitespace-nowrap" data-node-id="4553:47205" data-name="Avatar Info">
                <p className="font-[family-name:var(--font\/family\/header,'Geist:Medium')] font-[var(--font\/weight\/500,500)] relative shrink-0 text-[14px] text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4553:47206">
                  Ludvig Rask
                </p>
                <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)]" data-node-id="4553:47207">
                  Click to change photo
                </p>
              </div>
            </div>
            <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-node-id="4553:47208" data-name="Row 1">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative" data-node-id="4553:47209" data-name="Full name Field">
                <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="4553:47210" data-name="Full name">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47210;3503:3030">
                    <p className="leading-[20px]">Full name</p>
                  </div>
                </div>
                <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[var(--spacing-4,0px)] h-[32px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full" data-node-id="4553:47215" data-name="Text Input">
                  <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-px relative text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)]" data-node-id="I4553:47215;4093:7457">
                    Ludvig Rask
                  </p>
                </div>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative" data-node-id="4553:47218" data-name="Email Field">
                <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="4553:47219" data-name="Email">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47219;3503:3030">
                    <p className="leading-[20px]">Email</p>
                  </div>
                </div>
                <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[var(--spacing-4,0px)] h-[32px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full" data-node-id="4553:47224" data-name="Text Input">
                  <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-px relative text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)]" data-node-id="I4553:47224;4093:7457">
                    ludvig@taskflow.io
                  </p>
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-node-id="4553:47227" data-name="Row 2">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative" data-node-id="4553:47228" data-name="Job title Field">
                <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="4553:47229" data-name="Job title">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47229;3503:3030">
                    <p className="leading-[20px]">Job title</p>
                  </div>
                </div>
                <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[var(--spacing-4,0px)] h-[32px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full" data-node-id="4553:47234" data-name="Text Input">
                  <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-px relative text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)]" data-node-id="I4553:47234;4093:7457">
                    Head of Product
                  </p>
                </div>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative" data-node-id="4553:47237" data-name="Phone Field">
                <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="4553:47238" data-name="Phone">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47238;3503:3030">
                    <p className="leading-[20px]">Phone</p>
                  </div>
                </div>
                <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[var(--spacing-4,0px)] h-[32px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full" data-node-id="4553:47243" data-name="Text Input">
                  <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-px relative text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)]" data-node-id="I4553:47243;4093:7457">
                    +1 (555) 000-0000
                  </p>
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-node-id="4553:47246" data-name="Row 3">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative" data-node-id="4553:47247" data-name="Location Field">
                <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="4553:47248" data-name="Location">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47248;3503:3030">
                    <p className="leading-[20px]">Location</p>
                  </div>
                </div>
                <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[var(--spacing-4,0px)] h-[32px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full" data-node-id="4553:47253" data-name="Text Input">
                  <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-px relative text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)]" data-node-id="I4553:47253;4093:7457">
                    San Francisco, CA
                  </p>
                </div>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative" data-node-id="4553:47256" data-name="Time zone Field">
                <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="4553:47257" data-name="Time zone">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47257;3503:3030">
                    <p className="leading-[20px]">Time zone</p>
                  </div>
                </div>
                <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[var(--spacing-4,0px)] h-[32px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full" data-node-id="4553:47262" data-name="Text Input">
                  <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] min-w-px relative text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)]" data-node-id="I4553:47262;4093:7457">
                    Pacific Time (UTC-8)
                  </p>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-node-id="4553:47265" data-name="Bio Field">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="4553:47266" data-name="Bio">
                <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47266;3503:3030">
                  <p className="leading-[20px]">Bio</p>
                </div>
              </div>
              <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex flex-col gap-[var(--spacing-6,6px)] items-end justify-end overflow-clip px-[var(--spacing-8,8px)] py-[var(--spacing-6,6px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full" data-node-id="4553:47271" data-name="Text Area">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[1.5] min-w-full relative shrink-0 text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-[length:var(--font\/size\/small,13px)] w-[min-content]" data-node-id="I4553:47271;3609:3542">
                  Placeholder
                </p>
                <div className="relative shrink-0 size-[15px]" data-node-id="I4553:47271;3609:3543" data-name="resize">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+1px)] size-[10.864px] top-[calc(50%+1px)]" data-node-id="I4553:47271;3609:3543;13721:2301347" data-name="Vector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector7} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex items-start justify-end relative shrink-0 w-full" data-node-id="4553:47275" data-name="Actions">
              <div className="content-stretch flex gap-[var(--spacing-6,6px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.4),0px_0px_0px_1px_#18181b] shrink-0" data-node-id="4553:47276" data-name="Save changes">
                <div aria-hidden className="absolute bg-[var(--buttons\/button-inverted,#282a27)] inset-0 pointer-events-none rounded-[var(--radius-6,6px)]" />
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--contrast\/contrast-fg-primary,rgba(255,255,255,0.88))] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47276;5934:2712">
                  Save changes
                </p>
                <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0.75px_0px_0px_rgba(255,255,255,0.2)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-[960px]" data-node-id="4553:47282" data-name="Settings Content">
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-col items-start overflow-clip py-[8px] relative rounded-[8px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)] shrink-0 w-[240px]" data-node-id="4553:47283" data-name="Settings Nav">
          <div className="content-stretch flex items-center px-[16px] py-[10px] relative shrink-0 w-full" data-node-id="4553:47284" data-name="Profile">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:47285">
              Profile
            </p>
          </div>
          <div className="bg-[var(--backgrounds\/bg-subtle,#f8faf7)] border-[var(--foregrounds\/fg-base,#0a0b09)] border-l-2 border-solid content-stretch flex items-center px-[16px] py-[10px] relative shrink-0 w-full" data-node-id="4553:47286" data-name="Notifications">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:47287">
              Notifications
            </p>
          </div>
          <div className="content-stretch flex items-center px-[16px] py-[10px] relative shrink-0 w-full" data-node-id="4553:47288" data-name="Security">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:47289">
              Security
            </p>
          </div>
          <div className="content-stretch flex items-center px-[16px] py-[10px] relative shrink-0 w-full" data-node-id="4553:47290" data-name="Billing">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:47291">
              Billing
            </p>
          </div>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative rounded-[8px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)]" data-node-id="4553:47292" data-name="Content Card">
          <div className="content-stretch flex flex-col items-start px-[24px] py-[12px] relative shrink-0 w-full" data-node-id="4553:47293" data-name="Card Header">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/header,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[14px] text-[color:var(--foregrounds\/fg-base,#0a0b09)] whitespace-nowrap" data-node-id="4553:47294">
              Notifications
            </p>
          </div>
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
          <div className="content-stretch flex flex-col gap-[20px] items-start p-[24px] relative shrink-0 w-full" data-node-id="4553:47296" data-name="Card Body">
            <div className="content-stretch flex flex-col gap-[var(--spacing-12,12px)] items-start relative shrink-0 w-full" data-node-id="4553:47297" data-name="stack">
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4553:47298" data-name="Email notifications">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[20px] relative shrink-0 text-[length:var(--font\/size\/small,13px)] w-[100px] whitespace-nowrap" data-node-id="4553:47299" data-name="Info">
                  <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4553:47300">
                    Email notifications
                  </p>
                  <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)]" data-node-id="4553:47301">
                    Receive email for task assignments
                  </p>
                </div>
                <Switch checked className="h-[20px] relative shrink-0 w-[32px]" />
              </div>
              <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4553:47308" data-name="Push notifications">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[20px] relative shrink-0 text-[length:var(--font\/size\/small,13px)] w-[100px] whitespace-nowrap" data-node-id="4553:47309" data-name="Info">
                  <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4553:47310">
                    Push notifications
                  </p>
                  <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)]" data-node-id="4553:47311">
                    Get push alerts for due dates
                  </p>
                </div>
                <Switch checked className="h-[20px] relative shrink-0 w-[32px]" />
              </div>
              <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4553:47318" data-name="Weekly digest">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[20px] relative shrink-0 text-[length:var(--font\/size\/small,13px)] w-[100px] whitespace-nowrap" data-node-id="4553:47319" data-name="Info">
                  <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4553:47320">
                    Weekly digest
                  </p>
                  <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)]" data-node-id="4553:47321">{`Summary of your team's progress`}</p>
                </div>
                <Switch className="h-[20px] relative shrink-0 w-[32px]" />
              </div>
              <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4553:47326" data-name="Mentions">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[20px] relative shrink-0 text-[length:var(--font\/size\/small,13px)] w-[100px] whitespace-nowrap" data-node-id="4553:47327" data-name="Info">
                  <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4553:47328">
                    Mentions
                  </p>
                  <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)]" data-node-id="4553:47329">
                    Notify when someone mentions you
                  </p>
                </div>
                <Switch checked className="h-[20px] relative shrink-0 w-[32px]" />
              </div>
              <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4553:47336" data-name="Overdue alerts">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[20px] relative shrink-0 text-[length:var(--font\/size\/small,13px)] w-[100px] whitespace-nowrap" data-node-id="4553:47337" data-name="Info">
                  <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4553:47338">
                    Overdue alerts
                  </p>
                  <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)]" data-node-id="4553:47339">
                    Alert when tasks pass their due date
                  </p>
                </div>
                <Switch checked className="h-[20px] relative shrink-0 w-[32px]" />
              </div>
            </div>
            <div className="content-stretch flex items-start justify-end pt-[8px] relative shrink-0 w-full" data-node-id="4553:47345" data-name="Actions">
              <div className="content-stretch flex gap-[var(--spacing-6,6px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.4),0px_0px_0px_1px_#18181b] shrink-0" data-node-id="4553:47346" data-name="Save changes">
                <div aria-hidden className="absolute bg-[var(--buttons\/button-inverted,#282a27)] inset-0 pointer-events-none rounded-[var(--radius-6,6px)]" />
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--contrast\/contrast-fg-primary,rgba(255,255,255,0.88))] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47346;5934:2712">
                  Save changes
                </p>
                <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0.75px_0px_0px_rgba(255,255,255,0.2)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-[960px]" data-node-id="4553:47352" data-name="Settings Content">
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-col items-start overflow-clip py-[8px] relative rounded-[8px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)] shrink-0 w-[240px]" data-node-id="4553:47353" data-name="Settings Nav">
          <div className="content-stretch flex items-center px-[16px] py-[10px] relative shrink-0 w-full" data-node-id="4553:47354" data-name="Profile">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:47355">
              Profile
            </p>
          </div>
          <div className="content-stretch flex items-center px-[16px] py-[10px] relative shrink-0 w-full" data-node-id="4553:47356" data-name="Notifications">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:47357">
              Notifications
            </p>
          </div>
          <div className="bg-[var(--backgrounds\/bg-subtle,#f8faf7)] border-[var(--foregrounds\/fg-base,#0a0b09)] border-l-2 border-solid content-stretch flex items-center px-[16px] py-[10px] relative shrink-0 w-full" data-node-id="4553:47358" data-name="Security">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:47359">
              Security
            </p>
          </div>
          <div className="content-stretch flex items-center px-[16px] py-[10px] relative shrink-0 w-full" data-node-id="4553:47360" data-name="Billing">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:47361">
              Billing
            </p>
          </div>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative rounded-[8px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)]" data-node-id="4553:47362" data-name="Content Card">
          <div className="content-stretch flex flex-col items-start px-[24px] py-[12px] relative shrink-0 w-full" data-node-id="4553:47363" data-name="Card Header">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/header,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[14px] text-[color:var(--foregrounds\/fg-base,#0a0b09)] whitespace-nowrap" data-node-id="4553:47364">
              Security
            </p>
          </div>
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
          <div className="content-stretch flex flex-col gap-[20px] items-start p-[24px] relative shrink-0 w-full" data-node-id="4553:47366" data-name="Card Body">
            <div className="content-stretch flex flex-col gap-[var(--spacing-12,12px)] items-start relative shrink-0 w-full" data-node-id="4553:47367" data-name="stack">
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4553:47368" data-name="Two-factor authentication">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[20px] relative shrink-0 text-[length:var(--font\/size\/small,13px)] w-[100px] whitespace-nowrap" data-node-id="4553:47369" data-name="Info">
                  <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4553:47370">
                    Two-factor authentication
                  </p>
                  <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)]" data-node-id="4553:47371">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch className="h-[20px] relative shrink-0 w-[32px]" />
              </div>
              <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4553:47376" data-name="Login alerts">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[20px] relative shrink-0 text-[length:var(--font\/size\/small,13px)] w-[100px] whitespace-nowrap" data-node-id="4553:47377" data-name="Info">
                  <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4553:47378">
                    Login alerts
                  </p>
                  <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)]" data-node-id="4553:47379">
                    Get notified when a new device signs in
                  </p>
                </div>
                <Switch checked className="h-[20px] relative shrink-0 w-[32px]" />
              </div>
              <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4553:47386" data-name="Session timeout">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[20px] relative shrink-0 text-[length:var(--font\/size\/small,13px)] w-[100px] whitespace-nowrap" data-node-id="4553:47387" data-name="Info">
                  <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4553:47388">
                    Session timeout
                  </p>
                  <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)]" data-node-id="4553:47389">
                    Automatically sign out after 30 minutes of inactivity
                  </p>
                </div>
                <Switch className="h-[20px] relative shrink-0 w-[32px]" />
              </div>
              <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4553:47394" data-name="Require password change">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[20px] relative shrink-0 text-[length:var(--font\/size\/small,13px)] w-[100px] whitespace-nowrap" data-node-id="4553:47395" data-name="Info">
                  <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4553:47396">
                    Require password change
                  </p>
                  <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)]" data-node-id="4553:47397">
                    Force password update every 90 days
                  </p>
                </div>
                <Switch checked className="h-[20px] relative shrink-0 w-[32px]" />
              </div>
              <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4553:47404" data-name="SSO enforcement">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[20px] relative shrink-0 text-[length:var(--font\/size\/small,13px)] w-[100px] whitespace-nowrap" data-node-id="4553:47405" data-name="Info">
                  <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4553:47406">
                    SSO enforcement
                  </p>
                  <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)]" data-node-id="4553:47407">
                    Require single sign-on for all team members
                  </p>
                </div>
                <Switch className="h-[20px] relative shrink-0 w-[32px]" />
              </div>
            </div>
            <div className="content-stretch flex items-start justify-end pt-[8px] relative shrink-0 w-full" data-node-id="4553:47411" data-name="Actions">
              <div className="content-stretch flex gap-[var(--spacing-6,6px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.4),0px_0px_0px_1px_#18181b] shrink-0" data-node-id="4553:47412" data-name="Save changes">
                <div aria-hidden className="absolute bg-[var(--buttons\/button-inverted,#282a27)] inset-0 pointer-events-none rounded-[var(--radius-6,6px)]" />
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--contrast\/contrast-fg-primary,rgba(255,255,255,0.88))] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47412;5934:2712">
                  Save changes
                </p>
                <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0.75px_0px_0px_rgba(255,255,255,0.2)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-[960px]" data-node-id="4553:47418" data-name="Settings Content">
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-col items-start overflow-clip py-[8px] relative rounded-[8px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)] shrink-0 w-[240px]" data-node-id="4553:47419" data-name="Settings Nav">
          <div className="content-stretch flex items-center px-[16px] py-[10px] relative shrink-0 w-full" data-node-id="4553:47420" data-name="Profile">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:47421">
              Profile
            </p>
          </div>
          <div className="content-stretch flex items-center px-[16px] py-[10px] relative shrink-0 w-full" data-node-id="4553:47422" data-name="Notifications">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:47423">
              Notifications
            </p>
          </div>
          <div className="content-stretch flex items-center px-[16px] py-[10px] relative shrink-0 w-full" data-node-id="4553:47424" data-name="Security">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:47425">
              Security
            </p>
          </div>
          <div className="bg-[var(--backgrounds\/bg-subtle,#f8faf7)] border-[var(--foregrounds\/fg-base,#0a0b09)] border-l-2 border-solid content-stretch flex items-center px-[16px] py-[10px] relative shrink-0 w-full" data-node-id="4553:47426" data-name="Billing">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:47427">
              Billing
            </p>
          </div>
        </div>
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative rounded-[8px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)]" data-node-id="4553:47428" data-name="Content Card">
          <div className="content-stretch flex flex-col items-start px-[24px] py-[12px] relative shrink-0 w-full" data-node-id="4553:47429" data-name="Card Header">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/header,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[14px] text-[color:var(--foregrounds\/fg-base,#0a0b09)] whitespace-nowrap" data-node-id="4553:47430">
              Billing
            </p>
          </div>
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
          <div className="content-stretch flex flex-col gap-[20px] items-start p-[24px] relative shrink-0 w-full" data-node-id="4553:47432" data-name="Card Body">
            <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-col gap-[4px] items-start overflow-clip px-[24px] py-[20px] relative rounded-[8px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)] shrink-0 w-full" data-node-id="4553:47433" data-name="Plan Card">
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4553:47434" data-name="Plan Header">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:47435">
                  Pro plan
                </p>
                <div className="bg-[var(--buttons\/button-neutral,white)] content-stretch flex gap-[var(--spacing-6,6px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0" data-node-id="4553:47436" data-name="Change plan">
                  <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47436;5934:2744">
                    Change plan
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/header,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[28px] relative shrink-0 text-[18px] text-[color:var(--foregrounds\/fg-base,#0a0b09)] whitespace-nowrap" data-node-id="4553:47447">
                $12/month
              </p>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:47448">
                Renews on Apr 15, 2026
              </p>
            </div>
            <div className="content-stretch flex items-center justify-between py-[8px] relative shrink-0 w-full" data-node-id="4553:47449" data-name="Payment">
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[20px] relative shrink-0 text-[length:var(--font\/size\/small,13px)] w-[100px] whitespace-nowrap" data-node-id="4553:47450" data-name="Info">
                <p className="font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4553:47451">
                  Payment method
                </p>
                <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)]" data-node-id="4553:47452">
                  Visa ending in 4242
                </p>
              </div>
              <div className="bg-[var(--buttons\/button-neutral,white)] content-stretch flex gap-[var(--spacing-6,6px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0" data-node-id="4553:47453" data-name="Update">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47453;5934:2744">
                  Update
                </p>
              </div>
            </div>
            <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-col items-start overflow-clip relative rounded-[12px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)] shrink-0 w-full" data-node-id="4553:47464" data-name="Billing history">
              <div className="content-stretch flex items-start pb-[16px] pt-[24px] px-[24px] relative shrink-0 w-full" data-node-id="4553:47465" data-name="Title Wrapper">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4553:47466">
                  Billing history
                </p>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="4553:47467" data-name="Table">
                <div className="bg-[var(--backgrounds\/bg-subtle,#f8faf7)] content-stretch flex gap-[12px] h-[48px] items-center px-[24px] relative shrink-0 w-full" data-node-id="4553:47468" data-name="Table Header">
                  <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-node-id="4553:47469" data-name="Table Cell">
                    <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47469;3645:3724">
                      Date
                    </p>
                  </div>
                  <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-node-id="4553:47471" data-name="Table Cell">
                    <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47471;3645:3724">
                      Description
                    </p>
                  </div>
                  <div className="content-stretch flex h-full items-center relative shrink-0 w-[120px]" data-node-id="4553:47473" data-name="Table Cell">
                    <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47473;3645:3724">
                      Amount
                    </p>
                  </div>
                </div>
                <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
                <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[12px] h-[48px] items-center px-[24px] relative shrink-0 w-full" data-node-id="4553:47476" data-name="Pro Plan — Monthly">
                  <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-node-id="4553:47477" data-name="Table Cell">
                    <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47477;3645:3722">
                      Mar 1, 2026
                    </p>
                  </div>
                  <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-node-id="4553:47479" data-name="Table Cell">
                    <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47479;3645:3720">
                      Pro Plan — Monthly
                    </p>
                  </div>
                  <div className="content-stretch flex h-full items-center relative shrink-0 w-[120px]" data-node-id="4553:47481" data-name="Table Cell">
                    <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47481;3645:3722">
                      $12.00
                    </p>
                  </div>
                </div>
                <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
                <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[12px] h-[48px] items-center px-[24px] relative shrink-0 w-full" data-node-id="4553:47484" data-name="Pro Plan — Monthly">
                  <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-node-id="4553:47485" data-name="Table Cell">
                    <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47485;3645:3722">
                      Feb 1, 2026
                    </p>
                  </div>
                  <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-node-id="4553:47487" data-name="Table Cell">
                    <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47487;3645:3720">
                      Pro Plan — Monthly
                    </p>
                  </div>
                  <div className="content-stretch flex h-full items-center relative shrink-0 w-[120px]" data-node-id="4553:47489" data-name="Table Cell">
                    <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47489;3645:3722">
                      $12.00
                    </p>
                  </div>
                </div>
                <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
                <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[12px] h-[48px] items-center px-[24px] relative shrink-0 w-full" data-node-id="4553:47492" data-name="Pro Plan — Monthly">
                  <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-node-id="4553:47493" data-name="Table Cell">
                    <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47493;3645:3722">
                      Jan 1, 2026
                    </p>
                  </div>
                  <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-node-id="4553:47495" data-name="Table Cell">
                    <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47495;3645:3720">
                      Pro Plan — Monthly
                    </p>
                  </div>
                  <div className="content-stretch flex h-full items-center relative shrink-0 w-[120px]" data-node-id="4553:47497" data-name="Table Cell">
                    <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47497;3645:3722">
                      $12.00
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-col items-start overflow-clip relative rounded-[12px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)] shrink-0 w-[480px]" data-node-id="4553:47499" data-name="Create Task Modal">
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="4553:47500" data-name="header">
          <div className="content-stretch flex items-center justify-between px-[24px] py-[8px] relative shrink-0 w-full" data-node-id="4553:47501" data-name="title + button">
            <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/header,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] min-w-px relative text-[14px] text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4553:47502">
              Create new task
            </p>
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="4553:47503" data-name="buttons">
              <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] border border-[var(--borders\/border-base,#e5e7e4)] border-solid content-stretch flex flex-col h-[16px] items-center justify-center overflow-clip px-[var(--spacing-4,4px)] relative rounded-[var(--radius-4,4px)] shrink-0" data-node-id="4553:47504" data-name="Kbd">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:47504;4737:1537">
                  Esc
                </p>
              </div>
              <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[28px]" data-node-id="4553:47507" data-name="Close">
                <div className="relative shrink-0 size-[15px]" data-node-id="I4553:47507;5934:5924" data-name="x-mark">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[9px] top-1/2" data-node-id="I4553:47507;5934:5924;13721:2301251" data-name="Vector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector8} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
        </div>
        <div className="content-stretch flex flex-col gap-[20px] items-start p-[24px] relative shrink-0 w-full" data-node-id="4553:47512" data-name="Content">
          <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-node-id="4553:47513" data-name="Priority + Status">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative" data-node-id="4553:47514" data-name="Priority Field">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="4553:47515" data-name="Priority">
                <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47515;3503:3030">
                  <p className="leading-[20px]">Priority</p>
                </div>
              </div>
              <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[8px] py-[6px] relative rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full" data-node-id="4553:47520" data-name="Select">
                <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] h-full leading-[20px] min-w-px relative text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-[length:var(--font\/size\/small,13px)]" data-node-id="I4553:47520;5946:2508">
                  Select
                </p>
                <div className="relative shrink-0 size-[15px]" data-node-id="I4553:47520;5946:2509" data-name="triangles-mini">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[13.5px] left-1/2 top-1/2 w-[7px]" data-node-id="I4553:47520;5946:2509;13721:2301545" data-name="Vector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector9} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative" data-node-id="4553:47524" data-name="Status Field">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="4553:47525" data-name="Status">
                <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47525;3503:3030">
                  <p className="leading-[20px]">Status</p>
                </div>
              </div>
              <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[8px] py-[6px] relative rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full" data-node-id="4553:47530" data-name="Select">
                <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] h-full leading-[20px] min-w-px relative text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-[length:var(--font\/size\/small,13px)]" data-node-id="I4553:47530;5946:2508">
                  Select
                </p>
                <div className="relative shrink-0 size-[15px]" data-node-id="I4553:47530;5946:2509" data-name="triangles-mini">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[13.5px] left-1/2 top-1/2 w-[7px]" data-node-id="I4553:47530;5946:2509;13721:2301545" data-name="Vector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector9} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-node-id="4553:47534" data-name="Assignee + Due date">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative" data-node-id="4553:47535" data-name="Assignee Field">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="4553:47536" data-name="Assignee">
                <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47536;3503:3030">
                  <p className="leading-[20px]">Assignee</p>
                </div>
              </div>
              <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[8px] py-[6px] relative rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full" data-node-id="4553:47541" data-name="Select">
                <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] h-full leading-[20px] min-w-px relative text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-[length:var(--font\/size\/small,13px)]" data-node-id="I4553:47541;5946:2508">
                  Select
                </p>
                <div className="relative shrink-0 size-[15px]" data-node-id="I4553:47541;5946:2509" data-name="triangles-mini">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[13.5px] left-1/2 top-1/2 w-[7px]" data-node-id="I4553:47541;5946:2509;13721:2301545" data-name="Vector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector9} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative" data-node-id="4553:47545" data-name="Due date Field">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="4553:47546" data-name="Due date">
                <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47546;3503:3030">
                  <p className="leading-[20px]">Due date</p>
                </div>
              </div>
              <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[8px] py-[6px] relative rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full" data-node-id="4553:47551" data-name="Select">
                <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] h-full leading-[20px] min-w-px relative text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-[length:var(--font\/size\/small,13px)]" data-node-id="I4553:47551;5946:2508">
                  Select
                </p>
                <div className="relative shrink-0 size-[15px]" data-node-id="I4553:47551;5946:2509" data-name="triangles-mini">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[13.5px] left-1/2 top-1/2 w-[7px]" data-node-id="I4553:47551;5946:2509;13721:2301545" data-name="Vector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector9} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-node-id="4553:47555" data-name="Task name Field">
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="4553:47556" data-name="Task name">
              <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47556;3503:3030">
                <p className="leading-[20px]">Task name</p>
              </div>
            </div>
            <TextInput className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[var(--spacing-4,0px)] h-[32px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full" placeholder="Enter task name..." />
          </div>
          <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-node-id="4553:47563" data-name="Description Field">
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="4553:47564" data-name="Description">
              <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47564;3503:3030">
                <p className="leading-[20px]">Description</p>
              </div>
            </div>
            <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex flex-col gap-[var(--spacing-6,6px)] items-end justify-end overflow-clip px-[var(--spacing-8,8px)] py-[var(--spacing-6,6px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full" data-node-id="4553:47569" data-name="Text Area">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[1.5] min-w-full relative shrink-0 text-[color:var(--foregrounds\/fg-muted,#a4aaa1)] text-[length:var(--font\/size\/small,13px)] w-[min-content]" data-node-id="I4553:47569;3609:3542">
                Add a description...
              </p>
              <div className="relative shrink-0 size-[15px]" data-node-id="I4553:47569;3609:3543" data-name="resize">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+1px)] size-[10.864px] top-[calc(50%+1px)]" data-node-id="I4553:47569;3609:3543;13721:2301347" data-name="Vector">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector7} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="4553:47573" data-name="footer">
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
          <div className="content-stretch flex gap-[8px] items-center justify-end px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="4553:47575" data-name="actions">
            <div className="bg-[var(--buttons\/button-neutral,white)] content-stretch flex gap-[var(--spacing-6,6px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0" data-node-id="4553:47576" data-name="Cancel">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47576;5934:2744">
                Cancel
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-6,6px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.4),0px_0px_0px_1px_#18181b] shrink-0" data-node-id="4553:47587" data-name="Create task">
              <div aria-hidden className="absolute bg-[var(--buttons\/button-inverted,#282a27)] inset-0 pointer-events-none rounded-[var(--radius-6,6px)]" />
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--contrast\/contrast-fg-primary,rgba(255,255,255,0.88))] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47587;5934:2712">
                Create task
              </p>
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0.75px_0px_0px_rgba(255,255,255,0.2)]" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-col items-start overflow-clip relative rounded-[12px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)] shrink-0 w-[480px]" data-node-id="4553:47593" data-name="Invite Team Member">
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="4553:47594" data-name="header">
          <div className="content-stretch flex items-center justify-between px-[24px] py-[8px] relative shrink-0 w-full" data-node-id="4553:47595" data-name="title + button">
            <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/header,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] min-w-px relative text-[14px] text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4553:47596">
              Invite team member
            </p>
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="4553:47597" data-name="buttons">
              <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] border border-[var(--borders\/border-base,#e5e7e4)] border-solid content-stretch flex flex-col h-[16px] items-center justify-center overflow-clip px-[var(--spacing-4,4px)] relative rounded-[var(--radius-4,4px)] shrink-0" data-node-id="4553:47598" data-name="Kbd">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:47598;4737:1537">
                  Esc
                </p>
              </div>
              <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[28px]" data-node-id="4553:47601" data-name="Close">
                <div className="relative shrink-0 size-[15px]" data-node-id="I4553:47601;5934:5924" data-name="x-mark">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[9px] top-1/2" data-node-id="I4553:47601;5934:5924;13721:2301251" data-name="Vector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector8} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
        </div>
        <div className="content-stretch flex flex-col gap-[20px] items-start p-[24px] relative shrink-0 w-full" data-node-id="4553:47606" data-name="Content">
          <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-node-id="4553:47607" data-name="Full name Field">
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="4553:47608" data-name="Full name">
              <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47608;3503:3030">
                <p className="leading-[20px]">Full name</p>
              </div>
            </div>
            <TextInput className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[var(--spacing-4,0px)] h-[32px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full" placeholder="Enter name..." />
          </div>
          <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-node-id="4553:47615" data-name="Email Field">
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="4553:47616" data-name="Email">
              <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47616;3503:3030">
                <p className="leading-[20px]">Email</p>
              </div>
            </div>
            <TextInput className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[var(--spacing-4,0px)] h-[32px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full" placeholder="Enter email..." />
          </div>
          <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-node-id="4553:47623" data-name="Role Field">
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="4553:47624" data-name="Role">
              <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47624;3503:3030">
                <p className="leading-[20px]">Role</p>
              </div>
            </div>
            <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[8px] py-[6px] relative rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full" data-node-id="4553:47629" data-name="Select">
              <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] h-full leading-[20px] min-w-px relative text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)]" data-node-id="I4553:47629;5946:2672">
                Select role...
              </p>
              <div className="relative shrink-0 size-[15px]" data-node-id="I4553:47629;5946:2673" data-name="triangles-mini">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[13.5px] left-1/2 top-1/2 w-[7px]" data-node-id="I4553:47629;5946:2673;13721:2301545" data-name="Vector">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector9} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="4553:47636" data-name="footer">
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
          <div className="content-stretch flex gap-[8px] items-center justify-end px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="4553:47638" data-name="actions">
            <div className="bg-[var(--buttons\/button-neutral,white)] content-stretch flex gap-[var(--spacing-6,6px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0" data-node-id="4553:47639" data-name="Cancel">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47639;5934:2744">
                Cancel
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-6,6px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.4),0px_0px_0px_1px_#18181b] shrink-0" data-node-id="4553:47650" data-name="Send invite">
              <div aria-hidden className="absolute bg-[var(--buttons\/button-inverted,#282a27)] inset-0 pointer-events-none rounded-[var(--radius-6,6px)]" />
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--contrast\/contrast-fg-primary,rgba(255,255,255,0.88))] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47650;5934:2712">
                Send invite
              </p>
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0.75px_0px_0px_rgba(255,255,255,0.2)]" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-col items-start overflow-clip relative rounded-[12px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)] shrink-0 w-[480px]" data-node-id="4553:47656" data-name="Generate Report">
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="4553:47657" data-name="header">
          <div className="content-stretch flex items-center justify-between px-[24px] py-[8px] relative shrink-0 w-full" data-node-id="4553:47658" data-name="title + button">
            <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/header,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] min-w-px relative text-[14px] text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4553:47659">
              Generate report
            </p>
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="4553:47660" data-name="buttons">
              <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] border border-[var(--borders\/border-base,#e5e7e4)] border-solid content-stretch flex flex-col h-[16px] items-center justify-center overflow-clip px-[var(--spacing-4,4px)] relative rounded-[var(--radius-4,4px)] shrink-0" data-node-id="4553:47661" data-name="Kbd">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:47661;4737:1537">
                  Esc
                </p>
              </div>
              <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[28px]" data-node-id="4553:47664" data-name="Close">
                <div className="relative shrink-0 size-[15px]" data-node-id="I4553:47664;5934:5924" data-name="x-mark">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[9px] top-1/2" data-node-id="I4553:47664;5934:5924;13721:2301251" data-name="Vector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector8} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
        </div>
        <div className="content-stretch flex flex-col gap-[20px] items-start p-[24px] relative shrink-0 w-full" data-node-id="4553:47669" data-name="Content">
          <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-node-id="4553:47670" data-name="Report name Field">
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="4553:47671" data-name="Report name">
              <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47671;3503:3030">
                <p className="leading-[20px]">Report name</p>
              </div>
            </div>
            <TextInput className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[var(--spacing-4,0px)] h-[32px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full" placeholder="Enter report name..." />
          </div>
          <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-node-id="4553:47678" data-name="Member Field">
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="4553:47679" data-name="Member">
              <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47679;3503:3030">
                <p className="leading-[20px]">Member</p>
              </div>
            </div>
            <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[8px] py-[6px] relative rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full" data-node-id="4553:47684" data-name="Select">
              <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] h-full leading-[20px] min-w-px relative text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)]" data-node-id="I4553:47684;5946:2672">
                Select member...
              </p>
              <div className="relative shrink-0 size-[15px]" data-node-id="I4553:47684;5946:2673" data-name="triangles-mini">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[13.5px] left-1/2 top-1/2 w-[7px]" data-node-id="I4553:47684;5946:2673;13721:2301545" data-name="Vector">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector9} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-node-id="4553:47691" data-name="Date range Field">
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="4553:47692" data-name="Date range">
              <div className="[word-break:break-word] flex flex-col font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] justify-center leading-[0] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47692;3503:3030">
                <p className="leading-[20px]">Date range</p>
              </div>
            </div>
            <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[8px] py-[6px] relative rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 w-full" data-node-id="4553:47697" data-name="Select">
              <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] h-full leading-[20px] min-w-px relative text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)]" data-node-id="I4553:47697;5946:2672">
                Select range...
              </p>
              <div className="relative shrink-0 size-[15px]" data-node-id="I4553:47697;5946:2673" data-name="triangles-mini">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[13.5px] left-1/2 top-1/2 w-[7px]" data-node-id="I4553:47697;5946:2673;13721:2301545" data-name="Vector">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector9} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="4553:47704" data-name="footer">
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
          <div className="content-stretch flex gap-[8px] items-center justify-end px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="4553:47706" data-name="actions">
            <div className="bg-[var(--buttons\/button-neutral,white)] content-stretch flex gap-[var(--spacing-6,6px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0" data-node-id="4553:47707" data-name="Cancel">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47707;5934:2744">
                Cancel
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-6,6px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.4),0px_0px_0px_1px_#18181b] shrink-0" data-node-id="4553:47718" data-name="Generate report">
              <div aria-hidden className="absolute bg-[var(--buttons\/button-inverted,#282a27)] inset-0 pointer-events-none rounded-[var(--radius-6,6px)]" />
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--contrast\/contrast-fg-primary,rgba(255,255,255,0.88))] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47718;5934:2712">
                Generate report
              </p>
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0.75px_0px_0px_rgba(255,255,255,0.2)]" />
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col h-[900px] items-start overflow-clip relative rounded-[12px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_8px_16px_0px_rgba(0,0,0,0.08),0px_16px_32px_0px_rgba(0,0,0,0.08)] shrink-0 w-[480px]" data-node-id="4553:47724" data-name="Task Details Modal">
        <div aria-hidden className="absolute bg-[var(--backgrounds\/bg-base,white)] inset-0 pointer-events-none rounded-[12px]" />
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-node-id="4553:47725" data-name="header">
          <div className="content-stretch flex items-center justify-between px-[24px] py-[8px] relative shrink-0 w-full" data-node-id="4553:47726" data-name="title + button">
            <p className="[word-break:break-word] flex-[1_0_0] font-[family-name:var(--font\/family\/header,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] min-w-px relative text-[14px] text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4553:47727">
              Task details
            </p>
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="4553:47728" data-name="buttons">
              <div className="bg-[var(--backgrounds\/bg-field,#f8faf7)] border border-[var(--borders\/border-base,#e5e7e4)] border-solid content-stretch flex flex-col h-[16px] items-center justify-center overflow-clip px-[var(--spacing-4,4px)] relative rounded-[var(--radius-4,4px)] shrink-0" data-node-id="4553:47729" data-name="Kbd">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:47729;4737:1537">
                  Esc
                </p>
              </div>
              <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[28px]" data-node-id="4553:47732" data-name="Close">
                <div className="relative shrink-0 size-[15px]" data-node-id="I4553:47732;5934:5924" data-name="x-mark">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[9px] top-1/2" data-node-id="I4553:47732;5934:5924;13721:2301251" data-name="Vector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector8} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px pb-[24px] pt-[16px] px-[24px] relative w-full" data-node-id="4553:47737" data-name="Content">
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-node-id="4553:47738" data-name="Title Group">
            <p className="font-[family-name:var(--font\/family\/header,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[28px] relative shrink-0 text-[18px] text-[color:var(--foregrounds\/fg-base,#0a0b09)] w-full" data-node-id="4553:47739">
              Update onboarding flow
            </p>
            <p className="font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[1.5] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] w-full" data-node-id="4553:47740">
              Revamp first-run experience for new users
            </p>
          </div>
          <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-node-id="4553:47741" data-name="Section 1">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:47742">
              Info
            </p>
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4553:47743" data-name="Status Row">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:47744">
                Status
              </p>
              <div className="bg-[var(--tag\/blue\/tag-blue-bg,rgba(59,130,246,0.12))] border border-[var(--tag\/blue\/tag-blue-border,#bfdbfe)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4553:47745" data-name="In Progress">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/blue\/tag-blue-text,#1e40af)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:47745;6180:141">
                  In Progress
                </p>
              </div>
            </div>
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4553:47756" data-name="Priority Row">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:47757">
                Priority
              </p>
              <div className="bg-[var(--tag\/error\/tag-red-bg,rgba(244,63,94,0.12))] border border-[var(--tag\/error\/tag-red-border,#fecdd3)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="4553:47758" data-name="High">
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/error\/tag-red-text,#9f1239)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4553:47758;6180:145">
                  High
                </p>
              </div>
            </div>
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4553:47769" data-name="Assignee Row">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:47770">
                Assignee
              </p>
              <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-node-id="4553:47771" data-name="Assignee">
                <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4553:47772" data-name="Avatar">
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/blue\/tag-blue-bg,rgba(59,130,246,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:47772;5726:635" data-name="Background">
                    <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/blue\/tag-blue-text,#1e40af)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:47772;5726:636">
                      S
                    </p>
                  </div>
                </div>
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:47775">
                  Sara Nelson
                </p>
              </div>
            </div>
            <div className="[word-break:break-word] content-stretch flex font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] items-center justify-between leading-[20px] relative shrink-0 text-[length:var(--font\/size\/small,13px)] w-full whitespace-nowrap" data-node-id="4553:47776" data-name="Due date Row">
              <p className="relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)]" data-node-id="4553:47777">
                Due date
              </p>
              <p className="relative shrink-0 text-[color:var(--foregrounds\/fg-error,#e11d48)]" data-node-id="4553:47778">
                May 25, 2026
              </p>
            </div>
            <div className="[word-break:break-word] content-stretch flex font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] items-center justify-between leading-[20px] relative shrink-0 text-[length:var(--font\/size\/small,13px)] w-full whitespace-nowrap" data-node-id="4553:47779" data-name="Created Row">
              <p className="relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)]" data-node-id="4553:47780">
                Created
              </p>
              <p className="relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)]" data-node-id="4553:47781">
                Jan 5, 2026
              </p>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-node-id="4553:47782" data-name="Section 2">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:47783">
              Activity log
            </p>
            <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-node-id="4553:47784" data-name="Priya Rao">
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4553:47785" data-name="Name Row">
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-node-id="4553:47786" data-name="Left">
                  <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4553:47787" data-name="Avatar">
                    <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:47787;5726:635" data-name="Background">
                      <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:47787;5726:636">
                        P
                      </p>
                    </div>
                  </div>
                  <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:47790">
                    Priya Rao
                  </p>
                </div>
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] whitespace-nowrap" data-node-id="4553:47791">
                  2h ago
                </p>
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[1.5] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] w-full" data-node-id="4553:47792">
                Moving this to in progress — starting the research phase today.
              </p>
            </div>
            <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-node-id="4553:47793" data-name="Sara Nelson">
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="4553:47794" data-name="Name Row">
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-node-id="4553:47795" data-name="Left">
                  <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="4553:47796" data-name="Avatar">
                    <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/blue\/tag-blue-bg,rgba(59,130,246,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4553:47796;5726:635" data-name="Background">
                      <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/blue\/tag-blue-text,#1e40af)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4553:47796;5726:636">
                        S
                      </p>
                    </div>
                  </div>
                  <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4553:47799">
                    Sara Nelson
                  </p>
                </div>
                <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] whitespace-nowrap" data-node-id="4553:47800">
                  Yesterday
                </p>
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular')] font-[var(--font\/weight\/400,400)] leading-[1.5] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] w-full" data-node-id="4553:47801">
                Added initial wireframes to the shared drive. Let me know if you have feedback.
              </p>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-node-id="4553:47802" data-name="footer">
          <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
          <div className="content-stretch flex gap-[8px] items-center justify-end px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="4553:47804" data-name="actions">
            <div className="bg-[var(--buttons\/button-neutral,white)] content-stretch flex gap-[var(--spacing-6,6px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0" data-node-id="4553:47805" data-name="Edit">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47805;5934:2744">
                Edit
              </p>
            </div>
            <div className="content-stretch flex gap-[var(--spacing-6,6px)] h-[28px] items-center justify-center overflow-clip px-[var(--spacing-8,8px)] relative rounded-[var(--radius-6,6px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.4),0px_0px_0px_1px_#18181b] shrink-0" data-node-id="4553:47816" data-name="Mark Complete">
              <div aria-hidden className="absolute bg-[var(--buttons\/button-inverted,#282a27)] inset-0 pointer-events-none rounded-[var(--radius-6,6px)]" />
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium')] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--contrast\/contrast-fg-primary,rgba(255,255,255,0.88))] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4553:47816;5934:2712">
                Mark complete
              </p>
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0.75px_0px_0px_rgba(255,255,255,0.2)]" />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0px_1px_white,inset_0px_0px_0px_1.5px_rgba(228,228,231,0.6)]" />
      </div>
    </div>
  );
}
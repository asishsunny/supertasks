const imgVector = "https://www.figma.com/api/mcp/asset/db9feaa7-04f2-415d-9ec1-062421b1176e";

type AvatarProps = {
  className?: string;
  content?: "Letters";
  initials?: string;
  size?: "2xsmall (20)";
  type?: "Rounded";
};

function Avatar({ className, content = "Letters", initials = "L", size = "2xsmall (20)", type = "Rounded" }: AvatarProps) {
  return (
    <div className={className || "bg-[var(--backgrounds\\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] size-[20px]"} data-node-id="4131:4417">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--backgrounds\/bg-disabled,#f4f5f4)] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="4131:4451" data-name="Background">
        <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="4131:4452">
          {initials}
        </p>
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

type TableCellProps = {
  className?: string;
  alignment?: "Left" | "Right";
  type?: "Base" | "Actions";
};

function TableCell({ className, alignment = "Left", type = "Base" }: TableCellProps) {
  const isActionsAndRight = type === "Actions" && alignment === "Right";
  return (
    <div className={className || `content-stretch flex h-[48px] items-center relative ${isActionsAndRight ? "justify-end" : ""}`} id={isActionsAndRight ? "node-4131_4525" : "node-4131_4510"}>
      {type === "Base" && alignment === "Left" && (
        <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="4131:4530">
          Label
        </p>
      )}
      {isActionsAndRight && (
        <div className="bg-[var(--buttons\/button-transparent,rgba(255,255,255,0))] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[28px]" data-node-id="4131:4547" data-name="IconButton">
          <div className="relative shrink-0 size-[15px]" data-node-id="I4131:4547;5934:5864" data-name="ellipsis-horizontal">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
              <div className="absolute inset-[42.04%_7.96%]" data-node-id="I4131:4547;5934:5864;13721:2301555" data-name="Vector">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

type HorizontalDividerProps = {
  className?: string;
  type?: "Line";
};

function HorizontalDivider({ className, type = "Line" }: HorizontalDividerProps) {
  return <div className={className || "bg-[var(--borders\\/border-base,#e5e7e4)] h-px overflow-clip relative w-[933px]"} data-node-id="4131:5284" />;
}

export default function RecentTasks() {
  return (
    <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex flex-col gap-[var(--spacing-0,0px)] items-start overflow-clip p-[var(--spacing-0,0px)] relative rounded-[var(--radius-12,12px)] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)] size-full" data-node-id="4223:126439" data-name="Recent Tasks">
      <div className="content-stretch flex items-start overflow-clip pb-[16px] pt-[24px] px-[24px] relative shrink-0 w-full" data-node-id="4223:126440" data-name="Title Wrapper">
        <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/medium,14px)] whitespace-nowrap" data-node-id="4223:126441">
          Recent Tasks
        </p>
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="4223:126442" data-name="Table">
        <div className="bg-[var(--backgrounds\/bg-subtle,#f8faf7)] content-stretch flex gap-[12px] h-[48px] items-center justify-center pl-[24px] pr-[64px] relative shrink-0 w-full" data-node-id="4223:126443" data-name="Table Header">
          <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-node-id="4223:126444" data-name="Table Cell">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:126444;3645:3724">
              Task
            </p>
          </div>
          <div className="content-stretch flex h-full items-center relative shrink-0 w-[160px]" data-node-id="4223:126446" data-name="Table Cell">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:126446;3645:3724">
              Assignee
            </p>
          </div>
          <div className="content-stretch flex h-full items-center relative shrink-0 w-[120px]" data-node-id="4223:126448" data-name="Table Cell">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:126444;3645:3724">
              Priority
            </p>
          </div>
          <div className="content-stretch flex h-full items-center relative shrink-0 w-[130px]" data-node-id="4223:126450" data-name="Table Cell">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:126450;3645:3724">
              Due Date
            </p>
          </div>
          <div className="content-stretch flex h-full items-center relative shrink-0 w-[140px]" data-node-id="4223:126452" data-name="Table Cell">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:126452;3645:3724">
              Status
            </p>
          </div>
        </div>
        <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[12px] h-[48px] items-center justify-center px-[24px] relative shrink-0 w-full" data-node-id="4223:126455" data-name="Icon system audit">
          <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-node-id="4223:126456" data-name="Table Cell">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:126456;3645:3720">
              Icon system audit
            </p>
          </div>
          <div className="content-stretch flex gap-[var(--spacing-8,8px)] h-full items-center relative shrink-0 w-[160px]" data-node-id="4223:126458" data-name="Table Cell">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="I4223:126458;15725:1404" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/success\/tag-green-bg,rgba(16,185,129,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4223:126458;15725:1404;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/success\/tag-green-text,#065f46)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4223:126458;15725:1404;5726:636">
                  L
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:126458;15725:1407">
              Lara Sato
            </p>
          </div>
          <div className="content-stretch flex h-full items-center relative shrink-0 w-[120px]" data-node-id="4223:126463" data-name="Table Cell">
            <div className="bg-[var(--tag\/neutral\/tag-neutral-bg,#f4f5f4)] border border-[var(--tag\/neutral\/tag-neutral-border,#e5e7e4)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I4223:126463;5263:1338" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/neutral\/tag-neutral-text,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4223:126463;5263:1338;6180:151">
                Low
              </p>
            </div>
          </div>
          <div className="content-stretch flex h-full items-center relative shrink-0 w-[130px]" data-node-id="4223:126470" data-name="Table Cell">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-error,#e11d48)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:126470;3645:3722">
              May 7, 2026
            </p>
          </div>
          <div className="content-stretch flex gap-[var(--spacing-4,4px)] h-full items-center relative shrink-0 w-[140px]" data-node-id="4223:126472" data-name="Table Cell">
            <div className="overflow-clip relative shrink-0 size-[15px]" data-node-id="I4223:126472;6171:12910" data-name="square-grey-solid">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/neutral\/tag-neutral-icon,#a4aaa1)] border border-[var(--alpha-black\/alpha-12,rgba(0,0,0,0.12))] border-solid left-1/2 rounded-[2px] size-[8px] top-1/2" data-node-id="I4223:126472;6171:12910;6166:952" />
            </div>
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:126472;6171:12909">
              To Do
            </p>
          </div>
          <TableCell alignment="Right" className="content-stretch flex h-full items-center justify-end relative shrink-0" type="Actions" />
        </div>
        <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[12px] h-[48px] items-center justify-center px-[24px] relative shrink-0 w-full" data-node-id="4223:126482" data-name="Mobile nav refactor">
          <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-node-id="4223:126483" data-name="Table Cell">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:126483;3645:3720">
              Mobile nav refactor
            </p>
          </div>
          <div className="content-stretch flex gap-[var(--spacing-8,8px)] h-full items-center relative shrink-0 w-[160px]" data-node-id="4223:126485" data-name="Table Cell">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="I4223:126485;15725:1404" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/blue\/tag-blue-bg,rgba(59,130,246,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4223:126485;15725:1404;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/blue\/tag-blue-text,#1e40af)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4223:126485;15725:1404;5726:636">
                  S
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:126485;15725:1407">
              Sara Nelson
            </p>
          </div>
          <div className="content-stretch flex h-full items-center relative shrink-0 w-[120px]" data-node-id="4223:126490" data-name="Table Cell">
            <div className="bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] border border-[var(--tag\/warning\/tag-orange-border,#fed7aa)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I4223:126490;5263:1338" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4223:126490;5263:1338;6180:143">
                Medium
              </p>
            </div>
          </div>
          <div className="content-stretch flex h-full items-center relative shrink-0 w-[130px]" data-node-id="4223:126502" data-name="Table Cell">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-error,#e11d48)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:126502;3645:3722">
              May 11, 2026
            </p>
          </div>
          <div className="content-stretch flex gap-[var(--spacing-4,4px)] h-full items-center relative shrink-0 w-[140px]" data-node-id="4223:126504" data-name="Table Cell">
            <div className="overflow-clip relative shrink-0 size-[15px]" data-node-id="I4223:126504;6171:12910" data-name="square-blue-solid">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/blue\/tag-blue-icon,#60a5fa)] border border-[var(--alpha-black\/alpha-12,rgba(0,0,0,0.12))] border-solid left-1/2 rounded-[2px] size-[8px] top-1/2" data-node-id="I4223:126504;6171:12910;6173:13254" />
            </div>
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:126504;6171:12909">
              In Progress
            </p>
          </div>
          <TableCell alignment="Right" className="content-stretch flex h-full items-center justify-end relative shrink-0" type="Actions" />
        </div>
        <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[12px] h-[48px] items-center justify-center px-[24px] relative shrink-0 w-full" data-node-id="4223:126514" data-name="Performance audit">
          <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-node-id="4223:126515" data-name="Table Cell">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:126515;3645:3720">
              Performance audit
            </p>
          </div>
          <div className="content-stretch flex gap-[var(--spacing-8,8px)] h-full items-center relative shrink-0 w-[160px]" data-node-id="4223:126517" data-name="Table Cell">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="I4223:126517;15725:1404" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/neutral\/tag-neutral-bg,#f4f5f4)] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4223:126517;15725:1404;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/neutral\/tag-neutral-text,#555b52)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4223:126517;15725:1404;5726:636">
                  O
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:126517;15725:1407">
              Owen King
            </p>
          </div>
          <div className="content-stretch flex h-full items-center relative shrink-0 w-[120px]" data-node-id="4223:126522" data-name="Table Cell">
            <div className="bg-[var(--tag\/error\/tag-red-bg,rgba(244,63,94,0.12))] border border-[var(--tag\/error\/tag-red-border,#fecdd3)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I4223:126522;5263:1338" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/error\/tag-red-text,#9f1239)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4223:126522;5263:1338;6180:145">
                High
              </p>
            </div>
          </div>
          <div className="content-stretch flex h-full items-center relative shrink-0 w-[130px]" data-node-id="4223:126534" data-name="Table Cell">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:126534;3645:3722">
              May 16, 2026
            </p>
          </div>
          <div className="content-stretch flex gap-[var(--spacing-4,4px)] h-full items-center relative shrink-0 w-[140px]" data-node-id="4223:126536" data-name="Table Cell">
            <div className="overflow-clip relative shrink-0 size-[15px]" data-node-id="I4223:126536;6171:12910" data-name="square-orange-solid">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/warning\/tag-orange-icon,#f97316)] border border-[var(--alpha-black\/alpha-12,rgba(0,0,0,0.12))] border-solid left-1/2 rounded-[2px] size-[8px] top-1/2" data-node-id="I4223:126536;6171:12910;6166:950" />
            </div>
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:126536;6171:12909">
              In Review
            </p>
          </div>
          <TableCell alignment="Right" className="content-stretch flex h-full items-center justify-end relative shrink-0" type="Actions" />
        </div>
        <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[12px] h-[48px] items-center justify-center px-[24px] relative shrink-0 w-full" data-node-id="4223:126546" data-name="User research interviews">
          <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-node-id="4223:126547" data-name="Table Cell">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:126547;3645:3720">
              User research interviews
            </p>
          </div>
          <div className="content-stretch flex gap-[var(--spacing-8,8px)] h-full items-center relative shrink-0 w-[160px]" data-node-id="4223:126549" data-name="Table Cell">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="I4223:126549;15725:1404" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4223:126549;15725:1404;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4223:126549;15725:1404;5726:636">
                  P
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:126549;15725:1407">
              Priya Rao
            </p>
          </div>
          <div className="content-stretch flex h-full items-center relative shrink-0 w-[120px]" data-node-id="4223:126554" data-name="Table Cell">
            <div className="bg-[var(--tag\/warning\/tag-orange-bg,rgba(249,115,22,0.12))] border border-[var(--tag\/warning\/tag-orange-border,#fed7aa)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I4223:126554;5263:1338" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/warning\/tag-orange-text,#9a3412)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4223:126554;5263:1338;6180:143">
                Medium
              </p>
            </div>
          </div>
          <div className="content-stretch flex h-full items-center relative shrink-0 w-[130px]" data-node-id="4223:126566" data-name="Table Cell">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:126566;3645:3722">
              May 20, 2026
            </p>
          </div>
          <div className="content-stretch flex gap-[var(--spacing-4,4px)] h-full items-center relative shrink-0 w-[140px]" data-node-id="4223:126568" data-name="Table Cell">
            <div className="overflow-clip relative shrink-0 size-[15px]" data-node-id="I4223:126568;6171:12910" data-name="square-grey-solid">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/neutral\/tag-neutral-icon,#a4aaa1)] border border-[var(--alpha-black\/alpha-12,rgba(0,0,0,0.12))] border-solid left-1/2 rounded-[2px] size-[8px] top-1/2" data-node-id="I4223:126568;6171:12910;6166:952" />
            </div>
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:126568;6171:12909">
              To Do
            </p>
          </div>
          <TableCell alignment="Right" className="content-stretch flex h-full items-center justify-end relative shrink-0" type="Actions" />
        </div>
        <HorizontalDivider className="bg-[var(--borders\/border-base,#e5e7e4)] h-px relative shrink-0 w-full" />
        <div className="bg-[var(--backgrounds\/bg-base,white)] content-stretch flex gap-[12px] h-[48px] items-center justify-center px-[24px] relative shrink-0 w-full" data-node-id="4223:126578" data-name="Setup CI/CD pipeline">
          <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-node-id="4223:126579" data-name="Table Cell">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:126579;3645:3720">
              Setup CI/CD pipeline
            </p>
          </div>
          <div className="content-stretch flex gap-[var(--spacing-8,8px)] h-full items-center relative shrink-0 w-[160px]" data-node-id="4223:126581" data-name="Table Cell">
            <div className="bg-[var(--backgrounds\/bg-base,white)] overflow-clip relative rounded-[var(--radius-full,999px)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] shrink-0 size-[20px]" data-node-id="I4223:126581;15725:1404" data-name="Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/purple\/tag-purple-bg,rgba(139,92,246,0.12))] left-1/2 rounded-[var(--radius-full,999px)] size-[16px] top-1/2" data-node-id="I4223:126581;15725:1404;5726:635" data-name="Background">
                <p className="-translate-x-1/2 [word-break:break-word] absolute font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] left-[calc(50%+0.5px)] text-[color:var(--tag\/purple\/tag-purple-text,#5b21b6)] text-[length:var(--font\/size\/xsmall,12px)] text-center top-[calc(50%-10px)] whitespace-nowrap" data-node-id="I4223:126581;15725:1404;5726:636">
                  M
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-base,#0a0b09)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:126581;15725:1407">
              Mark Tan
            </p>
          </div>
          <div className="content-stretch flex h-full items-center relative shrink-0 w-[120px]" data-node-id="4223:126586" data-name="Table Cell">
            <div className="bg-[var(--tag\/error\/tag-red-bg,rgba(244,63,94,0.12))] border border-[var(--tag\/error\/tag-red-border,#fecdd3)] border-solid content-stretch flex gap-[var(--spacing-2,2px)] h-[20px] items-center justify-center px-[var(--spacing-6,7px)] py-px relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I4223:126586;5263:1338" data-name="Badge">
              <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/500,500)] leading-[20px] relative shrink-0 text-[color:var(--tag\/error\/tag-red-text,#9f1239)] text-[length:var(--font\/size\/xsmall,12px)] text-center whitespace-nowrap" data-node-id="I4223:126586;5263:1338;6180:145">
                High
              </p>
            </div>
          </div>
          <div className="content-stretch flex h-full items-center relative shrink-0 w-[130px]" data-node-id="4223:126598" data-name="Table Cell">
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:126598;3645:3722">
              May 25, 2026
            </p>
          </div>
          <div className="content-stretch flex gap-[var(--spacing-4,4px)] h-full items-center relative shrink-0 w-[140px]" data-node-id="4223:126600" data-name="Table Cell">
            <div className="overflow-clip relative shrink-0 size-[15px]" data-node-id="I4223:126600;6171:12910" data-name="square-blue-solid">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/blue\/tag-blue-icon,#60a5fa)] border border-[var(--alpha-black\/alpha-12,rgba(0,0,0,0.12))] border-solid left-1/2 rounded-[2px] size-[8px] top-1/2" data-node-id="I4223:126600;6171:12910;6173:13254" />
            </div>
            <p className="[word-break:break-word] font-[family-name:var(--font\/family\/body,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/400,400)] leading-[20px] relative shrink-0 text-[color:var(--foregrounds\/fg-subtle,#555b52)] text-[length:var(--font\/size\/small,13px)] whitespace-nowrap" data-node-id="I4223:126600;6171:12909">
              In Progress
            </p>
          </div>
          <TableCell alignment="Right" className="content-stretch flex h-full items-center justify-end relative shrink-0" type="Actions" />
        </div>
      </div>
    </div>
  );
}

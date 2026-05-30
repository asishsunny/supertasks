import type { Status } from "@/types";
import { STATUS_COLOR, STATUS_LABEL } from "@/lib/constants";

const DOT_BG: Record<string, string> = {
  grey: "bg-ui-tag-neutral-icon",
  blue: "bg-ui-tag-blue-icon",
  orange: "bg-ui-tag-orange-icon",
  green: "bg-ui-tag-green-icon",
};

export function StatusDotCell({ status }: { status: Status }) {
  const color = STATUS_COLOR[status];
  return (
    <div className="flex gap-1 items-center">
      <div className="size-[15px] flex items-center justify-center">
        <div className={`size-2 rounded-[2px] ${DOT_BG[color]}`} />
      </div>
      <span className="txt-compact-small text-ui-fg-subtle">{STATUS_LABEL[status]}</span>
    </div>
  );
}

import { AvatarCell } from "@/components/cells";
import { EllipsisHorizontal } from "@medusajs/icons";
import { IconButton } from "@medusajs/ui";
import type { Column } from "@/components/views/TableView";
import type { Report, Member } from "@/types";

export function getReportColumns(memberMap: Map<number, Member>): Column<Report>[] {
  return [
    { header: "Report", render: (r) => <span className="txt-compact-small">{r.report}</span> },
    { header: "Member", width: "w-[160px]", render: (r) => { const m = memberMap.get(r.memberId); return m ? <AvatarCell member={m} /> : null; } },
    { header: "Date Range", width: "w-[160px]", render: (r) => <span className="txt-compact-small text-ui-fg-subtle">{r.range}</span> },
    { header: "Generated", width: "w-[130px]", render: (r) => <span className="txt-compact-small text-ui-fg-subtle">{r.generated}</span> },
    { header: "", width: "w-7", render: () => <IconButton size="small" variant="transparent"><EllipsisHorizontal /></IconButton> },
  ];
}

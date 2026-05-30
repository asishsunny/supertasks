import { AvatarCell, TextCell } from "@/components/cells";
import { EllipsisHorizontal } from "@medusajs/icons";
import { IconButton } from "@medusajs/ui";
import type { Column } from "@/components/views/TableView";
import type { Member } from "@/types";

export function getTeamColumns(onEdit: (member: Member) => void): Column<Member>[] {
  return [
    { header: "Name", render: (m) => <AvatarCell member={m} /> },
    { header: "Email", width: "w-[200px]", render: (m) => <span className="txt-compact-small text-ui-fg-subtle">{m.email}</span> },
    { header: "Role", width: "w-[180px]", render: (m) => <span className="txt-compact-small text-ui-fg-subtle">{m.role}</span> },
    { header: "", width: "w-7", render: (m) => (
      <IconButton size="small" variant="transparent" onClick={() => onEdit(m)}>
        <EllipsisHorizontal />
      </IconButton>
    ) },
  ];
}

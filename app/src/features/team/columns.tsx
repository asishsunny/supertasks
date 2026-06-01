import { AvatarCell } from "@/components/cells";
import { EllipsisHorizontal } from "@medusajs/icons";
import { IconButton } from "@medusajs/ui";
import type { Column } from "@/components/views/TableView";
export interface TeamRow {
  id: number;
  name: string;
  initials: string;
  email: string;
  role: string;
  avatarBg: string;
  avatarText: string;
  activeTasks: number;
  overdueTasks: number;
}

export function getTeamColumns(onEdit: (member: TeamRow) => void): Column<TeamRow>[] {
  return [
    { header: "Name", render: (m) => <AvatarCell member={m} /> },
    { header: "Email", width: "w-[200px]", render: (m) => <span className="txt-compact-small text-ui-fg-subtle">{m.email}</span> },
    { header: "Role", width: "w-[180px]", render: (m) => <span className="txt-compact-small text-ui-fg-subtle">{m.role}</span> },
    { header: "Active", width: "w-[80px]", render: (m) => <span className="txt-compact-small text-ui-fg-base">{m.activeTasks}</span> },
    { header: "Overdue", width: "w-[80px]", render: (m) => (
      <span className={`txt-compact-small ${m.overdueTasks > 0 ? "text-ui-fg-error" : "text-ui-fg-subtle"}`}>
        {m.overdueTasks}
      </span>
    ) },
    { header: "", width: "w-7", render: (m) => (
      <IconButton size="small" variant="transparent" onClick={() => onEdit(m)}>
        <EllipsisHorizontal />
      </IconButton>
    ) },
  ];
}

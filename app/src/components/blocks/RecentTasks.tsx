import { Table, Badge, IconButton } from "@medusajs/ui";
import { EllipsisHorizontal } from "@medusajs/icons";
import { ColorAvatar } from "@/components/ColorAvatar";
import type { Member, Priority, Status } from "@/types";
import type { BadgeColor } from "@/lib/constants";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface RecentTaskRow {
  title: string;
  assignee: Pick<Member, "initials" | "avatarBg" | "avatarText">;
  assigneeName: string;
  priority: string;
  priorityColor: BadgeColor;
  dueDate: string;
  statusLabel: string;
  statusColor: string;
}

export interface RecentTasksProps {
  heading?: string;
  rows?: RecentTaskRow[];
}

/* ------------------------------------------------------------------ */
/*  Default Figma data (one representative row from template)          */
/* ------------------------------------------------------------------ */

const DEFAULT_ROWS: RecentTaskRow[] = [
  {
    title: "Icon system audit",
    assignee: { initials: "L", avatarBg: "tag-green-bg", avatarText: "tag-green-text" },
    assigneeName: "Lara Sato",
    priority: "Low",
    priorityColor: "grey",
    dueDate: "Jun 21, 2026",
    statusLabel: "To do",
    statusColor: "var(--tag-neutral-icon)",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function RecentTasks({
  heading = "Recent Tasks",
  rows = DEFAULT_ROWS,
}: RecentTasksProps) {
  return (
    <div className="bg-ui-bg-base flex flex-col gap-0 overflow-clip p-0 relative rounded-xl shadow-elevation-card-rest shrink-0 w-full">
      <div className="flex items-start overflow-clip pb-4 pt-6 px-6 relative shrink-0 w-full">
        <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
          {heading}
        </p>
      </div>
      <Table>
        <Table.Header className="border-t-0">
          <Table.Row>
            <Table.HeaderCell>Task</Table.HeaderCell>
            <Table.HeaderCell className="w-[160px]">Assignee</Table.HeaderCell>
            <Table.HeaderCell className="w-[120px]">Priority</Table.HeaderCell>
            <Table.HeaderCell className="w-[130px]">Due Date</Table.HeaderCell>
            <Table.HeaderCell className="w-[140px]">Status</Table.HeaderCell>
            <Table.HeaderCell className="w-7" />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((row, i) => (
            <Table.Row key={i}>
              <Table.Cell>
                <p className="relative shrink-0 text-ui-fg-base txt-compact-small">
                  {row.title}
                </p>
              </Table.Cell>
              <Table.Cell className="w-[160px]">
                <span className="inline-flex items-center gap-2">
                  <ColorAvatar member={row.assignee} size="xsmall" />
                  <p className="relative shrink-0 text-ui-fg-base txt-compact-small">
                    {row.assigneeName}
                  </p>
                </span>
              </Table.Cell>
              <Table.Cell className="w-[120px]">
                <Badge color={row.priorityColor} size="2xsmall" rounded="full">
                  {row.priority}
                </Badge>
              </Table.Cell>
              <Table.Cell className="w-[130px]">
                <p className="relative shrink-0 text-ui-fg-subtle txt-compact-small">
                  {row.dueDate}
                </p>
              </Table.Cell>
              <Table.Cell className="w-[140px]">
                <span className="inline-flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className="inline-block size-2 rounded-[2px] shrink-0 border border-black/[.12] dark:border-white/[.12]"
                      style={{ backgroundColor: row.statusColor }}
                    />
                    <span className="txt-compact-small text-ui-fg-subtle">
                      {row.statusLabel}
                    </span>
                  </span>
                </span>
              </Table.Cell>
              <Table.Cell>
                <IconButton variant="transparent" size="small">
                  <EllipsisHorizontal />
                </IconButton>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

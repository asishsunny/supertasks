import { Table, Badge, IconButton } from "@medusajs/ui";
import { EllipsisHorizontal } from "@medusajs/icons";
import { ColorAvatar } from "@/components/ColorAvatar";
import { PRIORITY_COLOR, BAR_COLORS, STATUS_LABEL } from "@/lib/constants";
import type { Member, Priority, Status } from "@/types";

export interface RecentTaskRow {
  id: number;
  title: string;
  assignee: Member;
  priority: Priority;
  priorityLabel: string;
  due: string;
  status: Status;
}

export interface RecentTasksProps {
  title?: string;
  rows?: RecentTaskRow[];
}

const DEFAULT_ROWS: RecentTaskRow[] = [
  {
    id: 1,
    title: "Icon system audit",
    assignee: { id: 1, name: "Lara Sato", initials: "LS", email: "", role: "", avatarBg: "tag-blue-bg", avatarText: "tag-blue-text" },
    priority: "low",
    priorityLabel: "Low",
    due: "Jun 21, 2026",
    status: "in_review",
  },
  {
    id: 2,
    title: "Write API documentation",
    assignee: { id: 2, name: "Owen King", initials: "OK", email: "", role: "", avatarBg: "tag-purple-bg", avatarText: "tag-purple-text" },
    priority: "low",
    priorityLabel: "Low",
    due: "Jun 16, 2026",
    status: "todo",
  },
  {
    id: 3,
    title: "Setup CI/CD pipeline",
    assignee: { id: 3, name: "Mark Tan", initials: "MT", email: "", role: "", avatarBg: "tag-green-bg", avatarText: "tag-green-text" },
    priority: "high",
    priorityLabel: "High",
    due: "Jun 13, 2026",
    status: "in_progress",
  },
  {
    id: 4,
    title: "Performance audit",
    assignee: { id: 2, name: "Owen King", initials: "OK", email: "", role: "", avatarBg: "tag-purple-bg", avatarText: "tag-purple-text" },
    priority: "high",
    priorityLabel: "High",
    due: "Jun 11, 2026",
    status: "done",
  },
  {
    id: 5,
    title: "Accessibility pass",
    assignee: { id: 2, name: "Owen King", initials: "OK", email: "", role: "", avatarBg: "tag-purple-bg", avatarText: "tag-purple-text" },
    priority: "medium",
    priorityLabel: "Medium",
    due: "Jun 9, 2026",
    status: "in_progress",
  },
];

export function RecentTasks({
  title = "Recent Tasks",
  rows = DEFAULT_ROWS,
}: RecentTasksProps) {
  return (
    <div className="bg-ui-bg-base flex flex-col overflow-clip rounded-xl shadow-elevation-card-rest w-full">
      <div className="flex items-start pb-4 pt-6 px-6 w-full">
        <p className="text-ui-fg-base txt-compact-medium-plus">{title}</p>
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
          {rows.map((row) => (
            <Table.Row key={row.id}>
              <Table.Cell>
                <p className="text-ui-fg-base txt-compact-small">{row.title}</p>
              </Table.Cell>
              <Table.Cell className="w-[160px]">
                <span className="inline-flex items-center gap-2">
                  <ColorAvatar member={row.assignee} size="xsmall" />
                  <p className="text-ui-fg-base txt-compact-small">
                    {row.assignee.name}
                  </p>
                </span>
              </Table.Cell>
              <Table.Cell className="w-[120px]">
                <Badge
                  color={PRIORITY_COLOR[row.priority]}
                  size="2xsmall"
                  rounded="full"
                >
                  {row.priorityLabel}
                </Badge>
              </Table.Cell>
              <Table.Cell className="w-[130px]">
                <p className="text-ui-fg-subtle txt-compact-small">{row.due}</p>
              </Table.Cell>
              <Table.Cell className="w-[140px]">
                <span className="inline-flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className="inline-block size-2 rounded-[2px] shrink-0 border border-black/[.12] dark:border-white/[.12]"
                      style={{ backgroundColor: BAR_COLORS[row.status] }}
                    />
                    <span className="txt-compact-small text-ui-fg-subtle">
                      {STATUS_LABEL[row.status]}
                    </span>
                  </span>
                </span>
              </Table.Cell>
              <Table.Cell>
                <IconButton
                  variant="transparent"
                  size="small"
                  aria-label={`Actions for ${row.title}`}
                >
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

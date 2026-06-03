import type { ReactNode } from "react";
import { Table, Badge, IconButton } from "@medusajs/ui";
import { EllipsisHorizontal } from "@medusajs/icons";
import { ColorAvatar } from "@/components/ColorAvatar";
import { PRIORITY_COLOR, BAR_COLORS, STATUS_LABEL } from "@/lib/constants";
import type { Member, Priority, Status } from "@/types";

export interface TableColumn {
  key: string;
  header: string;
  width?: string;
  render: (row: any) => ReactNode;
}

export interface TableRow {
  id: string | number;
  [key: string]: unknown;
}

export interface RecentTasksProps {
  title?: string;
  columns?: TableColumn[];
  rows?: TableRow[];
}

const defaultColumns: TableColumn[] = [
  {
    key: "task",
    header: "Task",
    render: (row) => (
      <p className="relative shrink-0 text-ui-fg-base txt-compact-small">
        {(row.title as string) ?? "Icon system audit"}
      </p>
    ),
  },
  {
    key: "assignee",
    header: "Assignee",
    width: "w-[160px]",
    render: (row) => {
      const member = row.member as Member | undefined;
      const name = (row.assigneeName as string) ?? "Lara Sato";
      return (
        <span className="inline-flex items-center gap-2">
          {member && <ColorAvatar member={member} size="xsmall" />}
          <p className="relative shrink-0 text-ui-fg-base txt-compact-small">
            {name}
          </p>
        </span>
      );
    },
  },
  {
    key: "priority",
    header: "Priority",
    width: "w-[120px]",
    render: (row) => {
      const priority = (row.priority as Priority) ?? "low";
      const label =
        (row.priorityLabel as string) ??
        priority.charAt(0).toUpperCase() + priority.slice(1);
      return (
        <Badge
          color={PRIORITY_COLOR[priority]}
          size="2xsmall"
          rounded="full"
        >
          {label}
        </Badge>
      );
    },
  },
  {
    key: "dueDate",
    header: "Due Date",
    width: "w-[130px]",
    render: (row) => (
      <p className="relative shrink-0 text-ui-fg-subtle txt-compact-small">
        {(row.dueDate as string) ?? "Jun 21, 2026"}
      </p>
    ),
  },
  {
    key: "status",
    header: "Status",
    width: "w-[140px]",
    render: (row) => {
      const status = (row.status as Status) ?? "todo";
      return (
        <span className="inline-flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5">
            <span
              className="inline-block size-2 rounded-[2px] shrink-0 border border-black/[.12] dark:border-white/[.12]"
              style={{ backgroundColor: BAR_COLORS[status] }}
            />
            <span className="txt-compact-small text-ui-fg-subtle">
              {STATUS_LABEL[status]}
            </span>
          </span>
        </span>
      );
    },
  },
  {
    key: "actions",
    header: "",
    width: "w-7",
    render: () => (
      <IconButton variant="transparent" size="small">
        <EllipsisHorizontal />
      </IconButton>
    ),
  },
];

const defaultRows: TableRow[] = [
  { id: 1, title: "Icon system audit", assigneeName: "Lara Sato", priority: "low", dueDate: "Jun 21, 2026", status: "todo" },
  { id: 2, title: "Icon system audit", assigneeName: "Lara Sato", priority: "low", dueDate: "Jun 21, 2026", status: "todo" },
  { id: 3, title: "Icon system audit", assigneeName: "Lara Sato", priority: "low", dueDate: "Jun 21, 2026", status: "todo" },
  { id: 4, title: "Icon system audit", assigneeName: "Lara Sato", priority: "low", dueDate: "Jun 21, 2026", status: "todo" },
  { id: 5, title: "Icon system audit", assigneeName: "Lara Sato", priority: "low", dueDate: "Jun 21, 2026", status: "todo" },
];

export function RecentTasks({
  title = "Recent Tasks",
  columns = defaultColumns,
  rows = defaultRows,
}: RecentTasksProps) {
  return (
    <div className="bg-ui-bg-base flex flex-col gap-0 overflow-clip p-0 relative rounded-xl shadow-elevation-card-rest shrink-0 w-full">
      <div className="flex items-start overflow-clip pb-4 pt-6 px-6 relative shrink-0 w-full">
        <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
          {title}
        </p>
      </div>
      <Table>
        <Table.Header className="border-t-0">
          <Table.Row>
            {columns.map((col) => (
              <Table.HeaderCell key={col.key} className={col.width}>
                {col.header}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((row) => (
            <Table.Row key={row.id}>
              {columns.map((col) => (
                <Table.Cell key={col.key} className={col.width}>
                  {col.render(row)}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

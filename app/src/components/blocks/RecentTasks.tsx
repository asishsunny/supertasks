// source: artifacts/transformed/recent-tasks-templatized.tsx
// adapt: data-repeat→.map(), hardcoded strings→props, Avatar xsmall, Badge 2xsmall

import { Badge, IconButton, Table } from "@medusajs/ui";
import { EllipsisHorizontal } from "@medusajs/icons";
import { ColorAvatar } from "@/components/ColorAvatar";
import type { Member, Task } from "@/types";
import type { BadgeColor } from "@/lib/constants";

interface RecentTaskRow {
  task: Task;
  member: Pick<Member, "initials" | "avatarBg" | "avatarText" | "name">;
  priorityColor: BadgeColor;
  priorityLabel: string;
  statusColor: string;
  statusLabel: string;
  dueDateLabel: string;
}

interface RecentTasksProps {
  title: string;
  columns: string[];
  rows: RecentTaskRow[];
  onRowAction?: (taskId: number) => void;
}

export function RecentTasks({ title, columns, rows, onRowAction }: RecentTasksProps) {
  return (
    <div className="bg-ui-bg-base flex flex-col overflow-clip rounded-xl shadow-elevation-card-rest w-full">
      <div className="flex items-start pb-4 pt-6 px-6 w-full">
        <p className="text-ui-fg-base txt-compact-medium-plus">
          {title}
        </p>
      </div>
      <Table>
        <Table.Header className="border-t-0">
          <Table.Row>
            <Table.HeaderCell>{columns[0]}</Table.HeaderCell>
            <Table.HeaderCell className="w-[160px]">{columns[1]}</Table.HeaderCell>
            <Table.HeaderCell className="w-[120px]">{columns[2]}</Table.HeaderCell>
            <Table.HeaderCell className="w-[130px]">{columns[3]}</Table.HeaderCell>
            <Table.HeaderCell className="w-[140px]">{columns[4]}</Table.HeaderCell>
            <Table.HeaderCell className="w-7" />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((row) => (
            <Table.Row key={row.task.id}>
              <Table.Cell>
                <p className="text-ui-fg-base txt-compact-small">
                  {row.task.title}
                </p>
              </Table.Cell>
              <Table.Cell className="w-[160px]">
                <span className="inline-flex items-center gap-2">
                  <ColorAvatar member={row.member} size="xsmall" />
                  <p className="text-ui-fg-base txt-compact-small">
                    {row.member.name}
                  </p>
                </span>
              </Table.Cell>
              <Table.Cell className="w-[120px]">
                <Badge color={row.priorityColor} size="2xsmall" rounded="full">
                  {row.priorityLabel}
                </Badge>
              </Table.Cell>
              <Table.Cell className="w-[130px]">
                <p className="text-ui-fg-subtle txt-compact-small">
                  {row.dueDateLabel}
                </p>
              </Table.Cell>
              <Table.Cell className="w-[140px]">
                <span className="inline-flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className="inline-block size-2 rounded-[2px] border border-black/[.12] dark:border-white/[.12]"
                      style={{ backgroundColor: row.statusColor }}
                    />
                    <span className="txt-compact-small text-ui-fg-subtle">
                      {row.statusLabel}
                    </span>
                  </span>
                </span>
              </Table.Cell>
              <Table.Cell>
                <IconButton
                  variant="transparent"
                  size="small"
                  aria-label="Task actions"
                  onClick={() => onRowAction?.(row.task.id)}
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

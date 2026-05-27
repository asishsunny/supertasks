"use client";

import { INITIAL_TASKS, MEMBERS } from "@/lib/data";
import { formatDate, isOverdue } from "@/lib/utils";
import { BAR_COLORS, PRIORITY_BAR_COLORS, PRIORITY_COLOR, STATUS_LABEL } from "@/lib/constants";
import { Badge, IconButton, Table } from "@medusajs/ui";
import { EllipsisHorizontal } from "@medusajs/icons";
import { ColorAvatar } from "@/components/ColorAvatar";
import type { Priority, Status } from "@/types";

export default function DashboardPage() {
  const tasks = INITIAL_TASKS;
  const total = tasks.length;

  const stats = [
    { label: "Total Tasks", value: total, error: false },
    { label: "In Progress", value: tasks.filter((t) => t.status === "in_progress").length, error: false },
    { label: "Completed", value: tasks.filter((t) => t.status === "done").length, error: false },
    { label: "Overdue", value: tasks.filter((t) => t.status !== "done" && isOverdue(t.due)).length, error: true },
  ];

  const PRIORITY_ROWS: { key: Priority; label: string }[] = [
    { key: "critical", label: "Critical" },
    { key: "high", label: "High" },
    { key: "medium", label: "Medium" },
    { key: "low", label: "Low" },
  ];

  const STATUS_ROWS: { key: Status; label: string }[] = [
    { key: "todo", label: "To Do" },
    { key: "in_progress", label: "In Progress" },
    { key: "in_review", label: "In Review" },
    { key: "done", label: "Done" },
  ];

  const recentTasks = tasks
    .filter((t) => t.status !== "done")
    .sort((a, b) => b.due.localeCompare(a.due))
    .slice(0, 5);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-start relative w-full">
        {stats.map((s) => (
          <div
            className="bg-ui-bg-base flex flex-col flex-1 gap-4 min-w-[1px] overflow-clip p-6 relative rounded-xl shadow-elevation-card-rest text-ui-fg-base"
            key={s.label}
          >
            <p className="txt-compact-medium-plus">{s.label}</p>
            <p
              className={`text-[32px] leading-[44px] tracking-[-0.16px] font-normal ${s.error ? "text-ui-fg-error" : "text-ui-fg-base"}`}
            >
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="flex gap-4 items-start relative w-full">
        <div
          className="bg-ui-bg-base flex flex-col flex-1 gap-4 min-w-0 overflow-clip p-6 relative rounded-xl shadow-elevation-card-rest"
        >
          <p className="text-ui-fg-base txt-compact-medium-plus">Tasks by Priority</p>
          <div className="flex flex-col gap-4 w-full">
            {PRIORITY_ROWS.map((row) => {
              const count = tasks.filter((t) => t.priority === row.key).length;
              return (
                <div key={row.key} className="flex gap-2 items-center w-full">
                  <p className="text-ui-fg-subtle w-[88px] txt-compact-small">{row.label}</p>
                  <div className="bg-ui-border-base flex-1 h-2 min-w-[1px] overflow-clip rounded">
                    <div
                      className="h-full rounded"
                      style={{
                        width: `${Math.round((count / total) * 100)}%`,
                        backgroundColor: PRIORITY_BAR_COLORS[row.key],
                      }}
                    />
                  </div>
                  <p className="text-ui-fg-base txt-compact-small-plus">{count}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="bg-ui-bg-base flex flex-col flex-1 gap-4 min-w-0 overflow-clip p-6 relative rounded-xl shadow-elevation-card-rest"
        >
          <p className="text-ui-fg-base txt-compact-medium-plus">Tasks by Status</p>
          <div className="flex flex-col gap-4 w-full">
            {STATUS_ROWS.map((row) => {
              const count = tasks.filter((t) => t.status === row.key).length;
              return (
                <div key={row.key} className="flex gap-2 items-center w-full">
                  <p className="text-ui-fg-subtle w-[88px] txt-compact-small">{row.label}</p>
                  <div className="bg-ui-border-base flex-1 h-2 min-w-[1px] overflow-clip rounded">
                    <div
                      className="h-full rounded"
                      style={{
                        width: `${Math.round((count / total) * 100)}%`,
                        backgroundColor: BAR_COLORS[row.key],
                      }}
                    />
                  </div>
                  <p className="text-ui-fg-base txt-compact-small-plus">{count}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-ui-bg-base flex flex-col overflow-clip rounded-xl shadow-elevation-card-rest w-full">
        <div className="pb-4 pt-6 px-6">
          <p className="text-ui-fg-base txt-compact-medium-plus">Recent Tasks</p>
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
            {recentTasks.map((task) => {
              const member = MEMBERS.find((m) => m.id === task.assignee) ?? MEMBERS[0];
              return (
                <Table.Row key={task.id}>
                  <Table.Cell>
                  <p className="text-ui-fg-base txt-compact-small">{task.title}</p>
                </Table.Cell>
                  <Table.Cell className="w-[160px]">
                  <span className="inline-flex items-center gap-2">
                      <ColorAvatar member={member} size="xsmall" />
                      <span className="text-ui-fg-base txt-compact-small">{member.name}</span>
                    </span>
                </Table.Cell>
                  <Table.Cell className="w-[120px]">
                  <Badge color={PRIORITY_COLOR[task.priority]} size="2xsmall" rounded="full">{task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</Badge>
                </Table.Cell>
                  <Table.Cell className="w-[130px]">
                  <p className="text-ui-fg-subtle txt-compact-small">{formatDate(task.due)}</p>
                </Table.Cell>
                  <Table.Cell className="w-[140px]">
                  <span className="inline-flex items-center gap-1.5">
                      <span
                        className="inline-block size-2 rounded-[2px] shrink-0 border border-black/[.12] dark:border-white/[.12]"
                        style={{ backgroundColor: BAR_COLORS[task.status] }}
                      />
                      <span className="txt-compact-small text-ui-fg-subtle">{STATUS_LABEL[task.status]}</span>
                    </span>
                </Table.Cell>
                  <Table.Cell className="w-7">
                  <IconButton variant="transparent" size="small">
                      <EllipsisHorizontal />
                    </IconButton>
                </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

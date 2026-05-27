"use client";

import { INITIAL_TASKS, MEMBERS } from "@/lib/data";
import { default as Link } from "next/link";
import { Badge, Button, IconButton, Input, Table } from "@medusajs/ui";
import { AdjustmentsDone, BarsArrowDown, CalendarMini, EllipsisHorizontal, Funnel } from "@medusajs/icons";
import { ColorAvatar } from "@/components/ColorAvatar";
import { BAR_COLORS, PRIORITY_COLOR, STATUS_LABEL } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { useState } from "react";

export default function TasksPage() {
  const tasks = INITIAL_TASKS;

  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(tasks.length / 10);
  const pagedTasks = tasks.slice(page * 10, (page + 1) * 10);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center w-full">
          <div className="inline-flex items-center bg-ui-bg-subtle rounded-lg p-0.5 gap-0.5">
            <Link key="Kanban" href="/tasks/kanban" scroll={false} className="px-4 py-0.5 rounded-md txt-compact-small text-ui-fg-subtle">Kanban</Link>
            <Link key="List" href="/tasks" scroll={false} className="px-4 py-0.5 rounded-md bg-ui-bg-base shadow-elevation-card-rest txt-compact-small-plus text-ui-fg-base">List</Link>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="small"><Funnel /> Filter</Button>
            <Button variant="secondary" size="small"><CalendarMini /> Date</Button>
            <Button variant="secondary" size="small"><AdjustmentsDone /> Columns</Button>
            <IconButton variant="transparent" size="small"><BarsArrowDown /></IconButton>
            <Input size="small" placeholder="Search" className="w-[160px]" />
          </div>
        </div>

      <div className="bg-ui-bg-base flex flex-col overflow-clip rounded-xl shadow-elevation-card-rest w-full">
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
            {pagedTasks.map((task) => {
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

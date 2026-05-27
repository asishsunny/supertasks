"use client";

import { INITIAL_TASKS, MEMBERS } from "@/lib/data";
import { isOverdue } from "@/lib/utils";
import { Badge, IconButton, Table } from "@medusajs/ui";
import { EllipsisHorizontal } from "@medusajs/icons";
import { ColorAvatar } from "@/components/ColorAvatar";

export default function TeamPage() {
  const members = MEMBERS;
  const tasks = INITIAL_TASKS;

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-ui-bg-base flex flex-col overflow-clip rounded-xl shadow-elevation-card-rest w-full">
        <Table>
          <Table.Header className="border-t-0">
            <Table.Row>
              <Table.HeaderCell>Member</Table.HeaderCell>
              <Table.HeaderCell className="w-[220px]">Email</Table.HeaderCell>
              <Table.HeaderCell className="w-[160px]">Role</Table.HeaderCell>
              <Table.HeaderCell className="w-[100px]">Active tasks</Table.HeaderCell>
              <Table.HeaderCell className="w-[100px]">Overdue</Table.HeaderCell>
              <Table.HeaderCell className="w-7" />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {members.map((member) => {
              const activeTasks = tasks.filter(t => t.assignee === member.id && t.status !== "done").length;
              const overdueTasks = tasks.filter(t => t.assignee === member.id && t.status !== "done" && isOverdue(t.due)).length;
              return (
                <Table.Row key={member.id}>
                  <Table.Cell>
                  <span className="inline-flex items-center gap-2">
                      <ColorAvatar member={member} size="xsmall" />
                      <span className="text-ui-fg-base txt-compact-small">{member.name}</span>
                    </span>
                </Table.Cell>
                  <Table.Cell className="w-[220px]">
                  <p className="text-ui-fg-subtle txt-compact-small">{member.email}</p>
                </Table.Cell>
                  <Table.Cell className="w-[160px]">
                  <p className="text-ui-fg-subtle txt-compact-small">{member.role}</p>
                </Table.Cell>
                  <Table.Cell className="w-[100px]">
                  <span className="txt-compact-small">{activeTasks}</span>
                </Table.Cell>
                  <Table.Cell className="w-[100px]">
                  <span className="txt-compact-small">{overdueTasks}</span>
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

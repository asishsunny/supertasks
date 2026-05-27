"use client";

import { INITIAL_TASKS, MEMBERS } from "@/lib/data";
import { default as Link } from "next/link";
import { Badge, Button, IconButton, Input } from "@medusajs/ui";
import { AdjustmentsDone, BarsArrowDown, CalendarMini, Funnel } from "@medusajs/icons";
import { ColorAvatar } from "@/components/ColorAvatar";
import { BAR_COLORS, PRIORITY_COLOR } from "@/lib/constants";
import { formatDueDate, isOverdue } from "@/lib/utils";
import type { Status } from "@/types";

export default function TasksKanbanPage() {
  const tasks = INITIAL_TASKS;

  const STATUSES: { key: Status; label: string }[] = [
    { key: "todo", label: "To Do" },
    { key: "in_progress", label: "In Progress" },
    { key: "in_review", label: "In Review" },
    { key: "done", label: "Done" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center w-full">
          <div className="inline-flex items-center bg-ui-bg-subtle rounded-lg p-0.5 gap-0.5">
            <Link key="Kanban" href="/tasks/kanban" scroll={false} className="px-4 py-0.5 rounded-md bg-ui-bg-base shadow-elevation-card-rest txt-compact-small-plus text-ui-fg-base">Kanban</Link>
            <Link key="List" href="/tasks" scroll={false} className="px-4 py-0.5 rounded-md txt-compact-small text-ui-fg-subtle">List</Link>
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

      <div className="flex gap-4 w-full h-full min-h-0">
        {STATUSES.map((status) => {
          const columnTasks = tasks.filter((t) => t.status === status.key);
          return (
            <div key={status.key} className="flex flex-col flex-1 gap-2 p-2 rounded-xl bg-ui-bg-kanban-column min-w-0">
              <div className="flex items-center gap-1.5 py-1 overflow-clip w-full shrink-0">
                <span
                  className="inline-block size-2 rounded-[2px] shrink-0 border border-black/[.12] dark:border-white/[.12]"
                  style={{ backgroundColor: BAR_COLORS[status.key] }}
                />
                <span className="txt-compact-medium-plus text-ui-fg-base">{status.label}</span>
                <span className="flex-[1_0_0] h-px min-w-px" />
                <span className="txt-compact-medium text-ui-fg-muted">{columnTasks.length}</span>
              </div>
              {columnTasks.map((task) => {
                const member = MEMBERS.find((m) => m.id === task.assignee) ?? MEMBERS[0];
                return (
                  <div key={task.id} className="flex flex-col gap-3 p-3 rounded-lg bg-ui-bg-base shadow-elevation-card-rest shrink-0">
                    <p className="txt-compact-medium-plus text-ui-fg-base">{task.title}</p>
                    <p className="txt-compact-medium text-ui-fg-muted w-full truncate">{task.desc}</p>
                    <div className="flex items-center gap-1.5 w-full">
                      <ColorAvatar member={member} size="xsmall" />
                      <span className="text-xs text-ui-fg-subtle shrink-0">{member.name.split(" ")[0]}</span>
                      <span className="flex-[1_0_0] h-px min-w-px" />
                      <span className={`text-xs shrink-0 ${isOverdue(task.due) && task.status !== "done" ? "text-ui-fg-error" : "text-ui-fg-subtle"}`}>
                        {formatDueDate(task.due)}
                      </span>
                      <Badge color={PRIORITY_COLOR[task.priority]} size="2xsmall" rounded="full">
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

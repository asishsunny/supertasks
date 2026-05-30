"use client";

import { Button, IconButton, Badge } from "@medusajs/ui";
import { XMark } from "@medusajs/icons";
import { ColorAvatar } from "@/components/ColorAvatar";
import type { Task, Member, ActivityItem } from "@/types";
import { STATUS_LABEL, STATUS_COLOR, PRIORITY_COLOR } from "@/lib/constants";
import { formatDate, isOverdue as checkOverdue } from "@/lib/utils";

interface TaskDetailDrawerProps {
  task: Task;
  member: Member;
  activity: (ActivityItem & { member: Member })[];
  open: boolean;
  onClose: () => void;
  onEdit?: () => void;
  onComplete?: () => void;
}

export function TaskDetailDrawer({ task, member, activity, open, onClose, onEdit, onComplete }: TaskDetailDrawerProps) {
  if (!open) return null;

  const priorityLabel = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);
  const isOverdue = checkOverdue(task.due);

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
    <div className="absolute inset-0 bg-ui-bg-overlay" />
    <div className="relative flex flex-col overflow-clip shadow-elevation-modal bg-ui-bg-base w-[480px] h-full" onClick={(e) => e.stopPropagation()}>
      <div className="flex flex-col items-center shrink-0 w-full">
        <div className="flex items-center justify-between px-6 py-2 w-full">
          <p className="flex-1 font-medium text-sm text-ui-fg-base">Task details</p>
          <div className="flex gap-1 items-center">
            <kbd className="bg-ui-bg-field border border-ui-border-base flex items-center justify-center h-4 px-1 rounded txt-compact-xsmall-plus text-ui-fg-subtle">
              Esc
            </kbd>
            <IconButton size="small" variant="transparent" onClick={onClose}>
              <XMark />
            </IconButton>
          </div>
        </div>
        <div className="bg-ui-border-base h-px w-full" />
      </div>

      <div className="flex flex-1 flex-col gap-6 min-h-0 overflow-y-auto pb-6 pt-4 px-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-medium text-lg text-ui-fg-base">{task.title}</h2>
          <p className="txt-small text-ui-fg-subtle">{task.desc}</p>
        </div>

        <div className="flex flex-col gap-4">
          <p className="txt-compact-small-plus text-ui-fg-base">Info</p>
          <div className="flex items-center justify-between">
            <span className="txt-compact-small text-ui-fg-subtle">Status</span>
            <Badge color={STATUS_COLOR[task.status]} size="2xsmall" rounded="full">
              {STATUS_LABEL[task.status]}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="txt-compact-small text-ui-fg-subtle">Priority</span>
            <Badge color={PRIORITY_COLOR[task.priority]} size="2xsmall" rounded="full">
              {priorityLabel}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="txt-compact-small text-ui-fg-subtle">Assignee</span>
            <div className="flex gap-2 items-center">
              <ColorAvatar member={member} size="xsmall" />
              <span className="txt-compact-small text-ui-fg-base">{member.name}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="txt-compact-small text-ui-fg-subtle">Due date</span>
            <span className={`txt-compact-small ${isOverdue ? "text-ui-fg-error" : "text-ui-fg-base"}`}>
              {formatDate(task.due)}
            </span>
          </div>
        </div>

        {activity.length > 0 && (
          <div className="flex flex-col gap-4">
            <p className="txt-compact-small-plus text-ui-fg-base">Activity log</p>
            {activity.map((a, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 items-center">
                    <ColorAvatar member={a.member} size="xsmall" />
                    <span className="txt-compact-small-plus text-ui-fg-base">{a.member.name}</span>
                  </div>
                  <span className="txt-compact-xsmall text-ui-fg-subtle">{a.time}</span>
                </div>
                <p className="txt-small text-ui-fg-subtle">{a.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col items-center shrink-0 w-full">
        <div className="bg-ui-border-base h-px w-full" />
        <div className="flex gap-2 items-center justify-end px-6 py-4 w-full">
          <Button variant="secondary" size="small" onClick={onEdit}>Edit</Button>
          <Button variant="primary" size="small" onClick={onComplete}>Mark complete</Button>
        </div>
      </div>
    </div>
    </div>
  );
}

"use client";

// source: artifacts/transformed/task-details-modal.tsx
// step 2: imports added, hardcoded task/member/activity → props
// noise: relative/shrink-0 stripped where safe

import { Button, IconButton, Badge, Input, Label, Textarea, Select } from "@medusajs/ui";
import { XMark } from "@medusajs/icons";
import { ColorAvatar } from "@/components/ColorAvatar";
import type { Member } from "@/types";

interface InfoRow {
  label: string;
  value: string;
  badge?: { color: "grey" | "orange" | "red" | "purple" | "blue" | "green" };
  error?: boolean;
  assignee?: Pick<Member, "initials" | "avatarBg" | "avatarText" | "name">;
}

interface ActivityEntry {
  member: Pick<Member, "initials" | "avatarBg" | "avatarText" | "name">;
  time: string;
  text: string;
}

interface TaskDetailsModalProps {
  title: string;
  desc: string;
  info: InfoRow[];
  activity: ActivityEntry[];
  primaryAction: string;
  secondaryAction: string;
  onClose?: () => void;
  onPrimary?: () => void;
  onSecondary?: () => void;
}

export function TaskDetailsModal({ title, desc, info, activity, primaryAction, secondaryAction, onClose, onPrimary, onSecondary }: TaskDetailsModalProps) {
  return (
    <div className="flex flex-col overflow-clip rounded-[12px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_8px_16px_0px_rgba(0,0,0,0.08),0px_16px_32px_0px_rgba(0,0,0,0.08)] w-full h-full">
      <div className="flex flex-col items-center w-full">
        <div className="flex items-center justify-between px-6 py-2 w-full">
          <p className="flex-1 min-w-[1px] text-ui-fg-base font-medium text-[14px] leading-[20px]">Task details</p>
          <div className="flex gap-1 items-center">
            <div className="bg-ui-bg-field border border-ui-border-base flex flex-col h-4 items-center justify-center overflow-clip px-1 rounded">
              <p className="text-ui-fg-subtle text-center txt-compact-xsmall-plus">Esc</p>
            </div>
            <IconButton size="small" variant="transparent" onClick={onClose}>
              <XMark />
            </IconButton>
          </div>
        </div>
        <div className="bg-ui-border-base h-px w-full" />
      </div>
      <div className="flex flex-1 flex-col gap-6 min-h-[1px] pb-6 pt-4 px-6 w-full">
        <div className="flex flex-col gap-2 w-full">
          <p className="text-ui-fg-base w-full font-medium text-[18px] leading-[28px]">{title}</p>
          <p className="text-ui-fg-subtle w-full txt-small">{desc}</p>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <p className="text-ui-fg-base txt-compact-small-plus">Info</p>
          {info.map((row) => (
            <div key={row.label} className="flex items-center justify-between w-full">
              <p className="text-ui-fg-subtle txt-compact-small">{row.label}</p>
              {row.badge ? (
                <Badge color={row.badge.color} size="2xsmall" rounded="full">{row.value}</Badge>
              ) : row.assignee ? (
                <div className="flex gap-2 items-center">
                  <ColorAvatar member={row.assignee} size="xsmall" />
                  <p className="text-ui-fg-base txt-compact-small">{row.assignee.name}</p>
                </div>
              ) : (
                <p className={`txt-compact-small ${row.error ? "text-ui-fg-error" : "text-ui-fg-base"}`}>{row.value}</p>
              )}
            </div>
          ))}
        </div>
        {activity.length > 0 && (
          <div className="flex flex-col gap-4 w-full">
            <p className="text-ui-fg-base txt-compact-small-plus">Activity log</p>
            {activity.map((a, i) => (
              <div key={i} className="flex flex-col gap-1 w-full">
                <div className="flex items-center justify-between w-full">
                  <div className="flex gap-2 items-center">
                    <ColorAvatar member={a.member} size="xsmall" />
                    <p className="text-ui-fg-base txt-compact-small-plus">{a.member.name}</p>
                  </div>
                  <p className="text-ui-fg-subtle txt-compact-xsmall">{a.time}</p>
                </div>
                <p className="text-ui-fg-subtle w-full txt-small">{a.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col items-center w-full">
        <div className="bg-ui-border-base h-px w-full" />
        <div className="flex gap-2 items-center justify-end px-6 py-4 w-full">
          <Button variant="secondary" size="small" onClick={onSecondary}>{secondaryAction}</Button>
          <Button variant="primary" size="small" onClick={onPrimary}>{primaryAction}</Button>
        </div>
      </div>
    </div>
  );
}

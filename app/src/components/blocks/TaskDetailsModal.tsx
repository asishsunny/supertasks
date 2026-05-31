import { Button, IconButton, Badge, Kbd } from "@medusajs/ui";
import { XMark } from "@medusajs/icons";
import { ColorAvatar } from "@/components/ColorAvatar";
import type { Member } from "@/types";

export interface InfoRow {
  label: string;
  value: string;
  badge?: { color: "grey" | "orange" | "red" | "purple" | "blue" | "green" };
  error?: boolean;
  assignee?: Pick<Member, "initials" | "avatarBg" | "avatarText" | "name">;
}

export interface ActivityEntry {
  member: Pick<Member, "initials" | "avatarBg" | "avatarText" | "name">;
  time: string;
  text: string;
}

export interface TaskDetailsModalProps {
  heading: string;
  title: string;
  desc: string;
  infoLabel: string;
  info: InfoRow[];
  activityLabel: string;
  activity: ActivityEntry[];
  primaryAction: string;
  secondaryAction: string;
  onClose?: () => void;
  onPrimary?: () => void;
  onSecondary?: () => void;
}

export function TaskDetailsModal({ heading, title, desc, infoLabel, info, activityLabel, activity, primaryAction, secondaryAction, onClose, onPrimary, onSecondary }: TaskDetailsModalProps) {
  return (
    <div className="flex flex-col overflow-clip rounded-xl shadow-elevation-card-rest w-full">
      <div className="flex items-center justify-between px-6 py-2 w-full">
        <p className="flex-1 min-w-[1px] text-ui-fg-base txt-compact-medium-plus">{heading}</p>
        <div className="flex gap-1 items-center">
          <Kbd>Esc</Kbd>
          <IconButton size="small" variant="transparent" onClick={onClose} aria-label="Close modal">
            <XMark />
          </IconButton>
        </div>
      </div>
      <div className="h-px bg-ui-border-base" />
      <div className="flex flex-1 flex-col gap-6 min-h-[1px] overflow-y-auto pb-6 pt-4 px-6 w-full">
        <div className="flex flex-col gap-2 w-full">
          <p className="text-ui-fg-base w-full font-medium text-[18px] leading-[28px]">{title}</p>
          <p className="text-ui-fg-subtle w-full txt-small">{desc}</p>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <p className="text-ui-fg-base txt-compact-small-plus">{infoLabel}</p>
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
            <p className="text-ui-fg-base txt-compact-small-plus">{activityLabel}</p>
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
      <div className="h-px bg-ui-border-base" />
      <div className="flex gap-2 items-center justify-end px-6 py-4 w-full">
        <Button variant="secondary" size="small" onClick={onSecondary}>{secondaryAction}</Button>
        <Button variant="primary" size="small" onClick={onPrimary}>{primaryAction}</Button>
      </div>
    </div>
  );
}

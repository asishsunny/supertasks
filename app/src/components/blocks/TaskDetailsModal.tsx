// source: artifacts/transformed/task-details-modal-templatized.tsx
// adapt: info → InfoRow[] (discriminated union), activity → ActivityEntry[], hardcoded text → props

import { Button, IconButton, Kbd } from "@medusajs/ui";
import { XMark } from "@medusajs/icons";
import { ColorAvatar } from "@/components/ColorAvatar";
import type { Member } from "@/types";

export interface BadgeInfoRow {
  type: "badge";
  label: string;
  badgeLabel: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
}

export interface AvatarInfoRow {
  type: "avatar";
  label: string;
  member: Pick<Member, "initials" | "avatarBg" | "avatarText">;
  name: string;
}

export interface TextInfoRow {
  type: "text";
  label: string;
  value: string;
  error?: boolean;
}

export type InfoRow = BadgeInfoRow | AvatarInfoRow | TextInfoRow;

export interface ActivityEntry {
  member: Pick<Member, "initials" | "avatarBg" | "avatarText">;
  name: string;
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

function InfoRowItem({ row }: { row: InfoRow }) {
  switch (row.type) {
    case "badge":
      return (
        <div className="flex items-center justify-between w-full">
          <p className="text-ui-fg-subtle txt-compact-small">{row.label}</p>
          <div
            className="flex gap-0.5 h-5 items-center justify-center px-1.5 py-px rounded-full"
            style={{
              backgroundColor: row.badgeBg,
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: row.badgeBorder,
            }}
          >
            <p
              className="text-center txt-compact-xsmall-plus"
              style={{ color: row.badgeText }}
            >
              {row.badgeLabel}
            </p>
          </div>
        </div>
      );
    case "avatar":
      return (
        <div className="flex items-center justify-between w-full">
          <p className="text-ui-fg-subtle txt-compact-small">{row.label}</p>
          <div className="flex gap-2 items-center">
            <ColorAvatar member={row.member} size="xsmall" />
            <p className="text-ui-fg-base txt-compact-small">{row.name}</p>
          </div>
        </div>
      );
    case "text":
      return (
        <div className="flex items-center justify-between w-full txt-compact-small">
          <p className="text-ui-fg-subtle">{row.label}</p>
          <p className={row.error ? "text-ui-fg-error" : "text-ui-fg-base"}>
            {row.value}
          </p>
        </div>
      );
  }
}

export function TaskDetailsModal({
  heading,
  title,
  desc,
  infoLabel,
  info,
  activityLabel,
  activity,
  primaryAction,
  secondaryAction,
  onClose,
  onPrimary,
  onSecondary,
}: TaskDetailsModalProps) {
  return (
    <div className="flex flex-col overflow-clip rounded-xl shadow-elevation-card-rest w-full h-full">
      {/* Header */}
      <div className="flex flex-col items-center w-full">
        <div className="flex items-center justify-between px-6 py-2 w-full">
          <p className="flex-1 min-w-[1px] text-ui-fg-base txt-compact-medium-plus">
            {heading}
          </p>
          <div className="flex gap-1 items-center">
            <Kbd>Esc</Kbd>
            <IconButton
              size="small"
              variant="transparent"
              aria-label="Close modal"
              onClick={onClose}
            >
              <XMark />
            </IconButton>
          </div>
        </div>
        <div className="h-px bg-ui-border-base w-full" />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-6 min-h-[1px] pb-6 pt-4 px-6 w-full overflow-y-auto">
        {/* Title + Description */}
        <div className="flex flex-col gap-2 w-full">
          <p className="text-ui-fg-base w-full font-medium text-[18px] leading-[28px]">
            {title}
          </p>
          <p className="text-ui-fg-subtle w-full txt-small">{desc}</p>
        </div>

        {/* Info section */}
        <div className="flex flex-col gap-4 w-full">
          <p className="text-ui-fg-base txt-compact-small-plus">{infoLabel}</p>
          {info.map((row, i) => (
            <InfoRowItem key={i} row={row} />
          ))}
        </div>

        {/* Activity log */}
        <div className="flex flex-col gap-4 w-full">
          <p className="text-ui-fg-base txt-compact-small-plus">
            {activityLabel}
          </p>
          {activity.map((entry, i) => (
            <div key={i} className="flex flex-col gap-1 w-full">
              <div className="flex items-center justify-between w-full">
                <div className="flex gap-2 items-center">
                  <ColorAvatar member={entry.member} size="xsmall" />
                  <p className="text-ui-fg-base txt-compact-small-plus">
                    {entry.name}
                  </p>
                </div>
                <p className="text-ui-fg-subtle txt-compact-xsmall">
                  {entry.time}
                </p>
              </div>
              <p className="text-ui-fg-subtle w-full txt-small">
                {entry.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col items-center w-full">
        <div className="h-px bg-ui-border-base w-full" />
        <div className="flex gap-2 items-center justify-end px-6 py-4 w-full">
          <Button variant="secondary" size="small" onClick={onSecondary}>
            {secondaryAction}
          </Button>
          <Button variant="primary" size="small" onClick={onPrimary}>
            {primaryAction}
          </Button>
        </div>
      </div>
    </div>
  );
}

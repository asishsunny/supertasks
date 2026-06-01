import { Button, IconButton } from "@medusajs/ui";
import { EllipsisHorizontal } from "@medusajs/icons";
import { ColorAvatar } from "@/components/ColorAvatar";
import type { Member } from "@/types";

export interface InfoRow {
  label: string;
  value: string;
  type: "status" | "assignee" | "date";
  overdue?: boolean;
  statusColor?: {
    bg: string;
    border: string;
    text: string;
  };
  member?: Pick<Member, "initials" | "avatarBg" | "avatarText">;
}

export interface ActivityEntry {
  member: Pick<Member, "initials" | "avatarBg" | "avatarText">;
  name: string;
  time: string;
  text: string;
}

export interface TaskDetailsModalProps {
  title: string;
  headerLabel: string;
  description: string;
  infoLabel: string;
  activityLabel: string;
  infoRows: InfoRow[];
  activity: ActivityEntry[];
  primaryAction: string;
  secondaryAction: string;
  escLabel: string;
  onClose?: () => void;
  onEdit?: () => void;
  onComplete?: () => void;
  onMore?: () => void;
}

export default function TaskDetailsModal({
  title,
  headerLabel,
  description,
  infoLabel,
  activityLabel,
  infoRows,
  activity,
  primaryAction,
  secondaryAction,
  escLabel,
  onClose,
  onEdit,
  onComplete,
  onMore,
}: TaskDetailsModalProps) {
  return (
    <div className="flex flex-col overflow-clip rounded-[12px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_8px_16px_0px_rgba(0,0,0,0.08),0px_16px_32px_0px_rgba(0,0,0,0.08)] w-full h-full">
      {/* Header */}
      <div className="flex flex-col items-center shrink-0 w-full">
        <div className="flex items-center justify-between px-6 py-2 w-full">
          <p className="flex-1 min-w-[1px] text-ui-fg-base txt-compact-medium-plus">
            {headerLabel}
          </p>
          <div className="flex gap-1 items-center">
            <div
              className="bg-ui-bg-field border border-ui-border-base flex flex-col h-4 items-center justify-center overflow-clip px-1 rounded"
              role="button"
              tabIndex={0}
              onClick={onClose}
              onKeyDown={(e) => e.key === "Enter" && onClose?.()}
              aria-label={escLabel}
            >
              <p className="text-ui-fg-subtle text-center txt-compact-xsmall-plus">
                {escLabel}
              </p>
            </div>
            <IconButton
              size="small"
              variant="transparent"
              onClick={onMore}
              aria-label="More options"
            >
              <EllipsisHorizontal />
            </IconButton>
          </div>
        </div>
        <div className="bg-ui-border-base h-px w-full" />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-6 min-h-[1px] pb-6 pt-4 px-6 w-full">
        {/* Title & Description */}
        <div className="flex flex-col gap-2 w-full">
          <p className="text-ui-fg-base w-full font-medium text-[18px] leading-[28px]">
            {title}
          </p>
          <p className="text-ui-fg-subtle w-full txt-small">{description}</p>
        </div>

        {/* Info rows */}
        <div className="flex flex-col gap-4 w-full">
          <p className="text-ui-fg-base txt-compact-small-plus">{infoLabel}</p>
          {infoRows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between w-full"
            >
              <p className="text-ui-fg-subtle txt-compact-small">
                {row.label}
              </p>
              {row.type === "status" && row.statusColor && (
                <div
                  className="flex h-5 items-center justify-center px-1.5 py-px rounded-full"
                  style={{
                    backgroundColor: row.statusColor.bg,
                    borderWidth: 1,
                    borderColor: row.statusColor.border,
                  }}
                >
                  <p
                    className="text-center txt-compact-xsmall-plus"
                    style={{ color: row.statusColor.text }}
                  >
                    {row.value}
                  </p>
                </div>
              )}
              {row.type === "assignee" && row.member && (
                <div className="flex gap-2 items-center">
                  <ColorAvatar member={row.member} size="xsmall" />
                  <p className="text-ui-fg-base txt-compact-small">
                    {row.value}
                  </p>
                </div>
              )}
              {row.type === "date" && (
                <p
                  className={`txt-compact-small ${
                    row.overdue ? "text-ui-fg-error" : "text-ui-fg-base"
                  }`}
                >
                  {row.value}
                </p>
              )}
            </div>
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
      <div className="flex flex-col items-center shrink-0 w-full">
        <div className="bg-ui-border-base h-px w-full" />
        <div className="flex gap-2 items-center justify-end px-6 py-4 w-full">
          <Button variant="secondary" size="small" onClick={onEdit}>
            {secondaryAction}
          </Button>
          <Button variant="primary" size="small" onClick={onComplete}>
            {primaryAction}
          </Button>
        </div>
      </div>
    </div>
  );
}

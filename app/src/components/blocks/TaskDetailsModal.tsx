import { Button, IconButton, Kbd } from "@medusajs/ui";
import { XMark } from "@medusajs/icons";
import { ColorAvatar } from "@/components/ColorAvatar";
import type { Member } from "@/types";

export interface TaskInfoRow {
  label: string;
  value: string;
  type: "status" | "assignee" | "text";
  statusColor?: {
    bg: string;
    border: string;
    text: string;
  };
  member?: Pick<Member, "initials" | "avatarBg" | "avatarText">;
  isError?: boolean;
}

export interface TaskActivity {
  member: Pick<Member, "initials" | "avatarBg" | "avatarText">;
  name: string;
  time: string;
  text: string;
}

export interface TaskDetailsModalProps {
  headerTitle: string;
  title: string;
  description: string;
  infoHeading: string;
  infoRows: TaskInfoRow[];
  activityHeading: string;
  activities: TaskActivity[];
  primaryAction: string;
  secondaryAction: string;
  onClose?: () => void;
  onPrimary?: () => void;
  onSecondary?: () => void;
}

export function TaskDetailsModal({
  headerTitle,
  title,
  description,
  infoHeading,
  infoRows,
  activityHeading,
  activities,
  primaryAction,
  secondaryAction,
  onClose,
  onPrimary,
  onSecondary,
}: TaskDetailsModalProps) {
  return (
    <div className="flex flex-col h-full overflow-clip rounded-[12px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_8px_16px_0px_rgba(0,0,0,0.08),0px_16px_32px_0px_rgba(0,0,0,0.08)] max-w-[480px] w-full">
      {/* Header */}
      <div className="flex flex-col items-center w-full">
        <div className="flex items-center justify-between px-6 py-2 w-full">
          <p className="flex-1 min-w-[1px] text-ui-fg-base txt-compact-medium-plus">
            {headerTitle}
          </p>
          <div className="flex gap-1 items-center">
            <Kbd>Esc</Kbd>
            <IconButton
              size="small"
              variant="transparent"
              onClick={onClose}
              aria-label={headerTitle}
            >
              <XMark />
            </IconButton>
          </div>
        </div>
        <div className="h-px bg-ui-border-base w-full" />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-6 min-h-[1px] pb-6 pt-4 px-6 w-full overflow-y-auto">
        {/* Title + description */}
        <div className="flex flex-col gap-2 w-full">
          <p className="text-ui-fg-base w-full font-medium text-[18px] leading-[28px]">
            {title}
          </p>
          <p className="text-ui-fg-subtle w-full txt-small">{description}</p>
        </div>

        {/* Info section */}
        <div className="flex flex-col gap-4 w-full">
          <p className="text-ui-fg-base txt-compact-small-plus">
            {infoHeading}
          </p>
          {infoRows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between w-full txt-compact-small"
            >
              <p className="text-ui-fg-subtle">{row.label}</p>
              {row.type === "status" && row.statusColor && (
                <div
                  className="flex gap-0.5 h-5 items-center justify-center px-1.5 py-px rounded-full border"
                  style={{
                    backgroundColor: row.statusColor.bg,
                    borderColor: row.statusColor.border,
                    color: row.statusColor.text,
                  }}
                >
                  <p className="text-center txt-compact-xsmall-plus">
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
              {row.type === "text" && (
                <p
                  className={
                    row.isError
                      ? "text-ui-fg-error"
                      : "text-ui-fg-base"
                  }
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
            {activityHeading}
          </p>
          {activities.map((activity, i) => (
            <div key={i} className="flex flex-col gap-1 w-full">
              <div className="flex items-center justify-between w-full">
                <div className="flex gap-2 items-center">
                  <ColorAvatar member={activity.member} size="xsmall" />
                  <p className="text-ui-fg-base txt-compact-small-plus">
                    {activity.name}
                  </p>
                </div>
                <p className="text-ui-fg-subtle txt-compact-xsmall">
                  {activity.time}
                </p>
              </div>
              <p className="text-ui-fg-subtle w-full txt-small">
                {activity.text}
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

import { Kbd, IconButton, Button } from "@medusajs/ui";
import { XMark } from "@medusajs/icons";
import { ColorAvatar } from "@/components/ColorAvatar";
import type { Member } from "@/types";

interface InfoRow {
  label: string;
  value: string;
  type: "status" | "assignee" | "date";
  overdue?: boolean;
  statusColor?: { bg: string; border: string; text: string };
  member?: Pick<Member, "initials" | "avatarBg" | "avatarText">;
}

interface ActivityEntry {
  member: Pick<Member, "initials" | "avatarBg" | "avatarText">;
  name: string;
  time: string;
  text: string;
}

export interface TaskDetailsModalProps {
  title?: string;
  headerLabel?: string;
  description?: string;
  infoLabel?: string;
  infoRows?: InfoRow[];
  activityLabel?: string;
  activity?: ActivityEntry[];
  primaryAction?: string;
  secondaryAction?: string;
  escLabel?: string;
  onClose?: () => void;
  onEdit?: () => void;
  onComplete?: () => void;
  onMore?: () => void;
}

const DEFAULT_TITLE = "Task details";
const DEFAULT_HEADER_LABEL = "Task details";
const DEFAULT_DESCRIPTION = "Revamp first-run experience for new users";
const DEFAULT_INFO_LABEL = "Info";
const DEFAULT_ACTIVITY_LABEL = "Activity log";
const DEFAULT_PRIMARY_ACTION = "Mark complete";
const DEFAULT_SECONDARY_ACTION = "Edit";
const DEFAULT_ESC_LABEL = "Esc";

export default function TaskDetailsModal({
  title = DEFAULT_TITLE,
  headerLabel = DEFAULT_HEADER_LABEL,
  description = DEFAULT_DESCRIPTION,
  infoLabel = DEFAULT_INFO_LABEL,
  infoRows,
  activityLabel = DEFAULT_ACTIVITY_LABEL,
  activity,
  primaryAction = DEFAULT_PRIMARY_ACTION,
  secondaryAction = DEFAULT_SECONDARY_ACTION,
  escLabel = DEFAULT_ESC_LABEL,
  onClose,
  onEdit,
  onComplete,
  onMore,
}: TaskDetailsModalProps) {
  return (
    <div className="flex flex-col h-full overflow-clip relative rounded-[12px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_8px_16px_0px_rgba(0,0,0,0.08),0px_16px_32px_0px_rgba(0,0,0,0.08)] shrink-0 max-w-[480px] w-full">
      <div className="flex flex-col items-center relative shrink-0 w-full">
        <div className="flex items-center justify-between px-6 py-2 relative shrink-0 w-full">
          <p className="flex-1 min-w-[1px] relative text-ui-fg-base font-medium text-[14px] leading-[20px]">
            {headerLabel}
          </p>
          <div className="flex gap-1 items-center relative shrink-0">
            <Kbd>{escLabel}</Kbd>
            <IconButton size="small" variant="transparent" onClick={onClose}><XMark /></IconButton>
          </div>
        </div>
        <div className="h-px bg-ui-border-base" />
      </div>
      <div className="flex flex-1 flex-col gap-6 min-h-[1px] pb-6 pt-4 px-6 relative w-full">
        <div className="flex flex-col gap-2 relative shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base w-full font-medium text-[18px] leading-[28px]">
            {title}
          </p>
          <p className="relative shrink-0 text-ui-fg-subtle w-full txt-small">
            {description}
          </p>
        </div>
        <div className="flex flex-col gap-4 relative shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">
            {infoLabel}
          </p>
          {infoRows?.map((row) => (
            <div key={row.label} className="flex items-center justify-between relative shrink-0 w-full">
              <p className="relative shrink-0 text-ui-fg-subtle txt-compact-small">
                {row.label}
              </p>
              {row.type === "status" && row.statusColor ? (
                <div
                  className="flex gap-0.5 h-5 items-center justify-center px-1.5 py-px relative rounded-full shrink-0 border"
                  style={{ backgroundColor: row.statusColor.bg, borderColor: row.statusColor.border }}
                >
                  <p className="relative shrink-0 text-center txt-compact-xsmall-plus" style={{ color: row.statusColor.text }}>
                    {row.value}
                  </p>
                </div>
              ) : row.type === "assignee" && row.member ? (
                <div className="flex gap-2 items-center relative shrink-0">
                  <ColorAvatar member={row.member} size="xsmall" />
                  <p className="relative shrink-0 text-ui-fg-base txt-compact-small">
                    {row.value}
                  </p>
                </div>
              ) : (
                <p className={`relative shrink-0 txt-compact-small ${row.overdue ? "text-ui-fg-error" : "text-ui-fg-base"}`}>
                  {row.value}
                </p>
              )}
            </div>
          ))}
        </div>
        {activity && activity.length > 0 && (
          <div className="flex flex-col gap-4 relative shrink-0 w-full">
            <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">
              {activityLabel}
            </p>
            {activity.map((a, i) => (
              <div key={i} className="flex flex-col gap-1 relative shrink-0 w-full">
                <div className="flex items-center justify-between relative shrink-0 w-full">
                  <div className="flex gap-2 items-center relative shrink-0">
                    <ColorAvatar member={a.member} size="xsmall" />
                    <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">
                      {a.name}
                    </p>
                  </div>
                  <p className="relative shrink-0 text-ui-fg-subtle txt-compact-xsmall">
                    {a.time}
                  </p>
                </div>
                <p className="relative shrink-0 text-ui-fg-subtle w-full txt-small">
                  {a.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col items-center relative shrink-0 w-full">
        <div className="h-px bg-ui-border-base" />
        <div className="flex gap-2 items-center justify-end px-6 py-4 relative shrink-0 w-full">
          <Button variant="secondary" size="small" onClick={onEdit}>{secondaryAction}</Button>
          <Button variant="primary" size="small" onClick={onComplete}>{primaryAction}</Button>
        </div>
      </div>
    </div>
  );
}

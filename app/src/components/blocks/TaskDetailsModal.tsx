import { Badge, Button, IconButton, Kbd } from "@medusajs/ui";
import { XMark } from "@medusajs/icons";
import { ColorAvatar } from "@/components/ColorAvatar";
import type { Member, Status, Priority } from "@/types";
import type { BadgeColor } from "@/lib/constants";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface InfoRow {
  label: string;
  type: "status" | "priority" | "assignee" | "date";
  value: string;
  color?: BadgeColor;
  member?: Pick<Member, "initials" | "avatarBg" | "avatarText">;
  isOverdue?: boolean;
}

export interface ActivityEntry {
  member: Pick<Member, "initials" | "avatarBg" | "avatarText" | "name">;
  time: string;
  text: string;
}

export interface TaskDetailsModalProps {
  title?: string;
  description?: string;
  infoHeading?: string;
  activityHeading?: string;
  infoRows?: InfoRow[];
  activityEntries?: ActivityEntry[];
  primaryAction?: string;
  secondaryAction?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
  onClose?: () => void;
}

/* ------------------------------------------------------------------ */
/*  Default Figma data                                                 */
/* ------------------------------------------------------------------ */

const DEFAULT_INFO_ROWS: InfoRow[] = [
  { label: "Status", type: "status", value: "In Progress", color: "blue" },
  { label: "Priority", type: "priority", value: "High", color: "red" },
  {
    label: "Assignee",
    type: "assignee",
    value: "Sara Nelson",
    member: { initials: "S", avatarBg: "tag-blue-bg", avatarText: "tag-blue-text" },
  },
  { label: "Due date", type: "date", value: "May 26, 2026", isOverdue: true },
  { label: "Created", type: "date", value: "Jan 5, 2026" },
];

const DEFAULT_ACTIVITY: ActivityEntry[] = [
  {
    member: { initials: "P", avatarBg: "tag-orange-bg", avatarText: "tag-orange-text", name: "Priya Rao" },
    time: "2h ago",
    text: "Moving this to in progress — starting the research phase today.",
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-renderers                                                      */
/* ------------------------------------------------------------------ */

function InfoRowValue({ row }: { row: InfoRow }) {
  if (row.type === "status" || row.type === "priority") {
    return (
      <Badge size="2xsmall" color={row.color ?? "grey"} rounded="full">
        {row.value}
      </Badge>
    );
  }
  if (row.type === "assignee" && row.member) {
    return (
      <div className="flex gap-2 items-center relative shrink-0">
        <ColorAvatar member={row.member} size="xsmall" />
        <p className="relative shrink-0 text-ui-fg-base txt-compact-small">
          {row.value}
        </p>
      </div>
    );
  }
  return (
    <p className={`relative shrink-0 ${row.isOverdue ? "text-ui-fg-error" : "text-ui-fg-base"} txt-compact-small`}>
      {row.value}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function TaskDetailsModal({
  title = "Update onboarding flow",
  description = "Revamp first-run experience for new users",
  infoHeading = "Info",
  activityHeading = "Activity log",
  infoRows = DEFAULT_INFO_ROWS,
  activityEntries = DEFAULT_ACTIVITY,
  primaryAction = "Mark complete",
  secondaryAction = "Edit",
  onPrimary,
  onSecondary,
  onClose,
}: TaskDetailsModalProps) {
  return (
    <div className="flex flex-col h-full overflow-clip relative rounded-[12px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_8px_16px_0px_rgba(0,0,0,0.08),0px_16px_32px_0px_rgba(0,0,0,0.08)] shrink-0 max-w-[480px] w-full">
      {/* Header */}
      <div className="flex flex-col items-center relative shrink-0 w-full">
        <div className="flex items-center justify-between px-6 py-2 relative shrink-0 w-full">
          <p className="flex-1 min-w-[1px] relative text-ui-fg-base txt-compact-medium-plus">
            Task details
          </p>
          <div className="flex gap-1 items-center relative shrink-0">
            <Kbd>Esc</Kbd>
            <IconButton size="small" variant="transparent" onClick={onClose}>
              <XMark />
            </IconButton>
          </div>
        </div>
        <div className="h-px bg-ui-border-base" />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-6 min-h-[1px] pb-6 pt-4 px-6 relative w-full">
        {/* Title + description */}
        <div className="flex flex-col gap-2 relative shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base w-full font-medium text-[18px] leading-[28px]">
            {title}
          </p>
          <p className="relative shrink-0 text-ui-fg-subtle w-full txt-small">
            {description}
          </p>
        </div>

        {/* Info rows */}
        <div className="flex flex-col gap-4 relative shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">
            {infoHeading}
          </p>
          {infoRows.map((row, i) => (
            <div
              key={i}
              className="flex items-center justify-between relative shrink-0 w-full txt-compact-small"
            >
              <p className="relative shrink-0 text-ui-fg-subtle txt-compact-small">
                {row.label}
              </p>
              <InfoRowValue row={row} />
            </div>
          ))}
        </div>

        {/* Activity log */}
        <div className="flex flex-col gap-4 relative shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">
            {activityHeading}
          </p>
          {activityEntries.map((entry, i) => (
            <div key={i} className="flex flex-col gap-1 relative shrink-0 w-full">
              <div className="flex items-center justify-between relative shrink-0 w-full">
                <div className="flex gap-2 items-center relative shrink-0">
                  <ColorAvatar member={entry.member} size="xsmall" />
                  <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">
                    {entry.member.name}
                  </p>
                </div>
                <p className="relative shrink-0 text-ui-fg-subtle txt-compact-xsmall">
                  {entry.time}
                </p>
              </div>
              <p className="relative shrink-0 text-ui-fg-subtle w-full txt-small">
                {entry.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col items-center relative shrink-0 w-full">
        <div className="h-px bg-ui-border-base" />
        <div className="flex gap-2 items-center justify-end px-6 py-4 relative shrink-0 w-full">
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

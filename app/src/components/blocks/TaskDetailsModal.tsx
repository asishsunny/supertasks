import { Button, IconButton, Kbd } from "@medusajs/ui"
import { XMark } from "@medusajs/icons"
import { ColorAvatar } from "@/components/ColorAvatar"

interface InfoRow {
  label: string
  value: string
  type: "status" | "assignee" | "date"
  overdue?: boolean
  statusColor?: { bg: string; border: string; text: string }
  member?: { initials: string; avatarBg: string; avatarText: string }
}

interface ActivityEntry {
  member: { initials: string; avatarBg: string; avatarText: string }
  name: string
  time: string
  text: string
}

export interface TaskDetailsModalProps {
  title?: string
  headerLabel?: string
  description?: string
  infoLabel?: string
  infoRows?: InfoRow[]
  activityLabel?: string
  activity?: ActivityEntry[]
  primaryAction?: string
  secondaryAction?: string
  escLabel?: string
}

const DEFAULT_INFO_ROWS: InfoRow[] = [
  {
    label: "Status",
    value: "In Progress",
    type: "status",
    statusColor: {
      bg: "rgba(59,130,246,0.12)",
      border: "#bfdbfe",
      text: "#1e40af",
    },
  },
  {
    label: "Priority",
    value: "High",
    type: "status",
    statusColor: {
      bg: "rgba(244,63,94,0.12)",
      border: "#fecdd3",
      text: "#9f1239",
    },
  },
  {
    label: "Assignee",
    value: "Sara Nelson",
    type: "assignee",
    member: { initials: "SN", avatarBg: "tag-blue-bg", avatarText: "tag-blue-text" },
  },
  {
    label: "Due date",
    value: "May 26, 2026",
    type: "date",
    overdue: true,
  },
  {
    label: "Created",
    value: "Jan 5, 2026",
    type: "date",
    overdue: false,
  },
]

const DEFAULT_ACTIVITY: ActivityEntry[] = [
  {
    member: { initials: "PR", avatarBg: "tag-purple-bg", avatarText: "tag-purple-text" },
    name: "Priya Rao",
    time: "2h ago",
    text: "Moving this to in progress — starting the research phase today.",
  },
  {
    member: { initials: "SN", avatarBg: "tag-blue-bg", avatarText: "tag-blue-text" },
    name: "Sara Nelson",
    time: "Yesterday",
    text: "Added initial wireframes to the shared drive. Let me know if you have feedback.",
  },
]

export default function TaskDetailsModal({
  title = "Update onboarding flow",
  headerLabel = "Task details",
  description = "Revamp first-run experience for new users",
  infoLabel = "Info",
  infoRows = DEFAULT_INFO_ROWS,
  activityLabel = "Activity log",
  activity = DEFAULT_ACTIVITY,
  primaryAction = "Mark complete",
  secondaryAction = "Edit",
  escLabel = "Esc",
}: TaskDetailsModalProps) {
  return (
    <div className="flex flex-col h-full overflow-clip relative rounded-[12px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_8px_16px_0px_rgba(0,0,0,0.08),0px_16px_32px_0px_rgba(0,0,0,0.08)] shrink-0 max-w-[480px] w-full">
      {/* Header */}
      <div className="flex flex-col items-center relative shrink-0 w-full">
        <div className="flex items-center justify-between px-6 py-2 relative shrink-0 w-full">
          <p className="flex-1 min-w-[1px] relative text-ui-fg-base txt-compact-medium-plus">
            {headerLabel}
          </p>
          <div className="flex gap-1 items-center relative shrink-0">
            <Kbd>{escLabel}</Kbd>
            <IconButton size="small" variant="transparent">
              <XMark />
            </IconButton>
          </div>
        </div>
        <div className="h-px bg-ui-border-base" />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-6 min-h-[1px] pb-6 pt-4 px-6 relative w-full">
        {/* Title + Description */}
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
            {infoLabel}
          </p>
          {infoRows.map((row, i) => {
            if (row.type === "status" && row.statusColor) {
              return (
                <div
                  key={i}
                  className="flex items-center justify-between relative shrink-0 w-full"
                >
                  <p className="relative shrink-0 text-ui-fg-subtle txt-compact-small">
                    {row.label}
                  </p>
                  <div
                    className="flex gap-0.5 h-5 items-center justify-center px-1.5 py-px relative rounded-full shrink-0 border"
                    style={{
                      backgroundColor: row.statusColor.bg,
                      borderColor: row.statusColor.border,
                    }}
                  >
                    <p
                      className="relative shrink-0 text-center txt-compact-xsmall-plus"
                      style={{ color: row.statusColor.text }}
                    >
                      {row.value}
                    </p>
                  </div>
                </div>
              )
            }
            if (row.type === "assignee" && row.member) {
              return (
                <div
                  key={i}
                  className="flex items-center justify-between relative shrink-0 w-full"
                >
                  <p className="relative shrink-0 text-ui-fg-subtle txt-compact-small">
                    {row.label}
                  </p>
                  <div className="flex gap-2 items-center relative shrink-0">
                    <ColorAvatar member={row.member} size="xsmall" />
                    <p className="relative shrink-0 text-ui-fg-base txt-compact-small">
                      {row.value}
                    </p>
                  </div>
                </div>
              )
            }
            /* date */
            return (
              <div
                key={i}
                className="flex items-center justify-between relative shrink-0 w-full txt-compact-small"
              >
                <p className="relative shrink-0 text-ui-fg-subtle">
                  {row.label}
                </p>
                <p
                  className={`relative shrink-0 ${row.overdue ? "text-ui-fg-error" : "text-ui-fg-base"}`}
                >
                  {row.value}
                </p>
              </div>
            )
          })}
        </div>

        {/* Activity log */}
        <div className="flex flex-col gap-4 relative shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">
            {activityLabel}
          </p>
          {activity.map((entry, i) => (
            <div
              key={i}
              className="flex flex-col gap-1 relative shrink-0 w-full"
            >
              <div className="flex items-center justify-between relative shrink-0 w-full">
                <div className="flex gap-2 items-center relative shrink-0">
                  <ColorAvatar member={entry.member} size="xsmall" />
                  <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">
                    {entry.name}
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
          <Button variant="secondary" size="small">
            {secondaryAction}
          </Button>
          <Button variant="primary" size="small">
            {primaryAction}
          </Button>
        </div>
      </div>
    </div>
  )
}

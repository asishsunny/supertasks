import { Kbd, IconButton, Button } from "@medusajs/ui";
import { XMark } from "@medusajs/icons";
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
    // TODO: Agent fills from artifacts/transformed/task-details-modal.tsx
    <div>TODO</div>
  );
}

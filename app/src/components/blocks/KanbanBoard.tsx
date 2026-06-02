import { Badge } from "@medusajs/ui";
import { ColorAvatar } from "@/components/ColorAvatar";

interface KanbanCardData {
  title: string;
  desc: string;
  member: { initials: string; avatarBg: string; avatarText: string };
  firstName: string;
  dueDate: string;
  overdue?: boolean;
  priorityLabel: string;
  priorityColor: string;
}

interface KanbanColumnData {
  status: string;
  label: string;
  count: number;
  statusColor: string;
  cards: KanbanCardData[];
}

export interface KanbanBoardProps {
  columns?: KanbanColumnData[];
}

const DEFAULT_COLUMNS: KanbanColumnData[] = [
  {
    status: "todo", label: "To Do", count: 3, statusColor: "bg-ui-tag-neutral-icon",
    cards: [
      { title: "Customer interviews", desc: "Schedule and run five user feedback sessions", member: { initials: "L", avatarBg: "tag-green-bg", avatarText: "tag-green-text" }, firstName: "Lara", dueDate: "Jun 8", priorityLabel: "Medium", priorityColor: "orange" },
      { title: "Migrate analytics SDK", desc: "Switch from legacy tracker to new events API", member: { initials: "M", avatarBg: "tag-purple-bg", avatarText: "tag-purple-text" }, firstName: "Mark", dueDate: "Jun 6", overdue: true, priorityLabel: "High", priorityColor: "red" },
      { title: "Write API documentation", desc: "Document all public endpoints with examples", member: { initials: "O", avatarBg: "tag-neutral-bg", avatarText: "tag-neutral-text" }, firstName: "Owen", dueDate: "Jun 16", priorityLabel: "Low", priorityColor: "grey" },
    ]
  },
  {
    status: "in_progress", label: "In Progress", count: 2, statusColor: "bg-ui-tag-blue-icon",
    cards: [
      { title: "Update onboarding flow", desc: "Revamp first-run experience for new users", member: { initials: "S", avatarBg: "tag-blue-bg", avatarText: "tag-blue-text" }, firstName: "Sara", dueDate: "May 26", overdue: true, priorityLabel: "High", priorityColor: "red" },
      { title: "Mobile nav refactor", desc: "Replace drawer with bottom tab navigation", member: { initials: "S", avatarBg: "tag-blue-bg", avatarText: "tag-blue-text" }, firstName: "Sara", dueDate: "May 30", overdue: true, priorityLabel: "Medium", priorityColor: "orange" },
    ]
  },
  {
    status: "in_review", label: "In Review", count: 2, statusColor: "bg-ui-tag-orange-icon",
    cards: [
      { title: "Q2 roadmap review", desc: "Align team on priorities for next quarter", member: { initials: "P", avatarBg: "tag-orange-bg", avatarText: "tag-orange-text" }, firstName: "Priya", dueDate: "Jun 1", priorityLabel: "Medium", priorityColor: "orange" },
      { title: "Performance audit", desc: "Profile render times and bundle size", member: { initials: "O", avatarBg: "tag-neutral-bg", avatarText: "tag-neutral-text" }, firstName: "Owen", dueDate: "Jun 11", priorityLabel: "High", priorityColor: "red" },
    ]
  },
  {
    status: "done", label: "Done", count: 2, statusColor: "bg-ui-tag-green-icon",
    cards: [
      { title: "Fix login bug", desc: "Session token not refreshing on mobile browsers", member: { initials: "B", avatarBg: "tag-red-bg", avatarText: "tag-red-text" }, firstName: "Ben", dueDate: "May 22", priorityLabel: "Critical", priorityColor: "purple" },
      { title: "Auth token refresh", desc: "Implement silent refresh with retry logic", member: { initials: "M", avatarBg: "tag-purple-bg", avatarText: "tag-purple-text" }, firstName: "Mark", dueDate: "May 27", priorityLabel: "Critical", priorityColor: "purple" },
    ]
  },
];

export function KanbanBoard({
  columns = DEFAULT_COLUMNS,
}: KanbanBoardProps) {
  return (
    <div className="flex gap-4 items-start w-full h-full">
      {columns.map((col) => (
        <div key={col.status} className="bg-ui-bg-kanban-column flex flex-1 flex-col gap-2 h-full min-w-[1px] p-2 rounded-xl">
          <div className="flex gap-1.5 items-center overflow-clip py-1 w-full">
            <div className={`w-2.5 h-2.5 rounded-sm ${col.statusColor}`} />
            <p className="text-ui-fg-base txt-compact-medium-plus">{col.label}</p>
            <div className="flex-1 h-px min-w-[1px]" />
            <p className="text-ui-fg-muted txt-compact-medium">{col.count}</p>
          </div>
          {col.cards.map((card, i) => (
            <div key={i} className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 rounded-lg w-full">
              <p className="text-ui-fg-base txt-compact-small-plus">{card.title}</p>
              <p className="overflow-hidden text-ui-fg-muted text-ellipsis txt-compact-small">{card.desc}</p>
              <div className="flex gap-1.5 items-center w-full">
                <ColorAvatar member={card.member} size="xsmall" />
                <p className="text-ui-fg-subtle txt-compact-xsmall">{card.firstName}</p>
                <div className="flex-1" />
                <p className={`txt-compact-xsmall ${card.overdue ? "text-ui-fg-error" : "text-ui-fg-subtle"}`}>{card.dueDate}</p>
                <Badge color={card.priorityColor as any} size="2xsmall" rounded="full">{card.priorityLabel}</Badge>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

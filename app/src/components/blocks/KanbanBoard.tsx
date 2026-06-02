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
    status: "todo",
    label: "To Do",
    count: 6,
    statusColor: "bg-ui-tag-neutral-icon",
    cards: [
      {
        title: "Customer interviews",
        desc: "Schedule and run five user feedback sessions",
        member: {
          initials: "L",
          avatarBg: "tag-blue-bg",
          avatarText: "tag-blue-text"
        },
        firstName: "Lara",
        dueDate: "Jun 8",
        priorityLabel: "",
        priorityColor: "grey"
      }
    ]
  },
  {
    status: "in_progress",
    label: "In Progress",
    count: 5,
    statusColor: "bg-ui-tag-blue-icon",
    cards: [
      {
        title: "Update onboarding flow",
        desc: "Revamp first-run experience for new users",
        member: {
          initials: "S",
          avatarBg: "tag-blue-bg",
          avatarText: "tag-blue-text"
        },
        firstName: "Sara",
        dueDate: "May 26",
        priorityLabel: "",
        priorityColor: "grey"
      }
    ]
  },
  {
    status: "in_review",
    label: "In Review",
    count: 4,
    statusColor: "bg-ui-tag-orange-icon",
    cards: [
      {
        title: "Q2 roadmap review",
        desc: "Align team on priorities for next quarter",
        member: {
          initials: "P",
          avatarBg: "tag-blue-bg",
          avatarText: "tag-blue-text"
        },
        firstName: "Priya",
        dueDate: "May 31",
        priorityLabel: "",
        priorityColor: "grey"
      }
    ]
  },
  {
    status: "done",
    label: "Done",
    count: 3,
    statusColor: "bg-ui-tag-green-icon",
    cards: [
      {
        title: "Fix login bug",
        desc: "Session token not refreshing on mobile browsers",
        member: {
          initials: "B",
          avatarBg: "tag-blue-bg",
          avatarText: "tag-blue-text"
        },
        firstName: "Ben",
        dueDate: "May 22",
        priorityLabel: "",
        priorityColor: "grey"
      }
    ]
  }
];

export function KanbanBoard({
  columns = DEFAULT_COLUMNS,
}: KanbanBoardProps) {
  return (
    <div className="flex gap-4 h-[800px] items-start relative shrink-0 w-full">
      {columns.map((col) => (
        <div
          key={col.status}
          className="bg-ui-bg-kanban-column flex flex-1 flex-col gap-2 h-full min-w-[1px] p-2 relative rounded-xl"
        >
          <div className="flex gap-1.5 items-center overflow-clip py-1 relative shrink-0 w-full">
            <div className={`w-[15px] h-[15px] rounded-sm ${col.statusColor}`} />
            <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
              {col.label}
            </p>
            <div className="flex-1 h-px min-w-[1px] relative" />
            <p className="relative shrink-0 text-ui-fg-muted txt-compact-medium">
              {col.count}
            </p>
          </div>
          {col.cards.map((card, cardIdx) => (
            <div
              key={cardIdx}
              className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full"
            >
              <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">
                {card.title}
              </p>
              <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis font-normal text-[13px] leading-[20px]">
                {card.desc}
              </p>
              <div className="flex gap-1.5 items-center relative shrink-0 w-full">
                <ColorAvatar member={card.member} size="xsmall" />
                <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal]">
                  {card.firstName}
                </p>
                <div className="flex-1 h-px min-w-[1px] relative" />
                <p className={`font-normal relative shrink-0 text-[12px] leading-[normal] ${card.overdue ? "text-ui-fg-error" : "text-ui-fg-subtle"}`}>
                  {card.dueDate}
                </p>
                {card.priorityLabel && (
                  <Badge color={card.priorityColor as any} size="2xsmall" rounded="full">
                    {card.priorityLabel}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

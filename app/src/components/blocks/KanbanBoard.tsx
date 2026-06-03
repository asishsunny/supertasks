import { Badge } from "@medusajs/ui";
import {
  SquareGreySolid,
  SquareBlueSolid,
  SquareOrangeSolid,
  SquareGreenSolid,
} from "@medusajs/icons";
import type { ComponentType, SVGAttributes } from "react";
import { ColorAvatar } from "@/components/ColorAvatar";
import type { Member } from "@/types";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type BadgeColor = React.ComponentProps<typeof Badge>["color"];

export interface KanbanCard {
  title: string;
  description: string;
  assignee: Pick<Member, "initials" | "avatarBg" | "avatarText">;
  assigneeName: string;
  due: string;
  dueDateOverdue?: boolean;
  priority: string;
  priorityColor: BadgeColor;
}

export interface KanbanColumn {
  label: string;
  icon: ComponentType<SVGAttributes<SVGSVGElement>>;
  cards: KanbanCard[];
}

export interface KanbanBoardProps {
  columns?: KanbanColumn[];
}

/* ------------------------------------------------------------------ */
/*  Default Figma data                                                 */
/* ------------------------------------------------------------------ */

const defaultMember: Pick<Member, "initials" | "avatarBg" | "avatarText"> = {
  initials: "??",
  avatarBg: "tag-neutral-bg",
  avatarText: "tag-neutral-text",
};

const DEFAULT_COLUMNS: KanbanColumn[] = [
  {
    label: "To Do",
    icon: SquareGreySolid,
    cards: [
      {
        title: "Customer interviews",
        description: "Schedule and run five user feedback sessions",
        assignee: defaultMember,
        assigneeName: "Lara",
        due: "Jun 8",
        priority: "Medium",
        priorityColor: "orange",
      },
      {
        title: "Migrate analytics SDK",
        description: "Switch from legacy tracker to new events API",
        assignee: defaultMember,
        assigneeName: "Mark",
        due: "Jun 6",
        priority: "High",
        priorityColor: "red",
      },
      {
        title: "Write API documentation",
        description: "Document all public endpoints with examples",
        assignee: defaultMember,
        assigneeName: "Owen",
        due: "Jun 16",
        priority: "Low",
        priorityColor: "green",
      },
      {
        title: "User research interviews",
        description: "Recruit participants and prepare script",
        assignee: defaultMember,
        assigneeName: "Priya",
        due: "May 29",
        dueDateOverdue: true,
        priority: "Medium",
        priorityColor: "orange",
      },
      {
        title: "Icon system audit",
        description: "Catalog all icons and remove unused SVGs",
        assignee: defaultMember,
        assigneeName: "Lara",
        due: "Jun 21",
        priority: "Low",
        priorityColor: "green",
      },
      {
        title: "Accessibility pass",
        description: "Fix contrast ratios and add ARIA labels",
        assignee: defaultMember,
        assigneeName: "Owen",
        due: "Jun 9",
        priority: "Medium",
        priorityColor: "orange",
      },
    ],
  },
  {
    label: "In Progress",
    icon: SquareBlueSolid,
    cards: [
      {
        title: "Update onboarding flow",
        description: "Revamp first-run experience for new users",
        assignee: defaultMember,
        assigneeName: "Sara",
        due: "May 26",
        dueDateOverdue: true,
        priority: "High",
        priorityColor: "red",
      },
      {
        title: "Fix billing bug #482",
        description: "Null ref in payment callback causing failed charges",
        assignee: defaultMember,
        assigneeName: "Ben",
        due: "May 24",
        dueDateOverdue: true,
        priority: "Critical",
        priorityColor: "red",
      },
      {
        title: "Redesign landing page",
        description: "New hero section and updated feature grid",
        assignee: defaultMember,
        assigneeName: "Lara",
        due: "Jun 2",
        priority: "Medium",
        priorityColor: "orange",
      },
      {
        title: "Setup CI/CD pipeline",
        description: "Configure GitHub Actions for staging deploys",
        assignee: defaultMember,
        assigneeName: "Mark",
        due: "Jun 13",
        priority: "High",
        priorityColor: "red",
      },
      {
        title: "Mobile nav refactor",
        description: "Replace drawer with bottom tab navigation",
        assignee: defaultMember,
        assigneeName: "Sara",
        due: "May 30",
        dueDateOverdue: true,
        priority: "Medium",
        priorityColor: "orange",
      },
    ],
  },
  {
    label: "In Review",
    icon: SquareOrangeSolid,
    cards: [
      {
        title: "Q2 roadmap review",
        description: "Align team on priorities for next quarter",
        assignee: defaultMember,
        assigneeName: "Priya",
        due: "May 31",
        dueDateOverdue: true,
        priority: "Medium",
        priorityColor: "orange",
      },
      {
        title: "Design QA — Settings",
        description: "Verify settings page matches latest design specs",
        assignee: defaultMember,
        assigneeName: "Sara",
        due: "Jun 4",
        priority: "High",
        priorityColor: "red",
      },
      {
        title: "Performance audit",
        description: "Profile render times and bundle size",
        assignee: defaultMember,
        assigneeName: "Owen",
        due: "Jun 11",
        priority: "High",
        priorityColor: "red",
      },
      {
        title: "DB schema migration",
        description: "Add indexes and normalize user preferences table",
        assignee: defaultMember,
        assigneeName: "Ben",
        due: "Jun 5",
        priority: "Critical",
        priorityColor: "red",
      },
    ],
  },
  {
    label: "Done",
    icon: SquareGreenSolid,
    cards: [
      {
        title: "Fix login bug",
        description: "Session token not refreshing on mobile browsers",
        assignee: defaultMember,
        assigneeName: "Ben",
        due: "May 22",
        priority: "Critical",
        priorityColor: "red",
      },
      {
        title: "Auth token refresh",
        description: "Implement silent refresh with retry logic",
        assignee: defaultMember,
        assigneeName: "Mark",
        due: "May 27",
        priority: "Critical",
        priorityColor: "red",
      },
      {
        title: "Sprint retrospective",
        description: "Review velocity and action items from last sprint",
        assignee: defaultMember,
        assigneeName: "Priya",
        due: "May 27",
        priority: "Low",
        priorityColor: "green",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function KanbanBoard({ columns = DEFAULT_COLUMNS }: KanbanBoardProps) {
  return (
    <div className="flex gap-4 h-[800px] items-start relative shrink-0 w-full">
      {columns.map((col, ci) => {
        const Icon = col.icon;
        return (
          <div
            key={ci}
            className="bg-ui-bg-kanban-column flex flex-1 flex-col gap-2 h-full min-w-[1px] p-2 relative rounded-xl"
          >
            {/* Column header */}
            <div className="flex gap-1.5 items-center overflow-clip py-1 relative shrink-0 w-full">
              <Icon className="w-[15px] h-[15px]" />
              <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
                {col.label}
              </p>
              <div className="flex-1 h-px min-w-[1px] relative" />
              <p className="relative shrink-0 text-ui-fg-muted txt-compact-medium">
                {col.cards.length}
              </p>
            </div>

            {/* Cards */}
            {col.cards.map((card, cardIdx) => (
              <div
                key={cardIdx}
                className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full"
              >
                <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">
                  {card.title}
                </p>
                <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis font-normal text-[13px] leading-[20px]">
                  {card.description}
                </p>
                <div className="flex gap-1.5 items-center relative shrink-0 w-full">
                  <ColorAvatar member={card.assignee} size="xsmall" />
                  <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal]">
                    {card.assigneeName}
                  </p>
                  <div className="flex-1 h-px min-w-[1px] relative" />
                  <p
                    className={`font-normal relative shrink-0 text-[12px] leading-[normal] ${
                      card.dueDateOverdue
                        ? "text-ui-fg-error"
                        : "text-ui-fg-subtle"
                    }`}
                  >
                    {card.due}
                  </p>
                  <Badge
                    color={card.priorityColor}
                    size="2xsmall"
                    rounded="full"
                  >
                    {card.priority}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

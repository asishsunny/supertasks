"use client";

// step 2: adapted from artifacts/transformed/kanban-board.tsx
// stripped content-stretch + [word-break:break-word], kept all classNames + div nesting

import { Badge } from "@medusajs/ui";
import { ColorAvatar } from "@/components/ColorAvatar";

function SquareGreenSolid({ className }: { className?: string }) {
  return (
    <div className={className || "overflow-clip relative size-[15px]"}>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/success\/tag-green-icon,#10b981)] border border-[var(--alpha-black\/alpha-12,rgba(0,0,0,0.12))] border-solid left-1/2 rounded-[2px] size-[8px] top-1/2" />
    </div>
  );
}

function SquareOrangeSolid({ className }: { className?: string }) {
  return (
    <div className={className || "overflow-clip relative size-[15px]"}>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/warning\/tag-orange-icon,#f97316)] border border-[var(--alpha-black\/alpha-12,rgba(0,0,0,0.12))] border-solid left-1/2 rounded-[2px] size-[8px] top-1/2" />
    </div>
  );
}

function SquareBlueSolid({ className }: { className?: string }) {
  return (
    <div className={className || "overflow-clip relative size-[15px]"}>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/blue\/tag-blue-icon,#60a5fa)] border border-[var(--alpha-black\/alpha-12,rgba(0,0,0,0.12))] border-solid left-1/2 rounded-[2px] size-[8px] top-1/2" />
    </div>
  );
}

function SquareGreySolid({ className }: { className?: string }) {
  return (
    <div className={className || "overflow-clip relative size-[15px]"}>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--tag\/neutral\/tag-neutral-icon,#a4aaa1)] border border-[var(--alpha-black\/alpha-12,rgba(0,0,0,0.12))] border-solid left-1/2 rounded-[2px] size-[8px] top-1/2" />
    </div>
  );
}

export default function KanbanBoard() {
  return (
    <div className="flex gap-4 items-start relative w-full h-full">
      {/* To Do */}
      <div className="bg-ui-bg-kanban-column flex flex-1 flex-col gap-2 h-full min-w-[1px] p-2 relative rounded-xl">
        <div className="flex gap-1.5 items-center overflow-clip py-1 relative shrink-0 w-full">
          <SquareGreySolid className="overflow-clip relative shrink-0 size-[15px]" />
          <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus whitespace-nowrap">
            To Do
          </p>
          <div className="flex-1 h-px min-w-[1px] relative" />
          <p className="relative shrink-0 text-ui-fg-muted txt-compact-medium whitespace-nowrap">
            6
          </p>
        </div>
        <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus whitespace-nowrap">
            Customer interviews
          </p>
          <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis font-normal text-[13px] leading-[20px] whitespace-nowrap">
            Schedule and run five user feedback sessions
          </p>
          <div className="flex gap-1.5 items-center relative shrink-0 w-full">
            <ColorAvatar member={{ initials: "L", avatarBg: "var(--tag-success-tag-green-bg, rgba(16,185,129,0.12))", avatarText: "var(--tag-success-tag-green-text, #065f46)", name: "Lara" }} size="xsmall" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal] whitespace-nowrap">
              Lara
            </p>
            <div className="flex-1 h-px min-w-[1px] relative" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal] whitespace-nowrap">
              Jun 1
            </p>
            <Badge color="orange" size="2xsmall" rounded="full">Medium</Badge>
          </div>
        </div>
        <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus whitespace-nowrap">
            Migrate analytics SDK
          </p>
          <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis font-normal text-[13px] leading-[20px] whitespace-nowrap">
            Switch from legacy tracker to new events API
          </p>
          <div className="flex gap-1.5 items-center relative shrink-0 w-full">
            <ColorAvatar member={{ initials: "M", avatarBg: "var(--tag-purple-tag-purple-bg, rgba(139,92,246,0.12))", avatarText: "var(--tag-purple-tag-purple-text, #5b21b6)", name: "Mark" }} size="xsmall" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal] whitespace-nowrap">
              Mark
            </p>
            <div className="flex-1 h-px min-w-[1px] relative" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal] whitespace-nowrap">
              May 30
            </p>
            <Badge color="red" size="2xsmall" rounded="full">High</Badge>
          </div>
        </div>
        <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus whitespace-nowrap">
            Write API documentation
          </p>
          <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis font-normal text-[13px] leading-[20px] whitespace-nowrap">
            Document all public endpoints with examples
          </p>
          <div className="flex gap-1.5 items-center relative shrink-0 w-full">
            <ColorAvatar member={{ initials: "O", avatarBg: "var(--tag-neutral-tag-neutral-bg, #f4f5f4)", avatarText: "var(--tag-neutral-tag-neutral-text, #555b52)", name: "Owen" }} size="xsmall" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal] whitespace-nowrap">
              Owen
            </p>
            <div className="flex-1 h-px min-w-[1px] relative" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal] whitespace-nowrap">
              Jun 9
            </p>
            <Badge color="grey" size="2xsmall" rounded="full">Low</Badge>
          </div>
        </div>
        <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus whitespace-nowrap">
            User research interviews
          </p>
          <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis font-normal text-[13px] leading-[20px] whitespace-nowrap">
            Recruit participants and prepare script
          </p>
          <div className="flex gap-1.5 items-center relative shrink-0 w-full">
            <ColorAvatar member={{ initials: "P", avatarBg: "var(--tag-warning-tag-orange-bg, rgba(249,115,22,0.12))", avatarText: "var(--tag-warning-tag-orange-text, #9a3412)", name: "Priya" }} size="xsmall" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal] whitespace-nowrap">
              Priya
            </p>
            <div className="flex-1 h-px min-w-[1px] relative" />
            <p className="font-normal relative shrink-0 text-ui-fg-error text-[12px] leading-[normal] whitespace-nowrap">
              May 22
            </p>
            <Badge color="orange" size="2xsmall" rounded="full">Medium</Badge>
          </div>
        </div>
        <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus whitespace-nowrap">
            Icon system audit
          </p>
          <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis font-normal text-[13px] leading-[20px] whitespace-nowrap">
            Catalog all icons and remove unused SVGs
          </p>
          <div className="flex gap-1.5 items-center relative shrink-0 w-full">
            <ColorAvatar member={{ initials: "L", avatarBg: "var(--tag-success-tag-green-bg, rgba(16,185,129,0.12))", avatarText: "var(--tag-success-tag-green-text, #065f46)", name: "Lara" }} size="xsmall" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal] whitespace-nowrap">
              Lara
            </p>
            <div className="flex-1 h-px min-w-[1px] relative" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal] whitespace-nowrap">
              Jun 14
            </p>
            <Badge color="grey" size="2xsmall" rounded="full">Low</Badge>
          </div>
        </div>
        <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus whitespace-nowrap">
            Accessibility pass
          </p>
          <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis font-normal text-[13px] leading-[20px] whitespace-nowrap">
            Fix contrast ratios and add ARIA labels
          </p>
          <div className="flex gap-1.5 items-center relative shrink-0 w-full">
            <ColorAvatar member={{ initials: "O", avatarBg: "var(--tag-neutral-tag-neutral-bg, #f4f5f4)", avatarText: "var(--tag-neutral-tag-neutral-text, #555b52)", name: "Owen" }} size="xsmall" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal] whitespace-nowrap">
              Owen
            </p>
            <div className="flex-1 h-px min-w-[1px] relative" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal] whitespace-nowrap">
              Jun 2
            </p>
            <Badge color="orange" size="2xsmall" rounded="full">Medium</Badge>
          </div>
        </div>
      </div>
      {/* In Progress */}
      <div className="bg-ui-bg-kanban-column flex flex-1 flex-col gap-2 h-full min-w-[1px] p-2 relative rounded-xl">
        <div className="flex gap-1.5 items-center overflow-clip py-1 relative shrink-0 w-full">
          <SquareBlueSolid className="overflow-clip relative shrink-0 size-[15px]" />
          <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus whitespace-nowrap">
            In Progress
          </p>
          <div className="flex-1 h-px min-w-[1px] relative" />
          <p className="relative shrink-0 text-ui-fg-muted txt-compact-medium whitespace-nowrap">
            5
          </p>
        </div>
        <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus whitespace-nowrap">
            Update onboarding flow
          </p>
          <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis font-normal text-[13px] leading-[20px] whitespace-nowrap">
            Revamp first-run experience for new users
          </p>
          <div className="flex gap-1.5 items-center relative shrink-0 w-full">
            <ColorAvatar member={{ initials: "S", avatarBg: "var(--tag-blue-tag-blue-bg, rgba(59,130,246,0.12))", avatarText: "var(--tag-blue-tag-blue-text, #1e40af)", name: "Sara" }} size="xsmall" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal] whitespace-nowrap">
              Sara
            </p>
            <div className="flex-1 h-px min-w-[1px] relative" />
            <p className="font-normal relative shrink-0 text-ui-fg-error text-[12px] leading-[normal] whitespace-nowrap">
              May 19
            </p>
            <Badge color="red" size="2xsmall" rounded="full">High</Badge>
          </div>
        </div>
        <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus whitespace-nowrap">
            Fix billing bug #482
          </p>
          <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis font-normal text-[13px] leading-[20px] whitespace-nowrap">
            Null ref in payment callback causing failed charges
          </p>
          <div className="flex gap-1.5 items-center relative shrink-0 w-full">
            <ColorAvatar member={{ initials: "B", avatarBg: "var(--tag-error-tag-red-bg, rgba(244,63,94,0.12))", avatarText: "var(--tag-error-tag-red-text, #9f1239)", name: "Ben" }} size="xsmall" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal] whitespace-nowrap">
              Ben
            </p>
            <div className="flex-1 h-px min-w-[1px] relative" />
            <p className="font-normal relative shrink-0 text-ui-fg-error text-[12px] leading-[normal] whitespace-nowrap">
              May 17
            </p>
            <Badge color="purple" size="2xsmall" rounded="full">Critical</Badge>
          </div>
        </div>
        <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus whitespace-nowrap">
            Redesign landing page
          </p>
          <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis font-normal text-[13px] leading-[20px] whitespace-nowrap">
            New hero section and updated feature grid
          </p>
          <div className="flex gap-1.5 items-center relative shrink-0 w-full">
            <ColorAvatar member={{ initials: "L", avatarBg: "var(--tag-success-tag-green-bg, rgba(16,185,129,0.12))", avatarText: "var(--tag-success-tag-green-text, #065f46)", name: "Lara" }} size="xsmall" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal] whitespace-nowrap">
              Lara
            </p>
            <div className="flex-1 h-px min-w-[1px] relative" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal] whitespace-nowrap">
              May 26
            </p>
            <Badge color="orange" size="2xsmall" rounded="full">Medium</Badge>
          </div>
        </div>
        <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus whitespace-nowrap">
            Setup CI/CD pipeline
          </p>
          <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis font-normal text-[13px] leading-[20px] whitespace-nowrap">
            Configure GitHub Actions for staging deploys
          </p>
          <div className="flex gap-1.5 items-center relative shrink-0 w-full">
            <ColorAvatar member={{ initials: "M", avatarBg: "var(--tag-purple-tag-purple-bg, rgba(139,92,246,0.12))", avatarText: "var(--tag-purple-tag-purple-text, #5b21b6)", name: "Mark" }} size="xsmall" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal] whitespace-nowrap">
              Mark
            </p>
            <div className="flex-1 h-px min-w-[1px] relative" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal] whitespace-nowrap">
              Jun 6
            </p>
            <Badge color="red" size="2xsmall" rounded="full">High</Badge>
          </div>
        </div>
        <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus whitespace-nowrap">
            Mobile nav refactor
          </p>
          <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis font-normal text-[13px] leading-[20px] whitespace-nowrap">
            Replace drawer with bottom tab navigation
          </p>
          <div className="flex gap-1.5 items-center relative shrink-0 w-full">
            <ColorAvatar member={{ initials: "S", avatarBg: "var(--tag-blue-tag-blue-bg, rgba(59,130,246,0.12))", avatarText: "var(--tag-blue-tag-blue-text, #1e40af)", name: "Sara" }} size="xsmall" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal] whitespace-nowrap">
              Sara
            </p>
            <div className="flex-1 h-px min-w-[1px] relative" />
            <p className="font-normal relative shrink-0 text-ui-fg-error text-[12px] leading-[normal] whitespace-nowrap">
              May 23
            </p>
            <Badge color="orange" size="2xsmall" rounded="full">Medium</Badge>
          </div>
        </div>
      </div>
      {/* In Review */}
      <div className="bg-ui-bg-kanban-column flex flex-1 flex-col gap-2 h-full min-w-[1px] p-2 relative rounded-xl">
        <div className="flex gap-1.5 items-center overflow-clip py-1 relative shrink-0 w-full">
          <SquareOrangeSolid className="overflow-clip relative shrink-0 size-[15px]" />
          <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus whitespace-nowrap">
            In Review
          </p>
          <div className="flex-1 h-px min-w-[1px] relative" />
          <p className="relative shrink-0 text-ui-fg-muted txt-compact-medium whitespace-nowrap">
            4
          </p>
        </div>
        <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus whitespace-nowrap">
            Q2 roadmap review
          </p>
          <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis font-normal text-[13px] leading-[20px] whitespace-nowrap">
            Align team on priorities for next quarter
          </p>
          <div className="flex gap-1.5 items-center relative shrink-0 w-full">
            <ColorAvatar member={{ initials: "P", avatarBg: "var(--tag-warning-tag-orange-bg, rgba(249,115,22,0.12))", avatarText: "var(--tag-warning-tag-orange-text, #9a3412)", name: "Priya" }} size="xsmall" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal] whitespace-nowrap">
              Priya
            </p>
            <div className="flex-1 h-px min-w-[1px] relative" />
            <p className="font-normal relative shrink-0 text-ui-fg-error text-[12px] leading-[normal] whitespace-nowrap">
              May 24
            </p>
            <Badge color="orange" size="2xsmall" rounded="full">Medium</Badge>
          </div>
        </div>
        <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus whitespace-nowrap">
            Design QA — Settings
          </p>
          <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis font-normal text-[13px] leading-[20px] whitespace-nowrap">
            Verify settings page matches latest design specs
          </p>
          <div className="flex gap-1.5 items-center relative shrink-0 w-full">
            <ColorAvatar member={{ initials: "S", avatarBg: "var(--tag-blue-tag-blue-bg, rgba(59,130,246,0.12))", avatarText: "var(--tag-blue-tag-blue-text, #1e40af)", name: "Sara" }} size="xsmall" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal] whitespace-nowrap">
              Sara
            </p>
            <div className="flex-1 h-px min-w-[1px] relative" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal] whitespace-nowrap">
              May 28
            </p>
            <Badge color="red" size="2xsmall" rounded="full">High</Badge>
          </div>
        </div>
        <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus whitespace-nowrap">
            Performance audit
          </p>
          <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis font-normal text-[13px] leading-[20px] whitespace-nowrap">
            Profile render times and bundle size
          </p>
          <div className="flex gap-1.5 items-center relative shrink-0 w-full">
            <ColorAvatar member={{ initials: "O", avatarBg: "var(--tag-neutral-tag-neutral-bg, #f4f5f4)", avatarText: "var(--tag-neutral-tag-neutral-text, #555b52)", name: "Owen" }} size="xsmall" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal] whitespace-nowrap">
              Owen
            </p>
            <div className="flex-1 h-px min-w-[1px] relative" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal] whitespace-nowrap">
              Jun 4
            </p>
            <Badge color="red" size="2xsmall" rounded="full">High</Badge>
          </div>
        </div>
        <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus whitespace-nowrap">
            DB schema migration
          </p>
          <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis font-normal text-[13px] leading-[20px] whitespace-nowrap">
            Add indexes and normalize user preferences table
          </p>
          <div className="flex gap-1.5 items-center relative shrink-0 w-full">
            <ColorAvatar member={{ initials: "B", avatarBg: "var(--tag-error-tag-red-bg, rgba(244,63,94,0.12))", avatarText: "var(--tag-error-tag-red-text, #9f1239)", name: "Ben" }} size="xsmall" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal] whitespace-nowrap">
              Ben
            </p>
            <div className="flex-1 h-px min-w-[1px] relative" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal] whitespace-nowrap">
              May 29
            </p>
            <Badge color="purple" size="2xsmall" rounded="full">Critical</Badge>
          </div>
        </div>
      </div>
      {/* Done */}
      <div className="bg-ui-bg-kanban-column flex flex-1 flex-col gap-2 h-full min-w-[1px] p-2 relative rounded-xl">
        <div className="flex gap-1.5 items-center overflow-clip py-1 relative shrink-0 w-full">
          <SquareGreenSolid className="overflow-clip relative shrink-0 size-[15px]" />
          <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus whitespace-nowrap">
            Done
          </p>
          <div className="flex-1 h-px min-w-[1px] relative" />
          <p className="relative shrink-0 text-ui-fg-muted txt-compact-medium whitespace-nowrap">
            3
          </p>
        </div>
        <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus whitespace-nowrap">
            Fix login bug
          </p>
          <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis font-normal text-[13px] leading-[20px] whitespace-nowrap">
            Session token not refreshing on mobile browsers
          </p>
          <div className="flex gap-1.5 items-center relative shrink-0 w-full">
            <ColorAvatar member={{ initials: "B", avatarBg: "var(--tag-error-tag-red-bg, rgba(244,63,94,0.12))", avatarText: "var(--tag-error-tag-red-text, #9f1239)", name: "Ben" }} size="xsmall" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal] whitespace-nowrap">
              Ben
            </p>
            <div className="flex-1 h-px min-w-[1px] relative" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal] whitespace-nowrap">
              May 15
            </p>
            <Badge color="purple" size="2xsmall" rounded="full">Critical</Badge>
          </div>
        </div>
        <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus whitespace-nowrap">
            Auth token refresh
          </p>
          <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis font-normal text-[13px] leading-[20px] whitespace-nowrap">
            Implement silent refresh with retry logic
          </p>
          <div className="flex gap-1.5 items-center relative shrink-0 w-full">
            <ColorAvatar member={{ initials: "M", avatarBg: "var(--tag-purple-tag-purple-bg, rgba(139,92,246,0.12))", avatarText: "var(--tag-purple-tag-purple-text, #5b21b6)", name: "Mark" }} size="xsmall" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal] whitespace-nowrap">
              Mark
            </p>
            <div className="flex-1 h-px min-w-[1px] relative" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal] whitespace-nowrap">
              May 20
            </p>
            <Badge color="purple" size="2xsmall" rounded="full">Critical</Badge>
          </div>
        </div>
        <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus whitespace-nowrap">
            Sprint retrospective
          </p>
          <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis font-normal text-[13px] leading-[20px] whitespace-nowrap">
            Review velocity and action items from last sprint
          </p>
          <div className="flex gap-1.5 items-center relative shrink-0 w-full">
            <ColorAvatar member={{ initials: "P", avatarBg: "var(--tag-warning-tag-orange-bg, rgba(249,115,22,0.12))", avatarText: "var(--tag-warning-tag-orange-text, #9a3412)", name: "Priya" }} size="xsmall" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal] whitespace-nowrap">
              Priya
            </p>
            <div className="flex-1 h-px min-w-[1px] relative" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal] whitespace-nowrap">
              May 20
            </p>
            <Badge color="grey" size="2xsmall" rounded="full">Low</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}

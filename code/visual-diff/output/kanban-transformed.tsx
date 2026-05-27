export default function KanbanBoard() {
  return <div className="flex gap-4 items-start relative w-full h-full">
      <div className="bg-ui-bg-kanban-column flex flex-1 flex-col gap-2 h-full min-w-[1px] p-2 relative rounded-xl">
        <div className="flex gap-1.5 items-center overflow-clip py-1 relative shrink-0 w-full">
          <SquareGreySolid className="w-[15px] h-[15px]" />
          <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
            To Do
          </p>
          <div className="flex-1 h-px min-w-[1px] relative" />
          <p className="relative shrink-0 text-ui-fg-muted txt-compact-medium">
            6
          </p>
        </div>
        <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
            Customer interviews
          </p>
          <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis font-normal text-[14px] leading-[20px]">
            Schedule and run five user feedback sessions
          </p>
          <div className="flex gap-1.5 items-center relative shrink-0 w-full">
            <ColorAvatar member={member} size="xsmall" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal]">
              Lara
            </p>
            <div className="flex-1 h-px min-w-[1px] relative" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal]">
              May 21
            </p>
            <Badge color={PRIORITY_COLOR[task.priority]} size="2xsmall" rounded="full">Medium</Badge>
          </div>
        </div>
        <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
            Migrate analytics SDK
          </p>
          <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis font-normal text-[14px] leading-[20px]">
            Switch from legacy tracker to new events API
          </p>
          <div className="flex gap-1.5 items-center relative shrink-0 w-full">
            <ColorAvatar member={member} size="xsmall" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal]">
              Mark
            </p>
            <div className="flex-1 h-px min-w-[1px] relative" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal]">
              May 19
            </p>
            <Badge color={PRIORITY_COLOR[task.priority]} size="2xsmall" rounded="full">High</Badge>
          </div>
        </div>
        <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
            Write API documentation
          </p>
          <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis font-normal text-[14px] leading-[20px]">
            Document all public endpoints with examples
          </p>
          <div className="flex gap-1.5 items-center relative shrink-0 w-full">
            <ColorAvatar member={member} size="xsmall" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal]">
              Owen
            </p>
            <div className="flex-1 h-px min-w-[1px] relative" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal]">
              May 29
            </p>
            <Badge color={PRIORITY_COLOR[task.priority]} size="2xsmall" rounded="full">Low</Badge>
          </div>
        </div>
        <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
            User research interviews
          </p>
          <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis font-normal text-[14px] leading-[20px]">
            Recruit participants and prepare script
          </p>
          <div className="flex gap-1.5 items-center relative shrink-0 w-full">
            <ColorAvatar member={member} size="xsmall" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal]">
              Priya
            </p>
            <div className="flex-1 h-px min-w-[1px] relative" />
            <p className="font-normal relative shrink-0 text-ui-fg-error text-[12px] leading-[normal]">
              May 11
            </p>
            <Badge color={PRIORITY_COLOR[task.priority]} size="2xsmall" rounded="full">Medium</Badge>
          </div>
        </div>
        <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
            Icon system audit
          </p>
          <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis font-normal text-[14px] leading-[20px]">
            Catalog all icons and remove unused SVGs
          </p>
          <div className="flex gap-1.5 items-center relative shrink-0 w-full">
            <ColorAvatar member={member} size="xsmall" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal]">
              Lara
            </p>
            <div className="flex-1 h-px min-w-[1px] relative" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal]">
              Jun 3
            </p>
            <Badge color={PRIORITY_COLOR[task.priority]} size="2xsmall" rounded="full">Low</Badge>
          </div>
        </div>
        <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
            Accessibility pass
          </p>
          <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis font-normal text-[14px] leading-[20px]">
            Fix contrast ratios and add ARIA labels
          </p>
          <div className="flex gap-1.5 items-center relative shrink-0 w-full">
            <ColorAvatar member={member} size="xsmall" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal]">
              Owen
            </p>
            <div className="flex-1 h-px min-w-[1px] relative" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal]">
              May 22
            </p>
            <Badge color={PRIORITY_COLOR[task.priority]} size="2xsmall" rounded="full">Medium</Badge>
          </div>
        </div>
      </div>
      <div className="bg-ui-bg-kanban-column flex flex-1 flex-col gap-2 h-full min-w-[1px] p-2 relative rounded-xl">
        <div className="flex gap-1.5 items-center overflow-clip py-1 relative shrink-0 w-full">
          <SquareBlueSolid className="w-[15px] h-[15px]" />
          <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
            In Progress
          </p>
          <div className="flex-1 h-px min-w-[1px] relative" />
          <p className="relative shrink-0 text-ui-fg-muted txt-compact-medium">
            5
          </p>
        </div>
        <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
            Update onboarding flow
          </p>
          <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis font-normal text-[14px] leading-[20px]">
            Revamp first-run experience for new users
          </p>
          <div className="flex gap-1.5 items-center relative shrink-0 w-full">
            <ColorAvatar member={member} size="xsmall" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal]">
              Sara
            </p>
            <div className="flex-1 h-px min-w-[1px] relative" />
            <p className="font-normal relative shrink-0 text-ui-fg-error text-[12px] leading-[normal]">
              May 8
            </p>
            <Badge color={PRIORITY_COLOR[task.priority]} size="2xsmall" rounded="full">High</Badge>
          </div>
        </div>
        <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
            Fix billing bug #482
          </p>
          <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis font-normal text-[14px] leading-[20px]">
            Null ref in payment callback causing failed charges
          </p>
          <div className="flex gap-1.5 items-center relative shrink-0 w-full">
            <ColorAvatar member={member} size="xsmall" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal]">
              Ben
            </p>
            <div className="flex-1 h-px min-w-[1px] relative" />
            <p className="font-normal relative shrink-0 text-ui-fg-error text-[12px] leading-[normal]">
              May 6
            </p>
            <Badge color={PRIORITY_COLOR[task.priority]} size="2xsmall" rounded="full">Critical</Badge>
          </div>
        </div>
        <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
            Redesign landing page
          </p>
          <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis font-normal text-[14px] leading-[20px]">
            New hero section and updated feature grid
          </p>
          <div className="flex gap-1.5 items-center relative shrink-0 w-full">
            <ColorAvatar member={member} size="xsmall" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal]">
              Lara
            </p>
            <div className="flex-1 h-px min-w-[1px] relative" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal]">
              May 15
            </p>
            <Badge color={PRIORITY_COLOR[task.priority]} size="2xsmall" rounded="full">Medium</Badge>
          </div>
        </div>
        <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
            Setup CI/CD pipeline
          </p>
          <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis font-normal text-[14px] leading-[20px]">
            Configure GitHub Actions for staging deploys
          </p>
          <div className="flex gap-1.5 items-center relative shrink-0 w-full">
            <ColorAvatar member={member} size="xsmall" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal]">
              Mark
            </p>
            <div className="flex-1 h-px min-w-[1px] relative" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal]">
              May 26
            </p>
            <Badge color={PRIORITY_COLOR[task.priority]} size="2xsmall" rounded="full">High</Badge>
          </div>
        </div>
        <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
            Mobile nav refactor
          </p>
          <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis font-normal text-[14px] leading-[20px]">
            Replace drawer with bottom tab navigation
          </p>
          <div className="flex gap-1.5 items-center relative shrink-0 w-full">
            <ColorAvatar member={member} size="xsmall" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal]">
              Sara
            </p>
            <div className="flex-1 h-px min-w-[1px] relative" />
            <p className="font-normal relative shrink-0 text-ui-fg-error text-[12px] leading-[normal]">
              May 12
            </p>
            <Badge color={PRIORITY_COLOR[task.priority]} size="2xsmall" rounded="full">Medium</Badge>
          </div>
        </div>
      </div>
      <div className="bg-ui-bg-kanban-column flex flex-1 flex-col gap-2 h-full min-w-[1px] p-2 relative rounded-xl">
        <div className="flex gap-1.5 items-center overflow-clip py-1 relative shrink-0 w-full">
          <SquareOrangeSolid className="w-[15px] h-[15px]" />
          <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
            In Review
          </p>
          <div className="flex-1 h-px min-w-[1px] relative" />
          <p className="relative shrink-0 text-ui-fg-muted txt-compact-medium">
            4
          </p>
        </div>
        <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
            Q2 roadmap review
          </p>
          <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis font-normal text-[14px] leading-[20px]">
            Align team on priorities for next quarter
          </p>
          <div className="flex gap-1.5 items-center relative shrink-0 w-full">
            <ColorAvatar member={member} size="xsmall" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal]">
              Priya
            </p>
            <div className="flex-1 h-px min-w-[1px] relative" />
            <p className="font-normal relative shrink-0 text-ui-fg-error text-[12px] leading-[normal]">
              May 13
            </p>
            <Badge color={PRIORITY_COLOR[task.priority]} size="2xsmall" rounded="full">Medium</Badge>
          </div>
        </div>
        <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
            Design QA — Settings
          </p>
          <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis font-normal text-[14px] leading-[20px]">
            Verify settings page matches latest design specs
          </p>
          <div className="flex gap-1.5 items-center relative shrink-0 w-full">
            <ColorAvatar member={member} size="xsmall" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal]">
              Sara
            </p>
            <div className="flex-1 h-px min-w-[1px] relative" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal]">
              May 17
            </p>
            <Badge color={PRIORITY_COLOR[task.priority]} size="2xsmall" rounded="full">High</Badge>
          </div>
        </div>
        <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
            Performance audit
          </p>
          <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis font-normal text-[14px] leading-[20px]">
            Profile render times and bundle size
          </p>
          <div className="flex gap-1.5 items-center relative shrink-0 w-full">
            <ColorAvatar member={member} size="xsmall" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal]">
              Owen
            </p>
            <div className="flex-1 h-px min-w-[1px] relative" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal]">
              May 24
            </p>
            <Badge color={PRIORITY_COLOR[task.priority]} size="2xsmall" rounded="full">High</Badge>
          </div>
        </div>
        <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
            DB schema migration
          </p>
          <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis font-normal text-[14px] leading-[20px]">
            Add indexes and normalize user preferences table
          </p>
          <div className="flex gap-1.5 items-center relative shrink-0 w-full">
            <ColorAvatar member={member} size="xsmall" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal]">
              Ben
            </p>
            <div className="flex-1 h-px min-w-[1px] relative" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal]">
              May 18
            </p>
            <Badge color={PRIORITY_COLOR[task.priority]} size="2xsmall" rounded="full">Critical</Badge>
          </div>
        </div>
      </div>
      <div className="bg-ui-bg-kanban-column flex flex-1 flex-col gap-2 h-full min-w-[1px] p-2 relative rounded-xl">
        <div className="flex gap-1.5 items-center overflow-clip py-1 relative shrink-0 w-full">
          <SquareGreenSolid className="w-[15px] h-[15px]" />
          <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
            Done
          </p>
          <div className="flex-1 h-px min-w-[1px] relative" />
          <p className="relative shrink-0 text-ui-fg-muted txt-compact-medium">
            3
          </p>
        </div>
        <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
            Fix login bug
          </p>
          <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis font-normal text-[14px] leading-[20px]">
            Session token not refreshing on mobile browsers
          </p>
          <div className="flex gap-1.5 items-center relative shrink-0 w-full">
            <ColorAvatar member={member} size="xsmall" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal]">
              Ben
            </p>
            <div className="flex-1 h-px min-w-[1px] relative" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal]">
              May 4
            </p>
            <Badge color={PRIORITY_COLOR[task.priority]} size="2xsmall" rounded="full">Critical</Badge>
          </div>
        </div>
        <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
            Auth token refresh
          </p>
          <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis font-normal text-[14px] leading-[20px]">
            Implement silent refresh with retry logic
          </p>
          <div className="flex gap-1.5 items-center relative shrink-0 w-full">
            <ColorAvatar member={member} size="xsmall" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal]">
              Mark
            </p>
            <div className="flex-1 h-px min-w-[1px] relative" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal]">
              May 9
            </p>
            <Badge color={PRIORITY_COLOR[task.priority]} size="2xsmall" rounded="full">Critical</Badge>
          </div>
        </div>
        <div className="bg-ui-bg-base shadow-elevation-card-rest flex flex-col gap-3 p-3 relative rounded-lg shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
            Sprint retrospective
          </p>
          <p className="min-w-full overflow-hidden relative shrink-0 text-ui-fg-muted text-ellipsis font-normal text-[14px] leading-[20px]">
            Review velocity and action items from last sprint
          </p>
          <div className="flex gap-1.5 items-center relative shrink-0 w-full">
            <ColorAvatar member={member} size="xsmall" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal]">
              Priya
            </p>
            <div className="flex-1 h-px min-w-[1px] relative" />
            <p className="font-normal relative shrink-0 text-ui-fg-subtle text-[12px] leading-[normal]">
              May 9
            </p>
            <Badge color={PRIORITY_COLOR[task.priority]} size="2xsmall" rounded="full">Low</Badge>
          </div>
        </div>
      </div>
    </div>;
}
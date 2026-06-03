import { Button, Switch } from "@medusajs/ui"
import { SettingsToggle } from "@/types"

interface NavItem {
  label: string
  active?: boolean
}

export interface SettingsNotificationsProps {
  navItems?: NavItem[]
  title?: string
  toggles?: SettingsToggle[]
  saveLabel?: string
  heading?: string
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: "Profile" },
  { label: "Notifications", active: true },
  { label: "Security" },
  { label: "Billing" },
]

const DEFAULT_TOGGLES: SettingsToggle[] = [
  { label: "Email notifications", desc: "Receive email for task assignments", on: true },
  { label: "Weekly digest", desc: "Summary of your team's progress", on: false },
]

export function SettingsNotifications({
  navItems = DEFAULT_NAV_ITEMS,
  title = "Notifications",
  toggles = DEFAULT_TOGGLES,
  saveLabel = "Save changes",
  heading = "Notifications",
}: SettingsNotificationsProps) {
  return (
    <div className="flex gap-6 items-start relative shrink-0 w-full">
      <div className="bg-ui-bg-base flex flex-col overflow-clip py-2 relative rounded-[8px] shadow-elevation-card-rest shrink-0 w-[240px]">
        {navItems.map((item, i) => (
          <div
            key={i}
            className={
              item.active
                ? "bg-ui-bg-subtle border-ui-fg-base border-l-2 flex items-center px-4 py-2.5 relative shrink-0 w-full"
                : "flex items-center px-4 py-2.5 relative shrink-0 w-full"
            }
          >
            <p
              className={
                item.active
                  ? "relative shrink-0 text-ui-fg-base txt-compact-small-plus"
                  : "relative shrink-0 text-ui-fg-subtle txt-compact-small"
              }
            >
              {item.label}
            </p>
          </div>
        ))}
      </div>
      <div className="bg-ui-bg-base flex flex-1 flex-col min-w-[1px] overflow-clip relative rounded-[8px] shadow-elevation-card-rest">
        <div className="flex flex-col px-6 py-3 relative shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
            {heading}
          </p>
        </div>
        <div className="h-px bg-ui-border-base" />
        <div className="flex flex-col gap-5 p-6 relative shrink-0 w-full">
          <div className="flex flex-col gap-3 relative shrink-0 w-full">
            {toggles.map((toggle, i) => (
              <div key={i}>
                {i > 0 && <div className="h-px bg-ui-border-base" />}
                <div className="flex items-center justify-between relative shrink-0 w-full">
                  <div className="flex flex-col gap-1 relative shrink-0 text-[13px]">
                    <p className="relative shrink-0 text-ui-fg-base font-medium">
                      {toggle.label}
                    </p>
                    <p className="relative shrink-0 text-ui-fg-subtle font-normal">
                      {toggle.desc}
                    </p>
                  </div>
                  <Switch checked={toggle.on} className="h-5 relative shrink-0 w-[32px]" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-start justify-end pt-2 relative shrink-0 w-full">
            <Button variant="primary" size="small">
              {saveLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

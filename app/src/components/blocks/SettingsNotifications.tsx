import { Switch, Button } from "@medusajs/ui";
import type { SettingsToggle } from "@/types";

interface NavItem {
  label: string;
  active?: boolean;
}

export interface SettingsNotificationsProps {
  navItems?: NavItem[];
  onNavClick?: (label: string) => void;
  title?: string;
  toggles?: SettingsToggle[];
  saveLabel?: string;
  onSave?: () => void;
  onToggle?: (index: number, value: boolean) => void;
  heading?: string;
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  {
    label: "Profile",
    active: true
  },
  {
    label: "Notifications",
    active: false
  },
  {
    label: "Security",
    active: false
  },
  {
    label: "Billing",
    active: false
  }
];
const DEFAULT_TOGGLES: SettingsToggle[] = [
  {
    label: "Email notifications",
    desc: "Receive email for task assignments",
    on: true
  },
  {
    label: "Push notifications",
    desc: "Get push alerts for due dates",
    on: false
  },
  {
    label: "Weekly digest",
    desc: "",
    on: true
  },
  {
    label: "Mentions",
    desc: "Notify when someone mentions you",
    on: false
  },
  {
    label: "Overdue alerts",
    desc: "Alert when tasks pass their due date",
    on: true
  }
];
const DEFAULT_SAVE_LABEL = "Save changes";
const DEFAULT_HEADING = "Save changes";

export function SettingsNotifications({
  navItems = DEFAULT_NAV_ITEMS,
  onNavClick,
  title,
  toggles = DEFAULT_TOGGLES,
  saveLabel = DEFAULT_SAVE_LABEL,
  onSave,
  onToggle,
  heading = DEFAULT_HEADING,
}: SettingsNotificationsProps) {
  return (
    <div className="flex gap-6 items-start relative shrink-0 w-full">
      <div className="bg-ui-bg-base flex flex-col overflow-clip py-2 relative rounded-[8px] shadow-elevation-card-rest shrink-0 w-[240px]">
        {navItems.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => onNavClick?.(item.label)}
            className={
              item.active
                ? "bg-ui-bg-subtle border-ui-fg-base border-l-2 flex items-center px-4 py-2.5 relative shrink-0 w-full text-left"
                : "flex items-center px-4 py-2.5 relative shrink-0 w-full text-left"
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
          </button>
        ))}
      </div>
      <div className="bg-ui-bg-base flex flex-1 flex-col min-w-[1px] overflow-clip relative rounded-[8px] shadow-elevation-card-rest">
        <div className="flex flex-col px-6 py-3 relative shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base font-medium text-[14px] leading-[20px]">
            {heading}
          </p>
        </div>
        <div className="h-px bg-ui-border-base" />
        <div className="flex flex-col gap-5 p-6 relative shrink-0 w-full">
          <div className="flex flex-col gap-3 relative shrink-0 w-full">
            {toggles.map((toggle, i) => (
              <div key={toggle.label}>
                {i > 0 && <div className="h-px bg-ui-border-base mb-3" />}
                <div className="flex items-center justify-between relative shrink-0 w-full">
                  <div className="flex flex-col gap-1 relative shrink-0 text-[13px] leading-[20px]">
                    <p className="relative shrink-0 text-ui-fg-base font-medium">
                      {toggle.label}
                    </p>
                    {toggle.desc && (
                      <p className="relative shrink-0 text-ui-fg-subtle font-normal">
                        {toggle.desc}
                      </p>
                    )}
                  </div>
                  <Switch
                    checked={toggle.on}
                    onCheckedChange={(val) => onToggle?.(i, val)}
                    className="h-5 relative shrink-0 w-[32px]"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-start justify-end pt-2 relative shrink-0 w-full">
            <Button variant="primary" size="small" onClick={onSave}>
              {saveLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

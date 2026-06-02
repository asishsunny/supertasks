import { Button, Switch } from "@medusajs/ui";
import { SettingsToggle } from "@/types";

interface NavItem {
  label: string;
  active?: boolean;
}

export interface SettingsNotificationsProps {
  navItems: NavItem[];
  onNavClick?: (label: string) => void;
  title: string;
  toggles: SettingsToggle[];
  saveLabel: string;
  onSave?: () => void;
  onToggle?: (index: number, value: boolean) => void;
  heading: string;
}

export function SettingsNotifications({
  navItems,
  onNavClick,
  title,
  toggles,
  saveLabel,
  onSave,
  onToggle,
  heading,
}: SettingsNotificationsProps) {
  return (
    <div className="flex gap-6 items-start w-full">
      <div className="bg-ui-bg-base flex flex-col overflow-clip py-2 rounded-[8px] shadow-elevation-card-rest shrink-0 w-[240px]">
        {navItems.map((item) => (
          <div
            key={item.label}
            className={
              item.active
                ? "bg-ui-bg-subtle border-ui-fg-base border-l-2 flex items-center px-4 py-2.5 w-full"
                : "flex items-center px-4 py-2.5 w-full"
            }
            role="button"
            tabIndex={0}
            onClick={() => onNavClick?.(item.label)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onNavClick?.(item.label);
            }}
          >
            <p
              className={
                item.active
                  ? "text-ui-fg-base txt-compact-small-plus"
                  : "text-ui-fg-subtle txt-compact-small"
              }
            >
              {item.label}
            </p>
          </div>
        ))}
      </div>
      <div className="bg-ui-bg-base flex flex-1 flex-col min-w-[1px] overflow-clip rounded-[8px] shadow-elevation-card-rest">
        <div className="flex flex-col px-6 py-3 w-full">
          <p className="text-ui-fg-base font-medium text-[14px] leading-[20px]">
            {heading}
          </p>
        </div>
        <div className="h-px bg-ui-border-base" />
        <div className="flex flex-col gap-5 p-6 w-full">
          <div className="flex flex-col gap-3 w-full">
            {toggles.map((toggle, index) => (
              <div key={index}>
                {index > 0 && <div className="h-px bg-ui-border-base mb-3" />}
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col gap-1 text-[13px] leading-[20px]">
                    <p className="text-ui-fg-base font-medium">
                      {toggle.label}
                    </p>
                    <p className="text-ui-fg-subtle font-normal">
                      {toggle.desc}
                    </p>
                  </div>
                  <Switch
                    checked={toggle.on}
                    onCheckedChange={(val) => onToggle?.(index, val)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-start justify-end pt-2 w-full">
            <Button variant="primary" size="small" onClick={onSave}>
              {saveLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

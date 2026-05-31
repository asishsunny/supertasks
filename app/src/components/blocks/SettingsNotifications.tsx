import { Button, Switch } from "@medusajs/ui";
import { SettingsToggle } from "@/types";

export interface SettingsNotificationsProps {
  tabs: string[];
  activeTab?: number;
  onTabChange?: (index: number) => void;
  heading: string;
  toggles: SettingsToggle[];
  saveLabel: string;
  onSave?: () => void;
  onToggle?: (index: number, value: boolean) => void;
}

export function SettingsNotifications({
  tabs,
  activeTab = 1,
  onTabChange,
  heading,
  toggles,
  saveLabel,
  onSave,
  onToggle,
}: SettingsNotificationsProps) {
  return (
    <div className="flex gap-6 items-start w-full h-full">
      {/* Sidebar tabs */}
      <div className="bg-ui-bg-base flex flex-col overflow-clip py-2 rounded-[8px] shadow-elevation-card-rest shrink-0 w-[240px]">
        {tabs.map((tab, i) => {
          const isActive = i === activeTab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => onTabChange?.(i)}
              className={`flex items-center px-4 py-2.5 w-full text-left ${
                isActive
                  ? "bg-ui-bg-subtle border-ui-fg-base border-l-2 text-ui-fg-base txt-compact-small-plus"
                  : "text-ui-fg-subtle txt-compact-small"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Content panel */}
      <div className="bg-ui-bg-base flex flex-1 flex-col min-w-[1px] overflow-clip rounded-[8px] shadow-elevation-card-rest">
        <div className="flex flex-col px-6 py-3 w-full">
          <p className="text-ui-fg-base txt-compact-medium-plus">{heading}</p>
        </div>
        <div className="h-px bg-ui-border-base" />
        <div className="flex flex-col gap-5 p-6 w-full">
          <div className="flex flex-col gap-3 w-full">
            {toggles.map((toggle, i) => (
              <div key={i}>
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col gap-1 text-[13px]">
                    <p className="text-ui-fg-base font-medium">
                      {toggle.label}
                    </p>
                    <p className="text-ui-fg-subtle font-normal">
                      {toggle.desc}
                    </p>
                  </div>
                  <Switch
                    checked={toggle.on}
                    onCheckedChange={(val) => onToggle?.(i, val)}
                  />
                </div>
                {i < toggles.length - 1 && (
                  <div className="h-px bg-ui-border-base mt-3" />
                )}
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

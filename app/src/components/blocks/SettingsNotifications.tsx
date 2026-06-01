import { Button, Switch } from "@medusajs/ui";
import type { SettingsToggle } from "@/types";

export interface SettingsNotificationsProps {
  title: string;
  toggles: SettingsToggle[];
  saveLabel: string;
  onSave?: () => void;
  onToggle?: (index: number, value: boolean) => void;
}

export function SettingsNotifications({
  title,
  toggles,
  saveLabel,
  onSave,
  onToggle,
}: SettingsNotificationsProps) {
  return (
    <div className="bg-ui-bg-base flex flex-1 flex-col min-w-[1px] overflow-clip rounded-[8px] shadow-elevation-card-rest">
      {/* Card Header */}
      <div className="flex flex-col px-6 py-3 w-full">
        <p className="text-ui-fg-base txt-compact-medium-plus">{title}</p>
      </div>

      {/* Divider */}
      <div className="bg-ui-border-base h-px w-full" />

      {/* Card Body */}
      <div className="flex flex-col gap-5 p-6 w-full">
        <div className="flex flex-col w-full">
          {toggles.map((toggle, i) => (
            <div key={toggle.label}>
              <div className="flex items-center justify-between py-4 w-full">
                <div className="flex flex-col gap-0.5">
                  <p className="text-ui-fg-base txt-compact-small-plus">
                    {toggle.label}
                  </p>
                  <p className="text-ui-fg-subtle txt-compact-small">
                    {toggle.desc}
                  </p>
                </div>
                <Switch
                  size="small"
                  checked={toggle.on}
                  onCheckedChange={(val) => onToggle?.(i, val)}
                />
              </div>
              {i < toggles.length - 1 && (
                <div className="bg-ui-border-base h-px w-full" />
              )}
            </div>
          ))}
        </div>
        <div className="flex items-start justify-end w-full">
          <Button variant="primary" size="small" onClick={onSave}>
            {saveLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SettingsNotifications;

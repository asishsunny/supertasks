import { Button, Switch } from "@medusajs/ui";
import type { SettingsToggle } from "@/types";

export interface SettingsNotificationsProps {
  title: string;
  toggles: SettingsToggle[];
  saveLabel: string;
}

export default function SettingsNotifications({
  title,
  toggles,
  saveLabel,
}: SettingsNotificationsProps) {
  return (
    <div className="bg-ui-bg-base flex flex-1 flex-col min-w-[1px] overflow-clip rounded-[8px] shadow-elevation-card-rest">
      <div className="flex flex-col px-6 py-3 shrink-0 w-full">
        <p className="shrink-0 text-ui-fg-base font-medium text-[14px] leading-[20px]">
          {title}
        </p>
      </div>
      <div className="bg-ui-border-base h-px shrink-0 w-full" />
      <div className="flex flex-col gap-0 p-6 shrink-0 w-full">
        {toggles.map((toggle, i) => (
          <div key={i}>
            <div className="flex items-center justify-between py-4 w-full">
              <div className="flex flex-col gap-0.5">
                <p className="text-ui-fg-base txt-compact-small-plus">
                  {toggle.label}
                </p>
                <p className="text-ui-fg-subtle txt-compact-small">
                  {toggle.desc}
                </p>
              </div>
              <Switch size="small" defaultChecked={toggle.on} />
            </div>
            {i < toggles.length - 1 && (
              <div className="bg-ui-border-base h-px w-full" />
            )}
          </div>
        ))}
        <div className="flex items-start justify-end pt-4 w-full">
          <Button variant="primary" size="small">
            {saveLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

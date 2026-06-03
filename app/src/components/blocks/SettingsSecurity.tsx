import { Switch, Button } from "@medusajs/ui";
import type { SettingsToggle } from "@/types";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface SidebarItem {
  label: string;
  active?: boolean;
}

export interface SettingsSecurityProps {
  sidebarItems?: SidebarItem[];
  heading?: string;
  toggles?: SettingsToggle[];
  saveLabel?: string;
}

/* ------------------------------------------------------------------ */
/*  Default Figma data (one representative item per array)             */
/* ------------------------------------------------------------------ */

const DEFAULT_SIDEBAR: SidebarItem[] = [
  { label: "Profile" },
  { label: "Notifications" },
  { label: "Security", active: true },
  { label: "Billing" },
];

const DEFAULT_TOGGLES: SettingsToggle[] = [
  { label: "Two-factor authentication", desc: "Add an extra layer of security to your account", on: false },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function SettingsSecurity({
  sidebarItems = DEFAULT_SIDEBAR,
  heading = "Security",
  toggles = DEFAULT_TOGGLES,
  saveLabel = "Save changes",
}: SettingsSecurityProps) {
  return (
    <div className="flex gap-6 items-start relative shrink-0 w-full">
      {/* Sidebar */}
      <div className="bg-ui-bg-base flex flex-col overflow-clip py-2 relative rounded-[8px] shadow-elevation-card-rest shrink-0 w-[240px]">
        {sidebarItems.map((item, i) =>
          item.active ? (
            <div
              key={i}
              className="bg-ui-bg-subtle border-ui-fg-base border-l-2 flex items-center px-4 py-2.5 relative shrink-0 w-full"
            >
              <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">
                {item.label}
              </p>
            </div>
          ) : (
            <div
              key={i}
              className="flex items-center px-4 py-2.5 relative shrink-0 w-full"
            >
              <p className="relative shrink-0 text-ui-fg-subtle txt-compact-small">
                {item.label}
              </p>
            </div>
          ),
        )}
      </div>

      {/* Content */}
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
                {i > 0 && <div className="h-px bg-ui-border-base mb-3" />}
                <div className="flex items-center justify-between relative shrink-0 w-full">
                  <div className="flex flex-col gap-1 relative shrink-0 text-[13px]">
                    <p className="relative shrink-0 text-ui-fg-base font-medium">
                      {toggle.label}
                    </p>
                    <p className="relative shrink-0 text-ui-fg-subtle font-normal">
                      {toggle.desc}
                    </p>
                  </div>
                  <Switch
                    checked={toggle.on}
                    className="h-5 relative shrink-0 w-[32px]"
                  />
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
  );
}

import React from "react";
import { Switch, Button } from "@medusajs/ui";
import type { SettingsToggle } from "@/types";

interface NavItem {
  label: string;
  active?: boolean;
}

export interface SettingsSecurityProps {
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
    label: "Two-factor authentication",
    desc: "Add an extra layer of security to your account",
    on: true
  },
  {
    label: "Login alerts",
    desc: "Get notified when a new device signs in",
    on: false
  },
  {
    label: "Session timeout",
    desc: "Automatically sign out after 30 minutes of inactivity",
    on: true
  },
  {
    label: "Require password change",
    desc: "Force password update every 90 days",
    on: false
  },
  {
    label: "SSO enforcement",
    desc: "Require single sign-on for all team members",
    on: true
  }
];
const DEFAULT_SAVE_LABEL = "Save changes";
const DEFAULT_HEADING = "Save changes";

export function SettingsSecurity({
  navItems = DEFAULT_NAV_ITEMS,
  onNavClick,
  title,
  toggles = DEFAULT_TOGGLES,
  saveLabel = DEFAULT_SAVE_LABEL,
  onSave,
  onToggle,
  heading = DEFAULT_HEADING,
}: SettingsSecurityProps) {
  return (
<div className="flex gap-6 items-start relative shrink-0 w-full">
      <div className="bg-ui-bg-base flex flex-col overflow-clip py-2 relative rounded-[8px] shadow-elevation-card-rest shrink-0 w-[240px]">
        {navItems.map((item, i) => (
          <button
            key={item.label}
            onClick={() => onNavClick?.(item.label)}
            className={`flex items-center px-4 py-2.5 relative shrink-0 w-full text-left ${item.active ? "bg-ui-bg-subtle border-ui-fg-base border-l-2" : ""}`}
          >
            <p className={`relative shrink-0 ${item.active ? "text-ui-fg-base txt-compact-small-plus" : "text-ui-fg-subtle txt-compact-small"}`}>
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
              <React.Fragment key={i}>
                {i > 0 && <div className="h-px bg-ui-border-base" />}
                <div className="flex items-center justify-between relative shrink-0 w-full">
                  <div className="flex flex-col gap-1 relative shrink-0 text-[13px] leading-[20px]">
                    <p className="relative shrink-0 text-ui-fg-base font-medium">
                      {toggle.label}
                    </p>
                    <p className="relative shrink-0 text-ui-fg-subtle font-normal">
                      {toggle.desc}
                    </p>
                  </div>
                  <Switch
                    checked={toggle.on}
                    onCheckedChange={(val) => onToggle?.(i, val)}
                    className="h-5 relative shrink-0 w-[32px]"
                  />
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className="flex items-start justify-end pt-2 relative shrink-0 w-full">
            <Button variant="primary" size="small" onClick={onSave}>{saveLabel}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

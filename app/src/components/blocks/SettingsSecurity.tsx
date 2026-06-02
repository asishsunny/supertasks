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
    // TODO: Agent fills from artifacts/transformed/settings-security.tsx
    <div>TODO</div>
  );
}

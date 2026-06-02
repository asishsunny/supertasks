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
    // TODO: Agent fills from artifacts/transformed/settings-notifications.tsx
    <div>TODO</div>
  );
}

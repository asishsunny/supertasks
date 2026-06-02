import { Avatar, Label, Input, Textarea, Button } from "@medusajs/ui";

interface NavItem {
  label: string;
  active?: boolean;
}

interface ProfileField {
  label: string;
  value: string;
}

interface ProfileFieldRow {
  fields: ProfileField[];
}

export interface SettingsProfileProps {
  navItems?: NavItem[];
  onNavClick?: (label: string) => void;
  title?: string;
  avatarSrc?: string;
  avatarFallback?: string;
  userName?: string;
  avatarHint?: string;
  fieldRows?: ProfileFieldRow[];
  bioLabel?: string;
  bioPlaceholder?: string;
  saveLabel?: string;
  onSave?: () => void;
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
const DEFAULT_AVATAR_FALLBACK = "LR";
const DEFAULT_USER_NAME = "Ludvig Rask";
const DEFAULT_AVATAR_HINT = "Click to change photo";
const DEFAULT_FIELD_ROWS: ProfileFieldRow[] = [
  {
    fields: [
      {
        label: "Full name",
        value: ""
      },
      {
        label: "Email",
        value: ""
      }
    ]
  },
  {
    fields: [
      {
        label: "Job title",
        value: ""
      },
      {
        label: "Phone",
        value: ""
      }
    ]
  },
  {
    fields: [
      {
        label: "Location",
        value: ""
      },
      {
        label: "Time zone",
        value: ""
      }
    ]
  }
];
const DEFAULT_BIO_LABEL = "Bio";
const DEFAULT_SAVE_LABEL = "Save changes";

export function SettingsProfile({
  navItems = DEFAULT_NAV_ITEMS,
  onNavClick,
  title,
  avatarSrc,
  avatarFallback = DEFAULT_AVATAR_FALLBACK,
  userName = DEFAULT_USER_NAME,
  avatarHint = DEFAULT_AVATAR_HINT,
  fieldRows = DEFAULT_FIELD_ROWS,
  bioLabel = DEFAULT_BIO_LABEL,
  bioPlaceholder,
  saveLabel = DEFAULT_SAVE_LABEL,
  onSave,
}: SettingsProfileProps) {
  return (
    // TODO: Agent fills from artifacts/transformed/settings-profile.tsx
    <div>TODO</div>
  );
}

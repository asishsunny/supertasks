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
    <div className="flex gap-6 items-start relative shrink-0 w-full">
      <div className="bg-ui-bg-base flex flex-col overflow-clip py-2 relative rounded-[8px] shadow-elevation-card-rest shrink-0 w-[240px]">
        {navItems.map((item, i) => (
          <button
            key={i}
            onClick={() => onNavClick?.(item.label)}
            className={`flex items-center px-4 py-2.5 relative shrink-0 w-full text-left ${
              item.active
                ? "bg-ui-bg-subtle border-ui-fg-base border-l-2"
                : ""
            }`}
          >
            <p
              className={`relative shrink-0 ${
                item.active
                  ? "text-ui-fg-base txt-compact-small-plus"
                  : "text-ui-fg-subtle txt-compact-small"
              }`}
            >
              {item.label}
            </p>
          </button>
        ))}
      </div>
      <div className="bg-ui-bg-base flex flex-1 flex-col min-w-[1px] overflow-clip relative rounded-[8px] shadow-elevation-card-rest">
        <div className="flex flex-col px-6 py-3 relative shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base font-medium text-[14px] leading-[20px]">
            {title ?? navItems.find((n) => n.active)?.label ?? "Profile"}
          </p>
        </div>
        <div className="h-px bg-ui-border-base" />
        <div className="flex flex-col gap-5 p-6 relative shrink-0 w-full">
          <div className="flex gap-3 items-center relative shrink-0 w-full">
            <Avatar
              src={avatarSrc}
              fallback={avatarFallback}
              size="xsmall"
            />
            <div className="flex flex-col gap-0.5 relative shrink-0 leading-[20px]">
              <p className="relative shrink-0 text-ui-fg-base font-medium text-[14px]">
                {userName}
              </p>
              <p className="relative shrink-0 text-ui-fg-subtle font-normal text-[13px]">
                {avatarHint}
              </p>
            </div>
          </div>
          {fieldRows.map((row, ri) => (
            <div
              key={ri}
              className="flex gap-4 items-start relative shrink-0 w-full"
            >
              {row.fields.map((field, fi) => (
                <div
                  key={fi}
                  className="flex flex-1 flex-col gap-1.5 min-w-[1px]"
                >
                  <Label size="small">{field.label}</Label>
                  <Input
                    size="small"
                    className="w-full"
                    defaultValue={field.value}
                  />
                </div>
              ))}
            </div>
          ))}
          <div className="flex flex-1 flex-col gap-1.5 min-w-[1px]">
            <Label size="small">{bioLabel}</Label>
            <Textarea placeholder={bioPlaceholder ?? "Placeholder"} />
          </div>
          <div className="flex items-start justify-end relative shrink-0 w-full">
            <Button variant="primary" size="small" onClick={onSave}>
              {saveLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

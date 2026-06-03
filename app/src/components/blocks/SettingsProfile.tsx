import { Button, Input, Label, Textarea } from "@medusajs/ui";
import { ColorAvatar } from "@/components/ColorAvatar";
import type { Member } from "@/types";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface SidebarItem {
  label: string;
  active?: boolean;
}

export interface FormField {
  label: string;
  defaultValue?: string;
}

export interface SettingsProfileProps {
  /** Currently logged-in user display name */
  userName?: string;
  /** Subtitle under avatar */
  avatarSubtitle?: string;
  /** Member object for ColorAvatar */
  user?: Pick<Member, "initials" | "avatarBg" | "avatarText">;
  /** Sidebar navigation items */
  sidebarItems?: SidebarItem[];
  /** Form field rows — each inner array is one row of fields */
  formRows?: FormField[][];
  /** Bio placeholder text */
  bioPlaceholder?: string;
  /** Section heading */
  heading?: string;
  /** Save button label */
  saveLabel?: string;
}

/* ------------------------------------------------------------------ */
/*  Default Figma data (one representative item per default)           */
/* ------------------------------------------------------------------ */

const DEFAULT_USER: Pick<Member, "initials" | "avatarBg" | "avatarText"> = {
  initials: "L",
  avatarBg: "tag-neutral-bg",
  avatarText: "tag-neutral-text",
};

const DEFAULT_SIDEBAR: SidebarItem[] = [
  { label: "Profile", active: true },
  { label: "Notifications" },
  { label: "Security" },
  { label: "Billing" },
];

const DEFAULT_FORM_ROWS: FormField[][] = [
  [
    { label: "Full name", defaultValue: "Ludvig Rask" },
    { label: "Email", defaultValue: "ludvig@taskflow.io" },
  ],
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function SettingsProfile({
  userName = "Ludvig Rask",
  avatarSubtitle = "Click to change photo",
  user = DEFAULT_USER,
  sidebarItems = DEFAULT_SIDEBAR,
  formRows = DEFAULT_FORM_ROWS,
  bioPlaceholder = "Placeholder",
  heading = "Profile",
  saveLabel = "Save changes",
}: SettingsProfileProps) {
  return (
    <div className="flex gap-6 items-start relative shrink-0 w-full">
      {/* Sidebar */}
      <div className="bg-ui-bg-base flex flex-col overflow-clip py-2 relative rounded-[8px] shadow-elevation-card-rest shrink-0 w-[240px]">
        {sidebarItems.map((item, i) => (
          <div
            key={i}
            className={`flex items-center px-4 py-2.5 relative shrink-0 w-full ${
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
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="bg-ui-bg-base flex flex-1 flex-col min-w-[1px] overflow-clip relative rounded-[8px] shadow-elevation-card-rest">
        <div className="flex flex-col px-6 py-3 relative shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
            {heading}
          </p>
        </div>
        <div className="h-px bg-ui-border-base" />
        <div className="flex flex-col gap-5 p-6 relative shrink-0 w-full">
          {/* Avatar row */}
          <div className="flex gap-3 items-center relative shrink-0 w-full">
            <ColorAvatar member={user} size="xlarge" />
            <div className="flex flex-col gap-0.5 relative shrink-0">
              <p className="relative shrink-0 text-ui-fg-base font-medium text-[14px]">
                {userName}
              </p>
              <p className="relative shrink-0 text-ui-fg-subtle font-normal text-[13px]">
                {avatarSubtitle}
              </p>
            </div>
          </div>

          {/* Form field rows */}
          {formRows.map((row, ri) => (
            <div
              key={ri}
              className="flex gap-4 items-start relative shrink-0 w-full"
            >
              {row.map((field, fi) => (
                <div
                  key={fi}
                  className="flex flex-1 flex-col gap-1.5 min-w-[1px]"
                >
                  <Label size="small">{field.label}</Label>
                  <Input
                    size="small"
                    className="w-full"
                    defaultValue={field.defaultValue}
                  />
                </div>
              ))}
            </div>
          ))}

          {/* Bio */}
          <div className="flex flex-1 flex-col gap-1.5 min-w-[1px]">
            <Label size="small">Bio</Label>
            <Textarea placeholder={bioPlaceholder} />
          </div>

          {/* Save button */}
          <div className="flex items-start justify-end relative shrink-0 w-full">
            <Button variant="primary" size="small">
              {saveLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

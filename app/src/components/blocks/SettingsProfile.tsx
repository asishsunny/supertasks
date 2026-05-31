// source: artifacts/transformed/settings-profile-templatized.tsx

import { Avatar, Button, Input, Label, Textarea } from "@medusajs/ui";

interface NavItem {
  label: string;
  active?: boolean;
}

interface FormField {
  label: string;
  defaultValue?: string;
  placeholder?: string;
}

interface SettingsProfileProps {
  title: string;
  navItems: NavItem[];
  avatarSrc?: string;
  userName: string;
  avatarHint: string;
  formRows: FormField[][];
  bioField: { label: string; placeholder: string };
  submitLabel: string;
}

export function SettingsProfile({
  title,
  navItems,
  avatarSrc,
  userName,
  avatarHint,
  formRows,
  bioField,
  submitLabel,
}: SettingsProfileProps) {
  return (
    <div className="flex gap-6 items-start w-full">
      <div className="bg-ui-bg-base flex flex-col overflow-clip py-2 rounded-[8px] shadow-elevation-card-rest shrink-0 w-[240px]">
        {navItems.map((item) => (
          <div
            key={item.label}
            className={`flex items-center px-4 py-2.5 w-full ${
              item.active
                ? "bg-ui-bg-subtle border-ui-fg-base border-l-2"
                : ""
            }`}
          >
            <p
              className={`text-ui-fg-${item.active ? "base" : "subtle"} ${
                item.active ? "txt-compact-small-plus" : "txt-compact-small"
              }`}
            >
              {item.label}
            </p>
          </div>
        ))}
      </div>
      <div className="bg-ui-bg-base flex flex-1 flex-col min-w-[1px] overflow-clip rounded-[8px] shadow-elevation-card-rest">
        <div className="flex flex-col px-6 py-3 w-full">
          <p className="text-ui-fg-base txt-compact-medium-plus">{title}</p>
        </div>
        <div className="h-px bg-ui-border-base" />
        <div className="flex flex-col gap-5 p-6 w-full">
          <div className="flex gap-3 items-center w-full">
            <Avatar src={avatarSrc} fallback={userName.charAt(0)} size="xlarge" />
            <div className="flex flex-col gap-0.5 w-[100px]">
              <p className="text-ui-fg-base txt-compact-small-plus">
                {userName}
              </p>
              <p className="text-ui-fg-subtle txt-compact-small">
                {avatarHint}
              </p>
            </div>
          </div>
          {formRows.map((row, ri) => (
            <div key={ri} className="flex gap-4 items-start w-full">
              {row.map((field) => (
                <div key={field.label} className="flex flex-1 flex-col gap-1.5 min-w-[1px]">
                  <Label size="small">{field.label}</Label>
                  <Input
                    size="small"
                    className="w-full"
                    defaultValue={field.defaultValue}
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
            </div>
          ))}
          <div className="flex flex-1 flex-col gap-1.5 min-w-[1px]">
            <Label size="small">{bioField.label}</Label>
            <Textarea placeholder={bioField.placeholder} />
          </div>
          <div className="flex items-start justify-end w-full">
            <Button variant="primary" size="small">
              {submitLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

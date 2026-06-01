import { Avatar, Button } from "@medusajs/ui";

export interface ProfileField {
  label: string;
  value: string;
}

export interface ProfileFieldRow {
  fields: [ProfileField, ProfileField];
}

export interface NavItem {
  label: string;
  active?: boolean;
}

export interface SettingsProfileProps {
  navItems: NavItem[];
  title: string;
  avatarSrc?: string;
  avatarFallback: string;
  userName: string;
  avatarHint: string;
  fieldRows: ProfileFieldRow[];
  bioLabel: string;
  bioPlaceholder: string;
  saveLabel: string;
}

export function SettingsProfile({
  navItems,
  title,
  avatarSrc,
  avatarFallback,
  userName,
  avatarHint,
  fieldRows,
  bioLabel,
  bioPlaceholder,
  saveLabel,
}: SettingsProfileProps) {
  return (
    <div className="flex gap-6 items-start w-full h-full">
      {/* Settings Nav */}
      <div className="bg-ui-bg-base flex flex-col overflow-clip py-2 rounded-lg shadow-elevation-card-rest shrink-0 w-[200px]">
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
              className={`shrink-0 ${
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

      {/* Content Card */}
      <div className="bg-ui-bg-base flex flex-1 flex-col min-w-[1px] overflow-clip rounded-lg shadow-elevation-card-rest">
        {/* Card Header */}
        <div className="flex flex-col px-6 py-3 w-full">
          <p className="text-ui-fg-base font-medium text-[14px] leading-5">
            {title}
          </p>
        </div>

        {/* Divider */}
        <div className="bg-ui-border-base h-px w-full" />

        {/* Card Body */}
        <div className="flex flex-col gap-5 p-6 w-full">
          {/* Avatar Row */}
          <div className="flex gap-3 items-center w-full">
            <Avatar
              src={avatarSrc}
              fallback={avatarFallback}
              size="xlarge"
            />
            <div className="flex flex-col gap-0.5">
              <p className="text-ui-fg-base font-medium text-[14px] leading-5">
                {userName}
              </p>
              <p className="text-ui-fg-subtle txt-compact-small">
                {avatarHint}
              </p>
            </div>
          </div>

          {/* Field Rows */}
          {fieldRows.map((row, rowIdx) => (
            <div
              key={rowIdx}
              className="flex gap-4 items-start w-full"
            >
              {row.fields.map((field) => (
                <div
                  key={field.label}
                  className="flex flex-1 flex-col gap-1.5 min-w-[1px]"
                >
                  <p className="text-ui-fg-base txt-compact-small-plus">
                    {field.label}
                  </p>
                  <div className="bg-ui-bg-field flex h-8 items-center overflow-clip px-2 rounded-md shadow-borders-base w-full">
                    <p className="flex-1 text-ui-fg-base txt-compact-small">
                      {field.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* Bio Field */}
          <div className="flex flex-col gap-1.5 w-full">
            <p className="text-ui-fg-base txt-compact-small-plus">
              {bioLabel}
            </p>
            <div className="bg-ui-bg-field flex flex-col gap-1.5 items-end justify-end overflow-clip px-2 py-1.5 rounded-md shadow-borders-base w-full">
              <p className="min-w-full text-ui-fg-muted txt-compact-small leading-normal">
                {bioPlaceholder}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-start justify-end w-full">
            <Button variant="primary" size="small">
              {saveLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

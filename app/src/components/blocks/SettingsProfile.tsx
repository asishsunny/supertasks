// source: code/visual-diff/output/settings-templatized.tsx
// nav items: data-repeat not marked but 4 siblings → .map()
// field rows: data-repeat="3" with inner data-repeat="2" → rows.map + fields.map
// textarea: raw <textarea> per transform, not Textarea component

import { Avatar, Button, Input, Label } from "@medusajs/ui";

export interface NavItem {
  label: string;
  active?: boolean;
}

export interface ProfileField {
  label: string;
  value: string;
}

export interface ProfileFieldRow {
  fields: ProfileField[];
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
  onNavClick?: (label: string) => void;
  onSave?: () => void;
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
  onNavClick,
  onSave,
}: SettingsProfileProps) {
  return (
    <div className="flex gap-6 items-start w-full h-full">
      {/* Settings Nav */}
      <div className="bg-ui-bg-base flex flex-col overflow-clip py-2 rounded-[8px] shadow-elevation-card-rest shrink-0 w-[200px]">
        {navItems.map((item) => (
          <div
            key={item.label}
            role="button"
            tabIndex={0}
            aria-current={item.active ? "page" : undefined}
            onClick={() => onNavClick?.(item.label)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onNavClick?.(item.label);
            }}
            className={`flex items-center px-4 py-2.5 shrink-0 w-full cursor-pointer ${
              item.active
                ? "bg-ui-bg-subtle border-ui-fg-base border-l-2"
                : ""
            }`}
          >
            <p
              className={
                item.active
                  ? "shrink-0 text-ui-fg-base txt-compact-small-plus"
                  : "shrink-0 text-ui-fg-subtle txt-compact-small"
              }
            >
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* Content Card */}
      <div className="bg-ui-bg-base flex flex-1 flex-col min-w-[1px] overflow-clip rounded-[8px] shadow-elevation-card-rest">
        {/* Card Header */}
        <div className="flex flex-col px-6 py-3 shrink-0 w-full">
          <p className="shrink-0 text-ui-fg-base txt-compact-medium-plus">
            {title}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-ui-border-base" />

        {/* Card Body */}
        <div className="flex flex-col gap-5 p-6 shrink-0 w-full">
          {/* Avatar Row */}
          <div className="flex gap-3 items-center shrink-0 w-full">
            <Avatar
              src={avatarSrc}
              fallback={avatarFallback}
              size="xlarge"
            />
            <div className="flex flex-col gap-0.5 shrink-0">
              <p className="shrink-0 text-ui-fg-base txt-compact-medium-plus">
                {userName}
              </p>
              <p className="shrink-0 text-ui-fg-subtle txt-compact-small">
                {avatarHint}
              </p>
            </div>
          </div>

          {/* Field Rows — data-repeat="3" outer, data-repeat="2" inner */}
          {fieldRows.map((row, rowIdx) => (
            <div key={rowIdx} className="flex gap-4 items-start shrink-0 w-full">
              {row.fields.map((field) => (
                <div
                  key={field.label}
                  className="flex flex-1 flex-col gap-1.5 min-w-[1px]"
                >
                  <Label size="small">{field.label}</Label>
                  <Input
                    size="small"
                    className="w-full"
                    defaultValue={field.value}
                    aria-label={field.label}
                  />
                </div>
              ))}
            </div>
          ))}

          {/* Bio — raw textarea per transform */}
          <div className="flex flex-1 flex-col gap-1.5 min-w-[1px]">
            <Label size="small">{bioLabel}</Label>
            <textarea
              className="bg-ui-bg-field min-h-[80px] overflow-clip px-2 py-1.5 rounded-md shadow-borders-base w-full text-ui-fg-muted txt-small resize-none"
              placeholder={bioPlaceholder}
              aria-label={bioLabel}
            />
          </div>

          {/* Actions */}
          <div className="flex items-start justify-end shrink-0 w-full">
            <Button variant="primary" size="small" onClick={onSave}>
              {saveLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

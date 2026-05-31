import { Button, Input, Label, Textarea } from "@medusajs/ui";
import { ColorAvatar } from "@/components/ColorAvatar";

export interface SettingsField {
  label: string;
  value: string;
}

export interface SettingsProfileProps {
  name: string;
  avatar: string;
  initials: string;
  photoHint: string;
  fieldRows: [SettingsField, SettingsField][];
  bioLabel: string;
  bioPlaceholder: string;
  saveLabel: string;
  tabs: string[];
  activeTab?: number;
  onTabChange?: (index: number) => void;
  onSave?: () => void;
}

export function SettingsProfile({
  name,
  avatar,
  initials,
  photoHint,
  fieldRows,
  bioLabel,
  bioPlaceholder,
  saveLabel,
  tabs,
  activeTab = 0,
  onTabChange,
  onSave,
}: SettingsProfileProps) {
  return (
    <div className="flex gap-6 items-start w-full h-full">
      {/* Sidebar tabs */}
      <div className="bg-ui-bg-base flex flex-col overflow-clip py-2 rounded-[8px] shadow-elevation-card-rest shrink-0 w-[200px]">
        {tabs.map((tab, i) => {
          const isActive = i === activeTab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => onTabChange?.(i)}
              className={`flex items-center px-4 py-2.5 w-full text-left ${
                isActive
                  ? "bg-ui-bg-subtle border-ui-fg-base border-l-2 text-ui-fg-base txt-compact-small-plus"
                  : "text-ui-fg-subtle txt-compact-small"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Content panel */}
      <div className="bg-ui-bg-base flex flex-1 flex-col min-w-[1px] overflow-clip rounded-[8px] shadow-elevation-card-rest">
        <div className="flex flex-col px-6 py-3 w-full">
          <p className="text-ui-fg-base txt-compact-medium-plus">
            {tabs[activeTab]}
          </p>
        </div>
        <div className="h-px bg-ui-border-base" />
        <div className="flex flex-col gap-5 p-6 w-full">
          {/* Avatar row */}
          <div className="flex gap-3 items-center w-full">
            <ColorAvatar
              member={{ initials, avatarBg: "tag-orange-bg", avatarText: "tag-orange-text" }}
              size="xlarge"
            />
            <div className="flex flex-col gap-0.5">
              <p className="text-ui-fg-base txt-compact-medium-plus">
                {name}
              </p>
              <p className="text-ui-fg-subtle txt-compact-small">
                {photoHint}
              </p>
            </div>
          </div>

          {/* Field rows */}
          {fieldRows.map((row, ri) => (
            <div key={ri} className="flex gap-4 items-start w-full">
              {row.map((field) => (
                <div key={field.label} className="flex flex-1 flex-col gap-1.5 min-w-[1px]">
                  <Label size="small">{field.label}</Label>
                  <Input size="small" className="w-full" defaultValue={field.value} />
                </div>
              ))}
            </div>
          ))}

          {/* Bio */}
          <div className="flex flex-1 flex-col gap-1.5 min-w-[1px]">
            <Label size="small">{bioLabel}</Label>
            <Textarea placeholder={bioPlaceholder} />
          </div>

          {/* Save button */}
          <div className="flex items-start justify-end w-full">
            <Button
              variant="primary"
              size="small"
              onClick={onSave}
            >
              {saveLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

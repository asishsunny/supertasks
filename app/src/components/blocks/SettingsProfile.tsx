import { Avatar, Button, Input, Label, Textarea } from "@medusajs/ui";

export interface SettingsField {
  label: string;
  value: string;
}

export interface SettingsProfileProps {
  name: string;
  avatar?: string;
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
    <div className="flex flex-col md:flex-row gap-6 items-start w-full">
      {/* Sidebar tabs */}
      <div className="bg-ui-bg-base flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible overflow-clip py-0 md:py-2 rounded-lg shadow-elevation-card-rest shrink-0 w-full md:w-[200px]">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={i === activeTab}
            onClick={() => onTabChange?.(i)}
            className={`flex flex-1 md:flex-none items-center justify-center md:justify-start px-4 py-2.5 whitespace-nowrap text-left cursor-pointer ${
              i === activeTab
                ? "bg-ui-bg-subtle md:border-l-2 border-b-2 md:border-b-0 border-ui-fg-base txt-compact-small-plus text-ui-fg-base"
                : "txt-compact-small text-ui-fg-subtle"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content panel */}
      <div className="bg-ui-bg-base flex flex-1 flex-col min-w-0 w-full md:w-auto overflow-clip rounded-lg shadow-elevation-card-rest">
        <div className="flex flex-col px-6 py-3 w-full">
          <p className="text-ui-fg-base txt-compact-medium-plus">
            {tabs[activeTab]}
          </p>
        </div>
        <div className="h-px bg-ui-border-base" />
        <div className="flex flex-col gap-4 md:gap-5 p-4 md:p-6 w-full">
          {/* Avatar row */}
          <div className="flex gap-3 items-center w-full">
            <Avatar src={avatar} fallback={initials} size="xlarge" />
            <div className="flex flex-col gap-0.5">
              <p className="text-ui-fg-base txt-compact-small-plus">{name}</p>
              <p className="text-ui-fg-subtle txt-compact-small">{photoHint}</p>
            </div>
          </div>

          {/* Field rows */}
          {fieldRows.map((row, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start w-full"
            >
              {row.map((f) => (
                <div
                  key={f.label}
                  className="flex flex-1 flex-col gap-1.5 min-w-0 w-full sm:w-auto"
                >
                  <Label size="small">{f.label}</Label>
                  <Input size="small" className="w-full" defaultValue={f.value} />
                </div>
              ))}
            </div>
          ))}

          {/* Bio */}
          <div className="flex flex-col gap-1.5 w-full">
            <Label size="small">{bioLabel}</Label>
            <Textarea placeholder={bioPlaceholder} />
          </div>

          {/* Save */}
          <div className="flex items-start justify-end w-full">
            <Button variant="primary" size="small" onClick={onSave}>
              {saveLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

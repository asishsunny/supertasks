import { Avatar, Button, Input, Label, Textarea } from "@medusajs/ui"

interface NavItem {
  label: string
  active?: boolean
}

interface FieldRow {
  fields: { label: string; value: string }[]
}

export interface SettingsProfileProps {
  navItems?: NavItem[]
  title?: string
  avatarSrc?: string
  avatarFallback?: string
  userName?: string
  avatarHint?: string
  fieldRows?: FieldRow[]
  bioLabel?: string
  bioPlaceholder?: string
  saveLabel?: string
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: "Profile", active: true },
  { label: "Notifications" },
  { label: "Security" },
  { label: "Billing" },
]

const DEFAULT_FIELD_ROWS: FieldRow[] = [
  { fields: [{ label: "Full name", value: "Ludvig Rask" }, { label: "Email", value: "ludvig@example.com" }] },
  { fields: [{ label: "Job title", value: "Designer" }, { label: "Phone", value: "+1 (555) 000-0000" }] },
  { fields: [{ label: "Location", value: "San Francisco, CA" }, { label: "Time zone", value: "Pacific Time (UTC-8)" }] },
]

export function SettingsProfile({
  navItems = DEFAULT_NAV_ITEMS,
  title = "Profile",
  avatarSrc,
  avatarFallback = "LR",
  userName = "Ludvig Rask",
  avatarHint = "Click to change photo",
  fieldRows = DEFAULT_FIELD_ROWS,
  bioLabel = "Bio",
  bioPlaceholder = "Placeholder",
  saveLabel = "Save changes",
}: SettingsProfileProps) {
  return (
    <div className="flex gap-6 items-start relative shrink-0 w-full">
      <div className="bg-ui-bg-base flex flex-col overflow-clip py-2 relative rounded-[8px] shadow-elevation-card-rest shrink-0 w-[240px]">
        {navItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center px-4 py-2.5 relative shrink-0 w-full ${item.active ? "bg-ui-bg-subtle border-ui-fg-base border-l-2" : ""}`}
          >
            <p className={`relative shrink-0 ${item.active ? "text-ui-fg-base txt-compact-small-plus" : "text-ui-fg-subtle txt-compact-small"}`}>
              {item.label}
            </p>
          </div>
        ))}
      </div>
      <div className="bg-ui-bg-base flex flex-1 flex-col min-w-[1px] overflow-clip relative rounded-[8px] shadow-elevation-card-rest">
        <div className="flex flex-col px-6 py-3 relative shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
            {title}
          </p>
        </div>
        <div className="h-px bg-ui-border-base" />
        <div className="flex flex-col gap-5 p-6 relative shrink-0 w-full">
          <div className="flex gap-3 items-center relative shrink-0 w-full">
            <Avatar src={avatarSrc} fallback={avatarFallback} size="xlarge" />
            <div className="flex flex-col gap-0.5 relative shrink-0">
              <p className="relative shrink-0 text-ui-fg-base font-medium text-[14px]">
                {userName}
              </p>
              <p className="relative shrink-0 text-ui-fg-subtle font-normal text-[13px]">
                {avatarHint}
              </p>
            </div>
          </div>
          {fieldRows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-4 items-start relative shrink-0 w-full">
              {row.fields.map((field, fieldIndex) => (
                <div key={fieldIndex} className="flex flex-1 flex-col gap-1.5 min-w-[1px]">
                  <Label size="small">{field.label}</Label>
                  <Input size="small" className="w-full" defaultValue={field.value} />
                </div>
              ))}
            </div>
          ))}
          <div className="flex flex-1 flex-col gap-1.5 min-w-[1px]">
            <Label size="small">{bioLabel}</Label>
            <Textarea placeholder={bioPlaceholder} />
          </div>
          <div className="flex items-start justify-end relative shrink-0 w-full">
            <Button variant="primary" size="small">{saveLabel}</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsProfile

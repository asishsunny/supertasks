import { Avatar } from "@medusajs/ui"
import { Button } from "@medusajs/ui"
import { Input } from "@medusajs/ui"
import { Label } from "@medusajs/ui"
import { Textarea } from "@medusajs/ui"

interface NavItem {
  label: string
  active?: boolean
}

interface ProfileField {
  label: string
  value: string
}

interface ProfileFieldRow {
  fields: ProfileField[]
}

export interface SettingsProfileProps {
  navItems: NavItem[]
  onNavClick?: (label: string) => void
  title: string
  avatarSrc?: string
  avatarFallback: string
  userName: string
  avatarHint: string
  fieldRows: ProfileFieldRow[]
  bioLabel: string
  bioPlaceholder: string
  saveLabel: string
  onSave?: () => void
}

export function SettingsProfile({
  navItems,
  onNavClick,
  title,
  avatarSrc,
  avatarFallback,
  userName,
  avatarHint,
  fieldRows,
  bioLabel,
  bioPlaceholder,
  saveLabel,
  onSave,
}: SettingsProfileProps) {
  return (
    <div className="flex gap-6 items-start w-full">
      <div className="bg-ui-bg-base flex flex-col overflow-clip py-2 rounded-[8px] shadow-elevation-card-rest shrink-0 w-[240px]">
        {navItems.map((item) => (
          <div
            key={item.label}
            className={`flex items-center px-4 py-2.5 w-full cursor-pointer ${
              item.active
                ? "bg-ui-bg-subtle border-ui-fg-base border-l-2"
                : ""
            }`}
            role="button"
            tabIndex={0}
            onClick={() => onNavClick?.(item.label)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                onNavClick?.(item.label)
              }
            }}
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
          <p className="text-ui-fg-base font-medium text-[14px] leading-[20px]">
            {title}
          </p>
        </div>
        <div className="h-px bg-ui-border-base" />
        <div className="flex flex-col gap-5 p-6 w-full">
          <div className="flex gap-3 items-center w-full">
            <Avatar
              src={avatarSrc}
              fallback={avatarFallback}
              size="xlarge"
            />
            <div className="flex flex-col gap-0.5 leading-[20px]">
              <p className="text-ui-fg-base font-medium text-[14px]">
                {userName}
              </p>
              <p className="text-ui-fg-subtle font-normal text-[13px]">
                {avatarHint}
              </p>
            </div>
          </div>
          {fieldRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex gap-4 items-start w-full"
            >
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
                  />
                </div>
              ))}
            </div>
          ))}
          <div className="flex flex-1 flex-col gap-1.5 min-w-[1px]">
            <Label size="small">{bioLabel}</Label>
            <Textarea placeholder={bioPlaceholder} />
          </div>
          <div className="flex items-start justify-end w-full">
            <Button variant="primary" size="small" onClick={onSave}>
              {saveLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

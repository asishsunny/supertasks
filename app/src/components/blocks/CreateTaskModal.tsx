import { Kbd, IconButton, Label, Select, Input, Textarea, Button } from "@medusajs/ui";
import { XMark } from "@medusajs/icons";
import type { ModalField } from "@/types";

export interface CreateTaskModalProps {
  title?: string;
  fields?: ModalField[];
  primaryAction?: string;
  secondaryAction?: string;
  escLabel?: string;
  onClose?: () => void;
  onSubmit?: () => void;
}

const DEFAULT_TITLE = "Create new task";
const DEFAULT_PRIMARY_ACTION = "Create task";
const DEFAULT_SECONDARY_ACTION = "Cancel";
const DEFAULT_ESC_LABEL = "Esc";

export function CreateTaskModal({
  title = DEFAULT_TITLE,
  fields,
  primaryAction = DEFAULT_PRIMARY_ACTION,
  secondaryAction = DEFAULT_SECONDARY_ACTION,
  escLabel = DEFAULT_ESC_LABEL,
  onClose,
  onSubmit,
}: CreateTaskModalProps) {
  /* Group fields by row */
  const rows: ModalField[][] = [];
  fields?.forEach((field) => {
    const rowIdx = field.row ?? rows.length;
    if (!rows[rowIdx]) rows[rowIdx] = [];
    rows[rowIdx].push(field);
  });

  return (
    <div className="bg-ui-bg-base flex flex-col overflow-clip relative rounded-[12px] shadow-elevation-card-rest shrink-0 max-w-[480px] w-full">
      {/* Header */}
      <div className="flex flex-col relative shrink-0 w-full">
        <div className="flex items-center justify-between px-6 py-2 relative shrink-0 w-full">
          <p className="flex-1 min-w-[1px] relative text-ui-fg-base font-medium text-[14px] leading-[20px]">
            {title}
          </p>
          <div className="flex gap-1 items-center relative shrink-0">
            <Kbd>{escLabel}</Kbd>
            <IconButton size="small" variant="transparent" onClick={onClose}>
              <XMark />
            </IconButton>
          </div>
        </div>
        <div className="h-px bg-ui-border-base" />
      </div>

      {/* Fields */}
      <div className="flex flex-col gap-5 p-6 relative shrink-0 w-full">
        {rows.map((rowFields, rowIdx) =>
          rowFields.length > 1 ? (
            <div
              key={rowIdx}
              className="flex gap-4 items-start relative shrink-0 w-full"
            >
              {rowFields.map((field) => (
                <div
                  key={field.label}
                  className="flex flex-1 flex-col gap-1.5 min-w-[1px]"
                >
                  <Label size="small">{field.label}</Label>
                  {field.type === "select" && (
                    <Select size="small">
                      <Select.Trigger>
                        <Select.Value placeholder={field.placeholder ?? "Select"} />
                      </Select.Trigger>
                    </Select>
                  )}
                  {field.type === "input" && (
                    <Input
                      size="small"
                      className="w-full"
                      placeholder={field.placeholder}
                      defaultValue={field.value}
                    />
                  )}
                  {field.type === "textarea" && (
                    <Textarea
                      placeholder={field.placeholder ?? "Placeholder"}
                      defaultValue={field.value}
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div
              key={rowIdx}
              className="flex flex-1 flex-col gap-1.5 min-w-[1px]"
            >
              <Label size="small">{rowFields[0].label}</Label>
              {rowFields[0].type === "select" && (
                <Select size="small">
                  <Select.Trigger>
                    <Select.Value placeholder={rowFields[0].placeholder ?? "Select"} />
                  </Select.Trigger>
                </Select>
              )}
              {rowFields[0].type === "input" && (
                <Input
                  size="small"
                  className="w-full"
                  placeholder={rowFields[0].placeholder}
                  defaultValue={rowFields[0].value}
                />
              )}
              {rowFields[0].type === "textarea" && (
                <Textarea
                  placeholder={rowFields[0].placeholder ?? "Placeholder"}
                  defaultValue={rowFields[0].value}
                />
              )}
            </div>
          )
        )}
      </div>

      {/* Footer */}
      <div className="flex flex-col relative shrink-0 w-full">
        <div className="h-px bg-ui-border-base" />
        <div className="flex gap-2 items-center justify-end px-6 py-4 relative shrink-0 w-full">
          <Button variant="secondary" size="small" onClick={onClose}>
            {secondaryAction}
          </Button>
          <Button variant="primary" size="small" onClick={onSubmit}>
            {primaryAction}
          </Button>
        </div>
      </div>
    </div>
  );
}

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

export const CREATE_TASK_DEFAULTS = {
  title: "Create new task",
  primaryAction: "Generate report",
  secondaryAction: "Cancel"
};

export function CreateTaskModal({
  title = DEFAULT_TITLE,
  fields,
  primaryAction = DEFAULT_PRIMARY_ACTION,
  secondaryAction = DEFAULT_SECONDARY_ACTION,
  escLabel = DEFAULT_ESC_LABEL,
  onClose,
  onSubmit,
}: CreateTaskModalProps) {
  // Group fields by row number for side-by-side layout
  const rows: ModalField[][] = [];
  if (fields) {
    const rowMap = new Map<number, ModalField[]>();
    let autoRow = 1000;
    fields.forEach((f) => {
      const r = f.row ?? autoRow++;
      if (!rowMap.has(r)) rowMap.set(r, []);
      rowMap.get(r)!.push(f);
    });
    rowMap.forEach((group) => rows.push(group));
  }

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
        {rows.map((group, ri) =>
          group.length > 1 ? (
            <div key={ri} className="flex gap-4 items-start relative shrink-0 w-full">
              {group.map((field, fi) => (
                <div key={fi} className="flex flex-1 flex-col gap-1.5 min-w-[1px]">
                  <Label size="small">{field.label}</Label>
                  {field.type === "select" ? (
                    <Select size="small">
                      <Select.Trigger>
                        <Select.Value placeholder={field.placeholder ?? "Select"} />
                      </Select.Trigger>
                    </Select>
                  ) : field.type === "textarea" ? (
                    <Textarea
                      placeholder={field.placeholder ?? "Placeholder"}
                      defaultValue={field.value}
                    />
                  ) : (
                    <Input
                      size="small"
                      className="w-full"
                      placeholder={field.placeholder}
                      defaultValue={field.value}
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div key={ri} className="flex flex-1 flex-col gap-1.5 min-w-[1px]">
              <Label size="small">{group[0].label}</Label>
              {group[0].type === "select" ? (
                <Select size="small">
                  <Select.Trigger>
                    <Select.Value placeholder={group[0].placeholder ?? "Select"} />
                  </Select.Trigger>
                </Select>
              ) : group[0].type === "textarea" ? (
                <Textarea
                  placeholder={group[0].placeholder ?? "Placeholder"}
                  defaultValue={group[0].value}
                />
              ) : (
                <Input
                  size="small"
                  className="w-full"
                  placeholder={group[0].placeholder}
                  defaultValue={group[0].value}
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

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
  return (
<div className="bg-ui-bg-base flex flex-col overflow-clip relative rounded-[12px] shadow-elevation-card-rest shrink-0 max-w-[480px] w-full">
  <div className="flex flex-col relative shrink-0 w-full">
    <div className="flex items-center justify-between px-6 py-2 relative shrink-0 w-full">
      <p className="flex-1 min-w-[1px] relative text-ui-fg-base font-medium text-[14px] leading-[20px]">
        {title}
      </p>
      <div className="flex gap-1 items-center relative shrink-0">
        <Kbd>{escLabel}</Kbd>
        <IconButton size="small" variant="transparent" onClick={onClose}><XMark /></IconButton>
      </div>
    </div>
    <div className="h-px bg-ui-border-base" />
  </div>
  <div className="flex flex-col gap-5 p-6 relative shrink-0 w-full">
    {fields && (() => {
      const rows: Record<string, typeof fields> = {};
      const standalone: typeof fields = [];
      fields.forEach((field) => {
        if (field.row !== undefined) {
          const key = String(field.row);
          if (!rows[key]) rows[key] = [];
          rows[key].push(field);
        } else {
          standalone.push(field);
        }
      });
      const rowKeys = Object.keys(rows).sort((a, b) => Number(a) - Number(b));
      const elements: React.ReactNode[] = [];
      let fieldIndex = 0;
      fields.forEach((field) => {
        if (field.row !== undefined) {
          const key = String(field.row);
          if (rowKeys.includes(key)) {
            const rowFields = rows[key];
            elements.push(
              <div key={`row-${key}`} className="flex gap-4 items-start relative shrink-0 w-full">
                {rowFields.map((f, j) => (
                  <div key={j} className="flex flex-1 flex-col gap-1.5 min-w-[1px]">
                    <Label size="small">{f.label}</Label>
                    {f.type === "select" && <Select size="small"><Select.Trigger><Select.Value placeholder={f.placeholder || "Select"} /></Select.Trigger></Select>}
                    {f.type === "input" && <Input size="small" className="w-full" placeholder={f.placeholder} defaultValue={f.value} />}
                    {f.type === "textarea" && <Textarea placeholder={f.placeholder || "Placeholder"} defaultValue={f.value} />}
                  </div>
                ))}
              </div>
            );
            rowKeys.splice(rowKeys.indexOf(key), 1);
          }
        } else {
          elements.push(
            <div key={`field-${fieldIndex++}`} className="flex flex-1 flex-col gap-1.5 min-w-[1px]">
              <Label size="small">{field.label}</Label>
              {field.type === "select" && <Select size="small"><Select.Trigger><Select.Value placeholder={field.placeholder || "Select"} /></Select.Trigger></Select>}
              {field.type === "input" && <Input size="small" className="w-full" placeholder={field.placeholder} defaultValue={field.value} />}
              {field.type === "textarea" && <Textarea placeholder={field.placeholder || "Placeholder"} defaultValue={field.value} />}
            </div>
          );
        }
      });
      return elements;
    })()}
  </div>
  <div className="flex flex-col relative shrink-0 w-full">
    <div className="h-px bg-ui-border-base" />
    <div className="flex gap-2 items-center justify-end px-6 py-4 relative shrink-0 w-full">
      <Button variant="secondary" size="small" onClick={onClose}>{secondaryAction}</Button>
      <Button variant="primary" size="small" onClick={onSubmit}>{primaryAction}</Button>
    </div>
  </div>
</div>
  );
}

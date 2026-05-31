// source: artifacts/transformed/create-task-modal-templatized.tsx
// built: fields → ModalField[] prop, row grouping, hardcoded text → props

import { Button, IconButton, Input, Kbd, Label, Select, Textarea } from "@medusajs/ui";
import { XMark } from "@medusajs/icons";
import type { ModalField } from "@/types";

export interface CreateTaskModalProps {
  title: string;
  fields: ModalField[];
  primaryAction: string;
  secondaryAction: string;
  onClose?: () => void;
  onSubmit?: () => void;
}

function FieldControl({ field }: { field: ModalField }) {
  switch (field.type) {
    case "textarea":
      return <Textarea placeholder={field.placeholder} defaultValue={field.value} />;
    case "select":
      return (
        <Select size="small">
          <Select.Trigger>
            <Select.Value placeholder={field.value ?? field.placeholder ?? "Select"} />
          </Select.Trigger>
        </Select>
      );
    default:
      return <Input size="small" className="w-full" placeholder={field.placeholder} defaultValue={field.value} />;
  }
}

export function CreateTaskModal({
  title,
  fields,
  primaryAction,
  secondaryAction,
  onClose,
  onSubmit,
}: CreateTaskModalProps) {
  // Group fields: those with matching row numbers go together, others standalone
  const grouped: (ModalField | ModalField[])[] = [];
  const rowMap = new Map<number, ModalField[]>();

  for (const f of fields) {
    if (f.row != null) {
      const existing = rowMap.get(f.row);
      if (existing) {
        existing.push(f);
      } else {
        const arr = [f];
        rowMap.set(f.row, arr);
        grouped.push(arr);
      }
    } else {
      grouped.push(f);
    }
  }

  return (
    <div className="bg-ui-bg-base flex flex-col overflow-clip rounded-xl shadow-elevation-card-rest w-full">
      {/* Header */}
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between px-6 py-2 w-full">
          <p className="flex-1 min-w-[1px] text-ui-fg-base txt-compact-medium-plus">
            {title}
          </p>
          <div className="flex gap-1 items-center">
            <Kbd>Esc</Kbd>
            <IconButton
              size="small"
              variant="transparent"
              aria-label="Close modal"
              onClick={onClose}
            >
              <XMark />
            </IconButton>
          </div>
        </div>
        <div className="h-px bg-ui-border-base" />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-5 p-6 w-full">
        {grouped.map((entry, i) => {
          if (Array.isArray(entry)) {
            return (
              <div key={i} className="flex gap-4 items-start w-full">
                {entry.map((f) => (
                  <div key={f.label} className="flex flex-1 flex-col gap-1.5 min-w-[1px]">
                    <Label size="small">{f.label}</Label>
                    <FieldControl field={f} />
                  </div>
                ))}
              </div>
            );
          }

          return (
            <div key={entry.label} className="flex flex-1 flex-col gap-1.5 min-w-[1px]">
              <Label size="small">{entry.label}</Label>
              <FieldControl field={entry} />
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex flex-col w-full">
        <div className="h-px bg-ui-border-base" />
        <div className="flex gap-2 items-center justify-end px-6 py-4 w-full">
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

import { Button, IconButton, Input, Kbd, Label, Select, Textarea } from "@medusajs/ui";
import { XMark } from "@medusajs/icons";
import type { ModalField } from "@/types";

export interface CreateTaskModalProps {
  title: string;
  fields: ModalField[];
  primaryAction: string;
  secondaryAction: string;
  escLabel: string;
  onClose?: () => void;
  onSubmit?: () => void;
}

export function CreateTaskModal({
  title,
  fields,
  primaryAction,
  secondaryAction,
  escLabel,
  onClose,
  onSubmit,
}: CreateTaskModalProps) {
  // Group fields by row number; undefined row = standalone full-width
  const rows: ModalField[][] = [];
  const usedIndices = new Set<number>();

  fields.forEach((field, i) => {
    if (usedIndices.has(i)) return;
    if (field.row != null) {
      const group = fields.filter((f, j) => f.row === field.row && !usedIndices.has(j));
      group.forEach((_, gi) => {
        const idx = fields.findIndex((f, j) => f.row === field.row && !usedIndices.has(j));
        if (idx >= 0) usedIndices.add(idx);
      });
      rows.push(group);
    } else {
      usedIndices.add(i);
      rows.push([field]);
    }
  });

  const renderField = (field: ModalField) => {
    switch (field.type) {
      case "textarea":
        return (
          <Textarea
            placeholder={field.placeholder ?? "Placeholder"}
            defaultValue={field.value}
          />
        );
      case "select":
        return (
          <Select size="small">
            <Select.Trigger>
              <Select.Value placeholder={field.placeholder ?? "Select"} />
            </Select.Trigger>
          </Select>
        );
      case "input":
      default:
        return <Input size="small" className="w-full" placeholder={field.placeholder} defaultValue={field.value} />;
    }
  };

  return (
    <div className="bg-ui-bg-base flex flex-col overflow-clip rounded-[12px] shadow-elevation-card-rest max-w-[480px] w-full">
      {/* Header */}
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between px-6 py-2 w-full">
          <p className="flex-1 min-w-[1px] text-ui-fg-base font-medium text-[14px] leading-[20px]">
            {title}
          </p>
          <div className="flex gap-1 items-center">
            <Kbd>{escLabel}</Kbd>
            <IconButton
              size="small"
              variant="transparent"
              onClick={onClose}
              aria-label="Close"
            >
              <XMark />
            </IconButton>
          </div>
        </div>
        <div className="h-px bg-ui-border-base" />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-5 p-6 w-full">
        {rows.map((row, ri) =>
          row.length > 1 ? (
            <div key={ri} className="flex gap-4 items-start w-full">
              {row.map((field, fi) => (
                <div key={fi} className="flex flex-1 flex-col gap-1.5 min-w-[1px]">
                  <Label size="small">{field.label}</Label>
                  {renderField(field)}
                </div>
              ))}
            </div>
          ) : (
            <div key={ri} className="flex flex-1 flex-col gap-1.5 min-w-[1px]">
              <Label size="small">{row[0].label}</Label>
              {renderField(row[0])}
            </div>
          )
        )}
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

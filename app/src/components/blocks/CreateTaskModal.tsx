import { Button, IconButton, Input, Label, Kbd, Select, Textarea } from "@medusajs/ui";
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

export function CreateTaskModal({ title, fields, primaryAction, secondaryAction, onClose, onSubmit }: CreateTaskModalProps) {
  const standalone = fields.filter((f) => !f.row);
  const rows = new Map<number, ModalField[]>();
  for (const f of fields) {
    if (f.row) {
      if (!rows.has(f.row)) rows.set(f.row, []);
      rows.get(f.row)!.push(f);
    }
  }

  return (
    <div className="bg-ui-bg-base flex flex-col overflow-clip rounded-xl shadow-elevation-card-rest w-full">
      <div className="flex items-center justify-between px-6 py-2 w-full">
        <p className="flex-1 min-w-[1px] text-ui-fg-base txt-compact-medium-plus">{title}</p>
        <div className="flex gap-1 items-center">
          <Kbd>Esc</Kbd>
          <IconButton size="small" variant="transparent" onClick={onClose} aria-label="Close modal">
            <XMark />
          </IconButton>
        </div>
      </div>
      <div className="h-px bg-ui-border-base" />
      <div className="flex flex-col gap-5 p-6 w-full">
        {standalone.map((f) => (
          <div key={f.label} className="flex flex-col gap-1.5 w-full">
            <Label size="small">{f.label}</Label>
            {f.type === "input" && <Input size="small" className="w-full" placeholder={f.placeholder} />}
            {f.type === "textarea" && <Textarea placeholder={f.placeholder} />}
          </div>
        ))}
        {[...rows.entries()].map(([rowNum, rowFields]) => (
          <div key={rowNum} className="flex gap-4 items-start w-full">
            {rowFields.map((f) => (
              <div key={f.label} className="flex flex-1 flex-col gap-1.5 min-w-[1px]">
                <Label size="small">{f.label}</Label>
                {f.type === "select" ? (
                  <Select size="small">
                    <Select.Trigger>
                      <Select.Value placeholder={f.placeholder || "Select"} />
                    </Select.Trigger>
                  </Select>
                ) : (
                  <Input size="small" className="w-full" placeholder={f.placeholder || ""} />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="h-px bg-ui-border-base" />
      <div className="flex gap-2 items-center justify-end px-6 py-4 w-full">
        <Button variant="secondary" size="small" onClick={onClose}>{secondaryAction}</Button>
        <Button variant="primary" size="small" onClick={onSubmit}>{primaryAction}</Button>
      </div>
    </div>
  );
}

// source: artifacts/transformed/create-task-modal-templatized.tsx

import { Button, IconButton, Input, Label, Kbd, Select, Textarea } from "@medusajs/ui";
import { XMark } from "@medusajs/icons";
import type { ModalField, ModalConfig } from "@/types";

interface CreateTaskModalProps {
  config: ModalConfig;
  onClose?: () => void;
  onSubmit?: () => void;
}

export function CreateTaskModal({ config, onClose, onSubmit }: CreateTaskModalProps) {
  const { title, fields, actions } = config;

  const rows = new Map<number, ModalField[]>();
  const standalone: ModalField[] = [];
  for (const f of fields) {
    if (f.row != null) {
      if (!rows.has(f.row)) rows.set(f.row, []);
      rows.get(f.row)!.push(f);
    } else {
      standalone.push(f);
    }
  }

  return (
    <div className="bg-ui-bg-base flex flex-col overflow-clip rounded-[12px] shadow-elevation-card-rest max-w-[480px] w-full">
      {/* Header */}
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between px-6 py-2 w-full">
          <p className="flex-1 min-w-[1px] text-ui-fg-base txt-compact-medium-plus">
            {title}
          </p>
          <div className="flex gap-1 items-center">
            <Kbd>Esc</Kbd>
            <IconButton size="small" variant="transparent" onClick={onClose}>
              <XMark />
            </IconButton>
          </div>
        </div>
        <div className="h-px bg-ui-border-base" />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-5 p-6 w-full">
        {/* Row-grouped fields (data-repeat) */}
        {[...rows.entries()].map(([rowNum, rowFields]) => (
          <div key={rowNum} className="flex gap-4 items-start w-full">
            {rowFields.map((f) => (
              <div key={f.label} className="flex flex-1 flex-col gap-1.5 min-w-[1px]">
                <Label size="small">{f.label}</Label>
                <Select size="small">
                  <Select.Trigger placeholder={f.placeholder ?? "Select"} />
                </Select>
              </div>
            ))}
          </div>
        ))}

        {/* Standalone fields */}
        {standalone.map((f) => (
          <div key={f.label} className="flex flex-1 flex-col gap-1.5 min-w-[1px]">
            <Label size="small">{f.label}</Label>
            {f.type === "input" && <Input size="small" className="w-full" placeholder={f.placeholder} />}
            {f.type === "textarea" && (
              <Textarea placeholder={f.placeholder} defaultValue={f.value} />
            )}
            {f.type === "select" && (
              <Select size="small">
                <Select.Trigger placeholder={f.placeholder ?? "Select"} />
              </Select>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex flex-col w-full">
        <div className="h-px bg-ui-border-base" />
        <div className="flex gap-2 items-center justify-end px-6 py-4 w-full">
          <Button variant="secondary" size="small" onClick={onClose}>{actions.secondary}</Button>
          <Button variant="primary" size="small" onClick={onSubmit}>{actions.primary}</Button>
        </div>
      </div>
    </div>
  );
}

// source: artifacts/transformed/create-task-modal.tsx
// adapt: hardcoded field labels → props, Button from Medusa

"use client";

import { Button, IconButton } from "@medusajs/ui";
import { XMark } from "@medusajs/icons";

interface Field {
  label: string;
  placeholder?: string;
  type: "input" | "textarea" | "select";
  row?: number;
}

interface CreateTaskModalProps {
  title: string;
  fields: Field[];
  primaryAction: string;
  secondaryAction: string;
  onClose?: () => void;
  onSubmit?: () => void;
}

export function CreateTaskModal({ title, fields, primaryAction, secondaryAction, onClose, onSubmit }: CreateTaskModalProps) {
  const standalone = fields.filter((f) => !f.row);
  const rows = new Map<number, Field[]>();
  for (const f of fields) {
    if (f.row) {
      if (!rows.has(f.row)) rows.set(f.row, []);
      rows.get(f.row)!.push(f);
    }
  }

  return (
    <div className="bg-ui-bg-base flex flex-col overflow-clip relative rounded-[12px] shadow-elevation-card-rest w-full h-full">
      <div className="flex flex-col relative shrink-0 w-full">
        <div className="flex items-center justify-between px-6 py-2 relative shrink-0 w-full">
          <p className="flex-1 min-w-[1px] relative text-ui-fg-base font-medium text-[14px] leading-[20px]">{title}</p>
          <div className="flex gap-1 items-center relative shrink-0">
            <div className="bg-ui-bg-field border border-ui-border-base flex flex-col h-4 items-center justify-center overflow-clip px-1 relative rounded shrink-0">
              <p className="relative shrink-0 text-ui-fg-subtle text-center txt-compact-xsmall-plus">Esc</p>
            </div>
            <IconButton size="small" variant="transparent" onClick={onClose}>
              <XMark />
            </IconButton>
          </div>
        </div>
        <div className="bg-ui-border-base h-px relative shrink-0 w-full" />
      </div>
      <div className="flex flex-col gap-5 p-6 relative shrink-0 w-full">
        {standalone.map((f) => (
          <div key={f.label} className="flex flex-col gap-1.5 relative shrink-0 w-full">
            <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">{f.label}</p>
            {f.type === "input" && (
              <div className="bg-ui-bg-field flex h-8 items-center overflow-clip px-2 relative rounded-md shadow-borders-base shrink-0 w-full">
                <p className="flex-1 text-ui-fg-muted txt-compact-small">{f.placeholder}</p>
              </div>
            )}
            {f.type === "textarea" && (
              <div className="bg-ui-bg-field flex flex-col gap-1.5 items-end justify-end overflow-clip px-2 py-1.5 relative rounded-md shadow-borders-base shrink-0 w-full">
                <p className="min-w-full relative shrink-0 text-ui-fg-muted txt-small">{f.placeholder}</p>
                <div className="relative shrink-0 size-[15px]" />
              </div>
            )}
          </div>
        ))}
        {[...rows.entries()].map(([rowNum, rowFields]) => (
          <div key={rowNum} className="flex gap-4 items-start relative shrink-0 w-full">
            {rowFields.map((f) => (
              <div key={f.label} className="flex flex-1 flex-col gap-1.5 min-w-[1px] relative">
                <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">{f.label}</p>
                <div className="bg-ui-bg-field flex gap-2 items-center overflow-clip px-2 py-1.5 relative rounded-[6px] shadow-borders-base shrink-0 w-full">
                  <p className="flex-1 text-ui-fg-muted txt-compact-small">{f.placeholder || "Select"}</p>
                  <div className="relative shrink-0 size-[15px]" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-col relative shrink-0 w-full">
        <div className="bg-ui-border-base h-px relative shrink-0 w-full" />
        <div className="flex gap-2 items-center justify-end px-6 py-4 relative shrink-0 w-full">
          <Button variant="secondary" size="small" onClick={onClose}>{secondaryAction}</Button>
          <Button variant="primary" size="small" onClick={onSubmit}>{primaryAction}</Button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Button, IconButton, Label, Input, Textarea, Select } from "@medusajs/ui";
import { XMark } from "@medusajs/icons";
import type { ModalConfig } from "@/types";

interface FormModalProps {
  config: ModalConfig;
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

export function FormModal({ config, open, onClose, onSubmit }: FormModalProps) {
  if (!open) return null;

  const grouped: Record<number, typeof config.fields> = {};
  for (const f of config.fields) {
    const row = f.row ?? -1;
    (grouped[row] ??= []).push(f);
  }

  return (
    <div className="bg-ui-bg-base flex flex-col overflow-clip rounded-xl shadow-elevation-card-rest w-[480px]">
      <div className="flex flex-col shrink-0 w-full">
        <div className="flex items-center justify-between px-6 py-2">
          <p className="flex-1 font-medium text-sm text-ui-fg-base">{config.title}</p>
          <div className="flex gap-1 items-center">
            <kbd className="bg-ui-bg-field border border-ui-border-base flex items-center justify-center h-4 px-1 rounded txt-compact-xsmall-plus text-ui-fg-subtle">
              Esc
            </kbd>
            <IconButton size="small" variant="transparent" onClick={onClose}>
              <XMark />
            </IconButton>
          </div>
        </div>
        <div className="bg-ui-border-base h-px w-full" />
      </div>

      <div className="flex flex-col gap-5 p-6">
        {Object.entries(grouped).map(([row, fields]) => {
          if (row === "-1") {
            return fields.map((f) => (
              <div key={f.label} className="flex flex-col gap-1.5">
                <Label className="txt-compact-small-plus">{f.label}</Label>
                {f.type === "input" && <Input size="small" placeholder={f.placeholder} />}
                {f.type === "textarea" && <Textarea placeholder={f.placeholder} />}
                {f.type === "select" && (
                  <Select size="small">
                    <Select.Trigger><Select.Value placeholder={f.value || "Select"} /></Select.Trigger>
                    <Select.Content><Select.Item value="none">—</Select.Item></Select.Content>
                  </Select>
                )}
              </div>
            ));
          }
          return (
            <div key={row} className="flex gap-4">
              {fields.map((f) => (
                <div key={f.label} className="flex flex-1 flex-col gap-1.5 min-w-0">
                  <Label className="txt-compact-small-plus">{f.label}</Label>
                  {f.type === "select" && (
                    <Select size="small">
                      <Select.Trigger><Select.Value placeholder={f.value || "Select"} /></Select.Trigger>
                      <Select.Content><Select.Item value="none">—</Select.Item></Select.Content>
                    </Select>
                  )}
                  {f.type === "input" && <Input size="small" placeholder={f.placeholder} />}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col shrink-0 w-full">
        <div className="bg-ui-border-base h-px w-full" />
        <div className="flex gap-2 items-center justify-end px-6 py-4">
          <Button variant="secondary" size="small" onClick={onClose}>
            {config.actions.secondary}
          </Button>
          <Button variant="primary" size="small" onClick={onSubmit}>
            {config.actions.primary}
          </Button>
        </div>
      </div>
    </div>
  );
}

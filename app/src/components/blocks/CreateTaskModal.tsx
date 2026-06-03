// source: artifacts/transformed/create-task-modal-templatized.tsx
// adapt: 3 modal variants → single generic modal driven by fields prop

import { Button, IconButton, Input, Kbd, Label, Select, Textarea } from "@medusajs/ui";
import { XMark } from "@medusajs/icons";
import type { ModalField } from "@/types";

export interface CreateTaskModalProps {
  title?: string;
  fields?: ModalField[];
  primaryAction?: string;
  secondaryAction?: string;
  onClose?: () => void;
  onSubmit?: () => void;
}

function FieldControl({ field }: { field: ModalField }) {
  switch (field.type) {
    case "textarea":
      return (
        <Textarea
          placeholder={field.placeholder ?? "Placeholder"}
          defaultValue={field.value ?? ""}
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
      return (
        <Input
          size="small"
          className="w-full"
          placeholder={field.placeholder}
          defaultValue={field.value ?? ""}
        />
      );
  }
}

/** Group fields by row number; fields without row get their own row */
function groupByRow(fields: ModalField[]): ModalField[][] {
  const rows: Record<number, ModalField[]> = {};
  let autoRow = 1000;
  for (const f of fields) {
    const key = f.row ?? autoRow++;
    if (!rows[key]) rows[key] = [];
    rows[key].push(f);
  }
  return Object.keys(rows)
    .sort((a, b) => Number(a) - Number(b))
    .map((k) => rows[Number(k)]);
}

export function CreateTaskModal({
  title = "Create new task",
  fields = [
    { label: "Priority", type: "select", placeholder: "Select", row: 1 },
    { label: "Status", type: "select", placeholder: "Select", row: 1 },
    { label: "Assignee", type: "select", placeholder: "Select", row: 2 },
    { label: "Due date", type: "select", placeholder: "Select", row: 2 },
    { label: "Task name", type: "input" },
    { label: "Description", type: "textarea", value: "Add a description..." },
  ],
  primaryAction = "Create task",
  secondaryAction = "Cancel",
  onClose,
  onSubmit,
}: CreateTaskModalProps) {
  const rows = groupByRow(fields);

  return (
    <div className="bg-ui-bg-base flex flex-col overflow-clip relative rounded-[12px] shadow-elevation-card-rest shrink-0 max-w-[480px] w-full">
      {/* Header */}
      <div className="flex flex-col relative shrink-0 w-full">
        <div className="flex items-center justify-between px-6 py-2 relative shrink-0 w-full">
          <p className="flex-1 min-w-[1px] relative text-ui-fg-base txt-compact-medium-plus">
            {title}
          </p>
          <div className="flex gap-1 items-center relative shrink-0">
            <Kbd>Esc</Kbd>
            <IconButton size="small" variant="transparent" onClick={onClose}>
              <XMark />
            </IconButton>
          </div>
        </div>
        <div className="h-px bg-ui-border-base" />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-5 p-6 relative shrink-0 w-full">
        {rows.map((rowFields, ri) =>
          rowFields.length > 1 ? (
            <div
              key={ri}
              className="flex gap-4 items-start relative shrink-0 w-full"
            >
              {rowFields.map((field) => (
                <div
                  key={field.label}
                  className="flex flex-1 flex-col gap-1.5 min-w-[1px]"
                >
                  <Label size="small">{field.label}</Label>
                  <FieldControl field={field} />
                </div>
              ))}
            </div>
          ) : (
            <div
              key={ri}
              className="flex flex-1 flex-col gap-1.5 min-w-[1px]"
            >
              <Label size="small">{rowFields[0].label}</Label>
              <FieldControl field={rowFields[0]} />
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

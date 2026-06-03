import {
  Button,
  IconButton,
  Input,
  Kbd,
  Label,
  Select,
  Textarea,
} from "@medusajs/ui";
import { XMark } from "@medusajs/icons";
import type { ModalField } from "@/types";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface CreateTaskModalProps {
  title?: string;
  fields?: ModalField[];
  primaryAction?: string;
  secondaryAction?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
  onClose?: () => void;
}

/* ------------------------------------------------------------------ */
/*  Default Figma data                                                 */
/* ------------------------------------------------------------------ */

const DEFAULT_FIELDS: ModalField[] = [
  { label: "Priority", type: "select", value: "Select", row: 1 },
  { label: "Status", type: "select", value: "Select", row: 1 },
  { label: "Assignee", type: "select", value: "Select", row: 2 },
  { label: "Due date", type: "select", value: "Select", row: 2 },
  { label: "Task name", type: "input", placeholder: "Enter task name..." },
  {
    label: "Description",
    type: "textarea",
    placeholder: "Add a description...",
  },
];

/* ------------------------------------------------------------------ */
/*  Field renderer                                                     */
/* ------------------------------------------------------------------ */

function FieldControl({ field }: { field: ModalField }) {
  switch (field.type) {
    case "input":
      return <Input size="small" className="w-full" placeholder={field.placeholder} />;
    case "textarea":
      return (
        <Textarea
          placeholder={field.placeholder ?? "Placeholder"}
          defaultValue={field.placeholder}
        />
      );
    case "select":
      return (
        <Select size="small">
          <Select.Trigger>
            <Select.Value placeholder={field.value ?? "Select"} />
          </Select.Trigger>
        </Select>
      );
  }
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function CreateTaskModal({
  title = "Create new task",
  fields = DEFAULT_FIELDS,
  primaryAction = "Create task",
  secondaryAction = "Cancel",
  onPrimary,
  onSecondary,
  onClose,
}: CreateTaskModalProps) {
  /* Group fields by row — undefined row = standalone full-width */
  const rows: ModalField[][] = [];
  let i = 0;
  while (i < fields.length) {
    const f = fields[i];
    if (f.row != null) {
      const group = [f];
      while (i + 1 < fields.length && fields[i + 1].row === f.row) {
        i++;
        group.push(fields[i]);
      }
      rows.push(group);
    } else {
      rows.push([f]);
    }
    i++;
  }

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
        {rows.map((row, ri) =>
          row.length > 1 ? (
            <div
              key={ri}
              className="flex gap-4 items-start relative shrink-0 w-full"
            >
              {row.map((field, fi) => (
                <div
                  key={fi}
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
              <Label size="small">{row[0].label}</Label>
              <FieldControl field={row[0]} />
            </div>
          ),
        )}
      </div>

      {/* Footer */}
      <div className="flex flex-col relative shrink-0 w-full">
        <div className="h-px bg-ui-border-base" />
        <div className="flex gap-2 items-center justify-end px-6 py-4 relative shrink-0 w-full">
          <Button variant="secondary" size="small" onClick={onSecondary}>
            {secondaryAction}
          </Button>
          <Button variant="primary" size="small" onClick={onPrimary}>
            {primaryAction}
          </Button>
        </div>
      </div>
    </div>
  );
}

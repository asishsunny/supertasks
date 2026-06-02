import { Button, IconButton, Input, Label, Select, Textarea, Kbd } from "@medusajs/ui";
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

export function CreateTaskModal({
  title = "Create new task",
  fields = [
    { label: "Priority", type: "select", placeholder: "Select", row: 1 },
    { label: "Status", type: "select", placeholder: "Select", row: 1 },
    { label: "Assignee", type: "select", placeholder: "Select", row: 2 },
    { label: "Due date", type: "select", placeholder: "Select", row: 2 },
    { label: "Task name", type: "input" },
    { label: "Description", type: "textarea", placeholder: "Placeholder", value: "Add a description..." },
  ],
  primaryAction = "Create task",
  secondaryAction = "Cancel",
  escLabel = "Esc",
  onClose,
  onSubmit,
}: CreateTaskModalProps) {
  const rows = fields.reduce<ModalField[][]>((acc, field) => {
    if (field.row != null) {
      const idx = field.row - 1;
      if (!acc[idx]) acc[idx] = [];
      acc[idx].push(field);
    } else {
      acc.push([field]);
    }
    return acc;
  }, []);

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

      {/* Fields */}
      <div className="flex flex-col gap-5 p-6 w-full">
        {rows.map((row, ri) =>
          row.length > 1 ? (
            <div key={ri} className="flex gap-4 items-start w-full">
              {row.map((field, fi) => (
                <div key={fi} className="flex flex-1 flex-col gap-1.5 min-w-[1px]">
                  <Label size="small">{field.label}</Label>
                  {field.type === "select" && (
                    <Select size="small">
                      <Select.Trigger>{field.placeholder ?? "Select"}</Select.Trigger>
                      <Select.Content>
                        <Select.Item value="placeholder">
                          {field.placeholder ?? "Select"}
                        </Select.Item>
                      </Select.Content>
                    </Select>
                  )}
                  {field.type === "input" && (
                    <Input
                      size="small"
                      className="w-full"
                      defaultValue={field.value}
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div key={ri} className="flex flex-1 flex-col gap-1.5 min-w-[1px]">
              <Label size="small">{row[0].label}</Label>
              {row[0].type === "select" && (
                <Select size="small">
                  <Select.Trigger>{row[0].placeholder ?? "Select"}</Select.Trigger>
                  <Select.Content>
                    <Select.Item value="placeholder">
                      {row[0].placeholder ?? "Select"}
                    </Select.Item>
                  </Select.Content>
                </Select>
              )}
              {row[0].type === "input" && (
                <Input
                  size="small"
                  className="w-full"
                  defaultValue={row[0].value}
                />
              )}
              {row[0].type === "textarea" && (
                <Textarea
                  placeholder={row[0].placeholder}
                  defaultValue={row[0].value}
                />
              )}
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

export default CreateTaskModal;

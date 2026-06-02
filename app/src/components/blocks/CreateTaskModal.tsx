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
    // TODO: Agent fills from artifacts/transformed/create-task-modal.tsx
    <div>TODO</div>
  );
}

"use client";
import { CreateTaskModal } from "@/components/blocks/CreateTaskModal";
import { MODAL_CONFIGS } from "@/lib/data";

const config = MODAL_CONFIGS.create_task;
export default function Page() {
  return <CreateTaskModal title={config.title} fields={config.fields} primaryAction={config.actions.primary} secondaryAction={config.actions.secondary} />;
}

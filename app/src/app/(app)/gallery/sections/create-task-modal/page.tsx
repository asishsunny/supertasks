"use client";
import { CreateTaskModal } from "@/components/blocks/CreateTaskModal";
import { MODAL_CONFIGS } from "@/lib/data";

const cfg = MODAL_CONFIGS.create_task;

export default function Page() {
  return (
    <div className="max-w-lg mx-auto py-10">
      <CreateTaskModal
        title={cfg.title}
        fields={cfg.fields}
        primaryAction={cfg.actions.primary}
        secondaryAction={cfg.actions.secondary}
      />
    </div>
  );
}

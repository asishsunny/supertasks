"use client";

import { CreateTaskModal } from "@/components/blocks/CreateTaskModal";
import { MODAL_CONFIGS } from "@/lib/data";

const c = MODAL_CONFIGS.create_task;

export default function Page() {
  return (
    <div className="p-6">
      <div className="max-w-[480px]">
        <CreateTaskModal title={c.title} fields={c.fields} primaryAction={c.actions.primary} secondaryAction={c.actions.secondary} />
      </div>
    </div>
  );
}

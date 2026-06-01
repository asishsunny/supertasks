"use client";
import { CreateTaskModal } from "@/components/blocks/CreateTaskModal";
import { MODAL_CONFIGS } from "@/lib/data";

export default function Page() {
  return (
    <div className="flex flex-col gap-8">
      {Object.entries(MODAL_CONFIGS).map(([key, config]) => (
        <div key={key}>
          <p className="text-ui-fg-subtle txt-compact-small mb-2">{key.replace(/_/g, " ")}</p>
          <div className="max-w-[480px]">
            <CreateTaskModal config={config} />
          </div>
        </div>
      ))}
    </div>
  );
}

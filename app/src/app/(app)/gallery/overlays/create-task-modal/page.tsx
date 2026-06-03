"use client";

import { CreateTaskModal } from "@/components/blocks/CreateTaskModal";

export default function Page() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <h2 className="txt-compact-medium-plus text-ui-fg-subtle">CreateTaskModal</h2>
      <CreateTaskModal />
    </div>
  );
}

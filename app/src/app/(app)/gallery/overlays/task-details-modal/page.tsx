"use client";

import TaskDetailsModal from "@/components/blocks/TaskDetailsModal";

export default function Page() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <h2 className="txt-compact-medium-plus text-ui-fg-subtle">TaskDetailsModal</h2>
      <TaskDetailsModal />
    </div>
  );
}

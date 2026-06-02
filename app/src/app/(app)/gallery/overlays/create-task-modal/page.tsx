"use client";

import CreateTaskModal from "@/components/blocks/CreateTaskModal";

export default function Page() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">Create Task</h2>
        <CreateTaskModal />
      </section>
      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">Invite Member</h2>
        <CreateTaskModal />
      </section>
      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">Generate Report</h2>
        <CreateTaskModal />
      </section>
    </div>
  );
}

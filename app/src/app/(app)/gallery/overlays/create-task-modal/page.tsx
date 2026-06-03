"use client";

import { CreateTaskModal } from "@/components/blocks/CreateTaskModal";
import { MODAL_CONFIGS } from "@/lib/data";

export default function Page() {
  const createTask = MODAL_CONFIGS.create_task;
  const inviteMember = MODAL_CONFIGS.invite_member;
  const generateReport = MODAL_CONFIGS.generate_report;

  return (
    <div className="flex flex-col gap-8 p-6">
      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">
          Create Task
        </h2>
        <CreateTaskModal
          title={createTask.title}
          fields={createTask.fields}
          primaryAction={createTask.actions.primary}
          secondaryAction={createTask.actions.secondary}
        />
      </section>
      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">
          Invite Member
        </h2>
        <CreateTaskModal
          title={inviteMember.title}
          fields={inviteMember.fields}
          primaryAction={inviteMember.actions.primary}
          secondaryAction={inviteMember.actions.secondary}
        />
      </section>
      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">
          Generate Report
        </h2>
        <CreateTaskModal
          title={generateReport.title}
          fields={generateReport.fields}
          primaryAction={generateReport.actions.primary}
          secondaryAction={generateReport.actions.secondary}
        />
      </section>
    </div>
  );
}

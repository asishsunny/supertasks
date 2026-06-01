"use client";

import { CreateTaskModal } from "@/components/blocks/CreateTaskModal";
import { MODAL_CONFIGS } from "@/lib/data";

export default function CreateTaskModalGallery() {
  const createTask = MODAL_CONFIGS.create_task;
  const inviteMember = MODAL_CONFIGS.invite_member;
  const generateReport = MODAL_CONFIGS.generate_report;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-ui-fg-base txt-compact-medium-plus">Create Task</h2>
        <div className="max-w-[480px]">
          <CreateTaskModal
            title={createTask.title}
            fields={createTask.fields}
            primaryAction={createTask.actions.primary}
            secondaryAction={createTask.actions.secondary}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-ui-fg-base txt-compact-medium-plus">Invite Member</h2>
        <div className="max-w-[480px]">
          <CreateTaskModal
            title={inviteMember.title}
            fields={inviteMember.fields}
            primaryAction={inviteMember.actions.primary}
            secondaryAction={inviteMember.actions.secondary}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-ui-fg-base txt-compact-medium-plus">Generate Report</h2>
        <div className="max-w-[480px]">
          <CreateTaskModal
            title={generateReport.title}
            fields={generateReport.fields}
            primaryAction={generateReport.actions.primary}
            secondaryAction={generateReport.actions.secondary}
          />
        </div>
      </div>
    </div>
  );
}

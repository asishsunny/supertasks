import { CreateTaskModal } from "@/components/blocks/CreateTaskModal";
import { MODAL_CONFIGS } from "@/lib/data";

const createTask = MODAL_CONFIGS.create_task;
const inviteMember = MODAL_CONFIGS.invite_member;
const generateReport = MODAL_CONFIGS.generate_report;

export default function Page() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <h2 className="txt-compact-medium-plus text-ui-fg-subtle">Create Task Modal</h2>

      <div className="flex flex-col gap-10 items-center">
        <div className="flex flex-col gap-2 w-full max-w-[480px]">
          <p className="txt-compact-small text-ui-fg-muted">Create Task</p>
          <CreateTaskModal
            title={createTask.title}
            fields={createTask.fields}
            primaryAction={createTask.actions.primary}
            secondaryAction={createTask.actions.secondary}
          />
        </div>

        <div className="flex flex-col gap-2 w-full max-w-[480px]">
          <p className="txt-compact-small text-ui-fg-muted">Invite Member</p>
          <CreateTaskModal
            title={inviteMember.title}
            fields={inviteMember.fields}
            primaryAction={inviteMember.actions.primary}
            secondaryAction={inviteMember.actions.secondary}
          />
        </div>

        <div className="flex flex-col gap-2 w-full max-w-[480px]">
          <p className="txt-compact-small text-ui-fg-muted">Generate Report</p>
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

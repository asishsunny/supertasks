import { CreateTaskModal } from "@/components/blocks/CreateTaskModal";
import type { ModalField } from "@/types";

const fieldsData = [
    { label: "Task name", type: "input" as const, placeholder: "Enter..." },
    { label: "Description", type: "textarea" as const, placeholder: "Describe..." },
  ];

export default function Page() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">Create Task</h2>
        <CreateTaskModal
          title={"Title"}
          fields={fieldsData}
          primaryAction={"Create task"}
          secondaryAction={"Cancel"}
          escLabel={"Esc"}
        />
      </section>
      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">Invite Member</h2>
        <CreateTaskModal
          title={"Title"}
          fields={fieldsData}
          primaryAction={"Create task"}
          secondaryAction={"Cancel"}
          escLabel={"Esc"}
        />
      </section>
      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">Generate Report</h2>
        <CreateTaskModal
          title={"Title"}
          fields={fieldsData}
          primaryAction={"Create task"}
          secondaryAction={"Cancel"}
          escLabel={"Esc"}
        />
      </section>
    </div>
  );
}

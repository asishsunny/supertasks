"use client";

import TaskDetailsModal from "@/components/blocks/TaskDetailsModal";

const infoRowsData = [
    { label: "Label 1", value: "123 1", type: {} as any, overdue: false, statusColor: {} as any, member: {} as any },
    { label: "Label 2", value: "123 2", type: {} as any, overdue: false, statusColor: {} as any, member: {} as any },
    { label: "Label 3", value: "123 3", type: {} as any, overdue: false, statusColor: {} as any, member: {} as any },
  ];
const activityData = [
    { member: {} as any, name: "Item 1", time: "2h ago 1", text: "Activity text 1" },
    { member: {} as any, name: "Item 2", time: "2h ago 2", text: "Activity text 2" },
    { member: {} as any, name: "Item 3", time: "2h ago 3", text: "Activity text 3" },
  ];

export default function Page() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">Default</h2>
        <TaskDetailsModal
          title={"Task details"}
          headerLabel={"Task details"}
          description={"Revamp first-run experience for new users"}
          infoLabel={"Info"}
          infoRows={infoRowsData}
          activityLabel={"Activity log"}
          activity={activityData}
          primaryAction={"Mark complete"}
          secondaryAction={"Edit"}
          escLabel={"Esc"}
        />
      </section>
    </div>
  );
}

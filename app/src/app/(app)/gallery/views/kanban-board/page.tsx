import { KanbanBoard } from "@/components/blocks/KanbanBoard";

const columnsData = [
    { status: "active 1", label: "Label 1", count: 1, statusIcon: null, cards: [
    { title: "Title 1", description: "Description text 1", member: {} as any, memberName: "memberName 1", dueDate: "Jan 1 1", overdue: false, priority: {} as any, priorityLabel: "High 1" },
    { title: "Title 2", description: "Description text 2", member: {} as any, memberName: "memberName 2", dueDate: "Jan 1 2", overdue: false, priority: {} as any, priorityLabel: "High 2" },
    { title: "Title 3", description: "Description text 3", member: {} as any, memberName: "memberName 3", dueDate: "Jan 1 3", overdue: false, priority: {} as any, priorityLabel: "High 3" },
    { title: "Title 4", description: "Description text 4", member: {} as any, memberName: "memberName 4", dueDate: "Jan 1 4", overdue: false, priority: {} as any, priorityLabel: "High 4" },
  ] },
    { status: "active 2", label: "Label 2", count: 2, statusIcon: null, cards: [
    { title: "Title 1", description: "Description text 1", member: {} as any, memberName: "memberName 1", dueDate: "Jan 1 1", overdue: false, priority: {} as any, priorityLabel: "High 1" },
    { title: "Title 2", description: "Description text 2", member: {} as any, memberName: "memberName 2", dueDate: "Jan 1 2", overdue: false, priority: {} as any, priorityLabel: "High 2" },
    { title: "Title 3", description: "Description text 3", member: {} as any, memberName: "memberName 3", dueDate: "Jan 1 3", overdue: false, priority: {} as any, priorityLabel: "High 3" },
    { title: "Title 4", description: "Description text 4", member: {} as any, memberName: "memberName 4", dueDate: "Jan 1 4", overdue: false, priority: {} as any, priorityLabel: "High 4" },
  ] },
    { status: "active 3", label: "Label 3", count: 3, statusIcon: null, cards: [
    { title: "Title 1", description: "Description text 1", member: {} as any, memberName: "memberName 1", dueDate: "Jan 1 1", overdue: false, priority: {} as any, priorityLabel: "High 1" },
    { title: "Title 2", description: "Description text 2", member: {} as any, memberName: "memberName 2", dueDate: "Jan 1 2", overdue: false, priority: {} as any, priorityLabel: "High 2" },
    { title: "Title 3", description: "Description text 3", member: {} as any, memberName: "memberName 3", dueDate: "Jan 1 3", overdue: false, priority: {} as any, priorityLabel: "High 3" },
    { title: "Title 4", description: "Description text 4", member: {} as any, memberName: "memberName 4", dueDate: "Jan 1 4", overdue: false, priority: {} as any, priorityLabel: "High 4" },
  ] },
  ];

export default function Page() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">Default</h2>
        <KanbanBoard
          columns={columnsData}
        />
      </section>
    </div>
  );
}

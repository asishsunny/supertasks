import { KanbanBoard } from "@/components/blocks/KanbanBoard";

const columnsData: any[] = [
    { status: "todo", label: "To Do", count: 2, statusIcon: null, cards: [] },
    { status: "in_progress", label: "In Progress", count: 2, statusIcon: null, cards: [] },
    { status: "done", label: "Done", count: 1, statusIcon: null, cards: [] },
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

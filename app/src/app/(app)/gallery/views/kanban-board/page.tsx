import { KanbanBoard } from "@/components/blocks/KanbanBoard";

const columnsData = [
    { status: "active 1", label: "Label 1", count: 1, statusIcon: null, cards: [<div key="1">Card 1</div>, <div key="2">Card 2</div>] },
    { status: "active 2", label: "Label 2", count: 2, statusIcon: null, cards: [<div key="1">Card 1</div>, <div key="2">Card 2</div>] },
    { status: "active 3", label: "Label 3", count: 3, statusIcon: null, cards: [<div key="1">Card 1</div>, <div key="2">Card 2</div>] },
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

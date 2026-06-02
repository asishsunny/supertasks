import StatCards from "@/components/blocks/StatCards";

const cardsData = [
  {
    label: "Total Tasks",
    value: "18"
  },
  {
    label: "In Progress",
    value: "5"
  },
  {
    label: "Completed",
    value: "3"
  },
  {
    label: "Overdue",
    value: "5"
  }
];

export default function Page() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">Dashboard</h2>
        <StatCards
          cards={cardsData}
        />
      </section>
      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">Reports</h2>
        <StatCards
          cards={cardsData}
        />
      </section>
    </div>
  );
}

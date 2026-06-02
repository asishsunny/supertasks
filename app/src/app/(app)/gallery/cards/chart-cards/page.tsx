import { ChartCards } from "@/components/blocks/ChartCards";

const chartsData = [
  {
    title: "Tasks by Priority",
    rows: [],
    total: 0
  },
  {
    title: "Tasks by Status",
    rows: [],
    total: 0
  }
];

export default function Page() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">Default</h2>
        <ChartCards
          charts={chartsData}
        />
      </section>
    </div>
  );
}

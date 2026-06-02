import { RecentTasks } from "@/components/blocks/RecentTasks";

const columnsData = [
    { key: "key-1 1", header: "Header 1", width: "w-[120px] 1", render: (row: any) => row.id },
    { key: "key-1 2", header: "Header 2", width: "w-[120px] 2", render: (row: any) => row.id },
    { key: "key-1 3", header: "Header 3", width: "w-[120px] 3", render: (row: any) => row.id },
  ];
const rowsData = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ];

export default function Page() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">Default</h2>
        <RecentTasks
          title={"Recent Tasks"}
          columns={columnsData}
          rows={rowsData}
        />
      </section>
    </div>
  );
}

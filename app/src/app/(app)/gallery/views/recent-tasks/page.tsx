import { RecentTasks } from "@/components/blocks/RecentTasks";

export default function Page() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">Default</h2>
        <RecentTasks />
      </section>
    </div>
  );
}

"use client";

import { Controls } from "@/components/blocks/Controls";

const tabsData = [
  {
    key: "kanban",
    label: "Kanban"
  },
  {
    key: "list",
    label: "List"
  }
];
const actionsData = [
  {
    icon: null,
    label: "Filter"
  },
  {
    icon: null,
    label: "Date"
  },
  {
    icon: null,
    label: "Columns"
  }
];

export default function Page() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">Tasks</h2>
        <Controls
          tabs={tabsData}
          activeTab={"kanban"}
          actions={actionsData}
          searchShortcut={"⌘K"}
          searchPlaceholder={"Search..."}
        />
      </section>
      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">Reports</h2>
        <Controls
          tabs={tabsData}
          activeTab={"kanban"}
          actions={actionsData}
          searchShortcut={"⌘K"}
          searchPlaceholder={"Search..."}
        />
      </section>
    </div>
  );
}

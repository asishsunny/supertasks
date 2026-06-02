"use client";

import { Controls } from "@/components/blocks/Controls";

const tabsData = [
    { key: "key-1 1", label: "Label 1" },
    { key: "key-1 2", label: "Label 2" },
    { key: "key-1 3", label: "Label 3" },
  ];
const actionsData = [
    { icon: null, label: "Label 1" },
    { icon: null, label: "Label 2" },
    { icon: null, label: "Label 3" },
  ];

export default function Page() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">Tasks</h2>
        <Controls
          tabs={tabsData}
          activeTab={"tab-1"}
          actions={actionsData}
          searchShortcut={"⌘K"}
          searchPlaceholder={"Search..."}
        />
      </section>
      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">Reports</h2>
        <Controls
          tabs={tabsData}
          activeTab={"tab-1"}
          actions={actionsData}
          searchShortcut={"⌘K"}
          searchPlaceholder={"Search..."}
        />
      </section>
    </div>
  );
}

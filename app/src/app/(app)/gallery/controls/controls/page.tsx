"use client";

import { Controls } from "@/components/blocks/Controls";
import { TASKS_TABS } from "@/lib/gallery";
import { Funnel, CalendarMini, Adjustments } from "@medusajs/icons";

const views = TASKS_TABS.map((label, i) => ({
  key: label.toLowerCase(),
  label,
  active: i === 0,
}));

const actions = [
  { label: "Filter", icon: Funnel },
  { label: "Date", icon: CalendarMini },
  { label: "Columns", icon: Adjustments },
];

export default function Page() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <h2 className="txt-compact-medium-plus text-ui-fg-subtle">Controls</h2>
      <Controls
        views={views}
        actions={actions}
        searchPlaceholder="Search"
        searchKbd="⌘K"
      />
    </div>
  );
}

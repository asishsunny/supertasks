"use client";
import { useState } from "react";
import { Funnel, CalendarMini, Adjustments, DescendingSorting } from "@medusajs/icons";
import { Controls } from "@/components/blocks/Controls";

const TASKS_TABS = [
  { key: "kanban", label: "Kanban" },
  { key: "list", label: "List" },
];
const TASKS_FILTER_ACTIONS = [
  { key: "filter", label: "Filter", icon: Funnel },
  { key: "date", label: "Date", icon: CalendarMini },
  { key: "columns", label: "Columns", icon: Adjustments },
];

const REPORTS_TABS = [
  { key: "90d", label: "90d" },
  { key: "30d", label: "30d" },
  { key: "7d", label: "7d" },
];
const REPORTS_FILTER_ACTIONS = [
  { key: "filter", label: "Filter", icon: Funnel },
];

export default function Page() {
  const [taskTab, setTaskTab] = useState("list");
  const [reportTab, setReportTab] = useState("30d");

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-ui-fg-subtle txt-compact-small mb-2">Tasks</p>
        <Controls
          tabs={TASKS_TABS}
          activeTab={taskTab}
          onTabChange={setTaskTab}
          filterActions={TASKS_FILTER_ACTIONS}
          sortIcon={DescendingSorting}
          searchPlaceholder="Search"
          searchKbd="⌘K"
        />
      </div>
      <div>
        <p className="text-ui-fg-subtle txt-compact-small mb-2">Reports</p>
        <Controls
          tabs={REPORTS_TABS}
          activeTab={reportTab}
          onTabChange={setReportTab}
          filterActions={REPORTS_FILTER_ACTIONS}
          sortIcon={DescendingSorting}
          searchPlaceholder="Search"
          searchKbd="⌘K"
        />
      </div>
    </div>
  );
}

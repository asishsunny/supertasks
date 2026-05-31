"use client";
import { useState } from "react";
import { Funnel, CalendarMini, Adjustments } from "@medusajs/icons";
import { ControlsBar } from "@/components/blocks/Controls";

const TASKS_VIEWS = [
  { key: "kanban", label: "Kanban" },
  { key: "list", label: "List" },
];
const TASKS_FILTERS = [
  { label: "Filter", icon: <Funnel className="w-[15px] h-[15px]" /> },
  { label: "Date", icon: <CalendarMini className="w-[15px] h-[15px]" /> },
  { label: "Columns", icon: <Adjustments className="w-[15px] h-[15px]" /> },
];

const REPORTS_VIEWS = [
  { key: "90d", label: "90d" },
  { key: "30d", label: "30d" },
  { key: "7d", label: "7d" },
];
const REPORTS_FILTERS = [
  { label: "Filter", icon: <Funnel className="w-[15px] h-[15px]" /> },
];

export default function Page() {
  const [taskView, setTaskView] = useState("list");
  const [reportView, setReportView] = useState("30d");

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-ui-fg-subtle txt-compact-small mb-2">Tasks</p>
        <ControlsBar views={TASKS_VIEWS} activeView={taskView} onViewChange={setTaskView} filters={TASKS_FILTERS} searchPlaceholder="Search" searchShortcut="⌘K" />
      </div>
      <div>
        <p className="text-ui-fg-subtle txt-compact-small mb-2">Reports</p>
        <ControlsBar views={REPORTS_VIEWS} activeView={reportView} onViewChange={setReportView} filters={REPORTS_FILTERS} searchPlaceholder="Search" searchShortcut="⌘K" />
      </div>
    </div>
  );
}

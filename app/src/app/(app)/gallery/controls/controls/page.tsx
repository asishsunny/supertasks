"use client";

import { useState } from "react";
import { Controls } from "@/components/blocks/Controls";
import { PlusMini, ArrowDownTray } from "@medusajs/icons";

/* Variation: tasks */
const tasksTabs = [
  { key: "list", label: "List" },
  { key: "board", label: "Board" },
];

const tasksActions = [
  { icon: <PlusMini />, label: "Add task" },
];

/* Variation: reports */
const reportsTabs = [
  { key: "all", label: "All" },
  { key: "mine", label: "Mine" },
];

const reportsActions = [
  { icon: <ArrowDownTray />, label: "Export" },
];

export default function ControlsGallery() {
  const [tasksActive, setTasksActive] = useState("list");
  const [reportsActive, setReportsActive] = useState("all");

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-ui-fg-base txt-compact-medium-plus">Tasks</h2>
        <Controls
          tabs={tasksTabs}
          activeTab={tasksActive}
          onTabChange={setTasksActive}
          actions={tasksActions}
          searchPlaceholder="Search tasks..."
          searchShortcut="/"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-ui-fg-base txt-compact-medium-plus">Reports</h2>
        <Controls
          tabs={reportsTabs}
          activeTab={reportsActive}
          onTabChange={setReportsActive}
          actions={reportsActions}
          searchPlaceholder="Search reports..."
          searchShortcut="/"
        />
      </div>
    </div>
  );
}

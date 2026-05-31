"use client";

import { useState } from "react";
import { Funnel, CalendarMini, Adjustments } from "@medusajs/icons";
import { ControlsBar } from "@/components/blocks/Controls";

const VIEWS = [
  { key: "kanban", label: "Kanban" },
  { key: "list", label: "List" },
];

const FILTERS = [
  { label: "Filter", icon: <Funnel className="w-[15px] h-[15px]" /> },
  { label: "Date", icon: <CalendarMini className="w-[15px] h-[15px]" /> },
  { label: "Columns", icon: <Adjustments className="w-[15px] h-[15px]" /> },
];

export default function Page() {
  const [view, setView] = useState("kanban");

  return (
    <ControlsBar
      views={VIEWS}
      activeView={view}
      onViewChange={setView}
      filters={FILTERS}
      searchPlaceholder="Search"
      searchShortcut="⌘K"
      onSearch={(q) => console.log("search:", q)}
    />
  );
}

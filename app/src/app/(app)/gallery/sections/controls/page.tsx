"use client";
import { ControlsBar } from "@/components/blocks/Controls";
import { Funnel, CalendarMini, Adjustments } from "@medusajs/icons";
import { useState } from "react";

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
  const [activeView, setActiveView] = useState("kanban");

  return (
    <ControlsBar
      views={VIEWS}
      activeView={activeView}
      onViewChange={setActiveView}
      filters={FILTERS}
      searchPlaceholder="Search"
      searchShortcut="⌘K"
    />
  );
}

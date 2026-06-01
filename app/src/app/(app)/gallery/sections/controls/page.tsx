"use client";
import { Controls } from "@/components/blocks/Controls";
import { Funnel, CalendarMini, Adjustments, DescendingSorting } from "@medusajs/icons";
import { useState } from "react";

const TABS = [
  { key: "kanban", label: "Kanban" },
  { key: "list", label: "List" },
];

const FILTER_ACTIONS = [
  { key: "filter", label: "Filter", icon: Funnel },
  { key: "date", label: "Date", icon: CalendarMini },
  { key: "columns", label: "Columns", icon: Adjustments },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState("kanban");

  return (
    <Controls
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      filterActions={FILTER_ACTIONS}
      sortIcon={DescendingSorting}
      searchPlaceholder="Search"
      searchKbd="⌘K"
    />
  );
}

"use client";

import type { ReactNode } from "react";
import { Button, IconButton, Input, Kbd } from "@medusajs/ui";
import { DescendingSorting } from "@medusajs/icons";

interface ViewTab {
  key: string;
  label: string;
}

interface ActionButton {
  icon?: ReactNode;
  label: string;
}

export interface ControlsProps {
  tabs?: ViewTab[];
  activeTab?: string;
  actions?: ActionButton[];
  searchPlaceholder?: string;
  searchShortcut?: string;
}

export function Controls({
  tabs = [
    { key: "kanban", label: "Kanban" },
    { key: "list", label: "List" },
  ],
  activeTab = "list",
  actions = [
    { label: "Filter" },
    { label: "Date" },
    { label: "Columns" },
  ],
  searchPlaceholder = "Search",
  searchShortcut = "⌘K",
}: ControlsProps) {
  return (
    <div className="flex gap-0 h-8 items-center relative shrink-0 w-full">
      <div className="bg-ui-bg-segment-control flex gap-0.5 items-center p-0.5 rounded-lg shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`px-2.5 py-1 rounded-md txt-compact-small cursor-pointer ${
              tab.key === activeTab
                ? "bg-ui-bg-base text-ui-fg-base shadow-elevation-card-rest"
                : "text-ui-fg-subtle"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex-1 h-full min-w-[1px] relative" />
      <div className="flex gap-2 items-center relative shrink-0">
        <div className="flex gap-2 items-center relative shrink-0">
          {actions.map((action) => (
            <Button key={action.label} variant="secondary" size="small">
              {action.icon}
              {action.label}
            </Button>
          ))}
        </div>
        <IconButton size="small" variant="primary">
          <DescendingSorting />
        </IconButton>
        <div className="relative">
          <Input type="search" size="small" placeholder={searchPlaceholder} />
          <Kbd className="absolute right-1.5 top-1/2 -translate-y-1/2">
            {searchShortcut}
          </Kbd>
        </div>
      </div>
    </div>
  );
}

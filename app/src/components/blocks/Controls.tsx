import { type ReactNode } from "react";
import { Button, IconButton, Input, Kbd } from "@medusajs/ui";
import {
  Funnel,
  CalendarMini,
  Adjustments,
  DescendingSorting,
} from "@medusajs/icons";

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
  onTabChange?: (key: string) => void;
  actions?: ActionButton[];
  searchShortcut?: string;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  onSort?: () => void;
}

export function Controls({
  tabs = [
    { key: "kanban", label: "Kanban" },
    { key: "list", label: "List" },
  ],
  activeTab = "list",
  onTabChange,
  actions = [
    { icon: <Funnel className="w-[15px] h-[15px]" />, label: "Filter" },
    { icon: <CalendarMini className="w-[15px] h-[15px]" />, label: "Date" },
    {
      icon: <Adjustments className="w-[15px] h-[15px]" />,
      label: "Columns",
    },
  ],
  searchShortcut = "⌘K",
  searchPlaceholder = "Search",
  onSearch,
  onSort,
}: ControlsProps) {
  return (
    <div className="flex gap-0 h-8 items-center w-full">
      <div className="bg-ui-bg-segment-control flex gap-0.5 items-center p-0.5 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`px-2.5 py-1 rounded-md txt-compact-small cursor-pointer ${
              tab.key === activeTab
                ? "bg-ui-bg-base text-ui-fg-base shadow-elevation-card-rest"
                : "text-ui-fg-subtle"
            }`}
            onClick={() => onTabChange?.(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex-1 h-full min-w-[1px]" />
      <div className="flex gap-2 items-center">
        <div className="flex gap-2 items-center">
          {actions.map((action) => (
            <Button key={action.label} variant="secondary" size="small">
              {action.icon}
              {action.label}
            </Button>
          ))}
        </div>
        <IconButton size="small" variant="primary" onClick={onSort}>
          <DescendingSorting />
        </IconButton>
        <div className="relative">
          <Input
            type="search"
            size="small"
            placeholder={searchPlaceholder}
            onChange={(e) => onSearch?.(e.target.value)}
          />
          <Kbd className="absolute right-1.5 top-1/2 -translate-y-1/2">
            {searchShortcut}
          </Kbd>
        </div>
      </div>
    </div>
  );
}

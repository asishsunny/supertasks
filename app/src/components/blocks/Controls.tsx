import { Button, IconButton, Input, Kbd } from "@medusajs/ui";
import { Funnel, CalendarMini, Adjustments, DescendingSorting } from "@medusajs/icons";
import type { ReactNode } from "react";

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

const DEFAULT_TABS: ViewTab[] = [
  {
    key: "kanban",
    label: "Kanban"
  },
  {
    key: "list",
    label: "List"
  }
];
const DEFAULT_ACTIVE_TAB = "kanban";
const DEFAULT_ACTIONS: ActionButton[] = [
  {
    icon: null,
    label: "Filter"
  },
  {
    icon: null,
    label: "Date"
  },
  {
    icon: null,
    label: "Columns"
  }
];
const DEFAULT_SEARCH_PLACEHOLDER = "Search";

export function Controls({
  tabs = DEFAULT_TABS,
  activeTab = DEFAULT_ACTIVE_TAB,
  onTabChange,
  actions = DEFAULT_ACTIONS,
  searchShortcut,
  searchPlaceholder = DEFAULT_SEARCH_PLACEHOLDER,
  onSearch,
  onSort,
}: ControlsProps) {
  return (
<div className="flex gap-0 h-8 items-center relative shrink-0 w-full">
  <div className="bg-ui-bg-segment-control flex gap-0.5 items-center p-0.5 rounded-lg shrink-0">
    {tabs.map((tab) => (
      <button
        key={tab.key}
        className={`${tab.key === activeTab ? "bg-ui-bg-base text-ui-fg-base shadow-elevation-card-rest" : "text-ui-fg-subtle"} px-2.5 py-1 rounded-md txt-compact-small cursor-pointer`}
        onClick={() => onTabChange?.(tab.key)}
      >
        {tab.label}
      </button>
    ))}
  </div>
  <div className="flex-1 h-full min-w-[1px] relative" />
  <div className="flex gap-2 items-center relative shrink-0">
    <div className="flex gap-2 items-center relative shrink-0">
      {actions.map((action, i) => (
        <Button key={i} variant="secondary" size="small">
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
      {searchShortcut && (
        <Kbd className="absolute right-1.5 top-1/2 -translate-y-1/2">{searchShortcut}</Kbd>
      )}
    </div>
  </div>
</div>
  );
}

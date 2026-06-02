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
    // TODO: Agent fills from artifacts/transformed/controls.tsx
    <div>TODO</div>
  );
}

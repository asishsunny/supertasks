import { Button, IconButton, Input, Kbd } from "@medusajs/ui";
import { DescendingSorting } from "@medusajs/icons";
import { type ReactNode } from "react";

interface ViewTab {
  key: string;
  label: string;
}

interface ActionButton {
  icon: ReactNode;
  label: string;
}

export interface ControlsProps {
  tabs: ViewTab[];
  activeTab: string;
  onTabChange?: (key: string) => void;
  actions: ActionButton[];
  searchPlaceholder?: string;
  searchShortcut?: string;
  onSearch?: (query: string) => void;
  onSort?: () => void;
}

export function Controls({
  tabs,
  activeTab,
  onTabChange,
  actions,
  searchPlaceholder,
  searchShortcut,
  onSearch,
  onSort,
}: ControlsProps) {
  return (
    <div className="flex gap-0 items-center w-full h-full">
      <div className="bg-ui-bg-segment-control flex gap-0.5 items-center p-0.5 rounded-lg shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.key}
            tabIndex={0}
            onClick={() => onTabChange?.(tab.key)}
            className={`px-2.5 py-1 rounded-md txt-compact-small cursor-pointer ${
              activeTab === tab.key
                ? "bg-ui-bg-base text-ui-fg-base shadow-elevation-card-rest"
                : "text-ui-fg-subtle"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex-1 h-full min-w-[1px]" />
      <div className="flex gap-2 items-center shrink-0">
        <div className="flex gap-2 items-center shrink-0">
          {actions.map((action) => (
            <Button key={action.label} variant="secondary" size="small">
              {action.icon}
              {action.label}
            </Button>
          ))}
        </div>
        <IconButton
          size="small"
          variant="primary"
          aria-label="Sort"
          onClick={onSort}
        >
          <DescendingSorting />
        </IconButton>
        <div className="relative">
          <Input
            type="search"
            size="small"
            placeholder={searchPlaceholder}
            onChange={(e) => onSearch?.(e.target.value)}
          />
          {searchShortcut && <Kbd>{searchShortcut}</Kbd>}
        </div>
      </div>
    </div>
  );
}

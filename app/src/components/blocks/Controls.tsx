// source: artifacts/transformed/controls-templatized.tsx

import React from "react";
import { Button, IconButton, Input, Kbd } from "@medusajs/ui";

interface SegmentTab {
  key: string;
  label: string;
}

interface FilterAction {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface ControlsProps {
  tabs: SegmentTab[];
  activeTab: string;
  onTabChange?: (key: string) => void;
  filterActions: FilterAction[];
  onFilterAction?: (key: string) => void;
  sortIcon: React.ComponentType;
  onSort?: () => void;
  searchPlaceholder: string;
  searchKbd: string;
  onSearch?: (query: string) => void;
}

export function Controls({
  tabs,
  activeTab,
  onTabChange,
  filterActions,
  onFilterAction,
  sortIcon: SortIcon,
  onSort,
  searchPlaceholder,
  searchKbd,
  onSearch,
}: ControlsProps) {
  return (
    <div className="flex gap-0 h-8 items-center w-full">
      <div className="bg-ui-bg-segment-control flex gap-0.5 items-center p-0.5 rounded-lg shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={tab.key === activeTab}
            tabIndex={0}
            onClick={() => onTabChange?.(tab.key)}
            className={`segment-tab px-2.5 py-1 rounded-md txt-compact-small-plus cursor-pointer transition-colors ${
              tab.key === activeTab
                ? "bg-ui-bg-base text-ui-fg-base shadow-elevation-card-rest"
                : "text-ui-fg-subtle hover:text-ui-fg-base"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex-1 h-full min-w-[1px]" />
      <div className="flex gap-2 items-center shrink-0">
        <div className="flex gap-2 items-center shrink-0">
          {filterActions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.key}
                variant="secondary"
                size="small"
                onClick={() => onFilterAction?.(action.key)}
              >
                <Icon className="w-[15px] h-[15px]" />
                {action.label}
              </Button>
            );
          })}
        </div>
        <IconButton
          size="small"
          variant="primary"
          onClick={onSort}
          aria-label="Sort"
        >
          <SortIcon />
        </IconButton>
        <div className="relative">
          <Input
            type="search"
            size="small"
            placeholder={searchPlaceholder}
            onChange={(e) => onSearch?.(e.target.value)}
          />
          <Kbd className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
            {searchKbd}
          </Kbd>
        </div>
      </div>
    </div>
  );
}

import { Button, IconButton, Input, Kbd } from "@medusajs/ui";
import { DescendingSorting } from "@medusajs/icons";
import type { ReactNode } from "react";

export interface FilterButton {
  label: string;
  icon: ReactNode;
}

export interface ControlsBarProps {
  views?: { key: string; label: string }[];
  activeView?: string;
  onViewChange?: (key: string) => void;
  filters?: FilterButton[];
  searchPlaceholder?: string;
  searchShortcut?: string;
  onSearch?: (query: string) => void;
}

export function ControlsBar({
  views,
  activeView,
  onViewChange,
  filters,
  searchPlaceholder,
  searchShortcut,
  onSearch,
}: ControlsBarProps) {
  return (
    <div className="flex items-center w-full">
      {views && views.length > 0 && (
        <div className="bg-ui-bg-segment-control flex gap-0.5 items-center p-0.5 rounded-lg">
          {views.map((v) => (
            <button
              key={v.key}
              type="button"
              role="tab"
              aria-selected={activeView === v.key}
              onClick={() => onViewChange?.(v.key)}
              className={`px-2.5 py-1 rounded-md txt-compact-small cursor-pointer transition-colors ${
                activeView === v.key
                  ? "bg-ui-bg-base text-ui-fg-base shadow-elevation-card-rest"
                  : "text-ui-fg-subtle hover:text-ui-fg-base"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      )}
      <div className="flex-1" />
      <div className="flex gap-2 items-center">
        {filters && filters.length > 0 && (
          <div className="flex gap-2 items-center">
            {filters.map((f) => (
              <Button key={f.label} variant="secondary" size="small">
                {f.icon}
                {f.label}
              </Button>
            ))}
          </div>
        )}
        <span className="shrink-0">
          <IconButton size="small" variant="primary">
            <DescendingSorting />
          </IconButton>
        </span>
        <div className="relative">
          <Input
            type="search"
            size="small"
            placeholder={searchPlaceholder}
            onChange={(e) => onSearch?.(e.target.value)}
          />
          {searchShortcut && (
            <Kbd className="absolute right-2 top-1/2 -translate-y-1/2">{searchShortcut}</Kbd>
          )}
        </div>
      </div>
    </div>
  );
}

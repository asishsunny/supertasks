import { ReactNode } from "react";
import { Button, IconButton, Input } from "@medusajs/ui";
import { DescendingSorting } from "@medusajs/icons";

export interface ControlsBarProps {
  views: { key: string; label: string }[];
  activeView: string;
  onViewChange: (key: string) => void;
  filters: { label: string; icon: ReactNode }[];
  searchPlaceholder: string;
  searchShortcut: string;
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
      {/* Segment control */}
      <div className="bg-ui-bg-segment-control flex gap-0.5 items-center p-0.5 rounded-lg">
        {views.map((v) => (
          <button
            key={v.key}
            type="button"
            role="tab"
            aria-selected={activeView === v.key}
            onClick={() => onViewChange(v.key)}
            className={`px-2.5 py-1 rounded-md txt-compact-small-plus cursor-pointer transition-colors ${
              activeView === v.key
                ? "bg-ui-bg-base text-ui-fg-base shadow-elevation-card-rest"
                : "text-ui-fg-subtle hover:text-ui-fg-base"
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right-side controls */}
      <div className="flex gap-2 items-center">
        {/* Filter buttons */}
        <div className="flex gap-2 items-center">
          {filters.map((f) => (
            <Button key={f.label} variant="secondary" size="small">
              {f.icon}
              {f.label}
            </Button>
          ))}
        </div>

        {/* Sort button */}
        <IconButton
          size="small"
          variant="primary"
          aria-label="Sort"
        >
          <DescendingSorting />
        </IconButton>

        {/* Search with keyboard shortcut */}
        <div className="relative">
          <Input
            type="search"
            size="small"
            placeholder={searchPlaceholder}
            onChange={(e) => onSearch?.(e.target.value)}
          />
          <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 txt-compact-xsmall text-ui-fg-muted">
            {searchShortcut}
          </kbd>
        </div>
      </div>
    </div>
  );
}

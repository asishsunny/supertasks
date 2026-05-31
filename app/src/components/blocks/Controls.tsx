// source: artifacts/transformed/controls-templatized.tsx
// wiring: code/rules/wiring-rules.json → ControlsBar

import { type ReactNode } from "react";
import { Button, IconButton, Input, Kbd } from "@medusajs/ui";
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
    <div className="flex gap-0 h-8 items-center w-full">
      {/* Segment control — templatized: bg-ui-bg-segment-control flex gap-0.5 ... */}
      <div className="bg-ui-bg-segment-control flex gap-0.5 items-center p-0.5 rounded-lg shrink-0">
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

      {/* Spacer — templatized: flex-1 h-full min-w-[1px] */}
      <div className="flex-1 h-full min-w-[1px]" />

      {/* Right-side controls */}
      <div className="flex gap-2 items-center shrink-0">
        {/* Filter buttons — templatized: 3x Button variant="secondary" size="small" */}
        <div className="flex gap-2 items-center shrink-0">
          {filters.map((f) => (
            <Button key={f.label} variant="secondary" size="small">
              {f.icon}
              {f.label}
            </Button>
          ))}
        </div>

        {/* Sort — templatized: IconButton size="small" variant="primary" */}
        <IconButton size="small" variant="primary" aria-label="Sort">
          <DescendingSorting />
        </IconButton>

        {/* Search + Kbd — templatized: relative wrapper with Input + Kbd */}
        <div className="relative">
          <Input
            type="search"
            size="small"
            placeholder={searchPlaceholder}
            onChange={(e) => onSearch?.(e.target.value)}
          />
          <Kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
            {searchShortcut}
          </Kbd>
        </div>
      </div>
    </div>
  );
}

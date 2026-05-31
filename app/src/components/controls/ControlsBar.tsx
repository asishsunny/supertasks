"use client";

import { type ReactNode } from "react";
import { Button, IconButton, Input, Kbd } from "@medusajs/ui";
import { DescendingSorting, Funnel, AdjustmentsDone } from "@medusajs/icons";

export interface ControlsBarProps {
  views?: { key: string; label: string }[];
  activeView?: string;
  onViewChange?: (key: string) => void;
  onSearch?: (query: string) => void;
  statusFilter?: string;
  priorityFilter?: string;
  onStatusFilter?: (value: string) => void;
  onPriorityFilter?: (value: string) => void;
}

export function ControlsBar({
  views,
  activeView,
  onViewChange,
  onSearch,
}: ControlsBarProps) {
  return (
    <div className="flex gap-0 items-center w-full">
      {/* Segment control */}
      {views && views.length > 0 && (
        <div className="bg-ui-bg-segment-control flex gap-0.5 items-center p-0.5 rounded-lg shrink-0">
          {views.map((v) => (
            <button
              key={v.key}
              type="button"
              role="tab"
              aria-selected={activeView === v.key}
              onClick={() => onViewChange?.(v.key)}
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
      )}

      {/* Spacer */}
      <div className="flex-1 h-full min-w-[1px]" />

      {/* Right-side controls */}
      <div className="flex gap-2 items-center shrink-0">
        <Button variant="secondary" size="small">
          <Funnel />
          Filter
        </Button>

        <IconButton size="small" variant="primary" aria-label="Sort">
          <DescendingSorting />
        </IconButton>

        <div className="relative">
          <Input
            type="search"
            size="small"
            placeholder="Search..."
            onChange={(e) => onSearch?.(e.target.value)}
          />
          <Kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
            /
          </Kbd>
        </div>
      </div>
    </div>
  );
}

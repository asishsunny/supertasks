// source: artifacts/transformed/controls.tsx
// adapt: segment items → props, Button/IconButton/Input from Medusa

"use client";

import { useState } from "react";
import { Button, IconButton, Input } from "@medusajs/ui";
import { Funnel, CalendarMini, Adjustments, DescendingSorting, MagnifyingGlass } from "@medusajs/icons";

interface ControlsBarProps {
  views?: { key: string; label: string }[];
  activeView?: string;
  onViewChange?: (key: string) => void;
  onSearch?: (query: string) => void;
}

export function ControlsBar({ views, activeView: controlledView, onViewChange, onSearch }: ControlsBarProps) {
  const [internalView, setInternalView] = useState(controlledView ?? views?.[0]?.key);
  const active = controlledView ?? internalView;

  function handleViewChange(key: string) {
    setInternalView(key);
    onViewChange?.(key);
  }

  return (
    <div className="flex gap-0 items-center relative w-full h-full">
      {views && views.length > 0 && (
        <div className="bg-ui-bg-segment-control flex gap-0.5 items-center p-0.5 rounded-lg shrink-0">
          {views.map((v) => (
            <button
              key={v.key}
              onClick={() => handleViewChange(v.key)}
              className={`px-2.5 py-1 rounded-md txt-compact-small-plus cursor-pointer transition-colors ${
                active === v.key
                  ? "bg-ui-bg-base text-ui-fg-base shadow-elevation-card-rest"
                  : "text-ui-fg-subtle hover:text-ui-fg-base"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      )}
      <div className="flex-1 h-full min-w-[1px] relative" />
      <div className="flex gap-2 items-center relative shrink-0">
        <div className="flex gap-2 items-center relative shrink-0">
          <Button variant="secondary" size="small">
            <Funnel className="w-[15px] h-[15px]" />
            Filter
          </Button>
          <Button variant="secondary" size="small">
            <CalendarMini className="w-[15px] h-[15px]" />
            Date
          </Button>
          <Button variant="secondary" size="small">
            <Adjustments className="w-[15px] h-[15px]" />
            Columns
          </Button>
        </div>
        <IconButton size="small" variant="transparent">
          <DescendingSorting />
        </IconButton>
        <Input
          type="search"
          size="small"
          placeholder="Search"
          className="w-40"
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </div>
    </div>
  );
}

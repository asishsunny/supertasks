"use client";

// source: artifacts/transformed/controls.tsx
// step 2: imports added, segment tabs → props with active/inactive classes from Figma cache,
// noise cleaned with context

import { useState } from "react";
import { Button, IconButton, Input } from "@medusajs/ui";
import { Funnel, CalendarMini, Adjustments, DescendingSorting } from "@medusajs/icons";

interface ControlsProps {
  views?: { key: string; label: string }[];
  activeView?: string;
  onViewChange?: (key: string) => void;
  onSearch?: (query: string) => void;
}

export function Controls({ views, activeView: controlledView, onViewChange, onSearch }: ControlsProps) {
  const [internalView, setInternalView] = useState(controlledView ?? views?.[0]?.key);
  const active = controlledView ?? internalView;

  function handleView(key: string) {
    setInternalView(key);
    onViewChange?.(key);
  }

  return (
    // noise: relative stripped (no absolute children)
    <div className="flex gap-0 items-center w-full h-full">
      {views && views.length > 0 && (
        // segment control wrapper: from transform line 8
        <div className="bg-ui-bg-segment-control flex gap-0.5 items-center p-0.5 rounded-lg shrink-0">
          {views.map((v) => (
            // segment items: classes from Figma cache (inactive: px-2.5 py-1 rounded-md, active: + bg-base shadow)
            <button
              key={v.key}
              onClick={() => handleView(v.key)}
              className={`px-2.5 py-1 rounded-md font-medium text-[13px] leading-[20px] cursor-pointer ${
                active === v.key
                  ? "bg-ui-bg-base text-ui-fg-base shadow-elevation-card-rest"
                  : "text-ui-fg-subtle"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      )}
      {/* spacer: from transform line 9 */}
      <div className="flex-1 h-full min-w-[1px]" />
      {/* actions: from transform lines 10-18 */}
      <div className="flex gap-2 items-center">
        <div className="flex gap-2 items-center">
          <Button variant="secondary" size="small"><Funnel className="w-[15px] h-[15px]" />Filter</Button>
          <Button variant="secondary" size="small"><CalendarMini className="w-[15px] h-[15px]" />Date</Button>
          <Button variant="secondary" size="small"><Adjustments className="w-[15px] h-[15px]" />Columns</Button>
        </div>
        <IconButton size="small" variant="transparent"><DescendingSorting /></IconButton>
        <Input type="search" size="small" placeholder="Search" onChange={(e) => onSearch?.(e.target.value)} />
      </div>
    </div>
  );
}

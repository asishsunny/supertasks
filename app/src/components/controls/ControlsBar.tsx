"use client";

import { useState } from "react";
import { Button, DropdownMenu, Input } from "@medusajs/ui";
import { Funnel, CalendarMini, Adjustments, DescendingSorting, Check } from "@medusajs/icons";
import type { Status, Priority } from "@/types";
import { STATUS_LABEL } from "@/lib/constants";

interface FilterOption {
  value: string;
  label: string;
}

interface ControlsBarProps {
  views?: { key: string; label: string }[];
  activeView?: string;
  onViewChange?: (key: string) => void;
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
  onStatusFilter?: (status: Status | "all") => void;
  onPriorityFilter?: (priority: Priority | "all") => void;
  statusFilter?: Status | "all";
  priorityFilter?: Priority | "all";
}

const STATUS_OPTIONS: FilterOption[] = [
  { value: "all", label: "All statuses" },
  { value: "todo", label: STATUS_LABEL.todo },
  { value: "in_progress", label: STATUS_LABEL.in_progress },
  { value: "in_review", label: STATUS_LABEL.in_review },
  { value: "done", label: STATUS_LABEL.done },
];

const PRIORITY_OPTIONS: FilterOption[] = [
  { value: "all", label: "All priorities" },
  { value: "critical", label: "Critical" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const SORT_OPTIONS: FilterOption[] = [
  { value: "due-asc", label: "Due date (earliest)" },
  { value: "due-desc", label: "Due date (latest)" },
  { value: "priority", label: "Priority" },
  { value: "title", label: "Title A–Z" },
];

export function ControlsBar({
  views,
  activeView: controlledView,
  onViewChange,
  searchPlaceholder = "Search",
  onSearch,
  onStatusFilter,
  onPriorityFilter,
  statusFilter = "all",
  priorityFilter = "all",
}: ControlsBarProps) {
  const [internalView, setInternalView] = useState(controlledView ?? views?.[0]?.key);
  const active = controlledView ?? internalView;

  function handleViewChange(key: string) {
    setInternalView(key);
    onViewChange?.(key);
  }

  const hasActiveFilter = statusFilter !== "all" || priorityFilter !== "all";

  return (
    <div className="flex items-center w-full">
      {views && views.length > 0 && (
        <div className="bg-ui-bg-segment-control flex gap-0.5 items-center p-0.5 rounded-lg shrink-0">
          {views.map((v) => (
            <button
              key={v.key}
              onClick={() => handleViewChange(v.key)}
              className={`px-2.5 py-1 rounded-md txt-compact-small-plus transition-colors cursor-pointer ${
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
      <div className="flex-1" />
      <div className="flex gap-2 items-center">
        <DropdownMenu>
          <DropdownMenu.Trigger asChild>
            <Button variant="secondary" size="small">
              <Funnel className="w-[15px] h-[15px]" />
              Filter
              {hasActiveFilter && <span className="size-1.5 rounded-full bg-ui-fg-base" />}
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="start" className="min-w-[180px]">
            <DropdownMenu.Label>Status</DropdownMenu.Label>
            {STATUS_OPTIONS.map((o) => (
              <DropdownMenu.Item
                key={o.value}
                onClick={() => onStatusFilter?.(o.value as Status | "all")}
                className="flex items-center justify-between"
              >
                {o.label}
                {statusFilter === o.value && <Check className="w-3.5 h-3.5 text-ui-fg-base" />}
              </DropdownMenu.Item>
            ))}
            <DropdownMenu.Separator />
            <DropdownMenu.Label>Priority</DropdownMenu.Label>
            {PRIORITY_OPTIONS.map((o) => (
              <DropdownMenu.Item
                key={o.value}
                onClick={() => onPriorityFilter?.(o.value as Priority | "all")}
                className="flex items-center justify-between"
              >
                {o.label}
                {priorityFilter === o.value && <Check className="w-3.5 h-3.5 text-ui-fg-base" />}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenu.Trigger asChild>
            <Button variant="secondary" size="small">
              <CalendarMini className="w-[15px] h-[15px]" />
              Date
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="start">
            <DropdownMenu.Item>Today</DropdownMenu.Item>
            <DropdownMenu.Item>This week</DropdownMenu.Item>
            <DropdownMenu.Item>This month</DropdownMenu.Item>
            <DropdownMenu.Item>Overdue</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenu.Trigger asChild>
            <Button variant="secondary" size="small">
              <Adjustments className="w-[15px] h-[15px]" />
              Columns
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="start">
            <DropdownMenu.CheckboxItem checked>Task</DropdownMenu.CheckboxItem>
            <DropdownMenu.CheckboxItem checked>Assignee</DropdownMenu.CheckboxItem>
            <DropdownMenu.CheckboxItem checked>Priority</DropdownMenu.CheckboxItem>
            <DropdownMenu.CheckboxItem checked>Due Date</DropdownMenu.CheckboxItem>
            <DropdownMenu.CheckboxItem checked>Status</DropdownMenu.CheckboxItem>
          </DropdownMenu.Content>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenu.Trigger asChild>
            <button className="flex items-center justify-center size-7 rounded-md bg-ui-bg-base shadow-borders-base hover:bg-ui-bg-base-hover transition-colors cursor-pointer">
              <DescendingSorting className="w-[15px] h-[15px] text-ui-fg-base" />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="end">
            {SORT_OPTIONS.map((o) => (
              <DropdownMenu.Item key={o.value}>{o.label}</DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu>

        <Input
          type="search"
          size="small"
          placeholder={searchPlaceholder}
          className="w-40"
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </div>
    </div>
  );
}

import { Button, IconButton, Input, Kbd } from "@medusajs/ui";
import {
  Funnel,
  CalendarMini,
  Adjustments,
  DescendingSorting,
} from "@medusajs/icons";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type IconComponent = typeof Funnel;

export interface ViewTab {
  key: string;
  label: string;
  active?: boolean;
}

export interface ActionButton {
  label: string;
  icon: IconComponent;
}

export interface ControlsProps {
  /** Segment-control tabs (left side) */
  views?: ViewTab[];
  /** Action buttons (Filter, Date, Columns, etc.) */
  actions?: ActionButton[];
  /** Search placeholder */
  searchPlaceholder?: string;
  /** Keyboard shortcut label */
  searchKbd?: string;
  /** Callbacks */
  onViewChange?: (key: string) => void;
  onActionClick?: (label: string) => void;
  onSortClick?: () => void;
  onSearch?: (query: string) => void;
}

/* ------------------------------------------------------------------ */
/*  Defaults — one representative item from Figma template             */
/* ------------------------------------------------------------------ */

const DEFAULT_VIEWS: ViewTab[] = [
  { key: "kanban", label: "Kanban", active: false },
  { key: "list", label: "List", active: true },
];

const DEFAULT_ACTIONS: ActionButton[] = [
  { label: "Filter", icon: Funnel },
  { label: "Date", icon: CalendarMini },
  { label: "Columns", icon: Adjustments },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function Controls({
  views = DEFAULT_VIEWS,
  actions = DEFAULT_ACTIONS,
  searchPlaceholder = "Search",
  searchKbd = "⌘K",
  onViewChange,
  onActionClick,
  onSortClick,
  onSearch,
}: ControlsProps) {
  return (
    <div className="flex gap-0 h-8 items-center relative shrink-0 w-full">
      {/* Segment control */}
      <div className="bg-ui-bg-segment-control flex gap-0.5 items-center p-0.5 rounded-lg shrink-0">
        {views.map((v) => (
          <button
            key={v.key}
            type="button"
            role="tab"
            aria-selected={v.active}
            onClick={() => onViewChange?.(v.key)}
            className={`px-2.5 py-1 rounded-md txt-compact-small cursor-pointer ${
              v.active
                ? "bg-ui-bg-base text-ui-fg-base shadow-elevation-card-rest"
                : "text-ui-fg-subtle"
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1 h-full min-w-[1px] relative" />

      {/* Right-side controls */}
      <div className="flex gap-2 items-center relative shrink-0">
        <div className="flex gap-2 items-center relative shrink-0">
          {actions.map((a) => {
            const Icon = a.icon;
            return (
              <Button
                key={a.label}
                variant="secondary"
                size="small"
                onClick={() => onActionClick?.(a.label)}
              >
                <Icon className="w-[15px] h-[15px]" />
                {a.label}
              </Button>
            );
          })}
        </div>

        <IconButton
          size="small"
          variant="primary"
          aria-label="Sort"
          onClick={() => onSortClick?.()}
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
          <Kbd className="absolute right-1.5 top-1/2 -translate-y-1/2">
            {searchKbd}
          </Kbd>
        </div>
      </div>
    </div>
  );
}

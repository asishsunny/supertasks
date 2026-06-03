"use client";

import { Controls } from "@/components/blocks/Controls";
import { Funnel, CalendarMini, Adjustments } from "@medusajs/icons";

const TASK_VIEWS = [
  { key: "kanban", label: "Kanban", active: false },
  { key: "list", label: "List", active: true },
];

const TASK_ACTIONS = [
  { label: "Filter", icon: Funnel },
  { label: "Date", icon: CalendarMini },
  { label: "Columns", icon: Adjustments },
];

const REPORT_VIEWS = [
  { key: "table", label: "Table", active: true },
  { key: "chart", label: "Chart", active: false },
];

const REPORT_ACTIONS = [
  { label: "Filter", icon: Funnel },
  { label: "Date", icon: CalendarMini },
];

export default function Page() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">
          Tasks — List active
        </h2>
        <Controls
          views={TASK_VIEWS}
          actions={TASK_ACTIONS}
          searchPlaceholder="Search"
          searchKbd="⌘K"
        />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">
          Tasks — Kanban active
        </h2>
        <Controls
          views={[
            { key: "kanban", label: "Kanban", active: true },
            { key: "list", label: "List", active: false },
          ]}
          actions={TASK_ACTIONS}
          searchPlaceholder="Search"
          searchKbd="⌘K"
        />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">
          Reports — fewer actions
        </h2>
        <Controls
          views={REPORT_VIEWS}
          actions={REPORT_ACTIONS}
          searchPlaceholder="Search reports"
          searchKbd="/"
        />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">
          Default (no props)
        </h2>
        <Controls />
      </section>
    </div>
  );
}

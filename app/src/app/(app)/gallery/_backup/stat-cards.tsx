"use client";

import { INITIAL_TASKS } from "@/lib/data";
import { isOverdue } from "@/lib/utils";

const total = INITIAL_TASKS.length;
const inProgress = INITIAL_TASKS.filter((t) => t.status === "in_progress").length;
const done = INITIAL_TASKS.filter((t) => t.status === "done").length;
const overdue = INITIAL_TASKS.filter((t) => isOverdue(t.due) && t.status !== "done").length;

const cards = [
  { label: "Total Tasks", value: total },
  { label: "In Progress", value: inProgress },
  { label: "Completed", value: done },
  { label: "Overdue", value: overdue, error: true },
];

// markup from artifacts/transformed/stat-cards.tsx
export default function StatCardsGallery() {
  return (
    <div className="flex gap-4 items-start relative w-full">
      {cards.map((c) => (
        <div key={c.label} className="bg-ui-bg-base flex flex-1 flex-col gap-4 min-w-[1px] overflow-clip p-6 relative rounded-xl shadow-elevation-card-rest text-ui-fg-base">
          <p className="relative shrink-0 txt-compact-medium-plus">
            {c.label}
          </p>
          <p className={`relative shrink-0 text-[32px] leading-[44px] tracking-[-0.16px] font-normal ${c.error ? "text-ui-fg-error" : ""}`}>
            {c.value}
          </p>
        </div>
      ))}
    </div>
  );
}

"use client";

import StatCards from "@/components/blocks/StatCards";
import { INITIAL_TASKS } from "@/lib/data";
import { STATUS_LABEL } from "@/lib/constants";
import type { Status } from "@/types";

const STATUSES: Status[] = ['todo', 'in_progress', 'in_review', 'done'];
const cards = STATUSES.map(s => ({ label: STATUS_LABEL[s], value: String(INITIAL_TASKS.filter(t => t.status === s).length) }));

export default function Page() {
  return (
    <div className="p-6">
      <StatCards cards={cards} />
    </div>
  );
}

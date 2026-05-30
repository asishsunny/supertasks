"use client";
import { StatCards } from "@/components/blocks/StatCards";
import { INITIAL_TASKS } from "@/lib/data";
import { isOverdue } from "@/lib/utils";

const cards = [
  { label: "Total Tasks", value: INITIAL_TASKS.length },
  { label: "In Progress", value: INITIAL_TASKS.filter((t) => t.status === "in_progress").length },
  { label: "Completed", value: INITIAL_TASKS.filter((t) => t.status === "done").length },
  { label: "Overdue", value: INITIAL_TASKS.filter((t) => isOverdue(t.due) && t.status !== "done").length, error: true },
];

export default function Page() { return <StatCards cards={cards} />; }

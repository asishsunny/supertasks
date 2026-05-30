"use client";

import { useMemo } from "react";
import { useStore } from "@/app/(app)/store";
import { isOverdue } from "@/lib/utils";

export function useTaskStats() {
  const { state } = useStore();
  return useMemo(() => ({
    total: state.tasks.length,
    inProgress: state.tasks.filter((t) => t.status === "in_progress").length,
    done: state.tasks.filter((t) => t.status === "done").length,
    overdue: state.tasks.filter((t) => isOverdue(t.due) && t.status !== "done").length,
  }), [state.tasks]);
}

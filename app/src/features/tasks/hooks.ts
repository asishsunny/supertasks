"use client";

import { useMemo, useState, useEffect } from "react";
import { useQueryState } from "nuqs";
import { useStore } from "@/app/(app)/store";
import { applyTaskFilters, type TaskFilters } from "@/lib/filters";
import type { Status, Priority } from "@/types";

export function useTaskFilters() {
  const [search, setSearch] = useQueryState("q", { defaultValue: "" });
  const [status, setStatus] = useQueryState("status", { defaultValue: "all" });
  const [priority, setPriority] = useQueryState("priority", { defaultValue: "all" });

  const filters: TaskFilters = {
    search: search ?? "",
    status: (status ?? "all") as Status | "all",
    priority: (priority ?? "all") as Priority | "all",
  };

  return { filters, setSearch, setStatus, setPriority };
}

export function useFilteredTasks(filters: TaskFilters) {
  const { state } = useStore();
  return useMemo(() => applyTaskFilters(state.tasks, filters), [state.tasks, filters]);
}

export function usePagination(total: number, pageSize = 10) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(total / pageSize);

  useEffect(() => {
    if (page > totalPages && totalPages > 0) setPage(totalPages);
    else if (page < 1) setPage(1);
  }, [total, page, totalPages]);

  function paginate<T>(items: T[]): T[] {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }

  return { page, pageSize, total, totalPages, paginate, setPage };
}

import type { Task, Status, Priority } from "@/types";

export interface TaskFilters {
  search: string;
  status: Status | "all";
  priority: Priority | "all";
}

export const EMPTY_FILTERS: TaskFilters = {
  search: "",
  status: "all",
  priority: "all",
};

export function applyTaskFilters(tasks: Task[], filters: TaskFilters): Task[] {
  let result = tasks;

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (t) => t.title.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)
    );
  }

  if (filters.status !== "all") {
    result = result.filter((t) => t.status === filters.status);
  }

  if (filters.priority !== "all") {
    result = result.filter((t) => t.priority === filters.priority);
  }

  return result;
}

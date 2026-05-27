"use client";

import { createContext, useContext, useReducer, type ReactNode } from "react";
import type { Task, Member, Report } from "@/types";
import { INITIAL_TASKS, MEMBERS, INITIAL_REPORTS } from "@/lib/data";

interface AppState {
  tasks: Task[];
  members: Member[];
  reports: Report[];
}

type Action =
  | { type: "ADD_TASK"; task: Task }
  | { type: "UPDATE_TASK"; task: Task }
  | { type: "DELETE_TASK"; id: number }
  | { type: "MOVE_TASK"; id: number; status: Task["status"] }
  | { type: "ADD_MEMBER"; member: Member }
  | { type: "ADD_REPORT"; report: Report };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.task] };
    case "UPDATE_TASK":
      return { ...state, tasks: state.tasks.map(t => t.id === action.task.id ? action.task : t) };
    case "DELETE_TASK":
      return { ...state, tasks: state.tasks.filter(t => t.id !== action.id) };
    case "MOVE_TASK":
      return { ...state, tasks: state.tasks.map(t => t.id === action.id ? { ...t, status: action.status } : t) };
    case "ADD_MEMBER":
      return { ...state, members: [...state.members, action.member] };
    case "ADD_REPORT":
      return { ...state, reports: [...state.reports, action.report] };
    default:
      return state;
  }
}

const StoreContext = createContext<{ state: AppState; dispatch: React.Dispatch<Action> } | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    tasks: INITIAL_TASKS,
    members: MEMBERS,
    reports: INITIAL_REPORTS,
  });

  return <StoreContext value={{ state, dispatch }}>{children}</StoreContext>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

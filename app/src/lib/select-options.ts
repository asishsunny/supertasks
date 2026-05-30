import { STATUS_LABEL } from "./constants";
import type { Status, Priority } from "@/types";

export const STATUS_OPTIONS: { value: Status | "all"; label: string }[] = [
  { value: "all", label: "All statuses" },
  ...Object.entries(STATUS_LABEL).map(([k, v]) => ({ value: k as Status, label: v })),
];

export const PRIORITY_OPTIONS: { value: Priority | "all"; label: string }[] = [
  { value: "all", label: "All priorities" },
  { value: "critical", label: "Critical" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

import type { Priority, Status } from "@/types";

export type BadgeColor = "grey" | "orange" | "red" | "purple" | "blue" | "green";

export const PRIORITY_COLOR: Record<Priority, BadgeColor> = {
  low: "grey",
  medium: "orange",
  high: "red",
  critical: "purple",
};

export const STATUS_COLOR: Record<Status, BadgeColor> = {
  todo: "grey",
  in_progress: "blue",
  in_review: "orange",
  done: "green",
};

export const STATUS_LABEL: Record<Status, string> = {
  todo: "To do",
  in_progress: "In progress",
  in_review: "In review",
  done: "Done",
};

export const BAR_COLORS: Record<Status, string> = {
  todo: "var(--tag-neutral-icon)",
  in_progress: "var(--tag-blue-icon)",
  in_review: "var(--tag-orange-icon)",
  done: "var(--tag-green-icon)",
};

export const PRIORITY_BAR_COLORS: Record<Priority, string> = {
  low: "var(--tag-neutral-icon)",
  medium: "var(--tag-orange-icon)",
  high: "var(--tag-red-icon)",
  critical: "var(--tag-purple-icon)",
};

export const BAR_COLORS_ALL: Record<string, string> = { ...BAR_COLORS, ...PRIORITY_BAR_COLORS };

export const BADGE_STATE_COLOR: Record<string, BadgeColor> = {
  Neutral: "grey",
  Warning: "orange",
  Error: "red",
  Feature: "purple",
};

export const STATUS_KEY: Record<string, Status> = {
  "To Do": "todo",
  "In Progress": "in_progress",
  "In Review": "in_review",
  "Done": "done",
};

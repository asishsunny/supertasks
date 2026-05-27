export type Priority = "high" | "medium" | "critical" | "low";
export type Status = "in_progress" | "in_review" | "todo" | "done";

export interface Task {
  id: number;
  title: string;
  desc: string;
  assignee: number;
  status: Status;
  priority: Priority;
  due: string;
}

export interface Member {
  id: number;
  name: string;
  initials: string;
  email: string;
  role: string;
  avatarBg: string;
  avatarText: string;
}

export interface Report {
  id: number;
  report: string;
  memberId: number;
  range: string;
  generated: string;
}

export interface SettingsToggle {
  label: string;
  desc: string;
  on: boolean;
}

export interface ActivityItem {
  taskId: number;
  memberId: number;
  time: string;
  text: string;
}

export interface ModalField {
  label: string;
  type: "input" | "textarea" | "select";
  placeholder?: string;
  value?: string;
  row?: number;
}

export interface ModalConfig {
  title: string;
  fields: ModalField[];
  actions: { primary: string; secondary: string };
}

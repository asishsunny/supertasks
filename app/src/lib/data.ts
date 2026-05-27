// Auto-generated from data/data.yaml — do not edit manually
// Run: node code/scripts/gen-data-ts.mjs

import { offsetDate } from "./utils";
import type { Task, Member, Report, SettingsToggle, ModalConfig, ActivityItem } from "@/types";

export const MEMBERS: Member[] = [
  { id: 1, name: "Sara Nelson", initials: "S", email: "sara@taskflow.io", role: "Senior Designer", avatarBg: "tag-blue-bg", avatarText: "tag-blue-text" },
  { id: 2, name: "Mark Tan", initials: "M", email: "mark@taskflow.io", role: "Frontend Engineer", avatarBg: "tag-purple-bg", avatarText: "tag-purple-text" },
  { id: 3, name: "Priya Rao", initials: "P", email: "priya@taskflow.io", role: "Product Manager", avatarBg: "tag-orange-bg", avatarText: "tag-orange-text" },
  { id: 4, name: "Ben Walsh", initials: "B", email: "ben@taskflow.io", role: "Backend Engineer", avatarBg: "tag-red-bg", avatarText: "tag-red-text" },
  { id: 5, name: "Lara Sato", initials: "L", email: "lara@taskflow.io", role: "UX Researcher", avatarBg: "tag-green-bg", avatarText: "tag-green-text" },
  { id: 6, name: "Owen King", initials: "O", email: "owen@taskflow.io", role: "QA Engineer", avatarBg: "tag-neutral-bg", avatarText: "tag-neutral-text" },
];

export const INITIAL_TASKS: Task[] = [
  { id: 1, title: "Update onboarding flow", desc: "Revamp first-run experience for new users", assignee: 1, status: "in_progress", priority: "high", due: offsetDate(-6) },
  { id: 2, title: "Q2 roadmap review", desc: "Align team on priorities for next quarter", assignee: 3, status: "in_review", priority: "medium", due: offsetDate(-1) },
  { id: 3, title: "Customer interviews", desc: "Schedule and run five user feedback sessions", assignee: 5, status: "todo", priority: "medium", due: offsetDate(7) },
  { id: 4, title: "Fix billing bug #482", desc: "Null ref in payment callback causing failed charges", assignee: 4, status: "in_progress", priority: "critical", due: offsetDate(-8) },
  { id: 5, title: "Design QA — Settings", desc: "Verify settings page matches latest design specs", assignee: 1, status: "in_review", priority: "high", due: offsetDate(3) },
  { id: 6, title: "Migrate analytics SDK", desc: "Switch from legacy tracker to new events API", assignee: 2, status: "todo", priority: "high", due: offsetDate(5) },
  { id: 7, title: "Redesign landing page", desc: "New hero section and updated feature grid", assignee: 5, status: "in_progress", priority: "medium", due: offsetDate(1) },
  { id: 8, title: "Fix login bug", desc: "Session token not refreshing on mobile browsers", assignee: 4, status: "done", priority: "critical", due: offsetDate(-10) },
  { id: 9, title: "Write API documentation", desc: "Document all public endpoints with examples", assignee: 6, status: "todo", priority: "low", due: offsetDate(15) },
  { id: 10, title: "Setup CI/CD pipeline", desc: "Configure GitHub Actions for staging deploys", assignee: 2, status: "in_progress", priority: "high", due: offsetDate(12) },
  { id: 11, title: "User research interviews", desc: "Recruit participants and prepare script", assignee: 3, status: "todo", priority: "medium", due: offsetDate(-3) },
  { id: 12, title: "Performance audit", desc: "Profile render times and bundle size", assignee: 6, status: "in_review", priority: "high", due: offsetDate(10) },
  { id: 13, title: "Auth token refresh", desc: "Implement silent refresh with retry logic", assignee: 2, status: "done", priority: "critical", due: offsetDate(-5) },
  { id: 14, title: "Mobile nav refactor", desc: "Replace drawer with bottom tab navigation", assignee: 1, status: "in_progress", priority: "medium", due: offsetDate(-2) },
  { id: 15, title: "Icon system audit", desc: "Catalog all icons and remove unused SVGs", assignee: 5, status: "todo", priority: "low", due: offsetDate(20) },
  { id: 16, title: "Sprint retrospective", desc: "Review velocity and action items from last sprint", assignee: 3, status: "done", priority: "low", due: offsetDate(-5) },
  { id: 17, title: "DB schema migration", desc: "Add indexes and normalize user preferences table", assignee: 4, status: "in_review", priority: "critical", due: offsetDate(4) },
  { id: 18, title: "Accessibility pass", desc: "Fix contrast ratios and add ARIA labels", assignee: 6, status: "todo", priority: "medium", due: offsetDate(8) },
];

export const INITIAL_REPORTS: Report[] = [
  { id: 1, report: "Sprint velocity — Q2 week 5", memberId: 3, range: "Apr 7 – May 7", generated: "May 7, 2026" },
  { id: 2, report: "Task completion by assignee", memberId: 1, range: "Apr 7 – May 7", generated: "May 7, 2026" },
  { id: 3, report: "Overdue tasks — root cause analysis", memberId: 6, range: "Apr 7 – May 7", generated: "May 6, 2026" },
  { id: 4, report: "Team workload distribution", memberId: 3, range: "Apr 7 – May 7", generated: "May 5, 2026" },
  { id: 5, report: "Priority breakdown across sprints", memberId: 2, range: "Apr 14 – May 7", generated: "May 4, 2026" },
  { id: 6, report: "Burndown chart — milestone alpha", memberId: 4, range: "Apr 7 – May 7", generated: "May 3, 2026" },
];

export const ACTIVITY: ActivityItem[] = [
  { taskId: 4, memberId: 4, time: "1h ago", text: "Found the root cause — null ref in payment callback." },
  { taskId: 1, memberId: 3, time: "2h ago", text: "Moving this to in progress — starting the research phase today." },
  { taskId: 2, memberId: 3, time: "3h ago", text: "Shared the draft roadmap doc for review." },
  { taskId: 10, memberId: 2, time: "4h ago", text: "GitHub Actions config pushed to staging branch." },
  { taskId: 7, memberId: 5, time: "5h ago", text: "New hero mockup ready for review." },
  { taskId: 17, memberId: 4, time: "6h ago", text: "Migration script drafted, need review before running." },
  { taskId: 1, memberId: 1, time: "Yesterday", text: "Added initial wireframes to the shared drive. Let me know if you have feedback." },
  { taskId: 12, memberId: 6, time: "Yesterday", text: "Bundle size down 18% after tree-shaking unused deps." },
];

export const CURRENT_USER = { name: "Ludvig Rask", initials: "L", email: "ludvig@taskflow.io", role: "Head of Product", avatar: "/avatar-ludvig.png" };

export const NOTIFICATION_TOGGLES: SettingsToggle[] = [
  { label: "Email notifications", desc: "Receive email for task assignments", on: true },
  { label: "Push notifications", desc: "Get push alerts for due dates", on: true },
  { label: "Weekly digest", desc: "Summary of your team's progress", on: false },
  { label: "Mentions", desc: "Notify when someone mentions you", on: true },
  { label: "Overdue alerts", desc: "Alert when tasks pass their due date", on: true },
];

export const SECURITY_TOGGLES: SettingsToggle[] = [
  { label: "Two-factor authentication", desc: "Add an extra layer of security to your account", on: false },
  { label: "Login alerts", desc: "Get notified when a new device signs in", on: true },
  { label: "Session timeout", desc: "Automatically sign out after 30 minutes of inactivity", on: false },
  { label: "Require password change", desc: "Force password update every 90 days", on: true },
  { label: "SSO enforcement", desc: "Require single sign-on for all team members", on: false },
];

export const MODAL_CONFIGS: Record<string, ModalConfig> = {
  create_task: {
    title: "Create new task",
    fields: [
    { label: "Task name", type: "input", placeholder: "Enter task name..." },
    { label: "Description", type: "textarea", placeholder: "Add a description..." },
    { label: "Priority", type: "select", value: "Select", row: 1 },
    { label: "Status", type: "select", value: "Select", row: 1 },
    { label: "Assignee", type: "select", value: "Select", row: 2 },
    { label: "Due date", type: "select", value: "Select", row: 2 },
    ],
    actions: { primary: "Create task", secondary: "Cancel" },
  },
  invite_member: {
    title: "Invite team member",
    fields: [
    { label: "Full name", type: "input", placeholder: "Enter name..." },
    { label: "Email", type: "input", placeholder: "Enter email..." },
    { label: "Role", type: "select", value: "Select role..." },
    ],
    actions: { primary: "Send invite", secondary: "Cancel" },
  },
  generate_report: {
    title: "Generate report",
    fields: [
    { label: "Report name", type: "input", placeholder: "Enter report name..." },
    { label: "Member", type: "select", value: "Select member..." },
    { label: "Date range", type: "select", value: "Select range..." },
    ],
    actions: { primary: "Generate report", secondary: "Cancel" },
  },
};

export const BILLING = {
  plan: { name: "Pro plan", price: "$12/month", renews: "Renews on Apr 15, 2026", action: "Change plan" },
  payment: { label: "Payment method", value: "Visa ending in 4242", action: "Update" },
  history: [
    { date: "Mar 1, 2026", desc: "Pro Plan — Monthly", amount: "$12.00" },
    { date: "Feb 1, 2026", desc: "Pro Plan — Monthly", amount: "$12.00" },
    { date: "Jan 1, 2026", desc: "Pro Plan — Monthly", amount: "$12.00" },
  ],
};

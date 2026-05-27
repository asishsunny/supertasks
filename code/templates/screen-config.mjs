/**
 * Screen configs — one object per screen, only the unique parts.
 * Builder reads views.yaml for columns/widths/types.
 * This file provides: data setup, imports, iterator context, overrides.
 */

export const SCREENS = {
  dashboard: {
    componentName: "DashboardPage",
    sections: ["stat-cards", "chart-cards", "table"],
    imports: {
      named: {
        "@/lib/data": ["INITIAL_TASKS"],
        "@/lib/utils": ["isOverdue"],
      },
    },
    setup: `const tasks = INITIAL_TASKS;
  const total = tasks.length;`,
    table: {
      title: "Recent Tasks",
      dataVar: "recentTasks",
      iterator: "task",
      keyExpr: "task.id",
      rowSetup: "const member = MEMBERS.find((m) => m.id === task.assignee) ?? MEMBERS[0];",
      dataSetup: `const recentTasks = tasks
    .filter((t) => t.status !== "done")
    .sort((a, b) => b.due.localeCompare(a.due))
    .slice(0, 5);`,
    },
    charts: [
      {
        title: "Tasks by Priority",
        rowsVar: "PRIORITY_ROWS",
        filterField: "priority",
        colorVar: "PRIORITY_BAR_COLORS",
        rows: [
          { key: "critical", label: "Critical" },
          { key: "high", label: "High" },
          { key: "medium", label: "Medium" },
          { key: "low", label: "Low" },
        ],
      },
      {
        title: "Tasks by Status",
        rowsVar: "STATUS_ROWS",
        filterField: "status",
        colorVar: "BAR_COLORS",
        rows: [
          { key: "todo", label: "To Do" },
          { key: "in_progress", label: "In Progress" },
          { key: "in_review", label: "In Review" },
          { key: "done", label: "Done" },
        ],
      },
    ],
  },

  tasks_list: {
    componentName: "TasksPage",
    sections: ["controls", "table"],
    imports: {
      named: {
        "@/lib/data": ["INITIAL_TASKS"],
      },
    },
    setup: "const tasks = INITIAL_TASKS;",
    controls: {
      tabs: ["Kanban", "List"],
      activeTab: "List",
      tabLinks: { Kanban: "/tasks/kanban", List: "/tasks" },
      filters: [
        { label: "Filter", icon: "funnel" },
        { label: "Date", icon: "calendarMini" },
        { label: "Columns", icon: "adjustments" },
      ],
      showSort: true,
      showSearch: true,
    },
    table: {
      dataVar: "tasks",
      iterator: "task",
      keyExpr: "task.id",
      pageSize: 10,
      rowSetup: "const member = MEMBERS.find((m) => m.id === task.assignee) ?? MEMBERS[0];",
    },
  },

  tasks_kanban: {
    componentName: "TasksKanbanPage",
    sections: ["controls", "kanban"],
    imports: {
      named: {
        "@/lib/data": ["INITIAL_TASKS"],
      },
      types: ["Status"],
    },
    setup: "const tasks = INITIAL_TASKS;",
    controls: {
      tabs: ["Kanban", "List"],
      activeTab: "Kanban",
      tabLinks: { Kanban: "/tasks/kanban", List: "/tasks" },
      filters: [
        { label: "Filter", icon: "funnel" },
        { label: "Date", icon: "calendarMini" },
        { label: "Columns", icon: "adjustments" },
      ],
      showSort: true,
      showSearch: true,
    },
  },

  team: {
    componentName: "TeamPage",
    sections: ["table"],
    imports: {
      named: {
        "@/lib/data": ["INITIAL_TASKS", "MEMBERS"],
        "@/lib/utils": ["isOverdue"],
      },
    },
    setup: `const members = MEMBERS;
  const tasks = INITIAL_TASKS;`,
    table: {
      dataVar: "members",
      iterator: "member",
      keyExpr: "member.id",
      rowSetup: `const activeTasks = tasks.filter(t => t.assignee === member.id && t.status !== "done").length;
              const overdueTasks = tasks.filter(t => t.assignee === member.id && t.status !== "done" && isOverdue(t.due)).length;`,
      fieldMap: { active: "activeTasks", overdue: "overdueTasks" },
    },
  },

  reports: {
    componentName: "ReportsPage",
    sections: ["controls", "report-stats", "table"],
    imports: {
      named: {
        "@/lib/data": ["INITIAL_REPORTS"],
      },
    },
    setup: "const reports = INITIAL_REPORTS;",
    controls: {
      tabs: ["90d", "30d", "7d"],
      activeTab: "30d",
      showSearch: true,
    },
    stats: [
      { label: "Total completed", value: "3" },
      { label: "Avg completion rate", value: "17%" },
      { label: "Overdue", value: "5" },
      { label: "On track", value: "10" },
    ],
    table: {
      dataVar: "reports",
      iterator: "report",
      keyExpr: "report.id",
      rowSetup: "const member = MEMBERS.find((m) => m.id === report.memberId) ?? MEMBERS[0];",
    },
  },

  settings: {
    componentName: "SettingsPage",
    sections: ["settings"],
    imports: {
      named: {
        "@medusajs/ui": ["Button", "Heading", "Input", "Label", "Switch"],
        "@/lib/data": ["CURRENT_USER", "NOTIFICATION_TOGGLES", "SECURITY_TOGGLES", "BILLING"],
      },
    },
    setup: `const user = CURRENT_USER;`,
  },
};

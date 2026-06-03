// Auto-generated from views.yaml — do not edit manually
// GALLERY object: prop names match generate-interfaces output

export const GALLERY = {
  statCards: {
    cards: [
      { label: "Total Tasks", value: "18" },
      { label: "In Progress", value: "5" },
      { label: "Completed", value: "3" },
      { label: "Overdue", value: "5" },
    ],
  },
  chartCards: {
    cards: [
      { title: "Tasks by Status", bars: [
        { label: "Todo", count: 6 },
        { label: "In Progress", count: 5 },
        { label: "In Review", count: 4 },
        { label: "Done", count: 3 },
      ]},
      { title: "Tasks by Priority", bars: [
        { label: "Low", count: 3 },
        { label: "Medium", count: 6 },
        { label: "High", count: 5 },
        { label: "Critical", count: 4 },
      ]},
    ],
  },
  controls: {
    views: [
      { key: "kanban", label: "Kanban" },
      { key: "list", label: "List" },
    ],
  },
  kanbanBoard: {"tasksByStatus":{"todo":[3,6,9,11,15,18],"in_progress":[1,4,7,10,14],"in_review":[2,5,12,17],"done":[8,13,16]}},
  recentTasks: { taskIds: [15,9,10,12,18] },
  settingsTabs: ["Profile","Notifications","Security","Billing"],
};

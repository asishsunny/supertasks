# Generate compose-rules.json

You are generating a compose-rules.json file for a Figma-to-React pipeline. This file tells the pipeline how to assemble clean TSX sections into complete React pages.

## Input

You will be given:
1. **plan.md** — screen definitions with columns, data bindings, and layout specs
2. **data.yaml** — the data file that pages bind to
3. **An example compose-rules.json** (below) showing the exact schema

## Output

A single JSON file with this structure:

```json
{
  "__doc": "Composition rules — how each screen assembles into a page.",
  "screens": {
    "<screenName>": {
      "imports": {
        "named": { "<module>": ["<export>", ...] },
        "typeOnly": ["<module>"]
      },
      "composition": { ... },
      "sections": [
        {
          "name": "<sectionName>",
          "compose": { "type": "<composeType>", ... }
        }
      ]
    }
  }
}
```

## Compose types

Each section gets a `compose` block. Valid types:

### `page-header`
**Note:** Shell layout.tsx now owns page headers (title + action buttons). Pages should NOT include a `page-header` section — the layout renders it automatically based on the route. Only include this if a page needs a non-standard header that differs from the shell config.
```json
{ "type": "page-header", "title": "Dashboard" }
```

### `stat-cards`
```json
{
  "type": "stat-cards",
  "dataVar": "STAT_CARDS",
  "iterator": "stat",
  "keyExpr": "stat.label"
}
```

### `chart-cards`
```json
{
  "type": "chart-cards",
  "charts": [
    { "dataVar": "TASKS_BY_STATUS", "barColorVar": "BAR_COLORS", "maxExpr": "..." },
    { "dataVar": "TASKS_BY_PRIORITY", "barColorVar": "PRIORITY_BAR_COLORS", "maxExpr": "..." }
  ]
}
```

### `table-loop`
```json
{
  "type": "table-loop",
  "dataVar": "INITIAL_TASKS",
  "iterator": "task",
  "keyExpr": "task.id",
  "columns": [
    { "header": "Task", "field": "task.title", "width": "FILL" },
    { "header": "Assignee", "field": "member", "lookup": "MEMBERS.find(m => m.id === task.assigneeId)", "width": "160px" },
    { "header": "Status", "field": "task.status", "render": "statusDot", "width": "140px" },
    { "header": "Priority", "field": "task.priority", "render": "badge", "colorMap": "PRIORITY_COLOR", "width": "110px" },
    { "header": "Due date", "field": "task.dueDate", "format": "formatDate", "width": "120px" }
  ],
  "pagination": { "pageSize": 10 }
}
```

### `controls-bar`
```json
{
  "type": "controls-bar",
  "segments": ["Kanban", "List"],
  "activeSegment": "List"
}
```

### `settings-tabs`
```json
{
  "type": "settings-tabs",
  "tabs": ["Profile", "Notifications", "Security", "Billing"],
  "activeTab": "Profile"
}
```

## Rules

1. **Every screen in plan.md gets an entry** — skip comp/overlay screens (type: comp)
2. **Columns come from plan.md** — match field names to data.yaml properties
3. **Width values**: `FILL` = flex-1, or fixed like `160px`, `120px`
4. **Imports**: include all UI components, icons, data constants, types, and utils the page needs
5. **typeOnly imports**: modules that only export types (like `@/types`)
6. **pagination**: only add if plan.md says "paginate after N rows"
7. **Composition block**: top-level page wrapper config (dataFn, componentName, etc.)

## Example

Here is a complete screen entry to follow as a template:

```json
"dashboard": {
  "imports": {
    "named": {
      "@medusajs/ui": ["Badge", "IconButton"],
      "@medusajs/icons": ["EllipsisHorizontal"],
      "@/components/ColorAvatar": ["ColorAvatar"],
      "@/lib/constants": ["PRIORITY_COLOR", "PRIORITY_BAR_COLORS", "BAR_COLORS", "STATUS_LABEL"],
      "@/lib/data": ["INITIAL_TASKS", "MEMBERS"],
      "@/lib/utils": ["formatDate", "isOverdue"],
      "@/types": ["Priority", "Status"]
    },
    "typeOnly": ["@/types"]
  },
  "composition": {
    "componentName": "DashboardPage",
    "dataFn": "getDashboardData",
    "statCards": true,
    "chartCards": true,
    "recentTable": true
  },
  "sections": [
    {
      "name": "stat-cards",
      "compose": {
        "type": "stat-cards",
        "dataVar": "STAT_CARDS",
        "iterator": "stat",
        "keyExpr": "stat.label"
      }
    },
    {
      "name": "chart-cards",
      "compose": {
        "type": "chart-cards",
        "charts": [
          {
            "dataVar": "TASKS_BY_STATUS",
            "barColorVar": "BAR_COLORS",
            "maxExpr": "Math.max(...TASKS_BY_STATUS.map(s => s.count))"
          },
          {
            "dataVar": "TASKS_BY_PRIORITY",
            "barColorVar": "PRIORITY_BAR_COLORS",
            "maxExpr": "Math.max(...TASKS_BY_PRIORITY.map(s => s.count))"
          }
        ]
      }
    },
    {
      "name": "recent-tasks",
      "compose": {
        "type": "table-loop",
        "dataVar": "INITIAL_TASKS",
        "iterator": "task",
        "keyExpr": "task.id",
        "sliceExpr": ".slice(0, 5)",
        "columns": [
          { "header": "Task", "field": "task.title", "width": "FILL" },
          { "header": "Assignee", "field": "member", "lookup": "MEMBERS.find(m => m.id === task.assigneeId)", "width": "160px" },
          { "header": "Status", "field": "task.status", "render": "statusDot", "width": "140px" },
          { "header": "Priority", "field": "task.priority", "render": "badge", "colorMap": "PRIORITY_COLOR", "width": "110px" },
          { "header": "Due date", "field": "task.dueDate", "format": "formatDate", "width": "120px" }
        ]
      }
    }
  ]
}
```

Now generate compose-rules.json for all screens in plan.md.

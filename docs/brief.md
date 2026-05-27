
## What it is
SuperTasks is a task management app for managers 
to track their team's tasks and performance.

## Who it's for
Managers who need visibility across their team —
what's in progress, what's blocked, what's done,
and how each team member is performing.

## Key screens
- Dashboard — live snapshot of team activity and KPIs
- Tasks — Kanban and List view of all team tasks
- Team — team member list and profiles
- Reports — performance summary per team member for a selected period
- Settings — Profile, Appearance, Notifications, Billing

## Data model
- Task: id, title, status, priority, due_date, assignee_id
- Team member: id, name, email, role, assigned_tasks, generated_reports

## Task properties
- Priority: Critical, High, Medium, Low
- Status: To Do, In Progress, In Review, Done
- Assignee: one team member per task

## Scope
One manager, one team, one project.
One entity (task), one relationship (task → team member).

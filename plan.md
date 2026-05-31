# Render Plan — Final render page

Each screen renders at 1440×900. Light + dark pairs sit 80px apart. Rows are 200px apart.


## dashboard

Shell: nav=Dashboard, breadcrumbs=[Dashboard], actions=[]
Snippets: shell, statcards, chartcards, table

**Stats** — Total tasks (18), In progress (5), Completed (3), Overdue (5)

**Charts:**
- Tasks by status — Todo (6), In Progress (5), In Review (4), Done (3)
- Tasks by priority — Low (3), Medium (6), High (5), Critical (4)

**Table** — 5 rows, no pagination
Columns: Task (title), Assignee (user), Status (badge), Priority (badge), Due date (subtle)

---

## tasks_list

Shell: nav=Tasks, breadcrumbs=[Tasks, List], actions=[New task]
Snippets: shell, controls, table
Controls: tabs=[Kanban, List], active=List, buttons=[Filter (Funnel), Date (CalendarMini), Columns (Adjustments), Sort (DescendingSorting)], search=true

**Table** — 18 rows, paginate after 10
Columns: Task (title+desc), Assignee (user), Status (badge), Priority (badge), Due date (subtle)

---

## tasks_kanban

Shell: nav=Tasks, breadcrumbs=[Tasks, Kanban], actions=[New task]
Snippets: shell, controls, kanban
Controls: tabs=[Kanban, List], active=Kanban, buttons=[Filter (Funnel), Date (CalendarMini), Columns (Adjustments), Sort (DescendingSorting)], search=true

**Kanban** — Todo (6), In Progress (5), In Review (4), Done (3)
Card: title, priority badge, assignee avatar, due date

---

## tasks_drawer

Type: comp
Base: Tasks — Kanban
Style: drawer, width=480, inset=8
Overlay: Task Details Modal

---

## tasks_modal_create

Type: comp
Base: Tasks — Kanban
Style: modal, scrim
Overlay: Create Task Modal
Modal: create_task

---

## team

Shell: nav=Team, breadcrumbs=[Team], actions=[Invite member]
Snippets: shell, table

**Table** — 6 rows, no pagination
Columns: Member (user, FILL), Email (subtle, 220), Role (subtle, 160), Active tasks (base, 100), Overdue (base, 100, fgError if >0)

---

## team_invite

Type: comp
Base: Team
Style: modal, scrim
Overlay: Invite Team Member
Modal: invite_member

---

## reports

Shell: nav=Reports, breadcrumbs=[Reports, 30 days], actions=[Generate report]
Snippets: shell, statcards, controls, table
Controls: tabs=[90d, 30d, 7d], active=30d, buttons=[Filter (Funnel)], search=true

**Stats** — Total reports (6), Flagged overdue (4), Avg per month (2), Last generated (May 7)
Stats render between header and controls bar, same grid as dashboard statcards.

**Table** — 6 rows, no pagination
Columns: Report name (base, FILL), Member (user, 200), Date range (subtle, 160), Generated on (subtle, 140)

---

## reports_generate

Type: comp
Base: Reports
Style: modal, scrim
Overlay: Generate Report
Modal: generate_report

---

## settings

Shell: nav=Settings, breadcrumbs=[Settings], actions=[]
Snippets: shell, settings
Settings tab: Profile
Settings nav: [Profile, Notifications, Security, Billing]

**Content** — profile
- Avatar row: XL avatar + name + "Click to change photo"
- Fields (2 per row): Full name / Email, Job title / Phone, Location / Time zone
- Bio textarea
- Action: Save changes

---

## settings_notifications

Shell: nav=Settings, breadcrumbs=[Settings], actions=[]
Snippets: shell, settings
Settings tab: Notifications
Settings nav: [Profile, Notifications, Security, Billing]

**Content** — toggles
Title: Notifications
Subtitle: Manage how you receive alerts
Toggles: Email notifications (on), Push notifications (on), Weekly digest (off), Mentions (on), Overdue alerts (on)
Action: Save changes

---

## settings_security

Shell: nav=Settings, breadcrumbs=[Settings], actions=[]
Snippets: shell, settings
Settings tab: Security
Settings nav: [Profile, Notifications, Security, Billing]

**Content** — toggles
Title: Security
Subtitle: Manage your security preferences
Toggles: Two-factor authentication (off), Login alerts (on), Session timeout (off), Require password change (on), SSO enforcement (off)
Action: Save changes

---

## settings_billing

Shell: nav=Settings, breadcrumbs=[Settings], actions=[]
Snippets: shell, settings
Settings tab: Billing
Settings nav: [Profile, Notifications, Security, Billing]

**Content** — billing
- Plan: Pro plan, $12/month, renews on apr 15, 2026, Change plan
- Payment: Visa ending in 4242, Update
- History columns: Date, Description, Amount (120)
- History rows: Mar 1, 2026 / Pro Plan — Monthly / $12.00, Feb 1, 2026 / Pro Plan — Monthly / $12.00, Jan 1, 2026 / Pro Plan — Monthly / $12.00

---

## Modals

create_task:
  Title: Create new task
  Fields: Task name (input), Description (textarea), Priority (select, row=1), Status (select, row=1), Assignee (select, row=2), Due date (select, row=2)
  Actions: Create task / Cancel

invite_member:
  Title: Invite team member
  Fields: Full name (input), Email (input), Role (select)
  Actions: Send invite / Cancel

generate_report:
  Title: Generate report
  Fields: Report name (input), Member (select), Date range (select)
  Actions: Generate report / Cancel

---

## Render grid

| Row | y    | Screens (light x, dark x)                                                                                    |
|-----|------|---------------------------------------------------------------------------------------------------------------|
| 1   | 0    | dashboard (0, 1520)                                                                                           |
| 2   | 1100 | tasks_list (0, 1520) · tasks_kanban (3040, 4560) · tasks_drawer (6080, 7600) · tasks_modal_create (9120, 10640) |
| 3   | 2200 | team (0, 1520) · team_invite (3040, 4560)                                                                     |
| 4   | 3300 | reports (0, 1520) · reports_generate (3040, 4560)                                                             |
| 5   | 4400 | settings (0, 1520) · settings_notifications (3040, 4560) · settings_security (6080, 7600) · settings_billing (9120, 10640) |

## Notes

- Shell: selected nav icon = fgBase, unselected = fgSubtle (extensions too)
- Shell: header action button icon = contrastFgSecondary
- Table: no filter row, paginate after 10 rows
- Critical priority badge = Feature variant (purple), not Error
- All screens render light + dark (including comp screens)

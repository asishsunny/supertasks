# Demo — One Change, Everything Updates

---

## The Setup

Browser open on dashboard. Figma open on dashboard. Both show 18 tasks.

> "Everything you see comes from one file."

Open `data/data.yaml`. Scroll to tasks.

---

## The Trick

Add one line:

```yaml
- { id: 19, title: "Design system audit", desc: "Review component usage", assignee: 1, status: todo, priority: high, due: 14 }
```

Run three commands:

```bash
node code/scripts/sync-plan.mjs
node figma/scripts/generate-yaml.mjs
node figma/scripts/build-screen.mjs dashboard
```

Flip to Figma. Dashboard says 19.
Flip to browser. Dashboard says 19.

> "I didn't touch Figma. I didn't touch code. I changed the data. Everything followed."

Pause. Let it land.

---

## The Encore

> "Now watch — I'm adding an entire page."

Add one nav item to data.yaml:

```yaml
- { title: Activity, codeName: Clock, icon: "4071:2419", iconFill: fgSubtle }
```

Add one section to plan.md:

```markdown
## activity

Shell: nav=Activity, breadcrumbs=[Activity], actions=[]
Snippets: shell, table
**Table** — 8 rows, no pagination
Columns: Task (FILL), Member (200px), Time (120px), Update (FILL)
```

Run the pipeline. Flip to Figma — new page with Activity in the sidebar. Flip to browser — same thing.

> "Three lines. Two files. A complete new page — in Figma and in code. Same data, same design, same source of truth."

---

## Before recording

- [ ] data.yaml clean (18 tasks, no Activity nav)
- [ ] Dev server running
- [ ] Figma + browser side by side
- [ ] `test-pipeline.mjs` passes

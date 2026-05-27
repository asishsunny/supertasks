# Video 6 — Supabase

## What This Step Does

Replace local data (data.yaml → data.ts) with a real Postgres database. Users, tasks, and teams persist across sessions.

---

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) → New Project
2. Pick a name, set database password, choose region
3. Wait for project to provision (~2 min)

---

## Step 2: Design Schema

Map existing types to Postgres tables:

```sql
-- Members table
create table members (
  id serial primary key,
  name text not null,
  email text not null unique,
  role text not null default 'member',
  avatar text,
  created_at timestamptz default now()
);

-- Tasks table
create table tasks (
  id serial primary key,
  title text not null,
  description text,
  status text not null default 'todo',
  priority text not null default 'medium',
  assignee_id integer references members(id),
  due_date date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Reports table
create table reports (
  id serial primary key,
  title text not null,
  type text not null,
  date_range text,
  status text not null default 'draft',
  created_at timestamptz default now()
);
```

Run in Supabase SQL Editor.

---

## Step 3: Seed Data

Transfer data.yaml content into seed SQL:

```sql
-- Insert members from data.yaml
insert into members (name, email, role, avatar) values
  ('Sarah Chen', 'sarah@company.com', 'admin', null),
  -- ... rest from data.yaml

-- Insert tasks from data.yaml
insert into tasks (title, description, status, priority, assignee_id, due_date) values
  ('Implement auth flow', 'Add login and signup pages', 'in_progress', 'high', 1, '2026-02-15'),
  -- ... rest from data.yaml
```

---

## Step 4: Install Supabase Client

```bash
npm install @supabase/supabase-js --legacy-peer-deps
```

---

## Step 5: Environment Variables

Create `.env.local` in `app/`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Find these in Supabase → Settings → API.

> **Never commit `.env.local`** — already in .gitignore.

---

## Step 6: Create Supabase Client

```tsx
// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

---

## Step 7: Update Store

Replace static data with Supabase queries:

**Option A — Keep useReducer, add async init:**
- Fetch on mount via `useEffect`
- Dispatch actions also write to Supabase
- Local state stays in sync

**Option B — Replace with Supabase directly:**
- Each section fetches its own data
- Mutations go through Supabase client
- Use `useSWR` or `react-query` for caching

Option A is simpler for demo — keeps existing store pattern, adds persistence layer underneath.

```tsx
// In StoreProvider
useEffect(() => {
  async function load() {
    const { data: tasks } = await supabase.from("tasks").select("*");
    const { data: members } = await supabase.from("members").select("*");
    const { data: reports } = await supabase.from("reports").select("*");
    dispatch({ type: "INIT", tasks, members, reports });
  }
  load();
}, []);
```

Add INIT action to reducer:

```tsx
case "INIT":
  return { tasks: action.tasks, members: action.members, reports: action.reports };
```

---

## Step 8: Wire Mutations

Each dispatch also writes to Supabase:

```tsx
// Example — ADD_TASK
async function addTask(task: Omit<Task, "id">) {
  const { data } = await supabase.from("tasks").insert(task).select().single();
  if (data) dispatch({ type: "ADD_TASK", task: data });
}
```

Same pattern for UPDATE_TASK, DELETE_TASK, MOVE_TASK, ADD_MEMBER, ADD_REPORT.

---

## Step 9: Row Level Security (Optional)

For demo, keep it simple — enable RLS with permissive policy:

```sql
alter table tasks enable row level security;
create policy "Allow all" on tasks for all using (true);
-- Repeat for members, reports
```

For production, add proper auth policies.

---

## Step 10: Verify

| Test | Expected |
|------|----------|
| Page loads | Data fetched from Supabase |
| Add task → refresh page | Task persists |
| Delete task → refresh page | Task gone |
| Edit task → refresh page | Changes persist |
| Check Supabase dashboard | Data matches app |

---

## Commit

```bash
git add src/lib/supabase.ts src/app/\(app\)/store.tsx
git commit -m "feat: add Supabase persistence layer"
```

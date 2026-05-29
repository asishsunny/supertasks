# Video 7 — Supabase

## The Story

Right now the app forgets everything when you refresh. Data lives in memory — close the tab, it's gone. Supabase gives us a real database. Tasks persist, users log in, data belongs to the right people.

But a database also means new risks. Anyone with your URL could read or delete your data if it's not locked down. So after wiring Supabase, we run a security checklist — the backend version of what we did for the frontend in QA/QC.

---

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) → New Project
2. Pick a name, set database password, choose region
3. Wait for project to provision (~2 min)

Nothing to configure yet — defaults are fine for starting.

---

## Step 2: Design Schema

Your app already has types for tasks, members, and reports. The database tables mirror those types exactly — same fields, same relationships.

```sql
create table members (
  id serial primary key,
  name text not null,
  email text not null unique,
  role text not null default 'member',
  avatar text,
  created_at timestamptz default now()
);

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

create table reports (
  id serial primary key,
  title text not null,
  type text not null,
  date_range text,
  status text not null default 'draft',
  created_at timestamptz default now()
);
```

Rule: schema matches your TypeScript types. If a field exists in `types/index.ts`, it exists in the database. No drift.

Verify: compare your `Task` interface with the `tasks` table. Every field should match.

---

## Step 3: Seed Data

Transfer data.yaml content into seed SQL. Same data you've been using throughout — now it lives in Postgres instead of a YAML file.

---

## Step 4: Install + Configure

```bash
npm install @supabase/supabase-js --legacy-peer-deps
```

Two keys go in `.env.local` inside `app/`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

The anon key is safe for the browser — it's designed to be public. The service key is NOT. It can bypass all security rules and must never appear in frontend code.

Rule: only the anon key goes in `NEXT_PUBLIC_*`. Service key stays server-side only. Never commit `.env.local` — it's already in .gitignore.

Verify: `grep -r "service_role" src/` — should return nothing.

```tsx
// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

---

## Step 5: Update Store

The store keeps working exactly as before — Zustand manages state, sections call the same methods. The only change is a persistence layer underneath: data loads from Supabase on startup, and mutations write to Supabase before updating local state.

```tsx
const useStore = create<Store>((set) => ({
  tasks: [],
  members: [],
  reports: [],

  hydrate: async () => {
    const [tasks, members, reports] = await Promise.all([
      supabase.from("tasks").select("*"),
      supabase.from("members").select("*"),
      supabase.from("reports").select("*"),
    ]);
    set({
      tasks: tasks.data ?? [],
      members: members.data ?? [],
      reports: reports.data ?? [],
    });
  },
}));
```

Mutations follow the same pattern — write to Supabase, then update Zustand:

```tsx
addTask: async (task) => {
  const { data } = await supabase.from("tasks").insert(task).select().single();
  if (data) set((s) => ({ tasks: [...s.tasks, data] }));
},

deleteTask: async (id) => {
  await supabase.from("tasks").delete().eq("id", id);
  set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) }));
},
```

Zustand updates instantly (optimistic). Supabase persists. If you refresh, data comes back from the database.

Rule: sections never call Supabase directly. They call store methods. The store handles persistence.

Verify: add a task, refresh the page. Is it still there? Delete a task, refresh. Is it gone? If yes, persistence works.

---

## Step 6: Row Level Security

Every table needs a lock. Without RLS, anyone who knows your Supabase URL can read, edit, or delete all your data. This is the #1 breach cause in vibe-coded apps — not a theoretical risk, it happens constantly.

```sql
alter table tasks enable row level security;
alter table members enable row level security;
alter table reports enable row level security;

create policy "Users see own team tasks"
  on tasks for select using (auth.uid() is not null);

create policy "Users modify own team tasks"
  on tasks for all using (auth.uid() is not null);
```

Rule: RLS enabled on every table. No exceptions, no "add later." Policies scope data to authenticated users.

Verify: try accessing data without logging in. Open the Supabase URL directly in a browser. If you can see data, RLS is broken.

---

## Step 7: Auth

Users need to log in before they see anything. Without auth, there's no way to know who's making requests — and RLS policies can't work.

- Auth middleware in Next.js — protect all `/app` routes
- Session management — check on every page load, redirect if expired
- Login/logout flow — unauthenticated users go to a login page
- Service key stays server-side only — never in `NEXT_PUBLIC_*`

Rule: every route under `/app` requires authentication. If Claude skips auth middleware on any route, that route is open to the public.

Verify: log out. Try navigating directly to `/dashboard`. You should be redirected to login.

---

## Step 8: Security Checklist v2

The frontend checklist (from QA/QC) checked HTML, CSS, accessibility, and performance. Now that there's a backend, a whole new set of risks exists. Run [vibe-check](https://github.com/benavlabs/vibe-check) against the codebase.

### Critical — data breaches start here

| Item | What it means | How to check |
|------|--------------|--------------|
| RLS on all tables | Without it, your database is public | Supabase dashboard → Auth policies |
| API routes protected | Every endpoint checks for a valid session | Test without token → should get 401 |
| No secrets in frontend | Only the anon key is in browser code | `grep -r "service_role" src/` |
| No committed secrets | .env files never entered git history | `git log --all -p -- "*.env*"` |
| No IDOR | One user can't see another user's data | Log in as user A, try to access user B's tasks |

### High — real attack vectors

| Item | What it means | How to check |
|------|--------------|--------------|
| Input validation | Form data is checked before hitting the database | Submit garbage data, see what happens |
| CSRF protection | Forms can't be submitted from other sites | Inspect request headers for tokens |
| Rate limiting | Can't spam your API with thousands of requests | Send 100 rapid requests, check for throttling |
| SQL injection | Queries use parameters, never string concatenation | `grep -r "raw\|unsafe" src/` |
| Safe error messages | Errors don't reveal database structure or user data | Trigger an error, read the response |

### Medium — good hygiene

| Item | What it means | How to check |
|------|--------------|--------------|
| Backups enabled | Your data survives disasters | Supabase dashboard → Settings |
| CORS not wildcard | Only your domain can make requests | Check Supabase CORS settings |
| Password hashing | Passwords stored securely (Supabase uses bcrypt) | Verify in auth config |
| No verbose errors | Production shows user-friendly messages, not stack traces | Break something, check what the user sees |

---

## Step 9: Verify

| Test | What you should see |
|------|-------------------|
| Page loads | Data appears from Supabase, not from memory |
| Add task → refresh | Task is still there |
| Delete task → refresh | Task is gone |
| Edit task → refresh | Changes persisted |
| Log out → go to /dashboard | Redirected to login |
| Check Supabase dashboard | Data matches what the app shows |
| Access without auth token | Request fails — RLS working |

---

## Video Flow

1. **Start with the problem** — "Refresh and everything's gone. Let's fix that."
2. **Setup** — create project, schema, seed data
3. **Wire it** — client, store migration, show data persisting
4. **Lock it down** — RLS, auth, env vars
5. **Run checklist v2** — show the 14 backend security items
6. **Fix gaps on camera** — close any findings
7. **Contrast** — "Checklist v1 was HTML/CSS/a11y. v2 is auth/data/API. Both layers matter."

---

## References

- [vibe-check](https://github.com/benavlabs/vibe-check) — 17 vulnerability categories for vibe-coded apps
- [Supabase Master Checklist](https://supabase.com/blog/the-vibe-coding-master-checklist) — official Supabase QA guide
- [Supabase RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)

# Video 7 — Supabase

## The Story

Replace local data with a real Postgres database. Users, tasks, and teams persist across sessions. Then run security checklist v2 — backend adds 9 new audit items that didn't exist before.

---

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) → New Project
2. Pick a name, set database password, choose region
3. Wait for project to provision (~2 min)

---

## Step 2: Design Schema

Map existing types to Postgres tables:

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

---

## Step 3: Seed Data

Transfer data.yaml content into seed SQL. Same data, now in Postgres.

---

## Step 4: Install + Configure

```bash
npm install @supabase/supabase-js --legacy-peer-deps
```

`.env.local` in `app/`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

> **Never commit `.env.local`** — already in .gitignore.

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

Add async persistence to Zustand store:

```tsx
// In store — fetch on mount, hydrate Zustand
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
  // ... mutations below
}));
```

Each mutation writes to Supabase then updates Zustand:

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

Same pattern for update, move. Zustand updates instantly (optimistic), Supabase persists.

---

## Step 6: Row Level Security

**Not optional.** RLS is the #1 breach cause in vibe-coded apps.

```sql
-- Enable RLS on all tables
alter table tasks enable row level security;
alter table members enable row level security;
alter table reports enable row level security;

-- Policies — scope to authenticated user's team
create policy "Users see own team tasks"
  on tasks for select using (auth.uid() is not null);

create policy "Users modify own team tasks"
  on tasks for all using (auth.uid() is not null);

-- Repeat for members, reports with appropriate policies
```

Test: try accessing data without auth token → should fail.

---

## Step 7: Auth

Set up Supabase Auth with email/password or magic link:

- Auth middleware in Next.js — protect all `/app` routes
- Session management — check on every page load
- Login/logout flow — redirect to auth page when unauthenticated
- Service key stays server-side only — never in `NEXT_PUBLIC_*`

---

## Step 8: Security Checklist v2

Backend adds new attack surface. Run [vibe-check](https://github.com/benavlabs/vibe-check) against the codebase.

### Critical
| Item | Check | How to verify |
|------|-------|---------------|
| RLS enabled on all tables | Policies active | Supabase dashboard → Auth policies |
| API routes protected | Auth middleware on all endpoints | Test without token → 401 |
| No secrets in frontend | Only anon key in `NEXT_PUBLIC_*` | `grep -r "service_role" src/` |
| No committed secrets | `.env.local` in .gitignore | `git log --all -p -- "*.env*"` |
| Broken access control (IDOR) | Can't access other users' data | Test with different user tokens |

### High
| Item | Check | How to verify |
|------|-------|---------------|
| Input validation | All form data validated server-side | Submit malformed data |
| CSRF protection | Forms use proper tokens | Inspect request headers |
| Rate limiting | API endpoints throttled | Rapid-fire requests |
| SQL injection | Parameterized queries only | `grep -r "raw\|unsafe" src/` |
| Error messages | No schema/data leaks in errors | Trigger errors, check response |

### Medium
| Item | Check | How to verify |
|------|-------|---------------|
| Backup strategy | Supabase auto-backups enabled | Dashboard → Settings |
| CORS config | Not wildcard | Check Supabase CORS settings |
| Password hashing | Supabase handles (bcrypt) | Verify in auth config |
| Verbose errors disabled | Production error pages | Break something, check output |

---

## Step 9: Verify

| Test | Expected |
|------|----------|
| Page loads | Data fetched from Supabase |
| Add task → refresh | Task persists |
| Delete task → refresh | Task gone |
| Edit task → refresh | Changes persist |
| Logout → access /dashboard | Redirected to login |
| Supabase dashboard | Data matches app |
| RLS test | Unauthenticated request fails |

---

## Video Flow

1. **Setup** — create project, schema, seed data
2. **Wire it** — client, store migration, mutations
3. **Lock it down** — RLS, auth middleware, env vars
4. **Run checklist v2** — show the 14 new backend items
5. **Fix gaps on camera** — close any findings
6. **Score** — show final security posture
7. **Contrast** — "Checklist v1 was HTML/CSS/a11y. v2 is auth/data/API. Both matter."

---

## References

- [vibe-check](https://github.com/benavlabs/vibe-check) — 17 vulnerability categories for vibe-coded apps
- [Supabase Master Checklist](https://supabase.com/blog/the-vibe-coding-master-checklist) — official Supabase QA guide
- [Supabase RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)

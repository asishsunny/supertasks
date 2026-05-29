# Video 6 — QA/QC

## The Story

Everything works. Pages render, sections compose, data flows. But "works" ≠ "production ready."

We run three audits: industry-standard Front-End Checklist (72k GitHub stars), code quality checks, and functional testing. Show the baseline score, fix the gaps, show the improvement.

---

## Step 1: Front-End Checklist Audit (Baseline)

Run the [Front-End Checklist](https://github.com/thedaviddias/Front-End-Checklist) against the codebase. Score using weighted categories — not all items matter equally for an internal task management app.

### Critical (10 pts each)
| Item | Check |
|------|-------|
| Semantic HTML | `<nav>`, `<aside>`, `<main>`, `<h1>` per page |
| Responsive design | Mobile sidebar, breakpoints |
| ARIA / keyboard nav | Labels, focus-visible, Escape handlers |
| XSS prevention | React escapes by default |
| HTTPS | Vercel enforces |
| Error pages | `not-found.tsx` + `error.tsx` exist |
| ESLint + TypeScript | Lint config + `tsc --noEmit` clean |
| Security headers | CSP, X-Frame-Options in next.config.ts |

### Important (5 pts each)
| Item | Check |
|------|-------|
| H1 hierarchy | One H1 per page via PageHeader |
| Image optimization | `next/image` everywhere |
| Font loading | `next/font` (no FOUT) |
| Meta title + description | Meaningful per route |
| Favicon | Custom icon |
| CSS purging | Tailwind handles |
| robots.txt | Next.js built-in |

### Nice-to-have (1-2 pts each, not blocking)
Open Graph, Apple touch icon, canonical URL, structured data, sitemap, bundle analyzer, color contrast audit.

**Target: 90%+ on Critical + Important. Nice-to-haves are post-ship polish.**

---

## Step 2: CI Pipeline

Set up GitHub Actions — runs on every push, blocks bad merges.

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
        working-directory: app
      - run: npx tsc --noEmit
        working-directory: app
      - run: npm run lint
        working-directory: app
      - run: npm run build
        working-directory: app
```

Four checks: install → typecheck → lint → build. Free on GitHub (2,000 mins/month). Zero tokens — runs on GitHub, not Claude.

---

## Step 3: Functional Testing

Run through every interaction end-to-end.

| Test | Expected | ☐ |
|------|----------|----|
| Add task modal → submit | New task in table + kanban | |
| Add task → empty fields → submit | Validation errors show | |
| Click table row | Drawer opens with correct data | |
| Edit in drawer → save | Table updates live | |
| Delete via row menu | Confirm → removed everywhere → toast | |
| Drag kanban card | Status changes in table too | |
| Invite member modal → submit | New member in team table | |
| Generate report modal → submit | New report in reports table | |
| Search tasks | Filters by title | |
| Filter by status/priority | Shows subset | |
| Sort by column | Reorders | |
| Tab switch: List ↔ Kanban | URL changes, filters persist | |
| Dark mode toggle | All sections render correctly | |

---

## Step 4: Code Quality

```bash
# Type check
npx tsc --noEmit

# Hardcoded colors (should be zero)
grep -r "#[0-9a-fA-F]\{3,6\}" src/components/
grep -r "rgb\|rgba" src/components/

# Console.log left behind
grep -r "console.log" src/

# Any types
grep -r ": any" src/

# TODO/FIXME
grep -r "TODO\|FIXME" src/
```

| Pattern | Correct | Wrong |
|---------|---------|-------|
| Store access | `useStore()` in sections | Direct import of data |
| Form state | react-hook-form + Zod | useState per field |
| Types | From `@/types` | Inline definitions |
| Colors | DS tokens only | Hardcoded hex/rgb |

---

## Step 5: Visual Audit

Check every page against Figma UI file:
- Spacing — gaps, padding match DS tokens
- Typography — correct text styles
- Icons — correct Medusa icons, correct size
- Badges — status/priority colors match data.yaml
- Empty states — tables with no data show placeholder
- Dark mode — all pages, all components

---

## Step 6: Fix Gaps + Re-score

Three fixes that move the needle most:

1. **error.tsx + not-found.tsx** — error boundaries for every route
2. **ESLint config** — `next lint` setup + lint script in package.json
3. **Security headers** — CSP, X-Frame-Options, X-Content-Type-Options in next.config.ts
4. **robots.txt** — Next.js metadata API

Re-run Front-End Checklist. Target: 90%+ on weighted score.

---

## Step 7: Edge Cases

| Test | Why |
|------|-----|
| Rapid double-click on submit | Prevent duplicate entries |
| Empty search → clear | Full list restores |
| All filters active at once | Combining search + status + priority + date |
| Long task titles | Truncate in table, full in drawer |
| Special characters in input | Quotes, ampersands, emoji |
| Escape key on modal/drawer | Closes without saving |
| Kanban column with 20+ cards | Scrolls, no overflow |

---

## Step 8: Write Tests

Ask Claude: "write me a test" (not "test this feature").

Start with:
- Store mutations (add/delete/move task)
- Filter logic (search, status, priority, date range)
- Critical user flows (Playwright e2e)

```bash
# Run tests
npm test

# Run e2e
npx playwright test
```

---

## Step 9: Final Build

```bash
npm run build   # zero warnings
npm start       # test in production mode
```

Re-run Step 3 functional tests against production build.

---

## Video Flow

1. **Open with the question** — "It works. But is it production ready?"
2. **Run Front-End Checklist** — show baseline score (~74%)
3. **Set up CI pipeline** — one YAML file, push, show checks running
4. **Fix the three gaps** — error pages, ESLint, security headers
5. **Re-run checklist** — show score jump to 96%
6. **Run functional tests** — walk through interaction table
7. **Write first test on camera** — "write me a test"
8. **End with** — "Checklist v2 comes after Supabase adds real security surface"

---

## References

- [Front-End Checklist](https://github.com/thedaviddias/Front-End-Checklist) — 72k stars, industry standard
- [vibe-check](https://github.com/benavlabs/vibe-check) — security checklist for vibe-coded apps (used in Supabase video)
- [ai-agent-skills](https://github.com/wednesday-solutions/ai-agent-skills) — code quality + architecture audit skills

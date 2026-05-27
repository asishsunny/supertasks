# Video 2 — Git & GitHub

## What is Git?

Version control for files. Every save (commit) is a snapshot you can go back to — like Figma's version history, but for code.

**Git** = local tool on your machine. Tracks changes, creates history.
**GitHub** = cloud backup + sharing. Like saving your Figma file to the cloud so others can access it.

| Figma | Git |
|-------|-----|
| Version history | Commit log |
| Save to cloud | Push |
| Open shared file | Clone |
| Branching | Branching |
| "Updated 2 hours ago" | Last commit timestamp |

**Why use it:**
- Undo anything — go back to any previous version
- Backup — code lives on GitHub, not just your laptop
- Collaboration — multiple people work on same project
- Deploy — Vercel/Netlify pull from GitHub to go live

---

## 1. Create GitHub Account

Go to [github.com](https://github.com) → Sign up (if you don't have one already).

---

## 2. Generate SSH Key
```bash
ssh-keygen -t ed25519 -C "your@email.com"
# Enter 3 times (default path, no passphrase)
```

## 3. Add Public Key to GitHub
```bash
cat ~/.ssh/id_ed25519.pub
```
Copy output → GitHub → Settings → SSH and GPG keys → New SSH key → paste → Add.

## 4. Create .gitignore
```
node_modules/
.next/
.DS_Store
.env*
*.tsbuildinfo
next-env.d.ts
.vercel
.archive/
.claude/
```

## 5. Init + Commit
```bash
git init
git add -A
git commit -m "shell: layout, store, placeholder pages"
```

## 6. Create Repo on GitHub
GitHub → "+" → New repository → name it → no README, no .gitignore, no license → Create.

## 7. Connect + Push
```bash
git remote add origin git@github.com:USERNAME/REPO.git
git push -u origin main
```

If "Host key verification failed":
```bash
ssh-keyscan github.com >> ~/.ssh/known_hosts
git push -u origin main
```

## Git Hygiene 101

**Commit = local save. Push = cloud sync.**
- Commit after each working change
- Push after a phase is done
- Each push sends all commits since last push — history preserved individually
- Typical ratio: 3-5 commits per push

**One change per commit.**
- Don't mix table fix + new modal in same commit
- Short clear messages: `"add task table"` not `"updated stuff"`

**Check before committing.**
```bash
git status    # what changed?
git diff      # review actual changes
```
Don't blindly `git add -A` — know what you're staging.

**Never commit:**
- `.env` files (secrets, API keys)
- `node_modules/` (reinstall from package.json)
- `.next/` (build output)
- Broken code to main

## Branching & Merging

**Why branch:** Work on something without risking main. If it breaks, delete the branch. Main stays clean.

**Create + switch:**
```bash
git checkout -b feature-name
```

**Do work, commit as usual:**
```bash
git add -A
git commit -m "add kanban drag-drop"
```

**Switch back to main:**
```bash
git checkout main
```

**Merge branch into main:**
```bash
git merge feature-name
```

**Delete branch after merge (cleanup):**
```bash
git branch -d feature-name
```

**When to branch:**
- Experimenting with something risky
- Working on a feature that might take days
- Multiple people working on same repo

**When not to bother:**
- Solo project, linear flow
- Small changes you're confident about
- Just commit to main

**SSH key per device.**
- One key pair per machine
- Lose a device → delete that key from GitHub → others unaffected

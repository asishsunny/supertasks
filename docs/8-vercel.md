# Video 8 — Vercel

## What This Step Does

Deploy the app to production. One click from GitHub repo to live URL.

---

## Step 1: Push Latest to GitHub

Make sure everything is committed and pushed:

```bash
git status
git add .
git commit -m "ready for deploy"
git push origin main
```

---

## Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) → Sign up / Log in (use GitHub account)
2. Click **Add New → Project**
3. Import your `supertasks` GitHub repo
4. Vercel auto-detects Next.js

---

## Step 3: Configure Project

Vercel settings:

| Setting | Value |
|---------|-------|
| Framework | Next.js (auto-detected) |
| Root Directory | `app` |
| Build Command | `npm run build` (default) |
| Output Directory | `.next` (default) |

**Root Directory is important** — our Next.js app lives in `app/`, not project root.

---

## Step 4: Environment Variables

Add Supabase env vars in Vercel dashboard:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `your-anon-key` |

Settings → Environment Variables → Add each one.

---

## Step 5: Deploy

Click **Deploy**. Vercel will:

1. Clone repo
2. Install dependencies
3. Run `npm run build`
4. Deploy to edge network

Takes ~1-2 minutes. You get a live URL like `supertasks-xyz.vercel.app`.

---

## Step 6: Custom Domain (Optional)

1. Settings → Domains
2. Add your domain
3. Update DNS records as instructed
4. SSL auto-provisions

---

## Step 7: Verify Production

| Test | Expected |
|------|----------|
| Visit live URL | App loads correctly |
| All pages navigate | Routing works |
| Add/edit/delete task | Supabase mutations work |
| Dark mode | Toggles correctly |
| Mobile view | Responsive layout |
| Share URL with someone | They can access it |

---

## Step 8: Auto-Deploy

From now on:

```
git push origin main → Vercel auto-deploys
```

Every push to main triggers a new deployment. Preview deployments for branches too.

---

## Workflow After Deploy

```
Code change → git commit → git push → Vercel auto-deploys → live in ~60s
```

No manual deploy needed. Ever.

---

## Commit

```bash
git commit -m "docs: add deployment notes"
git push origin main
```

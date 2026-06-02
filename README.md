# LearnOS — Next-Gen Student Dashboard

A high-fidelity, animated learning dashboard built with Next.js 14 App Router, Supabase, Tailwind CSS, and Framer Motion.

---

## Live Demo

> Deploy to Vercel and paste your URL here.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Database | Supabase (PostgreSQL) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Icons | Lucide React |
| Language | TypeScript |

---

## Architecture Decisions

### Server / Client Component Split

The data-fetching boundary is kept as far "up the tree" as possible, with only the minimum necessary code shipped to the browser:

- **`src/app/page.tsx`** — Server Component. Renders the shell layout and wraps `DashboardContent` in a `<Suspense>` boundary.
- **`DashboardContent` (inside page.tsx)** — Also a Server Component (async function). It calls `fetchCourses()` directly using the Supabase server client (`@supabase/supabase-js` with `persistSession: false`). This means the DB query runs entirely on the server; no credentials are ever sent to the browser.
- **`BentoGrid`** — Client Component (`"use client"`). Receives the already-fetched `courses` array as props, orchestrates Framer Motion stagger animations.
- **`Sidebar`, `MobileNav`, `CourseCard`, `ActivityTile`, etc.** — All Client Components, as they require interactivity (hover states, click handlers, in-view animations).

### Why `@supabase/supabase-js` over `@supabase/ssr`?

For a simple read-only RSC fetch without cookie-based auth sessions, the plain `supabase-js` client with `persistSession: false` is cleaner and avoids the `cookies()` Next.js API needed by `@supabase/ssr`. If you add user authentication, swap to `@supabase/ssr` for proper cookie handling.

### Zero Layout Shifts

All Framer Motion animations use only `opacity`, `scale`, and `y` (transform). No `width`, `height`, `top`, `left`, or margin changes — so the browser never triggers layout/reflow during animations.

### Staggered Entrance

`BentoGrid` uses Framer Motion's `variants` with `staggerChildren: 0.1`. Each tile has a shared `tileVariants` that fades in while translating from `y: 24` to `y: 0` using spring physics.

### Sidebar Layout Animation

The active nav item uses `layoutId="sidebar-active"` — Framer Motion automatically animates the background highlight between items using its FLIP technique.

---

## Supabase Setup

### 1. Create a Project

Sign up at [supabase.com](https://supabase.com) and create a new project.

### 2. Create the `courses` Table

Run this SQL in the Supabase SQL editor:

```sql
CREATE TABLE courses (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title       text        NOT NULL,
  progress    integer     NOT NULL CHECK (progress >= 0 AND progress <= 100),
  icon_name   text        NOT NULL DEFAULT 'BookOpen',
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- Enable Row Level Security (recommended)
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for the anon key)
CREATE POLICY "Public read access"
  ON courses FOR SELECT
  USING (true);
```

### 3. Seed Data

```sql
INSERT INTO courses (title, progress, icon_name) VALUES
  ('Advanced React Patterns',  75, 'Layers'),
  ('TypeScript Deep Dive',     45, 'Code2'),
  ('System Design Mastery',    60, 'Network'),
  ('Next.js & App Router',     30, 'Zap');
```

### 4. Get Your Keys

In your Supabase project: **Settings → API**

- `NEXT_PUBLIC_SUPABASE_URL` → Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` → `anon` / `public` key
- `SUPABASE_SERVICE_ROLE_KEY` → `service_role` key (**server-only, never expose**)

---

## Local Development

```bash
# 1. Clone the repo
git clone https://github.com/your-username/learning-dashboard.git
cd learning-dashboard

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Then edit .env.local with your Supabase credentials

# 4. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **No Supabase credentials?** The app ships with demo fallback data — it works out of the box without any `.env.local` configuration.

---

## Deployment (Vercel)

1. Push your repo to GitHub (ensure `.env` is in `.gitignore`).
2. Import the project into [Vercel](https://vercel.com).
3. Add environment variables in **Vercel → Project Settings → Environment Variables**.
4. Deploy. Done.

---

## Challenges & Solutions

| Challenge | Solution |
|---|---|
| Dynamic Lucide icon rendering from a DB string | Cast `lucide-react` namespace as a typed Record and look up by `icon_name` key with a `BookOpen` fallback |
| Progress bar animating from 0→value without triggering layout shift | Used Framer Motion `width` animation on an absolutely-positioned inner div inside a fixed-height container |
| Sidebar collapse without content flash | `AnimatePresence` with `exit` animations ensures text fades out before the sidebar narrows |
| Supabase env not set in preview | Added a demo-data fallback in `fetchCourses()` that returns mock data when env vars are missing or contain placeholder values |
| Skeleton shimmer without JS | Pure CSS `@keyframes shimmer` on a gradient `background-position` — zero JS overhead |

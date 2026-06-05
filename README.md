# TrailMates

A premium social platform for Indian trekkers — discover trails, find trek buddies, lend gear, and share mountain stories.

**Live:** Deploy on [Vercel](https://vercel.com) (see [Deploy](#deploy-to-vercel))

**Repo:** [github.com/MannyG3/TrekMates](https://github.com/MannyG3/TrekMates)

---

## Features

- **Trail feed** — Infinite-scroll posts from trekkers with region filters
- **Trail explorer** — Browse routes across Uttarakhand, Himachal, Karnataka, and more
- **Buddy finder** — Post a trek or join open requests ("I'm in")
- **Forum** — Region-based discussions on conditions, permits, and local tips
- **Gear lending** — Borrow tents, poles, and sleeping bags from fellow trekkers
- **Profiles** — Trek history, achievements, and follower stats

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS (dark alpine design system) |
| Auth & DB | Supabase (Auth, PostgreSQL, RLS) |
| Animation | Framer Motion |
| Icons | Lucide React |
| Hosting | Vercel |

## Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project (free tier works)
- A [Vercel](https://vercel.com) account for deployment

## Local development

### 1. Clone and install

```bash
git clone https://github.com/MannyG3/TrekMates.git
cd TrekMates
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com/dashboard](https://supabase.com/dashboard)
2. Open **SQL Editor** and run the migration:

   ```
   supabase/migrations/001_initial_schema.sql
   ```

   This creates all tables, RLS policies, indexes, and seeds 6 Indian trekking routes.

3. Under **Authentication → URL Configuration**, add:
   - Site URL: `http://localhost:3000`
   - Redirect URLs: `http://localhost:3000/**`

### 3. Environment variables

Copy the example file and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Find these in Supabase → **Project Settings → API**.

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

### Option A — GitHub import (recommended)

1. Push this repo to GitHub (already at [MannyG3/TrekMates](https://github.com/MannyG3/TrekMates))
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import **MannyG3/TrekMates**
4. Add environment variables:

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |

5. Click **Deploy**

6. In Supabase → **Authentication → URL Configuration**, add your Vercel URL:
   - Site URL: `https://your-app.vercel.app`
   - Redirect URLs: `https://your-app.vercel.app/**`

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel login
vercel link
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel --prod
```

## Project structure

```
app/
  (auth)/login, signup          # Auth pages
  (app)/feed, trails, buddy…    # Logged-in app shell
  page.tsx                      # Landing page
components/
  ui/                           # Button, Card, Avatar, etc.
  trail/, buddy/, feed/, forum/  # Feature components
lib/supabase/                   # Browser + server clients
supabase/migrations/            # SQL schema
types/                          # TypeScript types
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Design system

Dark alpine editorial theme:

- **Background:** `night-950` (#0D1117)
- **Accent:** `sage-500` (#7EC8A4)
- **Typography:** Cormorant Garamond (headings), Inter (body), JetBrains Mono (stats)
- **Difficulty colors:** easy → expert (green through red)

## License

MIT

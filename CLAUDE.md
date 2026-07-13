# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev          # start dev server (Turbopack)
npm run build         # production build
npm run lint          # eslint (flat config, eslint.config.mjs)
npx tsc --noEmit       # type-check

npm run db:generate    # generate Drizzle migrations from src/db/schema.ts
npm run db:push        # push schema directly to the Supabase Postgres DB
npm run db:migrate     # run migrations
npm run db:studio      # open Drizzle Studio
```

There is no test suite configured in this repo yet.

## Architecture

This is a Next.js 16 App Router project (TypeScript, Tailwind v4). Per `AGENTS.md`, this Next.js version has behavior that diverges from training data — check `node_modules/next/dist/docs/` before relying on prior knowledge of Next.js APIs/conventions.

**Product context**: `QuantBridge_PRD_1.md` (Korean) is the source of truth for what this project is — a portfolio project that reframes a BD/GTM signup flow as an enterprise CRM/RevOps system. It defines the landing page, Account lifecycle (Onboarding → Active Engagement → At-Risk → Churned), Account Health Score, and Operational KPI dashboard that later sessions will build. Read it before making product/feature decisions.

**Data layer** — two separate clients exist for two separate purposes:
- `src/db/index.ts` + `src/db/schema.ts`: Drizzle ORM over `postgres-js`, talking directly to the Supabase Postgres instance via `DATABASE_URL`. This is the primary way app code reads/writes `accounts` and `account_logs`.
- `src/lib/supabase.ts`: `@supabase/supabase-js` client using `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`, for Supabase platform features (auth, storage, realtime) rather than plain data queries.
- `src/lib/resend.ts`: Resend client for transactional email (e.g. welcome emails on signup).

Schema (`src/db/schema.ts`) mirrors the PRD's DB design: `accounts` (name, email, country, background, `lifecycleStage`, `healthScore`, UTM fields, `lastActiveAt`) and `account_logs` (CSM-style history log entries per account, FK to `accounts`).

Required env vars (see `.env.example`, actual values go in untracked `.env.local`): `DATABASE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`.

**Landing page** (`src/app/page.tsx`) is composed from section components in `src/components/landing/` (`navbar`, `hero`, `features`, `how-it-works`, `signup-form`, `footer`) — each section is a standalone component assembled in page order. The signup form currently renders fields only (no submit handler / server action wired up yet).

**Styling**: `src/app/globals.css` defines the design tokens (`--background`, `--surface`, `--surface-hover`, `--border`, `--foreground`, `--muted`, `--accent`, `--accent-foreground`, `--accent-soft`) and exposes them to Tailwind via `@theme inline` as `bg-background`, `bg-surface`, `text-muted`, `text-accent`, etc. The site uses a fixed dark theme (not `prefers-color-scheme`-driven) — add new UI using these existing tokens rather than introducing new colors.

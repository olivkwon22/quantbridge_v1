# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Monorepo layout

npm workspaces, two Next.js 16 apps sharing internal packages:

```
apps/
  landing/   # public marketing site + signup form (quantbridge-landing, port 3000)
  admin/     # internal CRM for managing leads (quantbridge-admin, port 3001)
packages/
  db/        # @quantbridge/db — Drizzle schema, client, drizzle.config, migrations
  ui/        # @quantbridge/ui — shared Tailwind v4 design tokens (tokens.css)
```

Each app has its own `next.config.ts`, `package.json`, `tsconfig.json` (extending root `tsconfig.base.json`). `.env.local` lives only at the **repo root** — each app's `next.config.ts` loads it via `@next/env`'s `loadEnvConfig()` pointed at the monorepo root, since Next.js normally scopes env loading to the app's own directory.

## Commands

```bash
npm install                 # installs and links all workspaces (run from repo root)

npm run dev:landing         # start landing dev server on :3000 (Turbopack)
npm run dev:admin           # start admin dev server on :3001 (Turbopack)
npm run build                # production build, both apps
npm run lint                 # eslint, both apps (flat config, eslint.config.mjs per app)
npx tsc --noEmit              # type-check (run per app/package, each has its own tsconfig.json)

npm run db:generate           # generate Drizzle migrations from packages/db/src/schema.ts
npm run db:push               # push schema directly to the Supabase Postgres DB
npm run db:migrate            # run migrations
npm run db:studio             # open Drizzle Studio
```

Run landing and admin dev servers in two separate terminals — there's no combined `npm run dev`.

There is no test suite configured in this repo yet.

## Architecture

This is a Next.js 16 App Router monorepo (TypeScript, Tailwind v4). Per `AGENTS.md`, this Next.js version has behavior that diverges from training data — check `node_modules/next/dist/docs/` before relying on prior knowledge of Next.js APIs/conventions. **Notably**: `middleware.ts` was renamed to `proxy.ts` in Next.js 16 (function renamed `middleware` → `proxy`, runtime forced to `nodejs`) — `apps/admin/src/proxy.ts` uses this convention, not the pre-16 one. It lives under `src/` (not the app root) because the convention requires it sit alongside `app/`, and this project's `app/` is at `src/app/`.

**Product context**: `QuantBridge_PRD_1.md` (Korean) is the source of truth for what this project is — a portfolio project that reframes a BD/GTM signup flow as an enterprise CRM/RevOps system. It defines the landing page, Account lifecycle (Onboarding → Active Engagement → At-Risk → Churned), Account Health Score, and Operational KPI dashboard. The admin app (`apps/admin`) is the CRM surface for that lifecycle data.

**Data layer** — `packages/db` is the single Drizzle/Postgres client shared by both apps:
- `packages/db/src/index.ts` + `src/schema.ts`: Drizzle ORM over `postgres-js`, talking directly to the Supabase Postgres instance via `DATABASE_URL`. Imported as `@quantbridge/db` (client) and `@quantbridge/db/schema` (tables).
- Schema mirrors the PRD's DB design: `accounts` (name, email, country, background, `lifecycleStage`, `healthScore`, UTM fields, `lastActiveAt`), `account_logs` (CSM-style history log entries per account, FK to `accounts`), and `admin_users` (email + `password_hash`, for admin login — see Auth below).

**Auth** — admin login is custom, backed directly by Drizzle/Postgres rather than Supabase Auth:
- `apps/admin/src/lib/password.ts`: `node:crypto` scrypt password hashing (`hashPassword`/`verifyPassword`), no external auth library.
- `apps/admin/src/lib/session.ts`: signs a `{ adminId, expiresAt }` payload with HMAC-SHA256 (`SESSION_SECRET`) into an httpOnly cookie. `createSession`/`getSession`/`deleteSession` for Server Components/Actions (via `next/headers` cookies), and `getSessionFromRequest` for `proxy.ts` (reads `NextRequest` cookies directly, no async cookies API).
- `apps/admin/src/proxy.ts` gates all routes except `/login`, redirecting based on `getSessionFromRequest`.
- `apps/admin/src/app/login/actions.ts` looks up `adminUsers` by email and verifies the password hash; on success calls `createSession(admin.id)`.
- Admin users are provisioned by inserting directly into `admin_users` (email + `hashPassword(password)`) — there's no self-serve signup or Studio UI for this table (it's a plain app table, not Supabase Auth's `auth.users`).

`apps/landing/src/lib/resend.ts`: Resend client for transactional email. `apps/landing/src/lib/notify-new-lead.ts` uses it to email an admin notification (recipient via `ADMIN_NOTIFICATION_EMAIL`, falls back to a hardcoded address) whenever `actions.ts`'s `submitSignup` saves a new lead — fire-and-forget, failures are logged, not surfaced to the submitter.

Required env vars (see root `.env.example`, actual values go in untracked root `.env.local`): `DATABASE_URL`, `SESSION_SECRET` (any random string, e.g. `openssl rand -base64 32`), `RESEND_API_KEY`, and optionally `ADMIN_NOTIFICATION_EMAIL` (defaults to a hardcoded address in `notify-new-lead.ts` if unset). `NEXT_PUBLIC_SUPABASE_*`/`SUPABASE_SERVICE_ROLE_KEY` are no longer used by app code (Supabase is only the Postgres host here) but are left as optional placeholders in `.env.example` in case Supabase platform features (storage, realtime) are wanted later.

**Landing page** (`apps/landing/src/app/page.tsx`) is composed from section components in `src/components/landing/` (`navbar`, `hero`, `features`, `how-it-works`, `signup-form`, `footer`). The signup form (`src/app/actions.ts`) writes directly to `accounts` via `@quantbridge/db`.

**Admin app** (`apps/admin`) is gated by `src/proxy.ts` (redirects unauthenticated requests to `/login`). `src/app/page.tsx` lists leads (`accounts` rows); `src/app/leads/[id]/page.tsx` is the edit/delete view, backed by server actions in the adjacent `actions.ts`.

**Styling**: `packages/ui/src/tokens.css` defines the design tokens (`--background`, `--surface`, `--surface-hover`, `--border`, `--foreground`, `--muted`, `--accent`, `--accent-foreground`, `--accent-soft`) and exposes them to Tailwind via `@theme inline` as `bg-background`, `bg-surface`, `text-muted`, `text-accent`, etc. Both apps' `globals.css` import it (`@import "@quantbridge/ui/tokens.css";`) after `@import "tailwindcss";`. The site uses a fixed dark theme (not `prefers-color-scheme`-driven) — add new UI using these existing tokens rather than introducing new colors.

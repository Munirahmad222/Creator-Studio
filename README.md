# Creator Platform

A free-first international creator platform foundation for web/PWA and future Capacitor Android/iOS clients. This repository currently contains the **Phase 1 foundation only**; authentication, creator tools, video editing, marketplace workflows and live integrations are not implemented yet.

## Stack

- React + TypeScript + Vite + Tailwind CSS
- Cloudflare Worker API and static web assets deployed together from the root `wrangler.toml`
- Cloudflare D1 migrations are included but no D1 database is bound yet
- Shared TypeScript configuration, i18n primitives and UI components
- Node's built-in test runner for foundation tests

## Requirements

- Node.js 20 or newer and npm 10 or compatible
- Cloudflare account for deployment
- No paid AI API is required by this foundation

## Local setup

```sh
npm install
npm run test
npm run typecheck
npm run build
npm run dev
```

The web app runs with Vite. The API/Worker can be tested locally with:

```sh
npm run dev --workspace @creator-platform/api
```

## Cloudflare deployment

The root `wrangler.toml` deploys the built web assets and Worker together. In the Cloudflare build settings use:

- Build command: `npm run build`
- Deploy command: `npm run deploy`
- Build output directory is managed by Wrangler from `apps/web/dist`

The API health endpoint is `/api/health`. Instagram remains in demo mode and is never reported as connected.

## Database migrations

SQL migrations are in `database/migrations/`. Before adding database-dependent features, create a **new, separate** Cloudflare D1 database for this project and configure the `DB` binding in the root `wrangler.toml` with the real database ID. Do not bind this project to another project's database.

Example local migration command after configuring Wrangler/D1:

```sh
npx wrangler d1 execute creator-platform-db --local --file=database/migrations/0001_foundation.sql
```

## Mobile

Capacitor configuration is reserved for a later integration step; native Android/iOS builds have not been generated or tested. Android builds require Android Studio/SDK. iOS builds require macOS and Xcode.

## Security and secrets

- `.env.example` contains placeholders only.
- Never commit `.env`, `.dev.vars`, OAuth secrets or real user data.
- Instagram integration is not connected; future work must use official Meta APIs and an explicit demo state until approved.
- Review privacy policy and terms placeholders before any public launch.

## Phase boundary

This deliverable covers the Phase 1 foundation only. Phase 2 features should be implemented only with the project owner's explicit approval.

# Creator Platform

A standalone, free-first international creator platform for web/PWA and future Capacitor Android/iOS clients. The current repository is **Phase 1 foundation only**; authentication, creator tools, video editing, marketplace workflows and live integrations are not implemented yet.

## Stack

- React + TypeScript + Vite + Tailwind CSS
- Cloudflare Workers API (separate app)
- Cloudflare D1 with versioned SQL migrations
- Shared TypeScript configuration, i18n primitives and UI components
- Node's built-in test runner for dependency-light foundation tests

## Requirements

- Node.js 20 or newer and npm 10 or compatible
- Cloudflare account only when deploying; no credentials needed for local frontend preview

## Local setup

```sh
npm install
npm run test
npm run typecheck
npm run build
npm run dev
```

If package installation cannot reach the npm registry, retry from a network-enabled terminal. No paid API is required by this foundation.

## Database migrations

SQL migrations are in `database/migrations/`. Apply locally after configuring Wrangler/D1:

```sh
npx wrangler d1 execute creator-platform-db --local --file=database/migrations/0001_foundation.sql
```

The database name above is a proposed local binding name, not a provisioned remote database. Create a **new, separate** D1 database before remote deployment and update `apps/api/wrangler.toml` with its actual ID. Never point this project at another project's database.

## API local development

```sh
npm run dev --workspace @creator-platform/api
```

The Worker currently exposes a health endpoint only. It is not a production authentication API.

## Mobile

Capacitor configuration is reserved for a later integration step; Phase 1 does not claim that native Android/iOS builds have been configured or tested. Android builds require Android Studio/SDK. iOS builds require macOS and Xcode.

## Security and secrets

- `.env.example` contains placeholders only.
- Never commit `.env`, `.dev.vars`, OAuth secrets or real user data.
- Instagram integration is not connected; future work must use official Meta APIs and an explicit demo state until approved.
- Review privacy policy and terms placeholders before any public launch.

## Phase boundary

This deliverable covers the Phase 1 foundation only. Do not implement Phase 2 authentication until the project owner explicitly approves it.

# Basestack Flags Demos

Interactive demo project showing how to use `@basestack/flags-react` in a Next.js App Router app with OpenNext deployment to Cloudflare Workers.

## What This Project Demonstrates

- Server-side flag preloading with `fetchFlags` in the root layout.
- Client-side flag consumption with `useFlag`.
- Feature preview modal (`openPreviewModal`) and feedback modal (`openFeedbackModal`).
- Runtime checks through:
  - a Server Action (`runHeaderPolicyAction`)
  - a Route Handler (`/api/route-handler-demo`)
- Cloudflare-ready build, preview, upload, and deploy scripts via OpenNext.

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- `@basestack/flags-react`
- OpenNext Cloudflare (`@opennextjs/cloudflare`)
- Vitest + Testing Library
- Biome (lint/format)

## Prerequisites

- Node.js `>= 20`
- Bun (the repo uses `bun.lock` and `packageManager: bun@1.3.13`)
- A Basestack project/environment with valid API credentials
- Cloudflare account + Wrangler auth for preview/deploy workflows

## Environment Variables

Create a local env file (for example `.env.local`) with:

```bash
NEXT_PUBLIC_BASE_URL=""
NEXT_PUBLIC_PROJECT_KEY=""
NEXT_PUBLIC_ENVIRONMENT_KEY=""
```

These are required by `src/libs/feature-flags/config.ts`.

## Install

```bash
bun install
```

## Run Locally (Next.js Dev Server)

```bash
bun run dev
```

App runs at [http://localhost:3000](http://localhost:3000).

## Demo Flag Slugs Used in UI

- `stats_grid` - controls the stats cards section.
- `initiative_overview` - controls expanded initiative list and feedback action.
- `preview_notes` - controls the preview notes panel.
- `header` - used by the server action policy check.

## Runtime Demo Endpoints

- Server Action: `src/app/actions/runtime-demo-actions.ts`
- Route Handler: `GET /api/route-handler-demo`

The route returns current flag status and metadata for `stats_grid`.

## Scripts

- `bun run dev` - start local Next.js dev server
- `bun run build` - Next.js production build
- `bun run start` - serve production build locally
- `bun run test` - run Vitest with coverage
- `bun run test:watch` - run Vitest in watch mode
- `bun run lint` - Biome lint
- `bun run lint:fix` - Biome lint with fixes
- `bun run format` - Biome format
- `bun run check` - Biome check with writes
- `bun run cf-typegen` - regenerate `cloudflare-env.d.ts`
- `bun run preview` - OpenNext Cloudflare local preview
- `bun run upload` - OpenNext Cloudflare upload
- `bun run deploy` - OpenNext Cloudflare deploy

## Cloudflare Preview and Deploy

Preview the Worker runtime locally:

```bash
bun run preview
```

Deploy to Cloudflare:

```bash
bun run deploy
```

The worker configuration is in `wrangler.jsonc` and OpenNext config is in `open-next.config.ts`.

## Testing

Run the full test suite:

```bash
bun run test
```

Component and runtime behavior are covered in:

- `src/components/home/__tests__`
- `src/app/actions/__tests__`
- `src/app/api/route-handler-demo/__tests__`

## License

[MIT](./LICENSE)

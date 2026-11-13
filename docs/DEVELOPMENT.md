# Development Guide

## Runtime and package manager

The project uses Next.js 15.2.4, React 18.3.1, TypeScript 5.8.3, Tailwind CSS 3.4.17, and pnpm 10.6.5. CI uses Node.js 22. The repository includes `pnpm-lock.yaml`; maintain that lockfile and use frozen installs.

## Setup

```bash
corepack enable
corepack prepare pnpm@10.6.5 --activate
pnpm install --frozen-lockfile
```

## Development server

```bash
pnpm dev
```

Open <http://localhost:3000/>. Next.js handles hot reload.

## Commands

```bash
pnpm typecheck
pnpm test
pnpm build
pnpm start
```

- `typecheck` runs `tsc --noEmit`.
- `test` runs repository-contract checks using Node's built-in test runner.
- `build` creates the production build.
- `start` serves the compiled application.

There is no established ESLint dependency/configuration in the current repository. A lint script that cannot be reliably run should not be treated as a quality gate.

## Directory conventions

| Path | Responsibility |
| --- | --- |
| `app/` | Next App Router pages, layouts and error/loading states |
| `components/` | Feature components and local UI wrappers |
| `components/ui/` | Reusable Radix-based primitives |
| `hooks/` | Shared client hooks |
| `lib/` | Types, utilities and mock fixtures |
| `public/` | Static imagery and placeholders |
| `styles/` and `app/globals.css` | Global CSS and tokens |
| `docs/` | Architecture, contracts, security and operations |
| `tests/` | Source-level prototype-boundary tests |

## Client and server component practices

Use client components when browser APIs, React state, hooks or event handlers are required. Keep static layout and metadata in server components where possible. Do not use local storage or client props to make security decisions.

## Working with fixtures

Keep mock data clearly labelled and synthetic. Component-local state is temporary. Do not add real employee names, private documents, account data or real permissions to `lib/mock-data.ts`.

## Validation

Run typecheck, tests and build. Inspect affected routes on desktop and mobile widths, check keyboard/focus behaviour, test empty/loading states, and review browser console/network output.

Any change involving identity, permissions, files, storage or data collection must update the related architecture, threat model and privacy documentation.

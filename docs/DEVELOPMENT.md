# Development Guide

## Requirements
- Node.js compatible with Next.js 15.
- pnpm 10.6.5, as declared by the package manager field.

## Install and run
```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Open <http://localhost:3000/>.

## Commands
| Command | Purpose |
| --- | --- |
| `pnpm dev` | Development server |
| `pnpm build` | Production build |
| `pnpm start` | Production server |
| `pnpm lint` | Configured lint command; verify compatibility with Next.js 15 |

## Conventions
- App Router routes belong in `app/`.
- Reusable feature components belong in `components/`.
- Shared primitives belong in `components/ui/`.
- Shared types and mock fixtures belong in `lib/`.
- Keep mock fixtures clearly labeled as demo data.

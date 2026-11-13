# Contributing

## Current project boundary
This repository is currently a UI prototype backed by mock data. Do not describe frontend-only role checks or dialogs as secure authorization or real file storage.

## Setup
```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

## Guidelines
- Follow the existing Next.js App Router and TypeScript structure.
- Keep feature components in `components/` and shared UI primitives in `components/ui/`.
- Keep types and mock fixtures in `lib/`.
- Avoid introducing a second package manager or lockfile.
- Do not commit real files, credentials, private user data, or generated build output.
- For backend integration, document the API contract and server-side authorization requirements before connecting UI actions.

## Validation
```bash
pnpm install --frozen-lockfile
pnpm build
```
Run the lint command only after confirming the configured script works with the installed Next.js CLI. Include failures and warnings in the pull request.

## Pull requests
Explain the user-facing change, affected routes, validation performed, and whether any security boundary or data contract changed. Add screenshots for visual changes.

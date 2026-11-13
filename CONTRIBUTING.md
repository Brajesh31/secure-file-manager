# Contributing

Thank you for contributing. The current repository is a UI prototype backed by local fixtures. Be precise about what is implemented and do not turn presentation controls into claims of secure backend behaviour.

## Development setup

Use Node.js 22, Corepack and pnpm 10.6.5:

```bash
corepack enable
corepack prepare pnpm@10.6.5 --activate
pnpm install --frozen-lockfile
pnpm dev
```

## Repository layout

- `app/`: Next.js App Router routes and layouts.
- `components/`: feature components and UI wrappers.
- `components/ui/`: Radix-based presentation primitives.
- `hooks/`: shared React hooks.
- `lib/`: types, helpers and fixture data.
- `public/`: static assets.
- `docs/`: detailed technical documentation.
- `tests/`: repository-contract tests.

## Engineering guidelines

- Preserve strict TypeScript checks.
- Keep fixtures separate from future data access.
- Use clear types and validate inputs at service boundaries.
- Keep browser-local state clearly labelled as demo state.
- Do not trust local storage, hidden controls, props or client route checks for authorization.
- Do not show success until a real service confirms a mutation.
- Never add real documents, credentials, user records or production exports.
- Do not place privileged secrets in browser-side code or `NEXT_PUBLIC_` variables.
- Use accessible labels, focus states and keyboard-operable controls.
- Verify licenses and optimize large assets.
- Maintain pnpm and the existing lockfile. Do not introduce another package manager or lockfile.

## Validation

```bash
pnpm install --frozen-lockfile
pnpm typecheck
pnpm test
pnpm build
```

Also test affected screens in a browser at mobile and desktop widths and check keyboard interactions and console errors.

## Security-impacting work

Any change involving identity, file metadata, permission, upload, preview, download, sharing or deletion must:
- describe the trust boundary and data flow;
- define server-side authorization;
- include allowed and denied test cases;
- cover validation, error and privacy behaviour;
- update the threat model and security review.

Do not connect a client component directly to a privileged database or storage key.

## Pull requests

Describe the problem, exact files/routes affected, implementation, tests, limitations and security/privacy impact. Include screenshots for visual changes using only synthetic data.

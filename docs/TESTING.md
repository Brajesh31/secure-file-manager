# Testing Strategy

## Current validation layers

The repository uses:
1. TypeScript compiler validation via `pnpm typecheck`.
2. Node.js built-in `node:test` source-contract checks via `pnpm test`.
3. Next.js production compilation via `pnpm build`.

The contract tests are not browser end-to-end tests. They record and guard the currently documented mock-only boundary. They do not prove real authentication, storage, authorization or file operations work.

## Run checks

```bash
pnpm install --frozen-lockfile
pnpm typecheck
pnpm test
pnpm build
```

## Contract checks cover

- no current App Router API handler for file operations;
- demo login writes a role to local storage;
- the dashboard layout reads browser-controlled role state;
- upload uses a delay and does not submit file bytes;
- page data comes from mock fixtures;
- preview renders placeholder content rather than fetching file content;
- analytics include hard-coded/sample presentation values;
- product copy explicitly labels the current demo boundary;
- package scripts and environment-file ignore rules are present.

When the project adds an actual backend, replace these source assertions with tests for the real API behaviour rather than deleting all boundary checks.

## Manual UI checks

- Visit every route listed in [ROUTES.md](ROUTES.md).
- Test both light and dark themes.
- Test tabs, dialogs, dropdowns, search fields and sidebar collapse.
- Verify mobile and desktop widths, including 200% zoom.
- Check visible focus, keyboard order, dialog focus return and accessible names.
- Verify no false success state claims a file was uploaded or permission persisted.
- Check the browser console and network panel.
- Use only synthetic fixture data.

## Production tests still required

Identity lifecycle, session expiry/revocation, object authorization, cross-tenant isolation, upload validation, scanning state, signed URL scope/expiry, unsafe content preview, rate limits, CSRF, audit trail integrity, deletion, retention, backup and restore.

Security testing must include negative cases. Hiding a button does not prove a user cannot call the corresponding API.

# Troubleshooting

## Install or lockfile error

Activate the package-manager version declared in `package.json`:

```bash
corepack enable
corepack prepare pnpm@10.6.5 --activate
pnpm install --frozen-lockfile
```

Do not delete the lockfile to bypass dependency resolution. Reconcile manifest and lockfile changes intentionally.

## TypeScript errors

Run:

```bash
pnpm typecheck
```

The compiler runs with strict mode enabled. Fix type errors instead of suppressing them through Next config.

## Build errors

Run `pnpm build` locally after a frozen install. Review the first reported error rather than assuming all subsequent messages are independent. Build-time type checking is now enabled; the explicit typecheck step is also part of CI.

## Login redirects or role not retained

The current role is stored in `localStorage.userRole`. The dashboard layout redirects to `/` when the key is absent. The demo login writes the selected role after a timer. This is a presentation mechanism, not a user session.

## Admin routes redirect

Upload, manage-users and analytics screens compare the stored role string to `admin`. A local value can be edited by a visitor. Never protect a real API or file operation using this check alone.

## Selected file does not appear in dashboard

The upload screen is a UI simulation. It does not send file bytes or create a file record. Navigation to the dashboard after a timer is not upload confirmation.

## Permissions disappear

User, folder and file assignment dialogs use local React state and callbacks. No database persistence exists. Changes are lost when state resets or pages reload.

## Preview is not the actual document

The preview dialog renders placeholders selected by file type. No storage URL or file content is retrieved.

## Dashboard counts appear inconsistent

The records are fixture data, and the regular-user filters use a literal ID check that does not match the fixture IDs. Analytics also contain hard-coded values.

## Background image slows initial load

The tracked `public/images/background.jpg` is approximately 16.8 MB. Compress and resize it for its rendered dimensions and check the build output.

## CI fails

Run the same commands as CI:

```bash
pnpm typecheck
pnpm test
pnpm build
```

Verify Node.js 22 and pnpm 10.6.5. Inspect the first failed step and share sanitized output only. Never include credentials or private documents in issue reports.

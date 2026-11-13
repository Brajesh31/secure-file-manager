# Deployment

The project can be built with Next.js, but a successful build does not make the current mock file manager safe for real users or confidential data.

## Build
```bash
corepack enable
pnpm install --frozen-lockfile
pnpm build
pnpm start
```

## Before a public demo
- Configure the intended hosting platform and Node.js runtime.
- Verify all routes and responsive layouts.
- Confirm no secrets or private sample documents are included.
- Review security headers and error handling.

## Before production file handling
Do not launch real file operations until server-side authentication, authorization, private object storage, file validation/scanning, secure downloads, audit logging, retention, and recovery have been implemented and tested. See [SECURITY.md](SECURITY.md).

# Deployment Guide

## Deployment classification

The application may be deployed as a visual dashboard demonstration. It is not a production document vault and must not be used to store confidential or personal files.

A successful Next.js build proves only that the UI compiles. It does not create authentication, authorization, storage, encryption, or secure sharing.

## Build and validate

```bash
corepack enable
corepack prepare pnpm@10.6.5 --activate
pnpm install --frozen-lockfile
pnpm typecheck
pnpm test
pnpm build
pnpm start
```

## Hosting requirements

- Node.js 22 runtime.
- Install with the pinned pnpm version and frozen lockfile.
- Build from repository root.
- Serve over HTTPS.
- Configure platform health checks, logs, limits and rollback.
- Verify static assets, including the large background image, load correctly.

## Environment variables

The current repository does not require application-specific environment secrets or object-storage credentials. Never commit a populated `.env` file. If backend services are introduced, define each variable, purpose, required/optional status, environment scope and rotation procedure. Do not expose secrets using `NEXT_PUBLIC_` variable names.

## Preview deployments

The demo role selector can display admin screens to anyone able to manipulate local storage. A preview URL is suitable only as a prototype demonstration. Keep the security warning visible and do not connect it to real private services.

## Production blockers

Before handling real documents, implement and review:
- identity provider and server-side sessions;
- object-level authorization and tenant isolation;
- database-backed metadata and permissions;
- private object storage and safe upload/scan pipeline;
- safe preview and download delivery;
- encryption/key management;
- audit logging and monitoring;
- privacy/retention/deletion;
- backup/restore and incident response.

The full gate is described in [SECURITY.md](SECURITY.md), [AUTHENTICATION-AUTHORIZATION.md](AUTHENTICATION-AUTHORIZATION.md), and [UPLOAD-AND-STORAGE.md](UPLOAD-AND-STORAGE.md).

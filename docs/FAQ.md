# Frequently Asked Questions

## Is this a working secure file manager?

No. It is a Next.js dashboard UI prototype. It does not implement real storage, identity, server-side authorization or encryption.

## Does the login check my password?

No. The email/password inputs are presentation-only. The selected demo role is written to browser local storage.

## Can I upload a file?

You can select a local file in the UI, but submission only simulates a delay and navigation. The file bytes are not sent to a server or persisted.

## Are file previews real?

No. Preview dialogs render placeholder content based on the file category.

## Are permissions saved?

No. Permission dialogs and user assignment update temporary component state and may log values. They do not save to a database.

## Can I use this for confidential business files?

No. Do not upload or enter confidential documents or credentials.

## Why does the dashboard show sample data?

The project uses arrays from `lib/mock-data.ts`. No API or database is configured.

## What would make it production-ready?

Trusted identity, server-side object authorization, tenant isolation, private storage, safe upload/scanning, preview/download controls, durable permissions, audit logging, privacy governance, encryption/key management, monitoring, backup and recovery. See the production-readiness documentation.

## Why does the repository use pnpm?

The manifest and lockfile pin pnpm 10.6.5. Use Corepack and the frozen lockfile to keep installs reproducible.

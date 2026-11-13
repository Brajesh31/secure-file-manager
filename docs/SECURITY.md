# Security Design Requirements

## Current security posture

The repository is a UI prototype. It does not provide authentication, trusted sessions, server-side authorization, database persistence, private object storage, real upload/download, malware scanning, file encryption or audit logging.

The browser role selector and local-storage value are for demonstration only. The interface should not be used for confidential documents or real identities.

## Identity and sessions

Use a maintained identity provider or carefully reviewed server-side session implementation. Verify the principal server-side. Use Secure, HttpOnly and SameSite cookies, with defined expiry, renewal and revocation. Define recovery, MFA, account lockout/risk and account lifecycle.

Never trust user role, tenant ID, owner ID or permissions posted by the browser. Do not store privileged access tokens or passwords in local storage.

## Authorization

Every resource operation must enforce authorization on the server. This includes listing, preview, upload, download, rename, move, share, assignment, revoke, delete, restore and user administration. Apply deny-by-default, least privilege, tenant isolation, object-level checks and audit trails.

## File security

- Private storage only.
- Server-generated opaque object keys.
- Strict size quotas and request limits.
- Extension allowlist, detected MIME and file-signature inspection.
- Quarantine and malware scanning.
- Safe preview conversion and isolated rendering.
- Short-lived, resource-specific download URLs.
- Safe content headers.
- Versioning, retention, deletion and restore semantics.

## Encryption and key management

Use TLS in transit and platform encryption at rest. If application-layer encryption is required, define envelope encryption, key custody, rotation, recovery, separation of duties and audit access. Do not claim encryption because the product name or icon implies security.

## Operations

Add rate limits, secure headers, CSRF defenses, secret management, dependency updates, logs with data minimization, monitoring, incident response, backups and recovery tests. Define retention and legal hold before storing user documents.

See [THREAT-MODEL.md](THREAT-MODEL.md), [UPLOAD-AND-STORAGE.md](UPLOAD-AND-STORAGE.md), and the root [SECURITY.md](../SECURITY.md).

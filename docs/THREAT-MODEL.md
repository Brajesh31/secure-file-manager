# Threat Model

This is a preliminary source-informed threat model for the intended file-management product. It is not a penetration test, deployment audit or security certification.

## Assets

- Document and image bytes.
- File names, versions, types, sizes and checksums.
- Folder relationships and tenant ownership.
- User identity, sessions, roles and membership.
- File/folder permissions and share grants.
- Download links and preview renditions.
- Audit records and administrative configuration.
- Object-store, database and encryption credentials.

## Trust boundaries

| Boundary | Current state | Protection required for production |
| --- | --- | --- |
| Browser and Next.js UI | Client state and form events | HTTPS, schema validation, secure session |
| Browser role and identity | Role string in local storage | Trusted server-verified session |
| UI and application API | No API route currently exists | Authenticated endpoints and object-level policy checks |
| App and metadata database | No database | Least-privilege DB access and transactions |
| App and object storage | No storage integration | Private bucket, opaque keys, scoped access |
| Upload and processing workers | No scan pipeline | Quarantine, isolated scanning and safe previews |
| App and operations | Mock activity only | Tamper-resistant audit, monitoring and recovery |

## Threat scenarios

### 1. Privilege escalation
A visitor changes `localStorage.userRole` to `admin`. Current UI can display admin-oriented links and screens. Production mitigation: derive identity and role on the server, check on every request and test direct route and API access.

### 2. IDOR/BOLA
A user modifies a file or folder ID and requests an object belonging to another user/tenant. Production mitigation: resolve the object server-side and enforce owner/tenant/resource grants on every operation.

### 3. Malicious upload
A file contains active content, exploits a parser, exceeds limits, or disguises its true media type. Production mitigation: quotas, byte limits, signature inspection, quarantine, malware scanning, isolated preview generation and safe content disposition.

### 4. Unsafe preview
An uploaded HTML, SVG, PDF or document is rendered in a trusted origin and executes active content or exploits a viewer. Production mitigation: sandboxing, conversion, restrictive CSP, safe headers and isolated origins.

### 5. Permission race or stale share
A grant is revoked while a signed download URL remains valid, or concurrent updates overwrite each other. Production mitigation: short URL lifetime, versioned grants, transactions, explicit revocation and policy rechecks.

### 6. Sensitive data leakage
Filenames, message bodies, access tokens, signed URLs or document contents leak into logs or analytics. Production mitigation: data minimization, structured allowlisted audit schema, redaction and access controls.

### 7. Abuse and resource exhaustion
Automated uploads consume storage, bandwidth, processing capacity or database connections. Production mitigation: quotas, request limits, rate limits, concurrency controls, abuse alerts and recovery plans.

### 8. Supply-chain compromise
A compromised npm package, build action or third-party asset enters the production bundle. Production mitigation: lockfile review, dependency updates, provenance, action pinning policy, vulnerability review and deployment approval.

## Prototype-specific evidence

- Login accepts a role choice; email/password are not verified.
- Dashboard route checks rely on local storage.
- File upload is a local timer simulation.
- File previews are placeholders.
- Delete/share/permission operations are local logs/state.
- Recent activity and analytics are fixtures/hard-coded values.
- No real private data is processed by a backend in the current repository.

These facts limit the current data exposure but do not justify claims of secure storage.

## Prioritized production sequence

1. Identity and sessions.
2. Tenant and ownership model.
3. Server-side authorization and negative tests.
4. Private object storage and upload pipeline.
5. Malware scanning and safe preview/download.
6. Audit logging and privacy controls.
7. Encryption/key management, backup and recovery.
8. Monitoring, incident response and independent security review.

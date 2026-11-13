# Data Model and Fixture Reference

## Current state

The project's shared types are defined in `lib/types.ts`; example arrays are in `lib/mock-data.ts`. These types are presentation contracts, not database schemas or validated server records.

## FileType

| Property | Type | Purpose in current UI |
| --- | --- | --- |
| `id` | string | Fixture key |
| `name` | string | Display filename |
| `type` | string | Display category such as pdf, doc, image or zip |
| `size` | string | Preformatted display size, not a verified byte count |
| `riskLevel` | low / medium / high | Manually assigned display label |
| `uploadDate` | string | Sample date |
| `uploadedBy` | string | Display name or fixture identity |
| `assignedTo` | string[] | Array of fixture user IDs |
| `url?` | string | Optional string; current preview does not retrieve bytes from it |
| `accessibility?` | userId and read/write[] | File permission display data |
| `folderId?` | string | Optional fixture folder association |

The property name `accessibility` is used for file-access permissions. It is potentially confusing because accessibility commonly refers to support for people using assistive technology. A production schema should use a clearer name, such as `filePermissions`, and define the relation explicitly.

## UserType

| Property | Type | Purpose |
| --- | --- | --- |
| `id` | string | Fixture identifier such as user1 |
| `name` | string | Sample display name |
| `email` | string | Example address |
| `role` | admin / user | Display role |

The model does not include trusted identity-provider subject, tenant, status, verified email, password hash, session, MFA factors, or lifecycle timestamps.

## FolderType

| Property | Type | Purpose |
| --- | --- | --- |
| `id` | string | Fixture identifier |
| `name` | string | Display name |
| `parentId?` | string | Optional parent fixture |
| `path` | string | Display path |
| `createdBy` | string | Sample creator |
| `createdAt` | string | Sample date |

Never treat the `path` field as a trusted filesystem path or object-storage key.

## FolderPermissionType

| Property | Type | Purpose |
| --- | --- | --- |
| `folderId` | string | Sample folder identifier |
| `userId` | string | Sample user identifier |
| `read` | boolean | UI read toggle |
| `write` | boolean | UI write toggle |
| `create` | boolean | UI create toggle |

These booleans are not enforced by an API. The dialog makes write/create depend on read at the UI level only.

## Fixture inventory

The current `lib/mock-data.ts` exports:
- six sample file records;
- four sample user records;
- six sample folders;
- four sample folder-permission entries.

The records use example names and addresses. They should stay synthetic.

## Production schema considerations

A production system should model organizations/tenants, principals, sessions, files, file versions, folders, membership, permissions, shares, scan jobs, audit events, retention policies and storage-object references. Use stable server-generated identifiers, database constraints, referential integrity, transactions and migration scripts.

File metadata should include owner/tenant, opaque object key, detected media type, measured byte size, checksum, scan status, version, uploader, timestamps, retention state and deletion state. Permission grants should identify principal, resource, action, grantor, creation/expiry, and revocation.

## Data validation

Validate request bodies against explicit schemas at the server boundary. Do not trust browser-provided role, user ID, owner ID, file type, size, path, URL, risk level or permission state. Derive authorization context from the server session and trusted database records.

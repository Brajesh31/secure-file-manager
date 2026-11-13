# Upload, Preview, Download and Storage

## Current upload screen

`app/dashboard/upload/page.tsx` offers a local file chooser, drag-and-drop selection, a filename field, a risk-level selector and sample-user checkboxes. The selected browser File object is kept in React state.

When submitted, the handler prevents the browser's normal form submission, sets a loading flag, waits for a timer, clears the flag and redirects to the dashboard. It does not submit multipart data, call `fetch`, invoke a server action, write file bytes, create metadata or store permissions.

A redirect after the timer does not mean a file has been uploaded.

## Current preview screen

`components/file-preview-dialog.tsx` renders placeholder content based on the file type. It does not retrieve actual file bytes from the optional `FileType.url` property or any storage provider.

The component prevents some browser interactions such as context-menu and copy. Those event handlers do not stop screenshots, browser developer tools, memory inspection, network retrieval, or copying through other mechanisms. They are not DRM and cannot make an accessible file confidential.

## No current download implementation

The repository does not include an API route, download handler, private object store, signed URL issuer or file-byte delivery flow. The "Prevent Downloads" setting is local UI state, not a server policy.

## Recommended upload pipeline

A production upload flow should:
1. Authenticate the uploader and verify permission to the destination folder.
2. Enforce request and per-object size limits at the edge and application layers.
3. Validate a narrow extension allowlist.
4. Inspect detected MIME type and file signature rather than trusting browser headers.
5. Generate opaque server-side object keys.
6. Treat filenames and paths as untrusted metadata, not storage keys.
7. Store new objects in private quarantine storage.
8. Scan untrusted objects before publishing them.
9. Generate previews in an isolated processing environment.
10. Record measured byte size, checksum, detected type, owner, tenant, uploader, folder and scan state.
11. Commit metadata and state transitions transactionally.
12. Publish access only after required validation and scanning succeed.
13. Emit privacy-safe audit events.

## Recommended preview and download flow

For every preview or download request:
- authenticate the principal;
- load the object's trusted owner/tenant metadata;
- enforce permission for the exact resource and action;
- issue a narrow, short-lived URL only after policy checks, or stream through an authorized server handler;
- set safe response headers such as Content-Type, Content-Disposition and X-Content-Type-Options;
- prevent active untrusted formats from executing in the application's origin;
- define caching and revocation behaviour.

## Object storage design

Use private buckets/containers and opaque object keys. Avoid public bucket policies. Define versioning, encryption, key management, lifecycle rules, backup, restore, deletion and legal-hold semantics.

## Failure handling

A production upload may succeed in object storage while metadata creation fails, or the reverse. Define compensation jobs, orphan cleanup, retry/idempotency keys, scan retry semantics and observable states. Do not show an "uploaded" success message until the workflow reaches an authoritative completed state.

## Privacy and retention

Specify message/file processing purpose, data residency, retention period, deletion, backup expiry, legal hold, support access and audit policy before accepting real documents.

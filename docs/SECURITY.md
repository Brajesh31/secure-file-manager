# Security Design Requirements

This document describes requirements for a future production implementation, not features already delivered by the current UI.

## Identity and sessions
Use a maintained authentication provider or a carefully reviewed server-side session implementation. Do not trust a role or user ID supplied by local storage or the browser.

## Authorization
Check ownership and permissions on the server for every list, read, upload, rename, share, delete, and download operation. Deny by default. Test cross-user and cross-tenant access.

## File handling
- Enforce size limits before storage.
- Validate extension, declared MIME type, and file signatures.
- Generate storage keys server-side; never use user paths directly.
- Scan uploads where appropriate.
- Store files privately and issue short-lived authorized download URLs.
- Prevent path traversal and unsafe content rendering.

## Operations
Use HTTPS, secure cookies, CSRF protections where applicable, rate limits, secret management, audit events, backups, retention controls, and a documented incident-response process.

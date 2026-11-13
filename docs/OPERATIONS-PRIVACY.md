# Operations, Privacy and Data Lifecycle

## Current prototype behaviour

The application displays fictional files, sample users, local permissions, static activity and sample analytics. The login password is not sent to a server. The upload component does not transmit bytes. No database, object storage or audit service is configured.

Do not enter real credentials or use confidential files in this prototype.

## Privacy requirements before backend work

Define:
- purpose and lawful basis for processing;
- categories of data and user notice;
- controller/processor roles and subprocessors;
- data residency and cross-border transfers;
- access and support policies;
- retention and deletion;
- legal hold and backup expiry;
- user export and account closure;
- incident and breach response.

Minimize data collection. Do not log file contents, passwords, session tokens, signed download URLs or sensitive file names without a documented and controlled need.

## Suggested file lifecycle states

A production object lifecycle should explicitly represent:
- upload initiated;
- received in quarantine;
- scan pending;
- rejected/quarantined;
- approved and active;
- version superseded;
- retention or legal hold;
- deletion requested;
- soft-deleted/recoverable;
- permanently deleted;
- backup expiry complete.

Metadata and object storage may not commit atomically. Define cleanup, idempotency, retry, orphan handling and reconciliation.

## Audit design

Capture actor, tenant, action, resource ID, timestamp, result and correlation ID. Events may include login/session changes, uploads, scan outcomes, reads, downloads, permission grants/revocations, admin operations, deletions, restores and retention changes.

Avoid writing document bodies, passwords, access tokens or raw signed URLs to audit records.

## Operational controls

Before production:
- rate limits and per-user/tenant storage quotas;
- monitoring and alerts for auth failures, denied access, uploads and downloads;
- resource limits for scanning and preview workers;
- key rotation and service-credential access review;
- dependency patching and vulnerability response;
- tested backup and restore;
- incident escalation and breach handling;
- recovery time and recovery point objectives;
- deployment rollback and model/storage migration plan.

## Prototype hosting

Keep the sample data fictional. Do not wire the UI to a production bucket, database or identity provider until server-side authorization and privacy controls are implemented and tested.

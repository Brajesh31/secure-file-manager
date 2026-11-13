# Roadmap

This roadmap separates achievable prototype improvements from the substantial backend work required for a real secure file manager.

## Phase 1: UI prototype quality

- [x] Clarify that login, upload and permissions are demonstration-only.
- [x] Document every current route and key feature component.
- [x] Add typecheck and source-contract CI checks.
- [ ] Add browser-based smoke tests for all routes.
- [ ] Improve mobile/tablet behaviour of the file list and admin tables.
- [ ] Add empty states for category and search views.
- [ ] Review motion and keyboard behaviour.
- [ ] Optimize the oversized background image.
- [ ] Replace fake success messages with explicit "demo action" feedback.

## Phase 2: Product contracts

- [ ] Define identity provider and session lifecycle.
- [ ] Define tenant, user, folder and file ownership model.
- [ ] Define file and folder permission semantics.
- [ ] Define REST/RPC API schemas, errors and idempotency.
- [ ] Define upload limits and supported format policy.
- [ ] Define preview/download requirements.
- [ ] Define privacy, retention and deletion policy.

## Phase 3: Trusted backend foundation

- [ ] Server-side identity and authorization.
- [ ] Database schema and migrations.
- [ ] Private object storage integration.
- [ ] Audit events and privacy-safe logs.
- [ ] Rate limiting and tenant quotas.
- [ ] Integration and negative authorization tests.

## Phase 4: Safe file processing

- [ ] Quarantine uploads.
- [ ] Extension, MIME and file-signature validation.
- [ ] Malware scanning and status transitions.
- [ ] Isolated preview conversion.
- [ ] Short-lived authorized downloads.
- [ ] Versioning, retention, restore and permanent deletion.

## Phase 5: Operational readiness

- [ ] Monitoring, alerts and abuse response.
- [ ] Encryption/key rotation and backup recovery.
- [ ] Data retention and privacy assessment.
- [ ] Independent security review and penetration testing.
- [ ] Release/rollback and incident response exercises.

Do not call the product production-ready until the production security and operations phases are implemented and validated.

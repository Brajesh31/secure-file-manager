# Release Checklist

## Code quality

- [ ] Review all changes and remove secrets, real documents and personal data.
- [ ] Install dependencies with the frozen pnpm lockfile.
- [ ] Run `pnpm typecheck`.
- [ ] Run `pnpm test`.
- [ ] Run `pnpm build`.
- [ ] Confirm GitHub Actions passes on the release commit.
- [ ] Review dependency updates and security advisories.
- [ ] Test affected routes in a local production build.

## UI and accessibility

- [ ] Test light and dark themes.
- [ ] Test mobile, tablet and desktop widths.
- [ ] Test keyboard navigation, focus visibility and dialogs.
- [ ] Verify labels and accessible names.
- [ ] Ensure demo-only and placeholder states remain clearly labelled.
- [ ] Confirm no fake success message suggests a file or permission was saved.

## Assets and privacy

- [ ] Confirm the source/licence of logos and artwork.
- [ ] Optimize the 16.8 MB background asset or document why it remains.
- [ ] Confirm fixtures contain no real user or document data.
- [ ] Ensure environment secrets are not committed or exposed through browser bundles.

## Product-claim checks

- [ ] Do not claim authentication or server-side authorization.
- [ ] Do not claim file upload, storage, preview or download is implemented.
- [ ] Do not claim encryption or malware scanning is implemented.
- [ ] Do not describe sample activity or analytics as operational records.

## Production readiness gate

A production file-handling release is blocked until identity/session management, resource authorization, private storage, safe upload/scanning, preview/download, metadata persistence, audit, encryption/key management, retention/deletion, backup/restore, monitoring and incident response are implemented and independently reviewed.

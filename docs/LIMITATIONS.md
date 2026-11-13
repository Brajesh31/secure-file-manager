# Known Limitations

## Product boundary

The current repository is a dashboard UI prototype. It demonstrates interactions and screen composition using local sample data. It is not a backend file-management system.

## Identity and authorization
- Email and password values are not validated.
- A visitor chooses the demo role.
- Role state is stored in local storage.
- Route checks are performed in client components.
- No trusted principal, session, tenant or server authorization exists.

## Files and storage
- File upload is a timer simulation.
- Selected file bytes are not sent to a server or stored.
- File preview uses placeholder content.
- No download route or signed URL service exists.
- Delete and share actions are not backed by an API.
- No object storage or metadata database is configured.

## Users and permissions
- Users are sample fixture records.
- Add-user dialog simulates a new user locally; password is not sent to an identity provider.
- Assign-user and folder-access dialogs mutate local state only.
- Changes can disappear after navigation or refresh.
- Folder edit is a console log rather than an edit flow.

## Analytics and activity
- Monthly uploads and active-user display are hard-coded.
- Recent activity is static sample content, not an audit log.
- Risk labels are fixture metadata, not results of scanning or a classification service.

## Known logic inconsistencies
- Fixture IDs include `user1`, `user2`, and `user3`, but several non-admin file filters use `assignedTo.includes("user")`. That does not select records belonging to a specific signed-in person.
- `FileType.accessibility` is used for permission metadata and is easily confused with accessibility support.
- Context-menu/copy suppression cannot prevent copying and should not be represented as document protection.
- The storage usage panel displays a fixed value rather than live object-storage metrics.

## Build and maintenance concerns
- The earlier Next config ignored TypeScript build errors. This update adds a separate strict TypeScript CI check and removes that suppression.
- The package manifest previously used `latest` for several Radix/next-themes package entries. The lockfile controls the frozen current installation, but future lockfile refreshes should use reviewed version ranges rather than unbounded `latest`.
- The package manifest had a `next lint` command without an established ESLint setup. It is replaced with explicit typecheck and contract-test scripts.

## Non-goals until a backend is designed

Do not add real file upload, secure preview, download, share links or privileged user-management mutations directly in a client component. First define identity, data ownership, authorization, storage and privacy contracts.

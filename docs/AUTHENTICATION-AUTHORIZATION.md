# Authentication and Authorization

## Current implementation

The login form is a demo role selector:
1. A visitor types email and password fields.
2. The values are not sent to an authentication endpoint.
3. The visitor selects User or Admin.
4. A client-side timer simulates a sign-in delay.
5. The selected role is written to `localStorage.userRole`.
6. The browser navigates to `/dashboard`.

The dashboard layout and several nested pages read this key and use it to decide which UI to render or where to redirect. The sidebar hides some links when the role string is not `admin`.

This is not authentication, a secure session, trusted identity or server-side role-based access control.

## Why local-storage guards are not security

Browser local storage is under the visitor's control. A visitor can change `userRole` in developer tools. Client components can be modified or bypassed. Direct URL requests can be made without using the sidebar. A role string does not prove which user is acting or which tenant owns a resource.

Hiding the Upload link or returning `null` from an admin page is a presentation decision, not a security boundary.

## Required identity design

Use a maintained authentication provider or a reviewed server-side session implementation. The server must verify the principal on every protected request. Establish user identity and tenant membership from trusted session/provider claims, not submitted form values.

Use Secure, HttpOnly and SameSite-configured session cookies. Define login, logout invalidation, expiry, renewal, recovery, revocation, MFA and account lifecycle. Do not store passwords, session secrets or privileged access tokens in local storage.

## Required authorization design

- Deny by default.
- Authenticate the principal at the server boundary.
- Resolve ownership and tenant from persisted metadata.
- Check each operation against the requested object and action.
- Verify that the object belongs to the active tenant.
- Check explicit grants and inherited folder permissions according to a documented policy.
- Authorize list, preview, download, upload, rename, move, share, assign, revoke, delete, restore and administrative actions.
- Re-authorize before issuing a signed download URL.
- Audit permission changes and administrative actions.
- Test both allow and deny outcomes, including cross-user and cross-tenant attempts.

## UI responsibilities

Client-side role state may be used to simplify navigation after a trusted session has been established. It must never be relied upon to grant access. The UI should treat 401 and 403 server responses explicitly and avoid displaying a success state before a server mutation succeeds.

## Required tests

Once a real identity service exists, cover unauthenticated access, invalid/expired/revoked sessions, privilege escalation, direct route requests, IDOR/BOLA, tenant boundary violations, stale grants, revoked shares and signed URL expiry. A test that a button is hidden is not an authorization test.

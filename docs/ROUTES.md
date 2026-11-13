# Routes and Screens

This document maps route URLs to their current source and behaviour. A route rendering an admin page does not imply that access is protected on the server.

## Root routes

| URL | Source | Purpose | Current state |
| --- | --- | --- | --- |
| `/` | `app/page.tsx` | Introductory screen and login UI | Demo role selector; no authentication |
| `/access-denied` | `app/access-denied/page.tsx` | Access-denied presentation | Static screen; no server policy invokes it |
| Not found | `app/not-found.tsx` | Unknown route fallback | Static Next.js error UI |

## Dashboard routes

| URL | Source | Screen responsibility | Data and behaviour |
| --- | --- | --- | --- |
| `/dashboard` | `app/dashboard/page.tsx` | Overview, category counts, quick access, files/folders tabs and recent activity | `mockFiles`, `RecentActivity`, `FolderManagement`; search and view state are local |
| `/dashboard/documents` | `app/dashboard/documents/page.tsx` | Document filter and search | Filters fixture file types pdf/doc/docx |
| `/dashboard/images` | `app/dashboard/images/page.tsx` | Image filter and search | Filters fixture records where type is image |
| `/dashboard/shared` | `app/dashboard/shared/page.tsx` | Shared-file presentation | Treats files assigned to more than one fixture user as shared |
| `/dashboard/upload` | `app/dashboard/upload/page.tsx` | File chooser, risk label, sample user assignment | Simulated upload; no server request or durable file |
| `/dashboard/manage-users` | `app/dashboard/manage-users/page.tsx` | Search users, tabs, add-user and folder access dialogs | Mock data and local component state |
| `/dashboard/analytics` | `app/dashboard/analytics/page.tsx` | File type, risk and monthly charts | Fixture-derived and hard-coded values |
| `/dashboard/settings` | `app/dashboard/settings/page.tsx` | Theme, notification, download and warning preferences | Theme is presentation state; other switches are local only |
| Dashboard layout | `app/dashboard/layout.tsx` | Shared sidebar and role lookup | Reads local storage after hydration |

## Navigation

`components/sidebar.tsx` displays common items for users and additional upload, user-management and analytics links for the role string `admin`. Navigation is based on a prop derived from local storage. Direct route requests and client-side manipulation are not blocked by a trusted server authorization layer.

## Important fixture filtering defect

The fixture user IDs are `user1`, `user2`, `user3`, and `admin1`. The dashboard, document and image pages use `file.assignedTo.includes("user")` for the non-admin filter. That checks for a literal ID equal to `user`, not the current person's actual ID. The login flow stores only a role, not an authenticated user identity. The current filter therefore cannot represent personal file ownership correctly.

Do not patch this by displaying all files to all users. The correct design requires trusted identity and an owner-scoped server query.

## Screen-state expectations

When implementing a real API, document and test each route's:
- signed-in principal and role requirements;
- tenant and resource scope;
- loading and empty state;
- validation and failure state;
- pagination and sorting;
- audit event;
- server-side authorization decision.

Do not test only whether a link is hidden. Direct access to the URL and object identifiers must be covered by server integration tests.

# Component Reference

## Overview

The feature components live in `components/`; reusable primitives are grouped under `components/ui/`. Feature components compose fixture data and React state. UI primitives provide presentation and interaction mechanics, not secure business logic.

## Login and application shell

### LoginForm
**Source:** `components/login-form.tsx`

Renders email and password inputs, a user/admin role radio group, and a submit button. The current handler waits for a timer, writes the selected role to `localStorage.userRole`, and navigates to the dashboard. It does not submit credentials, verify identity, create a session, hash a password or establish an authenticated principal.

### Sidebar
**Source:** `components/sidebar.tsx`

Displays navigation links, an admin-only upload action, collapse control, theme toggle, local-storage logout, and a static storage meter. Menu visibility follows the role prop and is not a server policy.

### ThemeProvider
**Source:** `components/theme-provider.tsx`

Wraps next-themes to apply a light/dark class. Theme configuration is visual and unrelated to file encryption or user privileges.

### ViewToggle
**Source:** `components/view-toggle.tsx`

Switches between list and grid presentation on the dashboard.

## File display and actions

### FileGrid
**Source:** `components/file-grid.tsx`

Renders FileType records as cards, maps category labels to icons/classes, shows assigned-user avatars and opens preview/assignment dialogs. The Delete handler logs an ID rather than removing a durable record. Share has no implemented action. Assignment state is handled by a dialog.

### FileList
**Source:** `components/file-list.tsx`

Renders the same data as a row-based list. Preview opens a placeholder dialog. Delete logs an ID. Share is a menu item without a persisted workflow.

### FilePreviewDialog
**Source:** `components/file-preview-dialog.tsx`

Displays file metadata and placeholder UI selected by type. An image uses the generic `/placeholder.svg` asset. No file bytes or file URL are retrieved. Blocking context-menu, copy or drag events does not prevent screenshots, developer tools, browser memory access, or copying by other means. It is not DRM or confidentiality enforcement.

## User and permission dialogs

### AddUserDialog
**Source:** `components/add-user-dialog.tsx`

Collects name, email, password and role, then generates a demo user object after a timer and passes it to the parent. It does not call an identity provider. The password is not persisted or verified. Random demo IDs are not a durable identity scheme.

### AssignUserDialog
**Source:** `components/assign-user-dialog.tsx`

Builds a local selected-user list and read/write permissions based on the sample FileType. Save logs the values and closes the dialog. No API or database update exists.

### FolderAccessDialog
**Source:** `components/folder-access-dialog.tsx`

Initializes read/write/create controls from sample folder permissions. Its local UI rule requires read when write/create is enabled and clears write/create when read is disabled. The callback from the parent does not persist policy.

## Folder and activity

### FolderManagement
**Source:** `components/folder-management.tsx`

Renders mock folders. Add and delete update component-local state. Edit logs an ID. Changes are not durable.

### RecentActivity
**Source:** `components/recent-activity.tsx`

Renders a fixed list of fictional activity events. It is not an audit log and should not be used as evidence that files were accessed or downloaded.

## UI primitives

The `components/ui/` directory includes local wrappers for Radix UI and presentation helpers: buttons, cards, inputs, labels, selects, checkboxes, tabs, dialogs, dropdowns, toast, tooltip, avatars, tables, scroll area, chart, sidebar and related primitives. Their presence does not mean the corresponding domain capability is implemented.

## Component design rules

1. Keep the distinction between local UI state and durable server state clear.
2. Use semantic controls and accessible names.
3. Avoid success toasts for operations that have not been confirmed by a real service.
4. Do not implement authorization in a visual component condition.
5. Validate untrusted input at server boundaries.
6. Keep fixtures separate from future repositories/services.
7. Update route and security docs when a component adds a new data flow.

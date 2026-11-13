# Secure File Manager UI Prototype

A Next.js 15 and React 18 dashboard prototype that demonstrates a file-management interface: role-themed navigation, file and folder views, document/image categories, mock user administration, permission dialogs, activity cards, analytics, and appearance settings.

> **Important security warning:** This repository is a UI prototype, not a secure file-storage service. The login screen does not verify credentials. It stores a visitor-selected role in browser `localStorage`. The dashboard reads mock fixtures. File upload is simulated, preview content is placeholder content, and sharing, deletion, user, and permission operations are not persisted. No server-side authentication, authorization, database, private object storage, encryption service, malware scanning, or secure download endpoint is implemented. Do not enter real passwords or confidential documents.

## 1. Project purpose

This project demonstrates how a modern file-manager dashboard can be composed from Next.js App Router pages, React client components, TypeScript interfaces, Tailwind CSS, and Radix-based UI primitives.

The project is useful for:
- learning how to structure a multi-route dashboard;
- exploring file and folder card/list presentations;
- experimenting with tabs, dialogs, dropdowns, search fields, charts, toasts and theme controls;
- prototyping role-specific navigation and screen layouts;
- reviewing the design requirements of a future file-management application.

It is not suitable for real document processing or storage.

## 2. Current capabilities

| Area | What the current UI demonstrates |
| --- | --- |
| Login | Email/password fields and a selectable demo role; no credential verification |
| Dashboard | Summary cards, quick access, file list/grid toggle, search, folders and recent-activity panel |
| Documents | Filters mock records for document-like file types |
| Images | Filters mock records for image-like file types |
| Shared files | Shows sample records assigned to more than one fixture user |
| Upload | File chooser, drag-and-drop selection, risk label and sample user selection; submission is a timer simulation |
| User management | Search, tabs, sample user creation, local deletion and folder-access dialog |
| Permissions | Local read/write/create controls and assignment dialogs; no persistence |
| Analytics | Charts generated from mock and hard-coded values |
| Settings | Theme selection plus local-only notification/download/warning switches |
| Preview | Placeholder rendering by file category, not actual file bytes |
| Theme | Light/dark mode through next-themes |
| UI components | Radix primitives wrapped as local components in `components/ui/` |

See [Routes](docs/ROUTES.md) and [Component Reference](docs/COMPONENT-REFERENCE.md).

## 3. Explicitly not implemented

| Capability | Current state |
| --- | --- |
| Authentication | No identity provider, password validation, session or logout revocation |
| Authorization | No server-side role or object-level permission checks |
| File storage | No filesystem or object-storage service |
| Upload API | No API route or server action receives selected file bytes |
| File preview | Placeholder UI; it does not retrieve the content of a stored file |
| Download | No download endpoint or signed URL |
| Sharing | No durable share record or invitation workflow |
| User administration | Local mock array and component state |
| Permission persistence | Local dialog state and callbacks only |
| Database | None configured |
| Encryption | No application-level file encryption or key management |
| Malware scanning | Not implemented |
| Audit logging | Recent activity is a fixed sample list |
| Analytics | Static fixtures and hard-coded display metrics |

A visible control, a UI badge, a local-storage role, a hidden button, or a dialog is not evidence that a secure backend capability exists.

## 4. Technology stack

| Layer | Technology | Purpose |
| --- | --- | --- |
| Framework | Next.js 15.2.4 | App Router, layouts, routing and production build |
| UI runtime | React 18.3.1 | Interactive client components |
| Language | TypeScript 5.8.3 | Typed component and data contracts |
| Styling | Tailwind CSS 3.4.17 | Utility-first responsive styling |
| UI primitives | Radix UI | Dialogs, menus, tabs, checkboxes, switches and other interactions |
| Component patterns | shadcn-style local wrappers | Shared visual primitives in `components/ui/` |
| Icons | lucide-react | Feature and navigation icons |
| Charts | Recharts | Sample analytics |
| Theme | next-themes | Light/dark presentation |
| Validation libraries | Zod and React Hook Form packages | Available dependencies; usage varies by current feature |
| Package manager | pnpm 10.6.5 | Locked dependency installation |

The repository includes `pnpm-lock.yaml`. Use pnpm with a frozen lockfile. Do not add npm or Yarn lockfiles.

## 5. Requirements

- Node.js 22 (the CI runtime).
- Corepack.
- pnpm 10.6.5.
- Git.

## 6. Local development

Clone and enter the repository:

```bash
git clone https://github.com/Brajesh31/secure-file-manager.git
cd secure-file-manager
```

Activate the pinned package manager and install exactly the lockfile dependencies:

```bash
corepack enable
corepack prepare pnpm@10.6.5 --activate
pnpm install --frozen-lockfile
```

Start the development server:

```bash
pnpm dev
```

Open <http://localhost:3000/>.

## 7. Project commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Run the Next.js development server |
| `pnpm typecheck` | Run TypeScript without emitting output |
| `pnpm test` | Run Node.js repository-contract tests |
| `pnpm build` | Create a production build |
| `pnpm start` | Serve the production build |

The old `next lint` script has been removed because no ESLint dependency/configuration is established as a working repository check. Do not count an unconfigured lint command as a validation gate.

## 8. Repository structure

```text
app/                 Next.js App Router pages and layouts
components/          Feature components and reusable UI primitives
hooks/               Shared client hooks
lib/                 TypeScript models, helpers and mock data
public/              Static images, logos and placeholders
styles/              Additional global styles
tests/               Repository-contract checks
docs/                Architecture, routes, data, security and operations guides
.github/workflows/   GitHub Actions automation
```

See [Architecture](docs/ARCHITECTURE.md), [Route Reference](docs/ROUTES.md), and [Data Model](docs/DATA-MODEL.md).

## 9. Security and production-readiness gate

Before using the product for real documents or users, design, implement and independently review:

1. Trusted identity, secure sessions, account lifecycle and revocation.
2. Server-side authorization for every route and every file/folder operation.
3. User, tenant, ownership and resource relationships in a database.
4. Private object storage with opaque server-generated keys.
5. Upload quotas, body limits, extension/MIME/signature validation, quarantine and malware scanning.
6. Safe preview and download delivery, with content-type, content-disposition and sandbox controls.
7. Encryption at rest and in transit, key management and rotation.
8. Audit events that do not contain document contents, credentials or signed URLs.
9. CSRF defenses, rate limits, security headers, secret management and operational monitoring.
10. Backup, restore, deletion, retention, legal hold and incident-response workflows.
11. Cross-user and cross-tenant negative authorization tests.
12. Privacy notices, purpose limitation, data residency and retention requirements.

Read [Threat Model](docs/THREAT-MODEL.md), [Authentication and Authorization](docs/AUTHENTICATION-AUTHORIZATION.md), and [Upload and Storage](docs/UPLOAD-AND-STORAGE.md).

## 10. Documentation index

- [Architecture](docs/ARCHITECTURE.md)
- [Routes and Screens](docs/ROUTES.md)
- [Component Reference](docs/COMPONENT-REFERENCE.md)
- [Data Model](docs/DATA-MODEL.md)
- [Authentication and Authorization](docs/AUTHENTICATION-AUTHORIZATION.md)
- [Upload, Preview and Storage](docs/UPLOAD-AND-STORAGE.md)
- [Threat Model](docs/THREAT-MODEL.md)
- [Security Review](docs/SECURITY-REVIEW.md)
- [Testing Strategy](docs/TESTING.md)
- [Development](docs/DEVELOPMENT.md)
- [Deployment](docs/DEPLOYMENT.md)
- [Operations and Privacy](docs/OPERATIONS-PRIVACY.md)
- [Accessibility](docs/ACCESSIBILITY.md)
- [Asset Inventory](docs/ASSET-INVENTORY.md)
- [Limitations](docs/LIMITATIONS.md)
- [Roadmap](docs/ROADMAP.md)
- [Troubleshooting](docs/TROUBLESHOOTING.md)
- [FAQ](docs/FAQ.md)

## 11. Contributing and licence

Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request. Never commit real documents, passwords, API keys, user exports or customer information. Security concerns should be reported privately using [SECURITY.md](SECURITY.md).

The project is distributed under the existing MIT licence in [LICENSE](LICENSE).

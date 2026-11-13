# Secure File Manager UI

A Next.js 15 and React 18 interface prototype for a file-management dashboard. It includes login and dashboard screens, file and folder views, user-management dialogs, activity panels, and a component library built with Tailwind CSS and Radix UI.

**Security warning:** The checked-in dashboard currently uses mock data and browser-side state. The login page contains a placeholder authentication check, and the project does not include a verified backend, durable file storage, server-side authorization, or production-grade encryption. The interface must not be used to store real confidential documents until those services are implemented and independently reviewed.

## Features in the current UI
- Login screen and dashboard layout.
- File list and grid views with search.
- Document, image, and recent-file categories.
- Folder management and permission-oriented dialogs.
- Admin/user presentation states.
- Recent activity and dashboard navigation.
- Responsive UI components.

## Technology
- Next.js 15 App Router
- React 18 and TypeScript
- Tailwind CSS
- Radix UI and shadcn-style components
- Lucide icons
- pnpm package manager

## Project structure
```text
app/             Next.js routes and dashboard pages
components/      Feature components and reusable UI primitives
hooks/           Shared React hooks
lib/             Types, utilities, and mock data
public/          Static images and brand assets
styles/          Global styles
```

## Requirements and setup
Use Node.js compatible with the Next.js version and pnpm 10.6.5 as declared in `package.json`.

```bash
git clone https://github.com/Brajesh31/secure-file-manager.git
cd secure-file-manager
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Open <http://localhost:3000/>.

## Available commands
| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the Next.js development server |
| `pnpm build` | Create a production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Run the configured lint script, if supported by the installed Next.js CLI |

The current `lint` script uses `next lint`, which may not be available in all Next.js 15 CLI configurations. Confirm it locally before relying on it as a required check.

## Architecture
See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for route structure and [docs/SECURITY.md](docs/SECURITY.md) for the security boundary.

## Production readiness checklist
Before handling real files or users, implement and review:
- Server-side authentication and session management.
- Authorization checks on every file, folder, and user operation.
- Private object storage with ownership-scoped access.
- Upload size, extension, MIME, content-signature, and malware checks.
- Safe download delivery and path traversal protections.
- Audit logging that avoids leaking document contents.
- CSRF protections, rate limits, secure headers, and secrets management.
- Backup, retention, deletion, and incident-response procedures.
- Encryption at rest and in transit, with managed key rotation.

A UI permission dialog or a client-side role value is not an authorization control.

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md). Never commit real documents, credentials, or customer data.

## License
MIT. See [LICENSE](LICENSE).

Last updated: 2026-11-13 19:20 UTC

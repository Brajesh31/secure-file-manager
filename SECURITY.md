# Security Policy

## Scope and warning

This repository is currently a UI prototype. It does not implement trusted authentication, server-side authorization, real upload/download, persistent file storage, encryption, malware scanning or audit logging. Do not use it to store or share confidential documents. Do not enter real passwords in the demo sign-in screen.

## Reporting

Do not publish credentials, private files, personal data, exploit details or production tokens in public issues. Use GitHub private vulnerability reporting if enabled, or contact the repository owner privately with:
- affected commit and file paths;
- a concise impact statement;
- safe reproduction steps;
- the affected trust boundary;
- a proposed mitigation if known.

## Security expectations for contributions

- Never treat a role in local storage as identity or authorization.
- Keep storage/database credentials server-side.
- Authorize each resource operation on the server.
- Validate untrusted files and names before storage or rendering.
- Avoid logging file contents, tokens, passwords or signed URLs.
- Review dependencies, third-party services, assets and deployment configuration.
- Update security docs when a new trust boundary is introduced.

See [docs/SECURITY-REVIEW.md](docs/SECURITY-REVIEW.md), [docs/THREAT-MODEL.md](docs/THREAT-MODEL.md), and [docs/SECURITY.md](docs/SECURITY.md).

# Support

## Read first

- [README](README.md): scope and local setup.
- [ROUTES](docs/ROUTES.md): screens and current behaviours.
- [LIMITATIONS](docs/LIMITATIONS.md): known incomplete features.
- [TROUBLESHOOTING](docs/TROUBLESHOOTING.md): common development issues.
- [SECURITY](SECURITY.md): security reporting and safe use.

## Local validation

```bash
corepack enable
corepack prepare pnpm@10.6.5 --activate
pnpm install --frozen-lockfile
pnpm typecheck
pnpm test
pnpm build
```

## What to include in a bug report

- Node.js, pnpm, OS and browser versions;
- route and component involved;
- steps to reproduce;
- expected and actual result;
- sanitized build output or browser console message;
- whether the issue persists after a clean frozen install.

Never attach real documents, passwords, tokens, customer records, personal information or production exports. Use only fictional fixtures.

## Scope

The repository is a dashboard UI prototype. Real secure storage, access control, file scanning, encrypted file delivery and production compliance are not current capabilities. Feature requests for those areas require backend architecture and security design, not only additional UI controls.

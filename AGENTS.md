# Repository Guidelines

This repository hosts the Olve Trains application.  It includes the Svelte
front‑end located in `frontend/` and a minimal ASP.NET Core backend under
`backend/`. All front-end commands should be executed from the repository root
using **bun**. Run backend commands from the `backend/` directory using the
`dotnet` CLI.

## Layout

- `frontend/` – current Svelte + TypeScript UI. See `frontend/AGENTS.md` for all
  details.
- `backend/` – ASP.NET Core Minimal API server. See `backend/AGENTS.md`.
- `dist/` – compiled JavaScript utilities.
- `package.json` – scripts for dev, build, lint and test. These reference
  configuration files under `frontend/` so run them from the repo root.
- `.github/workflows/ci.yml` – GitHub Actions workflow that installs
  dependencies with **bun**, runs `bun run lint` then `bun run test`.
- `.prettierrc.json` – Prettier configuration used by the `lint` script.
- `README.md` – project overview and quickstart instructions.

Always update this `AGENTS.md` with repository changes so LLM agents can operate
correctly.

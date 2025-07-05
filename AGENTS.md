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
- `backend/setup-dotnet.sh` – script to install the .NET SDK and pre-restore
  backend packages for offline use.
- `package.json` – scripts for dev, build, lint and test. These reference
  configuration files under `frontend/` so run them from the repo root.
- `README.md` – project overview and quickstart instructions.
- `.github/workflows/ci.yml` – GitHub Actions workflow that runs `bun run lint`
  and `bun run test` on every push and pull request.
## Linting
- Run `bun run lint` to check formatting and style across the repo.
  It lints frontend and configuration files via **biome** and verifies C#
  code with `dotnet format`.
Always update this `AGENTS.md` with repository changes so LLM agents can operate correctly.

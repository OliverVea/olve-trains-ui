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
- `package.json` – scripts for dev, build, test and lint. These reference
  configuration files under `frontend/` so run them from the repo root.
- `bun run lint` – runs `svelte-check`, `biome lint` and `dotnet format` to
  check front-end, markdown/config files and backend code.
- `frontend/tsconfig.json` includes `node` typings so linters resolve built-in
  modules.
- `README.md` – project overview and quickstart instructions.

Always update this `AGENTS.md` with repository changes so LLM agents can operate
correctly.

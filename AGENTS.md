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
- `scripts/` – helper scripts for preparing a development environment:
  - `setup-bun.sh` installs Bun and runs `bun install`.
  - `setup-dotnet.sh` installs the .NET SDK and pre-restores backend packages.
  - `install-act.sh` installs Docker (if missing) and the `act` CLI for running
    GitHub Actions locally.
  - `setup-agent.sh` runs the above scripts and then sets the `AGENT_SETUP`
    environment variable.
- `package.json` – scripts for dev, build, lint, test and API spec generation. Run `bun run apigen` to regenerate `api/api-spec.json`. These scripts reference configuration files under `frontend/` so run them from the repo root. Dev dependency `@microsoft/kiota` provides the CLI for generating TypeScript API clients from the OpenAPI spec.
- `api/` – generated OpenAPI specification for the backend.
- `docs/` – documentation such as dependency usage guides.
- `README.md` – project overview and quickstart instructions.
- `.github/workflows/ci.yml` – GitHub Actions workflow that runs `bun run lint`
  and `bun run test` on every push and pull request.
## Linting
- Run `bun run lint` to check formatting and style across the repo.
  It lints frontend and configuration files via **biome** and verifies C#
  code with `dotnet format`.
Always update this `AGENTS.md` with repository changes so LLM agents can operate correctly.

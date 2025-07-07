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
  Backend tests live in `backend-tests/` and use
  [TUnit](https://tunit.dev/). Run them with `dotnet test` from the repository root.
  Usage details are in `docs/dependencies/TUnit.md`.
- `scripts/` – helper scripts for preparing a development environment:
  - `setup-bun.sh` installs Bun, runs `bun install`, and sets `BUN_SETUP`.
  - `setup-dotnet.sh` installs the .NET SDK, restores packages, and sets `DOTNET_SETUP`.
  - `install-act.sh` installs Docker (if missing) and the `act` CLI then sets `ACT_SETUP`.
  - `setup-agent.sh` sources the above scripts and exports `AGENT_SETUP`.
    When these variables are present the scripts exit immediately.
- `package.json` – scripts for dev, build, lint, test and API spec generation.
- Run `bun run apigen` to regenerate `api/api-spec.json` and the
  TypeScript client under `frontend/src/generated/api`.
- These scripts reference configuration files under `frontend/` so run
  them from the repo root. Dev dependency `@microsoft/kiota` provides
  the CLI for generating TypeScript clients. The script runs
  `kiota generate --language TypeScript -d api/api-spec.json -o
  frontend/src/generated/api --class-name ApiClient --namespace-name
  Olve.Trains.ApiClient` behind the scenes.
- If the Kiota CLI fails to download (offline), run the `dotnet build` portion
  and manually update `api/api-spec.json` so `IPath` has `{ "type": "string" }`.
- `api/` – generated OpenAPI specification for the backend.
- `README.md` – project overview and quickstart instructions.
- `docs/dependencies/` – usage docs for third-party packages, e.g. `Olve.Results.md` and `TUnit.md`.
- `backend/IPathJsonConverter.cs` – JSON converter for `IPath` using `Path.Create`.
- `backend/RunCommand.cs` – defines `IRunCommandHandler` and a logging
  implementation used by the `/run-command` endpoint.
- `backend/Logs.cs` – contains `LogMessage` and an in-memory
  `IGetLogsHandler` used by the `/logs` endpoint.
- `.github/workflows/ci.yml` – GitHub Actions workflow that runs `bun run lint`
  and `bun run test` on every push and pull request.
## Linting
- Run `bun run lint` to check formatting and style across the repo.
  It lints frontend and configuration files via **biome** and verifies C#
  code with `dotnet format`.
Always update this `AGENTS.md` with repository changes so LLM agents can operate correctly.

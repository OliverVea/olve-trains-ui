# Repository Guidelines

This repository hosts the Olve Trains application.  Today it only contains the
front‑end Svelte application located in `frontend/`, but a backend component will
be introduced later. All commands should continue to be executed from the
repository root using **bun**.

## Layout

- `frontend/` – current Svelte + TypeScript UI. See `frontend/AGENTS.md` for all
  details.
- `dist/` – compiled JavaScript utilities.
- `package.json` – scripts for dev, build and test. These reference
  configuration files under `frontend/` so run them from the repo root.
- `bun run release` – bumps the package version using Conventional Commits and
  updates `CHANGELOG.md`. Creates a git tag.
- `bun run build` – builds the Svelte frontend with hashed asset filenames and
  writes `frontend/public/dist/manifest.json` for deployment.
- `bun run ci` – run the GitHub Actions workflow locally using the act CLI.
- `README.md` – project overview and quickstart instructions.

Always update this `AGENTS.md` with repository changes so LLM agents can operate
correctly.

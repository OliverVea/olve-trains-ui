# Olve Trains

This repository hosts the Olve Trains application. It includes the Svelte +
TypeScript front‑end in `frontend/` and a minimal ASP.NET Core backend under
`backend/`. Integration tests will be added in the future.

## Repository Layout

- `frontend/` – Svelte front‑end UI
- `backend/` – ASP.NET Core Minimal API server
- `docs/dependencies/` – docs for third-party packages such as `Olve.Results.md`

## Getting Started

Install dependencies and start the front-end dev server:

```bash
bun install
bun run dev
```

Build the front-end for production:

```bash
bun run build
```

Run the backend API:

```bash
cd backend
dotnet run
```

## Running Tests

Front-end unit tests run with [Vitest](https://vitest.dev/) using JSDOM and Mock Service Worker.
No backend is required. Run the suite with:

```bash
bun run test
```

## Running GitHub Actions locally

To test workflows defined under `.github/workflows/` without pushing code, use
the `scripts/install-act.sh` script:

```bash
sudo ./scripts/install-act.sh
```

This installs Docker (if necessary) and the [`act` CLI](https://github.com/nektos/act)
for simulating GitHub Actions in Docker. After installing, run workflows with:

```bash
act <event>
```

For example, `act push` executes the `push` jobs locally.

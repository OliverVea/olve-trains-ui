# Olve Trains
[See AGENTS.md for repository guidelines.](./AGENTS.md)

This repository hosts the Olve Trains application. It includes the Svelte +
TypeScript front‑end in `frontend/` and a minimal ASP.NET Core backend under
`backend/`. Integration tests will be added in the future.

## Repository Layout

- `frontend/` – Svelte front‑end UI (see `frontend/AGENTS.md` for details)
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

### Adding Fixtures

1. Place JSON responses under `frontend/tests/fixtures/`.
2. Map endpoints to fixtures in `frontend/tests/handlers.ts` using MSW.
3. Write tests in `frontend/tests/*.test.ts` and import any utilities from `frontend/src/` as needed.

A sample test is provided in `frontend/tests/app.test.ts`.
Integration tests will be introduced alongside the backend as it evolves.


# Olve Trains
[See AGENTS.md for repository guidelines.](./AGENTS.md)

This repository hosts the Olve Trains application. It includes the Svelte +
TypeScript front‑end in `frontend/` and a minimal ASP.NET Core backend under
`backend/`. Integration tests will be added in the future.

## Repository Layout

- `frontend/` – Svelte front‑end UI (see `frontend/AGENTS.md` for details)
- `backend/` – ASP.NET Core Minimal API server

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

## AI-powered Pull Request Reviews

This repository uses [CodeDog](https://codedog.ai) to automatically review every
pull request. The workflow defined in `.github/workflows/codedog-review.yml`
invokes the action with the OpenAI backend.

To enable it, add an `OPENAI_API_KEY` secret under your repository settings. The
key must allow access to the OpenAI API. After pushing a pull request, CodeDog
will comment with a summary highlighting potential bugs, style issues and
missing tests.

A minimal `codedog.yml` controls the model and files to scan. The default
configuration reviews `*.cs` and `*.ts` sources while ignoring Markdown files.

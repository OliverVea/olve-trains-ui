# Olve Trains
[See AGENTS.md for repository guidelines.](./AGENTS.md)

This repository hosts the Olve Trains application. At present it only contains
the Svelte + TypeScript front‑end located in `frontend/`. A backend service and
integration tests will be added in the future.

## Repository Layout

- `frontend/` – Svelte front‑end UI (see `frontend/AGENTS.md` for details)
- `backend/` – server code (coming later)
- `dist/` – compiled JavaScript helpers

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

The build outputs hashed filenames under `frontend/public/dist` and writes a
`manifest.json` mapping entry names to hashed files. Use this manifest when
serving the static HTML.

To create a new release with a semantic version bump and changelog entry run:

```bash
bun run release
```

## Running Tests

Front-end unit tests run with [Vitest](https://vitest.dev/) using JSDOM and Mock Service Worker.
No backend is required. Run the suite with:

```bash
bun run test
```

## Running CI Locally

This project uses GitHub Actions for testing. Install the [act](https://github.com/nektos/act) CLI and run:

```bash
bun run ci
```

To install act on macOS use Homebrew:

```bash
brew install act
```

On Linux download a release from the GitHub page and place the `act` binary somewhere in your `PATH`.


### Adding Fixtures

1. Place JSON responses under `frontend/tests/fixtures/`.
2. Map endpoints to fixtures in `frontend/tests/handlers.ts` using MSW.
3. Write tests in `frontend/tests/*.test.ts` and import any utilities from `frontend/src/` as needed.

A sample test is provided in `frontend/tests/app.test.ts`.
Integration tests will be introduced alongside the upcoming backend.

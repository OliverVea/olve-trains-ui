# Olve Trains UI
[See AGENTS.md for repository guidelines.](./AGENTS.md)

This project is a Svelte + TypeScript web application bundled with Vite.
All front-end code now lives under `frontend/`.

## Getting Started

Install dependencies and start the dev server:

```bash
bun install
bun run dev
```

Build for production:

```bash
bun run build
```

## Running Tests

Unit tests run with [Vitest](https://vitest.dev/) using JSDOM and Mock Service Worker.
No backend is required. Run the suite with:

```bash
bun run test
```

### Adding Fixtures

1. Place JSON responses under `frontend/tests/fixtures/`.
2. Map endpoints to fixtures in `frontend/tests/handlers.ts` using MSW.
3. Write tests in `frontend/tests/*.test.ts` and import any utilities from `frontend/src/` as needed.

A sample test is provided in `frontend/tests/app.test.ts`.

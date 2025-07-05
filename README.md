# Olve Trains UI

This is a vanilla TypeScript web application bundled with esbuild.

## Getting Started

Install dependencies and build the project:

```bash
npm install
npm run build
```

Start the dev server:

```bash
npm run dev
```

## Running Tests

Unit tests run with [Vitest](https://vitest.dev/) using JSDOM and Mock Service Worker.
No backend is required. Run the suite with:

```bash
npm test
```

### Adding Fixtures

1. Place JSON responses under `tests/fixtures/`.
2. Map endpoints to fixtures in `tests/handlers.ts` using MSW.
3. Write tests in `tests/*.test.ts` and import any utilities from `src/` as needed.

A sample test is provided in `tests/app.test.ts`.

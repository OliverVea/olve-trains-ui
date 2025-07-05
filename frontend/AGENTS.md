# Front-end Guidelines

This directory contains the Svelte + TypeScript web application bundled with **Vite**.
All build scripts assume you run them from the repository root using **bun**.

## Layout

- `src/` – TypeScript and `.svelte` source files.
- `src/api/` – API resource specifications shared with the front-end.
- `public/` – static assets including `index.html` and `style.css`.
- `public/dist/` – bundled output from Vite.
- `index.html` – entry HTML file, loads `src/main.ts` via Vite.
- `public/style.css` – global styles used by `index.html`.
- `svelte.config.js` and `vite.config.ts` – build configuration.
- `tsconfig.json` – TypeScript configuration with strict mode enabled and
  includes Node.js typings so `svelte-check` can resolve built-in modules.

## Coding style
- Prefer modern ES6 syntax.
- Use explicit types where possible.
- Keep TypeScript `strict` mode enabled.
- UI code uses Svelte components written in `.svelte` files.

### API resource specs
- Files in `src/api/` define TypeScript interfaces mirroring backend C# records.
- The `ApiError` structure describes failed operations.
- A `Success` marker response is used for endpoints without body data.
- `LogMessage` maps to the server's `LogMessage` struct. Enum `LogLevel` is numeric (0 = Debug, 1 = Info, …).
- All exported interfaces and enums in `src/api/` include documentation comments for clarity.

## Development
- Install dependencies with `bun install` from the repository root.
- Start the dev server with `bun run dev`.
- Build once with `bun run build`.

## Testing
- Tests are written with **Vitest** using the `jsdom` environment.
- Mock Service Worker (MSW) intercepts `fetch` calls; handlers live in `tests/handlers.ts`.
- Fixtures reside in `tests/fixtures/` and are loaded by MSW.
- Run tests with `bun run test`. No backend services are required.
- Sample tests can be found under `tests/` and use Testing Library helpers.

Always update this `AGENTS.md` when the front-end structure or tooling changes.

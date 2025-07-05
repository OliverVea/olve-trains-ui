# Repo Guidelines

This project is a Svelte + TypeScript web application bundled with **Vite**. All front-end code resides under `frontend/`. Source files live in `frontend/src/` and are built to `frontend/public/dist/`.

- `frontend/src/` – TypeScript and `.svelte` source files.
- `frontend/src/api/` – API resource specifications shared with the front-end.
- `frontend/public/` – static assets including `index.html` and `style.css`.
- `frontend/public/dist/` – bundled output from Vite.
- `frontend/index.html` – entry HTML file, loads `src/main.ts` via Vite.
- `frontend/public/style.css` – global styles used by `index.html`.
- `frontend/svelte.config.js` and `frontend/vite.config.ts` – build configuration.
- `frontend/tsconfig.json` – TypeScript configuration with strict mode enabled.
- `package.json` – scripts for building and serving the project with **bun**.
  The scripts reference configuration files under `frontend/`, so run them from
  the repository root.
- `README.md` – project overview and quickstart instructions; links back to this AGENTS file.

## Coding style
- Prefer modern ES6 syntax.
- Use explicit types where possible.
- Keep TypeScript `strict` mode enabled.
- UI code uses Svelte components written in `.svelte` files.

### API resource specs
- Files in `frontend/src/api/` define TypeScript interfaces mirroring backend C# records,
  the `ApiError` structure used for failed operations, and a `Success` marker
  response for endpoints without body data.
- `LogMessage` maps to the server's `LogMessage` struct. Enum `LogLevel` is
  numeric (0 = Debug, 1 = Info, …).
- All exported interfaces and enums in `frontend/src/api/` include documentation
  comments for clarity.

## Development
- Install dependencies with `bun install`.
- Start the dev server with `bun run dev` (Vite) from the repository root.
- Build once with `bun run build`.

Always update this `AGENTS.md` with repository changes or additional guidelines so that LLM agents can correctly operate on the project.

## Testing
- Tests are written with **Vitest** using the `jsdom` environment.
- Mock Service Worker (MSW) intercepts `fetch` calls; handlers live in `frontend/tests/handlers.ts`.
- Fixtures reside in `frontend/tests/fixtures/` and are loaded by MSW.
- Run tests with `bun run test`. No backend services are required.
- Sample tests can be found under `frontend/tests/` and use Testing Library helpers.

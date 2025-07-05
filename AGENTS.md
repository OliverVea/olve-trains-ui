# Repo Guidelines

This project is a vanilla TypeScript web application. Source files live in `src/` and are bundled with **esbuild** into `public/dist/`.

- `src/` – TypeScript source files.
- `src/api/` – API resource specifications and HTTP client. `apiClient.ts`
  exposes `getLogs()` and `sendCommand()` which return either the expected
  data or an array of `ApiError` objects. When a command succeeds it returns
  a `{ success: true }` object defined in `src/api/success.ts`.
- `src/services/` – application services mapping logical operations to API calls.
- `public/` – static assets served by the dev server.
- `public/dist/` – bundled JavaScript output from `esbuild`.
- `public/index.html` – entry HTML file, references `dist/index.js`.
- `public/style.css` – global styles used by `index.html`.
- `tsconfig.json` – TypeScript configuration enabling strict mode and `es2015` modules.
- `package.json` – npm scripts for building and serving the project.
- `README.md` – project overview and quickstart instructions; links back to this AGENTS file.

## Coding style
- Prefer modern ES6 syntax.
- Use explicit types where possible.
- Keep TypeScript `strict` mode enabled.
- No frameworks are used; code is plain TypeScript and DOM APIs.

### API resource specs
- Files in `src/api/` define TypeScript interfaces mirroring backend C# records,
  the `ApiError` structure used for failed operations, and a `Success` marker
  response for endpoints without body data.
- `LogMessage` maps to the server's `LogMessage` struct. Enum `LogLevel` is
  numeric (0 = Debug, 1 = Info, …).
- All exported interfaces and enums in `src/api/` include documentation
  comments for clarity.

## Development
- Install dependencies with `npm install`.
- Build once with `npm run build` (bundles with esbuild).
- Start the dev server with `npm run dev`. It runs esbuild in watch mode and serves the `public/` directory via `lite-server`.

Always update this `AGENTS.md` with repository changes or additional guidelines so that LLM agents can correctly operate on the project.

## Testing
- Tests are written with **Vitest** using the `jsdom` environment.
- Mock Service Worker (MSW) intercepts `fetch` calls; handlers live in `tests/handlers.ts`.
- Fixtures reside in `tests/fixtures/` and are loaded by MSW.
- Run tests with `npm test`. No backend services are required.
- Sample tests can be found under `tests/` and use Testing Library helpers.

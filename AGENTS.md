# Repo Guidelines

This project is a vanilla TypeScript web application. Source files live in `src/` and are bundled with **esbuild** into `public/dist/`.

- `src/` – TypeScript source files.
- `src/api/` – API resource specifications shared with the front-end.
- `public/` – static assets served by the dev server.
- `public/dist/` – bundled JavaScript output from `esbuild`.
- `public/index.html` – entry HTML file, references `dist/index.js`.
- `public/style.css` – global styles used by `index.html`.
- `tsconfig.json` – TypeScript configuration enabling strict mode and `es2015` modules.
- `package.json` – npm scripts for building and serving the project.

## Coding style
- Prefer modern ES6 syntax.
- Use explicit types where possible.
- Keep TypeScript `strict` mode enabled.
- No frameworks are used; code is plain TypeScript and DOM APIs.

### API resource specs
- Files in `src/api/` define TypeScript interfaces mirroring backend C# records.
- `LogMessage` maps to the server's `LogMessage` struct. Enum `LogLevel` is
  numeric (0 = Debug, 1 = Info, …).

## Development
- Install dependencies with `npm install`.
- Build once with `npm run build` (bundles with esbuild).
- Start the dev server with `npm run dev`. It runs esbuild in watch mode and serves the `public/` directory via `lite-server`.

Always update this `AGENTS.md` with repository changes or additional guidelines so that LLM agents can correctly operate on the project.

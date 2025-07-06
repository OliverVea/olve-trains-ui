# Backend Guidelines

This directory hosts the ASP.NET Core Minimal API.

- Built with .NET 9 using `Microsoft.NET.Sdk.Web`.
- `../scripts/setup-dotnet.sh` installs the required .NET SDK and pre-restores
  packages for offline development. Run it once with network access from the
  repository root.
- To run locally:

```bash
cd backend
dotnet run
```

- The API exposes two endpoints:
  - `GET /ping` returns `"pong"`.
  - `POST /command` runs a command provided in the request body and returns
    `400` on failure.
- `Olve.Results` handles errors consistently; see `../docs/dependencies/Olve.Results.md`.
- All C# files use `nullable` reference types and implicit usings.
- Run `bun run lint` to verify formatting with `dotnet format`.
- Generate the OpenAPI spec and TypeScript client with `bun run apigen`.
  This writes `api/api-spec.json` and updates
  `frontend/src/generated/api`.

Keep this file updated with any server changes.

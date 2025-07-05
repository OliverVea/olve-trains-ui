# Backend Guidelines

This directory hosts the ASP.NET Core Minimal API.

- Built with .NET 9 using `Microsoft.NET.Sdk.Web`.
- `setup-dotnet.sh` installs the required .NET SDK and pre-restores packages for
  offline development. Run it once with network access.
- To run locally:

```bash
cd backend
dotnet run
```

- The API exposes a single endpoint `GET /ping` that returns `"pong"`.
- All C# files use `nullable` reference types and implicit usings.
- Run `bun run lint` to verify formatting with `dotnet format`.
 - Generate the OpenAPI spec with `bun run apigen`. This writes
    `api/api-spec.json` at the repository root and refreshes the
    TypeScript client in `frontend/api/` using Kiota.

Keep this file updated with any server changes.

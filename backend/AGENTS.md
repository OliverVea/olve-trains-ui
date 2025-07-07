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

- The API exposes `GET /` returning a simple string.
- `POST /run-command` accepts `{ command: string }` and runs it using
  `IRunCommandHandler`. The default `LoggingRunCommandHandler` just logs
  the command.
- `GET /logs` returns an array of `LogMessage` instances via
  `IGetLogsHandler` which stores messages in memory.
- `Olve.Results` handles errors consistently; see `../docs/dependencies/Olve.Results.md`.
 - `WithResultMapping()` and `WithResultMapping<T>()` convert `Result` and `Result<T>`
   return values to `TypedResults` automatically and register `200` and `400`
   responses for OpenAPI docs.
- See `../docs/dependencies/TUnit.md` for test framework usage.
- All C# files use `nullable` reference types and implicit usings.
- Run `bun run lint` to verify formatting with `dotnet format`.
- Generate the OpenAPI spec and TypeScript client with `bun run apigen`.
  This writes `api/api-spec.json` and updates
  `frontend/src/generated/api`.
- `PathJsonConverter` serializes `IPath` values by calling
  `value.Path` and deserializes with `Path.Create(string)`.

## Testing
Backend tests live in `../backend-tests/` and use the TUnit framework.
Run `dotnet test` in `../backend-tests` to execute them.

Keep this file updated with any server changes.

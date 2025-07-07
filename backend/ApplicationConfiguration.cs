using Microsoft.AspNetCore.Http.HttpResults;
using Olve.Trains.UI.Server.Commands;
using Olve.Trains.UI.Server.Logs;

namespace Olve.Trains.UI.Server;

public static class ApplicationConfiguration
{
    public static WebApplicationBuilder ConfigureApplicationBuilder(this WebApplicationBuilder builder)
    {
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddOpenApi();
        builder.Services.ConfigureHttpJsonOptions(options =>
            options.SerializerOptions.Converters.Add(new PathJsonConverter()));
        builder.Services.AddSingleton<IGetLogsHandler, InMemoryGetLogsHandler>();
        builder.Services.AddSingleton<IRunCommandHandler, LoggingRunCommandHandler>();

        return builder;
    }

    public static WebApplication ConfigureApplication(this WebApplication app)
    {
        app.MapGet("/", () => "Olve.Trains.UI.Server");

        app.MapPost("/run-command", async Task<Results<Ok, BadRequest<ResultProblem[]>>>(
            RunCommandRequest request,
            IRunCommandHandler handler,
            CancellationToken ct) =>
        {
            var result = await handler.RunAsync(request.Command, ct);
            return result.TryPickProblems(out var problems)
                ? TypedResults.BadRequest(problems.ToArray())
                : TypedResults.Ok();
        })
        .WithName("RunCommand")
        .WithOpenApi();

        app.MapGet("/logs", async Task<Results<Ok<IReadOnlyList<LogMessage>>, BadRequest<ResultProblem[]>>>(
            IGetLogsHandler handler,
            CancellationToken ct) =>
            {
                var result = await handler.GetAsync(ct);
                return result.TryPickProblems(out var problems, out var logs)
                    ? TypedResults.BadRequest(problems.ToArray())
                    : TypedResults.Ok(logs);
            })
        .WithName("GetLogs")
        .WithOpenApi();

        return app;
    }
}
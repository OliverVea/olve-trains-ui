using Microsoft.AspNetCore.Http.HttpResults;
using Olve.Results;
namespace Olve.Trains.UI.Server;

public static class ApplicationConfiguration
{
    public static WebApplicationBuilder ConfigureApplicationBuilder(this WebApplicationBuilder builder)
    {
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddOpenApi();
        builder.Services.ConfigureHttpJsonOptions(options =>
            options.SerializerOptions.Converters.Add(new PathJsonConverter()));
        builder.Services.AddSingleton<IRunCommandHandler, LoggingRunCommandHandler>();

        return builder;
    }

    public static WebApplication ConfigureApplication(this WebApplication app)
    {
        app.MapGet("/", () => "Olve.Trains.UI.Server");

        app.MapPost("/run-command", async Task<Results<Ok<SuccessResponse>, BadRequest<ResultProblem[]>>> (
            RunCommandRequest request,
            IRunCommandHandler handler,
            CancellationToken ct) =>
        {
            var result = await handler.RunAsync(request.Command, ct);
            if (result.TryPickProblems(out var problems))
                return TypedResults.BadRequest(problems.ToArray());

            return TypedResults.Ok(new SuccessResponse());
        })
        .WithName("RunCommand")
        .WithOpenApi();

        return app;
    }
}
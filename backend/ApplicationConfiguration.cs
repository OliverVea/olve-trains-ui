using Olve.Trains.UI.Server.Api;
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
        {
            options.SerializerOptions.Converters.Add(new PathJsonConverter());
        });
        
        // Allow all cors
        builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(policy =>
            {
                policy.AllowAnyOrigin()
                      .AllowAnyMethod()
                      .AllowAnyHeader();
            });
        });
        
        builder.Services.AddSingleton<IGetLogsHandler, InMemoryGetLogsHandler>();
        builder.Services.AddSingleton<IRunCommandHandler, LoggingRunCommandHandler>();

        return builder;
    }

    public static WebApplication ConfigureApplication(this WebApplication app)
    {
        app.UseCors();

        app.MapPost("/run-command", (
                    RunCommandRequest request,
                    IRunCommandHandler handler,
                    CancellationToken ct) =>
                handler.RunAsync(request.Command, ct))
            .WithResultMapping()
            .WithName("RunCommand")
            .WithOpenApi();

        app.MapGet("/logs", (
                IGetLogsHandler handler,
                CancellationToken ct) => handler.GetAsync(ct))
            .WithResultMapping<IReadOnlyList<LogMessage>>()
            .WithName("GetLogs")
            .WithOpenApi();

        return app;
    }
}
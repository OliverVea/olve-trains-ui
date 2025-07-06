namespace Olve.Trains.UI.Server;

public static class ApplicationConfiguration
{
    public static WebApplicationBuilder ConfigureApplicationBuilder(this WebApplicationBuilder builder)
    {
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddOpenApi();
        builder.Services.ConfigureHttpJsonOptions(options => options.SerializerOptions.Converters.Add(new PathJsonConverter()));

        return builder;
    }

    public static WebApplication ConfigureApplication(this WebApplication app)
    {
        app.MapGet("/", () => "Olve.Trains.UI.Server");
        
        return app;
    }
}
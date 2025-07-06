using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Mvc;
using Olve.Trains.Backend;
using Olve.Results;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Http;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();
builder.Services.AddSingleton<IRunCommandHandler, ConsoleRunCommandHandler>();
var app = builder.Build();

app.MapGet("/ping", () => "pong").WithOpenApi();
app.MapPost("/command", async Task<Results<Ok, BadRequest<IEnumerable<ResultProblem>>>> ([FromBody] string command, IRunCommandHandler handler) =>
{
    var result = await handler.RunAsync(command);
    if (result.TryPickProblems(out var problems))
    {
        return TypedResults.BadRequest<IEnumerable<ResultProblem>>(problems);
    }
    return TypedResults.Ok();
})
    .Produces(StatusCodes.Status200OK)
    .Produces<IEnumerable<ResultProblem>>(StatusCodes.Status400BadRequest)
    .WithOpenApi();

app.Run();

using Olve.Results;
using Microsoft.Extensions.Logging;
namespace Olve.Trains.UI.Server;

public sealed record RunCommandRequest(string Command);

public interface IRunCommandHandler
{
    Task<Result> RunAsync(string command, CancellationToken cancellationToken);
}

public sealed class LoggingRunCommandHandler : IRunCommandHandler
{
    private readonly ILogger<LoggingRunCommandHandler> _logger;

    public LoggingRunCommandHandler(ILogger<LoggingRunCommandHandler> logger)
    {
        _logger = logger;
    }

    public Task<Result> RunAsync(string command, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Run command: {Command}", command);
        return Task.FromResult(Result.Success());
    }
}

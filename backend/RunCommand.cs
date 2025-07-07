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
    private readonly IGetLogsHandler _logs;

    public LoggingRunCommandHandler(ILogger<LoggingRunCommandHandler> logger, IGetLogsHandler logs)
    {
        _logger = logger;
        _logs = logs;
    }

    public Task<Result> RunAsync(string command, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Run command: {Command}", command);
        _logs.Add(new LogMessage(LogLevel.Info, command, null, null, DateTime.UtcNow, null));
        return Task.FromResult(Result.Success());
    }
}

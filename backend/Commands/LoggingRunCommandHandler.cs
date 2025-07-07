using Olve.Results;
using Olve.Trains.UI.Server.Logs;
using LogLevel = Olve.Trains.UI.Server.Logs.LogLevel;

namespace Olve.Trains.UI.Server.Commands;

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
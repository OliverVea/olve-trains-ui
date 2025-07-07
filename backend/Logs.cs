using Olve.Paths;

namespace Olve.Trains.UI.Server;

public enum LogLevel
{
    Debug = 0,
    Info,
    Warning,
    Error,
    Critical
}

public sealed record LogMessage(
    LogLevel Level,
    string Message,
    IPath? SourcePath,
    int? SourceLine,
    DateTime Time,
    string[]? Tags
);

public interface IGetLogsHandler
{
    Task<IReadOnlyList<LogMessage>> GetAsync(CancellationToken cancellationToken);
    void Add(LogMessage log);
}

public sealed class InMemoryGetLogsHandler : IGetLogsHandler
{
    private readonly List<LogMessage> _logs = new();

    public Task<IReadOnlyList<LogMessage>> GetAsync(CancellationToken cancellationToken)
    {
        IReadOnlyList<LogMessage> result = _logs.ToArray();
        return Task.FromResult(result);
    }

    public void Add(LogMessage log)
    {
        _logs.Add(log);
    }
}

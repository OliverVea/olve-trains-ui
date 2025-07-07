using Olve.Results;

namespace Olve.Trains.UI.Server.Logs;

public sealed class InMemoryGetLogsHandler : IGetLogsHandler
{
    private readonly List<LogMessage> _logs = new();

    public Task<Result<IReadOnlyList<LogMessage>>> GetAsync(CancellationToken cancellationToken)
    {
        var logs = _logs.ToArray();
        var result = Result<IReadOnlyList<LogMessage>>.Success(logs);

        return Task.FromResult(result);
    }

    public void Add(LogMessage log)
    {
        _logs.Add(log);
    }
}

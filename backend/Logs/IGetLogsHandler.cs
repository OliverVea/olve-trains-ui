using Olve.Results;

namespace Olve.Trains.UI.Server.Logs;

public interface IGetLogsHandler
{
    Task<Result<IReadOnlyList<LogMessage>>> GetAsync(CancellationToken cancellationToken);
    void Add(LogMessage log);
}
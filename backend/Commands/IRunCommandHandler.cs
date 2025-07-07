using Olve.Results;

namespace Olve.Trains.UI.Server.Commands;

public interface IRunCommandHandler
{
    Task<Result> RunAsync(string command, CancellationToken cancellationToken);
}
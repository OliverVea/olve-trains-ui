namespace Olve.Trains.Backend;

using Olve.Results;

public interface IRunCommandHandler
{
    Task<Result> RunAsync(string command);
}

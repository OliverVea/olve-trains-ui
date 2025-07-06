namespace Olve.Trains.Backend;

using Olve.Results;

public class ConsoleRunCommandHandler : IRunCommandHandler
{
    public Task<Result> RunAsync(string command)
    {
        Console.WriteLine($"Running command: {command}");
        return Task.FromResult(Result.Success());
    }
}

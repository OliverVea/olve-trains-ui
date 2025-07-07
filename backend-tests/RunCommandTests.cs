using Microsoft.Extensions.Logging.Abstractions;
using Olve.Trains.UI.Server.Commands;
using Olve.Trains.UI.Server.Logs;

namespace Olve.Trains.UI.Server.Tests;

public class RunCommandTests
{
    [Test]
    public async Task RunCommand_Adds_Log_Message()
    {
        var logs = new InMemoryGetLogsHandler();
        var logger = NullLogger<LoggingRunCommandHandler>.Instance;
        var handler = new LoggingRunCommandHandler(logger, logs);

        await handler.RunAsync("sample", CancellationToken.None);

        var result = await logs.GetAsync(CancellationToken.None);
        await Assert.That(result.TryPickProblems(out var problems, out var entries)).IsFalse();
        await Assert.That(entries).HasCount(1);
        await Assert.That(entries![0].Message).IsEqualTo("sample");
    }
}


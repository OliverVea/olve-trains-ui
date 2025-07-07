namespace Olve.Trains.UI.Server.Logs;

public sealed record LogMessage(
    LogLevel Level,
    string Message,
    IPath? SourcePath,
    int? SourceLine,
    DateTime Time,
    string[]? Tags
);
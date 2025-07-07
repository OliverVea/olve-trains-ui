using System.Text.Json.Serialization;
using Olve.Trains.UI.Server.Api;

namespace Olve.Trains.UI.Server.Logs;

public sealed record LogMessage(
    LogLevel Level,
    string Message,
    [property: JsonConverter(typeof(PathJsonConverter))]
    IPath? SourcePath,
    int? SourceLine,
    DateTime Time,
    string[]? Tags
);
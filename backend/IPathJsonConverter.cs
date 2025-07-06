using System.Text.Json;
using System.Text.Json.Serialization;
using Olve.Paths;

namespace Olve.Trains.UI.Server;

public sealed class PathJsonConverter : JsonConverter<IPath>
{
    public override IPath? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        var pathString = reader.GetString();
        return pathString is null ? null : Paths.Path.Create(pathString);
    }

    public override void Write(Utf8JsonWriter writer, IPath value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.Path);
    }
}

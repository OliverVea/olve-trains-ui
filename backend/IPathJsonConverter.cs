using System;
using System.Text.Json;
using System.Text.Json.Serialization;
using Olve.Paths;

namespace Backend.Serialization;

public sealed class IPathJsonConverter : JsonConverter<IPath>
{
    public override IPath? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        var pathString = reader.GetString();
        return pathString is null ? null : Olve.Paths.Path.Create(pathString);
    }

    public override void Write(Utf8JsonWriter writer, IPath value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.Path);
    }
}

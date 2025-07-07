using System.Reflection;
using Microsoft.AspNetCore.Http;

namespace Olve.Trains.UI.Server;

public static class ResultMappingExtensions
{
    public static RouteHandlerBuilder WithResultMapping(this RouteHandlerBuilder builder)
    {
        return builder.AddEndpointFilterFactory((context, next) =>
        {
            var returnType = context.MethodInfo.ReturnType;
            bool isTask = typeof(Task).IsAssignableFrom(returnType);
            if (isTask && returnType.IsGenericType)
                returnType = returnType.GenericTypeArguments[0];

            bool isResult = returnType == typeof(Result);
            bool isGenericResult = returnType.IsGenericType && returnType.GetGenericTypeDefinition() == typeof(Result<>);

            if (!isResult && !isGenericResult)
                return next;

            return async invocationContext =>
            {
                var result = await next(invocationContext);
                if (result is Result r)
                    return r.ToHttpResult();

                var type = result!.GetType();
                if (type.IsGenericType && type.GetGenericTypeDefinition() == typeof(Result<>))
                {
                    var method = typeof(ResultMappingExtensions).GetMethod(nameof(MapGenericResult), BindingFlags.NonPublic | BindingFlags.Static)!
                        .MakeGenericMethod(type.GenericTypeArguments[0]);
                    return (IResult)method.Invoke(null, new[] { result })!;
                }

                return result;
            };
        });
    }

    public static IResult ToHttpResult(this Result result)
    {
        return result.TryPickProblems(out var problems)
            ? TypedResults.BadRequest(problems.ToArray())
            : TypedResults.Ok();
    }

    public static IResult ToHttpResult<T>(this Result<T> result)
    {
        return result.TryPickProblems(out var problems, out var value)
            ? TypedResults.BadRequest(problems.ToArray())
            : TypedResults.Ok(value);
    }

    private static IResult MapGenericResult<T>(Result<T> result) => result.ToHttpResult();
}


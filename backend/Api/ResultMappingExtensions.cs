using System.Reflection;

namespace Olve.Trains.UI.Server.Api;

public static class ResultMappingExtensions
{
    public static RouteHandlerBuilder WithResultMapping(this RouteHandlerBuilder builder)
    {
        builder.Produces(StatusCodes.Status200OK)
               .Produces<ResultProblem[]>(StatusCodes.Status400BadRequest);
        
        return AddResultFilter(builder);
    }

    public static RouteHandlerBuilder WithResultMapping<T>(this RouteHandlerBuilder builder)
    {
        builder.Produces<T>()
               .Produces<ResultProblem[]>(StatusCodes.Status400BadRequest);
        
        return AddResultFilter(builder);
    }

    private static RouteHandlerBuilder AddResultFilter(RouteHandlerBuilder builder)
    {
        return builder.AddEndpointFilterFactory((context, next) =>
        {
            var returnType = context.MethodInfo.ReturnType;
            var isTask = typeof(Task).IsAssignableFrom(returnType);
            if (isTask && returnType.IsGenericType)
            {
                returnType = returnType.GenericTypeArguments[0];
            }

            var isResult = returnType == typeof(Result);
            var isGenericResult = returnType.IsGenericType && returnType.GetGenericTypeDefinition() == typeof(Result<>);

            if (!isResult && !isGenericResult)
            {
                return next;
            }

            return async invocationContext =>
            {
                var result = await next(invocationContext);
                if (result is Result r)
                    return r.ToHttpResult();

                var type = result!.GetType();
                if (!type.IsGenericType || type.GetGenericTypeDefinition() != typeof(Result<>))
                {
                    return result;
                }
                
                var method = typeof(ResultMappingExtensions).GetMethod(nameof(MapGenericResult), BindingFlags.NonPublic | BindingFlags.Static)!
                    .MakeGenericMethod(type.GenericTypeArguments[0]);
                
                return (IResult)method.Invoke(null, [result])!;

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


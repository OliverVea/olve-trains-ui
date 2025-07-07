using Microsoft.AspNetCore.Http.HttpResults;
using Olve.Results;
using Olve.Trains.UI.Server;
using Olve.Trains.UI.Server.Api;

namespace Olve.Trains.UI.Server.Tests;

public class ResultMappingTests
{
    [Test]
    public async Task ToHttpResult_Returns_Ok_For_Success()
    {
        var result = Result.Success();
        var http = result.ToHttpResult();
        await Assert.That(http).IsTypeOf<Ok>();
    }

    [Test]
    public async Task ToHttpResult_Returns_BadRequest_For_Problems()
    {
        var problem = new ResultProblem("fail", null, null, null, null);
        var result = Result.Failure(problem);
        var http = result.ToHttpResult();
        await Assert.That(http).IsTypeOf<BadRequest<ResultProblem[]>>();
    }

    [Test]
    public async Task ToHttpResultT_Maps_Value()
    {
        var result = Result<int>.Success(5);
        var http = result.ToHttpResult();
        await Assert.That(http).IsTypeOf<Ok<int>>();
    }
}


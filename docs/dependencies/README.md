# Olve.Results Usage Guide

This document explains how to use `Olve.Results` in this repository. The library provides lightweight result types to replace exceptions in application code.

## Core Types

- `Result` – represents success or failure without a value. Create with `Result.Success()` or `Result.Failure(IEnumerable<ResultProblem>)`.
- `Result<T>` – same as `Result` but carries a value on success. Use `Result<T>.Success(value)` or `Result<T>.Failure(...)`.
- `DeletionResult` – specialized result for delete operations. Distinguishes between success, not found, and error states.
- `ResultProblem` – describes a single problem and captures file and line information automatically.
- `ResultProblemCollection` – enumerable wrapper over multiple problems with helpers such as `Append`, `Prepend` and `Merge`.

## Helpers

- `Result.Chain` – execute functions in order, stopping at the first failure.
- `Result.Concat` – execute multiple functions and collect their values if all succeed.
- `Result.Try` – convert exceptions into `ResultProblem` instances.
- `IfProblem` – run an action if the result has problems, often used to add context.
- `ResultEnumerableExtensions` – utilities for lists of results: `HasProblems`, `TryPickProblems`, `GetValues` and `GetProblems`.
- `ResultFuncExtensions` – turn `Action<T>` into `Func<T, Result>` for chaining.

## Usage Patterns

1. **Return Results**
   Every significant operation returns `Result` or `Result<T>`:
   ```csharp
   public Result<Id<Track>> AddTrack(TrackPoint start, TrackPoint end)
   {
       var track = new Track(Id<Track>.New(), start, end);
       _tracks.Add(track.Id, track);
       return track.Id;
   }
   ```

2. **Check for Problems Immediately**
   Use `TryPickProblems` after each call. Add context using `Prepend`:
   ```csharp
   var terrainResult = terrainLoader.Load().IfProblem(p => p.Prepend("loading terrain"));
   if (terrainResult.TryPickProblems(out var problems))
       return problems;
   ```

3. **Chaining Operations**
   Combine multiple steps with `Result.Chain` or `Result.Concat`:
   ```csharp
   private Result<(GL, IInputContext)> SetupContexts() =>
       Result.Concat(
           () => Result.Try<GL>(() => window.CreateOpenGL(), "Error creating GL"),
           () => Result.Try<IInputContext>(() => window.CreateInput(), "Error creating input")
       );
   ```

4. **Collecting Problems Across Services**
   Use `ResultEnumerableExtensions.TryPickProblems` to aggregate failures:
   ```csharp
   foreach (var service in _sceneServices)
       _loadResults.Add(service.Load());

   if (_loadResults.TryPickProblems(out var problems))
       return problems.Prepend("scene load failed");
   ```

5. **Logging Problems**
   Convert problems to readable messages before logging:
   ```csharp
   if (result.TryPickProblems(out var problems))
       foreach (var problem in problems)
           Console.WriteLine(problem.ToDebugString());
   ```

## Best Practices

- Always prefer `Result`/`Result<T>` over exceptions for predictable control flow.
- Annotate problems with additional context using `Prepend` when propagating errors.
- Use `Result.Try` around operations that may throw.
- `IfProblem` is useful for minor adjustments without branching.
- Return `DeletionResult.NotFound()` when a delete target does not exist.
- Collect results from multiple services and merge problems for centralized error handling.

Following these patterns keeps error handling explicit and consistent across the codebase.


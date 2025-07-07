# TUnit Usage Guide

This document explains how to write and run tests with [TUnit](https://tunit.dev/).
TUnit generates tests at compile time and executes them with the new Microsoft Testing Platform.

## Project Setup
- Add the `TUnit` NuGet package to your test project.
- Target `net9.0` and output an `Exe` assembly.
- Reference the project under test via `ProjectReference`.

## Running Tests
- Invoke `dotnet test` or `dotnet run` on the test project.
- Tests are discovered at build time; no reflection is used.
- Parallel execution is enabled by default.

## Test Attributes
- `[Test]` marks a method as a test.
- `[Arguments]` provides data-driven inputs.
- `[DependsOn]` controls execution order.
- `[Retry]` reruns a failing test the specified number of times.
- `[ParallelLimit]` restricts concurrent execution.

## Fluent Assertions
TUnit ships its own assertion library:
```csharp
await Assert.That(result.IsSuccess).IsTrue();
await Assert.That(value).IsEqualTo(42);
```

Use these helpers for asynchronous conditions and rich diagnostics.

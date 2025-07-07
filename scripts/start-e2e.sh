#!/bin/sh
set -e

bun run dev &
DEV_PID=$!

dotnet run --project backend/Olve.Trains.UI.Server.csproj &
API_PID=$!

trap 'kill $DEV_PID $API_PID' EXIT

wait $DEV_PID $API_PID

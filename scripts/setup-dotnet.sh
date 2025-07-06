#!/usr/bin/env bash
set -euo pipefail

if [[ -n "${AGENT_SETUP:-}" ]]; then
  echo "AGENT_SETUP is set. These scripts are only for setting up the agent." >&2
  exit 1
fi

# Path to your .csproj file (relative to repository root)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
PROJECT_PATH="$REPO_ROOT/backend/Olve.Trains.UI.Server.csproj"

# .NET SDK version to install
SDK_VERSION="9.0"

# Ensure the project file exists
if [[ ! -f "$PROJECT_PATH" ]]; then
  echo "ERROR: Project file not found at '$PROJECT_PATH'"
  exit 1
fi

# --- Add Microsoft package source for Ubuntu 22.04 ---
wget -q https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb \
  -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
rm packages-microsoft-prod.deb

# --- Install prerequisites ---
sudo apt-get update
sudo apt-get install -y apt-transport-https

# --- Install the .NET SDK ---
sudo apt-get update
sudo apt-get install -y "dotnet-sdk-${SDK_VERSION}"

# Verify installation
echo "Installed .NET SDK version:"
dotnet --version

# --- Restore packages (requires network) ---
echo "Restoring packages for $PROJECT_PATH..."
dotnet restore "$PROJECT_PATH"

# --- Optionally build & test while online ---
echo "Building $PROJECT_PATH (no restore)..."
dotnet build "$PROJECT_PATH" --no-restore

echo "Running tests for $PROJECT_PATH (no build/restore)..."
dotnet test "$PROJECT_PATH" --no-build --no-restore

echo "✅ Setup and pre-restore completed. Container is now ready for offline use."

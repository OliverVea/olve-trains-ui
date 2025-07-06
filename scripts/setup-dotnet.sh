#!/usr/bin/env bash
set -euo pipefail

if [[ -n "${AGENT_SETUP:-}" ]]; then
  echo "AGENT_SETUP is set – aborting." >&2
  exit 1
fi

# Locate project
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_PATH="$SCRIPT_DIR/../backend/Olve.Trains.UI.Server.csproj"

[[ -f "$PROJECT_PATH" ]] || { echo "ERROR: $PROJECT_PATH not found." >&2; exit 1; }

SDK_VERSION="9.0"

# Add MS package source (quiet)
wget -q https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb \
     -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb >/dev/null
rm packages-microsoft-prod.deb

# Update & install prerequisites (very quiet)
sudo apt-get update -qq
sudo apt-get install -y -qq apt-transport-https

# Install .NET SDK (very quiet)
sudo apt-get update -qq
sudo apt-get install -y -qq "dotnet-sdk-${SDK_VERSION}"

# Verify installation
dotnet --version

# Restore (quiet)
dotnet restore "$PROJECT_PATH" --verbosity quiet

# Build & test (minimal output)
dotnet build "$PROJECT_PATH" --no-restore --verbosity minimal
dotnet test  "$PROJECT_PATH" --no-build   --verbosity minimal

echo "✅ Ready for offline use."

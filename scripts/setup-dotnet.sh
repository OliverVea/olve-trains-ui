#!/usr/bin/env bash
set -euo pipefail

# Guard: must be sourced
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  echo "Error: please run setup-agent.sh (not setup-dotnet.sh) directly." >&2
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# only once via environment variable
if [[ -n "${DOTNET_SETUP:-}" ]]; then
  return 0
fi

PROJECT_PATH="$SCRIPT_DIR/../backend/Olve.Trains.UI.Server.csproj"
[[ -f "$PROJECT_PATH" ]] || { echo "ERROR: $PROJECT_PATH not found." >&2; exit 1; }

SDK_VERSION="9.0"
wget -q https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb \
     -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb >/dev/null
rm packages-microsoft-prod.deb

sudo apt-get update -qq
sudo apt-get install -y -qq apt-transport-https
sudo apt-get update -qq
sudo apt-get install -y -qq "dotnet-sdk-${SDK_VERSION}"

dotnet --version
dotnet restore "$PROJECT_PATH" --verbosity quiet
dotnet build   "$PROJECT_PATH" --no-restore --verbosity minimal
dotnet test    "$PROJECT_PATH" --no-build   --verbosity minimal

dotnet tool install --global Microsoft.OpenApi.Kiota

echo "✅ .NET setup complete."
export DOTNET_SETUP=1

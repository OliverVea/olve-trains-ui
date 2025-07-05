#!/usr/bin/env bash
set -euo pipefail

# -----------------------------------------------------------------------------
# setup-bun.sh
#
# Installs Bun if it is not already available and installs repository
# dependencies using `bun install`.
# -----------------------------------------------------------------------------

if ! command -v bun >/dev/null 2>&1; then
  echo "Bun not found. Installing..."
  curl -fsSL https://bun.sh/install | bash
  export PATH="$HOME/.bun/bin:$PATH"
fi

# Run bun install from the repository root (directory of this script)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

bun install

echo "✅ Bun setup complete."

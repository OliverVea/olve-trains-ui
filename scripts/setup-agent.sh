#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MARKER="$SCRIPT_DIR/.agent_setup_done"

# 1. only ever run once
if [[ -f "$MARKER" ]]; then
  echo "Agent already set up; skipping."
  exit 0
fi

# 2. source each child (so, e.g., PATH changes persist)
#    child scripts themselves will guard against direct execution
. "$SCRIPT_DIR/setup-bun.sh"
. "$SCRIPT_DIR/setup-dotnet.sh"
# . "$SCRIPT_DIR/install-act.sh"

# 3. mark the whole thing done
touch "$MARKER"
echo "✅ Agent setup complete."

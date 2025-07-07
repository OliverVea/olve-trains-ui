#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 1. only ever run once via environment variable
if [[ -n "${AGENT_SETUP:-}" ]]; then
  echo "Agent already set up; skipping."
  [[ "${BASH_SOURCE[0]}" != "${0}" ]] && return 0 || exit 0
fi

# 2. source each child (so, e.g., PATH changes persist)
#    child scripts themselves will guard against direct execution
. "$SCRIPT_DIR/setup-bun.sh"
. "$SCRIPT_DIR/setup-dotnet.sh"
# . "$SCRIPT_DIR/install-act.sh"

# 3. mark the whole thing done
export AGENT_SETUP=1
echo "✅ Agent setup complete."

#!/usr/bin/env bash
set -euo pipefail

if [[ -n "${AGENT_SETUP:-}" ]]; then
  echo "AGENT_SETUP is set. These scripts are only for setting up the agent." >&2
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

"$SCRIPT_DIR/setup-bun.sh"
"$SCRIPT_DIR/setup-dotnet.sh"
#"$SCRIPT_DIR/install-act.sh"

export AGENT_SETUP=1

echo "Agent setup complete. AGENT_SETUP variable set."

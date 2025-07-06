#!/usr/bin/env bash
set -euo pipefail

# Guard: must be *sourced* from setup-agent.sh, not executed directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  echo "Error: please run setup-agent.sh (not setup-bun.sh) directly." >&2
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
STEP_MARKER="$SCRIPT_DIR/.bun_setup_done"

# Idempotent: only run once
if [[ -f "$STEP_MARKER" ]]; then
  return 0
fi

# your existing bun-install logic
if ! command -v bun >/dev/null 2>&1; then
  echo "Bun not found. Installing…"
  curl -fsSL https://bun.sh/install | bash
  export PATH="$HOME/.bun/bin:$PATH"
fi

bun install
echo "✅ Bun setup complete."

# record that we ran
touch "$STEP_MARKER"

#!/usr/bin/env bash
set -euo pipefail

# Guard: must be *sourced* from setup-agent.sh, not executed directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  echo "Error: please run setup-agent.sh (not setup-bun.sh) directly." >&2
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Idempotent: skip if BUN_SETUP is already set
if [[ -n "${BUN_SETUP:-}" ]]; then
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
export BUN_SETUP=1

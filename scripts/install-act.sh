#!/usr/bin/env bash
set -euo pipefail

if [[ -n "${AGENT_SETUP:-}" ]]; then
  echo "AGENT_SETUP is set. These scripts are only for setting up the agent." >&2
  exit 1
fi

# -----------------------------------------------------------------------------
# install-act.sh
#
# Installs Docker (if missing) and act (https://github.com/nektos/act v0.2.79)
# so you can run GitHub Workflows locally in Docker.
#
# Usage: sudo ./install-act.sh
# -----------------------------------------------------------------------------

# Desired act version; change as needed
ACT_VERSION="0.2.79"

# Detect OS
OS="$(uname -s | tr '[:upper:]' '[:lower:]')"
ARCH="$(uname -m)"

# Normalize architecture name for act releases
case "$ARCH" in
  x86_64) ARCH="amd64" ;;
  aarch64|arm64) ARCH="arm64" ;;
  *) echo "Unsupported architecture: $ARCH"; exit 1 ;;
esac

# 1. Ensure Docker is installed
if ! command -v docker &>/dev/null; then
  echo "Docker not found. Installing Docker..."
  if [[ "$OS" == "linux" ]]; then
    # Install Docker on Ubuntu/Debian
    curl -fsSL https://get.docker.com | sh
    sudo usermod -aG docker "$USER"
  elif [[ "$OS" == "darwin" ]]; then
    echo "Please install Docker Desktop for Mac from https://www.docker.com/products/docker-desktop"
    exit 1
  else
    echo "Cannot install Docker automatically on $OS."
    exit 1
  fi
else
  echo "Docker is already installed."
fi

# 2. Download and install act
if ! command -v act &>/dev/null; then
  echo "Installing act v${ACT_VERSION}..."
  TMPDIR="$(mktemp -d)"
  pushd "$TMPDIR" >/dev/null

  ACT_TAR="act_${ACT_VERSION}_${OS}_${ARCH}.tar.gz"
  ACT_URL="https://github.com/nektos/act/releases/download/v${ACT_VERSION}/${ACT_TAR}"

  echo " → Fetching $ACT_URL"
  curl -LO "$ACT_URL"

  echo " → Extracting binary"
  tar xzf "$ACT_TAR" act

  echo " → Moving to /usr/local/bin"
  sudo mv act /usr/local/bin/
  sudo chmod +x /usr/local/bin/act

  popd >/dev/null
  rm -rf "$TMPDIR"
else
  echo "act is already installed at $(command -v act)"
fi

# 3. Verify installation
echo
echo "Installation complete. Versions:"
docker --version
act --version

echo
echo "Next steps:"
echo " 1. cd into your repo containing .github/workflows/"
echo " 2. Run 'act [event]' (e.g. 'act push') to execute your workflows locally."
echo " 3. Add '-P ubuntu-latest=nektos/act-environments-ubuntu:18.04' if you need the official image."

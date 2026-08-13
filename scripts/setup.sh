#!/usr/bin/env bash
set -e

echo "Setting up AI Engineer environment..."
uv venv
source .venv/bin/activate
echo "Environment setup complete."

#!/bin/bash
# Sync art-design-pro from upstream vendor

set -e

cd "$(dirname "$0")/../apps/art-design-pro"

echo "Fetching latest from upstream vendor..."
git fetch vendor

echo "Current branch: $(git branch --show-current)"
echo "Latest vendor commit: $(git log --oneline vendor/main -1)"

echo ""
echo "To merge upstream changes into your fork/worktree, run:"
echo "  cd apps/art-design-pro"
echo "  git merge vendor/main"
echo ""
echo "Or if you have a fork with origin set:"
echo "  git merge vendor/main"
echo "  git push origin <your-branch>"
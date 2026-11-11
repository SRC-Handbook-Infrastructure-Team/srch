#!/bin/bash

# Deployment script for SRCH website (run from repo root)
# Usage: ./deploy.sh <username>
#
# <username> is your Brown CS login (not necessarily your Brown email local-part,
# i.e. the bit before @ in you@brown.edu).
# Set up SSH access (keys, first login): https://cs.brown.edu/about/system/connecting/ssh/

set -e  # Exit on error

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT_DIR"

if [ -z "$1" ]; then
  echo "Error: Username is required"
  echo "Usage: ./deploy.sh <username>"
  exit 1
fi

USERNAME=$1
SERVER="ssh.cs.brown.edu"
DEPLOY_PATH="/web/cs/web/sites/srch"

echo "Building website ..."
npm run --workspace=website build

echo "Uploading build files..."
scp -r website/dist/* "$USERNAME@$SERVER:$DEPLOY_PATH/"

echo "Setting permissions..."
ssh "$USERNAME@$SERVER" << 'EOF'
cd /web/cs/web/sites/srch
chgrp -R cs-responsible .
find . -type d -exec chmod 775 {} +
find . -type f -exec chmod 664 {} +
echo "Deployment complete!"
EOF

echo "Changes should be live at https://srch.cs.brown.edu/"

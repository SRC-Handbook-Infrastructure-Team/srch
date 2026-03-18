#!/bin/bash

# Deployment script for SRCH website
# Usage: ./deploy.sh <username>
# Example: ./deploy.sh willtolmie

set -e  # Exit on error

if [ -z "$1" ]; then
  echo "Error: Username required"
  echo "Usage: ./deploy.sh <username>"
  exit 1
fi

USERNAME=$1
SERVER="ssh.cs.brown.edu"
DEPLOY_PATH="/web/cs/web/sites/srch"

echo "🔨 Building project..."
npm run build

echo "📦 Uploading build files..."
scp -r dist/* "$USERNAME@$SERVER:$DEPLOY_PATH/"

echo "🔐 Setting permissions..."
ssh "$USERNAME@$SERVER" << 'EOF'
cd /web/cs/web/sites/srch
chgrp -R cs-responsible .
chmod 644 index.html
chmod -R 755 assets
echo "Deployment complete!"
EOF

echo "Changes should be live at https://src-handbook-infrastructure-team.github.io/srch"

#!/bin/bash

# Deployment script for SRCH website
# Usage: ./deploy.sh <username> <api_base_url>

set -e  # Exit on error

if [ -z "$1" ] || [ -z "$2" ]; then
  echo "Error: Username and API base URL are required"
  echo "Usage: ./deploy.sh <username> <api_base_url>"
  exit 1
fi

USERNAME=$1
API_BASE_URL=$2
SERVER="ssh.cs.brown.edu"
DEPLOY_PATH="/web/cs/web/sites/srch"

echo "Building project with VITE_API_BASE_URL=$API_BASE_URL ..."
VITE_API_BASE_URL="$API_BASE_URL" npm run build

echo "Uploading build files..."
scp -r dist/* "$USERNAME@$SERVER:$DEPLOY_PATH/"

echo "Setting permissions..."
ssh "$USERNAME@$SERVER" << 'EOF'
cd /web/cs/web/sites/srch
chgrp -R cs-responsible .
chmod 644 index.html
chmod -R 755 assets
echo "Deployment complete!"
EOF

echo "Changes should be live at https://srch.cs.brown.edu/"

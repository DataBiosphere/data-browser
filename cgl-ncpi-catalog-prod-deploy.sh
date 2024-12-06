#!/usr/bin/env bash
# Set the script to exit immediately on error
set -e

echo \"Deleting ./out/\"
rm -rf ./out

n 20.10.0
npm ci

# Build
npm run build-prod:ncpi-catalog

export BUCKET=s3://l5s-ncpi-data.org/
export SRCDIR=out/

aws s3 sync  $SRCDIR $BUCKET --delete  --profile platform-anvil-portal
aws cloudfront create-invalidation --distribution-id E2A2L53F8OOPRW --paths "/*" --profile platform-anvil-portal
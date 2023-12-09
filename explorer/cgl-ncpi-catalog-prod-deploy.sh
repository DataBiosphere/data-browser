#!/usr/bin/env bash
# Set the script to exit immediately on error
set -e

echo \"Deleting ./out/\"
rm -rf ./out

n 16.15.1
npm ci

# Build
npm run build-prod:ncpi-catalog

export BUCKET=s3://TODO/
export SRCDIR=out/a

aws s3 sync  $SRCDIR $BUCKET --delete  --profile platform-anvil-portal
aws cloudfront create-invalidation --distribution-id TODO --paths "/*" --profile platform-anvil-portal
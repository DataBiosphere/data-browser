#!/usr/bin/env bash
# Set the script to exit immediately on error
set -e

echo \"Deleting ./out/\"
rm -rf ./out

n 20.10.0
npm ci

# Build
npm run build-dev:ncpi-catalog

export BUCKET=s3://g78-ncpi-data.humancellatlas.dev/
export SRCDIR=out/

aws s3 sync  $SRCDIR $BUCKET --delete --profile excira
aws cloudfront create-invalidation --distribution-id EJ5E27A5IGM2B --paths "/*" --profile excira
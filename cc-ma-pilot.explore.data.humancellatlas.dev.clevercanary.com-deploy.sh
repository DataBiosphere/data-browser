#!/usr/bin/env bash
# Set the script to exit immediately on error
set -e

echo \"Deleting ./out/\"
rm -rf ./out

n 20.10.0
npm ci

# Build
npm run build-cc-ma-dev:hca-dcp

export BUCKET=s3://x0g-ma-pilot.humancellatlas.dev/
export SRCDIR=out/

aws s3 sync  $SRCDIR $BUCKET --delete --profile excira
aws cloudfront create-invalidation --distribution-id E161Q2J7BBR3M1 --paths "/*" --profile excira

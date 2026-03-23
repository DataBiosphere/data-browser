#!/usr/bin/env bash
# Set the script to exit immediately on error
set -e

echo \"Deleting ./out/\"
rm -rf ./out

n 22.12.0
npm ci

# Build
npm run build-dev:hca-dcp

export BUCKET=s3://tha-explore.data.humancellatlas.dev/
export SRCDIR=out/

aws s3 sync  $SRCDIR $BUCKET --delete --profile excira
aws cloudfront create-invalidation --distribution-id E3Q3S6QTTZHFMI --paths "/*" --profile excira

#!/usr/bin/env bash
# Set the script to exit immediately on error
set -e

echo \"Deleting ./out/\"
rm -rf ./out

echo \"Deleting ./build/\"
rm -rf ./build

n 16.15.1
npm ci

mkdir -p build/explore

# Build AnVIL
rm -rf ./out
npm run build-dev:hca-dcp
mv out/* build

export BUCKET=s3://tha-explore.data.humancellatlas.dev/
export SRCDIR=build/

aws s3 sync  $SRCDIR $BUCKET --delete --profile excira
aws cloudfront create-invalidation --distribution-id E3Q3S6QTTZHFMI --paths "/*" --profile excira

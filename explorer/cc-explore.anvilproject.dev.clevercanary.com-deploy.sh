#!/usr/bin/env bash
# Set the script to exit immediately on error
set -e

echo \"Deleting ./out/\"
rm -rf ./out

echo \"Deleting ./build/\"
rm -rf ./build

n 16.15.1
npm ci

mkdir -p build/explore/anvil-cmg

# Build AnVIL Explorer
rm -rf ./out
npm run build-cc-dev:anvil-cmg
mv out/* build


export BUCKET=s3://explore.anvilproject.dev.clevercanary.com/
export SRCDIR=build/

aws s3 sync  $SRCDIR $BUCKET --delete --profile excira
aws cloudfront create-invalidation --distribution-id E2FFANJTIILTKH --paths "/*" --profile excira
#!/usr/bin/env bash
# Set the script to exit immediately on error
set -e

echo \"Deleting ./out/\"
rm -rf ./out

echo \"Deleting ./build/\"
rm -rf ./build

n 22.12.0
npm ci

mkdir -p build/explore/anvil-cmg

# Build AnVIL Explorer
rm -rf ./out
npm run build-cc-dev:anvil-cmg
mv out/* build


export BUCKET=s3://yvq-exploretf.anvilproject.dev/
export SRCDIR=build/

aws s3 sync  $SRCDIR $BUCKET --delete --profile excira
aws cloudfront create-invalidation --distribution-id E3BL97L4R44ZBX --paths "/*" --profile excira
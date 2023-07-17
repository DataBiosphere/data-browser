#!/usr/bin/env bash
# Set the script to exit immediately on error
set -e

echo \"Deleting ./out/\"
rm -rf ./out

echo \"Deleting ./build/\"
rm -rf ./build

n 16.15.1
npm ci
export NEXT_PUBLIC_BASE_PATH="/ncpi/data"

mkdir -p build/ncpi/data

# Build AnVIL
rm -rf ./out
npm run build-dev:ncpi-catalog
mv out/ncpi/data/* build/ncpi/data

export BUCKET=s3://uqc-anvil-portal.dev.ncpi.data/
export SRCDIR=build/

aws s3 sync  $SRCDIR $BUCKET --delete --profile excira
aws cloudfront create-invalidation --distribution-id EYO1P4DTRZBCE --paths "/*" --profile excira
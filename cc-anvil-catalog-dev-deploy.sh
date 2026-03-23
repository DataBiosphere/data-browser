#!/usr/bin/env bash

echo \"Deleting ./out/\"
rm -rf ./out

echo \"Deleting ./build/\"
rm -rf ./build

n 22.12.0
npm ci
export NEXT_PUBLIC_BASE_PATH="/data"

mkdir -p build/data

# Build AnVIL
rm -rf ./out
npm run build-dev:anvil-catalog
mv out/* build/data

export BUCKET=s3://uqc-anvil-portal.dev.data/
export SRCDIR=build/

aws s3 sync  $SRCDIR $BUCKET --delete --profile excira
aws cloudfront create-invalidation --distribution-id EYO1P4DTRZBCE --paths "/*" --profile excira
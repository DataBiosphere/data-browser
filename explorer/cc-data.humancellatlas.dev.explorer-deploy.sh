#!/usr/bin/env bash

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
mv out/explore/* build/explore

export BUCKET=s3://wb8-explorer/
export SRCDIR=build/

aws s3 sync  $SRCDIR $BUCKET --delete --profile excira
aws cloudfront create-invalidation --distribution-id E2SLGSHX4H0LO7 --paths "/*" --profile excira

#!/usr/bin/env bash
# Set the script to exit immediately on error
set -e

echo \"Deleting ./out/\"
rm -rf ./out

echo \"Deleting ./build/\"
rm -rf ./build

n 16.15.1
npm ci

mkdir -p build

# Build AnVIL
rm -rf ./out
npm run build-prod:hca-dcp
mv out/* build

export BUCKET=s3://wve-data.humancellatlas.org.explore/
export SRCDIR=build/

aws s3 sync  $SRCDIR $BUCKET --delete --profile platform-hca-portal
aws cloudfront create-invalidation --distribution-id EYL2CSEQ4Z28Q --paths "/*" --profile platform-hca-portal

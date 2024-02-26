#!/usr/bin/env bash
# Set the script to exit immediately on error
set -e

echo \"Deleting ./out/\"
rm -rf ./out

echo \"Deleting ./build/\"
rm -rf ./build

n 20.10.0
npm ci
export NEXT_PUBLIC_BASE_PATH="/data"

mkdir -p build/data

# Build AnVIL
rm -rf ./out
npm run build-prod:anvil-catalog
mv out/* build/data

export BUCKET=s3://ptm-anvilproject.org.data/
export SRCDIR=build/

aws s3 sync  $SRCDIR $BUCKET --delete --profile platform-anvil-portal
aws cloudfront create-invalidation --distribution-id E3PPAMUU6T4255 --paths "/*" --profile platform-anvil-portal
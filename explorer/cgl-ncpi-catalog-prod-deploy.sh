#!/usr/bin/env bash

rm -rf ./out

echo \"Deleting ./build/\"
rm -rf ./build

n 16.15.1
npm ci
export NEXT_PUBLIC_BASE_PATH="/ncpi/data"
#./insert-gtm-snippet.sh

mkdir -p build/ncpi/data

# Build AnVIL
rm -rf ./out
npm run build-prod:ncpi-catalog
mv out/ncpi/data/* build/ncpi/data

export BUCKET=s3://ptm-anvilproject.org.ncpi.data/
export SRCDIR=build/

aws s3 sync  $SRCDIR $BUCKET --delete  --profile platform-anvil-portal
aws cloudfront create-invalidation --distribution-id E3PPAMUU6T4255 --paths "/*" --profile platform-anvil-portal
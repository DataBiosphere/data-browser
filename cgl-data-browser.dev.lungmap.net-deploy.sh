#!/usr/bin/env bash
# Set the script to exit immediately on error
set -e

echo \"Deleting ./out/\"
rm -rf ./out

n 20.10.0
npm ci

# Build
npm run build-dev:lungmap

export BUCKET=s3://ck4-data-browser.lungmap.dev/
export SRCDIR=out/

aws s3 sync  $SRCDIR $BUCKET --delete --profile platform-hca-dev
aws cloudfront create-invalidation --distribution-id E36T6RM2MANYCK --paths "/*" --profile platform-hca-dev

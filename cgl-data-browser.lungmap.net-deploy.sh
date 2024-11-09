#!/usr/bin/env bash
# Set the script to exit immediately on error
set -e

echo \"Deleting ./out/\"
rm -rf ./out

n 20.10.0
npm ci

# Build
npm run build-prod:lungmap

export BUCKET=s3://zbm-data-browser.lungmap.net/
export SRCDIR=out/

aws s3 sync  $SRCDIR $BUCKET --delete --profile platform-hca-portal
aws cloudfront create-invalidation --distribution-id E37MJO4TD01F67 --paths "/*" --profile platform-hca-portal

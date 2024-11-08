#!/usr/bin/env bash
# Set the script to exit immediately on error
set -e

echo \"Deleting ./out/\"
rm -rf ./out

n 20.10.0
npm ci

# Build
npm run build-ma-prod:hca-dcp

export BUCKET=s3://9gg-ma-pilot.humancellatlas.prod/
export SRCDIR=out/

aws s3 sync  $SRCDIR $BUCKET --delete --profile platform-hca-prod
aws cloudfront create-invalidation --distribution-id E9ILQ0GRXC8X5 --paths "/*" --profile platform-hca-prod

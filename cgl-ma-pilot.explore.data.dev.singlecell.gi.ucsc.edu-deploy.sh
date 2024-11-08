#!/usr/bin/env bash
# Set the script to exit immediately on error
set -e

echo \"Deleting ./out/\"
rm -rf ./out

n 20.10.0
npm ci

# Build
npm run build-ma-dev:hca-dcp

export BUCKET=s3://tmu-ma-pilot.explore.data.dev.singlecell.gi.ucsc.edu/
export SRCDIR=out/

aws s3 sync  $SRCDIR $BUCKET --delete --profile platform-hca-dev
aws cloudfront create-invalidation --distribution-id E3F0IO2A66NXJ0 --paths "/*" --profile platform-hca-dev

#!/usr/bin/env bash
# Set the script to exit immediately on error
set -e

echo \"Deleting ./out/\"
rm -rf ./out

n 20.10.0
npm ci

# Build
npm run build-prod:hca-dcp

export BUCKET=s3://wve-data.humancellatlas.org.explore/
export SRCDIR=out/

aws s3 sync  $SRCDIR $BUCKET --delete --profile platform-hca-portal
aws cloudfront create-invalidation --distribution-id EYL2CSEQ4Z28Q --paths "/*" --profile platform-hca-portal

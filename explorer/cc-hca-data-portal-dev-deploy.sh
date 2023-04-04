#!/usr/bin/env bash

export GATSBY_GTM_ID=GTM-M2J5NTJ
export GATSBY_GTM_AUTH=CzDpc0__fhyqfREDehPK8Q
export GATSBY_ENV_NAME=env-83


echo \"Deleting ./out/\"
rm -rf ./out

echo \"Deleting ./build/\"
rm -rf ./build

n 16.15.1
npm ci

#./insert-gtm-snippet.sh

mkdir -p build/explore

# Build AnVIL
rm -rf ./out
npm run build:hca-dcp
mv out/explore/* build/explore

export BUCKET=s3://hca-data-explorer.dev.clevercanary.com/
export SRCDIR=build/

aws s3 sync  $SRCDIR $BUCKET --delete --profile excira
aws cloudfront create-invalidation --distribution-id E2TY6LP6E2DGZ3 --paths "/*" --profile excira
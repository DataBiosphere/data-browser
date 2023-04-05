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
export NEXT_PUBLIC_BASE_PATH="/ncpi/data"
#./insert-gtm-snippet.sh

mkdir -p build/ncpi/data

# Build AnVIL
rm -rf ./out
npm run build:ncpi-catalog
mv out/ncpi/data/* build/ncpi/data

export BUCKET=s3://uqc-anvil-portal.dev.ncpi.data/
export SRCDIR=build/

aws s3 sync  $SRCDIR $BUCKET --delete --profile excira
aws cloudfront create-invalidation --distribution-id EYO1P4DTRZBCE --paths "/*" --profile excira
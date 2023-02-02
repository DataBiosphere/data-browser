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

mkdir -p build/explore/hca
mkdir -p build/explore/lungmap
mkdir -p build/explore/anvil-catalog
mkdir -p build/explore/ncpi-catalog
mkdir -p build/explore/ncpi-catalog-dug

# Build HCA
rm -rf ./out
npm run build:hca-dcp
mv out/explore/* build/explore/hca

## Build Lungmap
rm -rf ./out
npm run build:lungmap
mv out/explore/* build/explore/lungmap

# Build AnVIL Catalog
rm -rf ./out
npm run build:anvil-catalog
mv out/explore/* build/explore/anvil-catalog

# Build NCPI Catalog
rm -rf ./out
npm run build:ncpi-catalog
mv out/explore/* build/explore/ncpi-catalog

# Build NCPI Dug Catalog
rm -rf ./out
npm run build:ncpi-catalog-dug
mv out/explore/* build/explore/ncpi-catalog-dug


export BUCKET=s3://cc-dev.explore.singlecell.gi.ucsc.edu/
export SRCDIR=build/

aws s3 sync  $SRCDIR $BUCKET --delete --profile ucsc-cgl
aws cloudfront create-invalidation --distribution-id E25SUK9P6E5T4Q --paths "/*" --profile ucsc-cgl
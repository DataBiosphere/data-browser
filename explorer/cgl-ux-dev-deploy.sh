#!/usr/bin/env bash

export GATSBY_GTM_ID=GTM-M2J5NTJ
export GATSBY_GTM_AUTH=CzDpc0__fhyqfREDehPK8Q
export GATSBY_ENV_NAME=env-83


echo \"Deleting ./out/\"
rm -rf ./out

echo \"Deleting ./build/\"
rm -rf ./build

#./insert-gtm-snippet.sh

mkdir -p build/explore/anvil
mkdir -p build/explore/hca
mkdir -p build/explore/lungmap
mkdir -p build/explore/anvil-catalog
mkdir -p build/explore/ncpi-catalog

# Build AnVIL
rm -rf ./out
npm run build:anvil
mv out/* build/explore/anvil

# Build HCA
rm -rf ./out
npm run build:hca-dcp
mv out/* build/explore/hca

## Build Lungmap
rm -rf ./out
npm run build:lungmap
mv out/* build/explore/lungmap

# Build AnVIL Catalog
rm -rf ./out
npm run build:anvil-catalog
mv out/* build/explore/anvil-catalog


# Build AnVIL Catalog
rm -rf ./out
npm run build:ncpi-catalog
mv out/* build/explore/ncpi-catalog


export BUCKET=s3://ux-dev.explore.singlecell.gi.ucsc.edu/
export SRCDIR=build/

aws s3 sync --acl public-read $SRCDIR $BUCKET --delete --profile ucsc-cgl
aws cloudfront create-invalidation --distribution-id E3FFK49Z7TQ60R --paths "/*" --profile ucsc-cgl
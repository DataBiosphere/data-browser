#!/usr/bin/env bash

export GATSBY_GTM_ID=GTM-M2J5NTJ
export GATSBY_GTM_AUTH=CzDpc0__fhyqfREDehPK8Q
export GATSBY_ENV_NAME=env-83


echo \"Deleting ./out/\"
rm -rf ./out

echo \"Deleting ./build/\"
rm -rf ./build

n 20.10.0
npm ci

#./insert-gtm-snippet.sh


mkdir -p build/explore/anvil-cmg




# Build AnVIL
rm -rf ./out
npm run build:anvil-cmg
mv out/explore/* build/explore/anvil-cmg


export BUCKET=s3://anvil.explorer.gi.ucsc.edu/
export SRCDIR=build/

aws s3 sync  $SRCDIR $BUCKET --delete --profile platform-anvil-dev
aws cloudfront create-invalidation --distribution-id E3JAUIVOC72EMP --paths "/*" --profile platform-anvil-dev
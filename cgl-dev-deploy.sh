#!/usr/bin/env bash

export GATSBY_GTM_ID=GTM-M2J5NTJ
export GATSBY_GTM_AUTH=CzDpc0__fhyqfREDehPK8Q
export GATSBY_ENV_NAME=env-83


echo \"Deleting ./dist/\"
rm -rf ./dist

./insert-gtm-snippet.sh
cd spa


npm run build-cgl-dev
export BUCKET=s3://dev.explore.singlecell.gi.ucsc.edu/
export SRCDIR=dist/
cd ..
aws s3 sync --acl public-read $SRCDIR $BUCKET --delete --profile ucsc-cgl
aws cloudfront create-invalidation --distribution-id E3562WJBOLN8W8 --paths "/*" --profile ucsc-cgl
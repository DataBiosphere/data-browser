#!/usr/bin/env bash

echo \"Deleting ./dist/\"
rm -rf ./dist
cd spa
npm run build-cgl-dev
export BUCKET=s3://dev.explore.singlecell.gi.ucsc.edu/
export SRCDIR=dist/
cd ..
aws s3 sync --acl public-read $SRCDIR $BUCKET --delete --profile ucsc-cgl
aws cloudfront create-invalidation --distribution-id E3562WJBOLN8W8 --paths "/*" --profile ucsc-cgl
#!/usr/bin/env bash

export GATSBY_GTM_ID=GTM-M2J5NTJ
export GATSBY_GTM_AUTH=CWB1d2Aoi1q3GOmQMSGMsZA
export GATSBY_ENV_NAME=env-150


echo \"Deleting ./dist/\"
rm -rf ./dist

./insert-gtm-snippet.sh
cd spa


npm run build-lungmap-prod
export BUCKET=s3://data-browser.explore.lungmap.net/
export SRCDIR=dist/
cd ..
aws s3 sync --acl public-read $SRCDIR $BUCKET --delete --profile platform-hca-prod
aws cloudfront create-invalidation --distribution-id E22L661MUAMMTD --paths "/*" --profile platform-hca-prod
git checkout spa/src/index.html
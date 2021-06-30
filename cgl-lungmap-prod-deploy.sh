#!/usr/bin/env bash

export GATSBY_GTM_ID=GTM-M2J5NTJ
export GATSBY_GTM_AUTH=CzDpc0__fhyqfREDehPK8Q
export GATSBY_ENV_NAME=env-83


echo \"Deleting ./dist/\"
rm -rf ./dist

#./insert-gtm-snippet.sh
cd spa


npm run build-lungmap-prod
export BUCKET=s3://data-browser.explore.lungmap.net/
export SRCDIR=dist/
cd ..
aws s3 sync --acl public-read $SRCDIR $BUCKET --delete --profile platform-hca-prod
aws cloudfront create-invalidation --distribution-id E22L661MUAMMTD --paths "/*" --profile platform-hca-prod
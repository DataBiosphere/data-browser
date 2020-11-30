#!/usr/bin/env bash

export GATSBY_GTM_ID=GTM-M2J5NTJ
export GATSBY_GTM_AUTH=CzDpc0__fhyqfREDehPK8Q
export GATSBY_ENV_NAME=env-83


echo \"Deleting ./dist/\"
rm -rf ./dist

#./insert-gtm-snippet.sh
cd spa


npm run build-cgl-dcp2
export BUCKET=s3://org-humancellatlas-data-browser-dcp2-prod/
export SRCDIR=dist/
cd ..
aws s3 sync --acl public-read $SRCDIR $BUCKET --delete --profile platform-hca-prod
aws cloudfront create-invalidation --distribution-id E1LYQC3LZXO7M3 --paths "/*" --profile platform-hca-prod
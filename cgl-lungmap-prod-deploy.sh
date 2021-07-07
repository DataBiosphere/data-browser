#!/usr/bin/env bash
set -e

export GTM_ID=GTM-M2J5NTJ
export GTM_AUTH=CWB1d2Aoi1q3GOmQMSGMsZA
export GTM_ENV=env-150

gtmHead=$(cat "./gtm/gtm.head.txt")
gtmBody=$(cat "./gtm/gtm.body.txt")

echo "GTM_ID is: "
echo $GTM_ID

gtmHead=$(echo $gtmHead | sed s/GTM_ID/"$GTM_ID"/g)
gtmHead=$(echo $gtmHead | sed s/GTM_AUTH/"$GTM_AUTH"/g)
gtmHead=$(echo $gtmHead | sed s/GTM_ENV/"$GTM_ENV"/g)

gtmBody=$(echo $gtmBody | sed s/GTM_ID/"$GTM_ID"/g)
gtmBody=$(echo $gtmBody | sed s/GTM_AUTH/"$GTM_AUTH"/g)
gtmBody=$(echo $gtmBody | sed s/GTM_ENV/"$GTM_ENV"/g)

echo $gtmHead
echo $gtmBody


replaceHead=$"s/<!-- REPLACE-ME: GOOGLE TAG MANAGER HEAD -->/""$gtmHead"/g
replaceBody=$"s/<!-- REPLACE-ME: GOOGLE TAG MANAGER BODY -->/""$gtmBody"/g

echo "Begin replace head"
sed -i  "$replaceHead" spa/src/index.html

echo "Begin replace body"
sed -i  "$replaceBody" spa/src/index.html



echo \"Deleting ./dist/\"
rm -rf ./dist


cd spa


npm run build-lungmap-prod
export BUCKET=s3://data-browser.explore.lungmap.net/
export SRCDIR=dist/
cd ..
aws s3 sync --acl public-read $SRCDIR $BUCKET --delete --profile platform-hca-prod
aws cloudfront create-invalidation --distribution-id E22L661MUAMMTD --paths "/*" --profile platform-hca-prod
git checkout spa/src/index.html
#!/usr/bin/env bash
set -e

gtmHead=$(cat "./gtm/gtm.head.txt")
gtmBody=$(cat "./gtm/gtm.body.txt")

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



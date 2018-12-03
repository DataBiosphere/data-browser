#!/usr/bin/env bash
set -e
echo $CI_ENVIRONMENT_NAME

gtmHead=$(cat "./gtm/"$CI_ENVIRONMENT_NAME".head.txt")
gtmBody=$(cat "./gtm/"$CI_ENVIRONMENT_NAME".body.txt")

echo $gtmHead
echo $gtmBody


replaceHead=$"s/<!-- REPLACE-ME: GOOGLE TAG MANAGER HEAD -->/""$gtmHead"/g
replaceBody=$"s/<!-- REPLACE-ME: GOOGLE TAG MANAGER BODY -->/""$gtmBody"/g

echo "Begin replace head"
sed -i .bak "$replaceHead" spa/src/index.html

echo "Begin replace body"
sed -i .bak "$replaceBody" spa/src/index.html



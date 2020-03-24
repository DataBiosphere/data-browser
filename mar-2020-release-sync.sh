#!/usr/bin/env bash
set -e


#aws s3 sync --acl public-read ../hca-2020-mar-release s3://release-files.data.humancellatlas.org --delete  --exclude "*.DS_Store" --dryrun --profile hca-admin

aws s3 sync --acl public-read ../hca-2020-mar-release s3://release-files.data.humancellatlas.org --delete  --exclude "*.DS_Store"  --profile hca-admin
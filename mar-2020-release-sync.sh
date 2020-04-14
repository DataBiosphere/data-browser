#!/usr/bin/env bash
set -e

#for file in *.gz; do mv "$file" "${file%.gz}"; done
#aws s3 sync --acl public-read ../hca-2020-mar-release s3://release-files.data.humancellatlas.org --content-encoding gzip --delete  --exclude "*.DS_Store" --dryrun --profile hca-admin

#aws s3 sync --acl public-read ../hca-2020-mar-release s3://release-files.data.humancellatlas.org --delete  --exclude "*.DS_Store"  --profile hca-admin
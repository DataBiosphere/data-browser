#!/usr/bin/env bash
set -e

git push origin develop

git checkout integration
git pull origin develop
git push origin integration

git checkout staging
git pull origin integration
git push origin staging

git checkout master
git pull origin staging
git push origin master

git checkout develop


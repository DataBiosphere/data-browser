#!/bin/bash

DIR="./site-config/$1/images/favicons/"
PUBLIC_DIR="./public/favicons/"
# init

cp ./site-config/$1/$2/.env .env.production

# check if PUBLIC_DIR does not exists
if [ ! -d "$PUBLIC_DIR" ]; then
	mkdir $PUBLIC_DIR
fi

# look for empty directory
if [ -d "$DIR" ]
then
	if [ "$(ls $DIR)" ]; then
     cp ./site-config/$1/images/favicons/* ./public/favicons/
	 cp ./scripts/browserconfig.xml ./public/favicons/
	 cp ./scripts/site.webmanifest ./public/favicons/
	fi
else
	echo "Directory $DIR not found."
fi

# Copy OG images if they exist
OG_DIR="./site-config/$1/images/og/"
OG_PUBLIC_DIR="./public/og/"

if [ ! -d "$OG_PUBLIC_DIR" ]; then
	mkdir "$OG_PUBLIC_DIR"
fi

if [ -d "$OG_DIR" ] && [ "$(ls $OG_DIR)" ]; then
	cp ./site-config/$1/images/og/* ./public/og/
fi
#!/bin/bash

DIR="./site-config/$1/images/favicons/"
PUBLIC_DIR="./public/favicons/"
# init

cp ./site-config/"$1"/"${data_browser_build_env:-prod}"/.env .env.production

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

# Reset OG image destination so builds for different site configs can't
# accidentally inherit a previous build's image, then copy if the source
# directory has any files.
OG_DIR="./site-config/$1/images/og"
OG_PUBLIC_DIR="./public/og"

rm -rf "$OG_PUBLIC_DIR"
mkdir -p "$OG_PUBLIC_DIR"

if [ -d "$OG_DIR" ]; then
	shopt -s nullglob
	og_files=("$OG_DIR"/*)
	shopt -u nullglob
	if [ ${#og_files[@]} -gt 0 ]; then
		cp "${og_files[@]}" "$OG_PUBLIC_DIR/"
	fi
fi
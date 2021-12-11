function usage () {
    echo "USAGE: cgm_manifest.sh <uuid> <version> <archive_file>"
}

set -e

if [ $# != 3 ]
then
   usage
   echo "Not enough arguments provided to script"
   exit 1
fi

files_dir="TEMP_$3_extracted"

mkdir "$files_dir"

# extract contents and get file list for different archive types
if [[ "$3" =~ \.[zZ][iI][pP](\.|$) ]]
then
	if [[ "$3" =~ \.[gG][zZ]$ ]]
	then
		zip_name="TEMP_$3_ungz.zip"
		gzip -dc "$3" > "$zip_name"
	else
		zip_name="$3"
	fi
	
	files=$(unzip -Z1 "$zip_name")
	unzip -q -d "$files_dir" "$zip_name"
	
	if [ ! "$zip_name" == "$3" ]
		then rm -- "$zip_name"
	fi
else
	files=$(tar -tf $3)
	tar -xf $3 -C "$files_dir"
fi

archive_file_size=$(wc -c "$3" | tr -s ' ' | cut -f1 -d ' ')
output_file="$1_$(echo $2 | tr -d ':').json"
first=1
printf "{\\n  \"archive\": {\\n    \"name\": \"$3\",\\n    \"size\": $archive_file_size,\\n    \"uuid\": \"$1\",\\n    \"version\": \"$2\"\\n  },\\n  \"files\":[\\n" > $output_file

while IFS= read -r file
do
   if [ ! -d "$file" ]  # Don't include directories in the manifest 
      then
        fdate=$(date -r  "$files_dir/$file" -u +"%Y-%m-%dT%H:%M:%SZ")
        fsize=$(wc -c "$files_dir/$file" | tr -s ' ' | cut -f1 -d ' ')
        if [ $first -eq 1 ]
           then
             first=0
           else
             printf ",\n" >> $output_file
        fi
        printf "    {\\n      \"name\":\"$file\",\n      \"size\": $fsize,\n      \"modified\": \"$fdate\"\n    }"  >> $output_file
   fi
done <<< "$files"

printf "\n  ]\n}\n" >> $output_file

rm -r -- "$files_dir"

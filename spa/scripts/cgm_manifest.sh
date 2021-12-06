function usage () {
    echo "USAGE: cgm_manifest.sh <uuid> <version> <tar_file>"
}

set -e

if [ $# != 3 ]
then
   usage
   echo "Not enough arguments provided to script"
   exit 1
fi

tar -xf $3  # untar the contents
tar_file_size=$(wc -c $3 | tr -s ' ' | cut -f1 -d ' ')
files=$(tar -tf $3)
output_file="$1-$(echo $2 | tr ':' '_').json"
first=1
printf "{\\n  \"archive\": {\\n    \"name\": \"$3\",\\n    \"size\": $tar_file_size,\\n    \"uuid\": \"$1\",\\n    \"version\": \"$2\"\\n  },\\n  \"files\":[\\n" > $output_file

for file in $files
do
   if [ ! -d "$file" ]  # Don't include directories in the manifest 
      then
        fdate=$(date -r  $file -u +"%Y-%m-%dT%H:%M:%SZ")
        fsize=$(wc -c $file | tr -s ' ' | cut -f1 -d ' ')
        if [ $first -eq 1 ]
           then
             first=0
           else
             printf ",\n" >> $output_file
        fi
        printf "    {\\n      \"name\":\"$file\",\n      \"size\": $fsize,\n      \"modified\": \"$fdate\"\n    }"  >> $output_file
   fi
done

printf "\n  ]\n}\n" >> $output_file

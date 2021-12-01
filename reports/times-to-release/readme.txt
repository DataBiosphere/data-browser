Updating:
- Run the script found in extract-updates.js, via a web browser's JavaScript console, on the updates page at https://data.humancellatlas.org/dcp-updates
	- The parameter at the very end of the script can be changed to determine the number of updates to extract (starting from the latest one)
- Copy the contents of the string returned by the script, and paste them at the beginning of the `releases` array in releases-list.js
- Manually delete unnecessary sections of the new releases, keeping only sections referencing projects with new data
- Update the latest release number in releases-list.js
- Open index.html in a web browser and run `await getReleasesData(<minCatalog>)`, where <minCatalog> is the number of the earliest one of the new releases
- Copy the JSON representations of the returned array items to the end of the array in releases-data.js
- Reload index.html to view the updated graph
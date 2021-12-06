
const {promisify} = require("util");
const fs = require("fs");
const path = require("path");
const got = require("got");

const pipeline = promisify(require("stream").pipeline);
const exec = promisify(require("child_process").exec);

const apiUrl = "https://service.azul.data.humancellatlas.org/index/files?filters=%7B%22fileFormat%22%3A%7B%22is%22%3A%5B%22zip%22%2C%22zip.gz%22%2C%22tar%22%2C%22tar.gz%22%5D%7D%7D&size=500&catalog=dcp11";
const outPath = path.resolve("../../downloads");

fs.mkdir(outPath, async () => {
	// ignoring the error under the assumption that the folder already exists
	
	const {hits} = await got(apiUrl).json();

	const file = hits.map(e => e.files).flat().filter(f => /^tar(?:\.gz)?$/.test(f.format)).sort((a, b) => a.size - b.size)[0];
	
	console.log(file);
	
	const fetchUrl = file.url.replace("https://service.azul.data.humancellatlas.org/repository/files/", "https://service.azul.data.humancellatlas.org/fetch/repository/files/");
	
	const {Location: fileUrl} = await got(fetchUrl).json();
	
	console.log(fileUrl);
	
	const outFileName = file.uuid + "." + file.format;
	const fileOutPath = path.resolve(outPath, outFileName);
	
	if (fileOutPath.substring(0, outPath.length + 1) === outPath + path.sep) {
		await pipeline(
			got.stream(fileUrl),
			fs.createWriteStream(fileOutPath)
		);
		
		console.log("Processing");
		
		// should this make sure there's nothing weird about the strings passed to it?
		await exec(
			`"../spa/scripts/cgm_manifest.sh" ${file.uuid} ${file.version} ${outFileName}`,
			{cwd: outPath}
		);
	} else {
		console.log("Invalid file name");
	}
	
	console.log("Done");
	
});

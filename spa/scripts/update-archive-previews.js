
const {promisify} = require("util");
const fs = require("fs");
const fsPromises = require("fs/promises");
const path = require("path");
const got = require("got");
const { S3Client, PutObjectCommand, HeadObjectCommand } = require("@aws-sdk/client-s3");

const pipeline = promisify(require("stream").pipeline);
const exec = promisify(require("child_process").exec);

const bucketName = "cc-archive-preview-test";
const hcaApiUrl = "https://service.azul.data.humancellatlas.org/index/files?filters=%7B%22fileFormat%22%3A%7B%22is%22%3A%5B%22zip%22%2C%22zip.gz%22%2C%22tar%22%2C%22tar.gz%22%5D%7D%7D&size=500&catalog=dcp11";
const outPath = path.resolve("../../downloads");

const client = new S3Client({ region: "us-east-1" });

(async function() {
	try {
		await fsPromises.mkdir(outPath);
	} catch(e) {
		// ignoring the error under the assumption that the folder already exists
	}
	
	const {hits} = await got(hcaApiUrl).json();
	
	let sizeLimit = 1000000,
		countLimit = 5;
	
	for (let entry of hits) {
		for (let file of entry.files) {
			if (file.size < sizeLimit) {
				await processFile(file);
				if (countLimit-- <= 0) break;
			}
		}
		if (countLimit <= 0) break;
	}
	
	console.log("Done");
	
})();

async function processFile(file) {
	console.log(file);
		
	const jsonName = file.uuid + "_" + file.version.replace(/:/g, "") + ".json";
	
	const headCommand = new HeadObjectCommand({
		Bucket: bucketName,
		Key: jsonName
	});
	
	let jsonExists = true;
	
	try {
		await client.send(headCommand);
	} catch(e) {
		jsonExists = false;
	}
	
	if (jsonExists) {
		console.log("JSON exists");
	} else {
		const fetchUrl = file.url.replace("https://service.azul.data.humancellatlas.org/repository/files/", "https://service.azul.data.humancellatlas.org/fetch/repository/files/");
		
		const {Location: fileUrl} = await got(fetchUrl).json();
		
		//console.log(fileUrl);
		
		const fileDlName = file.name || file.uuid + "." + file.format;
		const fileDlPath = path.resolve(outPath, fileDlName);
		
		if (fileDlPath.substring(0, outPath.length + 1) === outPath + path.sep) {
			await pipeline(
				got.stream(fileUrl),
				fs.createWriteStream(fileDlPath)
			);
			
			//console.log("Processing");
			const jsonPath = path.resolve(outPath, jsonName);
			
			if (jsonPath.substring(0, outPath.length + 1) === outPath + path.sep) {
				// should this make sure there's nothing weird about the strings passed to it?
				await exec(
					`"../spa/scripts/cgm_manifest.sh" ${JSON.stringify(file.uuid)} ${JSON.stringify(file.version)} ${JSON.stringify(fileDlName)}`,
					{cwd: outPath}
				);
				
				const putCommand = new PutObjectCommand({
					Bucket: bucketName,
					Key: jsonName,
					Body: await fsPromises.readFile(jsonPath)
				});
				
				const results = await client.send(putCommand);
				//console.log(results);
				
				await fsPromises.rm(fileDlPath);
				await fsPromises.rm(jsonPath);
				
				console.log("Processed file");
			} else {
				console.log("Invalid JSON name");
			}
		} else {
			console.log("Invalid file name");
		}
	}
}

import { promisify } from "util";
import fs, { promises as fsPromises } from "fs";
import path from "path";
import got from "got";
import {
    S3Client,
    PutObjectCommand,
    HeadObjectCommand,
} from "@aws-sdk/client-s3";

import { fromIni } from "@aws-sdk/credential-providers";

import { pipeline as callbackPipeline } from "stream";
import { exec as callbackExec } from "child_process";

const pipeline = promisify(callbackPipeline);
const exec = promisify(callbackExec);

const outPath = path.resolve("../downloads");

const scriptArgs = {};

process.argv.slice(2).forEach((arg) => {
    const [key, value] = arg.split("=");
    scriptArgs[key] = value;
});

const env = scriptArgs.env;

let hcaApiUrl;
let bucketName;
let client;

(function () {
    if (env === "dev") {
        hcaApiUrl =
            "https://service.dev.singlecell.gi.ucsc.edu/index/files?filters=%7B%22fileFormat%22%3A%7B%22is%22%3A%5B%22zip%22%2C%22zip.gz%22%2C%22tar%22%2C%22tar.gz%22%5D%7D%7D&size=500&catalog=dcp2";
        bucketName = "dev.archive-preview.singlecell.gi.ucsc.edu";
        client = new S3Client({
            region: "us-east-1",
            credentials: fromIni({
                profile: "platform-hca-dev",
                mfaCodeProvider: async (mfaSerial) => {
                    return "864992";
                },
            }),
        });
    } else {
        hcaApiUrl =
            "https://service.azul.data.humancellatlas.org/index/files?filters=%7B%22fileFormat%22%3A%7B%22is%22%3A%5B%22zip%22%2C%22zip.gz%22%2C%22tar%22%2C%22tar.gz%22%5D%7D%7D&size=500&catalog=dcp39";
        if (env === "test") {
            bucketName = "cc-archive-preview-test";
            client = new S3Client({ region: "us-east-1" });
        } else if (env === "prod") {
            //wve-data.humancellatlas.org.archive-preview
            bucketName = "archive-preview.humancellatlas.org";
            client = new S3Client({
                region: "us-east-1",
                credentials: fromIni({
                    profile: "platform-hca-prod",
                    mfaCodeProvider: async (mfaSerial) => {
                        return "997196";
                    },
                }),
            });
        } else {
            console.log("Missing or invalid environment argument");
            console.log(
                "USAGE: npm run-script update-archive-previews -- env={test|dev|prod}"
            );
            return;
        }
    }

    //TODO: Delete downloads content on startup...

    (async function () {
		try {
            await fsPromises.mkdir(outPath);
        } catch (e) {
            // ignoring the error under the assumption that the folder already exists
        }

        const hits = await getSearchResults();

        for (let entry of hits) {
            for (let file of entry.files) {
                try {
                    await processFile(file);
                } catch (e) {
                    console.log(e);
                    continue;
                }
            }
        }

        console.log("Done");
    })();
})();

async function getSearchResults() {
    // make a request using the hcaApiUrl, paginate through the results, and return a combined results array

    const allHits = [];
    let url = hcaApiUrl;

    while (url) {
        const { hits, pagination } = await got(url).json();
        allHits.push(...hits);
        url = pagination.next;
    }

    return allHits;
}

async function processFile(file) {
    // if the archive file doesn't already have a json manifest, generate one and upload it

    console.log(file.url);

    // determine if the json already exists:

    const jsonName =
        "archive-preview/" +
        file.uuid +
        "-" +
        file.version.replace(/:/g, "_") +
        ".json";

    const headCommand = new HeadObjectCommand({
        Bucket: bucketName,
        Key: jsonName,
    });

    let jsonExists = true;

    try {
        await client.send(headCommand);
    } catch (e) {
        jsonExists = false;
    }

    if (!jsonExists) {
        // download the archive:

        const fetchUrl = file.url.replace(
            "repository/files/",
            "fetch/repository/files/"
        );

        const { Location: fileUrl } = await got(fetchUrl).json();

        const fileDlName = file.name || file.uuid + "." + file.format;
        const fileDlPath = path.resolve(outPath, fileDlName);

        if (fileDlPath.substring(0, outPath.length + 1) !== outPath + path.sep) {
            throw new Error("Invalid archive name");
        }

        await pipeline(got.stream(fileUrl), fs.createWriteStream(fileDlPath));

        // generate the json, upload it, and clean up the downloaded file:

        const manifest = await generateManifest(
            file.uuid,
            file.version,
            fileDlName
        );

        const putCommand = new PutObjectCommand({
            Bucket: bucketName,
            Key: jsonName,
            Body: JSON.stringify(manifest), //await fsPromises.readFile(jsonPath)
        });

        const results = await client.send(putCommand);

        await fsPromises.rm(fileDlPath);

        console.log("Processed file");
    } else {
        console.log("JSON exists");
    }
}

async function generateManifest(uuid, version, fileName) {
    // generate json manifest for an archive file

    // set up paths and temp directory:

    const filePath = path.resolve(outPath, fileName);

    const filesDirName = `TEMP_${fileName}_extracted`.replace(/ /g, "_");
    const filesDirPath = path.resolve(outPath, filesDirName);

    await fsPromises.mkdir(filesDirPath);

    // get string listing files in the archive and extract the files to the file system:

    let filesString;

    if (/\.zip(?:$|\.)/i.test(fileName)) {
        let zipName;

        if (/\.gz$/i.test(fileName)) {
            zipName = `TEMP_${fileName}_ungz.zip`;
            await exec(
                `gzip -dc ${formatBashString(fileName)} > ${formatBashString(zipName)}`,
                { cwd: outPath }
            );
        } else {
            zipName = fileName;
        }

        // get file list:
        const { stdout } = await exec(`unzip -Z1 ${formatBashString(zipName)}`, {
            cwd: outPath,
        });
        filesString = stdout;
        // extract files:
        await exec(
            `unzip -q -d ${formatBashString(filesDirName)} ${formatBashString(
                zipName
            )}`,
            { cwd: outPath }
        );

        if (zipName !== fileName) {
            await fsPromises.rm(path.resolve(outPath, zipName));
        }
    } else {
        // get file list:
        const { stdout } = await exec(`tar -tf ${formatBashString(fileName)}`, {
            cwd: outPath,
        });
        filesString = stdout;
        // extract files:
        await exec(
            `tar -xf ${formatBashString(fileName)} -C ${formatBashString(
                filesDirName
            )}`,
            { cwd: outPath }
        );
    }

    // iterate over file list and get files' info:

    const filesArr = filesString
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line);

    const filesInfo = [];

    for (const name of filesArr) {
        try {
            const { size, mtime } = await fsPromises.stat(
                path.resolve(filesDirPath, name)
            );
            filesInfo.push({
                name,
                size,
                modified: mtime.toISOString(),
            });
        } catch (e) {
            console.log(e);
            continue;
        }
    }

    // clean up files and return json:

    await fsPromises.rm(filesDirPath, { recursive: true });

    return {
        archive: {
            name: fileName,
            size: (await fsPromises.stat(filePath)).size,
            uuid,
            version,
        },
        files: filesInfo,
    };
}

function formatBashString(str) {
    // add quotes and escape sequences so that the string can be safely used in a bash command
    return '"' + str.replace(/[$`"\\\n!]/g, "\\$&") + '"';
}

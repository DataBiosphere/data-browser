const { promisify } = require("util");
const fs = require("fs");
const fsPromises = require("fs/promises");
const path = require("path");
const got = require("got");
const {
  S3Client,
  PutObjectCommand,
  HeadObjectCommand,
} = require("@aws-sdk/client-s3");

const pipeline = promisify(require("stream").pipeline);
const exec = promisify(require("child_process").exec);

const bucketName = "cc-archive-preview-test";
const hcaApiUrl =
  "https://service.azul.data.humancellatlas.org/index/files?filters=%7B%22fileFormat%22%3A%7B%22is%22%3A%5B%22zip%22%2C%22zip.gz%22%2C%22tar%22%2C%22tar.gz%22%5D%7D%7D&size=500&catalog=dcp11";
const outPath = path.resolve("../../downloads");

const client = new S3Client({ region: "us-east-1" });

(async function () {
  try {
    await fsPromises.mkdir(outPath);
  } catch (e) {
    // ignoring the error under the assumption that the folder already exists
  }

  const hits = await getSearchResults();

  let sizeLimit = 5000000,
    countLimit = 5;

  for (let entry of hits) {
    for (let file of entry.files) {
      if (file.size < sizeLimit) {
        await processFile(file);
        if (--countLimit <= 0) break;
      }
    }
    if (countLimit <= 0) break;
  }

  console.log("Done");
})();

async function getSearchResults() {
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
  console.log(file);

  const jsonName = file.uuid + "-" + file.version.replace(/:/g, "_") + ".json";

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
    const fetchUrl = file.url.replace(
      "https://service.azul.data.humancellatlas.org/repository/files/",
      "https://service.azul.data.humancellatlas.org/fetch/repository/files/"
    );

    const { Location: fileUrl } = await got(fetchUrl).json();

    const fileDlName = file.name || file.uuid + "." + file.format;
    const fileDlPath = path.resolve(outPath, fileDlName);

    if (fileDlPath.substring(0, outPath.length + 1) !== outPath + path.sep) {
      throw new Error("Invalid archive name");
    }

    await pipeline(got.stream(fileUrl), fs.createWriteStream(fileDlPath));

    const manifest = await generateManifest(
      file.uuid,
      file.version,
      fileDlName
    );

    const putCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: jsonName,
      ACL: "public-read",
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
  const filePath = path.resolve(outPath, fileName);

  const filesDirName = `TEMP_${fileName}_extracted`;
  const filesDirPath = path.resolve(outPath, filesDirName);

  await fsPromises.mkdir(filesDirPath);

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

    const { stdout } = await exec(`unzip -Z1 ${formatBashString(zipName)}`, {
      cwd: outPath,
    });
    filesString = stdout;
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
    const { stdout } = await exec(`tar -tf ${formatBashString(fileName)}`, {
      cwd: outPath,
    });
    filesString = stdout;
    await exec(
      `tar -xf ${formatBashString(fileName)} -C ${formatBashString(
        filesDirName
      )}`,
      { cwd: outPath }
    );
  }

  const filesArr = filesString
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line);

  const filesInfo = [];

  for (const name of filesArr) {
    const { size, mtime } = await fsPromises.stat(
      path.resolve(filesDirPath, name)
    );
    filesInfo.push({
      name,
      size,
      modified: mtime.toISOString(),
    });
  }

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
  return '"' + str.replace(/[$`"\\\n!]/g, "\\$&") + '"';
}

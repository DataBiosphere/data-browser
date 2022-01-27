

const fs = require("fs");
const fsPromises = require("fs/promises");
const path = require("path");
const got = require("got");

const outDir = "../../temp";
const csvOutName = "missing-description-files.csv";
const projectsUrl = "https://service.azul.data.humancellatlas.org/index/projects?catalog=dcp12&size=500";
const filesUrl = "https://service.azul.data.humancellatlas.org/index/files?filters=%7B%22contentDescription%22%3A%7B%22is%22%3A%5Bnull%5D%7D%7D&size=1000&catalog=dcp12";
const latticeEmail = "lattice-info@lists.stanford.edu";


(async function() {
	console.log("Getting projects");
	
	const latticeProjects = new Set();
	let numProjects = 0;
	
	for await (const { projects: [project] } of getSearchResults(projectsUrl)) {
		numProjects++;
		for (const contrib of project.contributors) {
			if (contrib.email === latticeEmail) {
				latticeProjects.add(project.projectId);
				break;
			}
		}
	}
	
	try {
		await fsPromises.mkdir(outDir);
	} catch(e) {
		// assume the directory already exists
	}
	
	const writeStream = fs.createWriteStream(path.resolve(outDir, csvOutName));
	
	writeStream.write("Project,Project UUID,Ingest,File name,File extension,File UUID,File version");
	
	//const pageLimit = 2;
	
	console.log("Getting files");
	
	const missingDescriptionProjects = new Set();
	let numMDLatticeProjects = 0;
	let pageNum = 1;
	
	for await (const page of getSearchResults(filesUrl, true)) {
		console.log("Page " + (pageNum++) + "/" + page.pagination.pages);
		for (const { files: [file], projects: [project] } of page.hits) {
			const projectId = project.projectId[0];
			if (!missingDescriptionProjects.has(projectId)) {
				missingDescriptionProjects.add(projectId);
				if (latticeProjects.has(projectId)) numMDLatticeProjects++;
			}
			const items = [
				project.projectShortname[0],
				projectId,
				latticeProjects.has(projectId) ? "Lattice" : "EBI",
				file.name,
				file.format,
				file.uuid,
				file.version
			];
			writeStream.write("\n" + items.map(s => encodeCsvItem(s)).join(","));
		}
		
		//if (pageNum > pageLimit) break;
	}
	
	writeStream.end();
	
	console.log("Done - Found " + missingDescriptionProjects.size + " projects (" + numMDLatticeProjects + " Lattice, " + (missingDescriptionProjects.size - numMDLatticeProjects) + " EBI) with missing file content descriptions, out of " + numProjects + " total projects");
})();


async function* getSearchResults(url, usePages) {
    // make a request using the url, paginate through the results, and yield each entry or page
	while (url) {
        const page = await got(url).json();
		if (usePages) yield page;
		else yield* page.hits;
        url = page.pagination.next;
    }
}

function encodeCsvItem(string) {
	if (/[,"\r\n]/.test(string)) {
		return "\"" + string.replace(/"/g, "\"\"") + "\"";
	} else {
		return string;
	}
}


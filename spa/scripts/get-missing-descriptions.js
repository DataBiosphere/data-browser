

const fs = require("fs");
const got = require("got");

const csvOutPath = "./missing-description-files.csv";
const projectsUrl = "https://service.azul.data.humancellatlas.org/index/projects?catalog=dcp12&size=500";
const filesUrl = "https://service.azul.data.humancellatlas.org/index/files?filters=%7B%22contentDescription%22%3A%7B%22is%22%3A%5Bnull%5D%7D%7D&size=500&catalog=dcp12";
const latticeEmail = "lattice-info@lists.stanford.edu";


(async function() {
	console.log("Getting projects");
	
	const latticeProjects = new Set();
	
	for await (const { projects: [project] } of getSearchResults(projectsUrl)) {
		for (const contrib of project.contributors) {
			if (contrib.email === latticeEmail) {
				latticeProjects.add(project.projectId);
				break;
			}
		}
	}
	
	const writeStream = fs.createWriteStream(csvOutPath);
	
	writeStream.write("Project,Project UUID,Ingest,File name,File UUID,File extension");
	
	//const pageLimit = 10;
	
	console.log("Getting files");
	
	let pageNum = 1;
	
	for await (const page of getSearchResults(filesUrl, true)) {
		console.log("Page " + (pageNum++) + "/" + page.pagination.pages);
		for (const { files: [file], projects: [project] } of page.hits) {
			const items = [
				project.projectTitle[0],
				project.projectId[0],
				latticeProjects.has(project.projectId[0]) ? "Lattice" : "EBI",
				file.name,
				file.uuid,
				file.format
			];
			writeStream.write("\n" + items.map(s => encodeCsvItem(s)).join(","));
		}
		
		//if (pageNum > pageLimit) break;
	}
	
	writeStream.end();
	
	console.log("Done");
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


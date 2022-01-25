

const fsPromises = require("fs/promises");
const got = require("got");

const csvOutPath = "./missing-description-files.csv";
const projectsUrl = "https://service.azul.data.humancellatlas.org/index/projects?catalog=dcp12&size=500";
const filesUrl = "https://service.azul.data.humancellatlas.org/index/files?filters=%7B%22contentDescription%22%3A%7B%22is%22%3A%5Bnull%5D%7D%7D&size=500&catalog=dcp12";
const latticeEmail = "lattice-info@lists.stanford.edu";


(async function() {
	const latticeProjects = new Set();
	
	for await (let { projects: [project] } of getSearchResults(projectsUrl)) {
		for (let contrib of project.contributors) {
			if (contrib.email === latticeEmail) {
				latticeProjects.add(project.projectId);
				break;
			}
		}
	}
	
	let result = "Project,Project UUID,Ingest,File name,File UUID,File extension";
	
	let limit = 500;
	
	for await (let { files: [file], projects: [project] } of getSearchResults(filesUrl)) {
		const items = [
			project.projectTitle[0],
			project.projectId[0],
			latticeProjects.has(project.projectId[0]) ? "Lattice" : "EBI",
			file.name,
			file.uuid,
			file.format
		];
		result += "\n" + items.map(s => encodeCsvItem(s)).join(",")
		
		if (--limit === 0) break;
	}
	
	await fsPromises.writeFile(csvOutPath, result);
	
	console.log("Done");
})();


async function* getSearchResults(url) {
    // make a request using the url, paginate through the results, and yield each entry
	while (url) {
        const { hits, pagination } = await got(url).json();
		yield* hits;
        url = pagination.next;
    }
}

function encodeCsvItem(string) {
	if (/[,"\r\n]/.test(string)) {
		return "\"" + string.replace(/"/g, "\"\"") + "\"";
	} else {
		return string;
	}
}


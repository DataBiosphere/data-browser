

import { promisify } from "util";
import fs from "fs";
import got from "got";
import { SitemapStream } from "sitemap";
import { pipeline as callbackPipeline } from "stream";

const pipeline = promisify(callbackPipeline);

const pageSize = 50;
const sitemapOutPath = "../dist/explore/projects-sitemap.xml";

const scriptArgs = {};

process.argv.slice(2).forEach((arg) => {
    const [key, value] = arg.split("=");
    scriptArgs[key] = value;
});

var hcaApiUrl;

// TODO: add stuff for the "env" argument

if (!scriptArgs.catalog) {
	console.log("Missing/invalid arguments");
	console.log("Usage: npm run-script update-sitemap -- catalog=<catalog> env={dev|prod}");
} else (async function() {
	hcaApiUrl = "https://service.azul.data.humancellatlas.org/index/projects?catalog=" + scriptArgs.catalog + "&size=" + pageSize;
	
	const stream = new SitemapStream({ hostname: "https://data.humancellatlas.org/" });
	const lastmod = new Date().toISOString();
	
	for (let entry of await getSearchResults(hcaApiUrl)) {
		for (let project of entry.projects) {
			stream.write({
				url: "/explore/projects/" + project.projectId,
				lastmod,
				changefreq: "monthly"
			});
		}
	}
	
	const pl = pipeline(stream, fs.createWriteStream(sitemapOutPath));
	stream.end();
	await pl;
	
	console.log("Done");
})();


async function getSearchResults(url) {
    // make a request using the url, paginate through the results, and return a combined results array

    const allHits = [];

    while (url) {
        const { hits, pagination } = await got(url).json();
        allHits.push(...hits);
        url = pagination.next;
    }

    return allHits;
}


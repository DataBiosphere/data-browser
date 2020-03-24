/**
 * Script that prints the contributors of every project in the March 2020 release.
 */

// Core dependencies
const https = require("https");

// App dependencies
const release2020March = require("../spa/src/app/files/releases/2020-march/2020-03-release.json");

// Constants
const PROJECT_API = "https://service.explore.data.humancellatlas.org/repository/projects/";

/**
 * List contributors for all projects in the release.
 */
function readReleaseContributors() {

    if ( !release2020March ) {
        return;
    }
    
    (release2020March.projects || []).forEach((project) => {
        listProjectContributors(project);
    });
}

/**
 * List the contributors in the specified project.
 * 
 * @param {ReleaseProject} releaseProject
 */
function listProjectContributors(releaseProject) {

    https.get(`${PROJECT_API}${releaseProject.entryId}`, (res) => {
    
        const { statusCode } = res;
        if ( statusCode !== 200 ) {
            console.error(`Unable to retrieve contributors for project with ID "${releaseProject.entryId} (${statusCode})."`)
        }
    
        let data = "";
        res.on("data", (chunk) => {
            data += chunk;
        });
    
        res.on("end", () => {
            const project = JSON.parse(data).projects[0] || {};
            console.log(`### ${project.projectTitle}`);

            const contributors = (project).contributors;
            sortContributors(contributors);
            (contributors || []).forEach((contributor, i) => {
                const contributorName = formatContributorName(contributor.contactName);
                let text = `${contributorName}, ${contributor.institution}`;
                if ( contributor.projectRole ) {
                    const projectRole = toTitleCase(contributor.projectRole);
                    text += ` (${projectRole})`;
                }
                if ( i < contributors.length - 1 ) {
                    text += "\\";
                }
                console.log(text);
            });
            console.log("\n");
        });
    })
    .on("error", (error) => {
        console.error(error.message);
    });
}

/**
 * Returns formatted name from "firstName,middleName,lastName" to "firstName middleName lastName".
 *
 * @param {string} commaDelimitedName
 * @returns {string}
 */
function formatContributorName(commaDelimitedName) {

    return commaDelimitedName.split(/[ ,]+/).join(" ");
}

/**
 * Sort contributors by last name.
 * 
 * @param {Contributor[]} contributors
 */
function sortContributors(contributors) {

    contributors.sort((c0, c1) => {

        const sortValue0 = findContributorLastName(c0.contactName);
        const sortValue1 = findContributorLastName(c1.contactName);
        if ( sortValue0 > sortValue1 ) {
            return 1;
        }
        if ( sortValue0 < sortValue1 ) {
            return -1;
        }
        return 0;
    });
}

/**
 * Returns the last name of the specified contributor.
 * 
 * @param {string} contactName
 * @returns {string}
 */
function findContributorLastName(contactName) {
    
    return /[^,]*$/.exec(contactName)[0];
}

/**
 * Convert specified string to title case.
 * 
 * @param {string} str
 * @returns {string}
 */
function toTitleCase(str) {

    return str.replace(
        /\w\S*/g,
        function(text) {
            return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
        }
    );
}

readReleaseContributors();

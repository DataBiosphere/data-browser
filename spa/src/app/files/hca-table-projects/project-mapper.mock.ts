/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Mock of projects with various values, to be exercised by the project mapper spec.
 */

// App dependencies
import {
    PROJECT_ROW_MULTIPLE_VALUES_SINGLE_OBJECT,
    PROJECT_ROW_SINGLE_VALUES,
    PROJECT_ROW_VALUES_ACROSS_MULTIPLE_OBJECTS
} from "./project-row-mapper.mock";

// Example of project with single values (eg disease, genusSpecies)
const singleProjectProjects = [
    Object.assign({}, PROJECT_ROW_SINGLE_VALUES.projects[0], {
        contributors: [{
            contactName: "Solongo,,Ziraldo",
            correspondingContributor: false,
            email: "solongo@10xgenomics.com",
            institution: "10x Genomics, Inc.",
            laboratory: null,
            projectRole: "experimental scientist",
        }],
        projectDescription: "d",
        publications: [{
            publicationTitle: "Transcriptional profiling of 1.3 Million Brain Cells with the Chromium Single Cell 3' Solution",
            publicationUrl: "http://google.com"
        }]
    })
];
export const PROJECT_SINGLE_VALUES = Object.assign({}, PROJECT_ROW_SINGLE_VALUES, {
    projects: singleProjectProjects
});

// Example of project with multiple values across multiple objects
const multipleProjectProjects = [
    Object.assign({}, PROJECT_ROW_VALUES_ACROSS_MULTIPLE_OBJECTS.projects[0], {
        projectDescription: "d"
    }),
    Object.assign({}, PROJECT_ROW_VALUES_ACROSS_MULTIPLE_OBJECTS.projects[1], {
        projectDescription: "e"
    })
];
export const PROJECT_VALUES_ACROSS_MULTIPLE_OBJECTS = Object.assign({}, PROJECT_ROW_VALUES_ACROSS_MULTIPLE_OBJECTS, {
    projects: multipleProjectProjects
});

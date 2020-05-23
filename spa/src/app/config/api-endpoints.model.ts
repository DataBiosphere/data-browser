/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Set of end point paths used by the Browser. 
 */

export enum APIEndpoints {
    "INDEX_STATUS" = "/health/progress",
    "INTEGRATIONS" = "/integrations",
    "FILE_MANIFEST_SUMMARY" = "/fetch/manifest/files",
    "MATRIX_FORMATS" = "/formats",
    "PROJECT_MATRICES" = "/project-assets/project-matrices",
    "PROJECT_METADATA" = "/project-assets/project-metadata",
    "PROJECTS" = "/projects",
    "RELEASES" = "/release-files/releases/2020-mar",
    "SUMMARY" = "/summary"
}

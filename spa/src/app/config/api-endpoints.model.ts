/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Set of end point paths used by the Browser.
 */

export enum APIEndpoints {
    "CATALOGS" = "/catalogs",
    "INDEX_STATUS" = "/health/progress",
    "INTEGRATIONS" = "/integrations",
    "FETCH" = "/fetch", // Required in path for project matrix downloads and direct file downloads
    "FILES" = "/files",
    "FILE_MANIFEST_SUMMARY" = "/fetch/manifest/files",
    "PROJECT_MATRIX_ARCHIVE_PREVIEW" = "/archive-preview",
    "PROJECT_METADATA" = "/project-assets/project-metadata",
    "PROJECTS" = "/projects",
    "SUMMARY" = "/summary",
}

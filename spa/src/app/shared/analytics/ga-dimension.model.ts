/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Possible values of Google Analytic dimensions.
 */

export enum GADimension {
    "CURRENT_QUERY" = "currentQuery",
    "DIRECTION" = "direction",
    "ENTITY_ID" = "entityId",
    "ENTITY_TYPE" = "entityType", // UI entity
    "ENTITY_URL" = "entityUrl",
    "FACET" = "facet",
    "FILE_TYPE" = "fileType", // Text description of file - release file downloads category 
    "INDEX" = "index",
    "MAX" = "max",
    "MIN" = "min",
    "RELATED_ENTITY_ID" = "relatedEntityId", // File download from files tab, release file download (previously fileName)
    "RELATED_ENTITY_TYPE" = "relatedEntityType", // eg csv, loom - file download from files tab, matrix service, release file download (previously fileFormat)
    "RELATED_ENTITY_URL" = "relatedEntityUrl",
    "RELEASE_NAME" = "releaseName",
    "SOURCE" = "source",
    "TERM" = "term",
    "TOOL_NAME" = "toolName"
}

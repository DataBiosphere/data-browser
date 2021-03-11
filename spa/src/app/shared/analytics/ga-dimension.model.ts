/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Possible values of Google Analytic dimensions.
 */

export enum GADimension {
    "CATALOG" = "catalog",
    "CURRENT_QUERY" = "currentQuery",
    "DIRECTION" = "direction",
    "ENTITY_ID" = "entityId",
    "ENTITY_TYPE" = "entityType", // UI entity
    "ENTITY_URL" = "entityUrl",
    "FACET" = "facet",
    "INDEX" = "index",
    "MAX" = "max",
    "MIN" = "min",
    "RELATED_ENTITY_ID" = "relatedEntityId", // File download from files tab (previously fileName)
    "RELATED_ENTITY_TYPE" = "relatedEntityType", // eg csv, loom - file download from files tab, matrix service (previously fileFormat)
    "RELATED_ENTITY_URL" = "relatedEntityUrl",
    "SOURCE" = "source", // UI element eg search bar
    "TERM" = "term",
    "TOOL_NAME" = "toolName"
}

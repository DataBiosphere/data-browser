/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Possible values of file status for a file that may or may not exist (e.g. ingest spreadsheet).
 */

export enum ProjectManifestSpreadsheetStatus {
    "COMPLETED" = "COMPLETED", // Check request has completed
    "IN_PROGRESS" = "IN_PROGRESS", // Check request is in progress
    "NOT_STARTED" = "NOT_STARTED", // Check request has not yet been kicked off
}

/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Possible values of file download status.
 * 
 * TODO superseded by FileLocationStatus. See #1495.
 */

export enum FileDownloadStatus {
    "DOWNLOADING" = "DOWNLOADING", // Server has completed file download request and browser has started download
    "INITIATED" = "INITIATED", // User has requested file download but server response has not yet been received
    "IN_PROGRESS" = "IN_PROGRESS",
    "COMPLETE" = "COMPLETE",
    "FAILED" = "FAILED",
    "NOT_STARTED" = "NOT_STARTED"
}

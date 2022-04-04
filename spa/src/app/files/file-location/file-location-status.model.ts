/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Possible values of file location status.
 */

export enum FileLocationStatus {
    "COMPLETED" = "COMPLETED",
    "DOWNLOADING" = "DOWNLOADING", // Azul has returned file location and browser has started download
    "INITIATED" = "INITIATED", // User has requested file location but Azul response has not yet been received
    "IN_PROGRESS" = "IN_PROGRESS", // Response has been received from Azul (and with either contain the file location or the URL to poll for the file location)
    "FAILED" = "FAILED",
    "NOT_STARTED" = "NOT_STARTED",
    "REQUESTED" = "REQUESTED", // User has request filed location but request has not yet been sent to Azul
}

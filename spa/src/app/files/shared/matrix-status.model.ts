/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Possible values of matrix request status.
 */

export enum MatrixStatus {
    "NOT_STARTED" = "NOT_STARTED",
    "MANIFEST_IN_PROGRESS" = "MANIFEST_IN_PROGRESS", // Manifest request has started but not yet finished
    "IN_PROGRESS" = "IN_PROGRESS", // Manifest request has finished and matrix request has started
    "COMPLETE" = "COMPLETE",
    "FAILED" = "FAILED"
}

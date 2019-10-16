/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Possible values of health check request. COMPLETE if request returned a 200, otherwise FAILED. 
 */

export enum HealthRequestStatus {
    "COMPLETE" = "COMPLETE",
    "FAILED" = "FAILED"
}

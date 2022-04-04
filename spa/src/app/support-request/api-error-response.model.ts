/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of error returned from either attempting to creating a support request or attempting to upload an attachment.
 */

export interface APIErrorResponse {
    error: boolean;
    errorMessage?: string;
}

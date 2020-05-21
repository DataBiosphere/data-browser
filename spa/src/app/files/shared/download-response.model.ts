/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of file download response.
 */

export interface FileDownloadResponse {

    retryAfter?: number;
    fileUrl?: string;
    status: string;
}

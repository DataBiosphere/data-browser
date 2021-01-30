/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of file download response.
 * 
 * TODO superseded by FileLocation. See #1495.
 */

export interface FileDownloadResponse {

    retryAfter?: number;
    fileUrl?: string;
    status: string;
}

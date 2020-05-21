/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of raw HTTP file download response, before it is parsed into FE-friendly format (ie FileDownloadResponse).
 */

export interface FileDownloadHttpResponse {

    Location: string;
    "Retry-After": number;
    Status: number;
}

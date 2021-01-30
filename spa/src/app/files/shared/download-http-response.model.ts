/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of raw HTTP file download response, before it is parsed into FE-friendly format (ie FileDownloadResponse).
 * 
 * TODO superseded by FileLocationAPIResponse. See #1495.
 */

export interface FileDownloadHttpResponse {

    Location: string;
    "Retry-After": number;
    Status: number;
}

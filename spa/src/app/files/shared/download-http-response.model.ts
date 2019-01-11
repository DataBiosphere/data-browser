/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Model of raw HTTP file download response, before it is parsed into FE-friendly format (ie FileDownloadResponse).
 */

export interface FileDownloadHttpResponse {

    Location: string;
    "Retry-After": number;
    Status: number;
}

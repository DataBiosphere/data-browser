/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Model of file download response.
 */

export interface FileDownloadResponse {

    retryAfter?: number;
    location?: string;
    status: string;
}

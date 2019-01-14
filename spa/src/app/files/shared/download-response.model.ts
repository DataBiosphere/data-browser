/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Model of file download response.
 */

export interface FileDownloadResponse {

    retryAfter?: number;
    fileUrl?: string;
    status: string;
}

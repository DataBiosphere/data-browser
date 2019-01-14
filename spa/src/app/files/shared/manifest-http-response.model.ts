/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Model of raw HTTP manifest response, before it is parsed into FE-friendly format (ie ManifestResponse).
 */

export interface ManifestHttpResponse {

    Location: string;
    "Retry-After": number;
    Status: number;
}

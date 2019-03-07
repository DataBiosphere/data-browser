/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Model of raw HTTP health response, before it is parsed into FE-friendly format (ie HealthResponse).
 */

export interface HealthHttpResponse {

    unindexed_bundles: number;
    unindexed_documents: number;
}

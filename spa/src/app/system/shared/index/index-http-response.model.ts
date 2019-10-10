/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of raw HTTP index response, before it is parsed into FE-friendly format (ie IndexResponse).
 */

export interface IndexHttpResponse {

    up: boolean;
    progress: {
        unindexed_bundles: number;
        unindexed_documents: number;
    }
}

/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of raw HTTP manifest response, before it is parsed into FE-friendly format (ie ManifestResponse).
 */

export interface ManifestHttpResponse {

    Location: string;
    "Retry-After": number;
    Status: number;
}

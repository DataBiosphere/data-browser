/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of  JSON response of accessions, returned from /projects or /projects/uuid endpoints.
 */

export interface AccessionResponse {
    accession: string;
    namespace: string;
}

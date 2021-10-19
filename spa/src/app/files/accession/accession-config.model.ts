/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of accession configuration, used when mapping accession values returned from /projects and /projects/uuid
 * endpoints into FE-specific model.
 */

export interface AccessionConfig {
    identifierOrgPrefix: string;
    label: string;
    responseKey: string;
}

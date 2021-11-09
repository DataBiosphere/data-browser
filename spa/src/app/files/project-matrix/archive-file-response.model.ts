/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of response of file associated with an archive project matrix.
 */

export interface ArchiveFileResponse {
    name: string;
    modified: string; // Date formatted for display
    size: number;
}

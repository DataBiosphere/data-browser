/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * View-specific model of a file associated with an archive project matrix.
 */

export interface ArchiveFile {
    fileName: string;
    modified: string; // Date formatted for display
    size: number;
}
